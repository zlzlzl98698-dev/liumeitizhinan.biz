import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_BRAND_LIST = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\推广机场品牌清单.txt';
const SRC_GUANGSU = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\主推光速云品牌信息.txt';
const SRC_MANIFEST = path.join(ROOT, 'docs/public/reports/speedtest-2026-08-11/speedtest-manifest.json');

const brandListText = fs.readFileSync(SRC_BRAND_LIST, 'utf-8');
const guangsuText = fs.readFileSync(SRC_GUANGSU, 'utf-8');
const manifest = JSON.parse(fs.readFileSync(SRC_MANIFEST, 'utf-8'));

const LOGOS = {
  guangsu: '/logos/光速云主图.png',
  feimao: '/logos/飞猫云主图.png',
  ermao: '/logos/2mao_logo.webp',
  yifan: '/logos/1fly_logo.webp',
  sogo: '/logos/sogo.webp',
  sujie: '/logos/sujie_logo.webp',
  edgenova: '/logos/edgenova_logo.webp',
  kuaili: '/logos/kuaili_logo.png',
  u1s1: '/logos/u1s1主图.png',
  weitu: '/logos/v2云主图.png',
  xingdaomeng: '/logos/xdm_logo.webp',
  yuzhou: '/logos/yuzhou_logo.webp',
  guangnian: '/logos/光年梯主图.png',
  quanqiu: '/logos/全球云主图.png',
  jilian: '/logos/极连云主图.png',
  tiziyun: '/logos/梯子云256x256.png',
  lingdong: '/logos/灵动云256x256.png',
  yinxingren: '/logos/隐形人256x256.png'
};

const ACCENT_COLORS = {
  guangsu: '#0EA5E9',
  muguang: '#6366F1',
  feimao: '#F59E0B',
  weifeng: '#14B8A6',
  dalaoyun: '#64748B',
  xingdaomeng: '#3B82F6',
  xiaoming: '#10B981',
  ermao: '#F97316',
  wuyou: '#06B6D4',
  weitu: '#EC4899',
  firefly: '#EAB308',
  yuzhou: '#8B5CF6',
  u1s1: '#22C55E',
  lingmao: '#A855F7',
  jilian: '#0284C7',
  guangnian: '#2563EB',
  yifan: '#0D9488',
  sogo: '#0891B2',
  kexin: '#34D399',
  sujie: '#38BDF8',
  shanyue: '#4F46E5',
  quanqiu: '#0369A1',
  shandianshu: '#FBBF24',
  yunjiexian: '#94A3B8',
  liulianyun: '#84CC16',
  shenxing: '#2DD4BF',
  huanqiuti: '#60A5FA',
  yinxingren: '#475569',
  tiziyun: '#0EA5E9',
  lingdong: '#7C3AED',
  langwang: '#1D4ED8',
  edgenova: '#059669',
  kuaili: '#FB923C'
};

const SPEEDTEST_FILES = {
  sogo: 'SOGO云-节点测速实测.png',
  u1s1: 'U1S1-节点测速实测.png',
  yifan: '一翻云-节点测速实测.png',
  ermao: '二猫云-节点测速实测.png',
  guangnian: '光年梯-节点测速实测.png',
  guangsu: '光速云-节点测速实测.png',
  quanqiu: '全球云-节点测速实测.png',
  kexin: '可信云-节点测速实测.png',
  weitu: '唯兔云-节点测速实测.png',
  yuzhou: '宇宙云-节点测速实测.png',
  kuaili: '快狸-节点测速实测.png',
  xingdaomeng: '星岛梦-节点测速实测.png',
  jilian: '极连云-节点测速实测.png',
  lingmao: '灵猫网络-节点测速实测.png',
  sujie: '速界-节点测速实测.png',
  feimao: '飞猫云-节点测速实测.png',
  weifeng: '微风-节点测速实测.png'
};

// Parse helper
function parsePlans(lines) {
  const plans = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('套餐名称') || trimmed.startsWith('套餐名') || trimmed.startsWith('待补充')) continue;
    const cols = trimmed.split(/\t+|\s{2,}/).map(s => s.trim()).filter(Boolean);
    if (cols.length >= 5) {
      plans.push({
        name: cols[0],
        billingCycle: cols[1],
        priceText: cols[2],
        priceNum: parseFloat(cols[2].replace(/[^\d.]/g, '')) || null,
        trafficQuota: cols[3],
        trafficResetCycle: cols[4],
        dataStatus: 'vendor'
      });
    } else if (cols.length === 4 && cols[3].includes('不过期')) {
      plans.push({
        name: cols[0],
        billingCycle: cols[1],
        priceText: cols[2],
        priceNum: parseFloat(cols[2].replace(/[^\d.]/g, '')) || null,
        trafficQuota: cols[3].replace('不过期', '').trim(),
        trafficResetCycle: '一次性（不过期）',
        dataStatus: 'vendor'
      });
    }
  }
  return plans;
}

function parseSpeed20261019(lines) {
  const rows = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('节点') || trimmed.startsWith('暂无')) continue;
    const cols = trimmed.split(/\t+|\s{2,}/).map(s => s.trim()).filter(Boolean);
    if (cols.length >= 3 && (cols[1].includes('ms') || cols[1] === '—')) {
      rows.push({
        region: cols[0],
        latency: cols[1],
        download: cols[2]
      });
    }
  }
  return rows;
}

