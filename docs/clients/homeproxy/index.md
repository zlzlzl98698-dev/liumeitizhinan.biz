---
title: HomeProxy 下载渠道、支持协议与配置使用指南
description: HomeProxy 客户端定位、支持系统（OpenWrt / 软路由）、核心（sing-box）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: HomeProxy
  os: OpenWrt / 软路由
faqs:
  - q: "HomeProxy 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用代理插件，基于 sing-box 运行在 OpenWrt / ImmortalWrt 路由上，不绑定任何机场服务商；若机场仅提供专属客户端而不开放订阅，则无法导入。"
  - q: "HomeProxy 与 OpenWrt 防火墙及固件分支有什么适配要求？"
    a: "HomeProxy 由 ImmortalWrt 团队推出，与现代 fw4（nftables）防火墙架构契合度极高，常见于预装或兼容新版 OpenWrt / ImmortalWrt 的路由器固件中。"
  - q: "HomeProxy 怎么实现不同设备或不同域名的流媒体/AI 精细分流？"
    a: "可在 LuCI 界面的“路由设置”与“规则集”中，将流媒体和 AI 域名规则集单独匹配到指定地区的出站节点，同时对局域网设备开启访问控制列表。"
  - q: "使用 HomeProxy 访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。除了核对路由规则集、DNS 远程解析与 IPv6 控制设置外，最终访问成功率仍取决于机场出口 IP 的地区属性与纯净度。"
---

# HomeProxy 使用与配置指南

**Answer-First 核心结论**：HomeProxy 是基于 sing-box 内核的现代 OpenWrt 透明代理管理插件（ImmortalWrt 生态原生主力方案），与 fw4（nftables）防火墙契合度极佳，配置界面简洁规范，适合追求轻量、现代与高稳定性全屋分流的软路由用户。

- **适用定位**：面向现代 OpenWrt / ImmortalWrt 路由器用户，直接调用 sing-box 规则集与 DNS 引擎实现透明代理。
- **架构契合**：专为 fw4 / nftables 环境设计，减少旧式 iptables 脚本叠加冲突，对硬件资源占用友好。
- **协议覆盖**：支持 VLESS、VMess、Trojan、Shadowsocks、Hysteria 2 与 TUIC 等全系现代协议。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## HomeProxy · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | OpenWrt / 软路由 |
| **代理内核** | sing-box |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2、TUIC |
| **配置与订阅格式** | sing-box |
| **授权与费用** | 开源免费 |
| **官方来源说明** | GitHub 官方开源仓库 (immortalwrt/homeproxy)（请勿从第三方广告站下载修改版） |

## HomeProxy · 各平台安装与使用要点

- **OpenWrt / 软路由**：部署前确认固件基于 fw4（nftables）且内核包含 `kmod-nft-tproxy` / `kmod-tun` 等对应模块，核对路由器 CPU 架构后安装插件与最新版 `sing-box` 二进制核心。

## HomeProxy · 流媒体与 AI 实操配置清单（透明代理 / IPv6 / 固定节点）

1. **配置路由模式与 DNS 分流**：在 HomeProxy“默认出站/路由设置”选择大陆绕过（Bypass Mainland China）或自定义规则集，开启远程 DNS 解析并确保内网设备未使用自建 DoH 绕开路由器 53 端口。
2. **控制 IPv6 转发与解析**：若上级宽带带 IPv6 而机场节点仅支持 IPv4 解锁，在 HomeProxy 设置中关闭 IPv6 代理或设置 DNS 为 `ipv4_only` 策略，杜绝 IPv6 泄漏。
3. **利用“路由规则”固定 AI 出口**：在自定义路由规则中为 OpenAI、Claude、Gemini 等域名集合单独指定固定单区节点出站，避免和日常测速选点混用。

| HomeProxy 常见问题 | 排查方向 | 应对措施 |
|---|---|---|
| 启动失败或日志报 sing-box 配置错误 | 插件版本与 sing-box 内核版本不匹配 | 同步更新至仓库配套的 sing-box 核心版本 |
| 规则集无法下载或更新失败 | 初次拉取规则集缺少代理引导 | 在插件更新设置中指定或临时开启代理更新 |
| 局域网设备访问 AI 出现地区报错 | IPv6 泄漏或设备自带加密 DNS | 禁用无效 IPv6 分配并关闭设备私有 DNS |

## HomeProxy · 订阅导入与机场兼容性建议

1. **确认支持节点/通用订阅**：先在[机场品牌数据库](/brands/)核对支持第三方订阅的品牌（如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)；飞猫云、SOGO 云、隐形人等仅支持单机专属客户端）。
2. **保护订阅隐私**：切勿把订阅链接提交给未知第三方在线转换服务，DNS 与透明代理机制见[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## HomeProxy · 所属平台入口与延伸阅读

- [OpenWrt / 软路由 客户端专题](/clients/openwrt/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## HomeProxy · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
