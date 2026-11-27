<div align="center">

<img src="docs/public/images/og-cover.jpg" alt="流媒体指南 Streaming Guide 封面图" width="760" />

<br />
<br />

# 流媒体指南 · Streaming Guide

**流媒体使用指南，从网络连接到服务选择。**

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?style=flat-square&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Pages](https://img.shields.io/badge/Canonical%20Pages-180-0EA5E9?style=flat-square)](#站点内容规模与架构)
[![Brands](https://img.shields.io/badge/Brands%20Indexed-33-10B981?style=flat-square)](#数据驱动与合规审计)
[![Clients](https://img.shields.io/badge/Proxy%20Clients-24-38BDF8?style=flat-square)](#站点内容规模与架构)
[![QA](https://img.shields.io/badge/SEO%20%26%20Link%20Audit-0%20Errors-22C55E?style=flat-square)](#自动化审计流水线)

面向简体中文用户的 **流媒体播放排障、AI 工具网络环境、全平台代理客户端选型与可溯源品牌数据档案库**（`https://liumeitizhinan.biz/`）。

[快速开始](#本地开发与构建) · [站点架构](#站点内容规模与架构) · [数据合规](#数据驱动与合规审计) · [SEO 与 GEO](#seo-与-geo-基础设施) · [部署说明](#生产部署与站长配置)

</div>

---

## 项目亮点

- **三层知识图谱架构**：覆盖 **180 篇** 规范可索引页面（外加 `404.md`），涵盖流媒体与 AI 平台、故障排查、客户端软件、网络线路百科、套餐定价、品牌数据库、独立深度评测与竞品横向对比。
- **严谨的数据溯源与冲突透明**：将“有实测原图 (`measured`)”、“品牌资料 (`vendor`)”、“供稿表 (`supplied`)”与“待核实 (`not_tested`)”严格分离；全库已知 **15 项数据冲突** 不隐藏、不擅改，统一归档于 [reports/DATA-CONFLICTS.md](reports/DATA-CONFLICTS.md) 并在前端显式告警。
- **交互式实用工具组件**：内置首页全站与品牌直达搜索（支持 `?q=`）、33 品牌多维筛选库、297 条平台可用性检索引擎、三品牌并排对比中心、交互式故障定位树、真实倍率单价计算器，以及测速原图原生点击放大灯箱。
- **全链路构建前/后自动化 QA**：每次 `npm run build` 自动校验品牌字段、推广链接 `rel="nofollow sponsored noopener"` 规范（禁止正文硬编码推广 URL）、Canonical/Title/H1 唯一性、20,000+ 站内链接完整性、图片资产存在性与中文正文质量阈值。
- **开箱即用的 SEO / GEO 底座**：服务端静态预渲染（SSG）直出全部核心正文，集成中文 `BreadcrumbList`、`WebSite`、`Organization`、`Article`/`TechArticle`、`SoftwareApplication` 与 `FAQPage` JSON-LD，`dist/` 自动生成 `sitemap.xml`、`rss.xml` 与 `llms-full.txt`。

---

## 站点内容规模与架构

| 模块路由 | 收录范围与核心内容 | 数据支撑文件 |
|---|---|---|
| `/` | 首页聚合中枢、问题速搜入口、精选评测与快速排障导航 | `data/brands.json`, `data/topic-navigation.json` |
| `/recommend/` | 场景化推荐（流媒体 4K、AI 工具、稳定性、新手与多设备） | `data/brands.json`, `data/test-records.json` |
| `/pricing/` | 套餐与计费拆解（真月付 vs 年付均摊、倍率陷阱、不限时流量包、真实单价计算器） | `data/pricing.json` |
| `/brands/` | **33 家**服务商商业档案库与筛选面板（含 `DATA-CONFLICTS.md` 冲突提示） | `data/brands.json`, `data/data-sources.json` |
| `/reviews/` | **12 篇**独立深度评测中心（含旗舰万字评测 `/reviews/guangsu/` 与三网 5 张原图拆解） | `docs/public/reports/` |
| `/compare/` | 品牌多维对比中心与 **7 篇**核心品牌/客户端深度横向对比 | `data/brands.json` |
| `/clients/` | **6 大平台**汇总 + **24 款**开源/商店代理客户端详解与安全警示 | `data/clients.json` |
| `/ai/` | Netflix 4K (DRM/HDCP)、YouTube 送中、Disney+、ChatGPT、Claude、Gemini 等 **16 篇**专题 | `data/streaming-services.json`, `data/ai-services.json` |
| `/network/` | IPLC / IEPL 专线、BGP 中转、原生 IP vs 机房 IP、三网骨干网特性与测速指标换算 | 网络技术知识库 |
| `/guides/` | 从零导入订阅、Clash Verge Rev / Shadowrocket / v2rayN / OpenWrt Nikki、TUN 与 DNS 防泄漏 | 教程知识库 |
| `/troubleshooting/` | **20 篇**高频报错与黑屏排查指南（`M7111-5059`、`Something went wrong`、IPv6 泄漏等） | 故障排查知识库 |
| `/tools/streaming-check/` | **297 条**平台可用性记录与 **22 份**历史测速/解锁图片档案检索中心 | `data/availability-records.json` |

---

## 目录结构

```text
liumeitizhinan.biz/
├── data/                        # 全站结构化 JSON 数据源（品牌、价格、客户端、流媒体记录、内链图谱）
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts           # VitePress 配置、JSON-LD 注入、OG/Twitter 元数据、本地搜索优化
│   │   └── theme/
│   │       ├── Layout.vue       # 全局布局（面包屑、编辑部元信息、专题图谱、页脚、图片灯箱）
│   │       ├── custom.css       # 明暗双主题排版、对比表、公式卡片、响应式导航抽屉样式
│   │       └── components/      # 16 个 Vue 3 交互组件（BrandDirectory, CompareCenter, MultiplierCalculator 等）
│   ├── public/                  # 静态资源（.htaccess, robots.txt, llms.txt, og-cover.jpg, 品牌 Logo 与实测原图）
│   ├── ai/ ... vpn/             # 180 篇可索引 Markdown 文档 + 404.md
├── reports/                     # 构建期生成的品牌冲突报告、SEO 审计报告与原始数据说明
├── scripts/                     # 数据导入、页面生成、RSS/Sitemap/llms-full 构建与 7 项自动化审计脚本
├── ALGOLIA-SETUP.md             # Algolia DocSearch 可选接入指南
└── package.json
```

---

## 本地开发与构建

环境要求：**Node.js >= 20**（已验证于 Node v24）。

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务器
npm run dev

# 3. 执行完整生产构建（自动运行 prebuild 审计 -> VitePress 构建 -> postbuild 生成与全量 QA）
npm run build

# 4. 本地预览构建产物 (dist)
npm run preview
```

---

## 自动化审计流水线

运行 `npm run build` 或 `npm run audit:all` 时，[scripts/](scripts/) 会自动执行全套质量门禁（任一核心检查失败即中断构建）：

| 阶段 | 脚本 | 校验内容 |
|---|---|---|
| `prebuild` | `audit-brands.mjs` | 检查 33 家品牌基础字段、协议与状态标记完整性 |
| `prebuild` | `audit-conflicts.mjs` | 汇总并输出数据源冲突清单至 `reports/DATA-CONFLICTS.md` |
| `prebuild` | `audit-affiliate-links.mjs` | 严防正文出现未托管硬编码推广链接（要求全站 `docs/` 命中为 `0`） |
| `postbuild` | `generate-rss.mjs` / `sitemap` / `llms` | 生成 `dist/rss.xml`、`dist/sitemap.xml` 与 `dist/llms-full.txt` |
| `postbuild` | `audit-seo.mjs` | 验证 180 页 Title/Description/H1 唯一性、Canonical 规范与超长标题预警 |
| `postbuild` | `audit-internal-links.mjs` | 扫描 20,000+ 条站内链接完整性，并拦截本地 `file:///` 路径暴露 |
| `postbuild` | `audit-images.mjs` | 校验全部品牌 Logo 与历史实测截图在 `docs/public/` 中存在无缺漏 |
| `postbuild` | `audit-content-quality.mjs` | 检查各层页面汉字长度底线、表格与必需组件合规性 |

---

## SEO 与 GEO 基础设施

- **唯一规范主域**：`https://liumeitizhinan.biz/`（配合 [docs/public/.htaccess](docs/public/.htaccess) 实现 HTTP / `www` 301 重定向、尾斜杠规范、`font/woff2` 与静态资源缓存、Gzip 压缩及真实 `404.html` 错误页）。
- **爬虫放行与索引**：[docs/public/robots.txt](docs/public/robots.txt) 默认放行 `Googlebot`、`bingbot`、`Baiduspider`、`yisouspider` 与通用爬虫；[docs/public/llms.txt](docs/public/llms.txt) 与构建产出的 `llms-full.txt` 面向生成式引擎提供全站结构化索引。
- **结构化数据**：内置 `Organization`、`WebSite` (`SearchAction`)、`BreadcrumbList`、`CollectionPage`、`Article`、`TechArticle`、`SoftwareApplication` 及 `<details open>` 语义化对应的 `FAQPage` Schema。

---

## 生产部署与站长配置

1. 执行 `npm run build`，将静态产物目录 `docs/.vitepress/dist/` 上传至 Apache / Nginx / 静态托管平台。
2. 构建时可通过环境变量按需注入站长平台验证码与 Algolia 搜索凭据：

```bash
# 可选：搜索引擎所有权验证 Meta（直接预渲染进全站 HTML <head>）
GOOGLE_SITE_VERIFICATION="..."
BING_SITE_VERIFICATION="..."
SHENMA_SITE_VERIFICATION="..."
BAIDU_SITE_VERIFICATION="..."

# 可选：启用 Algolia DocSearch 替换默认本地搜索（详见 ALGOLIA-SETUP.md）
VITE_ALGOLIA_APP_ID="..."
VITE_ALGOLIA_SEARCH_API_KEY="..."
VITE_ALGOLIA_INDEX_NAME="..."
```

---

## 数据声明与免责说明

- 站内收录的套餐价格、流量配额与协议标签主要整理自公开资料与历史归档，**部分优惠码与入口状态存在版本差异已在站内标注**，消费决策前请以服务商官网实时结账页为准。
- 站内 `2026-08-11` 与 `2026-08-19` 测速/解锁原图仅代表对应时间点、测试工具与运营商环境下的历史快照，不构成永久解锁或长期速率承诺。
- 商业推广链接统一标注 `rel="nofollow sponsored noopener"`，不影响用户实付金额，亦不影响本站对短板与风险的独立披露。
