---
title: 2026 代理客户端软件大全：全平台选型与协议兼容指南
description: 完整收录 Windows、Android、iOS、macOS、Linux 与 OpenWrt 6 大平台全部 24 款第三方代理客户端，严格区分通用端与机场专属客户端、代理内核与协议兼容性，附官方来源核实与维护警示。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: CollectionPage
dataSource: 第三方代理客户端.txt & data/clients.json
faqs:
  - q: 什么是第三方通用代理客户端？它和机场专属客户端有什么区别？
    a: 第三方通用客户端（如 Clash Verge Rev、v2rayN、Shadowrocket、FlClash、Hiddify、Karing、sing-box）由独立或开源团队开发，允许用户导入任意兼容机场的订阅链接；而机场专属客户端由服务商自己定制，只需账号密码登录但通常无法添加其他机场，且部分品牌（如飞猫云、SOGO 云、全球云、隐形人等）完全不提供第三方订阅链接。
  - q: 客户端软件、代理内核（Mihomo/Xray/sing-box）和网络协议（VLESS/Trojan/SS/Hy2）是什么关系？
    a: 网络协议决定数据在网络上如何加密传输（例如 VLESS、Trojan、Shadowsocks、Hysteria 2）；代理内核是真正执行网络转发和分流规则的底层引擎（目前主流为 Mihomo、Xray-core 和 sing-box）；客户端软件则是套在内核外面的图形界面，负责订阅管理、策略切换与开机自启。
  - q: Windows 电脑端现在最推荐用哪款 Clash 替代软件？Clash for Windows 还能用吗？
    a: 原版 Clash for Windows 已停止更新并归档，不建议继续使用旧版或来路不明的二次打包版本。目前 Windows 上活跃且有公开源码核实的推荐首选 Clash Verge Rev（基于 Mihomo 内核）或 v2rayN（支持 Xray / sing-box / Mihomo 多核心），也可选择 FlClash 或 Hiddify；而 Mihomo Party 维护状态需单独核实，暂不建议直接作为首选。
  - q: Android 安卓客户端下载时为什么特别强调不能在 Google Play 搜 NekoBox？
    a: 根据原始客户端资料与上游项目提醒，NekoBox for Android 官方提示维护资源有限，且特别警告用户“不要使用其名称下已被第三方控制的 Google Play 版本”。安卓用户建议优先选用 v2rayNG、FlClash、Hiddify 或 Karing，并只从官方 GitHub Releases 核对 APK 下载。
  - q: iPhone / iPad 上的 Shadowrocket、Stash、Quantumult X 是免费的吗？
    a: 不是。Shadowrocket（小火箭）、Stash 和 Quantumult X（圈 X）在非中国大陆区 App Store 均显示为付费买断应用，Surge 5 则包含应用内购买，实际价格以您所在地区的 App Store 实时页面为准。如果您想在 iOS 上先用免费客户端，可考虑 Hiddify、Karing、Clash Mi 或官方 sing-box (SFI)。
  - q: macOS 安装客户端时需要注意什么？为什么有时打开会提示损坏或无法运行？
    a: 第一，安装前必须区分 Intel (x64/x86_64) 与 Apple Silicon M 系列芯片 (arm64/aarch64) 安装包（例如 Clash Verge Rev 与 FlClash 均提供双架构下载）；第二，首次打开 GitHub 开源应用如遇 macOS Gatekeeper 安全提示，需核对 SHA-256 校验值后按官方正常流程在“隐私与安全性”中确认放行。
  - q: Linux 没有图形界面（例如家用服务器或 VPS/NAS）怎么用代理客户端？
    a: 桌面 Linux 可以使用 Clash Verge Rev、FlClash、v2rayN（提供 DEB、RPM、AppImage 格式）；如果没有桌面图形界面，推荐使用提供 Web 控制界面的 v2rayA，或者直接运行官方 sing-box 内核服务。
  - q: OpenWrt 软路由安装 Nikki、OpenClash、PassWall2 或 HomeProxy 有什么前置限制？
    a: 路由器部署前必须先核实 OpenWrt 固件版本号、路由器 CPU 架构、包管理器与防火墙类型（fw3 iptables vs fw4 nftables）。例如 Nikki 项目明确要求 OpenWrt 24.10 及以上版本，老版本固件强行安装会因依赖缺失或防火墙不兼容导致失败。
  - q: 怎么知道我买的机场支不支持导入 Clash 或 Shadowrocket？
    a: 在本站机场品牌数据库中已标明每家品牌的接入模式：例如光速云、星岛梦、唯兔云、一翻云、速界、梯子云、极连云、光年梯均支持第三方订阅导入；而飞猫云、SOGO 云、全球云、隐形人、灵猫网络、闪跃、无忧链接、Firefly 资料明确标注仅限专属客户端登录，不提供订阅链接。
  - q: 使用第三方客户端时，为什么不能把订阅链接放进不知名的在线转换网页？
    a: 机场订阅链接里包含您的账户鉴权密钥（UUID 或 Token）。将订阅 URL 粘贴到来源不明的第三方在线订阅转换网站，存在被网站记录节点与盗刷流量的风险。建议直接选用原生支持多种订阅格式的客户端（如 Hiddify、Karing、v2rayN）或使用机场官网自带的 Clash 专属链接。
