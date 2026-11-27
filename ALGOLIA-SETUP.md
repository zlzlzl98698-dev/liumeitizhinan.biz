# Algolia DocSearch 配置与本地搜索备用说明

本站已在 `docs/.vitepress/config.mts` 中预置完整的 **Algolia DocSearch** 接入逻辑与 **VitePress Local Search** 中文备用方案：

## 环境变量配置（构建期读取）

在生产 CI / 构建环境注入以下三个环境变量即可自动切换至 Algolia 全站搜索：

```env
VITE_ALGOLIA_APP_ID=your_algolia_app_id
VITE_ALGOLIA_SEARCH_API_KEY=your_search_only_api_key
VITE_ALGOLIA_INDEX_NAME=liumeitizhinan_biz
```

## 安全规范

- **严禁将 Algolia Admin API Key 写入任何前端代码、配置文件或仓库提交中**。
- 仅使用具备只读查询权限的 **Search-Only API Key**。
- 在尚未配置以上环境变量时，系统会自动降级启用 VitePress 本地中文索引搜索（确保搜索框开箱可用）。
