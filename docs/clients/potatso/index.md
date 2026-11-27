---
title: Potatso 下载渠道、支持协议与配置使用指南
description: Potatso 客户端定位、支持系统（iOS / iPadOS）、核心（基础代理引擎）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: Potatso
  os: iOS / iPadOS
faqs:
  - q: "Potatso 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用客户端，支持手动填写或导入基础节点配置，不绑定特定机场；若机场仅提供专属客户端或仅提供新型协议订阅，则无法正常使用。"
  - q: "为什么不建议将 Potatso 作为当前主力机场或流媒体/AI 客户端？"
    a: "一方面其项目维护状态需进一步核实，另一方面它仅支持 Shadowsocks、SSR、SOCKS 与 HTTP(S) 等早期协议，无法兼容当前主流的 VLESS、Trojan 或 Hysteria 2 节点。"
  - q: "在 iOS 上如果需要免费或主流现代协议客户端，有什么替代建议？"
    a: "若追求免费且支持现代协议可了解 Hiddify、Karing 或 Streisand；若预算允许且长期使用流媒体与 AI，建议一步到位选择 Shadowrocket 或 Stash。"
  - q: "使用 Potatso 访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "除了维护状态与基础引擎对现代加密协议、远程 DNS 与规则库支持有限外，实际访问仍受制于节点协议兼容性、出口 IP 原生度与 IPv6 状态。"
---

# Potatso 使用与配置指南

**Answer-First 核心结论**：Potatso（含早期 Potatso Lite）是早期知名的 iOS 代理客户端，仅支持 Shadowsocks、SSR、SOCKS 与 HTTP(S) 等基础协议，且**当前维护状态待核实、不支持主流现代协议，不宜直接作为流媒体与 AI 场景的首选客户端**，本文主要供旧节点兼容与迁移参考。

- **适用定位**：仅适合极少数仍在使用传统 Shadowsocks、SOCKS5 或 HTTP(S) 代理的兼容场景，不适合现代多协议机场订阅。
- **核心局限**：不支持 VLESS、VMess、Trojan、Hysteria 2 与 TUIC，复杂流媒体/AI 分流规则能力亦较薄弱。
- **迁移建议**：使用现代机场套餐的用户，建议优先选用 Shadowrocket、Stash、Hiddify 或 Karing 等活跃 iOS 客户端。

> **维护与来源状态**：⚠️ 维护状态待核实：建议先核对上游开源仓库最新提交记录，不宜直接作为首选客户端

## Potatso · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | iOS / iPadOS |
| **代理内核** | 基础代理引擎 |
| **支持网络协议** | Shadowsocks、SSR、SOCKS、HTTP(S) |
| **配置与订阅格式** | 基础节点配置 |
| **授权与费用** | 基础免费 / 商店内购以实际为准 |
| **官方来源说明** | Apple App Store（请勿从第三方广告站下载修改版） |

## Potatso · 各平台安装与使用要点

- **iOS / iPadOS**：仅建议通过官方 App Store 核对开发者与更新日期后再决定是否下载，运行需授予系统 VPN 配置权限；注意不要轻信第三方网页提供的“破解版/内购解锁版”描述文件。

## Potatso · 流媒体与 AI 实操配置清单（兼容性与迁移排查）

1. **先核对机场协议与兼容度**：现代机场普遍已转向 VLESS、Trojan 或 Hysteria 2，导入前先确认账户内是否还保留兼容的 Shadowsocks 节点，否则连接必定失败。
2. **检查基础分流与 DNS 解析**：在应用内开启智能分流模式并填入可用远程 DNS，但因旧引擎对现代防 IPv6 泄漏和规则热更新支持有限，高风控平台（如 ChatGPT/Netflix）建议迁移至主流客户端处理。
3. **固定可用地区节点或迁移配置**：若测试仅作过渡使用，请手动固定单一海外出口并尽快规划迁移至 Shadowrocket、Stash 或 Hiddify。

| Potatso 常见现象 | 根因判断 | 建议措施 |
|---|---|---|
| 导入机场订阅后提示无效或空列表 | 机场仅下发 VLESS/Trojan/Clash YAML | 更换支持现代协议的 iOS 客户端 |
| 访问 AI 或流媒体频频报错或断流 | 旧协议抗干扰弱或缺少现代分流规则 | 迁移至支持现代内核与精细 DNS 的客户端 |
| 商店内存在多个近似名称应用 | 山寨仿冒或版本停滞 | 核对商店发布记录，优先选用主流活跃替代品 |

## Potatso · 订阅导入与机场兼容性建议

1. **核实机场协议与推荐端**：在[机场品牌数据库](/brands/)核对机场开放的协议类型（如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)均支持通用订阅，但多数新节点依赖现代客户端；飞猫云、SOGO 云、隐形人等仅支持专属端）。
2. **保护节点凭据**：切勿把订阅交给未知转换页面，DNS 与防泄漏基础原理详见[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## Potatso · 所属平台入口与延伸阅读

- [iOS / iPadOS 客户端专题](/clients/ios/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## Potatso · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
