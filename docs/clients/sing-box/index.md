---
title: sing-box 官方客户端 (SFA / SFI / SFM) 下载渠道、支持协议与配置使用指南
description: sing-box 官方客户端 (SFA / SFI / SFM) 客户端定位、支持系统（Android、iOS / iPadOS、macOS、Linux）、核心（sing-box）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: sing-box 官方客户端 (SFA / SFI / SFM)
  os: Android、iOS / iPadOS、macOS、Linux
faqs:
  - q: "sing-box 官方客户端 (SFA / SFI / SFM) 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用客户端，专为原生 sing-box JSON 配置打造，不绑定任何机场服务商；若机场仅提供专属 App 而不开放通用或 sing-box 订阅，则无法导入使用。"
  - q: "SFA、SFI 和 SFM 分别对应什么平台？为什么常说它对新手有一定门槛？"
    a: "它们分别是官方推出的 sing-box for Android（SFA）、for iOS（SFI）和 for macOS（SFM）。由于官方客户端严格依赖标准 sing-box JSON 格式且不内置 Clash 转换器，需机场直接提供 sing-box 订阅或用户自备 JSON 配置。"
  - q: "官方 sing-box 客户端如何实现 TUN 全局接管与防 IPv6 泄漏？"
    a: "需要在配置文件的 inbounds 中声明 type 为 tun 的入站并配置 strategy 为 ipv4_only（或关闭路由 IPv6），同时配合 dns.rules 进行域名分流与远程解析。"
  - q: "使用 sing-box 官方客户端访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。除了排查 JSON 中 route.rules、rule_set 与 dns 规则是否漏放外，实际能否解锁仍取决于机场节点的出口原生度与地区稳定性。"
---

# sing-box 官方客户端 (SFA / SFI / SFM) 使用与配置指南

**Answer-First 核心结论**：sing-box 官方客户端系列（Android 端 SFA、iOS 端 SFI、macOS 端 SFM 及桌面端）是 SagerNet 团队直接维护的原生图形客户端，完整释放 sing-box 内核的 `rule_set` 二进制规则集、TUN 接管与多协议性能，适合使用原生 JSON 配置的进阶玩家。

- **适用定位**：专为标准 `sing-box JSON` 配置与远程 Profile 设计，无冗余壳层，性能开销与内存占用控制极佳。
- **协议覆盖**：支持 VLESS、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC 与 WireGuard 等全系现代协议。
- **使用门槛**：不直接解析 Clash YAML 订阅；若机场未提供 sing-box 订阅格式，新手建议优先选用 Hiddify 或 Karing。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## sing-box 官方客户端 (SFA / SFI / SFM) · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | Android、iOS / iPadOS、macOS、Linux |
| **代理内核** | sing-box |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC、WireGuard |
| **配置与订阅格式** | sing-box JSON |
| **授权与费用** | 开源免费 |
| **官方来源说明** | sing-box 官方文档与发布渠道 (sing-box.sagernet.org)（请勿从第三方广告站下载修改版） |

## sing-box 官方客户端 (SFA / SFI / SFM) · 各平台安装与使用要点

- **Android (SFA) / iOS (SFI)**：Android 可通过官方渠道获取 APK，iOS 需非国区 App Store 下载；二者均通过系统 VPN 接口运行原生 JSON 中的 `tun` 入站配置。
- **macOS (SFM) / Linux**：macOS 需留意 Apple Silicon 与 Intel 架构支持并通过网络扩展授权运行；Linux 桌面端与核心命令行可配合官方包或标准配置部署。

## sing-box 官方客户端 (SFA / SFI / SFM) · 流媒体与 AI 实操配置清单（TUN / IPv6 / 固定节点）

1. **在 JSON 中显式配置 `tun` 与 `dns`**：在 `inbounds` 启用 `tun`（开启 `auto_route` 与 `strict_route`），并在 `dns` 模块将海外与 AI 域名绑定远程解析器，避免本地运营商 DNS 劫持。
2. **限制 IPv6 穿透**：若机场节点无稳定 IPv6 出口，在 `dns` 设置 `strategy: "ipv4_only"` 并检查 `route.rules` 不放行直连 IPv6，防止流媒体识别异常。
3. **在 `outbounds` 区分 `selector` 与 `urltest`**：将 AI 与流媒体 `rule_set` 指向可手动固定的 `selector` 出站组，勿直接绑定频繁自动切换节点的 `urltest` 组。

| 官方客户端排错点 | 常见配置问题 | 修复建议 |
|---|---|---|
| 导入机场订阅时提示格式错误 | 机场链接返回 Clash YAML 或 Base64 | 确认机场支持 sing-box JSON 下发或更换兼容端 |
| 开启后部分域名仍走本地 DNS | `dns.rules` 未匹配或 `hijack-dns` 缺失 | 在路由前置加入 `protocol: dns` 劫持规则 |
| 升级新版后提示旧字段废弃 | sing-box 大版本更新移除了旧版配置项 | 核对官方迁移文档，改用 `rule_set` 与新版结构 |

## sing-box 官方客户端 (SFA / SFI / SFM) · 订阅导入与机场兼容性建议

1. **核实 sing-box 订阅支持**：在[机场品牌数据库](/brands/)查找支持第三方订阅的机场（如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)，导入前确认是否提供 sing-box 格式；飞猫云、SOGO 云、隐形人等仅提供专属客户端）。
2. **安全管理配置文件**：避免使用来源不明的在线转换工具托管订阅密钥，原理细节可查阅[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## sing-box 官方客户端 (SFA / SFI / SFM) · 所属平台入口与延伸阅读

- [Android 客户端专题](/clients/android/)
- [iOS / iPadOS 客户端专题](/clients/ios/)
- [macOS 客户端专题](/clients/macos/)
- [Linux 客户端专题](/clients/linux/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## sing-box 官方客户端 (SFA / SFI / SFM) · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
