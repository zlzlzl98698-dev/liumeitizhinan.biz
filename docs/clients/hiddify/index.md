---
title: Hiddify 下载渠道、支持协议与配置使用指南
description: Hiddify 客户端定位、支持系统（Windows、Android、iOS / iPadOS、macOS、Linux）、核心（sing-box）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: Hiddify
  os: Windows、Android、iOS / iPadOS、macOS、Linux
faqs:
  - q: "Hiddify 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用客户端，兼容通用订阅、sing-box 与 Clash 配置，不绑定特定机场服务商；若机场仅提供专属 App 而不开放订阅链接，则无法导入使用。"
  - q: "为什么新手常被推荐使用 Hiddify？"
    a: "Hiddify 基于 sing-box 内核打造全平台统一界面，覆盖 Windows、Android、iOS、macOS 与 Linux，且支持一键导入订阅与多协议自动选点，学习成本低。"
  - q: "Hiddify 的自动选点模式在使用 ChatGPT 时会有什么问题？"
    a: "自动选点（URLTest）会根据延迟动态切换不同国家节点，容易导致 ChatGPT 或流媒体账号短时间内跨区登录而触发风控，建议在节点列表中手动固定单一地区节点。"
  - q: "使用 Hiddify 访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。除核对桌面端是否切换至 VPN/TUN 模式以及是否正确设置地区分流外，实际解锁效果仍依赖机场出口节点的原生属性与 IPv6 状态。"
---

# Hiddify 使用与配置指南

**Answer-First 核心结论**：Hiddify（Hiddify Next）是基于 sing-box 内核的全平台开源代理客户端，完整覆盖桌面与移动端五大系统，以极简交互、多协议兼容与一键订阅导入著称，非常适合跨设备用户快速上手。

- **适用定位**：全平台开源免费方案，同一套操作逻辑即可兼顾 Windows、macOS、Linux、Android 与 iOS（需非国区商店）。
- **协议与格式**：原生支持 VLESS、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC 与 SSH，兼容通用订阅与 Clash 配置。
- **使用提醒**：默认自动选点适合日常浏览，使用 AI 工具与流媒体时建议手动锁定稳定单区节点。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## Hiddify · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | Windows、Android、iOS / iPadOS、macOS、Linux |
| **代理内核** | sing-box |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC、SSH |
| **配置与订阅格式** | 通用订阅 / sing-box / Clash |
| **授权与费用** | 开源免费 |
| **官方来源说明** | GitHub 官方开源仓库 (hiddify/hiddify-app)（请勿从第三方广告站下载修改版） |

## Hiddify · 各平台安装与使用要点

- **Windows / macOS / Linux**：从 GitHub Releases 下载对应系统与 CPU 架构（如 x86_64 与 Apple Silicon ARM64）安装器；桌面端可按需在系统代理与 VPN（TUN）模式间切换。
- **Android / iOS**：Android 可通过 GitHub APK 安装，iOS 需使用非国区 Apple ID 于 App Store 获取，连接时授权系统 VPN 配置文件即可接管流量。

## Hiddify · 流媒体与 AI 实操配置清单（TUN / IPv6 / 固定节点）

1. **切换 VPN（TUN）与地区分流**：桌面端使用流媒体或 AI 桌面客户端时，在“配置选项-服务模式”中选用“VPN”（TUN 接管），并将区域规则设为“中国（CN）”以实现内外分流。
2. **关闭不稳定的 IPv6 路由**：在配置选项的路由设置中将 IPv6 模式保持为仅 IPv4 或禁用无效 IPv6 穿透，防止网站优先走本地直连 IPv6。
3. **手动固定单区节点**：进入“代理”页面，从自动选择切换为手动指定具备解锁能力的海外节点，避免频繁跳区引发账号验证。

| Hiddify 常见状况 | 根因分析 | 排查步骤 |
|---|---|---|
| 桌面软件无法走代理或连接失败 | 当前服务模式仅为“系统代理” | 在配置选项中切换为“VPN”模式并授权限 |
| AI 账号频繁提示异常活动或验证 | 自动选点在港/日/美节点间跳动 | 手动锁定单一国家节点，停止自动切换 |
| 国内网站打开变慢 | 区域分流规则未设为 CN 绕过 | 在配置选项确认“区域”已选中国并更新规则 |

## Hiddify · 订阅导入与机场兼容性建议

1. **核实支持通用订阅**：购买套餐前请先在[机场品牌数据库](/brands/)核实支持第三方订阅（例如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)均可用；飞猫云、SOGO 云、隐形人等仅提供专属 App）。
2. **妥善保管订阅链接**：勿将订阅贴入陌生在线转换站点，TUN 与 DNS 原理详见[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## Hiddify · 所属平台入口与延伸阅读

- [Windows 客户端专题](/clients/windows/)
- [Android 客户端专题](/clients/android/)
- [iOS / iPadOS 客户端专题](/clients/ios/)
- [macOS 客户端专题](/clients/macos/)
- [Linux 客户端专题](/clients/linux/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## Hiddify · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
