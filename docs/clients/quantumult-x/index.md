---
title: Quantumult X（圈 X） 下载渠道、支持协议与配置使用指南
description: Quantumult X（圈 X） 客户端定位、支持系统（iOS / iPadOS）、核心（自研高性能网络引擎）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: Quantumult X（圈 X）
  os: iOS / iPadOS
faqs:
  - q: "Quantumult X（圈 X） 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用客户端，支持导入机场订阅或远程资源解析节点，不绑定任何特定机场；若机场仅提供专属 App 而不开放订阅链接，则无法导入使用。"
  - q: "Quantumult X（圈 X） 目前支持 Hysteria 2 或 TUIC 协议吗？"
    a: "按当前记录规格，Quantumult X 主要支持 VLESS、VMess、Trojan 与 Shadowsocks；若您的机场主力提供 Hysteria 2 或 TUIC 节点，建议搭配 Shadowrocket 或 Stash。"
  - q: "为什么导入机场订阅后 Quantumult X 还需要配置分流与重写规则？"
    a: "Quantumult X 采用自带配置体系，机场纯节点订阅通常不含完整分流与策略组，需要配合远程分流列表（filter_remote）或完整懒人配置才能精细分流流媒体与 AI。"
  - q: "使用 Quantumult X 访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。除检查“图标运行模式”是否选为规则分流、策略组是否固定海外节点及 DNS 配置外，实际可用性还取决于机场出口 IP 的解锁情况。"
---

# Quantumult X（圈 X） 使用与配置指南

**Answer-First 核心结论**：Quantumult X（俗称“圈 X”）是 iOS 平台极具可玩性的进阶网络工具，搭载自研高性能网络引擎，擅长深度规则分流、HTTP 请求重写（Rewrite）、脚本调试与自定义 DNS，适合有一定配置基础的进阶玩家。

- **适用定位**：面向 iOS / iPadOS 用户，适合同时需要精细流媒体解锁分流、网络抓包调试与去广告/脚本重写的人群。
- **协议边界**：稳定支持 VLESS、VMess、Trojan 与 Shadowsocks，配置采用专属语法与远程资源解析机制。
- **购买提示**：需通过非中国区 App Store 付费买断，切勿使用第三方共享账号安装来路不明的修改版本。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## Quantumult X（圈 X） · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | iOS / iPadOS |
| **代理内核** | 自研高性能网络引擎 |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks |
| **配置与订阅格式** | Quantumult X 配置 / 远程资源解析 |
| **授权与费用** | 付费应用（以所属 App Store 地区标价为准） |
| **官方来源说明** | Apple App Store（请勿从第三方广告站下载修改版） |

## Quantumult X（圈 X） · 各平台安装与使用要点

- **iOS / iPadOS**：使用个人非国区 Apple ID 从 App Store 正版购买；初次使用需允许添加系统 VPN 配置文件，若机场未直接提供 QX 专用配置，可通过内置“资源解析器”或合规远程分流模板补全策略组。

## Quantumult X（圈 X） · 流媒体与 AI 实操配置清单（VPN 配置文件 / IPv6 / 固定节点）

1. **切换为“规则分流”运行模式**：长按右下角图标或进入控制面板，确认处于“规则分流”状态而非“全部直连”，确保分流策略生效。
2. **优化 `[dns]` 与关闭异常 IPv6**：在配置文件 `[dns]` 段配置海外可信 DOH/DNS，并关闭不必要的 IPv6 解析或双栈抢占，降低流媒体地区检测误差。
3. **建立独立 AI 固定策略组**：在 `[policy]` 中为 OpenAI、Claude、Gemini 建立 `static` 手动选点策略组，固定至单一低风控海外地区节点。

| 圈 X 常见问题 | 原因判断 | 应对策略 |
|---|---|---|
| 导入部分机场订阅后缺少某些高速节点 | 机场节点为 Hysteria 2 等未支持协议 | 核对协议列表或换用支持 Hysteria 2 的客户端 |
| 规则已配置但流媒体 App 仍显示国内地区 | DNS 缓存或未开启对应远程分流资源 | 清理 DNS 缓存并在资源列表强制更新规则 |
| 开启 MitM 后部分 App 提示证书错误 | 未正确信任证书或域名触发证书锁定 | 仅对必要域名启用 MitM，AI/银行 App 保持跳过 |

## Quantumult X（圈 X） · 订阅导入与机场兼容性建议

1. **确认协议与订阅兼容性**：购买前先在[机场品牌数据库](/brands/)查看该品牌是否支持通用/QX 订阅（如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)均支持；飞猫云、SOGO 云、隐形人等仅提供专属 App）。
2. **保护配置与订阅安全**：勿将个人订阅链接交给陌生在线转换工具，远程 DNS 机制可阅读[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## Quantumult X（圈 X） · 所属平台入口与延伸阅读

- [iOS / iPadOS 客户端专题](/clients/ios/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## Quantumult X（圈 X） · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
