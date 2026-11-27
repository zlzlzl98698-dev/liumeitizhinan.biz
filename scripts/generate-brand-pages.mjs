import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const { brands } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/brands.json'), 'utf-8'));

// Per-brand distinct editorial focus angles (beyond template substitution)
const customAngles = {
  muguang: {
    angle: '跨平台多设备协作与 BGP 智能调度路线分析',
    extraNote: '需特别留意资料内的两处冲突：基础数据列出优惠码 muguang5555，但介绍文字又称“暂无公开优惠码”；同时“9 元/月起”指年付轻量版 ¥109/年折算均值，普通月付门槛为 ¥20/月。'
  },
  feimao: {
    angle: '零配置专属客户端模式分析（不支持 Clash/Shadowrocket）',
    extraNote: '飞猫云的核心定位在于“省事”——官方 App 账号登录即用，免去第三方订阅配置；但也正因不提供订阅链接，无法接入 Clash Verge Rev、Shadowrocket 或 OpenWrt 软路由，适合纯手机/电脑轻度新手。'
  },
  weifeng: {
    angle: '入门级 IEPL + VLESS 性价比与夜间 AI 客服机制分析',
    extraNote: '微风网络提供从 ¥137/年清风版到 ¥127/月御风版及两档不限时包，并留有压缩包内附加测速图（注：该 PNG 未在 speedtest-manifest.json 清单中列出，已标注待复核）。'
  },
  dalaoyun: {
    angle: '¥5.6/月极限低价档同质化方案与数据缺口核查',
    extraNote: '大佬云在原始资料中与闪电鼠、云界线、榴莲云、环球梯规格几乎一致（IEPL + VLESS + 年付约 ¥5.6/月 60GB），缺乏独有差异化信息与 2026-08 测速截图，购买前务必向客服核对实时节点列表与月付选项。'
  },
  xingdaomeng: {
    angle: '2020 年运营 IEPL + Trojan 多区域覆盖与不限时组合评估',
    extraNote: '星岛梦拥有 2026-08-11 01:48:13 CST 测速截图，协议兼有 Trojan 资料描述与截图 Shadowsocks 显示；提供 ¥96/年到 ¥600/1TB 永久包等 9 档配置，亚太及韩东南亚覆盖较广。'
  },
  xiaoming: {
    angle: '¥5/600G 极低单价三网精品宣传与测速数据冲突预警',
    extraNote: '小明Cloud 标称采用 Gomami/DMIT/NEBURST 三网精品线路且月付 ¥5 起提供 600GB 大流量，但在原始资料中其 2026-10-19 测速表与光速云一字不差（存在模板误贴冲突），且暂无 2026-08 实测截图，强烈建议仅用 ¥5 单月小额试错。'
  },
  ermao: {
    angle: '聚焦港/日/美三地（缺新加坡）与独家定制端策略分析',
    extraNote: '二猫云起步月付 ¥20/130GB（另有 ¥89/年小包与 ¥99/100G 不限时），主打不限设备与长期定位；需注意资料明确提到其节点覆盖比同类少新加坡，若日常依赖新加坡节点使用 Gemini/Disney+ 需提前确认。'
  },
  wuyou: {
    angle: '跨境电商 TikTok 场景与 2026-10 专属客户端转型说明',
    extraNote: '无忧链接年付 MINI 版低至 ¥79/年（40GB/月），资料重点面向轻度用户及 TikTok 跨区场景；2026-10 起转为官方专属客户端登录使用，40GB 月流量不适合重度 4K 追剧。'
  },
  weitu: {
    angle: 'IPLC 专线 + 1x 流量不限速与三档永久包对比',
    extraNote: '唯兔云保留 2026-08-11 13:55:08 CST 测速截图，协议资料标注 Trojan（截图显示 Shadowsocks），提供从 ¥79.9/年限量版、¥14.9 限时月付到三档永久不限时包，兼顾娱乐与办公场景。'
  },
  firefly: {
    angle: 'Firefly / Firefly 萤火虫实体合并与免翻墙专属端分析',
    extraNote: '本站已将《推广机场品牌清单》中的 #8 Firefly 与文末 Firefly 萤火虫合并为统一实体，保留两条关联推广 code（2n7VURre 与 jTp9wSgZ）及与微风/飞鸟等品牌的同系关联记录。使用专属客户端不提供订阅链接，暂无 2026-08 测速截图。'
  },
  yuzhou: {
    angle: '早期资料缺失档案：仅有 2026-08-11 VLESS 测速图但缺当期套餐',
    extraNote: '宇宙云虽拥有 2026-08-11 21:04:24 CST 的 VLESS 协议 9Gbps 喵速实测截图，但文本资料仅有较早期的 ¥96/年历史起价，缺乏完整当期套餐表、客户端及地区覆盖明细，暂不建议直接按历史信息下单。'
  },
  u1s1: {
    angle: '2025 新晋 IPLC 机场与高带宽宣传理性验证',
    extraNote: 'U1S1 保留 2026-08-11 22:33:29 CST 晚间测速截图；官方宣传 2000Mbps 带宽与晚高峰不限速，但由于 2025 年刚起运营，长期稳定性与售后持续性仍需更长周期检验，建议优先月付测试。'
  },
  lingmao: {
    angle: '中转优化不限设备与双优惠码（lmao888 vs lingmao）冲突说明',
    extraNote: '灵猫网络保留 2026-08-11 18:45:40 CST 测速截图，2026-10 起采用专属客户端登录使用（不提供订阅链接），主打不限设备；优惠码存在 lmao888 与 lingmao（8折且年付小包不适用）两处记录冲突。'
  },
  jilian: {
    angle: '18 元档 IEPL + 100GB 与 AI 场景适配对比',
    extraNote: '极连云保留 2026-08-11 22:46:50 CST 晚间测速截图，资料强调支持自研+第三方客户端及常见 AI 使用场景；与同为 18 元档的光年梯相比少 10GB 月流量（100GB vs 110GB），详细全档套餐表待官网补充。'
  },
  guangnian: {
    angle: '2025 新盘 18 元档 110GB IEPL + VLESS 评测',
    extraNote: '光年梯保留 2026-08-11 14:38:04 CST 测速截图，在 18 元档中给出 110GB 月流量并兼容自研+第三方订阅；作为 2025 年新兴品牌，建议配合月付持续观察晚高峰表现。'
  },
  yifan: {
    angle: '全节点 IEPL + 原生住宅 IP 定位与三协议宽容度分析',
    extraNote: '一翻云同时支持 Hysteria 2、VLESS-Reality 与 Shadowsocks 三协议及永久不限时流量包，保留 2026-08-11 00:21:30 CST 测速图；缺点是官方不提供免费试用，且优惠码存在 yfy6666 与 1FLYYUN 冲突。'
  },
  sogo: {
    angle: '15 国广覆盖节点（全库最广）但强绑自研端取舍分析',
    extraNote: 'SOGO 云保留 2026-08-11 18:57:59 CST 测速截图，节点覆盖多达 15 个国家和地区，但不提供 Clash/Shadowrocket 订阅链接，仅限自研客户端使用；优惠码存在 SOGO10000 与 sss777 冲突。'
  },
  kexin: {
    angle: '25 元档高透明度典型：明确标注缺乏统一流媒体/AI 实测',
    extraNote: '可信云在品牌资料中难得地主动写明“AI 与流媒体缺乏统一实测数据”，并支持第三方客户端；另需注意其 2026-08-11 测速截图底部完整日历日期未清晰显示（仅显示 15:32:35 CST），已按批次暂记并标为待复核。'
  },
  sujie: {
    angle: '25 元档唯一明确主打 ChatGPT / Claude / Gemini 场景分析',
    extraNote: '速界保留 2026-08-11 15:39:36 CST 测速图，品牌资料突出 AI 工具访问，同时也客观说明 AI 可用性受平台规则影响不作永久稳定承诺，并兼顾自研+第三方订阅。'
  },
  shanyue: {
    angle: '中高端纯 IPLC 专线与专属客户端限制权衡',
    extraNote: '闪跃主打纯 IPLC 晚高峰稳定体验（月付 ¥24/150GB 起，年付 ¥96），但不提供第三方订阅链接且暂无 2026-08 测速截图；优惠码 shanyue 8 折仅适用常规月付档而不适用年付版。'
  },
  quanqiu: {
    angle: '60+ 节点规模、Trojan/SS 双协议与专属端限制',
    extraNote: '全球云保留 2026-08-11 15:50:43 CST 测速图，提供从 ¥99/年轻量版、BGP 月付 ¥20 起及 ¥100–¥700 不限时包到 ¥680 独享定制，但不提供第三方订阅；优惠码存在 qq88 与 qqy7777 冲突。'
  },
  shandianshu: {
    angle: '¥5.6/月档 IEPL + VLESS 标准平价配置核查',
    extraNote: '闪电鼠在资料中主打年付约 ¥5.6/月 60GB，并支持季付及以上 7 折与自研+第三方订阅；目前缺乏完整多档套餐明细与 2026-08 实测截图，购买前建议先核对官网当前定价。'
  },
  yunjiexian: {
    angle: '¥5.6/月档方案及推广链接格式/Code 双重异常提醒',
    extraNote: '云界线与大佬云、闪电鼠同属 5.6 元 IEPL+VLESS 档，但需特别注意其推广链接不仅缺少常见的 #/ 路由符号，而且正文与汇总表的邀请码（aycnwNUi vs HBaZ91c6）存在不一致冲突。'
  },
  liulianyun: {
    angle: '¥5.6/月档中唯一未明确协议类型的品牌核查',
    extraNote: '榴莲云在同等 5.6 元年付规格中是唯一未在品牌资料中说明传输协议（VLESS 还是 Trojan/SS）的品牌，同时缺乏 2026-08 测速截图，对协议有明确要求的用户需先咨询客服。'
  },
  shenxing: {
    angle: '14 元/月 120GB 中间价位档差异化分析',
    extraNote: '神行加速定位于 5.6 元（60GB）与 20 元（120–150GB）之间的 14 元折算档，提供 120GB 月流量及新用户 7 折券 xs0077，同样缺乏 2026-08 实测截图，需待实测补充。'
  },
  huanqiuti: {
    angle: '¥5.6/月档方案及无 #/ 路由链接格式注意项',
    extraNote: '环球梯规格与大佬云、闪电鼠相同（IEPL + VLESS + 60GB 年付参考），其推广链接缺少 #/ 格式标识，访问注册页前建议确认跳转正常。'
  },
  yinxingren: {
    angle: '偏高定价（¥24 起）企业 IPLC 与强制专属端权衡',
    extraNote: '隐形人主打企业级 IPLC 专线与 60+ 节点，但定价偏高（月付 ¥24/144GB 起，年付 ¥109/80GB），且不提供第三方订阅、无免费试用、暂无 2026-08 测速图；优惠码存在 yxr888 与 moon80 两套来源记录。'
  },
  tiziyun: {
    angle: '60+ 节点 + “小白一键登录”与“通用订阅”双支持优势',
    extraNote: '梯子云在同价位中突出“自研全平台客户端零门槛 + 通用订阅双保留”，兼顾新手和第三方 Clash 用户，资料标注 2Gbps+ 独立带宽与 500Mbps 高峰冗余；目前缺乏详细各档套餐表与 2026-08 实测图。'
  },
  lingdong: {
    angle: '2026-07-20/21 珠海联通 9Gbps 文字实测（OpenAI 全解锁 vs YT 送中）解析',
    extraNote: '灵动云拥有 29 条全周期展开的历史价格表及 2026-07-20/21 珠海联通 9Gbps 文字实测摘要：速度 20–80MB/s、OpenAI 各地区全解锁是其亮点，但也明确暴露了 HTTPS 延迟偏高、TikTok 多失败及新/台 YouTube 送中问题，且暂无公开优惠码核实记录。'
  },
  langwang: {
    angle: '完整周期阶梯表（含入门流量遮挡待核实）档案分析',
    extraNote: '浪网拥有 29 条多付费周期价格记录（从入门 ¥30/月到商业 ¥200/月及流量包/定制线），但原截图部分入门流量与设备限制、协议、地区、解锁及测速全部缺失，属于典型的“价格清晰但技术参数待核实”历史档案。'
  },
  edgenova: {
    angle: '多线路自动分配（高速直连 / IPLC）与限时月付档案分析',
    extraNote: '边缘节点 EdgeNova 保留了限时月付 ¥15/72G、限时年付 ¥108/45G 到极界系列 18 条历史价格档（含 TH888 8折码），但缺少独立节点测速与逐项 AI/流媒体实测结果，不可直接推断解锁表现。'
  },
  kuaili: {
    angle: '纯实测截图档案（含 2026-08-11 9Gbps VLESS 图但缺套餐与注册入口）',
    extraNote: '快狸在本站目前仅保有 2026-08-11 19:52:22 CST 的 VLESS 9Gbps 喵速实测截图与品牌主图，尚无官方套餐、价格、优惠码与可公开确认的注册链接，因此遵循“不造假链接”原则做纯技术档案呈现。'
  }
};

