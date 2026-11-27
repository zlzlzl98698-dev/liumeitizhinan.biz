---
title: Clash Verge Rev 安装、订阅导入与 Mihomo 核心规则分流实战教程（2026）
description: Windows、macOS、Linux 全平台 Clash Verge Rev 详细教程：含官方来源核验、Mihomo 内核选择、导入订阅、安装 Service Mode 服务模式、开启 TUN 虚拟网卡及规则分流写法。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: HowTo
dataSource: 第三方代理客户端.txt、Clash Verge Rev 开源项目规范
faqs:
  - q: Clash Verge Rev 和原版 Clash Verge、Clash for Windows 有什么区别？
    a: "原版 Clash for Windows 与早期 Clash Verge 已于 2023 年底停更。Clash Verge Rev 是由社区持续维护的活跃分支，内置更先进的 Mihomo（原 Clash.Meta）内核，原生支持 VLESS-Reality、Hysteria 2、TUIC 等新协议与现代化 TUN 模式。"
  - q: 为什么只开启“系统代理”，桌面版 ChatGPT、Cursor 或终端 git 依然连不上网？
    a: "因为许多桌面独立程序、命令行终端和游戏客户端不读取 Windows/macOS 的 HTTP 系统代理环境变量。必须按照下文步骤先安装“服务模式（Service Mode）”并开启“TUN 模式（虚拟网卡）”，才能从网络层接管全部出站流量。"
  - q: 在哪里下载 Clash Verge Rev 最安全？能从网盘或陌生搜索站下载吗？
    a: "强烈不建议从百度网盘、来路不明的中文“官网”广告站下载！桌面代理软件拥有系统网络权限，应仅从 GitHub 官方仓库（clash-verge-rev/clash-verge-rev）的 Releases 页面核对安装包，并在下载后核对校验。"
  - q: 打开 Clash Verge Rev 报错无法启动或 TUN 模式打不开怎么办？
    a: "Windows 端常见原因包括缺少 WebView2 运行时、旧版 Clash for Windows 残留服务占用端口，或未以管理员身份授权安装 Service Mode；macOS 常见原因是首次启用 TUN 时需输入开机密码授权系统扩展。"
---

# Clash Verge Rev 安装、订阅导入与 Mihomo 核心规则分流实战教程（2026）

**Answer-First 核心结论**：截至 2026 年，[Clash Verge Rev](/clients/clash-verge-rev/) 是 Windows、macOS 与 Linux 桌面端最优先的通用客户端选择——内置 **Mihomo（Clash.Meta）内核**，兼容 VLESS、VLESS-Reality、Trojan、Shadowsocks 与 Hysteria 2 协议。

完整配置只需把握以下 **4 个核心环节**：
- **①–② 安装与导入**：从真实 GitHub Release 安装并卸载停更旧版 CFW → 在「订阅」导入支持通用订阅的机场链接并启用自动更新。
- **③–④ 接管与分流**：在「设置」同时启用 **系统代理 + 服务模式 + TUN 模式（关闭 IPv6）** → 在「代理」保持 **Rule（规则）模式**，并为 AI 工具设置固定节点分组。

---

## 一、适用范围与安装前安全核查

### 1. 适用平台与最低环境要求
- **Windows**：Windows 10 / 11（64 位 `x64` 或 `ARM64`），系统内需具备 Microsoft Edge WebView2 运行时（Win11 已默认自带）。
- **macOS**：Apple Silicon (`arm64` / M1–M4) 与 Intel (`x64`) 均提供对应 `.dmg` 安装包。
- **Linux**：提供 `.deb`、`rpm` 及 `.AppImage` 安装包，支持主流桌面发行版。

### 2. 安全下载唯一可靠路径
由于原版 Clash for Windows 已长期停更且网上出现大量伪装“中文破解版/官网”的投毒安装包（内置窃密木马、劫持剪贴板钱包地址），请务必核对：
- 从开源项目官方 Release 页面下载（见 [Clash Verge Rev 客户端百科页](/clients/clash-verge-rev/) 核对开源说明）；
- 如果您电脑上仍装有旧版 **Clash for Windows**，请务必先按 [CFW 平滑迁移至 Clash Verge Rev 指南](/guides/cfw-to-clash-verge/) 彻底关闭系统代理与服务残留再卸载安装新版，否则可能造成本地端口冲突与断网。

---

## 二、第 1 步：界面汉化、内核核对与导入机场订阅

首次打开 Clash Verge Rev 后界面直观清晰，按以下顺序初始化：

1. **切换简体中文**：点击左侧底部 **「Settings（设置）」** → 在 `Clash Verge Setting` 区域将 `Language` 切换为 **简体中文**，界面立即更新。
2. **核对内置内核**：在设置界面下方确认 `Clash Core` 默认选中为 **`Mihomo`（Alpha 或正式版均可，推荐正式稳定版 `Mihomo`）**，以确保兼容光速云、星岛梦、一翻云等品牌常见的 VLESS / Trojan / Hysteria 2 节点协议。
3. **导入订阅配置文件**：
   - 前往您使用的支持第三方订阅的机场后台（注意：仅提供自研客户端的品牌如飞猫云、隐形人等不支持此步骤），复制 **Clash 订阅链接**。
   - 点击 Clash Verge Rev 左侧 **「订阅（Profiles）」** → 在上方输入框粘贴链接 → 点击 **「导入」**。
   - 导入成功后卡片下方会显示该机场配置的已用流量与到期日。**左键单击卡片选中使其变为高亮激活状态**。
   - 右键卡片 → **「编辑信息」**，将自动更新间隔设为 `720` 分钟（12 小时），保存。

