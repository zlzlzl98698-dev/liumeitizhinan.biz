# 品牌对比文章规划与上线交付报告 (brand-comparison-plan)

更新日期：2026-11-27  
规范依据：第九章 9.3（不机械做 33×32 两两穷举组合，仅针对具备清晰用户决策冲突的高价值组合撰写深度对比）。

## 一、已上线品牌深度对比文章（4 篇）

| 对比组合 | 发布 URL | 核心用户抉择命题 | 正文汉字（不含 FAQ 标签） | 双向关联入口 |
|---|---|---|---:|---|
| **光速云 vs 飞猫云** | `/compare/guangsu-vs-feimao/` | 同价 ¥25 月付下，“通用订阅+自研双栖” vs “纯专属端零配置”与 168G vs 150G | 1,415 | 已互连 `/reviews/{guangsu,feimao}/` & `/brands/{guangsu,feimao}/` |
| **光速云 vs 星岛梦** | `/compare/guangsu-vs-xingdaomeng/` | 2020 年两大主力 IEPL 老牌对比：VLESS vs Trojan、三档不限时包与韩东南亚覆面 | 1,333 | 已互连 `/reviews/{guangsu,xingdaomeng}/` & `/brands/{guangsu,xingdaomeng}/` |
| **光速云 vs 二猫云** | `/compare/guangsu-vs-ermao/` | ¥20 白猫省 5 元但**缺少新加坡节点**、中高档成本倒挂与独家端差异 | 1,208 | 已互连 `/reviews/{guangsu,ermao}/` & `/brands/{guangsu,ermao}/` |
| **小明Cloud vs 光速云** | `/compare/xiaoming-vs-guangsu/` | ¥5/600G 超低单价与 **10-19 模板冲突** vs ¥25/168G 可溯源 5 图实测链 | 1,228 | 已互连 `/reviews/{xiaoming,guangsu}/` & `/brands/{xiaoming,guangsu}/` |

*(注：以上每篇对比文章同样渲染有 Frontmatter 可见 `<FaqBlock>` 问答与自动注入的全站 `TopicClusterLinks` 关联面板，同时支持用户使用交互式对比中心 `/compare/` 进行全库 33 品牌任意 3 项字段同表对比。)*

## 二、后续阶段高价值对比备选队列（未越界生成空壳）

| 备选组合 | 核心对比意图 | 依赖条件 | 状态 |
|---|---|---|---|
| 梯子云 vs 隐形人 | 均主打 60+ 节点与便捷官方端，对比“保留通用订阅 vs 完全封闭专属端” | 待补充双方 2026 实时测速图与梯子云多档明细 | `queued` |
| 极连云 vs 光年梯 | 均定位于 ¥18/月 IEPL 入门档（100GB vs 110GB），均有 08-11 截图 | 待补充双方完整月/年多档价目表 | `queued` |
| 唯兔云 vs 星岛梦 | 均主打 IEPL/IPLC + Trojan + 三档永久不限时包 | 待完成唯兔云独立深度评测后配对 | `queued` |
