import fs from 'node:fs';
import path from 'node:path';

/**
 * 关键词导入与 CSV 解析工具
 * 支持从 Google Search Console / Bing Webmaster Tools 导出的 CSV 合并到 data/keyword-database.json
 * 绝不虚构搜索量：缺失搜索量统一标记为 "未知"
 */
const ROOT = process.cwd();
const brandsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/brands.json'), 'utf-8'));
const clientsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/clients.json'), 'utf-8'));

const initialSeeds = [
  // Netflix 集群
  { keyword: 'Netflix 无法播放', variants: ['奈飞看不了', 'Netflix 播放失败'], primaryKeyword: 'Netflix 无法播放', serviceEntity: 'Netflix', problemType: 'playback', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'netflix', targetUrl: '/troubleshooting/netflix-playback-error/', priority: 'P0' },
  { keyword: 'Netflix 检测到代理', variants: ['Netflix M7111-5059', 'Netflix E114', '奈飞只显示自制剧'], primaryKeyword: 'Netflix 网络错误', serviceEntity: 'Netflix', problemType: 'proxy-detection', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'netflix', targetUrl: '/troubleshooting/netflix-network-error/', priority: 'P0' },
  { keyword: 'Netflix 4K 播放要求', variants: ['奈飞 4K 怎么开', 'Netflix 画质只有 720p'], primaryKeyword: 'Netflix 4K 画质', serviceEntity: 'Netflix', problemType: 'quality', searchIntent: 'informational', userStage: 'learning', contentCluster: 'netflix', targetUrl: '/ai/netflix-4k-guide/', priority: 'P1' },
  { keyword: 'Netflix 使用指南', variants: ['奈飞地区片库差异', 'Netflix 家庭同户规则'], primaryKeyword: 'Netflix 使用指南', serviceEntity: 'Netflix', problemType: 'guide', searchIntent: 'informational', userStage: 'awareness', contentCluster: 'netflix', targetUrl: '/ai/netflix-guide/', priority: 'P0' },

  // YouTube 集群
  { keyword: 'YouTube 播放卡顿', variants: ['油管一直转圈', 'YouTube 4K 卡顿'], primaryKeyword: 'YouTube 播放卡顿', serviceEntity: 'YouTube', problemType: 'buffering', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'youtube', targetUrl: '/troubleshooting/youtube-buffering/', priority: 'P0' },
  { keyword: 'YouTube 节点送中', variants: ['YouTube 显示中国区', 'YouTube Premium 后台播放失效'], primaryKeyword: 'YouTube 送中与 CDN', serviceEntity: 'YouTube', problemType: 'region-misdetection', searchIntent: 'informational', userStage: 'problem', contentCluster: 'youtube', targetUrl: '/ai/youtube-cdn-dns/', priority: 'P0' },
  { keyword: 'YouTube 加速指南', variants: ['YouTube 4K 流畅设置', 'YouTube DNS 优化'], primaryKeyword: 'YouTube 加速', serviceEntity: 'YouTube', problemType: 'optimization', searchIntent: 'informational', userStage: 'learning', contentCluster: 'youtube', targetUrl: '/ai/youtube-guide/', priority: 'P0' },

  // Disney+ & 其他流媒体
  { keyword: 'Disney+ 无法播放', variants: ['Disney+ Error 83', 'Disney+ Error 73'], primaryKeyword: 'Disney+ 播放异常', serviceEntity: 'Disney+', problemType: 'playback', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'disney-plus', targetUrl: '/troubleshooting/disney-plus-error/', priority: 'P0' },
  { keyword: 'Disney+ 使用指南', variants: ['Disney+ 地区可用性', 'Disney+ 画质要求'], primaryKeyword: 'Disney+ 使用指南', serviceEntity: 'Disney+', problemType: 'guide', searchIntent: 'informational', userStage: 'awareness', contentCluster: 'disney-plus', targetUrl: '/ai/disney-plus-guide/', priority: 'P1' },
  { keyword: 'Spotify 无法连接', variants: ['Spotify 14天限制', 'Spotify 提示国家地区不符'], primaryKeyword: 'Spotify 无法连接', serviceEntity: 'Spotify', problemType: 'region', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'streaming-other', targetUrl: '/troubleshooting/spotify-connection/', priority: 'P1' },

  // AI 集群
  { keyword: 'ChatGPT 网络错误', variants: ['ChatGPT Something went wrong', 'ChatGPT 无法登录', 'ChatGPT 网页打不开'], primaryKeyword: 'ChatGPT 网络错误', serviceEntity: 'ChatGPT', problemType: 'network-access', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'ai-chatgpt', targetUrl: '/troubleshooting/chatgpt-network-error/', priority: 'P0' },
  { keyword: 'Claude 无法访问', variants: ['Claude 登录异常', 'Claude 账号风控'], primaryKeyword: 'Claude 无法访问', serviceEntity: 'Claude', problemType: 'access-risk', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'ai-claude', targetUrl: '/troubleshooting/claude-access-error/', priority: 'P0' },
  { keyword: 'Gemini Something went wrong', variants: ['Gemini 无法连接', 'Gemini 地区不支持'], primaryKeyword: 'Gemini Something went wrong', serviceEntity: 'Gemini', problemType: 'region-error', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'ai-gemini', targetUrl: '/troubleshooting/gemini-error/', priority: 'P0' },
  { keyword: 'AI 工具网络环境要求', variants: ['原生 IP 与机房 IP 区别', 'AI 节点 IPv6 影响'], primaryKeyword: 'AI 网络环境', serviceEntity: 'AI Tools', problemType: 'architecture', searchIntent: 'informational', userStage: 'learning', contentCluster: 'ai-network', targetUrl: '/ai/ai-network-environment/', priority: 'P0' },

  // 网络与排障集群
  { keyword: 'IEPL 和 IPLC 专线区别', variants: ['IEPL 专线是什么', 'BGP 中转与直连区别'], primaryKeyword: 'IEPL 与 IPLC 专线', serviceEntity: 'Network', problemType: 'knowledge', searchIntent: 'informational', userStage: 'learning', contentCluster: 'network', targetUrl: '/network/iepl-vs-iplc/', priority: 'P0' },
  { keyword: '节点全部超时怎么解决', variants: ['订阅更新失败', 'TUN 模式异常', '连上代理上不了网'], primaryKeyword: '节点全部超时', serviceEntity: 'Client/Network', problemType: 'timeout', searchIntent: 'informational-troubleshooting', userStage: 'problem', contentCluster: 'troubleshooting', targetUrl: '/troubleshooting/all-nodes-timeout/', priority: 'P0' },

  // 商业转化集群
  { keyword: '2026 机场推荐', variants: ['流媒体机场推荐', '稳定机场推荐', 'AI 工具机场推荐'], primaryKeyword: '机场推荐', serviceEntity: 'Airport', problemType: 'recommendation', searchIntent: 'commercial-investigation', userStage: 'consideration', contentCluster: 'recommend', targetUrl: '/recommend/', priority: 'P0' },
  { keyword: '机场套餐价格对比', variants: ['便宜机场', '月付机场', '不限时机场', '机场优惠码'], primaryKeyword: '机场套餐与价格', serviceEntity: 'Airport', problemType: 'pricing', searchIntent: 'commercial-investigation', userStage: 'decision', contentCluster: 'pricing', targetUrl: '/pricing/', priority: 'P0' }
];