---

## 三、第 2 步：正确开启系统代理与 TUN 模式（解决桌面 App 联网的关键）

很多初学者卡在这一步：浏览器打开 Google 正常了，但桌面版 ChatGPT、Claude 桌面端、Cursor 编辑器、Git Bash、Docker 或终端完全报错连接超时。**这是是否开启 TUN 模式的核心差异**：

### 两种接管模式对比
- **系统代理（System Proxy）**：只在操作系统设定一个本地 HTTP/SOCKS 端口（默认通常是 `7897`）。浏览器读取它，但大量桌面独立客户端和 CLI 终端直接无视系统代理。
- **TUN 模式（虚拟网卡接管）**：在系统底层创建一张虚拟网卡，把所有进程发起的底层 TCP/UDP 流量（包括桌面端 ChatGPT、游戏、终端、DNS 查询）全部拦截进 Mihomo 引擎分流。

### 安装服务模式并启用 TUN 的正确步骤
1. 点击左侧 **「设置」** → 找到 **「Clash 设置」** 区域。
2. 在 **「服务模式（Service Mode）」** 旁点击安装图标（小盾牌或管理按钮）→ Windows 弹出 UAC 权限提示点击「是」（macOS 输入锁屏密码）→ 安装成功后图标会变为绿色启用状态。
   *(注：如果不安装 Service Mode 直接开 TUN，软件会报错无法创建虚拟网卡或每次重启必须手工右键“以管理员身份运行”。)*
3. 将 **「TUN 模式」** 开关拨为开启（推荐堆栈选用 `Mixed` 或 `System`，开启严格路由 `Strict Route`，**DNS 劫持保留默认或 `any:53`**）。
4. 若您的网络环境不需要 IPv6 出海、且发现 YouTube 送中或 Netflix 报错，请在同一页或全局扩充设置中将 **「IPv6」开关保持关闭**（防止本地 IPv6 直出泄露真实定位，详情见 [TUN 与 DNS 防泄漏专题](/guides/tun-and-dns/)）。

---

## 四、第 3 步：选节点与日常模式管理

点击左侧 **「代理（Proxies）」** 进入节点面板：

1. **顶部永远首选「规则（Rule）」**：
   - **Rule（规则模式）**：根据配置内预设规则自动分流——微信、淘宝、B站、国内银行直连 `DIRECT`；Google、Netflix、ChatGPT 走代理节点。
   - **Global（全局模式）**：除保留地址外所有流量强制走 `GLOBAL` 分组所选的同一个节点，不仅拖慢国内网页，还会迅速烧光月流量，仅在排查特定网页是否因分流漏网时临时开启。
   - **Direct（直连模式）**：彻底放行全部流量直连，相当于临时暂停代理。
2. **测速与切换节点**：
   - 点击各分组右侧的闪电按钮触发一次真实 URL 延迟测试。
   - 不要一味只盯着延迟最低的香港节点——如果您要使用网页版 ChatGPT，在部分服务商（如光速云 2026-08-19 实测）香港专线会受 OpenAI 网页端区域限制，此时请在代理组手动切换至 **美国、日本或新加坡** 节点。
   - 若高频使用 **Claude Pro**，切忌使用 `url-test`（自动按延迟不停跳切节点），请在订阅中通过规则把 Anthropic 域名单独绑定到一个固定地区的 `Select` 手选分组，避免 IP 跳变触发封号（实操配置代码见 [Claude 防封号锁单节点指南](/guides/claude-fixed-node-rules/)）。

### 接管方式与出站模式速查

| 功能项 / 模式 | 工作机制 | 适用场景 | 注意事项 |
|---|---|---|---|
| 系统代理（System Proxy） | 设定本地 HTTP/SOCKS 端口（默认 `7897`） | 常规浏览器日常网页访问 | 桌面端 ChatGPT、Cursor、终端常不读取系统代理 |
| TUN 模式（虚拟网卡） | 底层创建虚拟网卡拦截全系统 TCP/UDP 与 DNS | 桌面 AI 客户端、游戏、CLI 终端 | 需先安装绿色 Service Mode；建议关闭 IPv6 防泄漏 |
| Rule（规则模式） | 按订阅预设规则自动区分国内外分流 | 日常 99% 长期挂机首选 | 国内站走 `DIRECT`；Claude 建议另建 `Select` 组锁节点 |
| Global（全局模式） | 除保留地址外全部流量强制走 `GLOBAL` 单节点 | 仅用于临时排查特定网页是否分流漏网 | 会拖慢国内网站并加速消耗月流量，不可长期开启 |
| Direct（直连模式） | 放行所有出站流量直接连接 | 临时停用代理、排查本地直连环境 | 不会经过任何海外节点，等于暂停代理转发 |

---

## 五、成功验证与常见错误自查

完成设置后按下面 3 项快速验证：
- **查看左侧「连接（Connections）」页面**：打开 YouTube 或 ChatGPT 后回到客户端「连接」面板，能看到对应的进程名称和目标域名后面紧跟所选代理节点名，同时打开国内网站后显示 `DIRECT`，证明分流生效。
- **如果打开系统代理后发现连百度都断网**：检查设置中「静态端口」是否被其他软件占用；或排查上一次关闭软件前是否异常崩溃导致系统代理未恢复（详见 [连接成功却打不开网页排查](/troubleshooting/connected-no-internet/)）。
- **如果点击更新订阅失败或提示报错**：查看代理开启与关闭状态切换重试，详细处理流程转入 [订阅更新失败排查步骤](/troubleshooting/subscription-update-failed/)。

<FaqBlock :items="$frontmatter.faqs" />