---

# 2026 代理客户端软件大全：全平台选型、内核协议兼容与安全指南

**Answer-First 核心结论**：选择代理客户端的第一步不是盲目下载安装包，而是先分清 **客户端软件（图形外壳）、代理内核（Mihomo / Xray / sing-box）、网络协议（VLESS / Trojan / SS / Hy2）以及您所购机场的兼容模式（支持通用订阅 vs 仅限专属 App）**。

在第三方通用客户端生态中，按设备平台推荐优先关注：
- **桌面端（Windows / macOS / Linux）**：主力推荐 **[Clash Verge Rev](/clients/clash-verge-rev/)**、**[v2rayN](/clients/v2rayn/)** 与 **[FlClash](/clients/flclash/)**。
- **Android 安卓**：推荐 **[v2rayNG](/clients/v2rayng/)**、**[FlClash](/clients/flclash/)**、**[Hiddify](/clients/hiddify/)** 与 **[Karing](/clients/karing/)**。
- **iOS / iPadOS**：常用付费方案为 **[Shadowrocket](/clients/shadowrocket/)**、**[Stash](/clients/stash/)** 与 **[Quantumult X](/clients/quantumult-x/)**；免费方案可选 Hiddify / Karing / sing-box SFI。
- **OpenWrt 软路由**：在 **[OpenClash](/clients/openclash/)**、**[PassWall2](/clients/passwall2/)**、**[Nikki](/clients/nikki/)** 与 **[HomeProxy](/clients/homeproxy/)** 中按固件版本匹配。

> **来源与链接安全准则**：本页全部 24 款客户端及 6 大平台兼容信息完整提取自已归档客户端数据库（`data/clients.json`）。本站严格遵循“不提供未经核实的第三方网盘/猜测直链”原则，每款软件均仅标注已核实的官方开源仓库或商店渠道指引，并在存在维护状态疑点或商店仿冒风险时显式标出警告。

---

## 一、核心概念扫盲：客户端、内核、协议与机场订阅的关系

很多新手遇到“导入报错”或“协议不支持”时一头雾水，其实只要记住这四层结构就能瞬间定位 90% 的问题：

