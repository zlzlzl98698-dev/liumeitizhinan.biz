---
title: Stash 下载渠道、支持协议与配置使用指南
description: Stash 客户端定位、支持系统（iOS / iPadOS）、核心（Clash 兼容规则引擎）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: Stash
  os: iOS / iPadOS
faqs:
  - q: "Stash 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用客户端，专为兼容 Clash YAML 订阅与策略组而设计；若机场仅提供专属 App 而不开放 Clash 或通用订阅链接，则无法在 Stash 中使用。"
  - q: "已经习惯电脑端 Clash Verge Rev，手机端用 Stash 有什么优势？"
    a: "Stash 原生支持 Clash 配置文件、策略组与覆写（Override）机制，您可以直接复用电脑端的 Clash 订阅与分流思维，无需为 iOS 单独转换配置文件格式。"
  - q: "Stash 如何通过覆写（Override）解决部分机场未单独分组 AI 节点的问题？"
    a: "可以在 Stash 中新建或导入合法的官方覆写模块，仅补充 OpenAI、Claude、Gemini 等域名规则并绑定到指定地区策略组，无需修改原机场订阅文件。"
  - q: "使用 Stash 访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。除核对策略组选点、Fake-IP DNS 与 IPv6 开关外，最终解锁状态仍由机场节点的出口地区与 IP 原生属性决定。"
---

# Stash 使用与配置指南

**Answer-First 核心结论**：Stash 是面向 iOS 与 iPadOS 设备的 Clash 兼容规则代理客户端，完整支持 Clash YAML 策略组、配置覆写（Override）、HTTP 脚本重写与流媒体分流，是桌面端 Clash 用户在苹果手机上的理想延伸。

- **适用定位**：适合习惯 Clash 规则逻辑、希望手机直接复用 Clash 订阅或使用覆写增强分流的 iOS 用户。
- **协议与配置**：支持 VLESS、VMess、Trojan、Shadowsocks 与 Hysteria 2，直接导入 Clash YAML 及覆写模块。
- **获取方式**：需通过非中国区 App Store 付费购买正版，避免使用第三方描述文件或来源不明的安装包。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## Stash · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | iOS / iPadOS |
| **代理内核** | Clash 兼容规则引擎 |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2 |
| **配置与订阅格式** | Clash YAML / 覆写 (Override) |
| **授权与费用** | 付费应用（以所属 App Store 地区标价为准） |
| **官方来源说明** | Apple App Store & Stash 官方文档（请勿从第三方广告站下载修改版） |

## Stash · 各平台安装与使用要点

- **iOS / iPadOS**：使用个人非国区 Apple ID 在 App Store 购入并安装，首次开启代理需授权 iOS VPN 配置文件；配置可在设备间通过 iCloud 同步，注意开启后台订阅更新时核对机场流量消耗。

## Stash · 流媒体与 AI 实操配置清单（VPN 接管 / IPv6 / 固定节点）

1. **核对 Fake-IP 与 DNS 配置**：Stash 依托 iOS VPN 扩展与 Clash 规则引擎工作，建议保持 Fake-IP 模式与可信远程 DNS，防止部分流媒体 App 读取本地解析结果。
2. **关闭非必要 IPv6 穿透**：若本地网络与机场对 IPv6 支持不一致，在 Stash 设置或覆写配置中禁用 IPv6 解析，防止视频与 AI 请求走直连 IPv6 泄漏。
3. **利用策略组固定地区出口**：在主界面“策略”页面中，将流媒体和 AI 分组切换为固定单区节点（如新加坡、日本、美国），避免自动测速组来回切换。

| Stash 使用现象 | 核心原因 | 解决建议 |
|---|---|---|
| 导入订阅提示配置解析错误 | 订阅地址返回非 Clash YAML 格式 | 确认机场下发的是 Clash 订阅而非节点纯文本 |
| 某些域名始终未按预期分流 | 本地规则顺序或 Override 覆写冲突 | 在“请求日志”查看实际命中的规则行号 |
| 流媒体加载缓慢或提示代理错误 | 当前策略组选中节点不解锁或 IPv6 泄漏 | 切换指定原生节点并确认关闭 IPv6 |

## Stash · 订阅导入与机场兼容性建议

1. **确认支持 Clash 订阅**：在[机场品牌数据库](/brands/)确认服务商开放 Clash/第三方订阅（如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)均适配良好；飞猫云、SOGO 云、隐形人等仅支持专属客户端）。
2. **谨慎使用第三方覆写**：仅加载可信来源覆写规则，勿把私人订阅发往未知在线转换器；DNS 机制详见[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## Stash · 所属平台入口与延伸阅读

- [iOS / iPadOS 客户端专题](/clients/ios/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## Stash · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
