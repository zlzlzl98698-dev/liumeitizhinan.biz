---
title: 2026 机场与客户端配置教程：订阅、TUN 与分流全流程
description: 从零开始的标准化任务型使用教程入口：覆盖准备检查、客户端选择、Windows/macOS/Android/iOS 配置路线、订阅导入、Rule vs Global、TUN 模式、DNS 防泄漏、多设备软路由与配置验证。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: CollectionPage
dataSource: 使用教程知识库 & data/clients.json
faqs:
  - q: 纯新手第一次买机场，完全看不懂 Clash 和订阅链接，最稳妥的上手顺序是什么？
    a: 两条路线可选：如果您想最省事，选择提供自研一键客户端的服务（例如光速云、梯子云或飞猫云等），下载官方客户端登录账号即可用；如果您想拥有更高的自由度与多设备规则分流，按“准备对应平台开源客户端 → 复制机场订阅链接 → 导入并更新 → 开启 Rule 规则模式 → 选节点测试延迟”五步即可跑通。
  - q: 什么是机场“订阅链接”？为什么千万不能发给别人或传到未知网页转换？
    a: 订阅链接是一个包含您账号鉴权 Token/UUID 的特殊 URL，客户端访问它就会拉取全部节点服务器地址与密码。一旦泄露给他人，别人可以直接免费消耗您的套餐流量，甚至导致您的账号触发防共享封禁。不要把订阅链接粘贴到搜索引擎里搜出来的陌生“免费在线订阅转换”网站。
  - q: 代理模式里的 Rule（规则）、Global（全局）和 Direct（直连）有什么区别，平时开哪个？
    a: 日常 99% 的时间应当保持在 Rule（规则）模式：国内网站（微信、淘宝、网银、B站国内版）直接本地连接，海外服务（YouTube、Netflix、ChatGPT）走代理节点。Global（全局）会把全部流量都硬塞进海外节点，不仅拖慢国内软件还会白白浪费流量，仅在排查规则是否漏掉某个冷门网站时临时开启。
  - q: 为什么我已经开了代理，浏览器能打开 Google，但桌面版 ChatGPT、Claude 或终端就是连不上？
    a: 这是因为仅开启了“系统代理（System Proxy）”，而许多独立桌面应用和命令行工具并不读取系统的 HTTP 代理设置。解决方法是在 Clash Verge Rev、v2rayN 或 FlClash 中安装服务模式并打开 TUN（虚拟网卡）模式，接管全系统的底层数据包。
  - q: 客户端里的“系统代理”和“TUN 模式”可以同时开吗？
    a: 在大多数现代客户端（如 Clash Verge Rev）中，开启 TUN 后可以关闭系统代理以免多余端口转发，也可按默认策略配合使用；但如果电脑里同时运行了其他商业 VPN 或网游加速器，必须关闭另一方，否则虚拟网卡冲突会导致整台电脑断网。
  - q: 为什么配置好后，访问 AI 工具或流媒体还是提示我在中国大陆？
    a: "八成是因为没有关闭客户端 IPv6 穿透或开启了本地直连 DNS。请在客户端配置中禁用 IPv6（如 Mihomo 设置 ipv6: false），并将 DNS 模式切换为 Fake-IP 配合海外远程 DoH 解析。"
  - q: 订阅链接隔一段时间需要手动更新吗？
    a: 建议在客户端开启“每 12–24 小时自动更新订阅”（或打开软件时自动更新）。因为服务商可能会定期增补新落地 IP、替换故障节点或变更国内中转入口域名，长期不更新会导致节点逐步超时失效。
  - q: 家里买了 Apple TV 或安卓智能电视想直接看 Netflix 4K，怎么配置最合理？
    a: Apple TV (tvOS) 可在海外区商店直接安装 Stash 或 Shadowrocket 导入通用订阅；普通智能电视如果无法便捷装软件，建议在家里部署一台 OpenWrt 软路由/旁路由（运行 OpenClash、PassWall2、Nikki 或 HomeProxy），把电视网关指向软路由即可全自动接管。
  - q: 配置完客户端以后，怎么确认一切分流、DNS 和带宽都真正跑通了？
    a: 做三步快速验证：① 打开百度/淘宝确认国内直连秒开且不走节点流量；② 打开客户端实时连接（Connections）界面，刷新 YouTube 或 ChatGPT 查看请求确实命中了您选定的海外节点；③ 打开 YouTube 4K 视频确认播放流畅且查看详细统计速度达标。
  - q: 如果在操作某一步骤时提示订阅更新失败或节点全部超时，去哪里查？
    a: 请直接转至本站故障排查中心，按具体报错症状查阅《订阅更新失败解决步骤》《节点全部超时排查》或《TUN 模式异常修复》。