1. **机场服务品牌（基础设施提供方）**：负责提供海外落地服务器、跨境中转/IEPL 专线以及您的账号流量配额。它决定**您的网速上限与流媒体/AI 解锁底座**。
2. **网络协议（数据打包加密方式）**：常见的有 **VLESS（含 Reality）**、**Trojan**、**Shadowsocks (SS)**、**VMess**、**Hysteria 2 (Hy2)**、**TUIC** 与 **AnyTLS**。比如光速云资料主打 VLESS（实测图另含 SS 与 AnyTLS），一翻云同时支持 Hy2/VLESS-Reality/SS，唯兔云和星岛梦资料标注 Trojan（截图含 SS）。
3. **代理内核（真正执行路由分流与加密转发的引擎）**：目前主流开源内核已高度收敛为三大体系——**Mihomo（原 Clash.Meta）**、**Xray-core** 与 **sing-box**。如果您的机场下发了 `Hysteria 2` 或 `VLESS-Reality` 节点，老旧已停更的原版 Clash 内核绝对无法识别，必须升级至 Mihomo、Xray 或 sing-box 核心客户端。
4. **客户端软件（图形操作界面）**：套在内核外面的外壳程序，负责拉取订阅链接、展示延迟 ms、一键开关系统代理与 TUN 虚拟网卡。

### 第三方通用客户端 vs 机场专属客户端对照

| 对比维度 | 第三方通用客户端（Clash Verge Rev / v2rayN / Shadowrocket 等） | 机场专属客户端（服务商自研或定制端） |
|---|---|---|
| **上手难度** | 需获取软件、复制粘贴订阅链接并理解规则/TUN 模式 | 下载官方安装包后输入注册邮箱与密码一键登录 |
| **多机场切换灵活性** | **极高**，可在同一软件内保存多家主力与备用机场订阅 1 秒切换 | **强绑定**，只能登录单一服务商，换品牌需重装软件 |
| **分流与防风控控制** | 可精细编写规则（如强制 OpenAI 固定美区单节点、禁用 IPv6） | 功能受限于服务商面板预设，多数不支持高阶自定义规则覆写 |
| **软路由 / 电视端适配** | 通用订阅可无缝导入 OpenClash、PassWall2、tvOS 客户端 | 绝大多数专属端不支持路由器与电视盒子（如飞猫云、SOGO 云、隐形人等不提供订阅链接） |
| **代表兼容机场** | 光速云（自研+第三方）、星岛梦、唯兔云、一翻云、速界、可信云、梯子云等 | 纯专属代表：飞猫云、SOGO 云、全球云、隐形人、灵猫网络、闪跃、无忧链接、Firefly |

---

## 二、全平台 × 24 款第三方客户端完整兼容矩阵

下表覆盖项目资料收录的 **Windows、Android、iOS、macOS、Linux、OpenWrt** 全部 6 大平台共 24 款工具（点击软件名称直接进入独立教程与规格档案）：

