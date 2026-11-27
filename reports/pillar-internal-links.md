# 10 大一级专题内部链接矩阵报告 (pillar-internal-links)

审计时间：2026-11-27  
验证方式：`scripts/audit-internal-links.mjs` 全站 HTML 链接静态扫描（0 死链）。

## 一、跨一级专题核心流转链路

按设计要求建立了以下用户决策与知识深挖路径（均嵌入正文对应语境段落，而非底部机械堆砌十个固定菜单）：
1. **机场推荐 (`/recommend/`) → 价格与套餐 (`/pricing/`) → 机场品牌 (`/brands/`)**：从选型需求过渡到计费核算与全部 33 家数据库检索。
2. **机场推荐 (`/recommend/`) → 线路与节点 (`/network/`) → 品牌评测 (`/brands/guangsu/` 等)**：从“为何推荐”深挖到 IEPL/IPLC 与三网差异，再核查单品牌实测原图。
3. **VPN 与加速器 (`/vpn/`) → 客户端软件 (`/clients/`) → 使用教程 (`/guides/`)**：从产品边界区分过渡到选择开源客户端与订阅配置。
4. **客户端软件 (`/clients/`) → 使用教程 (`/guides/`) → 故障排查 (`/troubleshooting/`)**：安装选型后按步骤上手，遇报错无缝定位。
5. **AI 与流媒体 (`/ai/`) → 线路与节点 (`/network/`) → 品牌评测 (`/brands/guangsu/`) & 测试中心 (`/tools/streaming-check/`)**：从平台风控要求理解原生 IP/送中机理并查证实测矩阵。
6. **风险与替代 (`/risk/`) → 机场品牌 (`/brands/`) → 机场推荐 (`/recommend/`)**：识别风险与失联信号后，从品牌库按“支持通用订阅+有截图+提供月付”筛选替代服务。

## 二、各一级专题向下连接明细（部分核心路径）

| 一级专题 | 连接的二级专题 | 连接的三级/独立评测及工具页 |
|---|---|---|
| `/recommend/` | `/recommend/streaming/`, `/recommend/ai-tools/`, `/recommend/beginners/` | 25+ 品牌页、`/compare/`、`/tools/streaming-check/`、`/clients/clash-verge-rev/` 等 |
| `/pricing/` | `/pricing/budget/`, `/pricing/billing-cycles/`, `/pricing/pay-as-you-go/`, `/pricing/rules/` | 全库 33 品牌价目对应页、`/compare/`、`/risk/` |
| `/brands/` | `/compare/`, `/tools/streaming-check/` | 全部 33 家品牌详情页 (`/brands/<slug>/`)、`/corrections/`、`/editorial-standards/` |
| `/vpn/` | `/vpn/vpn-vs-proxy/`, `/vpn/platforms/` | `/clients/v2rayng/`, `/clients/clash-verge-rev/`, `/clients/shadowrocket/`, `/clients/nekobox/` 等 |
| `/clients/` | `/clients/windows/`, `android/`, `ios/`, `macos/`, `linux/`, `openwrt/` | 全部 24 款客户端独立页 (`/clients/<slug>/`)、`/guides/subscription-setup/`、`/guides/tun-and-dns/` |
| `/ai/` | — | 18 篇平台与 AI 网络深度文章 (`/ai/*`)、全套排障页 (`/troubleshooting/*`)、`/tools/streaming-check/` |
| `/network/` | — | 4 篇线路百科 (`/network/*`)、`/tools/streaming-check/`、`/brands/guangsu/`、`/troubleshooting/ipv6-leak-error/` |
| `/guides/` | — | 7 篇分步教程 (`/guides/*`)、OS 客户端页、`/troubleshooting/subscription-update-failed/` |
| `/troubleshooting/` | — | 20 篇独立排障手册 (`/troubleshooting/*`)、`/ai/netflix-4k-guide/`、`/ai/youtube-cdn-dns/` |
| `/risk/` | — | 4 篇风险专题 (`/risk/*`)、`/pricing/pay-as-you-go/`、`/corrections/`、`/editorial-standards/` |
