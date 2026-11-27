---
title: 流媒体与 AI 服务测试记录中心：297 条平台记录与 22 份实测图片档案查询
description: 支持按品牌、流媒体（Netflix/Disney+/YouTube/Max/TikTok/Spotify）与 AI（ChatGPT/Claude/Gemini）筛选查询全站可用性记录与原始测速/解锁截图批次，严格区分实测数据与品牌资料宣称。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: CollectionPage
dataSource: data/availability-records.json & data/test-records.json
faqs:
  - q: 测试中心里的 Available、Partial、Vendor Data 和 Not Tested 分别是什么意思？
    a: Available 代表在本站留存实测截图中有明确成功解锁记录；Partial 代表实测或资料显示视具体节点地区而定（例如香港仅 App 可用、部分地区失败或 YT 送中）；Vendor Data 代表来自品牌资料或供稿宣称，尚未经过本站独立截图验证；Not Tested 代表当前尚无独立测试或可用资料。
  - q: 为什么列表里除了光速云，很多品牌的 Netflix 和 ChatGPT 都标成 Vendor Data 而不是 Available？
    a: 本站严格执行证据溯源制度。2026-08-11 资料包内的 17 张 PNG 仅测试了节点速度、延迟、协议和 UDP，未包含流媒体和 AI 探测；只有光速云拥有 2026-08-19 5 张三网 MiaoKo 流媒体与 AI 实测原图。对于未实测的项目，本站绝不伪造绿勾。
  - q: 在光速云 2026-08-19 的实测记录里，为什么同一个品牌下不同地区结果差异这么大？
    a: 这是最真实的跨平台现状：测试原图显示其香港专线全线解锁 Netflix 和 Disney+，但 OpenAI 仅 APP(HK) 且 Gemini 失败；新加坡和台湾节点在珠海联通 9Gbps VLESS 测试中出现 YouTube 送中(CN)，而日本和美国节点 YouTube 正常且解锁 OpenAI，新加坡/马来西亚节点则解锁 Gemini。这证明了按用途切地区节点的重要性。
  - q: 测速批次里出现 0B 或 KB 级低速节点，为什么没有删掉？
    a: 根据 speedtest-manifest.json 与 README 规范，原始截图必须保持 100% 原貌不得裁剪或隐藏异常点。真实保留德国01 或美国02 等偶发异常节点，正是为了提醒读者实际使用中需避开特定异常编号节点。
  - q: 灵动云在测试中心里的文字实测记录是怎么来的？
    a: 来自《推广机场品牌清单》留存的 2026-07-20/21 珠海联通 9Gbps（60 测速 / 60 解锁）历史文字摘要，记录了其 OpenAI 各地区基本全解锁的亮点以及 HTTPS 延迟偏高、TikTok 多失败和新/台 YT 送中的缺点。
  - q: 我想自己测一测手里正在用的机场是不是真的解锁 Netflix 和不送中，推荐怎么测？
    a: 看 Netflix 请直接登录账号搜索一部非自制经典版权剧（如《Friends》或《Breaking Bad》）确认是否能搜出并起播；看 YouTube 是否送中请打开 google.com 拉到页底看地区定位是否显示 CN，或看 YouTube Premium 后台播放/离线缓存是否正常生效。
---

# 流媒体与 AI 服务测试记录中心：可溯源证据查询平台

**Answer-First 核心结论**：本测试中心汇总了数据库内 **33 家品牌 × 9 大核心平台（ChatGPT、Claude、Gemini、Netflix、Disney+、YouTube、HBO Max、TikTok、Spotify）共 297 条结构化可用性记录** 与 **22 份已归档原始测速与解锁图片档案**。

- **证据分级机制**：为杜绝“把品牌宣传当成实测打勾”，本系统用颜色徽章将 **实测有图 (`Available` / `Partial`)**、**厂商/供稿资料 (`Vendor Data`)** 与 **未独立测试 (`Not Tested`)** 严格拆分。
- **实时多维检索**：通过下方筛选面板即可按品牌、平台、类别或证据状态精准核对。

---

## 一、全站可用性记录与实测图片档案检索面板

<StreamingCheckCenter />

---

## 二、如何正确读懂不同测试批次的适用边界？（防误读指南）

### 1. `2026-08-19` 光速云多运营商（电信 / 移动 / 联通）5 张 MiaoKo 实测批次
这是全站目前粒度最细的流媒体与 AI 实测样本，分别涵盖：
- **长沙电信 2Gbps / 广西移动 2Gbps / 河北联通 2Gbps（62 节点，6 线程 Shadowsocks）**：同时记录速度与 Disney+、Netflix、YouTube、OpenAI、Gemini 解锁状态。真实反映出三网之间在部分香港专线上的 HTTPS 延迟波动（河北联通部分节点偏高），以及香港节点 OpenAI 仅限 App、日/美节点可开 OpenAI 但部分失败于 Gemini、新加坡/马来西亚解锁 Gemini 等细节。
- **珠海联通 9Gbps 单线程（70 节点，VLESS + AnyTLS）**：专门检测基础流媒体（含 Bilibili 港澳台、TikTok、DAZN、Abema、巴哈姆特动画疯及 Steam 货币区），真实记录了新加坡与台湾节点在当时出现 YouTube `送中(CN)` 的现象。
- 查看全部 5 张原图与逐项解读：[光速云深度评测详报 →](/brands/guangsu/)

### 2. `2026-08-11` 16+1 品牌测速资料包（`1122×1402` PNG 原图）
- **能证明什么**：证明在截图显示的特定时刻（从凌晨 `00:21` 到晚 `22:46` 不等）和特定后端（`MAI-TEST-BOT 2.0.0-dev` 5Gbps 或 `喵速 4.7.0` 9Gbps）下，节点曾真实测出过对应的 RTT、HTTPS 延迟、平均/最高吞吐与 UDP NAT 类型。
- **不能证明什么**：**不能证明**任何流媒体或 AI 工具解锁状态、**不能证明**物理传输一定用了 IEPL/IPLC 专线、也**不能**用来对不同时刻、不同工具测试的品牌做绝对速度排行榜。其中可信云底部的完整日历日期未清晰显示（按同批暂记并标为待复核），微风网络压缩包附带图未列入原始 manifest。

### 3. `2026-07-20/21` 灵动云历史文字实测摘要
- 记录了珠海联通 9Gbps 环境下 60 测速 / 60 解锁的摘要，明确指出 OpenAI 各地区解锁表现较好，同时坦诚披露了 HTTPS 延迟偏高、TikTok 多失败、新加坡/台湾 YT 送中以及台湾落地被 NF/D+ 识别为 ES（欧洲区）的实测现象。详情见 [灵动云档案 →](/brands/lingdong/)。

---

## 三、相关排查与品牌决策衔接入口

- 查到支持状况后，如何正确配合客户端配置避免自己配置错误导致报错？前往 [AI 与流媒体使用专题 →](/ai/) ｜ [TUN 与 DNS 防泄漏指南 →](/guides/tun-and-dns/)
- 并排对比具体候选品牌参数与优惠：前往 [品牌多维对比中心 →](/compare/) ｜ [机场品牌数据库 →](/brands/)
- 查看本站完整数据状态定义：[编辑与实测数据标准 →](/editorial-standards/)

## 四、测试记录中心常见问题 (FAQ)

<FaqBlock :items="$frontmatter.faqs" />
