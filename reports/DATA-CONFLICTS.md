# 数据冲突与待核实审计报告 (DATA-CONFLICTS)

生成时间：2026-11-27T08:39:03.130Z
总计发现数据冲突/需核实项：15 项

| 品牌 | Slug | 冲突字段 | 来源 A | 来源 B | 处理原则 |
|---|---|---|---|---|---|
| 光速云 | `guangsu` | pricingPlans (轻量版月流量) | 主推光速云品牌信息.txt 第8行：年付折合约 8元/月，59GB | 主推光速云品牌信息.txt 第26行 & 推广机场品牌清单.txt 第23行：轻量版 ¥99/年，69GB/月 | 正文双版本并列标注，以确认官网实时页面为准，不擅自删改任一来源。 |
| 光速云 | `guangsu` | pricingPlans 档位数量 | 推广机场品牌清单.txt 表格含 7 档（含流光版 ¥34/268GB、量子版 ¥68/568GB、无界版 ¥138/900GB） | 主推光速云品牌信息.txt 详表仅展开 4 档（147永久、轻量、极速、定制） | 合并展示全部 7 档，并标注部分档位来自《推广机场品牌清单》原文。 |
| 暮光加速 | `muguang` | couponCode | 推广机场品牌清单.txt 第52行及汇总表：优惠码 muguang5555 | 推广机场品牌清单.txt 第84行介绍说明：“目前没有查到公开的优惠码信息” | 展示优惠码 muguang5555 并标注介绍原文存在无公开优惠码的冲突描述，待下单前核实。 |
| 暮光加速 | `muguang` | 入门价格描述 | 介绍说明称“9 元/月起”（年付 ¥109/年折算约 ¥9.08/月） | 基础数据称“20元/月 120GB/月”（普通月付起步价） | 明确区分年付折算月均价（约 ¥9.08/月）与普通月付最低价（¥20/月）。 |
| 微风网络 | `weifeng` | 测速截图清单遗漏 | 压缩包内存在 微风-节点测速实测.png | speedtest-manifest.json 仅收录 16 家，未包含微风网络 | 作为补充实测证据展示，并标注尚未经过 manifest 统一时间校验。 |
| 小明Cloud | `xiaoming` | 2026-10-19 测速数据 | 小明Cloud 段落 2026-10-19 测速表（HK 22ms/529Mbps, TW 41ms/114Mbps, SG 46ms/387Mbps, JP 57ms/135Mbps, US 143ms/18Mbps） | 光速云 段落 2026-10-19 测速表完全一字不差 | 标记为疑似文档模板误贴冲突数据，不可作为小明Cloud 独立测速依据。 |
| Firefly | `firefly` | 品牌别名与双重推广链接 | 正文章节 #8 Firefly：https://vip02.fireflyaff.com/#/?code=2n7VURre | 文末补充章节 Firefly 萤火虫：https://vip02.fireflyaff.com/#/?code=jTp9wSgZ | 合并为同一品牌实体（Firefly / Firefly 萤火虫），主链接保留 #8 段落的 2n7VURre，同时记录历史补充链接 jTp9wSgZ。 |
| 灵猫网络 | `lingmao` | couponCode & 协议 | 基础数据与汇总表：优惠码 lmao888；基础信息：优惠码 lingmao（8折，年付小包不适用） | 协议原文未标注，但 2026-08-11 截图显示 Shadowsocks | 同时列出 lmao888 与 lingmao 两个优惠码供测试，并注明协议尚未统一核实。 |
| 一翻云 | `yifan` | couponCode | 基础数据与汇总表：yfy6666 | 介绍说明：1FLYYUN（9折） | 双优惠码均保留并标注来源差异。 |
| SOGO 云 | `sogo` | couponCode | 基础信息与介绍说明：SOGO10000（9折） | 汇总表：sss777 | 双优惠码均保留并标注来源冲突。 |
| 可信云 | `kexin` | 测速截图日期置信度 | speedtest-manifest.json: 可信云截图底部仅显示 15:32:35 CST，完整日期未清晰显示 | 按同批次压缩包暂记为 2026-08-11 | 页面明确标注 dateConfidence: date-inferred-from-batch-time-visible-in-image。 |
| 全球云 | `quanqiu` | couponCode | 基础信息：qq88（8折） | 汇总表：qqy7777 | 双优惠码均保留并标注来源冲突。 |
| 云界线 | `yunjiexian` | affiliateUrl 格式与 code 冲突 | 第23节正文：https://qwerty.yunjiexianaff.com/?code=aycnwNUi（缺少 #/） | 汇总表：https://qwerty.yunjiexianaff.com/?code=HBaZ91c6（缺少 #/） | 记录推广链接 code 冲突及 URL 缺少 #/ 路由标识的风险，提示跳转前确认页面正常打开。 |
| 环球梯 | `huanqiuti` | affiliateUrl 格式异常 | https://qwerty.huanqiutiaff.com/?code=9I4KRNPH（与其他品牌 #/?code= 格式不同，缺少 #） | 常规 V2Board 面板通常使用 /#/?code= | 保留原始链接并提醒访问异常处理。 |
| 隐形人 | `yinxingren` | couponCode | 基础数据与汇总表：yxr888 | 基础信息与介绍说明：moon80（8折） | 双优惠码均保留并标注来源冲突。 |