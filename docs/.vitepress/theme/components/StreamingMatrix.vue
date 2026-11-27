<script setup lang="ts">
import availabilityData from '../../../../data/availability-records.json';
import { computed } from 'vue';

const props = defineProps<{
  brandSlug: string;
  brandName: string;
}>();

const records = computed(() =>
  availabilityData.records.filter((r) => r.brandSlug === props.brandSlug)
);

const aiRecords = computed(() => records.value.filter((r) => r.category === 'AI'));
const streamingRecords = computed(() => records.value.filter((r) => r.category === 'Streaming'));

function statusClass(status: string) {
  if (status === 'Available') return 'sg-badge-measured';
  if (status === 'Partial') return 'sg-badge-partial';
  if (status === 'Vendor Data') return 'sg-badge-vendor';
  if (status === 'Unavailable') return 'sg-badge-conflict';
  return 'sg-badge-untested';
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    Available: 'Available · 实测可用',
    Partial: 'Partial · 视节点/地区而定',
    'Vendor Data': 'Vendor Data · 资料宣称',
    Unavailable: 'Unavailable · 不可用',
    'Not Tested': 'Not Tested · 未独立实测'
  };
  return map[status] || status;
}
</script>

<template>
  <div class="sg-observatory" style="margin: 18px 0;">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; border-bottom: 1px solid rgba(148,163,184,0.18); padding-bottom: 12px;">
      <div>
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">
          Service Availability Matrix · 服务可用性矩阵
        </div>
        <h3 style="margin: 4px 0 0; font-size: 18px; color: #f8fafc;">
          {{ brandName }} AI 与流媒体支持情况矩阵
        </h3>
      </div>
      <a href="/tools/streaming-check/" style="font-size: 12.5px; color: #38bdf8; text-decoration: none;">
        查看全站测试记录中心 →
      </a>
    </div>

    <div style="margin-bottom: 16px;">
      <div style="font-size: 12px; font-weight: 700; color: #38bdf8; margin-bottom: 8px; letter-spacing: 0.05em;">
        AI 生产力平台 (AI SERVICES)
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
        <div v-for="item in aiRecords" :key="item.platform" style="background: rgba(15,23,42,0.7); border: 1px solid rgba(148,163,184,0.16); border-radius: 10px; padding: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 6px;">
            <strong style="color: #f8fafc; font-size: 14px;">{{ item.platform }}</strong>
            <span class="sg-badge" :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span>
          </div>
          <div style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">{{ item.note }}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 6px;">
            来源：{{ item.sourceType }} <span v-if="item.testDate">｜ 日期：{{ item.testDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div style="font-size: 12px; font-weight: 700; color: #06b6d4; margin-bottom: 8px; letter-spacing: 0.05em;">
        海外流媒体与社媒平台 (STREAMING SERVICES)
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
        <div v-for="item in streamingRecords" :key="item.platform" style="background: rgba(15,23,42,0.7); border: 1px solid rgba(148,163,184,0.16); border-radius: 10px; padding: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 6px;">
            <strong style="color: #f8fafc; font-size: 14px;">{{ item.platform }}</strong>
            <span class="sg-badge" :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span>
          </div>
          <div style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">{{ item.note }}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 6px;">
            来源：{{ item.sourceType }} <span v-if="item.testDate">｜ 日期：{{ item.testDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
