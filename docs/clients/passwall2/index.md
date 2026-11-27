---
title: PassWall2 下载渠道、支持协议与配置使用指南
description: PassWall2 客户端定位、支持系统（OpenWrt / 软路由）、核心（Xray-core/sing-box）、支持协议、配置格式、官方渠道说明及流媒体/AI 使用注意事项。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: SoftwareApplication
dataSource: 第三方代理客户端.txt
software:
  name: PassWall2
  os: OpenWrt / 软路由
faqs:
  - q: "PassWall2 属于第三方通用客户端还是机场专属客户端？"
    a: "属于第三方通用代理插件，支持在 OpenWrt 中导入通用节点订阅与分流规则，不绑定特定机场；若机场仅提供专属客户端而不开放订阅，则无法使用。"
  - q: "PassWall2 和 OpenClash 在规则分流思路上有什么本质区别？"
    a: "PassWall2 基于 Xray-core 或 sing-box 的“分流总节点”模型，由用户在分流规则里将不同域名或 IP 段指定到不同节点；OpenClash 则直接读取 Clash YAML 策略组。"
  - q: "PassWall2 在 OpenWrt 上支持 fw4（nftables）吗？"
    a: "支持。PassWall2 适配了新版 OpenWrt 的 fw4（nftables）与旧版 fw3（iptables）环境，安装时需根据固件版本选择对应的防火墙与内核依赖包。"
  - q: "使用 PassWall2 路由透明代理访问 ChatGPT 或流媒体失败常见原因有哪些？"
    a: "常见原因包括分流总节点未单独绑定 AI/流媒体域名规则、远程 DNS 解析走了默认直连出站，以及局域网终端开启了 IPv6 或浏览器自带 DoH 绕过。"
---

# PassWall2 使用与配置指南

**Answer-First 核心结论**：PassWall2 是 OpenWrt 平台经典的透明代理插件，以 Xray-core 与 sing-box 为核心，采用“规则分流总节点”模型实现精准流量调度，适合偏好手动掌控每一类域名去向、追求低内存开销的软路由用户。

- **适用定位**：适合 OpenWrt 主路由与旁路由部署，支持按域名/IP 列表精细指定不同国家节点出站（如 AI 走美区、流媒体走港区或新加坡）。
- **核心与协议**：支持 Xray-core 与 sing-box 双分流核心，兼容 VLESS、VMess、Trojan、Shadowsocks 与 Hysteria 2。
- **环境依赖**：安装前需核对 OpenWrt 固件 CPU 架构、防火墙模式（fw3 iptables 或 fw4 nftables）及相应核心包体。

> **维护与来源状态**：项目有公开可核实的官方渠道与文档说明

## PassWall2 · 基础技术规格

| 参数维度 | 规格说明 |
|---|---|
| **客户端类别** | 第三方通用代理客户端（非单一机场绑定专属端） |
| **支持操作系统** | OpenWrt / 软路由 |
| **代理内核** | Xray-core / sing-box |
| **支持网络协议** | VLESS、VMess、Trojan、Shadowsocks、Hysteria 2 |
| **配置与订阅格式** | 节点订阅 / 分流规则 |
| **授权与费用** | 开源免费 |
| **官方来源说明** | GitHub 官方开源仓库 (xiaorouji/openwrt-passwall2)（请勿从第三方广告站下载修改版） |

## PassWall2 · 各平台安装与使用要点

- **OpenWrt / 软路由**：确认路由器闪存空间与架构（如 `x86_64`、`aarch64_generic` 等），通过官方 Releases 或匹配软件源安装插件及 Xray/sing-box 组件，避免混装 fw3 与 fw4 防火墙依赖包。

## PassWall2 · 流媒体与 AI 实操配置清单（透明代理 / IPv6 / 固定节点）

1. **配置分流总节点与独立出口**：新建或启用默认“分流总节点”，在“分流规则”中添加流媒体与 AI 域名分组，并分别绑定至指定的单区稳定节点，确保不与普通浏览混用自动故障转移。
2. **启用远程 DNS 与防污染**：在“DNS”选项卡选择通过代理隧道进行远程 DNS 解析（如 `Xray/sing-box` 远程 DoH/TCP），同时禁用客户端浏览器自带 DoH 以防旁路泄漏。
3. **控制 IPv6 代理范围**：若机场节点不支持双栈或易触发风控，在基本设置中将 IPv6 设为不代理或关闭局域网无效 IPv6 下发。

| PassWall2 排错现象 | 常见配置问题 | 处理方法 |
|---|---|---|
| 启用后网页打不开但节点测速正常 | 防火墙透明代理模式或 DNS 端口冲突 | 检查 fw3/fw4 依赖与“过滤代理域名 IPv6”设置 |
| AI 域名仍命中默认直连分流 | 分流规则列表中未包含最新 AI 域名 | 更新 GeoSite 规则库并补充自定义域名规则 |
| 导入 Clash 订阅后无节点显示 | PassWall2 原生不支持 Clash YAML | 改用机场提供的通用/Xray 订阅链接 |

## PassWall2 · 订阅导入与机场兼容性建议

1. **优先获取通用节点订阅**：在[机场品牌数据库](/brands/)核对支持通用订阅的机场（例如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)；飞猫云、SOGO 云、隐形人等仅提供专属 App，无法在路由器导入）。
2. **保护订阅链接**：勿向不明网页提交订阅做格式转换，DNS 防污染概念见[TUN 模式与 DNS 设置指南](/guides/tun-and-dns/)。

## PassWall2 · 所属平台入口与延伸阅读

- [OpenWrt / 软路由 客户端专题](/clients/openwrt/)
- [机场订阅导入全流程教程](/guides/subscription-setup/)
- [节点全部超时排查手册](/troubleshooting/all-nodes-timeout/)
- [查看支持第三方订阅的机场品牌](/brands/)

## PassWall2 · 常见问题

<FaqBlock :items="$frontmatter.faqs" />
