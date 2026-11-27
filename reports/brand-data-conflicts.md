# 品牌数据可信度分级与冲突审计报告 (brand-data-conflicts)

生成时间：2026-11-27  
机器审计源：[DATA-CONFLICTS.md](file:///c:/Users/Pro%20User/Desktop/liumeitizhinan.biz/reports/DATA-CONFLICTS.md) & 本轮新增校对记录

## 一、本轮新发现并当场修复的源数据解析偏差（2 项）

| 品牌 | 原数据缺陷 | 核查原文证据 | 本轮修复结果 |
|---|---|---|---|
| **飞猫云 (`feimao`)** | `brands.json` 原自动脚本因匹配到“不用配 Clash”里的 `Clash` 字眼，错标为 `thirdPartyClientSupport: true` | 《推广机场品牌清单.txt》第 94–95、120 行明确写“专属客户端下载登录即用，不用配订阅/不用找订阅链接/不用配 Clash” | 已同步更新 `scripts/import-brands.mjs`、`data/brands.json` 与 `/brands/feimao/` 标为 `false`（仅官方专属端） |
| **无忧链接 (`wuyou`)** | 原 `thirdPartyClientSupport` 为 `null` 且文案描述需统一 | 第 311 行写“专属客户端下载登录即用，新手不用折腾订阅配置” | 已在 `brands.json` 与 `/brands/wuyou/` 明确更新为官方专属端直连 |

## 二、仍须在全部评测与对比中显著保留披露的 15 项原始冲突

来自 `scripts/audit-conflicts.mjs` 自动审计的 **15 项原始文档冲突** 全部按“不篡改任一来源、并列披露风险”原则保留：
1. **光速云 轻量版月流量冲突**：`59GB`（主推文档第 8 行摘要）vs `69GB`（详表与清单表）。
2. **光速云 档位数量差异**：4 档详表 vs 7 档总表（流光/量子/无界补充）。
3. **小明Cloud 2026-10-19 测速表误贴**：与光速云 5 地延迟及带宽数字小数点级完全一致。
4. **Firefly 重复实体与双链接**：合并 #8 Firefly 与文末 Firefly 萤火虫（保留 `2n7VURre` 主链与 `jTp9wSgZ` 记录）。
5. **暮光加速 双冲突**：优惠码 `muguang5555` vs “未查到公开优惠码”；年付折算 `¥9.08` vs 月付门槛 `¥20`。
6. **微风网络 测速图未入册**：压缩包内存在 `微风-节点测速实测.png` 但未在 `speedtest-manifest.json` 登记。
7. **二猫云 新加坡节点冲突**（评测补充提示）：介绍正文明确提示“少了新加坡这一站”，但同页 10-19 文本表含新加坡一行。
8. **优惠码双版本冲突（5 家）**：灵猫网络（`lmao888` / `lingmao`）、一翻云（`yfy6666` / `1FLYYUN`）、SOGO 云（`SOGO10000` / `sss777`）、全球云（`qq88` / `qqy7777`）、隐形人（`yxr888` / `moon80`）。
9. **推广链接 URL 格式/邀请码异常（2 家）**：云界线（`aycnwNUi` vs `HBaZ91c6` 且缺 `#/`）、环球梯（缺 `#/` 路由标识）。
10. **可信云 测速日期置信度**：图底仅见 `15:32:35 CST`，完整日期由同批次压缩包推断。
