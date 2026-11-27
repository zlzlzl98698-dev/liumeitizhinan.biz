import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://liumeitizhinan.biz';
const SITE_NAME = '流媒体指南';
const DEFAULT_DESC = '流媒体指南提供 Netflix、YouTube、Disney+、ChatGPT、Claude、Gemini 使用教程、播放异常排查、网络线路知识、客户端配置和机场品牌评测，帮助用户了解流媒体服务可用性、网络连接问题及不同网络服务的套餐特点。';

const hasAlgolia = Boolean(
  process.env.VITE_ALGOLIA_APP_ID &&
  process.env.VITE_ALGOLIA_SEARCH_API_KEY &&
  process.env.VITE_ALGOLIA_INDEX_NAME
);

const searchConfig = hasAlgolia
  ? {
      provider: 'algolia' as const,
      options: {
        appId: process.env.VITE_ALGOLIA_APP_ID!,
        apiKey: process.env.VITE_ALGOLIA_SEARCH_API_KEY!,
        indexName: process.env.VITE_ALGOLIA_INDEX_NAME!,
        placeholder: '搜索流媒体问题、AI 工具、客户端或机场品牌...',
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索全站内容' },
          modal: {
            searchBox: { resetButtonTitle: '清除', cancelButtonText: '取消' },
            noResultsScreen: { noResultsText: '未找到相关内容' },
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    }
  : {
      provider: 'local' as const,
      options: {
        _render(src: string, env: any, md: any) {
          if (env.frontmatter?.noindex) return '';
          const norm = src.replace(/\r\n/g, '\n');
          const fmMatch = norm.match(/^---\n[\s\S]*?\n---\n/);
          const fm = fmMatch ? fmMatch[0] : '';
          const body = (fmMatch ? norm.slice(fm.length) : norm)
            .replace(/```[\s\S]*?```/g, '')
            .replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, '')
            .slice(0, 1800);
          return md.render(fm + body, env);
        },
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索流媒体与品牌数据库' },
          modal: {
            displayDetails: '显示详细匹配',
            resetButtonTitle: '清除搜索条件',
            backButtonTitle: '返回',
            noResultsText: '未找到匹配词条，请尝试缩短关键词',
            footer: { selectText: '打开', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    };

// Build sidebar dynamically for structured sections
function loadJson(rel: string) {
  const full = path.resolve(process.cwd(), rel);
  return fs.existsSync(full) ? JSON.parse(fs.readFileSync(full, 'utf-8')) : null;
}

const brandsData = loadJson('data/brands.json');
const clientsData = loadJson('data/clients.json');

export default defineConfig({
  lang: 'zh-CN',
  title: SITE_NAME,
  titleTemplate: ':title｜流媒体指南',
  description: DEFAULT_DESC,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,

  vite: {
    build: {
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('data/brands.json') || id.includes('data/availability-records.json') || id.includes('data/pricing.json')) {
              return 'sg-brand-data';
            }
            if (id.includes('data/topic-navigation.json') || id.includes('data/clients.json')) {
              return 'sg-nav-data';
            }
          }
        }
      }
    }
  },

  head: [
    ['meta', { name: 'theme-color', content: '#0B1D39' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/images/avatar.jpg' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: '流媒体指南 RSS', href: `${SITE_URL}/rss.xml` }],
    ...(process.env.GOOGLE_SITE_VERIFICATION ? [['meta', { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION }] as [string, Record<string, string>]] : []),
    ...(process.env.BING_SITE_VERIFICATION ? [['meta', { name: 'msvalidate.01', content: process.env.BING_SITE_VERIFICATION }] as [string, Record<string, string>]] : []),
    ...(process.env.SHENMA_SITE_VERIFICATION ? [['meta', { name: 'shenma-site-verification', content: process.env.SHENMA_SITE_VERIFICATION }] as [string, Record<string, string>]] : []),
    ...(process.env.BAIDU_SITE_VERIFICATION ? [['meta', { name: 'baidu-site-verification', content: process.env.BAIDU_SITE_VERIFICATION }] as [string, Record<string, string>]] : [])
  ],

  sitemap: {
    hostname: SITE_URL,
    transformItems: (items) =>
      items.filter((item) => !item.url.includes('404') && !item.url.includes('/draft'))
  },

  themeConfig: {
    siteTitle: '流媒体指南',
    logo: { src: '/images/avatar.jpg', alt: '流媒体指南标识' },
    search: searchConfig,
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最近核实更新'
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '专题导航',
    darkModeSwitchLabel: '显示模式',

    nav: [
      {
        text: '机场推荐',
        activeMatch: '^/recommend/',
        items: [
          { text: '机场推荐总览', link: '/recommend/' },
          { text: '流媒体机场推荐', link: '/recommend/streaming/' },
          { text: 'AI 工具机场推荐', link: '/recommend/ai-tools/' },
          { text: '2026 稳定与老牌机场', link: '/recommend/stable/' },
          { text: '新手机场与多设备选择', link: '/recommend/beginners/' },
          { text: '光速云主推评测', link: '/brands/guangsu/' }
        ]
      },
      {
        text: '价格与套餐',
        activeMatch: '^/pricing/',
        items: [
          { text: '价格与套餐总览', link: '/pricing/' },
          { text: '便宜与高性价比套餐', link: '/pricing/budget/' },
          { text: '月付与年付对比', link: '/pricing/billing-cycles/' },
          { text: '不限时流量包指南', link: '/pricing/pay-as-you-go/' },
          { text: '倍率与退款规则说明', link: '/pricing/rules/' }
        ]
      },
      {
        text: '机场品牌',
        activeMatch: '^/(brands|compare)/',
        items: [
          { text: '机场品牌数据库大全', link: '/brands/' },
          { text: '主推：光速云深度评测', link: '/brands/guangsu/' },
          { text: '机场品牌对比中心', link: '/compare/' },
          { text: '流媒体与 AI 测试记录中心', link: '/tools/streaming-check/' }
        ]
      },
      {
        text: 'VPN与加速器',
        activeMatch: '^/vpn/',
        items: [
          { text: 'VPN 与加速器总览', link: '/vpn/' },
          { text: 'VPN 与代理机场区别', link: '/vpn/vpn-vs-proxy/' },
          { text: '各平台 VPN 与游戏加速', link: '/vpn/platforms/' }
        ]
      },
      {
        text: '客户端软件',
        activeMatch: '^/clients/',
        items: [
          { text: '客户端软件总览', link: '/clients/' },
          { text: 'Windows 客户端', link: '/clients/windows/' },
          { text: 'Android 客户端', link: '/clients/android/' },
          { text: 'iOS / iPadOS 客户端', link: '/clients/ios/' },
          { text: 'macOS 客户端', link: '/clients/macos/' },
          { text: 'Linux 客户端', link: '/clients/linux/' },
          { text: 'OpenWrt 软路由', link: '/clients/openwrt/' }
        ]
      },
      {
        text: 'AI与流媒体',
        activeMatch: '^/(ai|streaming)/',
        items: [
          { text: 'AI 与流媒体专题总览', link: '/ai/' },
          { text: 'Netflix 使用与 4K 指南', link: '/ai/netflix-guide/' },
          { text: 'YouTube 加速与送中排查', link: '/ai/youtube-guide/' },
          { text: 'Disney+ 与其他流媒体', link: '/ai/disney-plus-guide/' },
          { text: 'ChatGPT 网络访问指南', link: '/ai/chatgpt-guide/' },
          { text: 'Claude 与 Gemini 指南', link: '/ai/claude-guide/' },
          { text: 'AI 网络环境与 IP 机制', link: '/ai/ai-network-environment/' }
        ]
      },
      {
        text: '线路与节点',
        activeMatch: '^/network/',
        items: [
          { text: '线路与节点百科总览', link: '/network/' },
          { text: 'IEPL 与 IPLC 专线区别', link: '/network/iepl-vs-iplc/' },
          { text: '原生 IP 与机房 IP 解析', link: '/network/native-ip-vs-datacenter/' },
          { text: '热门地区节点与测速指标', link: '/network/regions-and-metrics/' }
        ]
      },
      {
        text: '使用教程',
        activeMatch: '^/guides/',
        items: [
          { text: '使用教程中心', link: '/guides/' },
          { text: '机场订阅导入与配置', link: '/guides/subscription-setup/' },
          { text: 'TUN 模式与 DNS 分流', link: '/guides/tun-and-dns/' },
          { text: '流媒体画质与缓冲优化', link: '/guides/streaming-optimization/' }
        ]
      },
      {
        text: '故障排查',
        activeMatch: '^/troubleshooting/',
        items: [
          { text: '故障排查总览', link: '/troubleshooting/' },
          { text: 'Netflix 无法播放与报错', link: '/troubleshooting/netflix-playback-error/' },
          { text: 'YouTube 卡顿与转圈', link: '/troubleshooting/youtube-buffering/' },
          { text: 'ChatGPT / Claude / Gemini 异常', link: '/troubleshooting/chatgpt-network-error/' },
          { text: '节点超时与订阅失败', link: '/troubleshooting/all-nodes-timeout/' }
        ]
      },
      {
        text: '风险与替代',
        activeMatch: '^/risk/',
        items: [
          { text: '风险预警与替代总览', link: '/risk/' },
          { text: '机场跑路特征与避坑指南', link: '/risk/avoid-pitfalls/' },
          { text: '退款限制、年付风险与安全', link: '/risk/account-and-refund/' },
          { text: '服务异常后的替代方案', link: '/risk/alternatives/' }
        ]
      }
    ],

    sidebar: {
      '/recommend/': [
        {
          text: '机场推荐专题',
          items: [
            { text: '2026 机场推荐总览', link: '/recommend/' },
            { text: '流媒体机场推荐', link: '/recommend/streaming/' },
            { text: 'AI 工具机场推荐', link: '/recommend/ai-tools/' },
            { text: '稳定与老牌机场筛选', link: '/recommend/stable/' },
            { text: '新手与多设备机场指南', link: '/recommend/beginners/' },
            { text: '选机场核心指标判断', link: '/recommend/how-to-choose/' },
            { text: '多设备与家庭并发指南', link: '/recommend/multi-device-guide/' },
            { text: '新手首单选月付还是年付', link: '/recommend/monthly-vs-annual-first-buy/' },
            { text: '原生 IP 与节点地区判断', link: '/recommend/node-region-check/' }
          ]
        }
      ],
      '/pricing/': [
        {
          text: '价格与套餐体系',
          items: [
            { text: '价格与套餐总览', link: '/pricing/' },
            { text: '便宜与高性价比套餐', link: '/pricing/budget/' },
            { text: '月付 vs 年付成本对比', link: '/pricing/billing-cycles/' },
            { text: '不限时一次性流量包', link: '/pricing/pay-as-you-go/' },
            { text: '倍率计算与退款规则', link: '/pricing/rules/' },
            { text: '10–20 元月付套餐选购', link: '/pricing/ten-yuan-plans/' },
            { text: '一元机场限制与风控真相', link: '/pricing/one-yuan-airport-limits/' },
            { text: '100–500GB 与倍率流量核算', link: '/pricing/traffic-and-multiplier/' },
            { text: '300GB vs 500GB 套餐怎么选', link: '/pricing/300gb-vs-500gb/' }
          ]
        }
      ],
      '/brands/': [
        {
          text: '品牌库与测试工具',
          items: [
            { text: '机场品牌数据库大全', link: '/brands/' },
            { text: '品牌对比中心', link: '/compare/' },
            { text: '流媒体与 AI 测试中心', link: '/tools/streaming-check/' }
          ]
        },
        {
          text: '主推与重点评测品牌',
          items: (brandsData?.brands || []).slice(0, 12).map((b: any) => ({
            text: b.isFeatured ? `★ ${b.brandName}（主推）` : b.brandName,
            link: `/brands/${b.slug}/`
          }))
        },
        {
          text: '全部收录品牌档案',
          collapsed: false,
          items: (brandsData?.brands || []).slice(12).map((b: any) => ({
            text: b.brandName,
            link: `/brands/${b.slug}/`
          }))
        }
      ],
      '/clients/': [
        {
          text: '按操作系统分类',
          items: [
            { text: '客户端软件总览', link: '/clients/' },
            { text: 'Windows 客户端', link: '/clients/windows/' },
            { text: 'Android 客户端', link: '/clients/android/' },
            { text: 'iOS / iPadOS 客户端', link: '/clients/ios/' },
            { text: 'macOS 客户端', link: '/clients/macos/' },
            { text: 'Linux 客户端', link: '/clients/linux/' },
            { text: 'OpenWrt 软路由', link: '/clients/openwrt/' }
          ]
        },
        {
          text: '客户端独立百科',
          collapsed: false,
          items: (clientsData?.clients || []).map((c: any) => ({
            text: c.name,
            link: `/clients/${c.slug}/`
          }))
        }
      ],
      '/ai/': [
        {
          text: '流媒体平台专题',
          items: [
            { text: 'AI 与流媒体专题总览', link: '/ai/' },
            { text: 'Netflix 使用指南', link: '/ai/netflix-guide/' },
            { text: 'Netflix 4K 播放与画质要求', link: '/ai/netflix-4k-guide/' },
            { text: 'Netflix 地区差异与账号规则', link: '/ai/netflix-regions-account/' },
            { text: 'YouTube 加速与画质指南', link: '/ai/youtube-guide/' },
            { text: 'YouTube CDN 与送中 DNS 解析', link: '/ai/youtube-cdn-dns/' },
            { text: 'Disney+ 使用与地区指南', link: '/ai/disney-plus-guide/' },
            { text: 'Prime Video 使用与区域限制', link: '/ai/prime-video-guide/' },
            { text: 'Max (HBO Max) 使用指南', link: '/ai/hbo-max-guide/' },
            { text: 'Hulu 使用与美区 IP 要求', link: '/ai/hulu-guide/' },
            { text: 'Spotify 跨区与 14 天限制', link: '/ai/spotify-guide/' },
            { text: 'TikTok 网络与环境隔离指南', link: '/ai/tiktok-guide/' },
            { text: 'Apple TV+ 与 Twitch 指南', link: '/ai/apple-tv-twitch-guide/' }
          ]
        },
        {
          text: 'AI 工具网络专题',
          items: [
            { text: 'ChatGPT 网络使用指南', link: '/ai/chatgpt-guide/' },
            { text: 'ChatGPT 登录与风控环境排查', link: '/ai/chatgpt-login-environment/' },
            { text: 'Claude 访问与风控防护指南', link: '/ai/claude-guide/' },
            { text: 'Gemini 使用与地区识别指南', link: '/ai/gemini-guide/' },
            { text: 'AI 工具网络环境与 IP 机制', link: '/ai/ai-network-environment/' },
            { text: 'IPv6 与 DNS 解析对 AI 的影响', link: '/ai/ai-ipv6-dns/' }
          ]
        }
      ],
      '/network/': [
        {
          text: '网络线路与技术百科',
          items: [
            { text: '线路与节点总览', link: '/network/' },
            { text: 'IEPL 与 IPLC 专线详解', link: '/network/iepl-vs-iplc/' },
            { text: 'BGP 中转与直连线路区别', link: '/network/bgp-transit-vs-direct/' },
            { text: '原生 IP 与数据中心 IP 区别', link: '/network/native-ip-vs-datacenter/' },
            { text: '热门地区节点与测速指标', link: '/network/regions-and-metrics/' },
            { text: '电信163/联通4837/移动CMI选线', link: '/network/three-isp-routing/' },
            { text: '如何识别未经验证的假专线', link: '/network/verify-iepl-claims/' }
          ]
        }
      ],
      '/guides/': [
        {
          text: '使用教程体系',
          items: [
            { text: '使用教程总览', link: '/guides/' },
            { text: '机场订阅导入全流程', link: '/guides/subscription-setup/' },
            { text: 'Clash Verge Rev 与 Mihomo 配置', link: '/guides/clash-mihomo-guide/' },
            { text: 'CFW 平滑迁移 Clash Verge Rev', link: '/guides/cfw-to-clash-verge/' },
            { text: 'Shadowrocket 小火箭配置', link: '/guides/shadowrocket-guide/' },
            { text: 'v2rayN 与 sing-box 使用指南', link: '/guides/v2rayn-singbox-guide/' },
            { text: 'TUN 模式、DNS 与分流规则', link: '/guides/tun-and-dns/' },
            { text: 'Claude 防封号锁单节点规则', link: '/guides/claude-fixed-node-rules/' },
            { text: 'OpenWrt 24.10 Nikki 安装配置', link: '/guides/openwrt-nikki-setup/' },
            { text: '多设备与 OpenWrt 软路由配置', link: '/guides/multi-device-router/' },
            { text: '网络检测与播放画质优化', link: '/guides/streaming-optimization/' }
          ]
        }
      ],
      '/troubleshooting/': [
        {
          text: '流媒体播放故障排查',
          items: [
            { text: '故障排查总览', link: '/troubleshooting/' },
            { text: 'Netflix 无法播放排查', link: '/troubleshooting/netflix-playback-error/' },
            { text: 'Netflix 代理报错与只看自制剧', link: '/troubleshooting/netflix-network-error/' },
            { text: 'YouTube 一直转圈与播放卡顿', link: '/troubleshooting/youtube-buffering/' },
            { text: 'YouTube 无法加载与播放错误', link: '/troubleshooting/youtube-load-error/' },
            { text: 'Disney+ 连接失败与 Error 83', link: '/troubleshooting/disney-plus-error/' },
            { text: 'Spotify 无法连接与地区提示', link: '/troubleshooting/spotify-connection/' }
          ]
        },
        {
          text: 'AI 工具连接异常排查',
          items: [
            { text: 'ChatGPT 网络错误与打不开', link: '/troubleshooting/chatgpt-network-error/' },
            { text: 'ChatGPT Something went wrong', link: '/troubleshooting/chatgpt-something-went-wrong/' },
            { text: 'Claude 无法访问与登录异常', link: '/troubleshooting/claude-access-error/' },
            { text: 'Gemini Something went wrong', link: '/troubleshooting/gemini-error/' }
          ]
        },
        {
          text: '节点、客户端与网络故障',
          items: [
            { text: '节点全部超时怎么办', link: '/troubleshooting/all-nodes-timeout/' },
            { text: '部分节点超时排查', link: '/troubleshooting/partial-nodes-timeout/' },
            { text: '订阅更新失败解决步骤', link: '/troubleshooting/subscription-update-failed/' },
            { text: 'DNS 解析错误排查', link: '/troubleshooting/dns-resolution-error/' },
            { text: 'TUN 模式异常与无法接管', link: '/troubleshooting/tun-mode-error/' },
            { text: '连接成功但无法访问外网', link: '/troubleshooting/connected-no-internet/' },
            { text: 'IPv6 网络异常导致解锁失败', link: '/troubleshooting/ipv6-leak-error/' },
            { text: '晚高峰卡顿与延迟过高优化', link: '/troubleshooting/peak-hour-congestion/' },
            { text: '客户端无法启动与更新后故障', link: '/troubleshooting/client-update-crash/' },
            { text: '频繁掉线与账号套餐异常', link: '/troubleshooting/disconnect-and-quota/' },
            { text: 'Wi-Fi 异常但 5G 可用排查', link: '/troubleshooting/wifi-vs-cellular/' }
          ]
        }
      ],
      '/risk/': [
        {
          text: '风险预警与替代方案',
          items: [
            { text: '风险与替代总览', link: '/risk/' },
            { text: '机场跑路特征与避坑指南', link: '/risk/avoid-pitfalls/' },
            { text: '临时维护与停运跑路鉴别', link: '/risk/maintenance-vs-shutdown/' },
            { text: '账号安全、IP 风险与客户端安全', link: '/risk/account-and-refund/' },
            { text: '订阅转换站 Token 泄露风险', link: '/risk/subscription-converter-risk/' },
            { text: '免费节点与年付套餐风险', link: '/risk/free-nodes-and-annual/' },
            { text: '服务异常与停止运营替代方案', link: '/risk/alternatives/' }
          ]
        }
      ],
      '/vpn/': [
        {
          text: 'VPN 与加速器专题',
          items: [
            { text: 'VPN 与加速器总览', link: '/vpn/' },
            { text: 'VPN 与代理机场核心区别', link: '/vpn/vpn-vs-proxy/' },
            { text: 'VPN 与代理共存冲突解决', link: '/vpn/dual-tunnel-conflict/' },
            { text: '手机/桌面端 VPN 与游戏加速器', link: '/vpn/platforms/' }
          ]
        }
      ],
      '/reviews/': [
        {
          text: '独立机场深度评测（12 家）',
          items: [
            { text: '品牌独立评测总览', link: '/reviews/' },
            { text: '★ 光速云万字深度评测（主推）', link: '/reviews/guangsu/' },
            { text: '飞猫云深度评测', link: '/reviews/feimao/' },
            { text: '星岛梦深度评测', link: '/reviews/xingdaomeng/' },
            { text: '二猫云深度评测', link: '/reviews/ermao/' },
            { text: '唯兔云深度评测', link: '/reviews/weitu/' },
            { text: '一翻云深度评测', link: '/reviews/yifan/' },
            { text: 'SOGO 云深度评测', link: '/reviews/sogo/' },
            { text: '全球云深度评测', link: '/reviews/quanqiu/' },
            { text: '暮光加速深度评测', link: '/reviews/muguang/' },
            { text: '微风网络深度评测', link: '/reviews/weifeng/' },
            { text: '小明Cloud 风险核查评测', link: '/reviews/xiaoming/' },
            { text: '隐形人深度评测', link: '/reviews/yinxingren/' }
          ]
        },
        {
          text: '商业档案与横向对比',
          items: [
            { text: '33 家品牌商业档案库', link: '/brands/' },
            { text: '品牌多维对比中心', link: '/compare/' }
          ]
        }
      ],
      '/compare/': [
        {
          text: '品牌与客户端深度对比（7 篇）',
          items: [
            { text: '品牌对比中心总览', link: '/compare/' },
            { text: '光速云 vs 飞猫云', link: '/compare/guangsu-vs-feimao/' },
            { text: '光速云 vs 星岛梦', link: '/compare/guangsu-vs-xingdaomeng/' },
            { text: '光速云 vs 二猫云', link: '/compare/guangsu-vs-ermao/' },
            { text: '小明Cloud vs 光速云', link: '/compare/xiaoming-vs-guangsu/' },
            { text: '梯子云 vs 隐形人', link: '/compare/tiziyun-vs-yinxingren/' },
            { text: '微风网络 vs 星岛梦', link: '/compare/weifeng-vs-xingdaomeng/' },
            { text: 'FlClash vs Clash Verge Rev', link: '/compare/flclash-vs-clash-verge/' },
            { text: '流媒体与 AI 测试记录中心', link: '/tools/streaming-check/' },
            { text: '机场品牌数据库', link: '/brands/' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '测试数据与工具中心',
          items: [
            { text: '流媒体与 AI 测试记录中心', link: '/tools/streaming-check/' },
            { text: '品牌对比中心', link: '/compare/' },
            { text: '机场品牌数据库', link: '/brands/' }
          ]
        }
      ]
    }
  },

  transformHead({ pageData }) {
    const heads: [string, Record<string, string>, string?][] = [];
    const rel = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '/');
    const cleanRel = rel === '' ? '' : (rel.startsWith('/') ? rel.slice(1) : rel);
    const canonicalUrl = `${SITE_URL}/${cleanRel}`;
    const title = pageData.title ? `${pageData.title}｜${SITE_NAME}` : `${SITE_NAME}｜Netflix、YouTube、Disney+、ChatGPT、Claude 使用教程与机场评测`;
    const desc = pageData.description || DEFAULT_DESC;

    heads.push(['link', { rel: 'canonical', href: canonicalUrl }]);
    const sectionNames: Record<string, string> = {
      recommend: '机场推荐',
      pricing: '价格与套餐',
      brands: '机场品牌',
      reviews: '品牌深度评测',
      vpn: 'VPN与加速器',
      clients: '客户端软件',
      ai: 'AI与流媒体',
      streaming: '流媒体指南',
      network: '线路与节点',
      guides: '使用教程',
      troubleshooting: '故障排查',
      risk: '风险与替代',
      compare: '品牌对比',
      tools: '测试与工具',
      about: '关于本站',
      'editorial-standards': '编辑标准',
      disclosure: '推广披露',
      corrections: '数据更正'
    };

    const formatIsoDate = (val: unknown) => {
      if (!val) return '2026-11-27';
      const s = val instanceof Date ? val.toISOString() : String(val);
      const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
      return m ? m[1] : '2026-11-27';
    };

    const isArticleType = pageData.frontmatter?.schemaType === 'Article' || pageData.frontmatter?.schemaType === 'HowTo';
    const pubDate = formatIsoDate(pageData.frontmatter?.date);
    const modDate = formatIsoDate(pageData.frontmatter?.updatedAt);

    heads.push(['meta', { property: 'og:title', content: title }]);
    heads.push(['meta', { property: 'og:description', content: desc }]);
    heads.push(['meta', { property: 'og:url', content: canonicalUrl }]);
    heads.push(['meta', { property: 'og:image', content: `${SITE_URL}/images/og-cover.jpg` }]);
    heads.push(['meta', { property: 'og:type', content: isArticleType ? 'article' : 'website' }]);
    if (isArticleType) {
      heads.push(['meta', { property: 'article:published_time', content: `${pubDate}T00:00:00+08:00` }]);
      heads.push(['meta', { property: 'article:modified_time', content: `${modDate}T00:00:00+08:00` }]);
      heads.push(['meta', { property: 'article:author', content: '流媒体指南编辑部' }]);
    }
    heads.push(['meta', { name: 'twitter:title', content: title }]);
    heads.push(['meta', { name: 'twitter:description', content: desc }]);
    heads.push(['meta', { name: 'twitter:image', content: `${SITE_URL}/images/og-cover.jpg` }]);

    if (pageData.frontmatter?.noindex) {
      heads.push(['meta', { name: 'robots', content: 'noindex, nofollow' }]);
    } else {
      heads.push(['meta', { name: 'robots', content: 'index, follow' }]);
    }

    // Build JSON-LD schemas matching page type and visible content
    const schemas: Record<string, any>[] = [];

    // Organization & WebSite on home
    if (cleanRel === '') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        alternateName: 'Streaming Guide',
        url: SITE_URL,
        logo: `${SITE_URL}/icons/logo-mark.svg`,
        description: DEFAULT_DESC
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'zh-CN',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/brands/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      });
    } else {
      // BreadcrumbList
      const parts = cleanRel.split('/').filter(Boolean);
      const itemListElement = [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_URL}/` }
      ];
      let acc = '';
      parts.forEach((p, idx) => {
        acc += `${p}/`;
        itemListElement.push({
          '@type': 'ListItem',
          position: idx + 2,
          name: idx === parts.length - 1 ? (pageData.title || sectionNames[p] || p) : (sectionNames[p] || p),
          item: `${SITE_URL}/${acc}`
        });
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement
      });
    }

    const st = pageData.frontmatter?.schemaType;
    if (st === 'Article' || st === 'HowTo') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': st === 'HowTo' ? 'TechArticle' : 'Article',
        headline: pageData.title,
        description: desc,
        image: `${SITE_URL}/images/og-cover.jpg`,
        datePublished: formatIsoDate(pageData.frontmatter?.date),
        dateModified: formatIsoDate(pageData.frontmatter?.updatedAt),
        author: { '@type': 'Organization', name: '流媒体指南编辑部' },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        mainEntityOfPage: canonicalUrl
      });
    } else if (st === 'CollectionPage') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageData.title,
        description: desc,
        url: canonicalUrl
      });
    } else if (st === 'SoftwareApplication' && pageData.frontmatter?.software) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: pageData.frontmatter.software.name,
        operatingSystem: pageData.frontmatter.software.os,
        applicationCategory: 'UtilitiesApplication',
        description: desc
      });
    }

    // Only emit FAQPage when frontmatter faqs are explicitly rendered on the page
    if (Array.isArray(pageData.frontmatter?.faqs) && pageData.frontmatter.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pageData.frontmatter.faqs.map((f: any) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      });
    }

    if (schemas.length > 0) {
      heads.push(['script', { type: 'application/ld+json' }, JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)]);
    }

    return heads;
  }
});
