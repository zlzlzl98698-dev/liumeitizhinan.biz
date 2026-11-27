<script setup lang="ts">
import { computed } from 'vue';
import brandsData from '../../../../data/brands.json';
import NetworkReport from './NetworkReport.vue';
import StreamingMatrix from './StreamingMatrix.vue';
import AffiliateButton from './AffiliateButton.vue';

const props = defineProps<{
  slug: string;
}>();

const brand = computed(() => brandsData.brands.find((b) => b.slug === props.slug));
</script>

<template>
  <div v-if="brand" style="margin: 18px 0 26px;">
    <div class="sg-card" style="margin-bottom: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img
          v-if="brand.logo"
          :src="brand.logo"
          :alt="`${brand.brandName} 标识`"
          width="48"
          height="48"
          style="width: 48px; height: 48px; border-radius: 10px; object-fit: cover; border: 1px solid var(--sg-border);"
        />
        <div>
          <div style="font-weight: 800; font-size: 16px;">{{ brand.brandName }} · 评测证据面板</div>
          <div style="font-size: 12.5px; color: var(--sg-muted);">
            资料状态：<span class="sg-mono">{{ brand.dataStatus }}</span> ｜ 核实日期：{{ brand.verifiedAt }} ｜ 来源：{{ brand.dataSources.join('、') }}
          </div>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px;">
        <a :href="`/brands/${brand.slug}/`" class="sg-badge sg-light-badge-vendor" style="text-decoration: none;">
          查看 {{ brand.brandName }} 商业套餐页 →
        </a>
        <AffiliateButton :slug="brand.slug" />
      </div>
    </div>

    <div v-if="brand.affiliateUrl" class="sg-disclosure-box">
      <strong>推广关系与中立声明：</strong>本站含推广链接，通过链接注册可能带来佣金但不影响您实际支付金额（统一标有 <code class="sg-mono">rel="nofollow sponsored noopener"</code>）。本评测独立披露实测异常与资料冲突，不受商业合作关系左右。
    </div>

    <NetworkReport
      :brand-name="brand.brandName"
      :accent-color="brand.accentColor"
      :speedtest20260811="brand.speedtest20260811"
      :speed20261019="brand.speed20261019"
      :has-conflict="brand.conflicts?.some((c: any) => c.field.includes('测速'))"
    />

    <StreamingMatrix :brand-slug="brand.slug" :brand-name="brand.brandName" />
  </div>
</template>