const rows = initialSeeds.map(s => ({
  ...s,
  secondaryKeywords: s.variants,
  brandEntity: null,
  clientEntity: null,
  operatingSystem: null,
  region: 'Global/CN',
  canonicalUrl: `https://liumeitizhinan.biz${s.targetUrl}`,
  existingPage: true,
  searchVolume: '未知（待导入 GSC/Bing 真实数据）',
  impressions: null,
  clicks: null,
  ctr: null,
  averagePosition: null,
  conversionEvents: 0,
  source: 'curated-initial-seed',
  sourceDate: '2026-11-27',
  contentStatus: 'published',
  updatedAt: '2026-11-27'
}));

// Brand keywords
for (const b of brandsData.brands) {
  rows.push({
    keyword: `${b.brandName}评测`,
    variants: [`${b.brandName}怎么样`, `${b.brandName} Netflix`, `${b.brandName} ChatGPT`, `${b.brandName}套餐价格`],
    primaryKeyword: `${b.brandName}深度评测`,
    secondaryKeywords: [`${b.brandName}流媒体可用性`, `${b.brandName}测速`, `${b.brandName}优惠码`],
    serviceEntity: 'Netflix/YouTube/ChatGPT',
    brandEntity: b.brandName,
    clientEntity: b.thirdPartyClientSupport ? 'Clash/Shadowrocket' : '专属客户端',
    operatingSystem: 'All',
    region: 'CN-Exit',
    problemType: 'brand-evaluation',
    searchIntent: 'commercial-investigation',
    userStage: 'decision',
    contentCluster: 'brands',
    targetUrl: `/brands/${b.slug}/`,
    canonicalUrl: `https://liumeitizhinan.biz/brands/${b.slug}/`,
    existingPage: true,
    searchVolume: '未知（待导入 GSC/Bing 真实数据）',
    impressions: null,
    clicks: null,
    ctr: null,
    averagePosition: null,
    conversionEvents: 0,
    source: 'brand-database-seed',
    sourceDate: '2026-11-27',
    priority: b.isFeatured ? 'P0' : 'P1',
    contentStatus: 'published',
    updatedAt: '2026-11-27'
  });
}

