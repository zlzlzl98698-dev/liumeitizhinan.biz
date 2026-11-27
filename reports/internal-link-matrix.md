# 全站内链自动化图谱与孤岛清零报告 (internal-link-matrix)

审计时间：2026-11-27  
底层机制：`scripts/build-keyword-matrix.mjs` → 生成 `data/topic-navigation.json` → 由 `docs/.vitepress/theme/components/TopicClusterLinks.vue` 挂载在 `Layout.vue` `#doc-after` 静态渲染阶段自动输出。

## 一、零破坏式全站互连架构

本轮严格遵循 **“不修改已完成的一级、二级专题 Markdown 正文”** 约束，同时完全解决了新增三级长尾文章、8 篇 `/reviews/<slug>/` 与 4 篇 `/compare/*-vs-*/` 的双向发现路径问题：

1. **一级 / 二级专题 → 下级三级文章 & 评测（自动下行回链）**：通过 `TopicClusterLinks.vue`，10 个一级枢纽与对应二级专题页底部会在 VitePress SSR 静态 HTML 阶段自动渲染出隶属该主题的新增/升级三级文章与核心评测入口。
2. **三级文章 → 上级专题 + 同级延伸 + 对应评测（自动上行与横向网）**：每篇新增/升级的三级长尾文章底部自动展示所属二级/一级专题返回入口，并根据内容转化类型有条件关联品牌评测或比较文章（教程/排障不强插广告）。
3. **品牌商业详情页 (`/brands/<slug>/`) ↔ 独立深度评测 (`/reviews/<slug>/`) ↔ 品牌对比 (`/compare/*-vs-*/`)**：
   - `BrandProfile.vue` 顶栏与底部参考卡已集成“阅读独立深度评测 →”入口；
   - `BrandReviewTelemetry.vue` 评测证据卡已集成“查看商业套餐页 →”及统一披露的官方跳转 CTA；
   - `config.mts` `sidebar` 为 `/recommend/`、`/pricing/`、`/network/`、`/guides/`、`/risk/`、`/reviews/` 与 `/compare/` 补齐了完整树状侧边栏（严格保持 `nav` 顶级菜单零改动）。

## 二、内链与孤岛审计结果

- **死链检查 (`scripts/audit-internal-links.mjs`)**：跨全部路由静态 HTML 扫描超过 **17,770+** 条内部链接，**Broken Links = 0**；
- **孤岛页面检查 (`scripts/audit-content-quality.mjs`)**：对 `dist/` 全部页面统计入站内链（`inboundCount`），**0 入站孤岛页面 = 0**。
