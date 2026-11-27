<script setup lang="ts">
interface Plan {
  name: string;
  billingCycle: string;
  priceText: string;
  priceNum: number | null;
  trafficQuota: string;
  trafficResetCycle: string;
  dataStatus: string;
}

defineProps<{
  brandName: string;
  plans: Plan[];
  updatedAt?: string;
}>();
</script>

<template>
  <div style="margin: 16px 0;">
    <div v-if="plans.length" style="overflow-x: auto; border: 1px solid var(--sg-border); border-radius: 10px; background: var(--sg-surface);">
      <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 13.5px;">
        <thead>
          <tr style="background: rgba(2, 132, 199, 0.06);">
            <th style="text-align: left; padding: 10px 14px;">套餐名称</th>
            <th style="text-align: left; padding: 10px 14px;">计费周期</th>
            <th style="text-align: left; padding: 10px 14px;">标价</th>
            <th style="text-align: left; padding: 10px 14px;">流量额度</th>
            <th style="text-align: left; padding: 10px 14px;">重置周期</th>
            <th style="text-align: left; padding: 10px 14px;">数据状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, idx) in plans" :key="idx" style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 14px; font-weight: 600;">{{ p.name }}</td>
            <td style="padding: 10px 14px;">{{ p.billingCycle }}</td>
            <td class="sg-mono" style="padding: 10px 14px; font-weight: 700; color: var(--vp-c-brand-1);">{{ p.priceText }}</td>
            <td class="sg-mono" style="padding: 10px 14px;">{{ p.trafficQuota }}</td>
            <td style="padding: 10px 14px;">{{ p.trafficResetCycle }}</td>
            <td style="padding: 10px 14px;">
              <span class="sg-badge" :class="p.dataStatus === 'vendor' ? 'sg-light-badge-vendor' : 'sg-light-badge-partial'">
                {{ p.dataStatus === 'vendor' ? '品牌资料' : '参考条目' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="sg-card" style="color: var(--sg-muted); font-size: 13.5px;">
      {{ brandName }} 当前尚未收录完整官方套餐表（状态：待核实）。下单前请务必以官网实时结算页为准。
    </div>
    <div style="font-size: 12px; color: var(--sg-muted); margin-top: 6px;">
      信息日期：{{ updatedAt || '2026-11-27' }} ｜ 注：一次性不过期流量包与每月重置套餐已严格区分，部分品牌年付折算价非单月月付价格。
    </div>
  </div>
</template>
