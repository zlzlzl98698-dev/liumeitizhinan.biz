---
title: iOS / iPadOS 代理客户端大全：小火箭与主流软件对比
description: 完整对比 iPhone 与 iPad 上全部 11 款代理客户端（Shadowrocket、Stash、Quantumult X、Surge 5、sing-box SFI、Hiddify、Karing、Clash Mi、Streisand、Potatso、OneClick），详解付费/免费区别与非国区 Apple ID 安全注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: CollectionPage
dataSource: 第三方代理客户端.txt & data/clients.json
faqs:
  - q: Shadowrocket（小火箭）、Stash 和 Quantumult X 都是免费的吗？
    a: 都不是免费应用。在美区 App Store 中，Shadowrocket、Stash 与 Quantumult X 均显示为一次性付费买断应用，Surge 5 则含应用内购买。实际定价与上架状态以您登录的 App Store 地区页面为准。
  - q: iPhone 不想花钱买 Shadowrocket，有哪些合法免费的 App Store 替代品？
    a: 可在非中国大陆区 App Store 查看并使用 Hiddify、Karing、Clash Mi 或官方 sing-box (SFI)（具体免费/内购状态以商店实时页为准）。若您选择的机场本身提供官方专属客户端（如飞猫云、SOGO 云、光速云自研端），也可按官网指南获取。
  - q: 网上搜到的“免费共享美区 Apple ID”能用吗？为什么一定要注意不能登录系统 iCloud？
    a: 极其危险的做法是直接在 iPhone“设置”顶栏登录陌生人提供的共享 iCloud——对方只需开启“查找我的 iPhone”即可远程将您的手机彻底锁死变砖勒索。如果下载正版应用，强烈建议自己用国内手机号/邮箱注册一个正规海外区 Apple ID 充值购买。
  - q: Shadowrocket、Stash 和 Quantumult X（圈 X）选哪一个最好？
    a: 新手与大众首选 Shadowrocket（性价比最高、几乎 100% 机场直接适配一键导入）；习惯电脑 Clash Verge Rev 策略组与 YAML 覆写的选 Stash；喜欢折腾脚本重写（Rewrite）、去广告模块和精细图标定制的进阶玩家选 Quantumult X；需要做专业 HTTP 抓包与企业级网络调试选 Surge 5。
  - q: 为什么 iPhone 从家里 Wi-Fi 切换到户外 5G 时，代理就会断开或一直转圈？
    a: 在 Shadowrocket 底部「设置 → 按需连接」中打开“按需连接”并允许在蜂窝和 Wi-Fi 切换时自动重建隧道即可解决；Stash 与 Surge 也有同类无缝切网机制。
  - q: Apple TV (tvOS) 上看 Netflix 4K 怎么选 iOS 生态客户端？
    a: 目前 Stash、Shadowrocket 与 Quantumult X 等在支持 tvOS 17+ 的 Apple TV 上提供了对应大屏应用（需外区 Apple ID 下载），导入支持通用订阅的机场链接即可实现客厅电视直接科学分流，无需单独买软路由。
---

# iPhone / iPad (iOS / iPadOS) 代理客户端大全：11 款软件深度对比与安全下载指南

**Answer-First 核心结论**：在 iOS 生态下选择代理软件，首先要认清两项客观现实：**① 全部第三方规则代理工具均不在中国大陆区 App Store 上架，需自备非国区 Apple ID 获取；② 软件并非全部免费**。

各梯队软件收费与选型结论：
- **美区付费 / 内购应用**：**[Shadowrocket（小火箭）](/clients/shadowrocket/)**、**[Stash](/clients/stash/)** 与 **[Quantumult X（圈 X）](/clients/quantumult-x/)** 在美区商店均为付费买断应用，**[Surge 5](/clients/surge/)** 含应用内购买，实际售价以所属区 App Store 为准。
- **省心与免费选型**：预算充足或追求稳定省心**首选 [Shadowrocket](/clients/shadowrocket/)**（生态适配最广）；希望零软件开销起步可先试用外区商店中的 **[Hiddify](/clients/hiddify/)**、**[Karing](/clients/karing/)**、**[Clash Mi](/clients/clash-mi/)** 或官方 **[sing-box (SFI)](/clients/sing-box/)**。

> **iOS 账号安全铁律**：严禁在 iPhone/iPad 系统“设置”顶部的 **Apple ID / iCloud** 登录来历不明的共享账号！一旦对方开启“丢失模式”或更改密码，整台设备将被永久激活锁锁定。

---

## 一、iOS 全量 11 款客户端能力、收费与协议支持对比表

