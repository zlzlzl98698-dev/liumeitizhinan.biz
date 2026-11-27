# 流媒体指南 (liumeitizhinan.biz) 最终构建与 QA 验收报告

- **构建时间**：2026-11-27
- **构建命令**：`npm run build`
- **VitePress 版本**：`v1.6.4`（耗时 10.74s）
- **输出目录**：`docs/.vitepress/dist`

## 1. 技术与部署验收
- [x] VitePress 静态生成正常完成，输出完整 `docs/.vitepress/dist`
- [x] Algolia DocSearch 环境变量接入已预置（`VITE_ALGOLIA_APP_ID` / `VITE_ALGOLIA_SEARCH_API_KEY` / `VITE_ALGOLIA_INDEX_NAME`），未配置时自动降级启用 VitePress 本地中文索引搜索
- [x] `sitemap.xml` 自动生成并过滤 `noindex` / `404` 页面，共收录 **143 个可索引规范 URL**
- [x] `rss.xml` 已生成（含最新 50 条内容）
- [x] `robots.txt`、`llms.txt`、`404.html`、Apache `.htaccess`（HTTPS 与裸域 301 重定向、cleanUrls 静态规则、安全头、缓存与压缩，不含错误 SPA 首页 fallback）已全部就绪

## 2. SEO 与内链验收
- [x] 全部 143 个可索引页面 Title 唯一、Meta Description 唯一、H1 唯一、Canonical 指向 `https://liumeitizhinan.biz/...`（0 错误）
- [x] 14,489 条站内链接经全量扫描验证，死链数为 **0**
- [x] 75 个核心关键词完成 14 个集群映射，互抢检测冲突数为 **0**（外部搜索量在未导入 GSC/Bing CSV 前统一标记为“未知”）

## 3. 品牌数据库与合规验收
- [x] 共导入 **33 家机场品牌实体**（含 Firefly 与 Firefly 萤火虫别名合并及测速包内的快狸）、**210 项套餐条目**、**22 份实测图片档案**、**297 条平台可用性状态记录**
- [x] 光速云主推页面 `/brands/guangsu/` 完整展示 7 档套餐、冲突披露、2026-08-11 测速图与 2026-08-19 五张电信/移动/联通 MiaoKo 实测图
- [x] 全站无 Markdown/组件硬编码推广链接（0 命中），推广链接统一从 `data/brands.json` 读取并附 `target="_blank" rel="nofollow sponsored noopener"` 及利益关系披露
- [x] 15 项来源数据冲突已公开记录于 `reports/DATA-CONFLICTS.md` 及 `/corrections/` 页面，未擅自伪造测速或解锁状态

## 4. GEO 内容质量检查
- [x] 流媒体、AI、排障、客户端及品牌页面均采用 Answer-First 开头直接回答核心问题
- [x] 明确区分账号地区、硬件 DRM、客户端 TUN/DNS/IPv6 与出口 IP 归属，不绝对化承诺永久解锁
- [x] FAQPage Schema 仅输出在页面可见 FAQ 对应页面，内容与 JSON-LD 一致

## 5. 上线前人工待办清单
1. 将 `docs/.vitepress/dist` 目录完整上传至支持 `.htaccess` 的 Apache HTTPS 主机根目录（确保 `www` 域名解析至同主机以便 301 生效）。
2. 如需切换至 Algolia 全站托管搜索，在构建环境注入 `VITE_ALGOLIA_APP_ID`、`VITE_ALGOLIA_SEARCH_API_KEY`（仅 Search-Only Key）和 `VITE_ALGOLIA_INDEX_NAME` 后重新执行 `npm run build`。
3. 站长平台接入与提交：`https://liumeitizhinan.biz/sitemap.xml` 提交至 Google Search Console、Bing Webmaster Tools、神马站长平台与百度搜索资源平台。
4. 后续取得真实 GSC / Bing 导出 CSV 后，放入 `data/gsc-import.csv` / `data/bing-import.csv` 并运行 `npm run keywords:pipeline` 更新关键词机会报告。
