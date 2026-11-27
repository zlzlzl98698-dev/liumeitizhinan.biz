<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import brandsData from '../../../../data/brands.json';

const search = ref('');
const clientFilter = ref('all');
const lineFilter = ref('all');
const evidenceFilter = ref('all');
const priceFilter = ref('all');
const sortBy = ref('default');

const reviewedSlugs = new Set([
  'guangsu',
  'feimao',
  'xingdaomeng',
  'ermao',
  'muguang',
  'weifeng',
  'xiaoming',
  'yinxingren',
  'weitu',
  'yifan',
  'sogo',
  'quanqiu'
]);

onMounted(() => {
  if (typeof window !== 'undefined') {
    const qParam = new URLSearchParams(window.location.search).get('q');
    if (qParam) search.value = qParam;
  }
});

function minPlanPrice(b: any): number | null {
  const nums = (b.pricingPlans || [])
    .map((p: any) => (p.billingCycle === '年付' && p.priceNum ? +(p.priceNum / 12).toFixed(2) : p.priceNum))
    .filter((n: any) => typeof n === 'number' && n > 0);
  return nums.length ? Math.min(...nums) : null;
}

const filteredBrands = computed(() => {
  const q = search.value.trim().toLowerCase();
  let list = brandsData.brands.filter((b) => {
    if (q) {
      const hay = [b.brandName, ...(b.brandAliases || []), ...(b.networkTypes || []), ...(b.protocols || []), b.introSummary || ''].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (clientFilter.value === 'third-party' && b.thirdPartyClientSupport !== true) return false;
    if (clientFilter.value === 'proprietary-only' && b.thirdPartyClientSupport !== false) return false;
    if (lineFilter.value !== 'all' && !(b.networkTypes || []).some((t: string) => t.toUpperCase().includes(lineFilter.value))) return false;
    if (evidenceFilter.value === 'has-screenshot' && !b.speedtest20260811) return false;
    if (evidenceFilter.value === 'has-unlock-test' && b.slug !== 'guangsu') return false;
    if (evidenceFilter.value === 'no-screenshot' && b.speedtest20260811) return false;
    if (priceFilter.value !== 'all') {
      const mp = minPlanPrice(b);
      if (mp === null) return false;
      if (priceFilter.value === 'under10' && mp >= 10) return false;
      if (priceFilter.value === '10to25' && (mp < 10 || mp > 25)) return false;
      if (priceFilter.value === 'over25' && mp <= 25) return false;
    }
    return true;
  });

  if (sortBy.value === 'price-asc') {
    list = [...list].sort((a, b) => (minPlanPrice(a) ?? 9999) - (minPlanPrice(b) ?? 9999));
  } else if (sortBy.value === 'plans-desc') {
    list = [...list].sort((a, b) => (b.pricingPlans?.length || 0) - (a.pricingPlans?.length || 0));
  }
  return list;
});

function resetFilters() {
  search.value = '';
  clientFilter.value = 'all';
  lineFilter.value = 'all';
  evidenceFilter.value = 'all';
  priceFilter.value = 'all';
  sortBy.value = 'default';
}
</script>

<template>
  <div style="margin: 18px 0;">
    <div class="sg-card" style="margin-bottom: 18px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(175px, 1fr)); gap: 12px;">
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">搜索品牌 / 别名 / 协议</label>
          <input
            v-model="search"
            type="text"
            placeholder="例如：光速云、IEPL、VLESS..."
            style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;"
          />
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">客户端支持模式</label>
          <select v-model="clientFilter" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部方式</option>
            <option value="third-party">支持 Clash/Shadowrocket 订阅</option>
            <option value="proprietary-only">仅限官方专属客户端</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">线路声明类型</label>
          <select v-model="lineFilter" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部线路</option>
            <option value="IEPL">IEPL 专线</option>
            <option value="IPLC">IPLC 专线</option>
            <option value="BGP">BGP 优化/中转</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">月均起步价区间</label>
          <select v-model="priceFilter" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部价位</option>
            <option value="under10">¥10/月以内（含年付折算）</option>
            <option value="10to25">¥10–¥25/月</option>
            <option value="over25">¥25/月以上</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">实测数据状态</label>
          <select v-model="evidenceFilter" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部状态</option>
            <option value="has-screenshot">有 2026-08-11 测速截图</option>
            <option value="has-unlock-test">有流媒体/AI 实测图</option>
            <option value="no-screenshot">暂无测速截图</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">排序方式</label>
          <select v-model="sortBy" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="default">默认排序（光速云置顶）</option>
            <option value="price-asc">入门折算月均价从低到高</option>
            <option value="plans-desc">已收录套餐档位从多到少</option>
          </select>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 12.5px; color: var(--sg-muted);">
        <span>当前显示 <strong>{{ filteredBrands.length }}</strong> / {{ brandsData.totalBrands }} 个机场品牌实体（更新日期：2026-11-27）</span>
        <button type="button" @click="resetFilters" style="cursor: pointer; background: transparent; border: 1px solid var(--sg-border); color: var(--sg-text); border-radius: 6px; padding: 4px 10px; font-size: 12px;">
          重置筛选
        </button>
      </div>
    </div>

    <div v-if="filteredBrands.length" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(295px, 1fr)); gap: 16px;">
      <div v-for="b in filteredBrands" :key="b.slug" class="sg-card" :style="{ borderTop: `3px solid ${b.accentColor}` }">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img
              v-if="b.logo"
              :src="b.logo"
              :alt="`${b.brandName} Logo`"
              width="40"
              height="40"
              loading="lazy"
              style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1px solid var(--sg-border);"
            />
            <div>
              <a :href="`/brands/${b.slug}/`" style="font-size: 16.5px; font-weight: 800; text-decoration: none; color: var(--sg-text);">
                {{ b.brandName }}
              </a>
              <div style="font-size: 11.5px; color: var(--sg-muted);">
                {{ b.foundedYear ? b.foundedYear + '年资料' : '年份待核实' }} · {{ b.protocols?.join('/') || '协议待核实' }}
              </div>
            </div>
          </div>
          <span v-if="b.isFeatured" class="sg-badge sg-light-badge-measured">主推</span>
          <span v-else-if="b.speedtest20260811" class="sg-badge sg-light-badge-vendor">有测速图</span>
          <span v-else class="sg-badge sg-light-badge-untested">待实测</span>
        </div>

        <div style="font-size: 12.5px; color: var(--sg-muted); line-height: 1.6; min-height: 40px; margin-bottom: 10px;">
          {{ (b.introSummary || '').slice(0, 82) }}{{ (b.introSummary || '').length > 82 ? '…' : '' }}
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
          <span v-for="nt in (b.networkTypes || []).slice(0, 2)" :key="nt" class="sg-badge sg-light-badge-vendor">{{ nt }}</span>
          <span class="sg-badge sg-light-badge-untested">{{ b.pricingPlans?.length || 0 }} 档套餐</span>
          <span v-if="b.conflicts?.length" class="sg-badge sg-light-badge-conflict">含冲突提示</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--sg-border); font-size: 13px; gap: 8px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <a v-if="reviewedSlugs.has(b.slug)" :href="`/reviews/${b.slug}/`" style="font-weight: 700; color: var(--vp-c-brand-1); text-decoration: none;">
              独立评测 →
            </a>
            <a :href="`/brands/${b.slug}/`" style="font-weight: 600; color: var(--sg-text); text-decoration: none;">
              {{ reviewedSlugs.has(b.slug) ? '套餐报价' : '商业档案与套餐 →' }}
            </a>
          </div>
          <a
            v-if="b.affiliateUrl"
            :href="b.affiliateUrl"
            target="_blank"
            rel="nofollow sponsored noopener"
            style="font-size: 12px; color: var(--sg-muted); text-decoration: none;"
          >
            官网入口 ↗
          </a>
        </div>
      </div>
    </div>

    <div v-else class="sg-card" style="text-align: center; padding: 36px 20px;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">未找到符合当前筛选条件的品牌</div>
      <p style="font-size: 13.5px; color: var(--sg-muted); margin-bottom: 14px;">请尝试清空搜索词或放宽线路、价格与实测条件。</p>
      <button type="button" @click="resetFilters" class="sg-cta-btn" style="border: none; cursor: pointer;">查看全部 {{ brandsData.totalBrands }} 家品牌</button>
    </div>
  </div>
</template>