| 客户端名称 | 核心引擎 | Windows | Android | iOS/iPad | macOS | Linux | OpenWrt | 费用与渠道 | 维护与安全特别提示 |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|---|---|
| **[Clash Verge Rev](/clients/clash-verge-rev/)** | Mihomo | ✓ | - | - | ✓ | ✓ | - | 开源免费 (GitHub) | 桌面端活跃主力；macOS 注意区分 Intel/M 芯片 |
| **[v2rayN](/clients/v2rayn/)** | Xray / sing-box / Mihomo | ✓ | - | - | ✓ | ✓ | - | 开源免费 (GitHub) | 经典多核心桌面工具，已跨平台支持 macOS/Linux |
| **[FlClash](/clients/flclash/)** | Mihomo | ✓ | ✓ | - | ✓ | ✓ | - | 开源免费 (GitHub) | 界面简洁，桌面与安卓操作逻辑高度一致 |
| **[Clash Nyanpasu](/clients/clash-nyanpasu/)** | Mihomo / Clash-rs | ✓ | - | - | ✓ | ✓ | - | 开源免费 (GitHub) | 适合需要配置增强与多内核覆写的进阶玩家 |
| **[Hiddify](/clients/hiddify/)** | sing-box | ✓ | ✓ | ✓ | ✓ | ✓ | - | 开源免费 (GitHub/商店) | 全平台覆盖，多订阅格式兼容，新手友好 |
| **[Karing](/clients/karing/)** | sing-box | ✓ | ✓ | ✓ | ✓ | ✓ | - | 免费 (GitHub/App Store) | 全平台多订阅聚合与规则管理 |
| **[Clash Mi](/clients/clash-mi/)** | Mihomo | ✓ | ✓ | ✓ | ✓ | ✓ | - | 免费 (GitHub/App Store) | 全平台统一 Clash YAML 图形界面 |
| **[Mihomo Party](/clients/mihomo-party/)** | Mihomo | ✓ | - | - | - | - | - | 开源免费 (GitHub) | ⚠️ **维护状态需单独核实，暂不列为首选推荐** |
| **[v2rayNG](/clients/v2rayng/)** | Xray-core | - | ✓ | - | - | - | - | 开源免费 (GitHub) | 安卓最稳定轻量的经典协议客户端 |
| **[Clash Meta for Android](/clients/clash-meta-for-android/)** | Mihomo | - | ✓ | - | - | - | - | 开源免费 (GitHub) | 安卓端标准 Clash YAML 策略组代理 |
| **[NekoBox for Android](/clients/nekobox/)** | sing-box | - | ✓ | - | - | - | - | 开源免费 (GitHub) | 🚨 **维护资源有限；严禁使用 Google Play 第三方控制版** |
| **[sing-box 官方端](/clients/sing-box/)** | sing-box | - | ✓ (SFA) | ✓ (SFI) | ✓ (SFM) | ✓ | - | 开源免费 (官方文档/商店) | 原生 JSON 配置标杆，适合官方配置模板 |
| **[Shadowrocket（小火箭）](/clients/shadowrocket/)** | 自研引擎 | - | - | ✓ | - | - | - | 付费 (美区 App Store) | iOS 国民级规则代理，兼容几乎所有通用订阅 |
| **[Stash](/clients/stash/)** | Clash 兼容引擎 | - | - | ✓ | - | - | - | 付费 (美区 App Store) | iOS 上完美适配 Clash YAML 与 Override 覆写 |
| **[Quantumult X（圈 X）](/clients/quantumult-x/)** | 自研引擎 | - | - | ✓ | - | - | - | 付费 (美区 App Store) | 支持高级重写、脚本与自定义 DNS，适合进阶用户 |
| **[Surge（5 / Mac）](/clients/surge/)** | Surge 内核 | - | - | ✓ | ✓ | - | - | 含内购 / 官网授权 | 专业网络调试、抓包分析与精细规则控制 |
| **[Streisand](/clients/streisand/)** | Xray/sing-box 系 | - | - | ✓ | - | - | - | App Store | 支持 VLESS、VMess、Trojan、Hysteria |
| **[Potatso](/clients/potatso/)** | 基础引擎 | - | - | ✓ | - | - | - | App Store | ⚠️ 早期工具仅支持 SS/SSR/SOCKS，维护待核实 |
| **[OneClick](/clients/oneclick/)** | 基础引擎 | - | - | ✓ | - | - | - | App Store | ⚠️ 仅支持基础协议，维护状态待核实 |
| **[v2rayA](/clients/v2raya/)** | Xray / v2ray | - | - | - | - | ✓ | ✓ | 开源免费 (GitHub) | Web 控制面板透明代理，无桌面 Linux 服务器首选 |
| **[OpenClash](/clients/openclash/)** | Mihomo | - | - | - | - | - | ✓ | 开源免费 (GitHub) | OpenWrt 最成熟的 Clash 规则透明代理插件 |
| **[PassWall2](/clients/passwall2/)** | Xray / sing-box | - | - | - | - | - | ✓ | 开源免费 (GitHub) | OpenWrt 轻量透明代理，分流与节点控制直观 |
| **[Nikki](/clients/nikki/)** | Mihomo | - | - | - | - | - | ✓ | 开源免费 (GitHub) | ⚠️ **明确要求 OpenWrt 24.10 及以上版本与 fw4** |
| **[HomeProxy](/clients/homeproxy/)** | sing-box | - | - | - | - | - | ✓ | 开源免费 (GitHub) | 现代 sing-box 路由插件，契合 nftables 架构 |