| 客户端名称 | 授权模式（以商店区为准） | 兼容协议与配置特征 | 典型适用人群 | 维护与渠道说明 | 详细页 |
|---|---|---|---|---|---|
| **Shadowrocket（小火箭）** | **美区付费买断** | 通用订阅 / 模块 / VLESS / VMess / Trojan / SS / Hy2 / TUIC | **iOS 大众首选**，几乎全部通用机场一键适配，支持请求日志 | App Store（持续活跃） | [查看教程](/clients/shadowrocket/) |
| **Stash** | **美区付费买断** | 原生 **Clash YAML** / Override 覆写 / VLESS / Hy2 | 习惯电脑 Clash Verge Rev 规则与策略组的用户（兼容 tvOS） | App Store（持续活跃） | [查看教程](/clients/stash/) |
| **Quantumult X（圈 X）** | **美区付费买断** | QX 规则 / 脚本 / HTTP 重写 / 自定义 DNS / VLESS / VMess / Trojan / SS | 喜欢脚本重写、定制图标与精细策略分流的进阶玩家 | App Store（持续活跃） | [查看教程](/clients/quantumult-x/) |
| **Surge 5** | **含应用内购买** | Surge `.conf` / 完整抓包 / HTTPS 解密 / 全主流协议 | 开发者、iOS 网络调试工程师与重度多设备极客 | App Store（活跃专业端） | [查看教程](/clients/surge/) |
| **sing-box (SFI)** | 免费（官方渠道） | 原生 sing-box JSON / VLESS / Hy2 / TUIC / WireGuard | 希望直接使用官方 sing-box 配置模板的纯净玩家 | App Store / 官方文档 | [查看教程](/clients/sing-box/) |
| **Hiddify** | 免费 | 多协议通用订阅 / Clash / sing-box 自动兼容 | **不想付费买小火箭的新手**，导入简单直接用 | App Store / GitHub | [查看教程](/clients/hiddify/) |
| **Karing** | 免费（含商店通道） | 多订阅聚合 / Clash / sing-box 兼容 | 希望与电脑端统一多订阅规则的免费替代用户 | App Store / GitHub | [查看教程](/clients/karing/) |
| **Clash Mi** | 免费 | Mihomo 内核 / Clash 风格 YAML 配置 | 需要 iOS 免费体验 Clash YAML 配置的用户 | App Store / GitHub | [查看教程](/clients/clash-mi/) |
| **Streisand** | App Store（商店规则为准） | VLESS、VMess、Trojan、Hysteria 等协议节点与订阅 | 轻度多协议备选方案 | App Store | [查看档案](/clients/streisand/) |
| **Potatso** | App Store | Shadowsocks、SSR、SOCKS、HTTP(S) 基础配置 | ⚠️ 早期传统客户端，不支持 VLESS/Hy2 新协议，**维护待核实** | App Store | [查看档案](/clients/potatso/) |
| **OneClick** | App Store | VMess、Shadowsocks、Trojan 与订阅链接 | ⚠️ 基础协议免费方案，**维护状态待核实** | App Store | [查看档案](/clients/oneclick/) |

---

## 二、iPhone / iPad 用户选型与省钱实战路径

1. **只用单个机场、懒得装多个 App 的纯新手**：如果在官网确认某品牌提供成熟的 iOS 专属端（例如光速云自研客户端、飞猫云、SOGO 云、无忧链接），先按官网操作指引登录专属端即可；但请注意除光速云/梯子云等双栖品牌外，纯专属端未来无法导进小火箭。
2. **长期使用多家机场、看重生态统一与 AI/流媒体分流**：自己注册一个正规美区 Apple ID，花一次买断费购入 **Shadowrocket**（或电脑用 Clash 的选 **Stash**）。这笔一次性投入在未来 5 年换任何支持通用订阅的新机场（如星岛梦、一翻云、唯兔云、光速云）都能一直通用，长期看最省心。
3. **不想提前付费的零成本验证法**：先用外区 ID 在 App Store 下载免费的 **Hiddify**、**Karing** 或 **sing-box (SFI)**，配合 ¥14.9–¥25 月付套餐跑通 1 个月确认稳定，以后再按需决定是否补买 Shadowrocket。

---

## 三、iOS 端流媒体与 AI 防风控关键设置

- **关闭 IPv6 穿透**：在 Shadowrocket 底部「设置 → 代理」关闭 IPv6 转发开关（或在通用配置里禁止 IPv6），避免手机 5G 蜂窝网络分配的大陆 IPv6 地址穿透到 ChatGPT 与 YouTube 导致地区报错。
- **开启“按需连接（Connect On Demand）”**：解决手机锁屏休眠后唤醒断网、以及进出电梯切换 Wi-Fi/5G 时微信或 AI 对话中断的痛点。
- **全局路由模式保持在「配置（Config）」**：千万别长期选成“代理（全局）”，否则不仅国内支付宝/高德地图会变卡，套餐流量也会消耗翻倍。

## 四、延伸教程与常见问答 (FAQ)

- Shadowrocket 手把手配置教程：[Shadowrocket 使用指南 →](/guides/shadowrocket-guide/)
- 订阅导不进去或全超时：[订阅更新失败排查 →](/troubleshooting/subscription-update-failed/) ｜ [节点超时排查 →](/troubleshooting/all-nodes-timeout/)
- 对比其他系统软件：[Android 客户端](/clients/android/) ｜ [macOS 客户端](/clients/macos/) ｜ [客户端总大全](/clients/)

<FaqBlock :items="$frontmatter.faqs" />
