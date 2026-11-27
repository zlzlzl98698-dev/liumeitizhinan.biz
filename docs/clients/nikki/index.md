---
title: Nikki 下载渠道、支持协议与配置使用指南
description: Nikki 客户端定位、支持系统（OpenWrt / 软路由）、核心（Mihomo）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: Nikki
  os: OpenWrt / 软路由
faqs:
  - q: "Nikki 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用代理组件，面向 OpenWrt 部署并原生使用 Mihomo/Clash YAML 订阅，不绑定任何机场服务商；若机场仅提供专属 App，则无法导入使用。"
  - q: "Nikki 对 OpenWrt 版本和防火墙有什么硬性要求？"
    a: "Nikki 项目明确要求 OpenWrt 24.10 及以上版本，且必须基于 fw4（nftables）防火墙架构；旧版 OpenWrt（如 21.02 或 23.05 及以前使用 fw3 iptables 的固件）无法正常兼容。"
  - q: "相比 OpenClash，Nikki 有什么优势？"
    a: "Nikki 架构更加轻量现代，专为新版 OpenWrt 与 fw4 原生设计，直接对接 Mihomo 内核配置，系统开销与防火墙脚本复杂度显著低于传统插件。"
  - q: "使用 Nikki 透明代理后访问 Netflix 或 ChatGPT 报错一定是软件问题吗？"
    a: "不一定。除检查代理模式（TPROXY/TUN）、DNS 劫持与 IPv6 代理设置外，最终解锁状态仍取决于机场节点出口地区的原生度。"
---

# Nikki 使用与配置指南

**Answer-First 核心结论**：Nikki 是专为现代 OpenWrt 打造的轻量级 Mihomo 透明代理组件，结构精简、直接基于 nftables 接管全屋流量，但项目明确要求 **OpenWrt 24.10 及以上版本与 fw4 防火墙**，部署前务必先确认固件底座版本。

- **适用定位**：适合运行新版 OpenWrt（24.10+）的软路由或高性能硬路由用户，直接导入 Mihomo/Clash YAML 订阅。
- **硬性门槛**：仅支持 **OpenWrt 24.10+** 与 **fw4（nftables）**，不支持旧版 fw3（iptables）或老旧分支固件。
- **协议与格式**：基于 Mihomo 内核，支持 VLESS、VMess、Trojan、Shadowsocks 与 Hysteria 2，支持 Mixin 配置覆写。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## Nikki · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | OpenWrt / 软路由 |
| **代理内核** | Mihomo |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2 |
| **配置与订阅格式** | Mihomo / Clash YAML |
| **授权与费用** | 开源免费 |
| **官方来源说明** | GitHub 官方开源仓库 (nikkinikki-org/OpenWrt-nikki)（请勿从第三方广告站下载修改版） |

## Nikki · 各平台安装与使用要点

- **OpenWrt / 软路由**：部署前必须核对系统为 **OpenWrt 24.10 及以上**且防火墙为 **fw4（nftables）**，确认设备架构与包管理器（`opkg` 或新版 `apk`）匹配后再从官方 Releases 安装主程序、LuCI 界面与语言包。

## Nikki · 流媒体与 AI 实操配置清单（透明代理 / IPv6 / 固定节点）

1. **确认透明代理模式（TPROXY / TUN）与 DNS 劫持**：在 Nikki 代理设置中启用适合设备的 TPROXY 或 TUN 模式并开启 DNS 劫持，确保局域网手机、电视与电脑均经过 Mihomo 内核解析，防止终端自带 DoH 旁路绕过。
2. **严格控制 IPv6 泄漏**：如机场订阅不包含稳定海外 IPv6 出口，在 Nikki 的代理与 Mihomo Mixin 配置中关闭 IPv6 代理或过滤 AAAA 记录，避免流媒体平台检测到本地直连 IPv6。
3. **固定策略组出站节点**：通过内置管理面板将 AI（ChatGPT / Claude / Gemini）与流媒体策略组锁定在单一可用海外节点。

| Nikki 常见排查项 | 根因定位 | 处理动作 |
|---|---|---|
| 安装报错或启动后 nftables 规则失效 | OpenWrt 低于 24.10 或仍为 fw3 | 升级至 OpenWrt 24.10+（fw4）或改用 OpenClash |
| 局域网部分设备直连未走分流 | 终端开启私有 DNS/DoH 或旁路由网关未指对 | 关闭终端加密 DNS 并确认网关指向软路由 |
| 订阅自带配置与路由器端口冲突 | 订阅内混入与路由器冲突的监听参数 | 启用 Nikki 配置覆写（Mixin）接管基础字段 |

## Nikki · 订阅导入与机场兼容性建议

1. **选择支持 Clash/Mihomo 订阅的机场**：在[机场品牌数据库](/brands/)核对服务商（如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)均支持；飞猫云、SOGO 云、隐形人等仅支持专属端，无法在路由器使用）。
2. **保护订阅信息**：勿将订阅地址上传至来路不明的在线转换站点，更多原理可参考[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## Nikki · 所属平台入口与延伸阅读

- [OpenWrt / 软路由 客户端专题](/clients/openwrt/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## Nikki · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