---

# 使用教程中心：从零上手到精细分流与软路由部署路线图

**Answer-First 核心结论**：无论您使用 Windows、macOS、Android、iOS 还是 OpenWrt 路由器，把一条机场服务真正用稳、用好（既能流畅看 Netflix 4K / YouTube，又能低风控运行 ChatGPT / Claude / Gemini 且不影响国内软件），只需严格遵循 **“① 确认订阅/专属端类型 → ② 安装正版客户端 → ③ 导入订阅并设为 Rule 规则模式 → ④ 按需打开 TUN 模式与防泄漏 DNS/IPv6 → ⑤ 验证国内外分流生效”** 这五步标准流。本页为您提供全平台配置总路线图，各分步精细实操可点击进入对应三级教程全文。

---

## 一、使用前必查的 3 项准备工作

在下载任何软件或复制链接前，花 1 分钟确认以下三点能帮您少走 90% 的弯路：
1. **核对所买机场属于哪类接入方式**：登录机场官网仪表盘，如果页面提供 `Clash 订阅` / `Shadowrocket 订阅` / `一键导入` 按钮，说明支持第三方通用客户端（如光速云、星岛梦、一翻云、唯兔云、速界、梯子云等）；如果官网只提供自家专用客户端下载按钮且明确声明不提供订阅链接（如飞猫云、SOGO 云、全球云、隐形人等），则**直接下载官网专用 App 登录账号即可**，无需看第三方配置教程。
2. **校准设备系统时间**：代理加密协议（VLESS、Trojan、VMess）对客户端与服务器之间的时间戳误差非常敏感。Windows 和手机端先开启「自动设置时间与时区」，避免因本地时钟偏差超过 90 秒导致所有节点握手失败。
3. **清理历史冲突代理软件**：卸载或彻底退出以前装过的旧版废弃客户端、冲突商业 VPN、网游加速器或浏览器 SwitchyOmega 代理插件，防止本地端口与虚拟网卡抢占。

---

## 二、全平台标准化配置路线一览（按您的设备对号入座）

