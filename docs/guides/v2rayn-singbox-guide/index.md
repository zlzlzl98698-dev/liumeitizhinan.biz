---
title: v2rayN 与 sing-box 客户端使用教程：多核心切换与路由规则
description: 介绍 Windows/macOS/Linux 下 v2rayN 的多核心（Xray / sing-box / Mihomo）选择逻辑，以及原生 sing-box (SFA/SFI/SFM) 的使用场景。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: HowTo
dataSource: 教程知识库
faqs:
  - q: "新版 v2rayN 支持 Xray、sing-box 和 Mihomo 三个核心，新手到底应该选哪一个？"
    a: "如果您只导入普通的 VLESS、VMess、Trojan 节点链接或 Base64 订阅，保持默认的 Xray 核心最省心；如果订阅里包含 Hysteria 2、TUIC 等新型协议，或需要直接使用 Clash/sing-box 复杂规则集，则建议切换为 sing-box 或 Mihomo 核心。"
  - q: "在 v2rayN 里已经打开了「自动配置系统代理」，为什么 ChatGPT 桌面端和终端命令行还是连不上？"
    a: "系统代理（127.0.0.1:10808/10809）只对浏览器和少数支持读取系统环境变量的软件生效。要让桌面端 App、Git/Python 终端与游戏流量走代理，必须打开 v2rayN 底部状态栏的「Tun 模式」（Windows 建议右键管理员运行）。"
  - q: "手机/Mac 上安装官方原版 sing-box（SFA / SFI / SFM）导入订阅总报 JSON 语法错误怎么办？"
    a: "原生 sing-box 对配置版本非常敏感（例如 1.11+ 与早期 DNS/outbound 规则写法差异较大），很多机场的默认订阅并非标准新版 JSON。建议使用机场明确标注支持 sing-box 最新版的订阅链接，或改用内置自动转换层的 Hiddify / Karing。"
  - q: "v2rayN 现在也支持 macOS 和 Linux 了吗，和 Clash Verge Rev 怎么选？"
    a: "是的，新版 v2rayN 已跨平台覆盖 Windows、macOS 与 Linux。如果您习惯直接导入单条节点链接、精细调整单个节点路由或切换 Xray/sing-box 核心，v2rayN 非常顺手；如果更偏好机场标准 Clash YAML 订阅与可视化策略组面板，Clash Verge Rev 会更直观。"
---

# v2rayN 与 sing-box 客户端使用指南

**Answer-First 核心结论**：新版 **v2rayN** 已演进为支持 Windows / macOS / Linux 的多核心枢纽，而原生 **sing-box（SFA / SFI / SFM）** 则主打极致轻量化与统一内核架构；日常选型的核心在于 **根据订阅协议选对内核、善用 TUN 模式接管桌面应用，并避开 sing-box 跨版本配置语法差异**。

快速上手只需把握以下三点：
- **① 按订阅协议匹配核心**：常规 VLESS/VMess/Trojan 选 `Xray`；包含 Hysteria 2/TUIC 或复杂规则集选 `sing-box` / `Mihomo`。
- **② 桌面应用开 TUN 接管**：需要代理桌面端 AI 软件或终端时，在管理员权限下开启 `Tun 模式`。
- **③ 原生 sing-box 防语法坑**：原生端优先导入官方适配的最新 JSON 订阅，或用 Hiddify / Karing 自动兼容转换。

---

## 一、10 秒选型与故障定位矩阵

| 使用场景 / 遇到现象 | 核心原因与机制 | 推荐处理方案 |
|---|---|---|
| 导入常规 Base64 订阅或单条 VLESS 链接 | Xray 对标准协议解析最轻量直接 | 在 [v2rayN](/clients/v2rayn/) 保持 `Xray` 核心，开启绕过大陆路由 |
| 订阅含 Hysteria 2 / TUIC 节点或复杂分流规则 | Xray 不直接兼容此类协议组合，需新一代全协议核心 | 切换为 `sing-box` 或 `Mihomo` 核心（见 [Clash Mihomo 指南](/guides/clash-mihomo-guide/)） |
| 浏览器正常，但桌面 ChatGPT/Cursor/终端超时 | 仅开启了 HTTP 系统代理，非浏览器软件未走代理端口 | 管理员运行 v2rayN 并打开底部「Tun 模式」 |
| 原生 sing-box（SFA/SFI/SFM）导入配置报错 | 1.11+ 等大版本更新淘汰了旧版 outbound/DNS 字段 | 更新服务商新版 sing-box 订阅，或换用 [Hiddify](/clients/hiddify/) / [Karing](/clients/karing/) |

---

## 二、v2rayN 核心实操配置步骤

### 1. 订阅导入与核心切换方法
1. 打开 [v2rayN](/clients/v2rayn/)，点击顶部 **「订阅分组 → 订阅分组设置 → 添加」**，填入您的机场订阅 URL 并确定，随后点击 **「订阅分组 → 更新全部订阅（不通过代理）」**（若更新失败再尝试通过代理更新）；
2. **核对节点核心类型**：在节点列表中选中节点右键「编辑」，或进入 **「设置 → Core 类型设置」**：
   - 使用标准 **VLESS / VMess / Trojan / Shadowsocks** 时保持 `Xray`；
   - 使用 **Hysteria 2 / TUIC / WireGuard** 或测试新版分流性能时，切至 `sing_box` 或 `mihomo`。

### 2. 开启系统代理、路由模式与 TUN 接管
1. **选择代理方式**：主界面底部左侧点击「系统代理」下拉框，日常使用选择 **「自动配置系统代理」**，路由规则选择 **「绕过大陆（Bypass mainland）」**（确保国内网站和软件不绕路）；
2. **开启 Tun 模式接管全机**：点击底部 **「Tun 模式」** 开关（Windows 初次开启如报错或无法接管，先完全退出软件，右键 `v2rayN.exe` →「以管理员身份运行」再打开 Tun，详细原理见 [TUN 与 DNS 防泄漏指南](/guides/tun-and-dns/)）。

---

## 三、原生 sing-box (SFA / SFI / SFM) 使用要点

原生 [sing-box](/clients/sing-box/) 官方客户端在 Android 称为 **SFA**、iOS 称为 **SFI**、macOS 称为 **SFM**，其特点是内存占用极低、规则引擎高度统一，但**没有内置订阅格式转换器**：
- **配置版本严格对齐**：由于 sing-box 1.11+ 与早期版本在 DNS（如 `fakeip` / `address`）和 `outbounds` 规则语法上存在不兼容变更，切勿网上随便复制旧版 JSON 模板套用（若更新后闪退或报解析错，可参考 [客户端更新故障修复](/troubleshooting/client-update-crash/)）；
- **替代兼容方案**：如果机场后台仅提供 Clash YAML 或传统 Base64 链接且未提供新版原生 JSON，在手机和桌面端更推荐改用同样基于 sing-box 内核但自带转换适配层的 [Hiddify](/clients/hiddify/) 或 [Karing](/clients/karing/)。

---

## 四、验证是否配置成功

- 在 v2rayN 选中可用节点并按 `Ctrl + R` 测试真连接延迟，出现正常绿色毫秒数值；
- 浏览器访问海外网页秒开，国内测速站保持本地直连 IP；打开「日志 / 信息」面板可看到对应域名按规则正确分流，且开启 Tun 后终端运行 `curl -I https://www.google.com` 能正常返回状态码。

<FaqBlock :items="$frontmatter.faqs" />
