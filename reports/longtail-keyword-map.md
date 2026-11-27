# 三级长尾关键词映射与聚类报告 (longtail-keyword-map)

生成时间：2026-11-27  
机器数据文件：
- [longtail-master.csv](file:///c:/Users/Pro%20User/Desktop/liumeitizhinan.biz/data/keywords/longtail-master.csv)
- [article-keyword-map.json](file:///c:/Users/Pro%20User/Desktop/liumeitizhinan.biz/data/keywords/article-keyword-map.json)
- [cluster-map.json](file:///c:/Users/Pro%20User/Desktop/liumeitizhinan.biz/data/keywords/cluster-map.json)
- [content-priority.csv](file:///c:/Users/Pro%20User/Desktop/liumeitizhinan.biz/data/keywords/content-priority.csv)

## 一、核心统计与数据严谨原则

- **纳入结构化关键词任务总条目**：**113 条**
  - **已上线/已升级落地（`live`：`upgraded` + `new_published` + `published`）**：**106 条**（全部具备真实静态 HTML 页面并进入 `sitemap.xml`）
  - **已规划未写待办（`backlog_planned`）**：**7 条**（明确标为待排期，**未创建空白 Markdown 占位页**）
- **搜索量字段原则**：在尚未导入 Google Search Console / Bing Webmaster Tools 真实导出报表前，全部关键词 `searchVolume` 统一标为 `unknown_unverified`，**零编造月搜索量或 KD 难度数值**。

## 二、十大一级主题的三级聚类映射摘要

| 一级专题 | 本轮新增 / 升级高价值 URL | 保留有效三级页面群 | 待排期长尾队列（`backlog_planned`） |
|---|---|---|---|
| **01. 机场推荐** (`/recommend/`) | `/recommend/how-to-choose/`、`/recommend/multi-device-guide/` | — | `monthly-vs-annual-first-buy`、`node-region-check`、`same-price-comparison` |
| **02. 价格与套餐** (`/pricing/`) | `/pricing/ten-yuan-plans/`、`/pricing/traffic-and-multiplier/` | — | `one-yuan-airport-limits`、`300gb-vs-500gb`、`payg-vs-cheap-monthly` |
| **03. 机场品牌与对比** (`/brands/`, `/reviews/`, `/compare/`) | 8 篇 `/reviews/<slug>/` + 4 篇 `/compare/*-vs-*/` | 33 篇 `/brands/<slug>/` 商业页 | 其余 25 家缺独立评测数据品牌（待实测补充后再扩展） |
| **04. VPN 与加速器** (`/vpn/`) | — | 2 个二级深度主题页 | `dual-tunnel-conflict`、`mobile-background-disconnect` |
| **05. 客户端软件** (`/clients/`) | — | 24 个单软件百科页面 | `v2rayn-singbox-upgrade`、`openwrt-nikki-setup`、`flclash-vs-clash-verge` |
| **06. AI 与流媒体** (`/ai/`) | `/ai/netflix-guide/`（升级）、`/ai/chatgpt-guide/`（升级） | 16 篇平台与登录环境文章 | — |
| **07. 线路与节点** (`/network/`) | `/network/three-isp-routing/` | 4 个核心二级专题页 | `verify-iepl-claims`、`packet-loss-and-jitter` |
| **08. 使用教程** (`/guides/`) | `/guides/subscription-setup/`、`/guides/clash-mihomo-guide/`、`/guides/shadowrocket-guide/`、`/guides/tun-and-dns/`、`/guides/claude-fixed-node-rules/`、`/guides/cfw-to-clash-verge/` | 3 篇其余配置教程 | — |
| **09. 故障排查** (`/troubleshooting/`) | `/troubleshooting/all-nodes-timeout/`、`/troubleshooting/subscription-update-failed/` | 18 篇分症状排查页 | `wifi-vs-cellular`、`pc-works-phone-fails` |
| **10. 风险与替代** (`/risk/`) | `/risk/subscription-converter-risk/` | 4 个核心二级风险页 | `maintenance-vs-shutdown`、`refund-dispute-evidence` |

## 三、防关键词竞食审计结果

由 `scripts/audit-content-quality.mjs` 自动检测 `article-keyword-map.json` 中 90 条线上任务的 `primaryKeyword` 字段：**重复竞争冲突 = 0**；所有新增页面均针对独立唯一意图撰写。
