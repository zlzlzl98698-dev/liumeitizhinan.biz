<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import { computed } from 'vue';

const { Layout } = DefaultTheme;
const { frontmatter, page } = useData();
const route = useRoute();

const sectionMap: Record<string, string> = {
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

const breadcrumbs = computed(() => {
  const path = route.path;
  if (path === '/' || path === '/index.html') return [];
  const segs = path.replace(/\.html$/, '').split('/').filter(Boolean);
  const crumbs = [{ name: '首页', href: '/' }];
  let acc = '';
  segs.forEach((seg, i) => {
    acc += `/${seg}`;
    const isLast = i === segs.length - 1;
    crumbs.push({
      name: isLast ? (frontmatter.value.title || page.value.title || sectionMap[seg] || seg) : (sectionMap[seg] || seg),
      href: `${acc}/`
    });
  });
  return crumbs;
});

const isDocPage = computed(() => {
  return route.path !== '/' && frontmatter.value.layout !== 'home' && !frontmatter.value.hideMetaBar;
});

function formatDate(val: unknown): string {
  if (!val) return '2026-11-27';
  const s = val instanceof Date ? val.toISOString() : String(val);
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : s;
}
</script>

<template>
  <Layout>
    <template #doc-before>
      <div v-if="isDocPage">
        <nav v-if="breadcrumbs.length" class="sg-breadcrumb" aria-label="面包屑导航">
          <template v-for="(c, idx) in breadcrumbs" :key="c.href">
            <span v-if="idx > 0">/</span>
            <a v-if="idx < breadcrumbs.length - 1" :href="c.href">{{ c.name }}</a>
            <span v-else style="font-weight: 600; color: var(--sg-text);">{{ c.name }}</span>
          </template>
        </nav>

        <div class="sg-meta-bar">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            <img src="/images/avatar.jpg" alt="流媒体指南编辑部头像" width="20" height="20" style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover;" />
            作者：{{ frontmatter.author || '流媒体指南编辑部' }}
          </span>
          <span>发布：{{ formatDate(frontmatter.date) }}</span>
          <span>更新/核实：{{ formatDate(frontmatter.updatedAt) }}</span>
          <span v-if="frontmatter.dataSource">来源：{{ frontmatter.dataSource }}</span>
        </div>
      </div>
    </template>

    <template #doc-after>
      <div v-if="isDocPage">
        <TopicClusterLinks />
      </div>
    </template>

    <template #layout-bottom>
      <footer class="sg-footer-wrap">
        <div class="sg-footer-inner">
          <div class="sg-footer-grid">
            <div>
              <div class="sg-footer-title">流媒体指南 · Streaming Guide</div>
              <p style="font-size: 13px; line-height: 1.7; color: #94a3b8; margin: 0 0 10px;">
                流媒体使用指南，从网络连接到服务选择。专注 Netflix、YouTube、Disney+、ChatGPT、Claude、Gemini 网络使用教程、客户端配置与可溯源品牌评测。
              </p>
              <p style="font-size: 12px; color: #64748b; margin: 0;">
                域名：liumeitizhinan.biz ｜ 简体中文知识库
              </p>
            </div>
            <div>
              <div class="sg-footer-title">核心专题</div>
              <ul class="sg-footer-links">
                <li><a href="/ai/">AI 与流媒体专题</a></li>
                <li><a href="/troubleshooting/">播放与连接故障排查</a></li>
                <li><a href="/clients/">代理客户端下载与教程</a></li>
                <li><a href="/network/">网络线路与 IP 百科</a></li>
                <li><a href="/guides/">客户端与分流使用教程</a></li>
              </ul>
            </div>
            <div>
              <div class="sg-footer-title">数据库与商业对比</div>
              <ul class="sg-footer-links">
                <li><a href="/reviews/">独立品牌深度评测中心</a></li>
                <li><a href="/reviews/guangsu/">主推万字评测：光速云</a></li>
                <li><a href="/brands/">机场品牌数据库（33 家）</a></li>
                <li><a href="/brands/guangsu/">光速云套餐与优惠码 AMM</a></li>
                <li><a href="/recommend/">2026 机场推荐专题</a></li>
                <li><a href="/pricing/">套餐与价格对比</a></li>
                <li><a href="/compare/">品牌多维对比中心</a></li>
                <li><a href="/tools/streaming-check/">流媒体与 AI 测试记录中心</a></li>
              </ul>
            </div>
            <div>
              <div class="sg-footer-title">透明披露与合规</div>
              <ul class="sg-footer-links">
                <li><a href="/about/">网站介绍与定位</a></li>
                <li><a href="/editorial-standards/">编辑与实测数据标准</a></li>
                <li><a href="/disclosure/">推广链接与利益披露</a></li>
                <li><a href="/corrections/">数据冲突与更正说明</a></li>
                <li><a href="/risk/">服务风险与替代指南</a></li>
                <li><a href="/rss.xml">RSS 订阅</a> · <a href="/sitemap.xml">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(148,163,184,0.18); padding-top: 18px; font-size: 12px; color: #64748b; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px;">
            <span>© 2026 流媒体指南 (liumeitizhinan.biz). 所有历史测试数据仅代表对应采样时间点与网络环境，不构成永久可用或排名承诺。</span>
            <span>含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。</span>
          </div>
        </div>
      </footer>
      <ImageLightbox />
    </template>
  </Layout>
</template>