---

## 三、分操作系统深度选型与部署注意事项

### 1. Windows 电脑端（核心词：Clash Verge Rev / v2rayN / Mihomo）
进入 [Windows 客户端专题 →](/clients/windows/)
- **常规首选**：[Clash Verge Rev](/clients/clash-verge-rev/) 是目前中文机场生态适配度最高的桌面端，几乎所有支持第三方订阅的机场（如光速云、星岛梦、一翻云）都提供一键导入 Clash 链接。若您同时有多条单节点分享链接（`vless://` / `vmess://`）或喜欢按核心切换测速，[v2rayN](/clients/v2rayn/) 是最稳健的补充。
- **必须注意的操作细节**：Windows 下使用 ChatGPT Desktop、Claude Desktop 或 Microsoft Store 版 Netflix 时，仅打开“系统代理”往往无效，必须在客户端开启 **Service Mode（服务模式）并打开 TUN 虚拟网卡模式**。

### 2. Android 安卓端（核心词：v2rayNG / FlClash / Hiddify / Karing）
进入 [Android 客户端专题 →](/clients/android/)
- **主力推荐**：安卓端建议优先在 **[v2rayNG](/clients/v2rayng/)**、**[FlClash](/clients/flclash/)**、**[Hiddify](/clients/hiddify/)** 与 **[Karing](/clients/karing/)** 四者中挑选。v2rayNG 极度轻量省电；FlClash 的 Clash 规则分组界面清晰；Hiddify 与 Karing 则对多协议订阅极其友好。
- **严防仿冒 APK**：切勿从搜索引擎广告位、各类“破解论坛”或非官方控制的 Google Play 假冒条目下载安卓安装包（再次提醒远离 Google Play 版 NekoBox）。

### 3. iOS / iPadOS 端（核心词：Shadowrocket / Stash / Quantumult X）
进入 [iOS 客户端专题 →](/clients/ios/)
- **商店与付费提醒**：Shadowrocket、Stash、Quantumult X 均为美区等海外商店付费应用，Surge 5 含应用内购买。购买前需自备合规海外区 Apple ID 并通过官方礼品卡充值或合规付款方式购买。
- **免费替代路线**：如果暂时不想购买付费应用，可在非国区 App Store 检索安装 Hiddify、Karing、Clash Mi 或 sing-box (SFI)。使用任何第三方共享 Apple ID 时，**绝不能在系统“设置”顶部的 iCloud 账户处登录**。

### 4. macOS 苹果电脑端（核心词：Intel vs Apple Silicon）
进入 [macOS 客户端专题 →](/clients/macos/)
- **芯片架构切勿装错**：Apple Silicon（M1–M4）芯片请认准文件名里的 `arm64` 或 `aarch64`；老款 Intel Mac 请选择 `x64` 或 `x86_64`（Clash Verge Rev 与 FlClash 官方发布页均有清晰标注）。
- **高级调试需求**：如果您在 Mac 上进行移动端 App 抓包、HTTP 重写或高度复杂的多策略路由，**[Surge Mac](/clients/surge/)** 具备完整的网络可观测性，适合专业开发者；普通用户用 Clash Verge Rev 或 FlClash 即可满足日常 99% 的流媒体与 AI 需求。

