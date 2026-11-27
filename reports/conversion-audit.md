# 商业链接合规与全链路转化审计报告 (conversion-audit)

审计时间：2026-11-27  
审计脚本：`scripts/audit-affiliate-links.mjs`、`scripts/audit-brands.mjs`、`scripts/audit-content-quality.mjs`

## 一、商业链接统一治理结果

1. **零 Markdown 硬编码推广链接**：本轮审计及时拦截并清除正文中出现的 `xiaomingtg.com` 直接网址文本引用，最终全站扫描 `docs/` 目录硬编码推广域名命中数 = **0**；所有跳转地址统一从 `data/brands.json` 读取。
2. **标准安全属性与利益披露全覆盖**：`BrandProfile.vue` 与 `AffiliateButton.vue` 统一渲染 `target="_blank" rel="nofollow sponsored noopener"`，并在对应位置标注 **“含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格”**。
3. **历史异常 URL 保持原始记录提示**：对于原始清单中缺乏 `#/` 路由标识的云界线（且存在双 code 冲突）和环球梯，均在 `reports/AFFILIATE-LINKS-AUDIT.md` 及对应档案卡内清晰提示风险，未篡改原始链接。

## 二、按页面搜索意图分层的转化路径设计

严格落实第十章 10.2 转化伦理规则，拒绝“每篇排障和教程下方硬塞广告按钮”：

| 页面层级 / 意图类型 | 转化定位策略 | 实操执行验证 |
|---|---|---|
| **教程与排障文章** (`/guides/*`, `/troubleshooting/*`) | 以解决操作步骤、规则脚本或断流排查为核心，不放置直接注册促销按钮 | 迁移、TUN、超时、订阅失败文章聚焦纯技术解，仅在涉及通用订阅兼容性时客观举例品牌 |
| **价格与选型研究文** (`/recommend/how-to-choose/`, `/pricing/ten-yuan-plans/`) | 解决预算与参数判断后，自然导向独立深度评测 (`/reviews/*`) 与横向比较 (`/compare/*`) | 通过内链与 `TopicClusterLinks` 引导至评测，而非直接跳过评测推销售 |
| **独立品牌深度评测** (`/reviews/<slug>/`) | 先独立分析优缺点、实测截图与数据冲突，文顶证据卡及文末结论提供商业档案直达 | `BrandReviewTelemetry` 提供商业档案链接与合规 `AffiliateButton`，无每个 H2 下刷屏重复按钮 |
| **品牌商业详情页** (`/brands/<slug>/`) | 聚焦具体套餐档位、优惠码限制与最终官方注册 CTA | 保留完整 `<BrandProfile>` 转化组件并补充“阅读独立深度评测 →”交叉路径 |
