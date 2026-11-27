---
title: Shadowrocket（小火箭） 下载渠道、支持协议与配置使用指南
description: Shadowrocket（小火箭） 客户端定位、支持系统（iOS / iPadOS）、核心（自研规则引擎）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: Shadowrocket（小火箭）
  os: iOS / iPadOS
faqs:
  - q: "Shadowrocket（小火箭） 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用客户端，支持导入绝大多数机场的通用订阅与节点链接，不绑定特定服务商；若机场仅提供专属 App 而不开放订阅链接，则无法导入使用。"
  - q: "中国区 App Store 搜不到 Shadowrocket 怎么办？"
    a: "Shadowrocket 仅在非中国区 App Store 上架并需付费购买。用户需使用自备的美区、港区或日区等非国区 Apple ID 登录后购买下载，切勿购买或使用来路不明的共享账号以防锁机。"
  - q: "Shadowrocket 默认配置下如何避免访问流媒体或 AI 时直连或地区漂移？"
    a: "建议在“配置”中启用包含流媒体与 AI 域名的分流规则，将全局路由设为“配置”，并在节点列表或策略组中手动固定单一可用国家节点。"
  - q: "使用 Shadowrocket 访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。客户端主要负责本地规则分流、DNS 调度与 VPN 隧道握手；实际能否打开受限于节点出口 IP 地区、原生属性，以及是否关闭了 IPv6 穿透。"
---

# Shadowrocket（小火箭） 使用与配置指南

**Answer-First 核心结论**：Shadowrocket（俗称“小火箭”）是 iOS 与 iPadOS 生态普及率最高的第三方代理客户端，自研高性能规则引擎并兼容 VLESS、Hysteria 2、TUIC 等几乎所有主流协议，适合绝大多数苹果移动端用户作为主力工具。

- **适用定位**：界面轻量、协议兼容性极强，兼顾新手扫码导入订阅与进阶用户调试日志、HTTPS 解密及模块。
- **获取门槛**：非中国区 App Store 一次性付费买断，必须通过本人非国区 Apple ID 从官方商店购买安装。
- **分流特性**：依托 iOS Network Extension（VPN 配置文件）接管整机流量，支持本地规则与远程模块自动更新。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## Shadowrocket（小火箭） · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | iOS / iPadOS |
| **代理内核** | 自研规则引擎 |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC |
| **配置与订阅格式** | Shadowrocket / 通用订阅 / 模块 |
| **授权与费用** | 付费应用（美区 App Store 需付费购买，价格以对应区商店为准） |
| **官方来源说明** | Apple App Store（需非国区 Apple ID）（请勿从第三方广告站下载修改版） |

## Shadowrocket（小火箭） · 各平台安装与使用要点

- **iOS / iPadOS**：通过本人非国区 Apple ID 在 App Store 购买正版，首次连接时允许系统添加 VPN 配置并输入锁屏密码；切勿登录网上免费共享 Apple ID，以免触发 iCloud 锁机风险。

## Shadowrocket（小火箭） · 流媒体与 AI 实操配置清单（VPN 配置文件 / IPv6 / 固定节点）

1. **选择“配置”全局路由模式**：在主页“全局路由”中选择“配置”（而非纯“代理”或“直连”），并加载包含海外流媒体与 AI 规则的 `.conf` 配置文件，避免国内流量绕路。
2. **关闭测试中的 IPv6 泄漏**：进入“设置-按需求连接/网络”或底层配置，关闭不稳定的 IPv6 支持并开启远程 DNS（如禁用本地 IPv6 优先解析），减少流媒体报错。
3. **固定节点与关闭无关自动测速**：使用 ChatGPT、Claude 等 App 时，选中单个稳态地区节点连接，不要启用频繁跨国跳转的负载均衡策略。

| iOS 常见异常 | 排查点 | 处理方式 |
|---|---|---|
| Safari 正常但 ChatGPT App 提示网络异常 | AI 域名未命中规则或触发地区风控 | 切换“代理”模式测试或更换美/日/新稳态节点 |
| 蜂窝网络与 Wi-Fi 切换后断流 | VPN 按需连接配置异常或协议被干扰 | 重连开关或开启“设置-按需求连接” |
| 订阅更新报错“格式无效” | 订阅地址含空格或机场仅下发 Clash 格式 | 核对机场通用订阅链接或刷新订阅缓存 |

## Shadowrocket（小火箭） · 订阅导入与机场兼容性建议

1. **核对机场通用订阅**：在[机场品牌数据库](/brands/)确认是否支持通用/Shadowrocket 订阅（例如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)均可直接导入；飞猫云、SOGO 云、隐形人等仅提供专属客户端）。
2. **订阅隐私安全**：不要把个人订阅链接交给未知在线转换网站，VPN 隧道与 DNS 细节可参阅[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## Shadowrocket（小火箭） · 所属平台入口与延伸阅读

- [iOS / iPadOS 客户端专题](/clients/ios/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## Shadowrocket（小火箭） · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