### 5. Linux 桌面与无头服务器端（核心词：DEB / RPM / AppImage / v2rayA）
进入 [Linux 客户端专题 →](/clients/linux/)
- **桌面发行版**：Debian / Ubuntu / Mint 系下载 `.deb`，Fedora / RHEL 系下载 `.rpm`，通用便携可用 `.AppImage`（注意赋予执行权限 `chmod +x`）。Clash Verge Rev、FlClash、v2rayN 与 Hiddify 均提供主流 Linux 安装格式。
- **无图形界面服务器 / Docker 宿主机**：使用 **[v2rayA](/clients/v2raya/)**（启动后台服务后直接在浏览器打开 `2017` 端口 Web 界面管理订阅与透明代理）或原生 **[sing-box](/clients/sing-box/)** systemd 服务最省资源。

### 6. OpenWrt / 软路由网关端（核心词：OpenClash / PassWall2 / Nikki / HomeProxy）
进入 [OpenWrt 客户端专题 →](/clients/openwrt/)
- **安装前四项硬核对**：部署到路由器前必须核实 **① OpenWrt 系统版本号 ② 路由器 CPU 架构（x86_64 / aarch64 / mipsel）③ 软件包格式（`.ipk` vs 新版 `apk`）④ 防火墙底座（fw3 vs fw4 nftables）**。
- **插件差异**：[OpenClash](/clients/openclash/) 功能全但占用闪存和内存较大，不适合 16MB 小闪存硬路由；[Nikki](/clients/nikki/) 明确要求 **OpenWrt 24.10+** 与 fw4；[HomeProxy](/clients/homeproxy/) 基于 sing-box，适合新架构纯净固件；[PassWall2](/clients/passwall2/) 对传统多协议节点支持友好。

---

## 四、三大代理内核深度对比：Mihomo vs Xray-core vs sing-box

在第三方代理客户端里，真正决定您能否连上最新机场节点、分流规则运行快不快、手机耗电高不高的，是隐藏在图形界面底下的**代理内核**。目前三大主流开源内核各有清晰边界：

| 对比维度 | Mihomo（原 Clash.Meta） | Xray-core | sing-box |
|---|---|---|---|
| **核心生态定位** | 延续 Clash 策略组与 YAML 配置体系的现代全能内核 | VLESS 与 Reality 协议的发明者与原生参考实现 | 新一代高性能通用代理平台，官方原生跨全端 |
| **配置文件格式** | 高度可读的 **YAML**（支持 `Rule Providers` 与 `Script/Parser` 覆写） | **JSON** 或标准节点链接（`vless://`、`vmess://`） | 结构严谨的 **JSON**（支持 `.srs` 二进制规则集，内存占用极低） |
| **规则分流灵活度** | **极高**，策略组嵌套、测速分组、Fake-IP 与进程分流极为成熟，中文机场 95% 原生下发 | 强于底层路由与单节点传输调优，GUI 策略交互依赖前端壳（如 v2rayN/v2rayNG） | 兼顾精细化 DNS/路由规则与低内存占用，非常适合路由器、iOS/Android 长驻后台 |
| **新协议支持度** | 支持 VLESS-Reality、Trojan、SS、Hysteria 2、TUIC、WireGuard | 率先支持 VLESS-XTLS-Vision / Reality，部分新版协议需依赖配套内核 | 全协议原生一体化支持（含 ShadowTLS、Hysteria 2、TUIC、WireGuard） |
| **代表客户端软件** | Clash Verge Rev、FlClash、Clash Nyanpasu、Clash Mi、OpenClash、Nikki | v2rayN、v2rayNG、PassWall2 | Hiddify、Karing、sing-box (SFA/SFI/SFM)、HomeProxy、NekoBox |

**内核选型一句总结**：如果您的机场直接提供标准的 Clash YAML 订阅，用 **Mihomo 系客户端（Clash Verge Rev / FlClash / Stash / OpenClash）** 最省事；如果您的机场偏向通用节点链接或您追求低内存续航与原生 sing-box 生态，选择 **v2rayN/v2rayNG** 或 **sing-box 系（Hiddify / Karing / SFA / HomeProxy）** 最合适。

---

## 五、全平台 24 款客户端逐一精读与使用场景定位

