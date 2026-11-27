---
title: 关于流媒体指南 (liumeitizhinan.biz)
description: 了解流媒体指南（Streaming Guide）的建站定位、三层内容体系（知识教程、品牌评测、决策转化）以及数据透明原则。
date: 2026-11-27
updatedAt: 2026-11-27
dataSource: 站点架构文档
---

# 关于流媒体指南 (Streaming Guide)

**流媒体指南**（域名：`liumeitizhinan.biz`）是一个面向简体中文用户的综合技术知识库与网络服务数据档案站，定位为 **“流媒体使用指南，从网络连接到服务选择”**。

## 一、为什么建立流媒体指南？

大多数网络服务评测站只罗列主观“机场排行榜”，却不解释用户真正每天遇到的问题：**为什么买了节点还是看不了 Netflix 4K？为什么 YouTube 在新加坡节点会被识别为 CN（送中）？为什么 ChatGPT 网页打不开但 App 却能连？**

因此，本站将**流媒体与 AI 服务实际使用需求**放在核心位置，严格划分为三个独立体系：

1. **教程与知识体系**（`/ai/`、`/clients/`、`/network/`、`/guides/`、`/troubleshooting/`）：围绕平台风控政策、设备 DRM（Widevine/PlayReady/HDCP 2.2）、客户端分流规则与跨境传输协议解决真实连接问题。
2. **品牌评测与对比体系**（`/brands/`、`/reviews/`、`/compare/`、`/tools/streaming-check/`）：归档 **33 家机场品牌** 的套餐价格、协议声明、2026-08 历史测速原图与流媒体/AI 记录，客观展示数据状态与冲突。
3. **商业转化体系**（`/recommend/`、`/pricing/`）：在透明披露推广关系与退款限制的前提下，帮助预算、设备与场景明确的用户做出理性试错选择。

## 二、编辑分工、测试框架与纠错机制

- **分工机制**：内容由网络工程排障编辑与数据审校组共同维护——技术文档专注于抓包诊断、客户端安全源校验与协议原理；品牌数据库严格按 `measured / vendor / supplied / conflict / not_tested` 五级口径标注来源。
- **测试工具与环境**：本站归档实测分别基于 **2026-08-11（MAI-TEST-BOT 2.0.0-dev 珠海联通 5Gbps / 喵速 4.7.0 珠海联通 9Gbps）** 与 **2026-08-19（长沙电信、广西移动、河北联通 2Gbps 及珠海联通 9Gbps MiaoKo）** 原始截图包，保留全部超时及异常节点，不做裁剪。
- **数据更正与反馈渠道**：如发现任何品牌套餐变更、官网链接失效或软件仓库迁移，可通过 GitHub 仓库 Issue 或查阅 [数据冲突记录与更正说明](/corrections/) 核对变更记录。

<RelatedContent :links="[
  { title: '查看编辑与实测数据标准', href: '/editorial-standards/', desc: '了解 measured / vendor / supplied / conflict 状态定义' },
  { title: '阅读推广链接与利益披露', href: '/disclosure/', desc: '了解联盟链接规范与独立评测边界' },
  { title: '浏览机场品牌数据库', href: '/brands/', desc: '查看全部 33 家品牌档案与实测证据' }
]" />
