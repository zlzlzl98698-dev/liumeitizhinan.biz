# 全站三级文章、品牌评测与比较资产审计报告 (third-level-audit)

审计时间：2026-11-27  
构建基准：`npm run build`（VitePress v1.6.4 + `scripts/audit-content-quality.mjs`）

## 一、全站内容资产结构盘点

经过本轮三级长尾文章矩阵、独立品牌深度评测及品牌横向比较建设后，全站可索引 Markdown 页面总数达到 **164 页**（另含 1 个不入索引的 `404.md`）：

| 内容层级 / 页面类型 | 数量 | 状态说明 | 本轮变更情况 |
|---|---:|---|---|
| 网站首页 (`/`) | 1 | 已定版保留 | **未修改正文与视觉设计** |
| 一级专题支柱页 | 10 | 已于上一阶段完成深度升级（55,377 汉字） | **未修改正文**，通过 `TopicClusterLinks` 自动注入下级回链 |
| 二级核心专题与工具枢纽 | 27 | 包含 26 个已深度升级二级中心 + 新增 `/reviews/` 评测目录 | 保持 26 个原 URL 与正文完整未破坏 |
| **三级长尾专题与专项文章** | **77** | 含 **8 篇本轮新建高意图长尾文章** + **8 篇深度升级已有核心文章** + 61 篇既有客户端/平台/排障页 | 新增 8 篇、深写升级 8 篇，均保留原有有效 URL |
| **品牌独立深度评测 (`/reviews/<slug>/`)** | **8** | 包含 1 篇主推万字评测（光速云）+ 7 篇独立结构主力/争议品牌评测 | 全部在本轮新建并部署暗黑技术监控组件 |
| **品牌两两比较文章 (`/compare/*-vs-*/`)** | **4** | 光速云 vs 飞猫云 / 星岛梦 / 二猫云 / 小明Cloud | 全部在本轮新建 |
| 品牌商业详情页 (`/brands/<slug>/`) | 33 | 全部 33 家品牌商业报价、优惠码与官方直达入口 | 修正飞猫云/无忧链接客户端矛盾；分离 `/brands/guangsu/` 商业意图 |
| 站务与合规披露页 | 4 | `/about/`、`/editorial-standards/`、`/disclosure/`、`/corrections/` | 完整保留 |

## 二、既有薄弱页升级与去重处置结论

1. **已完成深度重写升级的三级核心页（8 篇，保留原 URL）**：
   - `/guides/subscription-setup/`、`/guides/clash-mihomo-guide/`、`/guides/shadowrocket-guide/`、`/guides/tun-and-dns/`
   - `/troubleshooting/all-nodes-timeout/`、`/troubleshooting/subscription-update-failed/`
   - `/ai/netflix-guide/`、`/ai/chatgpt-guide/`
2. **新开辟的商业高意图与技术缺口三级页（8 篇）**：
   - `/recommend/how-to-choose/`、`/recommend/multi-device-guide/`
   - `/pricing/ten-yuan-plans/`、`/pricing/traffic-and-multiplier/`
   - `/network/three-isp-routing/`
   - `/guides/claude-fixed-node-rules/`、`/guides/cfw-to-clash-verge/`
   - `/risk/subscription-converter-risk/`
3. **商业意图去重分离**：原 `/brands/guangsu/` 混合了评测标题与商业信息；现将其规范调整为**「套餐价格、优惠码 AMM 与官方入口」**商业详情页，而把**万字级独立优缺点评测**正式落户 `/reviews/guangsu/`，消除关键词互相竞争（Cannibalization）。
4. **61 篇未越界修改的三级存量页处置**：24 款单客户端百科（463–531 汉字/篇）、剩余 AI/流媒体分平台页、其余排障与教程页均保持可用且已自动挂载进 `TopicClusterLinks` 关联网络中，并登记于后续内容深化待办表。