const reviewedSet = new Set([
  'guangsu', 'feimao', 'xingdaomeng', 'ermao', 'muguang', 'weifeng', 'xiaoming', 'yinxingren',
  'weitu', 'yifan', 'sogo', 'quanqiu'
]);

for (const b of brands) {
  if (b.slug === 'guangsu') continue;
  const dir = path.join(ROOT, 'docs/brands', b.slug);
  fs.mkdirSync(dir, { recursive: true });

  const info = customAngles[b.slug] || { angle: '品牌公开资料与实测状态分析', extraNote: '' };
  const hasPlans = b.pricingPlans && b.pricingPlans.length > 0;
  const hasSpeedImg = Boolean(b.speedtest20260811);
  const hasCoupon = b.couponCodes && b.couponCodes.length > 0;
  const hasReview = reviewedSet.has(b.slug);

  const faqs = [
    {
      q: `${b.brandName} 是否支持导入 Clash Verge Rev 或 Shadowrocket？`,
      a: b.thirdPartyClientSupport === false
        ? `根据现有资料，${b.brandName} 仅通过官方专属客户端登录使用，不提供 Clash 或 Shadowrocket 第三方订阅链接。`
        : (b.thirdPartyClientSupport === true
          ? `资料显示 ${b.brandName} 支持第三方客户端订阅导入，可配合 Clash Verge Rev、Shadowrocket、v2rayN 等工具使用。`
          : `现有资料尚未明确说明 ${b.brandName} 的订阅导出规则，建议注册下单前向官方客服确认是否支持第三方订阅。`)
    },
    {
      q: `${b.brandName} 目前有哪些实测证据与数据缺口？`,
      a: hasSpeedImg
        ? `${b.brandName} 在本站留存有 2026-08-11 单次节点测速截图（${b.speedtest20260811.protocolDisplayed} 协议），但该图不证明长期稳定性，且暂缺独立的逐节点 AI/流媒体解锁实测截图。`
        : `${b.brandName} 目前在本站暂未留存 2026-08-11 节点测速截图或独立流媒体解锁实测图，当前档案主要依据公开文字资料与历史价格表整理，建议先以最小月付测试。`
    }
  ];

  const md = `---
title: ${b.brandName} 套餐价格、优惠码与官方档案（2026）
description: ${b.brandName}（${b.brandAliases?.join('/') || b.slug}）— ${info.angle}。整理套餐价格、优惠码条件、协议线路、客户端兼容性、流媒体/AI 资料状态与核实清单。
date: 2026-11-27
updatedAt: 2026-11-27
schemaType: Article
dataSource: ${b.dataSources.join('、')}
faqs:
  - q: ${faqs[0].q}
    a: ${faqs[0].a}
  - q: ${faqs[1].q}
    a: ${faqs[1].a}
---

# ${b.brandName} 套餐价格、优惠码与商业档案

**核心结论**：${info.angle}。${b.introSummary || `${b.brandName} 已纳入本站 33 家机场品牌数据库，以下内容严格区分“历史资料宣称”与“本站留存实测截图”，不以推测填补未知参数。`}${hasReview ? ` 有关更深入的优缺点权衡、实测边界与同价位竞品比较，请直接阅读 [**${b.brandName} 独立深度评测 →**](/reviews/${b.slug}/)。` : ''}

${info.extraNote ? `> **特别审校提示**：${info.extraNote}` : ''}

<BrandProfile slug="${b.slug}" />

## 1. ${b.brandName} 基础资料与核实完整度

- **运营时间（资料标注）**：${b.foundedYear ? `${b.foundedYear} 年` : '原始资料未明确标注'}
- **线路与传输声明**：${b.networkTypes?.length ? b.networkTypes.join('、') : '待核实（无独立确认来源）'}
- **协议信息**：${b.protocols?.length ? b.protocols.join(' / ') : '原始资料未统一标注'}
- **客户端兼容性**：${b.clientSupportNote}
- **优惠码信息**：${hasCoupon ? `\`${b.couponCodes.join('` / `')}\`（实际适用档位与折扣以官网结账页为准）` : '暂无已核实公开优惠码'}

