<script setup lang="ts">
import { ref, computed } from 'vue';
import brandsData from '../../../../data/brands.json';

const slugA = ref('guangsu');
const slugB = ref('feimao');
const slugC = ref('xingdaomeng');

const selected = computed(() =>
  [slugA.value, slugB.value, slugC.value]
    .map((s) => brandsData.brands.find((b) => b.slug === s))
    .filter(Boolean) as any[]
);

function getEntryPlan(b: any): string {
  if (!b.pricingPlans || !b.pricingPlans.length) return '资料不足（待核实完整套餐）';
  const p = b.pricingPlans[0];
  return `${p.name}：${p.priceText} / ${p.trafficQuota}（${p.billingCycle}）`;
}
</script>

<template>
  <div style="margin: 18px 0;">
    <div class="sg-card" style="margin-bottom: 16px;">
      <div style="font-weight: 700; margin-bottom: 10px;">选择任意 3 个品牌进行结构化字段对比</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <select v-model="slugA" style="padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text);">
          <option v-for="b in brandsData.brands" :key="b.slug" :value="b.slug">{{ b.brandName }}</option>
        </select>
        <select v-model="slugB" style="padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text);">
          <option v-for="b in brandsData.brands" :key="b.slug" :value="b.slug">{{ b.brandName }}</option>
        </select>
        <select v-model="slugC" style="padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text);">
          <option v-for="b in brandsData.brands" :key="b.slug" :value="b.slug">{{ b.brandName }}</option>
        </select>
      </div>
    </div>

    <div style="overflow-x: auto; border: 1px solid var(--sg-border); border-radius: 10px; background: var(--sg-surface);">
      <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 13.5px;">
        <thead>
          <tr style="background: rgba(2, 132, 199, 0.06);">
            <th style="text-align: left; padding: 12px; width: 170px;">对比维度</th>
            <th v-for="b in selected" :key="b.slug" style="text-align: left; padding: 12px;">
              <a :href="`/brands/${b.slug}/`" style="font-weight: 800;">{{ b.brandName }}</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">资料标注运营年份</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">{{ b.foundedYear ? b.foundedYear + ' 年' : '资料不足' }}</td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">代表入门套餐</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">{{ getEntryPlan(b) }}</td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">已收录套餐档位</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">{{ b.pricingPlans?.length || 0 }} 档</td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">线路声明</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">{{ b.networkTypes?.join(' / ') || '资料不足' }}</td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">协议类型</td>
            <td v-for="b in selected" :key="b.slug" class="sg-mono" style="padding: 10px 12px;">{{ b.protocols?.join(' / ') || '未统一标注' }}</td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">客户端支持方式</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">{{ b.clientSupportNote }}</td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">流媒体资料情况</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">
              {{ b.streamingAvailability?.supportedClaimed?.join('、') || '资料不足 / 未实测' }}
            </td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">AI 工具资料情况</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">
              {{ [...(b.aiAvailability?.supportedClaimed || []), ...(b.aiAvailability?.nodeDependentClaimed || []).map((x:string)=>x+'(视节点)')].join('、') || '资料不足 / 未实测' }}
            </td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">实测截图证据</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">
              <span v-if="b.slug === 'guangsu'" class="sg-badge sg-light-badge-measured">2026-08-11 测速 + 2026-08-19 5张多ISP实测</span>
              <span v-else-if="b.speedtest20260811" class="sg-badge sg-light-badge-vendor">2026-08-11 单次测速截图（{{ b.speedtest20260811.protocolDisplayed }}）</span>
              <span v-else class="sg-badge sg-light-badge-untested">未进行相同条件测试</span>
            </td>
          </tr>
          <tr style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 10px 12px; font-weight: 600;">优惠码 / 入口</td>
            <td v-for="b in selected" :key="b.slug" style="padding: 10px 12px;">
              <div class="sg-mono" style="font-size: 12px; margin-bottom: 4px;">{{ b.couponCodes?.join(' / ') || '无/待核实' }}</div>
              <a v-if="b.affiliateUrl" :href="b.affiliateUrl" target="_blank" rel="nofollow sponsored noopener">访问官网入口 ↗</a>
              <span v-else>暂无公开注册入口</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p style="font-size: 12px; color: var(--sg-muted); margin-top: 8px;">
      注：不同品牌的 2026-08-11 测速截图采样时刻、协议与后端节点并不完全一致，尚未开展相同条件控制的横向竞速，因此不在此表宣布“速度第一”或绝对胜出结论。含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。
    </p>
  </div>
</template>
