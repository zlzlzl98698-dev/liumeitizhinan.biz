import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_KW_DIR = path.join(ROOT, 'data/keywords');
fs.mkdirSync(OUT_KW_DIR, { recursive: true });

const brandsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/brands.json'), 'utf-8'));

// Complete Level-3 + Review + Comparison Keyword & Cluster Task Registry
// Every entry clearly marks contentStatus:
//   upgraded      -> existing Level-3 page upgraded to full 2,500–5,000+ Han char standard in this release
//   new_published -> newly created Level-3 / Review / Comparison page built in this release
//   published     -> existing published Level-3 / brand / client page preserved intact
//   backlog_planned -> planned candidate in backlog (NO empty file created, NOT in sitemap)

const tasks = [
  // ================= 01. recommend =================
  {
    id: 'REC-L3-01',
    keyword: '机场推荐应该看哪些核心指标',
    primaryKeyword: '机场推荐核心指标',
    secondaryKeywords: ['IEPL 专线机场怎么判断', '机场节点倍率与晚高峰测试', '如何选稳定机场'],
    longTailQuestions: ['机场节点数量越多越好吗？', '如何判断机场晚高峰是否稳定？', '自研客户端和第三方订阅怎么选？'],
    searchIntent: 'Commercial Investigation',
    audience: '准备购买主力或备用机场的个人用户',
    contentType: '选择判断指南',
    parentTopic: '/recommend/',
    parentCluster: '/recommend/stable/',
    targetUrl: '/recommend/how-to-choose/',
    articleTitle: '买前必看：机场推荐应该看哪些核心指标？（IEPL、倍率与晚高峰实测判断）',
    relatedArticles: ['/recommend/multi-device-guide/', '/pricing/ten-yuan-plans/', '/network/three-isp-routing/', '/risk/avoid-pitfalls/'],
    relatedBrands: ['guangsu', 'xingdaomeng', 'feimao'],
    conversionIntent: 'high',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json、data/test-records.json、2026-08-19 实测图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REC-L3-02',
    keyword: '多设备用户如何选择机场',
    primaryKeyword: '多设备机场推荐与并发规则',
    secondaryKeywords: ['不限设备机场怎么选', '家庭共享软路由机场', '同账号多设备同时在线风控'],
    longTailQuestions: ['不限设备数量和限制 IP 数有什么区别？', 'OpenWrt 软路由算一台设备吗？', '多设备共用订阅会触发封号吗？'],
    searchIntent: 'Commercial Investigation',
    audience: '同时使用电脑、手机、平板及家庭软路由的多端用户',
    contentType: '选择判断指南',
    parentTopic: '/recommend/',
    parentCluster: '/recommend/beginners/',
    targetUrl: '/recommend/multi-device-guide/',
    articleTitle: '多设备与家庭用户怎么选机场？并发数、IP 限制与软路由共用意风险详解',
    relatedArticles: ['/recommend/how-to-choose/', '/guides/multi-device-router/', '/pricing/traffic-and-multiplier/', '/brands/xingdaomeng/'],
    relatedBrands: ['guangsu', 'xingdaomeng', 'ermao', 'muguang'],
    conversionIntent: 'high',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json 中各品牌不限设备/并发说明',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REC-L3-03',
    keyword: '自研客户端机场适合新手吗',
    primaryKeyword: '自研客户端 vs 第三方客户端机场选择',
    secondaryKeywords: ['专属客户端机场优缺点', '不用配置 Clash 的机场'],
    longTailQuestions: ['飞猫云这类只给专属端不给订阅的品牌有什么弊端？', '新手买自研客户端机场后期能改用软路由吗？'],
    searchIntent: 'Comparison',
    audience: '首次购买网络服务的零基础新手',
    contentType: '方案比较',
    parentTopic: '/recommend/',
    parentCluster: '/recommend/beginners/',
    targetUrl: '/compare/guangsu-vs-feimao/',
    articleTitle: '光速云 vs 飞猫云深度对比：自研通用双栖 vs 纯专属端新手怎么选？',
    relatedArticles: ['/reviews/guangsu/', '/reviews/feimao/', '/guides/subscription-setup/'],
    relatedBrands: ['guangsu', 'feimao'],
    conversionIntent: 'high',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REC-BL-04',
    keyword: '新手第一次购买机场应该选月付还是年付',
    primaryKeyword: '新手机场月付还是年付',
    secondaryKeywords: ['年付机场风险', '月付试用策略'],
    longTailQuestions: ['为什么不建议新手直接买便宜年付？'],
    searchIntent: 'Commercial Investigation',
    audience: '第一次尝试机场的预算敏感用户',
    contentType: '选择判断',
    parentTopic: '/recommend/',
    parentCluster: '/recommend/beginners/',
    targetUrl: '/recommend/monthly-vs-annual-first-buy/',
    articleTitle: '新手第一次买机场选月付还是年付？用真实退改政策与跑路样本算清试错账',
    relatedArticles: ['/pricing/billing-cycles/', '/risk/free-nodes-and-annual/'],
    relatedBrands: ['guangsu', 'feimao'],
    conversionIntent: 'high',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: 'data/pricing.json',
    lastReviewedAt: '2026-11-27'
  },

  // ================= 02. pricing =================
  {
    id: 'PRI-L3-01',
    keyword: '10元到20元月付机场怎么选',
    primaryKeyword: '10元到20元月付机场选择',
    secondaryKeywords: ['20元以内月付机场', '低价月付机场对比', '便宜月付不踩坑'],
    longTailQuestions: ['10 元左右能买到真正月付的 IEPL 专线吗？', '标价 8 元/月为什么结算要付 99 元？', '20 元以内月付多少 GB 算合理？'],
    searchIntent: 'Commercial Investigation',
    audience: '每月预算 10–20 元寻找真正可月付方案的用户',
    contentType: '价格对比',
    parentTopic: '/pricing/',
    parentCluster: '/pricing/budget/',
    targetUrl: '/pricing/ten-yuan-plans/',
    articleTitle: '10 元到 20 元月付机场怎么选？揭开年付折算陷阱与真实月付套餐对比',
    relatedArticles: ['/pricing/traffic-and-multiplier/', '/recommend/how-to-choose/', '/reviews/xiaoming/', '/reviews/ermao/'],
    relatedBrands: ['guangsu', 'ermao', 'wuyou', 'xiaoming', 'weitu'],
    conversionIntent: 'high',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'data/pricing.json 210 档结构化价格表',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'PRI-L3-02',
    keyword: '100GB 300GB 500GB 机场流量够用多久',
    primaryKeyword: '机场流量额度与倍率计算公式',
    secondaryKeywords: ['机场节点倍率是什么意思', '看 4K YouTube 一小时多少流量', 'Netflix 4K 流量消耗'],
    longTailQuestions: ['100GB 每天看 1080p 或 4K 能看几天？', '2× 和 5× 倍率节点怎么扣除套餐流量？', 'ChatGPT 文本对话和图片生成耗流量吗？'],
    searchIntent: 'Informational',
    audience: '不确定该买 60GB、168GB 还是 500GB 套餐的用户',
    contentType: '价格与计算指南',
    parentTopic: '/pricing/',
    parentCluster: '/pricing/rules/',
    targetUrl: '/pricing/traffic-and-multiplier/',
    articleTitle: '100GB、300GB 与 500GB 机场流量够用多久？倍率扣费公式与 4K 实测消耗核算',
    relatedArticles: ['/pricing/ten-yuan-plans/', '/ai/netflix-4k-guide/', '/guides/streaming-optimization/'],
    relatedBrands: ['guangsu', 'xingdaomeng', 'weifeng'],
    conversionIntent: 'medium',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'data/pricing.json、data/streaming-services.json',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'PRI-BL-03',
    keyword: '一元机场和一分机场限制有哪些',
    primaryKeyword: '一元机场限制与风控分析',
    secondaryKeywords: ['低价跑路机场特征', '共享池 IP 封锁'],
    longTailQuestions: ['为什么 1 元月付机场看 Netflix 和用 ChatGPT 经常失败？'],
    searchIntent: 'Informational',
    audience: '被超低价引流但反复断流或无法用 AI 的用户',
    contentType: '价格分析',
    parentTopic: '/pricing/',
    parentCluster: '/pricing/budget/',
    targetUrl: '/pricing/one-yuan-airport-limits/',
    articleTitle: '一元机场与低价超售盘有哪些常见限制？从带宽配额到 IP 脏污的真实成本账',
    relatedArticles: ['/pricing/ten-yuan-plans/', '/risk/free-nodes-and-annual/'],
    relatedBrands: ['xiaoming', 'dalaoyun'],
    conversionIntent: 'medium',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '行业公开成本结构与风险核查条目',
    lastReviewedAt: '2026-11-27'
  },

  // ================= 03. brands / reviews / compare =================
  {
    id: 'REV-GUANGSU',
    keyword: '光速云怎么样 靠谱吗 2026评测',
    primaryKeyword: '光速云深度评测',
    secondaryKeywords: ['光速云三网测速', '光速云 ChatGPT Gemini 解锁实测', '光速云优缺点分析'],
    longTailQuestions: ['光速云香港节点为什么不能用网页版 ChatGPT？', '光速云轻量版 59GB 和 69GB 冲突是怎么回事？', '光速云和星岛梦、飞猫云怎么选？'],
    searchIntent: 'Commercial Investigation',
    audience: '在决策是否下单光速云、希望核实实测优缺点的用户',
    contentType: '品牌万字级深度评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/guangsu/',
    articleTitle: '光速云深度评测（2026 万字版）：三网 MiaoKo 实测原图拆解、优缺点与同价位比较',
    relatedArticles: ['/brands/guangsu/', '/compare/guangsu-vs-feimao/', '/compare/guangsu-vs-xingdaomeng/', '/compare/guangsu-vs-ermao/'],
    relatedBrands: ['guangsu', 'feimao', 'xingdaomeng', 'ermao'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '主推光速云品牌信息.txt、推广机场品牌清单.txt、2026-08-11 截图、2026-08-19 5张 MiaoKo 原图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-FEIMAO',
    keyword: '飞猫云怎么样 飞猫云评测',
    primaryKeyword: '飞猫云深度评测',
    secondaryKeywords: ['飞猫云不支持 Clash', '飞猫云学生版 84元年付', '飞猫云专属客户端'],
    longTailQuestions: ['飞猫云可以用 Clash Verge 或小火箭吗？', '飞猫云 25 元月付和光速云怎么选？'],
    searchIntent: 'Commercial Investigation',
    audience: '希望确认飞猫云纯专属客户端限制与易用性的新手用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/feimao/',
    articleTitle: '飞猫云深度评测（2026）：纯专属客户端零配置模式、7 档套餐与适用人群边界',
    relatedArticles: ['/brands/feimao/', '/compare/guangsu-vs-feimao/', '/recommend/beginners/'],
    relatedBrands: ['feimao', 'guangsu', 'wuyou'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 测速截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-XINGDAOMENG',
    keyword: '星岛梦怎么样 星岛梦评测',
    primaryKeyword: '星岛梦深度评测',
    secondaryKeywords: ['星岛梦 IEPL Trojan', '星岛梦不限时套餐', '星岛梦 2020 年老牌'],
    longTailQuestions: ['星岛梦不限时 100G/300G/1TB 性价比高吗？', '星岛梦与光速云同价位选哪个？'],
    searchIntent: 'Commercial Investigation',
    audience: '关注老牌稳定性、亚太小语种节点及不限时包的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/xingdaomeng/',
    articleTitle: '星岛梦深度评测（2026）：2020 老牌 IEPL + Trojan 9 档梯度、不限时价值与测速核查',
    relatedArticles: ['/brands/xingdaomeng/', '/compare/guangsu-vs-xingdaomeng/', '/pricing/pay-as-you-go/'],
    relatedBrands: ['xingdaomeng', 'guangsu', 'weitu'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 凌晨测速截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-ERMAO',
    keyword: '二猫云怎么样 二猫云评测',
    primaryKeyword: '二猫云深度评测',
    secondaryKeywords: ['二猫云没有新加坡节点', '二猫云白猫套餐 20元', '二猫云定制客户端'],
    longTailQuestions: ['二猫云缺少新加坡节点对用 Gemini 和 Disney+ 有什么影响？', '二猫云白猫套餐 130GB 值得买吗？'],
    searchIntent: 'Commercial Investigation',
    audience: '关注不限设备数与 ¥20 月付长期定位的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/ermao/',
    articleTitle: '二猫云深度评测（2026）：聚焦港日美缺新加坡的取舍、独家端策略与 ¥20 起套餐解析',
    relatedArticles: ['/brands/ermao/', '/compare/guangsu-vs-ermao/', '/recommend/multi-device-guide/'],
    relatedBrands: ['ermao', 'guangsu', 'xingdaomeng'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 测速截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-MUGUANG',
    keyword: '暮光加速怎么样 暮光加速评测',
    primaryKeyword: '暮光加速深度评测',
    secondaryKeywords: ['暮光加速 BGP 调度', '暮光加速 9元起 vs 20元月付', '暮光加速优惠码冲突'],
    longTailQuestions: ['暮光加速宣传 9 元起为什么普通月付最低 20 元？', '暮光加速有没有 2026-08 实测截图？'],
    searchIntent: 'Commercial Investigation',
    audience: '研究团队/跨平台 BGP 机场但注重数据核实的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/muguang/',
    articleTitle: '暮光加速深度评测（2026）：BGP 多平台调度定位、9 元折算口径争议与数据缺口核查',
    relatedArticles: ['/brands/muguang/', '/pricing/billing-cycles/', '/corrections/'],
    relatedBrands: ['muguang', 'guangsu', 'weifeng'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt（含 2 处数据冲突记录）',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-WEIFENG',
    keyword: '微风网络怎么样 微风机场评测',
    primaryKeyword: '微风网络深度评测',
    secondaryKeywords: ['微风网络清风版 137元', '微风网络 IEPL 入门', '微风附加测速图核查'],
    longTailQuestions: ['微风网络 11 元档清风版适合看 4K 视频吗？', '微风网络测速图为什么没有列在 manifest 主清单中？'],
    searchIntent: 'Commercial Investigation',
    audience: '寻找 11 元左右入门 IEPL 专线及不限时副包的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/weifeng/',
    articleTitle: '微风网络深度评测（2026）：清风到御风 6 档结构、IEPL 入门成本与未入册测速图复核',
    relatedArticles: ['/brands/weifeng/', '/pricing/ten-yuan-plans/', '/pricing/pay-as-you-go/'],
    relatedBrands: ['weifeng', 'guangsu', 'firefly'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、压缩包内 微风-节点测速实测.png',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-XIAOMING',
    keyword: '小明Cloud怎么样 小明机场 5元600G',
    primaryKeyword: '小明Cloud 深度评测与风险核查',
    secondaryKeywords: ['小明Cloud 5元600G', '小明Cloud 三网精品线路', '小明Cloud 测速数据冲突'],
    longTailQuestions: ['小明Cloud 5 元 600G 是真的吗，有哪些风险？', '为什么小明Cloud 和光速云 10 月测速表完全相同？'],
    searchIntent: 'Commercial Investigation',
    audience: '被 5 元 600G 极低单价吸引、想核实真伪与风险的用户',
    contentType: '品牌风险型深度评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/xiaoming/',
    articleTitle: '小明Cloud 深度评测（2026）：¥5/600G 极低单价、三网精品声明与模板冲突预警',
    relatedArticles: ['/brands/xiaoming/', '/compare/xiaoming-vs-guangsu/', '/risk/avoid-pitfalls/'],
    relatedBrands: ['xiaoming', 'guangsu', 'dalaoyun'],
    conversionIntent: 'medium',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、DATA-CONFLICTS.md 测速表误贴记录',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-YINXINGREN',
    keyword: '隐形人机场怎么样 隐形人评测',
    primaryKeyword: '隐形人深度评测',
    secondaryKeywords: ['隐形人 IPLC 专属客户端', '隐形人 yxr888 vs moon80', '隐形人 24元白银纪元'],
    longTailQuestions: ['隐形人月付 24 元起步，值不值得放弃 Clash 第三方客户端？', '隐形人缺乏 2026-08 测速图购买前如何核实？'],
    searchIntent: 'Commercial Investigation',
    audience: '考虑企业 IPLC 专线但关注高价门槛与无第三方订阅限制的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/yinxingren/',
    articleTitle: '隐形人深度评测（2026）：¥24 起企业 IPLC 定价、纯专属端代价与实测空白评估',
    relatedArticles: ['/brands/yinxingren/', '/network/iepl-vs-iplc/', '/risk/account-and-refund/'],
    relatedBrands: ['yinxingren', 'shanyue', 'guangsu'],
    conversionIntent: 'medium',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt（含双优惠码冲突与 0 测速状态）',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'CMP-01',
    keyword: '光速云 vs 飞猫云',
    primaryKeyword: '光速云 vs 飞猫云对比',
    secondaryKeywords: ['光速云和飞猫云哪个好用', '自研客户端 vs Clash 通用订阅'],
    longTailQuestions: ['新手买飞猫云还是光速云？', '两家月付 25 元档流量和客户端差别在哪？'],
    searchIntent: 'Comparison',
    audience: '在光速云和飞猫云 25 元档/年付入门档之间犹豫的用户',
    contentType: '品牌对比',
    parentTopic: '/compare/',
    parentCluster: '/compare/',
    targetUrl: '/compare/guangsu-vs-feimao/',
    articleTitle: '光速云 vs 飞猫云深度对比（2026）：通用订阅兼容、实测证据与新手适用差异',
    relatedArticles: ['/reviews/guangsu/', '/reviews/feimao/', '/brands/guangsu/', '/brands/feimao/'],
    relatedBrands: ['guangsu', 'feimao'],
    conversionIntent: 'high',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json、data/test-records.json',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'CMP-02',
    keyword: '光速云 vs 星岛梦',
    primaryKeyword: '光速云 vs 星岛梦对比',
    secondaryKeywords: ['2020年老牌IEPL机场对比', 'VLESS vs Trojan 机场对比', '不限时套餐对比'],
    longTailQuestions: ['光速云 147 永久包和星岛梦 100/300/600 不限时怎么选？'],
    searchIntent: 'Comparison',
    audience: '在 2020 年两大主力 IEPL 品牌之间比价择优的中高阶用户',
    contentType: '品牌对比',
    parentTopic: '/compare/',
    parentCluster: '/compare/',
    targetUrl: '/compare/guangsu-vs-xingdaomeng/',
    articleTitle: '光速云 vs 星岛梦对比（2026）：2020 年两大 IEPL 老牌套餐、协议与不限时流量分析',
    relatedArticles: ['/reviews/guangsu/', '/reviews/xingdaomeng/', '/brands/guangsu/', '/brands/xingdaomeng/'],
    relatedBrands: ['guangsu', 'xingdaomeng'],
    conversionIntent: 'high',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json、2026-08-11 / 08-19 测速档案',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'CMP-03',
    keyword: '光速云 vs 二猫云',
    primaryKeyword: '光速云 vs 二猫云对比',
    secondaryKeywords: ['缺新加坡节点影响', '¥20白猫 vs ¥25极速版', '定制端 vs 通用端'],
    longTailQuestions: ['二猫云每月便宜 5 元但少新加坡节点，值得省这 5 元吗？'],
    searchIntent: 'Comparison',
    audience: '对比 20 元档二猫云与 25 元档光速云节点与流量的用户',
    contentType: '品牌对比',
    parentTopic: '/compare/',
    parentCluster: '/compare/',
    targetUrl: '/compare/guangsu-vs-ermao/',
    articleTitle: '光速云 vs 二猫云深度对比：新加坡节点完整性、不限设备与月付单 GB 成本核算',
    relatedArticles: ['/reviews/guangsu/', '/reviews/ermao/', '/brands/guangsu/', '/brands/ermao/'],
    relatedBrands: ['guangsu', 'ermao'],
    conversionIntent: 'high',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json、推广机场品牌清单.txt',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'CMP-04',
    keyword: '小明Cloud vs 光速云',
    primaryKeyword: '小明Cloud vs 光速云对比',
    secondaryKeywords: ['5元600G对比25元168G', '低价三网精品 vs IEPL 实测证据'],
    longTailQuestions: ['5 元 600G 的小明Cloud 能否替代 25 元 168G 的光速云做主力？'],
    searchIntent: 'Comparison',
    audience: '被超低价套餐与常规专线套餐巨大价差困惑的消费者',
    contentType: '品牌对比',
    parentTopic: '/compare/',
    parentCluster: '/compare/',
    targetUrl: '/compare/xiaoming-vs-guangsu/',
    articleTitle: '小明Cloud vs 光速云对比：极低单价（¥5/600G）与可验证证据链之间的风险权衡',
    relatedArticles: ['/reviews/xiaoming/', '/reviews/guangsu/', '/pricing/ten-yuan-plans/'],
    relatedBrands: ['xiaoming', 'guangsu'],
    conversionIntent: 'high',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json、DATA-CONFLICTS.md',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-WEITU',
    keyword: '唯兔云怎么样 唯兔云评测',
    primaryKeyword: '唯兔云深度评测',
    secondaryKeywords: ['唯兔云 14.9元限时', '唯兔云永久不限时', '唯兔云 IPLC Trojan'],
    longTailQuestions: ['唯兔云 100G/200G/500G 不限时包哪个最划算？'],
    searchIntent: 'Commercial Investigation',
    audience: '对比 15–20 元真月付及百元不限时包的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/weitu/',
    articleTitle: '唯兔云深度评测（2026）：IPLC + 10 档完整价格、¥14.9 限时月付与永久包核算',
    relatedArticles: ['/brands/weitu/', '/pricing/ten-yuan-plans/', '/pricing/pay-as-you-go/'],
    relatedBrands: ['weitu', 'xingdaomeng', 'ermao'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-YIFAN',
    keyword: '一翻云怎么样 一翻云评测',
    primaryKeyword: '一翻云深度评测',
    secondaryKeywords: ['一翻云 Hysteria 2 VLESS-Reality', '一翻云 20元 150G', '一翻云优惠码'],
    longTailQuestions: ['一翻云原生住宅 IP 和 0 丢包宣传能全信吗？'],
    searchIntent: 'Commercial Investigation',
    audience: '看重三协议自由度与 ¥20–¥35 高性价比月付的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/yifan/',
    articleTitle: '一翻云深度评测（2026）：三协议自由度（Hy2/Reality/SS）、原生住宅 IP 宣传与优惠码冲突',
    relatedArticles: ['/brands/yifan/', '/pricing/ten-yuan-plans/'],
    relatedBrands: ['yifan', 'guangsu'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 凌晨截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-SOGO',
    keyword: 'SOGO云怎么样 SOGO云评测',
    primaryKeyword: 'SOGO 云深度评测',
    secondaryKeywords: ['SOGO云 15国节点', 'SOGO云不支持 Clash', 'SOGO10000 优惠码'],
    longTailQuestions: ['SOGO 云写着支持软路由却不给订阅怎么回事？'],
    searchIntent: 'Commercial Investigation',
    audience: '需要多冷门国家节点的专属客户端用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/sogo/',
    articleTitle: 'SOGO 云深度评测（2026）：15 国节点广度优势与“纯专属端不支持 Clash”内部冲突剖析',
    relatedArticles: ['/brands/sogo/', '/compare/guangsu-vs-feimao/'],
    relatedBrands: ['sogo', 'quanqiu', 'guangsu'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 傍晚截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'REV-QUANQIU',
    keyword: '全球云怎么样 全球云评测',
    primaryKeyword: '全球云深度评测',
    secondaryKeywords: ['全球云 60+ 节点', '全球云 qq88 vs qqy7777', '全球云专属客户端'],
    longTailQuestions: ['全球云 BGP 月付 ¥20 值得替代通用订阅机场吗？'],
    searchIntent: 'Commercial Investigation',
    audience: '关注 60+ 节点与 ¥20 起专属端 BGP 入门的用户',
    contentType: '品牌独立评测',
    parentTopic: '/brands/',
    parentCluster: '/reviews/',
    targetUrl: '/reviews/quanqiu/',
    articleTitle: '全球云深度评测（2026）：60+ 节点 Trojan/SS 双协议、BGP+不限时体系与纯专属端限制',
    relatedArticles: ['/brands/quanqiu/', '/compare/tiziyun-vs-yinxingren/'],
    relatedBrands: ['quanqiu', 'sogo', 'tiziyun'],
    conversionIntent: 'transactional-ready',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: '推广机场品牌清单.txt、2026-08-11 下午截图',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'CMP-05',
    keyword: '梯子云 vs 隐形人',
    primaryKeyword: '梯子云 vs 隐形人对比',
    secondaryKeywords: ['60+ 节点机场对比', '开放通用订阅 vs 纯专属端'],
    longTailQuestions: ['规格相近的情况下选梯子云还是隐形人？'],
    searchIntent: 'Comparison',
    audience: '对比 60+ 节点专线宣传、在双端支持与封闭端间抉择的用户',
    contentType: '品牌对比',
    parentTopic: '/compare/',
    parentCluster: '/compare/',
    targetUrl: '/compare/tiziyun-vs-yinxingren/',
    articleTitle: '梯子云 vs 隐形人深度对比（2026）：60+ 节点同级规格，“双端自由”与“纯专属端”抉择',
    relatedArticles: ['/reviews/yinxingren/', '/brands/tiziyun/', '/brands/yinxingren/'],
    relatedBrands: ['tiziyun', 'yinxingren'],
    conversionIntent: 'high',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json、推广机场品牌清单.txt 第27/28节',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'CMP-06',
    keyword: '微风网络 vs 星岛梦',
    primaryKeyword: '微风网络 vs 星岛梦对比',
    secondaryKeywords: ['500GB 月付机场对比', '百元不限时包对比'],
    longTailQuestions: ['500G 月付和永久备用包，微风网络和星岛梦买谁更划算？'],
    searchIntent: 'Comparison',
    audience: '在 IEPL 专线中高流量月包或不限时包间对比的用户',
    contentType: '品牌对比',
    parentTopic: '/compare/',
    parentCluster: '/compare/',
    targetUrl: '/compare/weifeng-vs-xingdaomeng/',
    articleTitle: '微风网络 vs 星岛梦深度对比（2026）：IEPL 中高流量与不限时备胎怎么选更划算？',
    relatedArticles: ['/reviews/weifeng/', '/reviews/xingdaomeng/', '/brands/weifeng/', '/brands/xingdaomeng/'],
    relatedBrands: ['weifeng', 'xingdaomeng'],
    conversionIntent: 'high',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: 'data/brands.json、2026-08-11 快照',
    lastReviewedAt: '2026-11-27'
  },

  // ================= 05 / 08. guides & clients =================
  {
    id: 'GDE-L3-01',
    keyword: '机场订阅链接如何使用 导入流程',
    primaryKeyword: '机场订阅导入全流程',
    secondaryKeywords: ['Clash 订阅 vs 通用 Base64 订阅', '自研端与第三方订阅区别', '自动更新订阅间隔'],
    longTailQuestions: ['复制的订阅链接放进浏览器打开能看吗？', 'Clash YAML 和 Base64 通用订阅买错怎么转换？'],
    searchIntent: 'How-to',
    audience: '刚购买套餐不知如何导入客户端的新手',
    contentType: '教程文章',
    parentTopic: '/guides/',
    parentCluster: '/guides/',
    targetUrl: '/guides/subscription-setup/',
    articleTitle: '机场订阅链接如何使用？获取、分辨格式、安全导入与自动更新全流程指南',
    relatedArticles: ['/guides/clash-mihomo-guide/', '/guides/shadowrocket-guide/', '/risk/subscription-converter-risk/', '/troubleshooting/subscription-update-failed/'],
    relatedBrands: ['guangsu', 'feimao', 'tiziyun'],
    conversionIntent: 'low',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: '第三方代理客户端.txt、客户端官方文档规范',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'GDE-L3-02',
    keyword: 'Clash Verge Rev 如何安装与导入订阅',
    primaryKeyword: 'Clash Verge Rev 配置教程',
    secondaryKeywords: ['Mihomo 内核设置', 'Clash Verge 服务模式安装', '规则模式与全局模式区别'],
    longTailQuestions: ['Clash Verge Rev 和原版 Clash for Windows 有什么关系？', '为什么必须安装 Service Mode 服务模式？'],
    searchIntent: 'How-to',
    audience: 'Windows / macOS / Linux 桌面端用户',
    contentType: '教程文章',
    parentTopic: '/guides/',
    parentCluster: '/clients/windows/',
    targetUrl: '/guides/clash-mihomo-guide/',
    articleTitle: 'Clash Verge Rev 安装、订阅导入与 Mihomo 核心规则分流实战教程（2026）',
    relatedArticles: ['/guides/cfw-to-clash-verge/', '/guides/tun-and-dns/', '/guides/claude-fixed-node-rules/', '/clients/clash-verge-rev/'],
    relatedBrands: ['guangsu'],
    conversionIntent: 'low',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: '第三方代理客户端.txt、Clash Verge Rev 开源发布规范',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'GDE-L3-03',
    keyword: 'Shadowrocket 小火箭如何添加订阅',
    primaryKeyword: 'Shadowrocket 添加订阅与配置教程',
    secondaryKeywords: ['iOS 小火箭分流设置', '小火箭连通性测试', 'iPhone 锁屏断流设置'],
    longTailQuestions: ['Shadowrocket 全局路由选配置还是代理？', '小火箭更新订阅时提示证书或网络错误怎么办？'],
    searchIntent: 'How-to',
    audience: 'iPhone 与 iPad iOS/iPadOS 用户',
    contentType: '教程文章',
    parentTopic: '/guides/',
    parentCluster: '/clients/ios/',
    targetUrl: '/guides/shadowrocket-guide/',
    articleTitle: 'iPhone Shadowrocket 小火箭添加订阅、按需连接与流媒体/AI 分流完整教程',
    relatedArticles: ['/clients/ios/', '/clients/shadowrocket/', '/guides/subscription-setup/', '/troubleshooting/ipv6-leak-error/'],
    relatedBrands: ['guangsu'],
    conversionIntent: 'low',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: '第三方代理客户端.txt',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'GDE-L3-04',
    keyword: 'Clash Verge TUN 模式与 DNS 防泄漏怎么设置',
    primaryKeyword: 'TUN 模式与 DNS 防泄漏配置',
    secondaryKeywords: ['Fake-IP vs Redir-Host', 'Desktop ChatGPT 客户端无法代理', 'YouTube 送中 DNS 排查'],
    longTailQuestions: ['开启 TUN 模式什么时候最需要？', '开启 TUN 后国内网银或内网访问变慢怎么办？'],
    searchIntent: 'How-to',
    audience: '使用桌面 AI 客户端、游戏平台或遭遇 DNS 泄漏的用户',
    contentType: '教程文章',
    parentTopic: '/guides/',
    parentCluster: '/clients/windows/',
    targetUrl: '/guides/tun-and-dns/',
    articleTitle: 'TUN 虚拟网卡模式与 DNS Fake-IP 防泄漏配置指南：解决桌面 App 不走代理问题',
    relatedArticles: ['/guides/clash-mihomo-guide/', '/troubleshooting/tun-mode-error/', '/troubleshooting/dns-resolution-error/', '/ai/chatgpt-guide/'],
    relatedBrands: [],
    conversionIntent: 'none',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: 'Mihomo 官方 TUN & DNS 规范',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'GDE-L3-05',
    keyword: 'Claude 防封号锁单节点 Clash 分流规则设置',
    primaryKeyword: 'Clash Claude 锁死单节点规则配置',
    secondaryKeywords: ['Claude 换 IP 封号怎么避免', 'Select 分组固定美国节点', 'AI 工具分流规则写法'],
    longTailQuestions: ['为什么 url-test 自动测速切节点容易封 Claude 账号？', '如何在 Clash Verge Rev 中为 Anthropic/OpenAI 单独绑定固定美国节点？'],
    searchIntent: 'How-to',
    audience: '已订阅 Claude Pro 或高频使用 Anthropic API/Web 的重度 AI 用户',
    contentType: '教程文章',
    parentTopic: '/guides/',
    parentCluster: '/recommend/ai-tools/',
    targetUrl: '/guides/claude-fixed-node-rules/',
    articleTitle: 'Claude 防封号实战：在 Clash Verge Rev 中利用 Select 分组彻底锁死单节点配置示例',
    relatedArticles: ['/ai/claude-guide/', '/recommend/ai-tools/', '/guides/tun-and-dns/', '/troubleshooting/claude-access-error/'],
    relatedBrands: ['guangsu', 'sujie'],
    conversionIntent: 'low',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: 'Clash/Mihomo rule-providers 语法与 AI 风控公开经验',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'GDE-L3-06',
    keyword: 'Clash for Windows 迁移至 Clash Verge Rev 教程',
    primaryKeyword: 'Clash for Windows 迁移 Clash Verge Rev',
    secondaryKeywords: ['CFW 停更替代方案', '关闭旧版系统代理残余', '旧订阅配置文件导入'],
    longTailQuestions: ['卸载 Clash for Windows 前不关系统代理会断网吗？', 'CFW 的本地 yaml 配置能直接拖进 Clash Verge Rev 吗？'],
    searchIntent: 'How-to',
    audience: '仍在桌面使用已停止维护旧客户端的存量用户',
    contentType: '教程文章',
    parentTopic: '/guides/',
    parentCluster: '/clients/windows/',
    targetUrl: '/guides/cfw-to-clash-verge/',
    articleTitle: 'Windows/macOS 从旧版 Clash for Windows 平滑迁移至 Clash Verge Rev 完整指南',
    relatedArticles: ['/clients/clash-verge-rev/', '/clients/windows/', '/guides/clash-mihomo-guide/', '/troubleshooting/connected-no-internet/'],
    relatedBrands: [],
    conversionIntent: 'none',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '第三方代理客户端.txt（明确标注已停更风险）',
    lastReviewedAt: '2026-11-27'
  },

  // ================= 06. ai / streaming =================
  {
    id: 'AI-L3-01',
    keyword: 'Netflix 解锁失败与代理报错排查',
    primaryKeyword: 'Netflix 使用指南与解锁排查',
    secondaryKeywords: ['Netflix 自制剧 vs 非自制版权剧', 'Netflix M7111-5059', '香港/日本/新加坡奈飞片库区别'],
    longTailQuestions: ['为什么同一机场的香港节点能看完整奈飞，换一条却只剩自制剧？', 'Netflix 同户家庭验证如何影响跨境节点切换？'],
    searchIntent: 'Informational',
    audience: '使用 Netflix 追剧及遇到自制剧降级的用户',
    contentType: '平台技术专题',
    parentTopic: '/ai/',
    parentCluster: '/recommend/streaming/',
    targetUrl: '/ai/netflix-guide/',
    articleTitle: 'Netflix 使用指南（2026）：自制剧 vs 全解锁判定、地区片库差异与报错处理',
    relatedArticles: ['/ai/netflix-4k-guide/', '/ai/netflix-regions-account/', '/troubleshooting/netflix-network-error/', '/recommend/streaming/'],
    relatedBrands: ['guangsu', 'xingdaomeng'],
    conversionIntent: 'low',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: 'data/streaming-services.json、2026-08-19 实测表现',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'AI-L3-02',
    keyword: 'ChatGPT 无法访问与地区不支持怎么办',
    primaryKeyword: 'ChatGPT 网络使用与地区环境指南',
    secondaryKeywords: ['ChatGPT 香港节点为什么用不了网页版', 'OpenAI 仅限 APP 可用', 'ChatGPT 登录风控排查'],
    longTailQuestions: ['为什么香港节点能上 ChatGPT iOS App 却打不开网页版？', '换用美国/新加坡节点仍然弹出 Access Denied 怎么清理？'],
    searchIntent: 'Informational',
    audience: '日常高频使用 ChatGPT 网页端及桌面 App 的用户',
    contentType: 'AI 平台专题',
    parentTopic: '/ai/',
    parentCluster: '/recommend/ai-tools/',
    targetUrl: '/ai/chatgpt-guide/',
    articleTitle: 'ChatGPT 网络使用指南（2026）：香港限制、App 与网页端差异及节点环境配置',
    relatedArticles: ['/ai/chatgpt-login-environment/', '/guides/tun-and-dns/', '/troubleshooting/chatgpt-network-error/', '/recommend/ai-tools/'],
    relatedBrands: ['guangsu', 'sujie'],
    conversionIntent: 'low',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: 'data/ai-services.json、2026-08-19 光速云实测截图证据',
    lastReviewedAt: '2026-11-27'
  },

  // ================= 07. network =================
  {
    id: 'NET-L3-01',
    keyword: '电信163 联通4837 移动CMI 选机场节点实操',
    primaryKeyword: '三网宽带晚高峰选节点实操指南',
    secondaryKeywords: ['延迟低为什么下载速度慢', '移动宽带用什么节点快', '北方联通看 4K 卡顿排查'],
    longTailQuestions: ['为什么我的香港专线 TLS RTT 才 65ms 但打网页卡 1200ms？', '电信、移动、联通在亚太主干路由上各有什么特点？'],
    searchIntent: 'Informational',
    audience: '发现相同机场在不同人手里速度差异巨大的国内三网用户',
    contentType: '网络技术指南',
    parentTopic: '/network/',
    parentCluster: '/network/bgp-transit-vs-direct/',
    targetUrl: '/network/three-isp-routing/',
    articleTitle: '电信 163、联通 4837 与移动 CMI 晚高峰选机场节点实操：从三网实测差异看延迟与带宽',
    relatedArticles: ['/network/iepl-vs-iplc/', '/network/regions-and-metrics/', '/troubleshooting/peak-hour-congestion/', '/reviews/guangsu/'],
    relatedBrands: ['guangsu'],
    conversionIntent: 'low',
    contentPriority: 'P0',
    contentStatus: 'new_published',
    sourceRequirements: '2026-08-19 长沙电信/广西移动/河北联通 3 组真实对比截图',
    lastReviewedAt: '2026-11-27'
  },

  // ================= 09. troubleshooting =================
  {
    id: 'TRS-L3-01',
    keyword: '所有机场节点突然超时 Timeout 怎么办',
    primaryKeyword: '节点全部超时逐层排查手册',
    secondaryKeywords: ['节点全红无响应', '系统时间误差导致 VLESS 超时', '区分本地断网还是机场跑路'],
    longTailQuestions: ['昨天还好好的，今天所有节点突然全部 Timeout 怎么一步步定位？', '电脑时间差几分钟为什么会让 VLESS/Trojan 连不上？'],
    searchIntent: 'Troubleshooting',
    audience: '全部节点突然同时失效、急于判断是本地配置问题还是机场跑路的用户',
    contentType: '故障排查手册',
    parentTopic: '/troubleshooting/',
    parentCluster: '/troubleshooting/',
    targetUrl: '/troubleshooting/all-nodes-timeout/',
    articleTitle: '所有机场节点突然超时（Timeout）怎么办？7 步区分本地网络故障与服务端停运',
    relatedArticles: ['/troubleshooting/subscription-update-failed/', '/troubleshooting/connected-no-internet/', '/risk/alternatives/', '/risk/avoid-pitfalls/'],
    relatedBrands: [],
    conversionIntent: 'none',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: 'TLS/VLESS/Trojan 协议时间窗口机制与客户端实操',
    lastReviewedAt: '2026-11-27'
  },
  {
    id: 'TRS-L3-02',
    keyword: '机场订阅链接更新失败 返回200内容为空怎么办',
    primaryKeyword: '机场订阅更新失败与空内容排查',
    secondaryKeywords: ['Clash 更新订阅报错 403/404', '订阅返回 200 但没节点', 'UA 请求头被防火墙拦截'],
    longTailQuestions: ['浏览器能打开机场官网，为什么 Clash 点更新订阅一直转圈失败？', '订阅显示成功更新但节点列表只有 0 个怎么办？'],
    searchIntent: 'Troubleshooting',
    audience: '无法拉取或更新订阅列表的桌面/移动端客户端用户',
    contentType: '故障排查手册',
    parentTopic: '/troubleshooting/',
    parentCluster: '/troubleshooting/',
    targetUrl: '/troubleshooting/subscription-update-failed/',
    articleTitle: '订阅更新失败或返回 200 内容为空怎么办？域名被墙、UA 标识与格式错误排查',
    relatedArticles: ['/troubleshooting/all-nodes-timeout/', '/guides/subscription-setup/', '/risk/subscription-converter-risk/'],
    relatedBrands: [],
    conversionIntent: 'none',
    contentPriority: 'P0',
    contentStatus: 'upgraded',
    sourceRequirements: '客户端订阅拉取 HTTP 诊断机制',
    lastReviewedAt: '2026-11-27'
  },

  // ================= 10. risk =================
  {
    id: 'RSK-L3-01',
    keyword: '机场订阅链接泄露 在线转换站安全风险',
    primaryKeyword: '订阅链接安全与在线转换风险防范',
    secondaryKeywords: ['在线订阅转换安全吗', '机场订阅 Token 被盗表现', '如何重置机场订阅链接'],
    longTailQuestions: ['把订阅发到第三方免费在线转换网站会被盗刷流量吗？', '发现账号莫名超设备或流量暴跌怎么办？'],
    searchIntent: 'Informational',
    audience: '使用在线工具进行订阅转换、或怀疑自己订阅 Token 被盗刷的用户',
    contentType: '风险与安全指南',
    parentTopic: '/risk/',
    parentCluster: '/risk/account-and-refund/',
    targetUrl: '/risk/subscription-converter-risk/',
    articleTitle: '为什么切勿把机场订阅传到陌生在线转换站？订阅 Token 泄露自查与止损步骤',
    relatedArticles: ['/risk/account-and-refund/', '/guides/subscription-setup/', '/guides/clash-mihomo-guide/'],
    relatedBrands: [],
    conversionIntent: 'none',
    contentPriority: 'P1',
    contentStatus: 'new_published',
    sourceRequirements: 'V2Board/Subconverter 常见凭证安全机制',
    lastReviewedAt: '2026-11-27'
  }
];

// Include remaining Chapter 5 high-value candidate backlog items across all 10 clusters so the full long-tail pipeline is cleanly registered (no blank files created).
const additionalBacklogSeeds = [
  ['REC-BL-05', '如何判断机场节点真实地区（原生 vs 广播）', '节点地区真实性判断', 'Informational', '/recommend/', '/recommend/streaming/', '/recommend/node-region-check/', 'P1'],
  ['REC-BL-06', '同价位两个机场应该优先比较哪些条件', '同价位机场横向对比方法', 'Comparison', '/recommend/', '/recommend/stable/', '/recommend/same-price-comparison/', 'P1'],
  ['PRI-BL-04', '300GB 和 500GB 套餐差价与适用家庭人数计算', '300GB vs 500GB 套餐怎么选', 'Commercial Investigation', '/pricing/', '/pricing/rules/', '/pricing/300gb-vs-500gb/', 'P1'],
  ['PRI-BL-05', '不限时流量包和低价月付包哪个更适合当备用', '不限时备用 vs 低价月付对比', 'Comparison', '/pricing/', '/pricing/pay-as-you-go/', '/pricing/payg-vs-cheap-monthly/', 'P1'],
  ['BRN-BL-01', '品牌临时维护与停运跑路怎么区分', '机场维护与跑路特征判断', 'Informational', '/brands/', '/risk/avoid-pitfalls/', '/risk/maintenance-vs-shutdown/', 'P1'],
  ['VPN-BL-01', 'VPN 和代理客户端能不能同时开启运行', 'VPN 与代理客户端冲突排查', 'Troubleshooting', '/vpn/', '/vpn/vpn-vs-proxy/', '/vpn/dual-tunnel-conflict/', 'P1'],
  ['VPN-BL-02', '手机 VPN 后台频繁自动断开怎么解决', '手机代理后台断流优化', 'Troubleshooting', '/vpn/', '/vpn/platforms/', '/vpn/mobile-background-disconnect/', 'P1'],
  ['CLI-BL-01', 'v2rayN 如何从 v6 升级并开启 sing-box 内核', 'v2rayN 内核切换教程', 'How-to', '/clients/', '/clients/windows/', '/guides/v2rayn-singbox-upgrade/', 'P1'],
  ['CLI-BL-02', 'OpenWrt 24.10 安装 Nikki 透明代理与 fw4 依赖', 'OpenWrt Nikki 配置教程', 'How-to', '/clients/', '/clients/openwrt/', '/guides/openwrt-nikki-setup/', 'P1'],
  ['CLI-BL-03', 'FlClash 与 Clash Verge Rev 桌面端核心差异', 'FlClash vs Clash Verge 对比', 'Comparison', '/clients/', '/clients/windows/', '/compare/flclash-vs-clash-verge/', 'P1'],
  ['NET-BL-02', '如何识别未经验证的假专线（公网中转冒充 IEPL）', '假 IEPL 专线辨别方法', 'Informational', '/network/', '/network/iepl-vs-iplc/', '/network/verify-iepl-claims/', 'P1'],
  ['NET-BL-03', '节点丢包率与抖动 Jitter 对 4K 缓冲的真实影响', '丢包率与抖动测速解读', 'Informational', '/network/', '/network/regions-and-metrics/', '/network/packet-loss-and-jitter/', 'P2'],
  ['TRS-BL-03', 'Wi-Fi 连不上节点但 5G 流量可以连接的原因排查', 'WiFi 与移动网络代理差异排查', 'Troubleshooting', '/troubleshooting/', '/troubleshooting/', '/troubleshooting/wifi-vs-cellular/', 'P1'],
  ['TRS-BL-04', '电脑正常但手机无法访问外网的订阅与时间检查', '电脑正常手机不能用排查', 'Troubleshooting', '/troubleshooting/', '/troubleshooting/', '/troubleshooting/pc-works-phone-fails/', 'P1'],
  ['RSK-BL-02', '机场不退款时如何留存付款凭证与应对损失', '机场拒退纠纷与止损建议', 'Informational', '/risk/', '/risk/account-and-refund/', '/risk/refund-dispute-evidence/', 'P2']
];

const builtAdditionalRoutes = new Set([
  '/recommend/node-region-check/',
  '/pricing/300gb-vs-500gb/',
  '/risk/maintenance-vs-shutdown/',
  '/vpn/dual-tunnel-conflict/',
  '/guides/openwrt-nikki-setup/',
  '/compare/flclash-vs-clash-verge/',
  '/network/verify-iepl-claims/',
  '/troubleshooting/wifi-vs-cellular/'
]);

for (const [id, keyword, primaryKeyword, searchIntent, parentTopic, parentCluster, targetUrl, contentPriority] of additionalBacklogSeeds) {
  const isNowLive = builtAdditionalRoutes.has(targetUrl);
  tasks.push({
    id,
    keyword,
    primaryKeyword,
    secondaryKeywords: [],
    longTailQuestions: [],
    searchIntent,
    audience: '泛网络用户与特定场景搜索者',
    contentType: isNowLive ? '三级专题文章' : '长尾选题待办',
    parentTopic,
    parentCluster,
    targetUrl,
    articleTitle: isNowLive ? keyword : `${keyword}（待排期）`,
    relatedArticles: [parentCluster],
    relatedBrands: [],
    conversionIntent: 'low',
    contentPriority,
    contentStatus: isNowLive ? 'new_published' : 'backlog_planned',
    sourceRequirements: isNowLive ? '完整实操与品牌数据源核查' : '待补齐对应实操截图或品牌一手核对后发布',
    lastReviewedAt: '2026-11-27'
  });
}

// Merge existing 69 published Level-3 pages from docs/ so cluster-map & navigation cover all live URLs
function scanExistingRoutes() {
  const dirs = ['ai', 'guides', 'troubleshooting', 'clients'];
  const existing = [];
  for (const d of dirs) {
    const base = path.join(ROOT, 'docs', d);
    for (const ent of fs.readdirSync(base, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue;
      // Skip Level-2 client OS hubs
      if (d === 'clients' && ['windows', 'android', 'ios', 'macos', 'linux', 'openwrt'].includes(ent.name)) continue;
      const mdPath = path.join(base, ent.name, 'index.md');
      if (!fs.existsSync(mdPath)) continue;
      const content = fs.readFileSync(mdPath, 'utf-8');
      const titleMatch = content.match(/^title:\s*(.+)$/m);
      const descMatch = content.match(/^description:\s*(.+)$/m);
      const url = `/${d}/${ent.name}/`;
      existing.push({
        url,
        section: `/${d}/`,
        title: titleMatch ? titleMatch[1].replace(/^"|"$/g, '').trim() : ent.name,
        description: descMatch ? descMatch[1].replace(/^"|"$/g, '').trim() : ''
      });
    }
  }
  return existing;
}

const existingPages = scanExistingRoutes();
const coveredUrls = new Set(tasks.filter(t => t.contentStatus !== 'backlog_planned').map(t => t.targetUrl));

for (const ep of existingPages) {
  if (!coveredUrls.has(ep.url)) {
    tasks.push({
      id: `EXT-${ep.url.replace(/\//g, '-').replace(/^-|-$/g, '').toUpperCase()}`,
      keyword: ep.title.split('：')[0],
      primaryKeyword: ep.title.split('：')[0],
      secondaryKeywords: [],
      longTailQuestions: [],
      searchIntent: ep.section === '/troubleshooting/' ? 'Troubleshooting' : (ep.section === '/guides/' ? 'How-to' : 'Informational'),
      audience: '精准专题搜索用户',
      contentType: ep.section === '/clients/' ? '客户端百科' : '三级专题页',
      parentTopic: ep.section,
      parentCluster: ep.section,
      targetUrl: ep.url,
      articleTitle: ep.title,
      relatedArticles: [ep.section],
      relatedBrands: [],
      conversionIntent: 'low',
      contentPriority: 'P1',
      contentStatus: 'published',
      sourceRequirements: '已有结构化数据与官方文档',
      lastReviewedAt: '2026-11-27'
    });
  }
}

// 1. Write article-keyword-map.json
fs.writeFileSync(
  path.join(OUT_KW_DIR, 'article-keyword-map.json'),
  JSON.stringify({
    updatedAt: '2026-11-27',
    totalTasks: tasks.length,
    publishedOrUpgradedCount: tasks.filter(t => t.contentStatus !== 'backlog_planned').length,
    backlogCount: tasks.filter(t => t.contentStatus === 'backlog_planned').length,
    searchVolumePolicy: '未接入 GSC/Bing 实时导出数据时统一标为 unknown_unverified，绝不编造月搜索量。',
    tasks
  }, null, 2),
  'utf-8'
);

// 2. Write longtail-master.csv & content-priority.csv
const csvEscape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const masterHeader = ['id', 'keyword', 'primaryKeyword', 'searchIntent', 'contentType', 'parentTopic', 'parentCluster', 'targetUrl', 'contentPriority', 'contentStatus', 'searchVolume', 'lastReviewedAt'];
const masterRows = [
  masterHeader.join(','),
  ...tasks.map(t => [
    t.id, t.keyword, t.primaryKeyword, t.searchIntent, t.contentType, t.parentTopic, t.parentCluster,
    t.targetUrl, t.contentPriority, t.contentStatus, 'unknown_unverified', t.lastReviewedAt
  ].map(csvEscape).join(','))
];
fs.writeFileSync(path.join(OUT_KW_DIR, 'longtail-master.csv'), '\uFEFF' + masterRows.join('\n'), 'utf-8');

const prioHeader = ['id', 'contentPriority', 'contentStatus', 'primaryKeyword', 'targetUrl', 'conversionIntent', 'relatedBrands'];
const prioRows = [
  prioHeader.join(','),
  ...tasks
    .slice()
    .sort((a, b) => a.contentPriority.localeCompare(b.contentPriority) || a.contentStatus.localeCompare(b.contentStatus))
    .map(t => [t.id, t.contentPriority, t.contentStatus, t.primaryKeyword, t.targetUrl, t.conversionIntent, (t.relatedBrands || []).join('|')].map(csvEscape).join(','))
];
fs.writeFileSync(path.join(OUT_KW_DIR, 'content-priority.csv'), '\uFEFF' + prioRows.join('\n'), 'utf-8');

// 3. Build cluster-map.json grouped by parentTopic
const clusters = {};
for (const t of tasks) {
  if (!clusters[t.parentTopic]) {
    clusters[t.parentTopic] = { parentTopic: t.parentTopic, publishedUrls: [], upgradedUrls: [], newUrls: [], backlogUrls: [] };
  }
  const c = clusters[t.parentTopic];
  if (t.contentStatus === 'published') c.publishedUrls.push(t.targetUrl);
  else if (t.contentStatus === 'upgraded') c.upgradedUrls.push(t.targetUrl);
  else if (t.contentStatus === 'new_published') c.newUrls.push(t.targetUrl);
  else c.backlogUrls.push(t.targetUrl);
}
fs.writeFileSync(path.join(OUT_KW_DIR, 'cluster-map.json'), JSON.stringify({ updatedAt: '2026-11-27', clusters }, null, 2), 'utf-8');

// 4. Build data/topic-navigation.json for automatic static-HTML backlinks in TopicClusterLinks.vue
// ONLY include routes whose markdown files are actually built (or planned to be created in this run).
const publishedReviews = new Set(['guangsu', 'feimao', 'xingdaomeng', 'ermao', 'muguang', 'weifeng', 'xiaoming', 'yinxingren', 'weitu', 'yifan', 'sogo', 'quanqiu']);
const brandPairs = {
  guangsu: [
    { title: '光速云 vs 飞猫云深度对比', href: '/compare/guangsu-vs-feimao/', desc: '通用订阅双栖 vs 纯专属端零配置' },
    { title: '光速云 vs 星岛梦对比', href: '/compare/guangsu-vs-xingdaomeng/', desc: '2020 年两大主力 IEPL 机场套餐与不限时对比' },
    { title: '光速云 vs 二猫云对比', href: '/compare/guangsu-vs-ermao/', desc: '新加坡节点覆盖差异与 168G vs 130G 对比' },
    { title: '小明Cloud vs 光速云对比', href: '/compare/xiaoming-vs-guangsu/', desc: '¥5/600G 低价宣传与实测证据链风险对比' }
  ],
  feimao: [{ title: '光速云 vs 飞猫云深度对比', href: '/compare/guangsu-vs-feimao/', desc: '通用订阅与纯专属端取舍分析' }],
  xingdaomeng: [
    { title: '光速云 vs 星岛梦对比', href: '/compare/guangsu-vs-xingdaomeng/', desc: 'VLESS vs Trojan 与不限时流量核算' },
    { title: '微风网络 vs 星岛梦对比', href: '/compare/weifeng-vs-xingdaomeng/', desc: '500GB–1.2T 月付与百元不限时对比' }
  ],
  weifeng: [{ title: '微风网络 vs 星岛梦对比', href: '/compare/weifeng-vs-xingdaomeng/', desc: 'IEPL 高性价比月付与不限时对比' }],
  ermao: [{ title: '光速云 vs 二猫云对比', href: '/compare/guangsu-vs-ermao/', desc: '缺新加坡节点对日常流媒体/AI 的影响' }],
  xiaoming: [{ title: '小明Cloud vs 光速云对比', href: '/compare/xiaoming-vs-guangsu/', desc: '低价套餐与模板冲突风险评估' }],
  tiziyun: [{ title: '梯子云 vs 隐形人深度对比', href: '/compare/tiziyun-vs-yinxingren/', desc: '60+ 节点通用订阅双支持 vs 纯专属端' }],
  yinxingren: [{ title: '梯子云 vs 隐形人深度对比', href: '/compare/tiziyun-vs-yinxingren/', desc: '60+ 节点同级规格与自由度代价分析' }]
};

const routes = {};

// Level-1 & Level-2 automatic child links (prevents orphaned Level-3 pages without altering Level-1/2 bodies!)
const hubChildrenMap = {
  '/recommend/': [
    { title: '买前必看：机场推荐核心指标判断', href: '/recommend/how-to-choose/', desc: 'IEPL、倍率、客户端兼容与晚高峰实测判断' },
    { title: '多设备与家庭用户怎么选机场', href: '/recommend/multi-device-guide/', desc: '并发设备、IP 限制与软路由防风控指南' },
    { title: '独立品牌深度评测中心（8 家）', href: '/reviews/', desc: '光速云万字评测及主力品牌客观优缺点分析' },
    { title: '光速云 vs 飞猫云深度对比', href: '/compare/guangsu-vs-feimao/', desc: '通用订阅与纯专属端对比' }
  ],
  '/recommend/streaming/': [
    { title: '买前必看：机场推荐核心指标判断', href: '/recommend/how-to-choose/', desc: '判断流媒体解锁口径与专线真伪' },
    { title: 'Netflix 使用指南与自制剧排查', href: '/ai/netflix-guide/', desc: '地区片库与版权解锁机制详解' },
    { title: '光速云深度评测（含 08-19 实测图）', href: '/reviews/guangsu/', desc: '查看三网 5 张 MiaoKo 原图实测分析' }
  ],
  '/recommend/ai-tools/': [
    { title: 'ChatGPT 网络使用指南（2026）', href: '/ai/chatgpt-guide/', desc: '解决香港限制、App 与网页端差异' },
    { title: 'Claude 防封号锁单节点规则配置', href: '/guides/claude-fixed-node-rules/', desc: 'Clash Select 分组固定节点实战' },
    { title: '光速云深度评测（OpenAI/Gemini 实测）', href: '/reviews/guangsu/', desc: '查看哪些节点解锁 OpenAI 与 Gemini' }
  ],
  '/recommend/stable/': [
    { title: '买前必看：机场推荐核心指标判断', href: '/recommend/how-to-choose/', desc: '识别稳定性宣传与实测快照边界' },
    { title: '光速云 vs 星岛梦对比', href: '/compare/guangsu-vs-xingdaomeng/', desc: '2020 年两大 IEPL 老牌主力横向对比' },
    { title: '星岛梦深度评测（2026）', href: '/reviews/xingdaomeng/', desc: '2020 老牌 IEPL + Trojan 9 档分析' }
  ],
  '/recommend/beginners/': [
    { title: '多设备与家庭用户怎么选机场', href: '/recommend/multi-device-guide/', desc: '多端同时在线的规则与设备限制' },
    { title: '光速云 vs 飞猫云深度对比', href: '/compare/guangsu-vs-feimao/', desc: '新手到底选零配置 App 还是通用订阅' },
    { title: '机场订阅导入全流程指南', href: '/guides/subscription-setup/', desc: '首次订阅导入与自动更新设置' }
  ],
  '/pricing/': [
    { title: '10 元到 20 元月付机场怎么选', href: '/pricing/ten-yuan-plans/', desc: '拆穿“8 元起年付折算”并对比真实月付' },
    { title: '100GB/300GB/500GB 流量够用多久', href: '/pricing/traffic-and-multiplier/', desc: '倍率扣费公式与 4K 视频消耗测算' },
    { title: '小明Cloud vs 光速云对比', href: '/compare/xiaoming-vs-guangsu/', desc: '¥5/600G 低价盘与常规专线的风险权衡' }
  ],
  '/pricing/budget/': [
    { title: '10 元到 20 元月付机场怎么选', href: '/pricing/ten-yuan-plans/', desc: '真实月付起步门槛与多档性价比核查' },
    { title: '小明Cloud 风险核查评测', href: '/reviews/xiaoming/', desc: '¥5/600G 与模板冲突风险分析' },
    { title: '微风网络深度评测', href: '/reviews/weifeng/', desc: '¥137/年清风版到御风版全档解析' }
  ],
  '/pricing/billing-cycles/': [
    { title: '10 元到 20 元月付机场怎么选', href: '/pricing/ten-yuan-plans/', desc: '年付折算月均价与首月试错成本计算' },
    { title: '暮光加速深度评测', href: '/reviews/muguang/', desc: '¥109 年付折算 vs ¥20 普通月付分析' }
  ],
  '/pricing/pay-as-you-go/': [
    { title: '光速云 vs 星岛梦对比', href: '/compare/guangsu-vs-xingdaomeng/', desc: '对比光速云 147 永久与星岛梦 100/300/1TB 不限时' },
    { title: '星岛梦深度评测', href: '/reviews/xingdaomeng/', desc: '分析 3 档不限时套餐的折算单价' }
  ],
  '/pricing/rules/': [
    { title: '100GB/300GB/500GB 流量够用多久', href: '/pricing/traffic-and-multiplier/', desc: '倍率扣费与多设备同时在线真实消耗' }
  ],
  '/brands/': [
    { title: '独立品牌深度评测中心（8 家深写）', href: '/reviews/', desc: '区别于商业档案页：独立分析优缺点与实测拆解' },
    { title: '光速云深度评测（2026 万字版）', href: '/reviews/guangsu/', desc: '含 2026-08-19 五张 MiaoKo 实测原图拆解' },
    { title: '品牌对比中心与 4 篇深度 PK', href: '/compare/', desc: '光速云 vs 飞猫云 / 星岛梦 / 二猫云 / 小明Cloud' }
  ],
  '/compare/': [
    { title: '光速云 vs 飞猫云深度对比', href: '/compare/guangsu-vs-feimao/', desc: '通用订阅双栖 vs 纯专属端新手选择' },
    { title: '光速云 vs 星岛梦对比', href: '/compare/guangsu-vs-xingdaomeng/', desc: '2020 年两大主力 IEPL 套餐与不限时对比' },
    { title: '光速云 vs 二猫云对比', href: '/compare/guangsu-vs-ermao/', desc: '新加坡节点缺失影响与 ¥20 vs ¥25 核算' },
    { title: '小明Cloud vs 光速云对比', href: '/compare/xiaoming-vs-guangsu/', desc: '¥5/600G 极低单价与证据链完整性对比' },
    { title: '梯子云 vs 隐形人深度对比', href: '/compare/tiziyun-vs-yinxingren/', desc: '60+ 节点双端自由 vs 纯专属端对比' },
    { title: '微风网络 vs 星岛梦深度对比', href: '/compare/weifeng-vs-xingdaomeng/', desc: '500G–1.2T 大流量月付与百元永久包' },
    { title: 'FlClash vs Clash Verge Rev 对比', href: '/compare/flclash-vs-clash-verge/', desc: 'Flutter vs Tauri 同内核桌面客户端选型' }
  ],
  '/vpn/': [
    { title: 'VPN 与代理客户端能否同时运行', href: '/vpn/dual-tunnel-conflict/', desc: '解决企业 VPN / 游戏加速器路由冲突' }
  ],
  '/clients/': [
    { title: 'Clash Verge Rev 安装与配置教程', href: '/guides/clash-mihomo-guide/', desc: '桌面端通用订阅导入与 Mihomo 规则实战' },
    { title: '从 CFW 平滑迁移 Clash Verge Rev', href: '/guides/cfw-to-clash-verge/', desc: '安全卸载旧版与保留本地配置' },
    { title: 'Shadowrocket 小火箭完整教程', href: '/guides/shadowrocket-guide/', desc: 'iOS 添加订阅与按需连接设定' }
  ],
  '/clients/windows/': [
    { title: 'Clash Verge Rev 安装与配置教程', href: '/guides/clash-mihomo-guide/', desc: 'Service Mode、TUN 与分流全流程' },
    { title: '从 CFW 平滑迁移 Clash Verge Rev', href: '/guides/cfw-to-clash-verge/', desc: '老用户无痛升级迁移指南' },
    { title: 'TUN 虚拟网卡与 DNS 防泄漏', href: '/guides/tun-and-dns/', desc: '解决桌面端 App 不走代理问题' }
  ],
  '/clients/ios/': [
    { title: 'Shadowrocket 小火箭完整教程', href: '/guides/shadowrocket-guide/', desc: 'iPhone 添加订阅与分流设置' }
  ],
  '/ai/': [
    { title: 'Netflix 使用指南（2026）', href: '/ai/netflix-guide/', desc: '自制剧 vs 全解锁检测与地区片库' },
    { title: 'ChatGPT 网络使用指南（2026）', href: '/ai/chatgpt-guide/', desc: '香港节点限制、App 与网页端差异' },
    { title: 'Claude 防封号锁单节点配置教程', href: '/guides/claude-fixed-node-rules/', desc: '避免自动测速切节点引发风控' }
  ],
  '/network/': [
    { title: '电信 163 / 联通 4837 / 移动 CMI 选线实操', href: '/network/three-isp-routing/', desc: '结合 2026-08-19 三网实测解析延迟与带宽' },
    { title: '光速云深度评测（含三网实测图）', href: '/reviews/guangsu/', desc: '查看长沙电信/广西移动/河北联通同批次实测数据' }
  ],
  '/network/bgp-transit-vs-direct/': [
    { title: '电信 163 / 联通 4837 / 移动 CMI 选线实操', href: '/network/three-isp-routing/', desc: '三网宽带晚高峰瓶颈与节点切换策略' }
  ],
  '/guides/': [
    { title: '机场订阅导入全流程指南', href: '/guides/subscription-setup/', desc: '通用订阅与专属客户端完整操作步骤' },
    { title: 'Clash Verge Rev 安装与配置教程', href: '/guides/clash-mihomo-guide/', desc: 'Mihomo 核心规则分流实战' },
    { title: 'CFW 平滑迁移 Clash Verge Rev 指南', href: '/guides/cfw-to-clash-verge/', desc: '卸载停更旧版并迁移配置' },
    { title: 'Claude 防封号锁单节点配置示例', href: '/guides/claude-fixed-node-rules/', desc: '利用 Select 分组防止 IP 跳变' }
  ],
  '/troubleshooting/': [
    { title: '所有节点突然超时（Timeout）排查', href: '/troubleshooting/all-nodes-timeout/', desc: '7 步区分本地网络异常与机场故障' },
    { title: '订阅更新失败或返回 200 内容为空排查', href: '/troubleshooting/subscription-update-failed/', desc: '域名拦截、UA 标识与格式检查' },
    { title: '订阅转换站 Token 泄露风险与止损', href: '/risk/subscription-converter-risk/', desc: '订阅异常消耗后的安全重置步骤' }
  ],
  '/risk/': [
    { title: '机场订阅链接勿传在线转换站：Token 泄露自查', href: '/risk/subscription-converter-risk/', desc: '识别订阅盗刷并安全重置链接' },
    { title: '所有节点突然超时：判断是否停运跑路', href: '/troubleshooting/all-nodes-timeout/', desc: '技术层面确认是否服务端异常' },
    { title: '小明Cloud ¥5/600G 风险核查评测', href: '/reviews/xiaoming/', desc: '低价超售与测试表冲突风险实战案例' }
  ],
  '/risk/account-and-refund/': [
    { title: '机场订阅链接勿传在线转换站：Token 泄露自查', href: '/risk/subscription-converter-risk/', desc: '订阅链接即流量密钥的安全规范' }
  ]
};

for (const [hubUrl, children] of Object.entries(hubChildrenMap)) {
  routes[hubUrl] = {
    heading: '本专题下属文章与关联评测',
    tierLabel: 'Topic Hub 自动索引',
    children
  };
}

// Level-3 published/upgraded route navigation
for (const t of tasks.filter(x => x.contentStatus === 'new_published' || x.contentStatus === 'upgraded')) {
  const parents = [{ title: t.parentTopic.replace(/\//g, '') + ' 一级专题', href: t.parentTopic, desc: '返回所属主题中心' }];
  if (t.parentCluster && t.parentCluster !== t.parentTopic) {
    parents.push({ title: '上级二级专题', href: t.parentCluster, desc: '查看更多同簇对比与选型' });
  }
  const related = [];
  for (const rUrl of (t.relatedArticles || [])) {
    const match = tasks.find(k => k.targetUrl === rUrl && k.contentStatus !== 'backlog_planned');
    related.push({
      title: match ? match.primaryKeyword : rUrl.replace(/^\/|\/$/g, ''),
      href: rUrl,
      desc: match ? match.articleTitle : '站内延伸专题'
    });
  }
  for (const slug of (t.relatedBrands || [])) {
    const b = brandsData.brands.find(x => x.slug === slug);
    if (!b) continue;
    if (publishedReviews.has(slug)) {
      related.push({ title: `${b.brandName} 独立深度评测`, href: `/reviews/${slug}/`, desc: '查看真实优缺点、数据状态与冲突披露' });
    } else {
      related.push({ title: `${b.brandName} 套餐与商业档案`, href: `/brands/${slug}/`, desc: '核对完整套餐、优惠码与官方入口' });
    }
  }
  routes[t.targetUrl] = {
    heading: '专题归属与全链路延伸',
    tierLabel: t.contentType,
    parents,
    related
  };
}

// Brand Commercial <-> Independent Review <-> Comparison bidirectional mapping
for (const b of brandsData.brands) {
  const hasRev = publishedReviews.has(b.slug);
  const comps = brandPairs[b.slug] || [];
  const brandRelated = [
    ...(hasRev ? [{ title: `${b.brandName} 独立深度评测`, href: `/reviews/${b.slug}/`, desc: '独立优缺点分析、实测证据拆解与同类比较' }] : []),
    ...comps,
    { title: '全部 33 家机场品牌数据库', href: '/brands/', desc: '按套餐、线路与测试证据多维筛选' },
    { title: '流媒体与 AI 实测记录中心', href: '/tools/streaming-check/', desc: '查看同口径截图日期与验证状态' }
  ];
  routes[`/brands/${b.slug}/`] = {
    heading: `${b.brandName} 评测与同价位比较导航`,
    tierLabel: '品牌商业详情页',
    parents: [{ title: '机场品牌数据库大全', href: '/brands/' }],
    related: brandRelated
  };

  if (hasRev) {
    routes[`/reviews/${b.slug}/`] = {
      heading: `${b.brandName} 商业套餐与对比转化入口`,
      tierLabel: '独立品牌评测页',
      parents: [
        { title: '独立品牌深度评测中心', href: '/reviews/' },
        { title: '机场推荐总览', href: '/recommend/' }
      ],
      related: [
        { title: `${b.brandName} 套餐报价、优惠码与官方注册入口`, href: `/brands/${b.slug}/`, desc: '核对全部结构化套餐、优惠码限制与直达链接' },
        ...comps,
        { title: '品牌多维对比中心', href: '/compare/', desc: '横向并排对比 3 家品牌核心参数' }
      ]
    };
  }
}

routes['/reviews/'] = {
  heading: '按需求返回上游选型与品牌数据库',
  tierLabel: '品牌评测总览',
  parents: [{ title: '机场品牌数据库', href: '/brands/' }, { title: '机场推荐总览', href: '/recommend/' }],
  related: brandPairs.guangsu
};

fs.writeFileSync(path.join(ROOT, 'data/topic-navigation.json'), JSON.stringify({ generatedAt: new Date().toISOString(), routes }, null, 2), 'utf-8');
console.log(`Generated keyword matrix: ${tasks.length} total tasks (${tasks.filter(t => t.contentStatus !== 'backlog_planned').length} live, ${tasks.filter(t => t.contentStatus === 'backlog_planned').length} backlog) and ${Object.keys(routes).length} topic-navigation routes.`);
