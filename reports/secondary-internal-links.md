# 二级专题内部链接报告 (secondary-internal-links)

审计时间：2026-11-27  
经 `scripts/audit-internal-links.mjs` 扫描验证，全站 143 条路由 **0 死链、0 空链接**。

## 一、核心语义内链路径建设
- **商业二级 → 品牌详情与工具**：`/recommend/streaming/`、`/recommend/ai-tools/`、`/recommend/stable/`、`/recommend/beginners/` 与 `/pricing/*` 均精准链接到对应的 `/brands/<slug>/`、`/compare/` 与 `/tools/streaming-check/`，并搭配 `<AffiliateButton />` 统一从数据库加载推广入口。
- **VPN 与客户端二级 → 教程与排障**：`/vpn/*` 与 6 大系统 `/clients/<os>/` 链接到 24 款客户端独立页及 `/guides/clash-mihomo-guide/`、`/guides/shadowrocket-guide/`、`/guides/tun-and-dns/`、`/troubleshooting/tun-mode-error/`。
- **线路与风险二级 → 透明审计与替代**：`/network/*` 回链 `/tools/streaming-check/` 与 `/brands/guangsu/`；`/risk/*` 回链 `/corrections/`、`/pricing/pay-as-you-go/` 与 `/brands/`。

## 二、建议后续在其他未动页面补充的回链（本次未越界修改）
- 在 33 家单品牌详情页的“客户端适配”段落中，可补充直达对应系统二级专题（`/clients/windows/`、`/clients/ios/`、`/clients/openwrt/`）的语义锚文本。
- 在 20 篇三级排障页底部“延伸阅读”中，可补充回链 `/risk/alternatives/` 与 `/network/regions-and-metrics/`。