// Client keywords
for (const c of clientsData.clients) {
  rows.push({
    keyword: `${c.name} 下载与配置`,
    variants: [`${c.name} 流媒体分流`, `${c.name} 教程`, `${c.name} DNS 设置`],
    primaryKeyword: `${c.name} 使用教程`,
    secondaryKeywords: [`${c.name} 订阅导入`, `${c.name} TUN 模式`],
    serviceEntity: 'Client',
    brandEntity: null,
    clientEntity: c.name,
    operatingSystem: c.platforms.join('/'),
    region: 'Global',
    problemType: 'client-setup',
    searchIntent: 'informational',
    userStage: 'learning',
    contentCluster: 'clients',
    targetUrl: `/clients/${c.slug}/`,
    canonicalUrl: `https://liumeitizhinan.biz/clients/${c.slug}/`,
    existingPage: true,
    searchVolume: '未知（待导入 GSC/Bing 真实数据）',
    impressions: null,
    clicks: null,
    ctr: null,
    averagePosition: null,
    conversionEvents: 0,
    source: 'client-database-seed',
    sourceDate: '2026-11-27',
    priority: 'P1',
    contentStatus: 'published',
    updatedAt: '2026-11-27'
  });
}

// Optional CSV import from data/gsc-import.csv or data/bing-import.csv if provided by operator
for (const csvName of ['gsc-import.csv', 'bing-import.csv']) {
  const csvPath = path.join(ROOT, 'data', csvName);
  if (fs.existsSync(csvPath)) {
    const csvLines = fs.readFileSync(csvPath, 'utf-8').split(/\r?\n/).slice(1).filter(Boolean);
    for (const line of csvLines) {
      const [kw, clicks, impressions, ctr, pos] = line.split(',').map(s => s.trim());
      if (kw) {
        rows.push({
          keyword: kw,
          variants: [],
          primaryKeyword: kw,
          secondaryKeywords: [],
          serviceEntity: null,
          brandEntity: null,
          clientEntity: null,
          operatingSystem: null,
          region: 'Unknown',
          problemType: 'imported',
          searchIntent: 'pending-classification',
          userStage: 'unknown',
          contentCluster: 'pending',
          targetUrl: null,
          canonicalUrl: null,
          existingPage: false,
          searchVolume: '未知（CSV仅含展示/点击）',
          impressions: Number(impressions) || 0,
          clicks: Number(clicks) || 0,
          ctr: ctr || null,
          averagePosition: Number(pos) || null,
          conversionEvents: 0,
          source: csvName,
          sourceDate: '2026-11-27',
          priority: 'P2',
          contentStatus: 'gap',
          updatedAt: '2026-11-27'
        });
      }
    }
  }
}

fs.writeFileSync(path.join(ROOT, 'data/keyword-database.json'), JSON.stringify({
  updatedAt: '2026-11-27',
  totalKeywords: rows.length,
  note: '无真实 GSC/Bing 搜索量数据时统一标为未知，绝不虚构月搜索量。',
  keywords: rows
}, null, 2), 'utf-8');

console.log(`Generated data/keyword-database.json with ${rows.length} keyword entries.`);
