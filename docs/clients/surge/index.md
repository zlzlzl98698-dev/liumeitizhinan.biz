---
title: Surge（Surge 5 / Surge Mac） 下载渠道、支持协议与配置使用指南
description: Surge（Surge 5 / Surge Mac） 客户端定位、支持系统（iOS / iPadOS、macOS）、核心（Surge 网络内核）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: Surge（Surge 5 / Surge Mac）
  os: iOS / iPadOS、macOS
faqs:
  - q: "Surge（Surge 5 / Surge Mac） 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用客户端，支持导入 Surge `.conf` 配置或由机场提供的托管订阅，不绑定特定服务商；若机场仅提供专属 App 而不开放订阅链接，则无法导入使用。"
  - q: "Surge 5（iOS）和 Surge Mac 的授权是通用的吗？"
    a: "不完全等同。Surge iOS 版通过非国区 App Store 订阅或内购解锁功能，Surge Mac 则需在官网单独购买设备授权，具体授权规则与版本权益以 Surge 官方页面为准。"
  - q: "macOS 上使用桌面端 ChatGPT 或终端命令行，Surge 需要开什么功能？"
    a: "必须在 Surge Mac 中开启“增强模式（Enhanced Mode）”。开启后 Surge 会接管底层虚拟网卡（类 TUN 机制），使不遵循系统 HTTP 代理的桌面应用与命令行也能按规则分流。"
  - q: "使用 Surge 访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。Surge 提供直观的“最近请求”抓包面板用于排查规则与 DNS 命中情况；若规则已正确命中代理组仍报错，则通常与出口 IP 地区属性或 IPv6 有关。"
---

# Surge（Surge 5 / Surge Mac） 使用与配置指南

**Answer-First 核心结论**：Surge（包括 iOS 端的 Surge 5 与桌面端的 Surge Mac）是 Apple 生态公认的专业级网络调试与规则代理工具，具备自研高性能内核、实时请求抓包分析、精细 DNS 控制与脚本重写能力，适合对网络稳定性与可观测性要求极高的苹果用户。

- **适用定位**：定位专业付费工具，适合在 iPhone、iPad 与 Mac 之间保持一致 `.conf` 配置逻辑、深度排查分流问题的用户。
- **协议与格式**：支持 VLESS、VMess、Trojan、Shadowsocks、Hysteria 2 与 TUIC，采用结构清晰的 Surge `.conf` 配置文件与模块。
- **接管机制**：Surge Mac 开启增强模式（Enhanced Mode）可实现全系统虚拟网卡接管；iOS 端依托官方 Network Extension 稳定驻留。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## Surge（Surge 5 / Surge Mac） · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | iOS / iPadOS、macOS |
| **代理内核** | Surge 网络内核 |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC |
| **配置与订阅格式** | Surge 配置 (.conf) |
| **授权与费用** | 含应用内购买 / Mac 版独立授权（以官方页面为准） |
| **官方来源说明** | Surge 官网与 App Store（请勿从第三方广告站下载修改版） |

## Surge（Surge 5 / Surge Mac） · 各平台安装与使用要点

- **iOS / iPadOS**：通过非中国区 App Store 安装正版 Surge 5，首次启动需授予 VPN 配置权限；支持 iCloud 同步配置文件、模块（Module）与远程托管订阅。
- **macOS**：从 Surge 官网获取 DMG（支持 Apple Silicon 与 Intel 通用二进制），建议按需启用“系统代理”与“增强模式（Enhanced Mode）”以接管全机桌面应用。

## Surge（Surge 5 / Surge Mac） · 流媒体与 AI 实操配置清单（增强模式 / IPv6 / 固定节点）

1. **开启增强模式与精准规则**：Mac 端使用桌面 AI 软件、终端或海外客户端时务必启用增强模式（Enhanced Mode），并将出站模式设为“规则判定（Rule-Based）”。
2. **控制 IPv6 与 DNS 泄漏**：在 `[General]` 配置段中根据机场情况设定 `ipv6 = false`（若无需节点 IPv6 出口），并指定可靠的远程 DNS 与 `skip-proxy` 白名单。
3. **利用 `select` 策略组固定节点**：在 `[Proxy Group]` 中为 OpenAI、Claude、Netflix 单独设置 `select` 手动选点策略组，避免 `url-test` 自动测速频繁切换导致账号风控。

| Surge 排错现象 | 请求面板检查点 | 处理方案 |
|---|---|---|
| Mac 桌面 AI 应用直连或超时 | 增强模式未开启 | 打开菜单栏 Surge 启用“增强模式” |
| 某流媒体域名走了直连（DIRECT） | `[Rule]` 规则顺序被前置规则截胡 | 在“最近请求”核对规则命中行号并上移专属规则 |
| 流媒体检测地区异常 | IPv6 开启或节点不解锁 | 将 `[General]` 中 `ipv6` 设为 `false` 并换原生节点 |

## Surge（Surge 5 / Surge Mac） · 订阅导入与机场兼容性建议

1. **确认提供 Surge 托管或通用订阅**：前往[机场品牌数据库](/brands/)确认支持第三方订阅（例如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)；飞猫云、SOGO 云、隐形人等仅支持专属客户端）。
2. **保护配置文件密钥**：勿将含节点密钥的订阅链接粘贴到未知第三方转换站，TUN/增强模式与 DNS 原理详见[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## Surge（Surge 5 / Surge Mac） · 所属平台入口与延伸阅读

- [iOS / iPadOS 客户端专题](/clients/ios/)
- [macOS 客户端专题](/clients/macos/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## Surge（Surge 5 / Surge Mac） · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