| 操作系统 | 推荐首选开源/商店客户端 | 获取来源注意事项 | 核心配置关键点 | 深入三级分步教程 |
|---|---|---|---|---|
| **Windows 10/11** | [Clash Verge Rev](/clients/clash-verge-rev/) / [v2rayN](/clients/v2rayn/) / [FlClash](/clients/flclash/) | GitHub 官方 Releases 下载 `x64-setup.exe` | 安装 Service Mode，用桌面端 AI/流媒体时务必开 **TUN 模式** | [Clash Verge Rev 配置教程 →](/guides/clash-mihomo-guide/) |
| **macOS** | [Clash Verge Rev](/clients/clash-verge-rev/) / [FlClash](/clients/flclash/) / [Surge Mac](/clients/surge/) | **严格区分 Intel (`x64`) 与 Apple Silicon M 系列 (`arm64`)** | 初次开启增强/TUN 需在「系统设置 → 隐私与安全性」放行网络扩展 | [macOS 客户端大全 →](/clients/macos/) |
| **Android** | [v2rayNG](/clients/v2rayng/) / [FlClash](/clients/flclash/) / [Hiddify](/clients/hiddify/) / [Karing](/clients/karing/) | GitHub Releases 核对 APK（**严禁用 Google Play 版 NekoBox**） | 开启系统设置“允许后台高耗电/自启动”，锁定应用防锁屏断流 | [Android 客户端大全 →](/clients/android/) |
| **iOS / iPadOS** | [Shadowrocket](/clients/shadowrocket/) / [Stash](/clients/stash/) / [Hiddify](/clients/hiddify/) / [sing-box SFI](/clients/sing-box/) | 非大陆区 App Store（小火箭/Stash 为付费应用；勿用系统 iCloud 登录共享号） | 全局路由选 **配置（Config）**；开启按需连接防 Wi-Fi/5G 切换断线 | [Shadowrocket 小火箭教程 →](/guides/shadowrocket-guide/) |
| **Linux / NAS** | [Clash Verge Rev](/clients/clash-verge-rev/) / [v2rayA](/clients/v2raya/) / [sing-box](/clients/sing-box/) | 桌面用 DEB/RPM/AppImage；无桌面主机首选 v2rayA | 无头服务器启动 v2rayA 后在浏览器 `2017` 端口开启透明代理 | [v2rayN 与 sing-box 指南 →](/guides/v2rayn-singbox-guide/) |
| **OpenWrt 软路由** | [OpenClash](/clients/openclash/) / [PassWall2](/clients/passwall2/) / [Nikki](/clients/nikki/) / [HomeProxy](/clients/homeproxy/) | 核对版本、CPU 架构与 fw3/fw4（**Nikki 须 OpenWrt 24.10+**） | 电视/PS5 网关指向旁路由，确保足够闪存与路由 DNS 劫持正确 | [多设备与软路由配置 →](/guides/multi-device-router/) |

---

## 三、通用订阅客户端六步标准上手流程

本流程适用于市面上 90% 的第三方规则代理软件（以 Clash Verge Rev 与 Shadowrocket 为例）：

### 第一步：获取并安全导入订阅链接
登录机场官网用户中心，找到「订阅管理 / 一键导入」。如果您用 Clash Verge Rev / FlClash / Stash / OpenClash，优先点击「复制 Clash 订阅」或直接点击一键导入唤醒客户端；如果您用 v2rayN / v2rayNG / Hiddify，复制「通用订阅」。粘贴到客户端「订阅（Profiles）」栏后，务必先执行一次手工拉取更新。详细防错细节见 [机场订阅导入全流程教程 →](/guides/subscription-setup/)。

### 第二步：核对订阅更新状态与流量信息
成功拉取后，订阅卡片上通常会显示您的**套餐总流量、已用流量、剩余额度以及到期日期**，并且节点列表出现几十个不同国家/地区的节点（如香港01、日本01、新加坡01、美国01）。如果这里报红字更新失败或节点数为 0，立即关掉旧代理直连更新一次，或查看 [订阅更新失败排查 →](/troubleshooting/subscription-update-failed/)。

### 第三步：选对代理运行模式（Rule vs Global vs Direct）
- **Rule（规则模式 —— 日常唯一推荐）**：客户端按内置分流列表自动判断——微信、支付宝、国内视频、淘宝、公司内网直接本地直连不耗节点流量；Google、YouTube、Netflix、OpenAI、GitHub 等自动走您选中的海外节点。
- **Global（全局模式 —— 仅限临时测试）**：所有连接强行全部进代理隧道，会显著拖慢国内 App 打开速度并浪费付费流量。
- **Direct（直连模式）**：相当于暂时不走任何海外节点，所有流量全走本地宽带。

