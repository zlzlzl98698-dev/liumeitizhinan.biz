<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vitepress';
import brandsData from '../../../../data/brands.json';
import clientsData from '../../../../data/clients.json';
import geoQuestions from '../../../../data/geo-questions.json';
import DiagnosticTool from './DiagnosticTool.vue';
import FaqBlock from './FaqBlock.vue';

const router = useRouter();
const query = ref('');

const guangsu = computed(() => brandsData.brands.find((b) => b.slug === 'guangsu')!);
const comparisonBrands = computed(() =>
  brandsData.brands.filter((b) => ['feimao', 'xingdaomeng', 'muguang', 'weifeng', 'ermao', 'weitu'].includes(b.slug))
);

const homeFaqs = geoQuestions.questions.slice(0, 6).map((q) => ({
  q: q.question,
  a: q.answerSummary
}));

function triggerSearch() {
  const q = query.value.trim();
  const btn = document.querySelector<HTMLButtonElement>('.VPNavBarSearch button, .DocSearch-Button');
  if (btn && !q) {
    btn.click();
    return;
  }
  router.go(q ? `/brands/?q=${encodeURIComponent(q)}` : '/brands/');
}
</script>

<template>
  <div style="max-width: 1240px; margin: 0 auto; padding: 24px 20px 48px;">
    <!-- 1 & 2 & 3. Hero Section -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; align-items: center; padding: 24px 0 36px;">
      <div>
        <div style="display: inline-flex; align-items: center; gap: 10px; padding: 4px 12px 4px 6px; border-radius: 999px; background: rgba(2,132,199,0.1); color: #0284c7; font-size: 12.5px; font-weight: 700; margin-bottom: 14px;">
          <img src="/images/avatar.jpg" alt="流媒体指南头像" width="24" height="24" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;" />
          <span>Streaming Intelligence Hub · Network Observatory</span>
        </div>
        <h1 style="font-size: clamp(28px, 4vw, 42px); font-weight: 900; line-height: 1.2; margin: 0 0 12px; color: var(--sg-text);">
          流媒体与 AI 服务使用指南
        </h1>
        <p style="font-size: 17px; font-weight: 600; color: #0284c7; margin: 0 0 12px;">
          流媒体使用指南，从网络连接到服务选择。
        </p>
        <p style="font-size: 14.5px; line-height: 1.75; color: var(--sg-muted); margin: 0 0 20px;">
          聚焦 Netflix、YouTube、Disney+、ChatGPT、Claude、Gemini 的真实使用问题：先帮您区分账号地区、DRM 硬件、DNS 与代理分流原因，再提供客户端配置教程、2026-08 批次实测档案与 {{ brandsData.totalBrands }} 家机场品牌透明数据库。
        </p>

        <!-- Search Box -->
        <form @submit.prevent="triggerSearch" style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
          <input
            v-model="query"
            type="search"
            placeholder="输入问题或品牌，例如：Netflix 4K、ChatGPT 报错、光速云..."
            style="flex: 1; min-width: 220px; padding: 11px 14px; border-radius: 10px; border: 1px solid var(--sg-border); background: var(--sg-surface); color: var(--sg-text); font-size: 14px;"
          />
          <button type="submit" class="sg-cta-btn" style="border: none; cursor: pointer;">
            检索知识库 / 品牌
          </button>
        </form>

        <div style="display: flex; flex-wrap: wrap; gap: 10px; font-size: 13px;">
          <a href="/troubleshooting/" style="font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">播放与连接排障 →</a>
          <a href="/clients/" style="font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">客户端软件库 ({{ clientsData.clients.length }}) →</a>
          <a href="/reviews/" style="font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">独立品牌深度评测 →</a>
          <a href="/brands/" style="font-weight: 600; color: var(--vp-c-brand-1); text-decoration: none;">机场品牌数据库 ({{ brandsData.totalBrands }}) →</a>
        </div>
      </div>

      <!-- Hero Right: Original Streaming & Network Architecture Diagram -->
      <div class="sg-observatory" style="padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <span style="font-size: 12px; color: #94a3b8; font-weight: 700; letter-spacing: 0.06em;">
            STREAMING &amp; AI CONNECTION TOPOLOGY
          </span>
          <span class="sg-badge sg-badge-measured">技术排障逻辑模型</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="background: rgba(15,23,42,0.85); border: 1px solid rgba(56,189,248,0.28); border-radius: 10px; padding: 11px 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">① 终端与账号环境层</div>
              <div style="font-size: 11.5px; color: #94a3b8;">Widevine L1 / HDCP 2.2 / 浏览器 Cookie / Apple ID 与订阅区</div>
            </div>
            <a href="/ai/netflix-4k-guide/" style="font-size: 11.5px; color: #38bdf8; text-decoration: none;">查画质要求 →</a>
          </div>

          <div style="background: rgba(15,23,42,0.85); border: 1px solid rgba(56,189,248,0.28); border-radius: 10px; padding: 11px 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">② 客户端与本地接管层</div>
              <div style="font-size: 11.5px; color: #94a3b8;">Clash Verge Rev / Shadowrocket / v2rayN · TUN 模式 · DNS Fake-IP</div>
            </div>
            <a href="/guides/tun-and-dns/" style="font-size: 11.5px; color: #38bdf8; text-decoration: none;">查分流教程 →</a>
          </div>

          <div style="background: rgba(15,23,42,0.85); border: 1px solid rgba(56,189,248,0.28); border-radius: 10px; padding: 11px 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">③ 跨境传输链路层</div>
              <div style="font-size: 11.5px; color: #94a3b8;">IEPL / IPLC 专线 vs BGP 中转 vs 公网直连（影响晚高峰丢包与抖动）</div>
            </div>
            <a href="/network/iepl-vs-iplc/" style="font-size: 11.5px; color: #38bdf8; text-decoration: none;">查线路百科 →</a>
          </div>

          <div style="background: rgba(15,23,42,0.85); border: 1px solid rgba(6,182,212,0.45); border-radius: 10px; padding: 11px 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: #f8fafc;">④ 海外落地 IP 与平台风控层</div>
              <div style="font-size: 11.5px; color: #94a3b8;">原生 IP / 机房 IP / IPv6 双栈回源 / 送中识别（决定解锁结果）</div>
            </div>
            <a href="/network/native-ip-vs-datacenter/" style="font-size: 11.5px; color: #22d3ee; text-decoration: none;">查 IP 识别 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 6 Core Platform Quick Entries -->
    <section style="margin-bottom: 36px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
        <div>
          <h2 style="margin: 0; font-size: 22px;">主流流媒体与 AI 平台使用入口</h2>
          <p style="margin: 4px 0 0; font-size: 13.5px; color: var(--sg-muted);">按实际平台进入使用教程、地区规则说明与常见错误排查</p>
        </div>
        <a href="/ai/" style="font-size: 13.5px; font-weight: 600;">进入 AI 与流媒体总专题 →</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px;">
        <a href="/ai/netflix-guide/" class="sg-card" style="text-decoration: none; color: inherit;">
          <div style="font-weight: 800; font-size: 16px; color: #dc2626;">Netflix 奈飞</div>
          <p style="font-size: 12.5px; color: var(--sg-muted); margin: 6px 0 0;">4K HDR 硬件要求、自制剧限制、同户规则与代理报错排查。</p>
        </a>
        <a href="/ai/youtube-guide/" class="sg-card" style="text-decoration: none; color: inherit;">
          <div style="font-weight: 800; font-size: 16px; color: #ef4444;">YouTube 油管</div>
          <p style="font-size: 12.5px; color: var(--sg-muted); margin: 6px 0 0;">4K/8K CDN 调度、节点送中识别、QUIC 优化与 Premium 指南。</p>
        </a>
        <a href="/ai/disney-plus-guide/" class="sg-card" style="text-decoration: none; color: inherit;">
          <div style="font-weight: 800; font-size: 16px; color: #2563eb;">Disney+</div>
          <p style="font-size: 12.5px; color: var(--sg-muted); margin: 6px 0 0;">港台/新/日/美片库差异、Error 83/73 排查与设备兼容性。</p>
        </a>
        <a href="/ai/chatgpt-guide/" class="sg-card" style="text-decoration: none; color: inherit;">
          <div style="font-weight: 800; font-size: 16px; color: #10b981;">ChatGPT</div>
          <p style="font-size: 12.5px; color: var(--sg-muted); margin: 6px 0 0;">Something went wrong、网页与 App 解锁差异、TUN 接管设置。</p>
        </a>
        <a href="/ai/claude-guide/" class="sg-card" style="text-decoration: none; color: inherit;">
          <div style="font-weight: 800; font-size: 16px; color: #d97706;">Claude</div>
          <p style="font-size: 12.5px; color: var(--sg-muted); margin: 6px 0 0;">风控敏感机制、固定单节点策略与登录异常排查步骤。</p>
        </a>
        <a href="/ai/gemini-guide/" class="sg-card" style="text-decoration: none; color: inherit;">
          <div style="font-weight: 800; font-size: 16px; color: #0284c7;">Gemini</div>
          <p style="font-size: 12.5px; color: var(--sg-muted); margin: 6px 0 0;">Google 地区归属、送中 IP 修复与账号国家属性核对。</p>
        </a>
      </div>
    </section>

    <!-- 5. Interactive Diagnostic Tool -->
    <section style="margin-bottom: 36px;">
      <DiagnosticTool />
    </section>

    <!-- 6 & 7. AI Network Topic & Troubleshooting Articles -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 36px;">
      <div class="sg-card">
        <div style="font-size: 12px; font-weight: 700; color: #0284c7;">AI NETWORK ENVIRONMENT · AI 网络专题</div>
        <h2 style="margin: 6px 0 10px; font-size: 19px;">为什么 AI 工具比流媒体更容易报错？</h2>
        <p style="font-size: 13.5px; color: var(--sg-muted); line-height: 1.7; margin: 0 0 12px;">
          ChatGPT、Claude、Gemini 不仅校验地区出口（如香港受限），还会检测 ASN 机房风险、IPv6 双栈泄漏、Cloudflare 会话一致性及短时间跨国跳 IP。
        </p>
        <ul style="margin: 0 0 14px; padding-left: 18px; font-size: 13.5px; line-height: 1.8;">
          <li><a href="/ai/ai-network-environment/">AI 工具网络环境与原生/机房 IP 机制详解</a></li>
          <li><a href="/ai/ai-ipv6-dns/">IPv6 与 DNS 解析如何导致 AI 与流媒体误判地区</a></li>
          <li><a href="/ai/chatgpt-login-environment/">ChatGPT 登录验证循环与网页/App 差异排查</a></li>
        </ul>
        <a href="/recommend/ai-tools/" style="font-weight: 600; font-size: 13.5px;">查看 AI 工具网络服务筛选指南 →</a>
      </div>

      <div class="sg-card">
        <div style="font-size: 12px; font-weight: 700; color: #dc2626;">TROUBLESHOOTING · 高频故障排查</div>
        <h2 style="margin: 6px 0 10px; font-size: 19px;">按“现象 → 原因 → 步骤 → 验证”排障</h2>
        <p style="font-size: 13.5px; color: var(--sg-muted); line-height: 1.7; margin: 0 0 12px;">
          出现播放转圈或节点超时，未必是机场跑路或节点全部损坏，本地系统代理端口冲突、订阅过期与 DNS 缓存占用占了很大比例。
        </p>
        <ul style="margin: 0 0 14px; padding-left: 18px; font-size: 13.5px; line-height: 1.8;">
          <li><a href="/troubleshooting/netflix-playback-error/">Netflix 无法播放与 M7111-5059 错误全步骤排查</a></li>
          <li><a href="/troubleshooting/youtube-buffering/">YouTube 一直转圈卡顿：CDN、QUIC 与晚高峰优化</a></li>
          <li><a href="/troubleshooting/all-nodes-timeout/">节点全部超时 / 订阅更新失败 / TUN 模式异常</a></li>
          <li><a href="/troubleshooting/connected-no-internet/">客户端显示已连接但无法访问网页排查</a></li>
        </ul>
        <a href="/troubleshooting/" style="font-weight: 600; font-size: 13.5px;">浏览全部 20+ 故障排查手册 →</a>
      </div>
    </section>

    <!-- 8 & 9. Clients & Network Encyclopedia -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 36px;">
      <div class="sg-card">
        <div style="font-size: 12px; font-weight: 700; color: #0891b2;">CLIENT SOFTWARE · 全平台客户端库</div>
        <h2 style="margin: 6px 0 10px; font-size: 19px;">第三方通用客户端 vs 机场专属客户端</h2>
        <p style="font-size: 13.5px; color: var(--sg-muted); line-height: 1.7; margin: 0 0 14px;">
          已完整收录 Windows、Android、iOS、macOS、Linux 与 OpenWrt 6 大平台共 {{ clientsData.clients.length }} 款主流代理客户端（含 Mihomo、Xray、sing-box 内核），并标注维护警示（如 NekoBox Google Play 仿冒风险、Nikki OpenWrt 24.10 门槛）。
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          <a href="/clients/windows/" class="sg-badge sg-light-badge-vendor">Windows</a>
          <a href="/clients/android/" class="sg-badge sg-light-badge-vendor">Android</a>
          <a href="/clients/ios/" class="sg-badge sg-light-badge-vendor">iOS / iPadOS</a>
          <a href="/clients/macos/" class="sg-badge sg-light-badge-vendor">macOS</a>
          <a href="/clients/linux/" class="sg-badge sg-light-badge-vendor">Linux</a>
          <a href="/clients/openwrt/" class="sg-badge sg-light-badge-vendor">OpenWrt 软路由</a>
        </div>
        <a href="/clients/" style="font-weight: 600; font-size: 13.5px;">进入客户端下载与配置百科 →</a>
      </div>

      <div class="sg-card">
        <div style="font-size: 12px; font-weight: 700; color: #4f46e5;">NETWORK ENCYCLOPEDIA · 线路与 IP 百科</div>
        <h2 style="margin: 6px 0 10px; font-size: 19px;">看懂 IEPL、IPLC、BGP 与原生 IP</h2>
        <p style="font-size: 13.5px; color: var(--sg-muted); line-height: 1.7; margin: 0 0 14px;">
          搞清楚跨境传输线路与海外落地 IP 的职责边界：IEPL/IPLC 决定晚高峰低丢包与低抖动，而落地 IP 归属与纯净度才决定 Netflix、ChatGPT、Claude 是否解锁。
        </p>
        <ul style="margin: 0 0 14px; padding-left: 18px; font-size: 13.5px; line-height: 1.8;">
          <li><a href="/network/iepl-vs-iplc/">IEPL 专线与 IPLC 专线技术差异解析</a></li>
          <li><a href="/network/bgp-transit-vs-direct/">BGP 中转与公网直连为什么晚高峰差距巨大？</a></li>
          <li><a href="/network/regions-and-metrics/">香港/日本/新加坡/美国节点特性与测速单位 (MB/s vs Mbps)</a></li>
        </ul>
        <a href="/network/" style="font-weight: 600; font-size: 13.5px;">阅读完整网络技术百科 →</a>
      </div>
    </section>

    <!-- 12. Featured Brand: Guangsu Showcase -->
    <section class="sg-observatory" style="margin-bottom: 36px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; border-bottom: 1px solid rgba(148,163,184,0.18); padding-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <img :src="guangsu.logo!" alt="光速云品牌图标" width="56" height="56" style="width: 56px; height: 56px; border-radius: 12px; object-fit: cover;" />
          <div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="sg-badge sg-badge-measured">第一主推评测品牌</span>
              <span class="sg-badge sg-badge-vendor">2020年资料 · IEPL + 企业内网专线 · VLESS</span>
            </div>
            <h2 style="margin: 6px 0 0; font-size: 22px; color: #ffffff;">光速云（流媒体与 AI 多运营商实测深度档案）</h2>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <a :href="guangsu.affiliateUrl!" target="_blank" rel="nofollow sponsored noopener" class="sg-cta-btn">
            前往光速云官网注册 →
          </a>
          <span class="sg-mono" style="font-size: 12px; color: #38bdf8;">优惠码：{{ guangsu.couponCode }}（含推广链接，不影响支付价格）</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 16px;">
        <div style="background: rgba(15,23,42,0.75); border: 1px solid rgba(148,163,184,0.16); border-radius: 10px; padding: 12px;">
          <div style="font-size: 11.5px; color: #94a3b8;">已收录套餐跨度（7 档）</div>
          <div style="font-size: 14px; font-weight: 700; color: #f8fafc; margin-top: 4px;">
            ¥99/年轻量版 · ¥147永久247G · ¥25/月极速版 · ¥680/月定制
          </div>
          <div style="font-size: 11.5px; color: #fbbf24; margin-top: 4px;">
            注：轻量版原文存在 59GB vs 69GB 冲突已透明标注
          </div>
        </div>
        <div style="background: rgba(15,23,42,0.75); border: 1px solid rgba(148,163,184,0.16); border-radius: 10px; padding: 12px;">
          <div style="font-size: 11.5px; color: #94a3b8;">客户端接入支持</div>
          <div style="font-size: 14px; font-weight: 700; color: #38bdf8; margin-top: 4px;">
            自研客户端 + Clash / Shadowrocket 订阅导入
          </div>
          <div style="font-size: 11.5px; color: #cbd5e1; margin-top: 4px;">
            12+ 国家地区节点，不限设备（品牌资料）
          </div>
        </div>
        <div style="background: rgba(15,23,42,0.75); border: 1px solid rgba(148,163,184,0.16); border-radius: 10px; padding: 12px;">
          <div style="font-size: 11.5px; color: #94a3b8;">本站实测档案数量</div>
          <div style="font-size: 14px; font-weight: 700; color: #34d399; margin-top: 4px;">
            1 张 2026-08-11 测速 + 5 张 2026-08-19 三网解锁图
          </div>
          <div style="font-size: 11.5px; color: #cbd5e1; margin-top: 4px;">
            真实保留港线 OpenAI 仅 APP、新/台 YouTube 送中等记录
          </div>
        </div>
      </div>

      <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 14px; align-items: center;">
        <a href="/reviews/guangsu/" style="color: #38bdf8; font-weight: 700; text-decoration: none; font-size: 14px;">
          阅读光速云万字独立深度评测（含 5 张三网实测图） →
        </a>
        <a href="/brands/guangsu/" style="color: #e2e8f0; font-weight: 600; text-decoration: none; font-size: 13px;">
          查看 7 档套餐与优惠码 AMM →
        </a>
        <a href="/compare/guangsu-vs-feimao/" style="color: #94a3b8; text-decoration: none; font-size: 13px;">
          光速云 vs 飞猫云 / 星岛梦对比 →
        </a>
      </div>
    </section>

    <!-- 10 & 11 & 13. Brand Database & Other Brands Comparison -->
    <section style="margin-bottom: 36px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
        <div>
          <h2 style="margin: 0; font-size: 22px;">机场品牌数据库与重点比较（共收录 {{ brandsData.totalBrands }} 家）</h2>
          <p style="margin: 4px 0 0; font-size: 13.5px; color: var(--sg-muted);">严格区分“已留存测速截图”、“品牌资料宣称”与“待核实”，不虚构排名或测速</p>
        </div>
        <a href="/brands/" style="font-size: 13.5px; font-weight: 600;">进入完整可筛选品牌库 →</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
        <div v-for="b in comparisonBrands" :key="b.slug" class="sg-card" :style="{ borderTop: `3px solid ${b.accentColor}` }">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <a :href="`/brands/${b.slug}/`" style="font-size: 16px; font-weight: 800; text-decoration: none; color: var(--sg-text);">{{ b.brandName }}</a>
            <span v-if="b.speedtest20260811" class="sg-badge sg-light-badge-measured">有 2026-08-11 截图</span>
            <span v-else class="sg-badge sg-light-badge-untested">无截图</span>
          </div>
          <div style="font-size: 12.5px; color: var(--sg-muted); line-height: 1.6; margin-bottom: 10px;">
            {{ b.networkTypes?.join(' / ') || '线路待核实' }} · {{ b.protocols?.join('/') || '协议待核实' }} · {{ b.pricingPlans?.length || 0 }} 档套餐
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
            <a :href="`/brands/${b.slug}/`" style="font-weight: 600;">深度档案 →</a>
            <span class="sg-mono" style="color: var(--sg-muted);">券: {{ b.couponCode || '待核实' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 14 & 15. Pricing & Risk Topics -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 36px;">
      <div class="sg-card">
        <div style="font-size: 12px; font-weight: 700; color: #059669;">PRICING &amp; PLANS · 价格与套餐结构</div>
        <h2 style="margin: 6px 0 10px; font-size: 19px;">算清年付折算价、不限时包与节点倍率</h2>
        <p style="font-size: 13.5px; color: var(--sg-muted); line-height: 1.7; margin: 0 0 12px;">
          “低至 ¥5.6–¥8/月”多为年付小流量包折算平均价，并非单月付价格；不限时一次性流量包不会每月清零，但通常折算单价较高。购买前先确认月付试错与退款限制。
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; font-size: 13px;">
          <a href="/pricing/">套餐价格总览 →</a>
          <a href="/pricing/billing-cycles/">月付 vs 年付 →</a>
          <a href="/pricing/pay-as-you-go/">不限时流量包 →</a>
        </div>
      </div>

      <div class="sg-card">
        <div style="font-size: 12px; font-weight: 700; color: #d97706;">RISK &amp; SAFETY · 网络安全与替代方案</div>
        <h2 style="margin: 6px 0 10px; font-size: 19px;">避免跑路盘、虚假客户端与超长年付风险</h2>
        <p style="font-size: 13.5px; color: var(--sg-muted); line-height: 1.7; margin: 0 0 12px;">
          新开机场建议坚持月付或小额流量包测试晚高峰稳定性；第三方客户端只从官方 GitHub Releases 或正版 App Store 获取，谨防 Google Play 仿冒包与订阅链接泄漏。
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; font-size: 13px;">
          <a href="/risk/">风险预警总览 →</a>
          <a href="/risk/avoid-pitfalls/">跑路与避坑清单 →</a>
          <a href="/risk/alternatives/">停服与替代方案 →</a>
        </div>
      </div>
    </section>

    <!-- 16. FAQ -->
    <section style="margin-bottom: 36px;">
      <h2 style="font-size: 22px; margin-bottom: 8px;">流媒体、AI 网络与服务选择常见问题 (FAQ)</h2>
      <p style="font-size: 13.5px; color: var(--sg-muted); margin-bottom: 12px;">
        以下问答均基于本站已建立的技术排障逻辑与历史实测档案整理，不含夸大承诺。
      </p>
      <FaqBlock :items="homeFaqs" />
    </section>

    <!-- 17. Editorial Standards & Disclosure -->
    <section class="sg-card" style="background: rgba(2, 132, 199, 0.04);">
      <h2 style="margin: 0 0 8px; font-size: 18px;">关于流媒体指南、编辑标准与推广披露</h2>
      <p style="font-size: 13.5px; line-height: 1.75; color: var(--sg-muted); margin: 0 0 12px;">
        流媒体指南 (liumeitizhinan.biz) 是一个专注于流媒体播放、AI 工具网络连接、代理客户端配置与网络服务数据档案的中文知识库。本站部分机场注册链接为推广联盟链接（统一标注 <code class="sg-mono">rel="nofollow sponsored noopener"</code>），通过链接注册可能为本站带来佣金，但不影响用户支付价格。所有历史测速截图仅代表对应测试时间点与网络后端条件，不代表长期稳定性、永久解锁或未来表现。
      </p>
      <div style="display: flex; flex-wrap: wrap; gap: 14px; font-size: 13px; font-weight: 600;">
        <a href="/about/">网站介绍 →</a>
        <a href="/editorial-standards/">编辑与数据核实标准 →</a>
        <a href="/disclosure/">推广与利益关系披露 →</a>
        <a href="/corrections/">数据冲突与更正日志 →</a>
      </div>
    </section>
  </div>
</template>
