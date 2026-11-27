<script setup lang="ts">
import { computed } from 'vue';
import brandsData from '../../../../data/brands.json';

const props = defineProps<{
  slug: string;
  label?: string;
}>();

const brand = computed(() => brandsData.brands.find((b) => b.slug === props.slug));
</script>

<template>
  <span v-if="brand && brand.affiliateUrl" style="display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;">
    <a
      :href="brand.affiliateUrl"
      target="_blank"
      rel="nofollow sponsored noopener"
      class="sg-cta-btn"
      style="padding: 6px 14px; font-size: 13px;"
    >
      {{ label || `访问 ${brand.brandName} 官方入口 →` }}
    </a>
    <span v-if="brand.couponCode" class="sg-mono" style="font-size: 12px; color: var(--vp-c-brand-1);">
      优惠码: {{ brand.couponCode }}
    </span>
  </span>
  <a v-else :href="`/brands/${slug}/`" style="font-weight: 600;">查看档案详情 →</a>
</template>