// Section splitting
const markers = [
  { slug: 'guangsu', name: '光速云', aliases: ['LightSpeed'], startPattern: /^主推## 1\. 光速云/m },
  { slug: 'muguang', name: '暮光加速', aliases: ['muguang', 'Twilight'], startPattern: /^## 2\. 暮光加速/m },
  { slug: 'feimao', name: '飞猫云', aliases: ['feimao', 'FlyCat'], startPattern: /^## 3\. 飞猫云/m },
  { slug: 'weifeng', name: '微风网络', aliases: ['weifeng', 'BreezeNet'], startPattern: /^## 4\. 微风网络/m },
  { slug: 'dalaoyun', name: '大佬云', aliases: ['dalaoyun'], startPattern: /^## 5\. 大佬云/m },
  { slug: 'xingdaomeng', name: '星岛梦', aliases: ['xingdaomeng'], startPattern: /^## 6\. 星岛梦/m },
  { slug: 'xiaoming', name: '小明Cloud', aliases: ['小明云'], startPattern: /^小明Cloud/m },
  { slug: 'ermao', name: '二猫云', aliases: ['ermao'], startPattern: /^## 7\. 二猫云/m },
  { slug: 'wuyou', name: '无忧链接', aliases: ['wuyou', 'WorryFree'], startPattern: /^## 7\. 无忧链接/m },
  { slug: 'weitu', name: '唯兔云', aliases: ['weitu', 'V2云'], startPattern: /^## 7\. 唯兔云/m },
  { slug: 'firefly', name: 'Firefly', aliases: ['Firefly 萤火虫', '萤火虫'], startPattern: /^## 8\. Firefly/m },
  { slug: 'yuzhou', name: '宇宙云', aliases: ['yuzhou', 'YuzouCloud'], startPattern: /^## 10\. 宇宙云/m },
  { slug: 'u1s1', name: 'U1S1', aliases: ['u1s1'], startPattern: /^## 11\. U1S1/m },
  { slug: 'lingmao', name: '灵猫网络', aliases: ['lingmao', 'CivetNet'], startPattern: /^## 12\. 灵猫网络/m },
  { slug: 'jilian', name: '极连云', aliases: ['jilian'], startPattern: /^## 13\. 极连云/m },
  { slug: 'guangnian', name: '光年梯', aliases: ['guangnian'], startPattern: /^## 14\. 光年梯/m },
  { slug: 'yifan', name: '一翻云', aliases: ['yifan', '1Fly'], startPattern: /^## 15\. 一翻云/m },
  { slug: 'sogo', name: 'SOGO 云', aliases: ['sogo', 'SOGO云', 'SOGO狗云'], startPattern: /^## 16\. SOGO 云/m },
  { slug: 'kexin', name: '可信云', aliases: ['kexin', 'Kosing'], startPattern: /^## 17\. 可信云/m },
  { slug: 'sujie', name: '速界', aliases: ['sujie', 'SpeedWorld'], startPattern: /^## 18\. 速界/m },
  { slug: 'shanyue', name: '闪跃', aliases: ['shanyue', 'FlashLeap'], startPattern: /^## 19\. 闪跃/m },
  { slug: 'quanqiu', name: '全球云', aliases: ['quanqiu'], startPattern: /^## 20\. 全球云/m },
  { slug: 'shandianshu', name: '闪电鼠', aliases: ['shandianshu'], startPattern: /^## 21\. 闪电鼠/m },
  { slug: 'yunjiexian', name: '云界线', aliases: ['yunjiexian'], startPattern: /^## 23\. 云界线/m },
  { slug: 'liulianyun', name: '榴莲云', aliases: ['liulianyun'], startPattern: /^## 24\. 榴莲云/m },
  { slug: 'shenxing', name: '神行加速', aliases: ['shenxing'], startPattern: /^## 25\. 神行加速/m },
  { slug: 'huanqiuti', name: '环球梯', aliases: ['huanqiuti'], startPattern: /^## 26\. 环球梯/m },
  { slug: 'yinxingren', name: '隐形人', aliases: ['yinxingren'], startPattern: /^## 27\. 隐形人/m },
  { slug: 'tiziyun', name: '梯子云', aliases: ['tiziyun'], startPattern: /^## 28\. 梯子云/m },
  { slug: 'lingdong', name: '灵动云', aliases: ['lingdong'], startPattern: /^\s*灵动云\s*$/m },
  { slug: 'langwang', name: '浪网', aliases: ['langwang', 'WaveNet'], startPattern: /^\s*浪网\s*$/m },
  { slug: 'edgenova', name: '边缘节点 EdgeNova', aliases: ['EdgeNova', '边缘节点'], startPattern: /^\s*边缘节点 EdgeNova\s*$/m },
  { slug: 'firefly_alias', name: 'Firefly 萤火虫', aliases: ['Firefly'], startPattern: /^\s*Firefly 萤火虫\s*$/m }
];

const located = markers.map(m => {
  const match = brandListText.match(m.startPattern);
  return { ...m, index: match ? match.index : -1 };
}).filter(m => m.index >= 0).sort((a, b) => a.index - b.index);

const tableStart = brandListText.indexOf('## 完整数据表');
const complianceEnd = brandListText.indexOf('## 合规提醒', tableStart);

const sections = {};
for (let i = 0; i < located.length; i++) {
  const curr = located[i];
  let end = i + 1 < located.length ? located[i + 1].index : brandListText.length;
  if (curr.index < tableStart && end > tableStart) {
    end = tableStart;
  }
  if (curr.index > complianceEnd && complianceEnd > 0) {
    // appended blocks
  }
  sections[curr.slug] = brandListText.slice(curr.index, end).trim();
}

// Parse summary table
const summaryTable = {};
const tableBlock = brandListText.slice(tableStart, complianceEnd);
for (const line of tableBlock.split('\n')) {
  if (!line.startsWith('|') || line.startsWith('| #') || line.startsWith('|---')) continue;
  const cells = line.split('|').map(c => c.trim()).filter(Boolean);
  if (cells.length >= 5) {
    const bName = cells[1];
    const url = cells[2].replace(/`/g, '');
    const coupon = cells[3].replace(/`/g, '');
    const usp = cells[4];
    summaryTable[bName] = { url, coupon, usp };
  }
}

// Extract fields from block
function extractBrand(slug, name, aliases, raw) {
  const lines = raw.split(/\r?\n/);
  const urlMatch = raw.match(/https?:\/\/[^\s`]+/);
  const affiliateUrl = urlMatch ? urlMatch[0] : null;
  const couponMatches = [...raw.matchAll(/优惠码[：:\s]*`?([A-Za-z0-9_-]+)`?/g)].map(m => m[1]).filter(c => c !== '优惠码尚未核实');
  const yearMatch = raw.match(/(\d{4})\s*年(?:运营|开业|起运营|成立)/);
  const foundedYear = yearMatch ? parseInt(yearMatch[1], 10) : null;

  // Plans
  const planStart = lines.findIndex(l => l.includes('套餐价格'));
  const speedStart = lines.findIndex(l => l.startsWith('测速'));
  const unlockStart = lines.findIndex(l => l.startsWith('流媒体 & AI 解锁'));
  let pricingPlans = [];
  if (planStart >= 0) {
    const planEnd = speedStart > planStart ? speedStart : (unlockStart > planStart ? unlockStart : lines.length);
    pricingPlans = parsePlans(lines.slice(planStart + 1, planEnd));
  }
  if (pricingPlans.length === 0) {
    const entryMatch = raw.match(/(年付约|月付|入门)?\s*(\d+(?:\.\d+)?)\s*元\/月\s+(\d+(?:\.\d+)?(?:GB|TB)(?:\/月)?)/);
    if (entryMatch) {
      const isAnnual = raw.includes('年付约') || raw.includes('年付');
      pricingPlans.push({
        name: isAnnual ? '年付入门参考档（待核实官网全表）' : '月付入门参考档（待核实官网全表）',
        billingCycle: isAnnual ? '年付折算' : '月付',
        priceText: `¥${entryMatch[2]}/月`,
        priceNum: parseFloat(entryMatch[2]),
        trafficQuota: entryMatch[3].replace('/月', ''),
        trafficResetCycle: '每月',
        dataStatus: 'supplied'
      });
    }
  }

  // Speed 2026-10-19
  let speed20261019 = [];
  if (speedStart >= 0) {
    const speedEnd = unlockStart > speedStart ? unlockStart : lines.length;
    speed20261019 = parseSpeed20261019(lines.slice(speedStart + 1, speedEnd));
  }

  // Unlock block
  let unlockSupported = [];
  let unlockNodeDependent = [];
  if (unlockStart >= 0) {
    const introIdx = lines.findIndex((l, idx) => idx > unlockStart && (l.startsWith('介绍说明') || l.startsWith('资料说明')));
    const unlockSlice = lines.slice(unlockStart + 1, introIdx > unlockStart ? introIdx : lines.length);
    for (const l of unlockSlice) {
      if (l.includes('支持：') && !l.includes('待核实')) {
        unlockSupported = l.replace(/.*支持：/, '').split(/[、,，]/).map(s => s.trim()).filter(Boolean);
      }
      if (l.includes('视节点而定：') && !l.includes('待核实')) {
        unlockNodeDependent = l.replace(/.*视节点而定：/, '').split(/[、,，]/).map(s => s.trim()).filter(Boolean);
      }
    }
  }

  // Protocols & network
  const protocols = [];
  for (const p of ['VLESS', 'VLESS-Reality', 'Trojan', 'Shadowsocks', 'Hysteria 2', 'AnyTLS']) {
    if (new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(raw)) {
      protocols.push(p);
    }
  }
  const networkTypes = [];
  for (const nt of ['IEPL', 'IPLC', 'BGP', '中转', '直连', '原生 IP', '原生住宅 IP', '三网精品']) {
    if (raw.includes(nt)) networkTypes.push(nt);
  }

  // Client support mode
  const hasProprietary = raw.includes('自研客户端') || raw.includes('专属客户端') || raw.includes('独家定制客户端') || raw.includes('自带客户端');
  const thirdPartyForbidden = raw.includes('不提供订阅链接') || raw.includes('不提供第三方订阅') || raw.includes('第三方客户端用不了') || raw.includes('不用配订阅') || raw.includes('不用找订阅链接') || raw.includes('不用折腾订阅配置');
  const supportsThirdParty = !thirdPartyForbidden && (raw.includes('第三方订阅') || raw.includes('支持第三方') || raw.includes('通用订阅') || raw.includes('Clash') || raw.includes('Shadowrocket'));

  // Intro text
  const introMatch = raw.match(/介绍说明[：:\s]*([\s\S]*?)(?=待核实信息|---|$)/);
  const intro = introMatch ? introMatch[1].trim() : '';

  return {
    slug,
    brandName: name,
    brandAliases: aliases,
    isFeatured: slug === 'guangsu',
    priorityRank: slug === 'guangsu' ? 1 : null,
    accentColor: ACCENT_COLORS[slug] || '#0EA5E9',
    logo: LOGOS[slug] || null,
    officialWebsite: null,
    affiliateUrl,
    couponCodes: [...new Set(couponMatches)],
    couponCode: couponMatches[0] || null,
    foundedYear,
    serviceStatus: 'active-in-source',
    pricingPlans,
    networkTypes: [...new Set(networkTypes)],
    protocols: [...new Set(protocols)],
    proprietaryClient: hasProprietary,
    thirdPartyClientSupport: thirdPartyForbidden ? false : (supportsThirdParty ? true : null),
    clientSupportNote: thirdPartyForbidden
      ? '仅支持官方专属客户端，不提供第三方订阅链接（Clash/Shadowrocket 不可直接导入）'
      : (hasProprietary && supportsThirdParty ? '提供自研/专属客户端，同时支持第三方客户端订阅导入' : (supportsThirdParty ? '支持第三方通用客户端订阅导入' : '客户端与订阅支持方式待核实')),
    aiAvailability: {
      supportedClaimed: unlockSupported.filter(x => ['ChatGPT', 'Claude', 'Gemini'].includes(x)),
      nodeDependentClaimed: unlockNodeDependent.filter(x => ['ChatGPT', 'Claude', 'Gemini'].includes(x)),
      dataStatus: unlockSupported.length || unlockNodeDependent.length ? 'supplied' : 'unverified'
    },
    streamingAvailability: {
      supportedClaimed: unlockSupported.filter(x => !['ChatGPT', 'Claude', 'Gemini'].includes(x)),
      nodeDependentClaimed: unlockNodeDependent.filter(x => !['ChatGPT', 'Claude', 'Gemini'].includes(x)),
      dataStatus: unlockSupported.length || unlockNodeDependent.length ? 'supplied' : 'unverified'
    },
    speed20261019: speed20261019.length ? {
      date: '2026-10-19',
      condition: '非晚高峰（原文标注）',
      dataStatus: 'supplied',
      rows: speed20261019
    } : null,
    introSummary: intro,
    rawSnippetLength: raw.length
  };
}

const brands = [];
let rank = 1;
for (const m of markers) {
  if (m.slug === 'firefly_alias') continue;
  const raw = sections[m.slug] || '';
  const b = extractBrand(m.slug, m.name, m.aliases, raw);
  b.priorityRank = rank++;
  brands.push(b);
}

// Add 快狸 from speedtest-manifest & logos
brands.push({
  slug: 'kuaili',
  brandName: '快狸',
  brandAliases: ['Kuaili', 'KuailiCloud'],
  isFeatured: false,
  priorityRank: rank++,
  accentColor: ACCENT_COLORS.kuaili,
  logo: LOGOS.kuaili,
  officialWebsite: null,
  affiliateUrl: null,
  couponCodes: [],
  couponCode: null,
  foundedYear: null,
  serviceStatus: 'unverified-catalog',
  pricingPlans: [],
  networkTypes: [],
  protocols: ['VLESS'],
  proprietaryClient: null,
  thirdPartyClientSupport: null,
  clientSupportNote: '品牌文字资料与套餐尚未录入，仅保留 2026-08-11 节点测速实测截图与 Logo。',
  aiAvailability: { supportedClaimed: [], nodeDependentClaimed: [], dataStatus: 'not_tested' },
  streamingAvailability: { supportedClaimed: [], nodeDependentClaimed: [], dataStatus: 'not_tested' },
  speed20261019: null,
  introSummary: '快狸目前在本站资料库中保留了 2026-08-11 19:52:22 CST 的 VLESS 协议节点测速实测截图（主端 4.3.3 / 喵速 4.7.0，珠海联通 9Gbps 测试后端）及品牌主图，尚缺官网套餐、优惠码及公开注册入口。',
  rawSnippetLength: 0
});

// Enrich with conflicts, 2026-08-11 speedtest evidence, 2026-08-19 Guangsu evidence, and detailed dataStatus
const conflicts = [];

for (const b of brands) {
  // Link speedtest 2026-08-11 screenshot
  const stFile = SPEEDTEST_FILES[b.slug];
  const manifestItem = manifest.assets.find(a => a.brand.replace(/\s+/g, '') === b.brandName.replace(/\s+/g, ''));
  if (stFile) {
    b.speedtest20260811 = {
      image: `/reports/speedtest-2026-08-11/${stFile}`,
      testedAt: manifestItem ? manifestItem.testedAt : (b.slug === 'weifeng' ? '2026-08-11（具体时刻待从原图底部核对）' : null),
      protocolDisplayed: manifestItem ? manifestItem.protocolDisplayed : '待核对（微风图片未列入 manifest）',
      toolFamily: manifestItem ? manifestItem.toolFamily : '待核对',
      dateConfidence: manifestItem ? manifestItem.dateConfidence : 'unlisted-in-manifest',
      dataStatus: 'measured',
      reviewStatus: 'review-required',
      limitation: '单日单次快照，仅代表截图所示时间点与测试后端表现，不能证明长期稳定性或 AI/流媒体解锁。'
    };
  } else {
    b.speedtest20260811 = null;
  }

  // Specific conflicts & enrichments
  b.conflicts = [];
  b.dataSources = ['推广机场品牌清单.txt'];
  if (stFile) b.dataSources.push('机场测速实测资料包_2026-08-11_发布整理版_V2.zip');
  if (b.logo) b.dataSources.push(`logos/${path.basename(b.logo)}`);

  if (b.slug === 'guangsu') {
    b.dataSources.unshift('主推光速云品牌信息.txt', '光速云测试图解锁图/*.jpg');
    b.regions = ['香港×20', '台湾×5', '日本×10', '新加坡×10', '美国×10', '马来西亚×2', '英国', '法国', '德国', '土耳其', '泰国', '巴西'];
    b.paymentMethods = ['支付宝', '微信', 'USDT'];
    b.supportChannels = ['7×24 运维/客服（品牌资料说明）'];
    b.refundPolicy = '特殊商品/常规套餐不支持退款（资料提醒先买月付或小额测试）';
    b.conflicts.push({
      id: 'CONF-GUANGSU-LITE-TRAFFIC',
      field: 'pricingPlans (轻量版月流量)',
      sourceA: '主推光速云品牌信息.txt 第8行：年付折合约 8元/月，59GB',
      sourceB: '主推光速云品牌信息.txt 第26行 & 推广机场品牌清单.txt 第23行：轻量版 ¥99/年，69GB/月',
      status: 'conflict',
      handling: '正文双版本并列标注，以确认官网实时页面为准，不擅自删改任一来源。'
    });
    b.conflicts.push({
      id: 'CONF-GUANGSU-PLAN-COUNT',
      field: 'pricingPlans 档位数量',
      sourceA: '推广机场品牌清单.txt 表格含 7 档（含流光版 ¥34/268GB、量子版 ¥68/568GB、无界版 ¥138/900GB）',
      sourceB: '主推光速云品牌信息.txt 详表仅展开 4 档（147永久、轻量、极速、定制）',
      status: 'conflict',
      handling: '合并展示全部 7 档，并标注部分档位来自《推广机场品牌清单》原文。'
    });
    b.guangsu20260819Tests = [
      {
        id: 'GS-20260819-CT',
        title: '长沙电信 2Gbps 普通测速与流媒体/AI 解锁（62/62 节点）',
        image: '/reports/guangsu-2026-08-19/photo_2026-08-19_12-13-01.jpg',
        date: '2026-08-19',
        isp: 'A-长沙电信@2Gbps（线程=6）',
        tool: 'MiaoKo 自定义测试 (normalspeed) / 主端 4.3.3 (697) 喵速 SC-2.3.1',
        protocol: 'Shadowsocks',
        highlights: '日本/新加坡/香港节点平均速度约 35–49 MB/s；日本/新加坡/美国节点可解锁 Disney+、Netflix、YouTube、OpenAI；香港专线节点 Disney+/Netflix/YouTube 显示解锁(HK)，OpenAI 显示仅APP(HK)，Gemini 失败；新加坡/马来西亚/土耳其节点支持 Gemini。'
      },
      {
        id: 'GS-20260819-CMCC',
        title: '广西移动 2Gbps 普通测速与流媒体/AI 解锁（62/62 节点）',
        image: '/reports/guangsu-2026-08-19/photo_2026-08-19_12-13-50.jpg',
        date: '2026-08-19',
        isp: 'A-广西移动@2Gbps（线程=6）',
        tool: 'MiaoKo 自定义测试 (normalspeed) / 主端 4.3.3 (697) 喵速 SC-2.3.1',
        protocol: 'Shadowsocks',
        highlights: '新加坡/日本/香港最高节点平均速度达 42–53 MB/s；德国01 异常仅 43.08 KB/s；台湾节点 Disney+ 显示失败、Netflix 解锁(TW)、YouTube 解锁(US)。'
      },
      {
        id: 'GS-20260819-CU',
        title: '河北联通 2Gbps 普通测速与流媒体/AI 解锁（62/62 节点）',
        image: '/reports/guangsu-2026-08-19/photo_2026-08-19_12-13-58.jpg',
        date: '2026-08-19',
        isp: '河北联通@2Gbps（线程=6）',
        tool: 'MiaoKo 自定义测试 (normalspeed) / 主端 4.3.3 (697) 喵速 SC-2.3.1',
        protocol: 'Shadowsocks',
        highlights: '新加坡01 平均 41.85 MB/s，台湾03 37.49 MB/s，部分香港专线 HTTPS 延迟达 1200ms+（节点间波动可见）。'
      },
      {
        id: 'GS-20260819-MEDIA',
        title: '珠海联通 9Gbps 单线程 基础流媒体专题测试（70/70 节点）',
        image: '/reports/guangsu-2026-08-19/photo_2026-08-19_12-18-40.jpg',
        date: '2026-08-19',
        isp: '珠海联通 9Gbps 单线程（[A14-1]）',
        tool: 'MiaoKo 自定义测试 (test - 基础流媒体) / 主端 4.3.3 (696) 喵速 4.7.0',
        protocol: 'Vless / AnyTLS（含电信专属入口）',
        highlights: '日本/美国/香港 YouTube 正常解锁；新加坡与台湾节点在该次测试中 YouTube 显示“送中(CN)”，Netflix 显示解锁(SG/GB)，TikTok 多节点显示解锁或部分失败，Bilibili 全线解锁港澳台地区。'
      },
      {
        id: 'GS-20260819-SPEED',
        title: '珠海联通 9Gbps 单线程 VLESS 订阅测速（70/70 节点）',
        image: '/reports/guangsu-2026-08-19/photo_2026-08-19_12-20-10.jpg',
        date: '2026-08-19',
        isp: '珠海联通 9Gbps 单线程（[A14-1]）',
        tool: 'MiaoKo 自定义测试 (speed - 订阅速度) / 主端 4.3.3 (696) 喵速 4.7.0',
        protocol: 'Vless',
        highlights: '香港节点平均约 375–424 MB/s（最高 500.78 MB/s），美国多节点 313–358 MB/s（美国02 为 1.60 KB/s 异常值），新加坡 220–315 MB/s，日本约 98–104 MB/s，UDP 类型多为 FullCone。'
      }
    ];
  }

  if (b.slug === 'muguang') {
    b.conflicts.push({
      id: 'CONF-MUGUANG-COUPON',
      field: 'couponCode',
      sourceA: '推广机场品牌清单.txt 第52行及汇总表：优惠码 muguang5555',
      sourceB: '推广机场品牌清单.txt 第84行介绍说明：“目前没有查到公开的优惠码信息”',
      status: 'conflict',
      handling: '展示优惠码 muguang5555 并标注介绍原文存在无公开优惠码的冲突描述，待下单前核实。'
    });
    b.conflicts.push({
      id: 'CONF-MUGUANG-ENTRY-PRICE',
      field: '入门价格描述',
      sourceA: '介绍说明称“9 元/月起”（年付 ¥109/年折算约 ¥9.08/月）',
      sourceB: '基础数据称“20元/月 120GB/月”（普通月付起步价）',
      status: 'conflict',
      handling: '明确区分年付折算月均价（约 ¥9.08/月）与普通月付最低价（¥20/月）。'
    });
  }

  if (b.slug === 'xiaoming') {
    b.conflicts.push({
      id: 'CONF-XIAOMING-SPEED-COPY',
      field: '2026-10-19 测速数据',
      sourceA: '小明Cloud 段落 2026-10-19 测速表（HK 22ms/529Mbps, TW 41ms/114Mbps, SG 46ms/387Mbps, JP 57ms/135Mbps, US 143ms/18Mbps）',
      sourceB: '光速云 段落 2026-10-19 测速表完全一字不差',
      status: 'conflict',
      handling: '标记为疑似文档模板误贴冲突数据，不可作为小明Cloud 独立测速依据。'
    });
  }

  if (b.slug === 'firefly') {
    b.conflicts.push({
      id: 'CONF-FIREFLY-ALIAS-AFF',
      field: '品牌别名与双重推广链接',
      sourceA: '正文章节 #8 Firefly：https://vip02.fireflyaff.com/#/?code=2n7VURre',
      sourceB: '文末补充章节 Firefly 萤火虫：https://vip02.fireflyaff.com/#/?code=jTp9wSgZ',
      status: 'conflict',
      handling: '合并为同一品牌实体（Firefly / Firefly 萤火虫），主链接保留 #8 段落的 2n7VURre，同时记录历史补充链接 jTp9wSgZ。'
    });
  }

  if (b.slug === 'lingmao') {
    b.conflicts.push({
      id: 'CONF-LINGMAO-COUPON',
      field: 'couponCode & 协议',
      sourceA: '基础数据与汇总表：优惠码 lmao888；基础信息：优惠码 lingmao（8折，年付小包不适用）',
      sourceB: '协议原文未标注，但 2026-08-11 截图显示 Shadowsocks',
      status: 'conflict',
      handling: '同时列出 lmao888 与 lingmao 两个优惠码供测试，并注明协议尚未统一核实。'
    });
  }

  if (b.slug === 'yifan') {
    b.conflicts.push({
      id: 'CONF-YIFAN-COUPON',
      field: 'couponCode',
      sourceA: '基础数据与汇总表：yfy6666',
      sourceB: '介绍说明：1FLYYUN（9折）',
      status: 'conflict',
      handling: '双优惠码均保留并标注来源差异。'
    });
  }

  if (b.slug === 'sogo') {
    b.conflicts.push({
      id: 'CONF-SOGO-COUPON',
      field: 'couponCode',
      sourceA: '基础信息与介绍说明：SOGO10000（9折）',
      sourceB: '汇总表：sss777',
      status: 'conflict',
      handling: '双优惠码均保留并标注来源冲突。'
    });
  }

  if (b.slug === 'quanqiu') {
    b.conflicts.push({
      id: 'CONF-QUANQIU-COUPON',
      field: 'couponCode',
      sourceA: '基础信息：qq88（8折）',
      sourceB: '汇总表：qqy7777',
      status: 'conflict',
      handling: '双优惠码均保留并标注来源冲突。'
    });
  }

  if (b.slug === 'yunjiexian') {
    b.conflicts.push({
      id: 'CONF-YUNJIEXIAN-AFF',
      field: 'affiliateUrl 格式与 code 冲突',
      sourceA: '第23节正文：https://qwerty.yunjiexianaff.com/?code=aycnwNUi（缺少 #/）',
      sourceB: '汇总表：https://qwerty.yunjiexianaff.com/?code=HBaZ91c6（缺少 #/）',
      status: 'conflict',
      handling: '记录推广链接 code 冲突及 URL 缺少 #/ 路由标识的风险，提示跳转前确认页面正常打开。'
    });
  }

  if (b.slug === 'huanqiuti') {
    b.conflicts.push({
      id: 'CONF-HUANQIUTI-AFF-FORMAT',
      field: 'affiliateUrl 格式异常',
      sourceA: 'https://qwerty.huanqiutiaff.com/?code=9I4KRNPH（与其他品牌 #/?code= 格式不同，缺少 #）',
      sourceB: '常规 V2Board 面板通常使用 /#/?code=',
      status: 'conflict',
      handling: '保留原始链接并提醒访问异常处理。'
    });
  }

  if (b.slug === 'yinxingren') {
    b.conflicts.push({
      id: 'CONF-YINXINGREN-COUPON',
      field: 'couponCode',
      sourceA: '基础数据与汇总表：yxr888',
      sourceB: '基础信息与介绍说明：moon80（8折）',
      status: 'conflict',
      handling: '双优惠码均保留并标注来源冲突。'
    });
  }

  if (b.slug === 'weifeng' && stFile) {
    b.conflicts.push({
      id: 'CONF-WEIFENG-MANIFEST',
      field: '测速截图清单遗漏',
      sourceA: '压缩包内存在 微风-节点测速实测.png',
      sourceB: 'speedtest-manifest.json 仅收录 16 家，未包含微风网络',
      status: 'conflict',
      handling: '作为补充实测证据展示，并标注尚未经过 manifest 统一时间校验。'
    });
  }

  if (b.slug === 'kexin' && stFile) {
    b.conflicts.push({
      id: 'CONF-KEXIN-DATE',
      field: '测速截图日期置信度',
      sourceA: 'speedtest-manifest.json: 可信云截图底部仅显示 15:32:35 CST，完整日期未清晰显示',
      sourceB: '按同批次压缩包暂记为 2026-08-11',
      status: 'conflict',
      handling: '页面明确标注 dateConfidence: date-inferred-from-batch-time-visible-in-image。'
    });
  }

  if (b.conflicts.length > 0) {
    conflicts.push(...b.conflicts.map(c => ({ brandSlug: b.slug, brandName: b.brandName, ...c })));
  }

  // Overall data completeness score
  const hasPlans = b.pricingPlans.length > 0;
  const hasRealSpeed = Boolean(b.speedtest20260811);
  const hasMultiIsp = b.slug === 'guangsu';
  b.dataCompleteness = hasMultiIsp ? 'high' : (hasPlans && hasRealSpeed ? 'medium-high' : (hasPlans || hasRealSpeed ? 'medium' : 'low'));
  b.dataStatus = hasMultiIsp ? 'measured' : (hasRealSpeed ? 'measured-partial' : (hasPlans ? 'vendor' : 'historical'));
  b.verifiedAt = '2026-11-27';
  b.updatedAt = '2026-11-27';
}

// Write brands.json
fs.writeFileSync(path.join(ROOT, 'data/brands.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalBrands: brands.length,
  featuredBrand: 'guangsu',
  disclosure: '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。',
  brands
}, null, 2), 'utf-8');

// Write affiliate-links.json
const affiliateLinks = brands.map(b => ({
  slug: b.slug,
  brandName: b.brandName,
  affiliateUrl: b.affiliateUrl,
  couponCodes: b.couponCodes,
  rel: 'nofollow sponsored noopener',
  target: '_blank',
  disclosure: '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。',
  hasUrlConflict: b.conflicts.some(c => c.field.includes('affiliateUrl') || c.field.includes('推广链接'))
}));
fs.writeFileSync(path.join(ROOT, 'data/affiliate-links.json'), JSON.stringify({ updatedAt: '2026-11-27', links: affiliateLinks }, null, 2), 'utf-8');

// Write pricing.json
const pricingList = [];
for (const b of brands) {
  for (const p of b.pricingPlans) {
    pricingList.push({
      brandSlug: b.slug,
      brandName: b.brandName,
      ...p,
      monthlyEquivalent: p.billingCycle === '年付' && p.priceNum ? +(p.priceNum / 12).toFixed(2) : (p.billingCycle === '月付' ? p.priceNum : null)
    });
  }
}
fs.writeFileSync(path.join(ROOT, 'data/pricing.json'), JSON.stringify({ updatedAt: '2026-11-27', totalPlans: pricingList.length, plans: pricingList }, null, 2), 'utf-8');

// Write test-records.json
const testRecords = [];
for (const b of brands) {
  if (b.speedtest20260811) {
    testRecords.push({
      id: `ST-20260811-${b.slug.toUpperCase()}`,
      brandSlug: b.slug,
      brandName: b.brandName,
      category: 'speedtest',
      testDate: '2026-08-11',
      testedAt: b.speedtest20260811.testedAt,
      protocol: b.speedtest20260811.protocolDisplayed,
      tool: b.speedtest20260811.toolFamily,
      evidenceImage: b.speedtest20260811.image,
      dataStatus: 'measured',
      reviewStatus: b.speedtest20260811.reviewStatus,
      note: b.speedtest20260811.limitation
    });
  }
  if (b.guangsu20260819Tests) {
    for (const t of b.guangsu20260819Tests) {
      testRecords.push({
        id: t.id,
        brandSlug: b.slug,
        brandName: b.brandName,
        category: 'multi-isp-and-unlock',
        testDate: t.date,
        testedAt: t.date,
        isp: t.isp,
        protocol: t.protocol,
        tool: t.tool,
        evidenceImage: t.image,
        dataStatus: 'measured',
        reviewStatus: 'approved-evidence',
        note: t.highlights
      });
    }
  }
}
fs.writeFileSync(path.join(ROOT, 'data/test-records.json'), JSON.stringify({ updatedAt: '2026-11-27', totalRecords: testRecords.length, records: testRecords }, null, 2), 'utf-8');

// Write availability-records.json
const availabilityRecords = [];
const allPlatforms = ['ChatGPT', 'Claude', 'Gemini', 'Netflix', 'Disney+', 'YouTube', 'HBO Max', 'TikTok', 'Spotify'];
for (const b of brands) {
  for (const platform of allPlatforms) {
    const isAi = ['ChatGPT', 'Claude', 'Gemini'].includes(platform);
    const sup = isAi ? b.aiAvailability.supportedClaimed : b.streamingAvailability.supportedClaimed;
    const nodeDep = isAi ? b.aiAvailability.nodeDependentClaimed : b.streamingAvailability.nodeDependentClaimed;
    let status = 'Not Tested';
    let sourceType = 'not_tested';
    let note = '尚未在受控环境下完成本站独立逐项解锁实测';

    if (b.slug === 'guangsu') {
      if (['Netflix', 'Disney+', 'YouTube', 'ChatGPT', 'Gemini', 'TikTok'].includes(platform)) {
        status = platform === 'Gemini' || platform === 'ChatGPT' || platform === 'YouTube' || platform === 'Disney+' ? 'Partial' : 'Available';
        sourceType = 'measured (2026-08-19 MiaoKo)';
        if (platform === 'ChatGPT') note = '2026-08-19 实测：日/新/美/英/法/德等节点解锁，香港专线仅 APP 可用';
        else if (platform === 'Gemini') note = '2026-08-19 实测：新加坡/马来西亚/土耳其解锁，日本/美国/香港/台湾节点多失败';
        else if (platform === 'YouTube') note = '2026-08-19 实测：香港/日本/美国正常解锁；新加坡与台湾节点在珠海联通测试中出现送中(CN)';
        else if (platform === 'Disney+') note = '2026-08-19 实测：香港/日本/新加坡/美国解锁，台湾节点失败';
        else if (platform === 'Netflix') note = '2026-08-19 实测：香港/日本/新加坡/台湾/美国/欧亚节点均有解锁显示';
        else if (platform === 'TikTok') note = '2026-08-19 实测：日/新/美/台/港部分节点解锁（香港多标注 ALISG），部分节点失败';
      } else {
        status = sup.includes(platform) ? 'Vendor Data' : 'Not Tested';
        sourceType = sup.includes(platform) ? 'vendor / supplied' : 'not_tested';
        note = sup.includes(platform) ? '品牌清单资料标注支持，尚缺 2026-08-19 同批次截图实测' : note;
      }
    } else if (sup.includes(platform)) {
      status = 'Vendor Data';
      sourceType = 'supplied / vendor';
      note = '原文资料标注支持（非本站独立逐项实测，建议结合购买前测试验证）';
    } else if (nodeDep.includes(platform)) {
      status = 'Partial';
      sourceType = 'supplied / vendor';
      note = '原文资料标注“视节点而定”，需切换指定地区节点';
    }

    availabilityRecords.push({
      brandSlug: b.slug,
      brandName: b.brandName,
      platform,
      category: isAi ? 'AI' : 'Streaming',
      status,
      sourceType,
      testDate: b.slug === 'guangsu' && sourceType.startsWith('measured') ? '2026-08-19' : null,
      note
    });
  }
}
fs.writeFileSync(path.join(ROOT, 'data/availability-records.json'), JSON.stringify({ updatedAt: '2026-11-27', totalRecords: availabilityRecords.length, records: availabilityRecords }, null, 2), 'utf-8');

// Save conflicts snapshot
fs.writeFileSync(path.join(ROOT, 'reports/raw-conflicts.json'), JSON.stringify({ generatedAt: new Date().toISOString(), count: conflicts.length, conflicts }, null, 2), 'utf-8');

console.log(`Imported ${brands.length} brands, ${pricingList.length} pricing plans, ${testRecords.length} test records, ${availabilityRecords.length} availability records, ${conflicts.length} conflicts.`);