## 2. ${b.brandName} 套餐定价与首单试错策略

${hasPlans
  ? `本页上方套餐表共结构化收录了 ${b.brandName} 的 **${b.pricingPlans.length} 项价格参考条目**。在决策时请务必区分「每月重置流量」与「一次性不过期流量包」——后者虽然不过期但折算单 GB 价格通常高于月付主力包；同时多数品牌特价年付小包不参与常规 8 折优惠码折扣。`
  : `${b.brandName} 当前尚未收录完整官方多档套餐价格表，资料缺口已明确标为待核实，不可直接拿历史起价当作全站现行报价。`}

## 3. ${b.brandName} 客户端适配与流媒体 / AI 支持边界

1. **客户端选择**：${b.thirdPartyClientSupport === false
  ? `由于 ${b.brandName} 资料说明仅使用官方专属端，如果您有 OpenWrt 软路由、Apple TV 或必须用 Clash 自定义分流的需求，请改选支持通用订阅的品牌（如[光速云](/brands/guangsu/)、[星岛梦](/brands/xingdaomeng/)或[梯子云](/brands/tiziyun/)）。`
  : `若使用第三方通用客户端，可参考[Windows 客户端](/clients/windows/)、[iOS Shadowrocket](/clients/shadowrocket/) 与 [TUN 模式防泄漏设置](/guides/tun-and-dns/)完成分流配置。`}
