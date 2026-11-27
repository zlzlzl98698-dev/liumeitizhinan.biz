---
title: Clash for Windows 迁移至 Clash Verge Rev 指南
description: 原版 Clash for Windows 已长期停止维护且存在安全与协议断代风险。本文详细说明迁移前导出本地配置、关闭系统代理防断网、卸载服务模式残留及无痛导入 Clash Verge Rev 的全步骤。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: HowTo
dataSource: 第三方代理客户端.txt、桌面端端口与服务模式机制
faqs:
  - q: 旧版 Clash for Windows 还能打开正常联网，为什么一定要换成 Clash Verge Rev？
    a: "第一，原版 Clash for Windows 已在 2023 年底永久停止更新与安全补丁维护，长期使用滞后闭源旧二进制存在潜在漏洞风险；第二，大量机场已逐步升级到 VLESS-Reality、Hysteria 2 与 AnyTLS 等新协议，旧版内置 Clash 内核根本无法解析这些新节点。"
  - q: 为什么直接把 Clash for Windows 卸载之后，电脑浏览器彻底连不上国内网站了？
    a: "因为您在开启“系统代理”状态下直接卸载或强杀了程序，操作系统网络设置里的本地代理地址（127.0.0.1:7890）仍然残留指向一个已经不存在的监听端口。只需要进入 Windows“设置 → 网络和 Internet → 代理”，关闭“使用代理服务器”即可瞬间恢复。"
  - q: 原来存放在 Clash for Windows 里的订阅 URL 和本地配置文件还能迁移吗？
    a: "完全可以。在卸载旧版之前先进入 Profiles 页面复制原始订阅链接或打开 Home Directory 备份 yaml 配置；安装 Clash Verge Rev 后直接重新导入原订阅地址，或拖拽本地 yaml 文件导入即可。"
  - q: 安装 Clash Verge Rev 后发现端口和旧版不一样怎么办？
    a: "Clash for Windows 默认混合端口是 7890，而 Clash Verge Rev 默认混合端口是 7897。如果您习惯使用 7890（例如有其他开发脚本写死了代理端口），可以在 Clash Verge Rev「设置 → Clash 设置 → 端口设置」里把混合端口改回 7890 即可无缝兼容。"
---

# Windows/macOS 从旧版 Clash for Windows 平滑迁移至 Clash Verge Rev 完整指南

**Answer-First 核心结论**：从已停更的 **Clash for Windows（CFW）** 安全平替迁移至活跃开源的 **Clash Verge Rev**，只需严格按顺序完成以下 **5 个步骤**：

- **①–② 备份并安全退场**：迁移前在 CFW 内**备份订阅 URL 或本地 Profiles 文件夹**；随后**依次关闭 TUN 模式、卸载 Service Mode 服务、拨回关闭 System Proxy（系统代理）**，防止卸载后端口残留断网。
- **③–⑤ 清理换新配置**：彻底卸载 CFW 主程序与残余系统服务 → 安装官方 GitHub Release 版 **[Clash Verge Rev](/clients/clash-verge-rev/)** → 重新导入订阅、设置简体中文并安装新版 Service Mode 服务模式。

---

## 一、迁移前必懂：为什么不能两个 Clash 客户端同时开着？

许多用户在电脑里直接装上新版 Clash Verge Rev，但旧版 CFW 还开机自启蹲在右下角托盘，甚至服务模式（`clash-core-service`）还在后台跑着，结果导致：
- **端口冲突**：双方试图抢占系统代理控制权，浏览器一会儿走 7890、一会儿跳 7897，造成全网抽风；
- **TUN 虚拟网卡冲突**：两个虚拟网卡驱动同时修改系统默认路由表，轻则无法出网，重则本地连接彻底死锁；
- **关闭一个导致另一个断网**。

因此必须坚持 **“先完整清理停用旧端 → 再启用新端”** 的单线切换纪律。

---

## 二、第 1 步：备份旧版 CFW 里的有效订阅地址与自定义规则

切忌未备份直接卸软件！很多用户忘记当初是在哪个邮箱注册、或者连不上网站记不起密码了。
1. 打开旧版 Clash for Windows，点击左侧 **「Profiles」**。
2. 对正在使用的每个有效机场配置卡片，鼠标悬停查看右侧或点击链接图标，将 **原始订阅 URL** 复制保存到桌面一个记事本里（注意：如果该配置是本地导入的静默 YAML 且没有订阅地址，点击顶部 `Open Profiles Folder` 或右键配置文件打开文件目录，把里面的 `.yml` / `.yaml` 文件以及你自己写的脚本备份到桌面备用文件夹）。
3. 如果你过去为 Claude、ChatGPT 或开发工具写过自定义的 `Parsers`（配置预处理）或规则列表，也一并复制进桌面备份文本（注：Clash Verge Rev 用 **全局扩展脚本 JavaScript / YAML Merge** 替代旧版 CFW 的 Parsers，语法更简洁，具体示例见 [Claude 锁节点配置指南](/guides/claude-fixed-node-rules/)）。

---

## 三、第 2 步：正确关闭系统代理与服务模式（预防卸载后“假断网”）

这是老手也很容易疏忽、导致卸载完毕立刻无法访问百度/微信的关键动作：

1. 在 Clash for Windows 主界面点击 **「General」**：
   - 将 **「System Proxy（系统代理）」** 开关拨为 **关闭（Off）**；
   - 将 **「TUN Mode」** 开关拨为 **关闭（Off）**；
   - 如果此前开启过 **「Start with Windows（开机自启）」**，一并取消勾选。