### 第四步：开启系统代理或 TUN 模式（桌面端核心分水岭）
- 如果您只在 Chrome/Edge 浏览器看 YouTube、查 Google 或登录网页版 ChatGPT，在客户端打开 **「系统代理（System Proxy）」** 即可生效。
- 如果您使用 **ChatGPT 桌面端、Claude Desktop、Cursor IDE、Docker 拉镜像、终端 `git`/`npm`/`curl` 或 Windows UWP 应用**，必须进一步打开 **「TUN 模式（虚拟网卡接管）」**。开启 TUN 后请勿再同时打开其他 VPN 或网游加速器。

### 第五步：设置防 DNS 泄漏与关闭 IPv6（解锁流媒体与 AI 的关键一步）
很多地区报错并非节点问题，而是本地宽带把 `AAAA`（IPv6）或 DNS 解析请求直接透传出去了：
1. 在 Clash / Mihomo 系客户端设置中开启 `DNS` 模块，将增强模式设为 `fake-ip`（若与公司内网或开发工具网段冲突再考虑 `redir-host`）；
2. 在代理设置或覆写脚本里强制关闭 IPv6（`ipv6: false`），并在 Shadowrocket 中关闭 IPv6 开关；
3. 对 ChatGPT、Claude、Gemini 建立独立分流策略组并设为**手动选择（`select`）固定美/日/新单节点**，不要让 AI 流量在多个国家之间自动测速跳转。完整配置原理与参数见 [TUN 模式、DNS 与分流规则指南 →](/guides/tun-and-dns/)。

### 第六步：验证配置是否真正生效
配置完毕后按以下三个动作验证：
1. 打开一个国内测速站或淘宝，确认加载秒开且未消耗机场节点流量；
2. 打开客户端 **「连接（Connections）」** 日志面板，访问 `youtube.com` 与 `chatgpt.com`，确认日志列表里确实显示这两个域名命中了您的海外代理节点（而不是 `DIRECT`）；
3. 打开 YouTube 播放一段 4K 测试片，右键打开「详细统计信息（Stats for nerds）」，确认播放连接带宽稳定且画质可拉至 2160p（画质调优方法见 [网络检测与播放画质优化 →](/guides/streaming-optimization/)）。

---

## 四、多设备协同与家庭大屏配置思路

1. **手机 + 电脑双端同步**：把同一个通用订阅链接分别导入手机 Shadowrocket / v2rayNG 与电脑 Clash Verge Rev / v2rayN 即可；若购买了“不限设备”或高设备上限套餐，可同时在线。但切记**不要把订阅分享给其他城市的朋友使用**，避免触发多 IP 并发封号。
2. **客厅电视与游戏主机（Apple TV / Android TV / PS5 / Switch）**：
   - 如果家中核心大屏是 **Apple TV**，可直接用海外区 Apple ID 安装 Stash 或 Shadowrocket tvOS 版导入订阅，体验最轻量；
   - 如果家中有多种安卓电视、LG/Samsung 智能电视与游戏主机，最一劳永逸的方案是加装一台跑 **OpenWrt 的旁路由**，安装 [OpenClash](/clients/openclash/)、[PassWall2](/clients/passwall2/)、[Nikki](/clients/nikki/) 或 [HomeProxy](/clients/homeproxy/)，再在电视 Wi-Fi 设置里把“网关”与“DNS”手动填为旁路由 IP 即可实现免装软件全家科学看 4K（注意 4K 观影每小时可耗 5–8GB 流量，套餐配额需留足余量）。

---

## 五、分平台核心操作细节与 DNS/规则进阶避坑