2. **流媒体与 AI 访问验证**：当前资料中的流媒体与 AI 支持状态${b.slug === 'lingdong' ? '结合了 2026-07-20/21 文字实测摘要（含 YT 送中与 TikTok 失败提示）' : '主要来自历史供稿/品牌说明，缺乏独立的 2026-08 多运营商解锁截图'}。使用 ChatGPT、Claude 或 Gemini 时请遵守固定单节点与关闭 IPv6 原则（见 [AI 网络环境详解](/ai/ai-network-environment/)）。

## 4. ${b.brandName} 数据缺口与购前客服核实清单

在决定购买长周期套餐前，建议先确认以下未核实项：
- 当前官网最新有效注册域名、面板状态及月付试用条件；
- 特定地区节点（尤其是新加坡/台湾是否 YouTube 送中、香港是否支持 OpenAI/Disney+）；
- 退款限制、设备并发 IP 规则及高倍率节点标注情况；
- ${hasSpeedImg ? '对比自身本地电信/联通/移动宽带在晚高峰 20:00–23:00 的实际表现（不要仅看白天快照）。' : '由于暂无本站留存测速截图，务必先用最小月付包实测晚高峰速度与延迟。'}

## 5. ${b.brandName} 延伸对比与常见问题

- [在品牌对比中心将 ${b.brandName} 与光速云等品牌并排比较 →](/compare/)
- [查看全部 33 家机场品牌数据库 →](/brands/)
- [查看测试记录中心 →](/tools/streaming-check/)

<FaqBlock :items="$frontmatter.faqs" />
`;

  fs.writeFileSync(path.join(dir, 'index.md'), md, 'utf-8');
}

console.log(`Generated ${brands.length - 1} brand profile pages under docs/brands/ (plus flagship guangsu).`);