2. **清理旧版 Service Mode（服务模式）**：
   - 点击 `Service Mode` 右侧的 **`Manage`**；
   - 在弹窗里点击 **`Uninstall`（卸载服务）**（Windows 弹出管理员权限确认点击“是”）；
   - 等待状态显示回红色/未安装地球图标，说明后台 `clash-core-service` 已移除。
3. **验证清理是否干净**：完全右击系统托盘退出 Clash for Windows，此时不借助任何代理软件打开浏览器访问 `https://www.baidu.com` 或 `https://www.bilibili.com`。如果能瞬间正常打开，证明系统代理指向已彻底释放干净；如果依然打不开，看文末兜底排错。

---

## 四、第 3 步：彻底卸载旧版并安全安装 Clash Verge Rev

1. 打开系统「设置 → 应用 → 已安装的应用」（macOS 则将旧 `Clash for Windows.app` 拖入废纸篓），执行卸载 CFW；建议随后手动清理用户目录下的 `.config/clash`（确保已备份所需 `.yaml` 后再清理残余，保留也没大碍但清理后更整洁）。
2. **核实正版下载渠道**：千万不要用百度搜索“Clash Verge 官网”去下载排名靠前的推广安装包（黑产常利用中文高仿站投毒）！请确认来自官方开源仓库 `clash-verge-rev/clash-verge-rev` Releases 页面对应系统架构的安装包（Windows 常见为 `x64-setup.exe`），详细说明见 [Clash Verge Rev 客户端百科页](/clients/clash-verge-rev/)。
3. 运行安装程序完成安装并启动 Clash Verge Rev。

---

## 五、第 4 步：导入订阅、兼容 7890 端口与开启 Mihomo 核心

1. **切换中文**：打开 Clash Verge Rev →「Settings」→ Language 选 **简体中文**。
2. **核对内核**：保持默认内置 **`Mihomo`** 内核（即升级后的 Clash.Meta 内核，通吃目前机场主流的 VLESS、VLESS-Reality、Hysteria 2 与 Trojan）。
3. **导入机场订阅**：切到「订阅（Profiles）」，把第 1 步备份在记事本里的订阅地址粘贴进去点击「导入」并左键单击激活它。若是导入本地备份 `.yaml`，点击「新建」或直接将 `.yaml` 文件拖入订阅区。*(如果更新订阅失败，记得确认本机此时直连网络正常或参考 [订阅更新失败排查](/troubleshooting/subscription-update-failed/)。)*
4. **如有脚本习惯使用 7890 端口（可选）**：如果您电脑上的 Git、VS Code、终端 alias 或 Docker 过去配置了 `http://127.0.0.1:7890`，您不必去挨个改工具配置——只需打开 Clash Verge Rev「设置 → Clash 设置 → 端口设置」，将混合端口 `Mixed Port` 从默认 `7897` 改为 `7890` 后重启软件即可。
5. **完成最后配置**：安装新版 **服务模式（Service Mode）**、按需开启 **TUN 虚拟网卡**、切回「代理」保持 **规则（Rule）模式** 并点击测速选中节点，全部流程详见 [Clash Verge Rev 安装配置实战教程](/guides/clash-mihomo-guide/)。

### 迁移前后核心参数与功能变化对照

| 对比项 | 旧版 Clash for Windows (CFW) | 新版 Clash Verge Rev | 迁移处理建议 |
|---|---|---|---|
| 维护与安全状态 | 已于 2023 年底永久停更，存在安全与漏洞风险 | 社区活跃开源维护（`clash-verge-rev/clash-verge-rev`） | 仅从官方 GitHub Releases 下载，避开中文高仿站 |
| 内核与新协议支持 | 旧内核无法解析 VLESS-Reality、Hysteria 2 等 | 默认内置 `Mihomo` 内核，兼容主流新协议 | 迁移后保持 `Mihomo` 内核即可 |
| 默认混合端口 | `7890` | `7897` | 若 Git/Docker 等脚本写死了 `7890`，可在端口设置改回 |
| 规则预处理机制 | `Parsers` 配置预处理 | 全局扩展脚本 JavaScript / YAML Merge | 迁移前先备份旧规则，在新端改用 JS/Merge 注入 |
| 后台系统服务 | `clash-core-service` | 新版独立 Service Mode 服务模式 | 卸载 CFW 前必先关闭代理并 Uninstall 旧服务防断网 |

---

## 六、迁移后“彻底断网”紧急恢复操作

如果您先手快直接删了 CFW 才看到本文、现在整个电脑浏览器都连不上国内网页，30 秒就能救回来：
- **Windows**：按 `Win + I` 打开系统设置 →「网络和 Internet」→「代理」→ 找到「手动设置代理」→ 点「编辑」→ 将开关关闭并保存。
- **macOS**：打开「系统设置」→「网络」→ 选中当前正在连的 Wi-Fi 或有线网 → 点「详细信息」→「代理」→ 取消勾选 `网页代理(HTTP)`、`安全网页代理(HTTPS)` 与 `SOCKS 代理`，点击好。

*(如若仍无网络，可对照阅读 [连接成功却打不开网页排查指南](/troubleshooting/connected-no-internet/)。)*

<FaqBlock :items="$frontmatter.faqs" />