为了帮助您直接匹配最顺手的软件，下面按电脑端、移动端与路由器逐组解读：

### Windows / macOS / Linux 桌面组
- **[Clash Verge Rev](/clients/clash-verge-rev/)**：目前替代已归档的 Clash for Windows 最成熟的方案，基于 Rust/Tauri 框架打造，资源占用低于传统 Electron 客户端，支持规则覆写、TUN Service Mode 与三网桌面端完整兼容。
- **[v2rayN](/clients/v2rayn/)**：老牌且持续活跃的多核心管理神器，新版已实现 Windows / macOS / Linux 跨平台。不仅能直接管理几十条散装节点链接，还能在内置核心间自由切换，适合喜欢自己把控底层路由与真实延迟测速的用户。
- **[FlClash](/clients/flclash/)**：基于 Flutter 开发的跨平台 Mihomo 客户端，界面极简直观，桌面端与 Android 手机端外观和操作几乎一致，降低了双端学习成本。
- **[Clash Nyanpasu](/clients/clash-nyanpasu/)**：侧重于配置增强与脚本扩展能力的桌面端，支持 Mihomo 与 Clash-rs 多内核切换，适合高阶覆写玩家。
- **[Hiddify](/clients/hiddify/)** 与 **[Karing](/clients/karing/)**：两者均基于高性能 sing-box 内核且几乎覆盖全部主流系统（含 Windows/macOS/Linux/Android/iOS），支持自动节点切换与多种主流订阅格式（Clash/Base64/sing-box）直接导入，无需外部在线转换。
- **[Clash Mi](/clients/clash-mi/)**：全平台统一 Mihomo 体验的新锐图形工具，支持 Clash YAML。
- **[Mihomo Party](/clients/mihomo-party/)**：早期部分教程常提及的 Mihomo 桌面端，但目前公开资料提醒其维护状态需单独核实，新手优先选用 Clash Verge Rev 或 FlClash 更稳妥。
- **[v2rayA](/clients/v2raya/)**：Linux 生态独树一帜的 Web 控制面板方案，装在无显示器的 Ubuntu 服务器、Debian 小主机或 NAS 上后，局域网内任何设备打开浏览器即可接管全网流量。

### Android 移动端组
- **[v2rayNG](/clients/v2rayng/)**：安卓端装机量极高的 Xray 系轻量客户端，界面朴素但极其省电稳健，支持自定义分流规则与节点批量测速。
- **[Clash Meta for Android](/clients/clash-meta-for-android/)**：原生遵循 Clash 策略组与 YAML 配置体系，若您在电脑用 Clash Verge Rev，在安卓用它或 FlClash 可以复用完全一致的机场订阅。
- **[sing-box for Android (SFA)](/clients/sing-box/)**：官方团队维护的原生 sing-box 安卓端，适合导入机场下发的标准 sing-box JSON 配置。
- **[NekoBox for Android](/clients/nekobox/)**：功能强大的 sing-box 系工具，但务必注意官方提醒：**维护资源有限，且绝对不要使用 Google Play 商店中已被第三方控制的同名应用**。

### iOS / iPadOS 移动端与 Apple 生态组
- **[Shadowrocket（小火箭）](/clients/shadowrocket/)**：iOS 生态事实上的通用标准，几乎所有支持第三方订阅的机场（如光速云、星岛梦、一翻云）都提供原生小火箭适配，支持查看每一条网络请求日志、实时测速及按需连接，美区商店付费买断。
- **[Stash](/clients/stash/)**：如果您习惯 Clash 的策略组逻辑与 YAML 覆写规则，Stash 在 iOS / iPadOS / macOS / tvOS 上提供了非常顺滑的 Clash 原生兼容体验，同样为海外区商店付费应用。
- **[Quantumult X（圈 X）](/clients/quantumult-x/)**：主打高级 HTTP 重写（Rewrite）、自定义脚本解析与极细粒度的分流图标定制，适合喜欢折腾个性化规则与调试的用户。
- **[Surge（Surge 5 / Surge Mac）](/clients/surge/)**：苹果生态专业级网络工程工具，内置抓包分析、HTTPS 解密调试与企业级规则引擎，包含应用内订阅/独立 Mac 授权，主要面向开发者与专业玩家。
- **[Streisand](/clients/streisand/)**、**[Potatso](/clients/potatso/)** 与 **[OneClick](/clients/oneclick/)**：Streisand 支持 VLESS/Hysteria 等现代协议；而 Potatso 与 OneClick 属于偏早期或基础协议客户端，长期维护状态需结合商店页面核实。

