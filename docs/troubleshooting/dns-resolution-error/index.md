---
title: DNS 解析错误排查：网页打不开、域名解析超时与 Fake-IP 冲突
description: 解决开启代理后国内或海外网页提示 DNS_PROBE_FINISHED_NXDOMAIN、解析极慢或与公司内网域名冲突的问题。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: HowTo
dataSource: 故障排查知识库
faqs:
  - q: "浏览器提示 DNS_PROBE_FINISHED_NXDOMAIN 或 ERR_NAME_NOT_RESOLVED 是什么意思？"
    a: "这表示浏览器向当前系统 DNS 询问网站 IP 地址时，没有拿到有效回答或解析直接超时。常见于代理软件异常闪退后遗留了死掉的本地代理/DNS 地址，或者配置中填写了国内无法直连的境外 DNS。"
  - q: "为什么开了 Clash Fake-IP 模式后，国内公司内网、NAS 或校园网域名打不开了？"
    a: "Fake-IP 会拦截域名并返回 198.18.0.1 网段的虚拟 IP，如果企业内网域名、Docker 服务或校园网认证地址没有加入 fake-ip-filter 白名单，请求会被误送入代理内核而找不到内网主机。"
  - q: "关闭代理软件后所有网页都打不开，只有重启电脑才恢复怎么办？"
    a: "这往往是因为开启了 TUN 模式或修改了系统 DNS 后直接强杀进程（未正常点关闭），导致系统网卡还指着 127.0.0.1 或虚拟网卡路由。只需重新打开客户端再正常退出，或把本地网卡 DNS 恢复为自动获取即可。"
  - q: "Fake-IP 和 Redir-Host 两种 DNS 模式日常到底怎么选更稳定？"
    a: "日常网页浏览和流媒体解锁优先用 Fake-IP，解析零等待且能有效避免海外域名被本地运营商 DNS 污染；只有遇到内网开发工具、特殊游戏反作弊或局部局域网设备无法互访时，才建议将企业域名加入过滤列表或切回 Redir-Host。"
---

# DNS 解析错误排查指南

**Answer-First 核心结论**：出现 **`DNS_PROBE_FINISHED_NXDOMAIN`**、**`ERR_NAME_NOT_RESOLVED`** 或网页卡在“正在解析主机”超时，绝大多数不是节点本身挂了，而是 **客户端异常退出残留、DNS 分流服务器不可达、或 `Fake-IP` 网段与内网/Docker 冲突**。

请优先按以下三点快速处理：
- **① 恢复网卡 DNS 与清缓存**：确认物理网卡为自动获取 DNS，并清理操作系统与浏览器 DNS 缓存。
- **② 修正内外网 DNS 分流**：国内 `default-nameserver` 必须填可直连 IP（如 `223.5.5.5`），海外解析交由节点处理。
- **③ 隔离内网域名冲突**：在 `fake-ip-filter` 放行公司内网与 `.local` 域名，或临时测试 `redir-host`。

---

## 一、代理 DNS 解析失败与延迟异常：10 秒症状定位矩阵

| 症状现象 | 本质原因 | 优先处理方向 |
|---|---|---|
| 关掉客户端后，连百度/微信都提示 `NXDOMAIN` 或上不了网 | 软件闪退未还原系统代理或虚拟网卡 DNS 残留 | 重新打开并正常退出客户端，将网卡 DNS 改为自动获取 |
| 开着代理，公司内网、路由器后台或 NAS 域名无法访问 | `Fake-IP` 劫持了内网私有域名，未命中放行列表 | 将内网域名与 `*.lan` 加入 `fake-ip-filter` 过滤列表 |
| 海外网站首开等待 5 秒以上才报错 `ERR_NAME_NOT_RESOLVED` | `nameserver` 填了被墙 DNS 且未走代理，导致解析超时 | 改用国内可直连基础 DNS（`223.5.5.5` / `119.29.29.29`） |
| 网页可以打开，但 YouTube 送中或流媒体地区判断出错 | 本地 DNS 泄漏，海外域名被国内公共 DNS 抢先解析 | 开启 TUN 与远程 DNS 劫持，详见 [TUN 与 DNS 防泄漏指南](/guides/tun-and-dns/) |

---

## 二、分平台检查与修复步骤

### 1. Windows 清理 DNS 缓存与重置网卡配置
1. 按 `Win + R` 输入 `ncpa.cpl` 回车，右键当前使用的 `WLAN` 或 `以太网` →「属性」→ 双击 `Internet 协议版本 4 (TCP/IPv4)`；
2. 确认已勾选 **「自动获得 DNS 服务器地址」**（不要手动锁死 `127.0.0.1` 或冷门失效 IP）；
3. 打开命令提示符或 PowerShell 运行刷新命令：
   ```powershell
   ipconfig /flushdns
   ```
4. 在 Edge/Chrome 地址栏打开 `edge://net-internals/#dns`（或 `chrome://net-internals/#dns`），点击 **Clear host cache** 清空浏览器内部 DNS 缓存。

### 2. macOS 刷新 DNS 与排查多网络冲突
在「终端」执行以下命令清理系统 DNS 缓存并重启解析守护进程：
```sh
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
同时检查「系统设置 → 网络 → 详细信息 → 代理 / DNS」，确认关闭客户端后没有遗留多余的 `127.0.0.1` 代理或未知 DNS 条目。

### 3. 修正 Clash Verge Rev / Mihomo 与 OpenWrt DNS 策略
打开客户端配置文件或覆写设置，重点检查以下两段逻辑（详见 [Clash Mihomo 配置指南](/guides/clash-mihomo-guide/)）：
- **基础引导 DNS 必须国内可直连**：`default-nameserver` 与国内 `nameserver` 应填写 `223.5.5.5`、`119.29.29.29` 等稳定公共 IP（不能只填域名或海外无法直连的地址）；
- **补充 `fake-ip-filter` 过滤内网**：将 `*.lan`、`*.local`、路由器域名及企业内网后缀加入 `fake-ip-filter`，确保这些域名走真实内网 IP 解析；
- **多工具冲突测试**：若本机运行着 Docker、WSL2 或公司 VPN，且出现 `198.18.0.1` 网段抢占，可在 [Clash Verge Rev](/clients/clash-verge-rev/) 中尝试把 `enhanced-mode` 临时改为 `redir-host` 验证是否立刻恢复。

---

## 三、代理 DNS 解析失败与延迟异常：恢复验收标准

- 在终端运行 `nslookup baidu.com` 与 `curl -I https://www.google.com`（开启代理下），国内域名毫秒级返回本地正常解析，海外站点可正常建连响应；
- 彻底退出代理客户端后，国内网页、局域网设备管理页无需重启电脑即可正常访问；
- 若出现软件显示已连接但所有外网依旧报连接拒绝，可转至 [**已连接但无法访问外网排查 →**](/troubleshooting/connected-no-internet/) 或 [**TUN 模式异常排查 →**](/troubleshooting/tun-mode-error/)。

<FaqBlock :items="$frontmatter.faqs" />