### 1. Windows 与 macOS：Clash Verge Rev / v2rayN 避坑要点
- **Windows 开启 TUN 的正确姿势**：打开 Clash Verge Rev 后，进入左侧「设置」→ 找到「服务模式（Service Mode）」点击盾牌图标安装并启用；回到主页把 **TUN 模式** 开关拨到开启，此时在电脑系统网络适配器列表里会出现一张虚拟网卡。开启 TUN 后，通常不需要同时再开系统代理，或者保留默认配置即可让 ChatGPT Desktop、Cursor、Git、Python 命令行全部走代理。
- **macOS 芯片架构与权限弹窗**：在 GitHub 下载时，`aarch64`/`arm64` 专供 M1–M4 芯片，`x64` 专供老款 Intel Mac。启用系统代理或增强模式弹出系统密码框时需输入 Mac 登录密码授权；若提示网络扩展被阻止，前往「系统设置 → 隐私与安全性」底部点击允许。
- **DNS 模块与 `fake-ip-filter`**：在 Clash / Mihomo 系内核中，开启 `Fake-IP` 后本地请求海外域名会收到 `198.18.x.x` 虚拟地址，大幅减少本地 DNS 等待并杜绝解析泄漏；但如果您的公司内网 VPN、校园内网认证页面（如 `10.x` / 登录 portal）或部分国内网游启动器依赖真实局域网 IP 解析，应把这些内网域名加进 `fake-ip-filter` 跳过列表，或者临时改用 `redir-host` 模式。

### 2. Android 与 iOS：防杀后台与跨网无缝切换设置
- **Android 防断流三步**：进入手机系统「设置 → 应用管理 → 找到 v2rayNG/FlClash/Hiddify」→ ① 将耗电管理改为「完全允许后台行为 / 无限制」；② 允许应用自启动；③ 在最近任务界面下拉锁定该应用卡片。否则国内手机系统常在锁屏 5 分钟后杀掉代理服务导致微信收不到提醒或视频突然卡死。
- **iOS Shadowrocket 实用细节**：在 Shadowrocket 底部「设置 → 按需连接」中打开开关并配置 Wi-Fi/蜂窝切换触发，手机走出家门切换 5G 时无需手动重连；在全局路由务必选择 **「配置（Config）」**，并在首页点击「连通性测试」检查节点真正到 Google/YouTube 的 HTTP 延迟。

### 3. OpenWrt 软路由：四个必须提前避开的坑
- **坑一（闪存与内存爆满）**：OpenClash 加上完整的 GeoIP/GeoSite 数据库和内核需要几十 MB 空间，16MB 闪存老旧路由器切勿硬塞；
- **坑二（Nikki 版本不匹配）**：安装 [Nikki](/clients/nikki/) 前务必确认系统已是 **OpenWrt 24.10+**，旧版 21.02/22.03/23.05 无法正常运行；
- **坑三（光猫下发 IPv6 穿透）**：家中路由器如果开启了 IPv6 分配而透明代理未完整接管 IPv6 转发，电视或电脑打开双栈网站照样会走大陆 IPv6 导致解锁失败；最稳妥的做法是在 OpenWrt LAN 口关闭多余的 IPv6 通告或在插件内启用 IPv6 代理/禁掉 AAAA 解析；
- **坑四（主路由 vs 旁路由网关指错）**：如果把 OpenWrt 当旁路由接入现有主路由，需要接管的设备（如 Apple TV）必须手动把网关和 DNS 都填成旁路由局域网 IP，且旁路由防火墙需关闭多余的桥接冲突或开启正确的转发规则。

---

## 六、教程体系与下游排查快速直达

- 核心三级教程全索引：[订阅导入全流程](/guides/subscription-setup/) ｜ [Clash Verge Rev 配置](/guides/clash-mihomo-guide/) ｜ [Shadowrocket 教程](/guides/shadowrocket-guide/) ｜ [v2rayN 与 sing-box](/guides/v2rayn-singbox-guide/) ｜ [TUN 与 DNS 设置](/guides/tun-and-dns/) ｜ [多设备与软路由](/guides/multi-device-router/) ｜ [画质与缓冲优化](/guides/streaming-optimization/)
- 配置遇到报错或连不上网？直接转入 [故障排查中心 →](/troubleshooting/)
- 需要核对或更换支持通用订阅的机场？前往 [机场品牌数据库 →](/brands/) ｜ [2026 机场推荐 →](/recommend/)

## 七、使用教程常见问题 (FAQ)

<FaqBlock :items="$frontmatter.faqs" />