### OpenWrt 软路由网关组
- **[OpenClash](/clients/openclash/)**：历史最悠久、规则库与 Fake-IP 控制选项最丰富的 OpenWrt Mihomo 插件，对老手极其友好。
- **[PassWall2](/clients/passwall2/)**：界面直观、支持 Xray 与 sing-box 多核心混合分流，适合从单链接迁移到软路由的用户。
- **[Nikki](/clients/nikki/)**：新一代轻量化 Mihomo 透明代理，运行效率高但**强制要求 OpenWrt 24.10 及以上版本（基于 fw4 nftables）**，刷机前必须先看路由器固件版本。
- **[HomeProxy](/clients/homeproxy/)**：面向新版 ImmortalWrt / OpenWrt nftables 原生构建的 sing-box 管理界面，结构现代且依赖精简。

---

## 六、协议兼容性与订阅导入安全操作规范

### 1. 常见机场协议对应的客户端内核支持度

| 协议名称 | Mihomo 内核 (Clash Verge/FlClash) | Xray-core (v2rayN/v2rayNG) | sing-box 核心 (Hiddify/Karing/SFA) | Shadowrocket (iOS) |
|---|---|---|---|---|
| **VLESS / VLESS-Reality** | ✓ 完整支持 | ✓ 原生支持 | ✓ 原生支持 | ✓ 完整支持 |
| **Trojan / Shadowsocks** | ✓ 完整支持 | ✓ 完整支持 | ✓ 完整支持 | ✓ 完整支持 |
| **Hysteria 2 / TUIC** | ✓ 完整支持 | 需搭配 sing-box/Mihomo 核心 | ✓ 原生支持 | ✓ 新版本支持 |
| **AnyTLS** | 需核对最新内核支持情况 | 需核对核心版本 | 需核对核心版本 | 需核对最新版本 |

### 2. 客户端日常安全底线（必读）
1. **核对发布渠道与开源仓库**：开源软件只从项目原始 GitHub Releases 页面或官方应用商店安装，拒绝百度搜索推广页、国内网盘转存的“绿色汉化版”。
2. **保护订阅链接不要外泄**：不要把付费机场的订阅链接发到微信群、论坛或来路不明的在线订阅转换网站。
3. **关闭无关系统级代理扩展冲突**：在使用 Clash / v2rayN / Shadowrocket 时，卸载浏览器上旧版废弃的未知代理插件，避免端口劫持或规则冲突。

---

## 七、从“选好软件”到“跑通流媒体与 AI”的下一步

选定客户端后，请顺着以下路径完成实战配置与排障：
- **第 1 步（导入订阅并开对模式）**：阅读 [机场订阅导入全流程教程 →](/guides/subscription-setup/)
- **第 2 步（配置 TUN 与防 DNS/IPv6 泄漏）**：阅读 [TUN 模式与 DNS 防泄漏指南 →](/guides/tun-and-dns/)
- **第 3 步（核对您的机场是否支持第三方订阅）**：前往 [机场品牌数据库 →](/brands/)
- **第 4 步（解决客户端超时或启动异常）**：前往 [故障排查中心 →](/troubleshooting/)

## 八、客户端软件常见问题 (FAQ)

<FaqBlock :items="$frontmatter.faqs" />
