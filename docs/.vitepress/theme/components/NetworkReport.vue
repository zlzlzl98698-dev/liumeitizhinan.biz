<script setup lang="ts">
import { computed } from 'vue';

interface SpeedRow {
  region: string;
  latency: string;
  download: string;
}

const props = defineProps<{
  brandName: string;
  accentColor?: string;
  speedtest20260811?: {
    image: string;
    testedAt: string | null;
    protocolDisplayed: string;
    toolFamily: string;
    dateConfidence: string;
    dataStatus: string;
    reviewStatus: string;
    limitation: string;
  } | null;
  speed20261019?: {
    date: string;
    condition: string;
    dataStatus: string;
    rows: SpeedRow[];
  } | null;
  hasConflict?: boolean;
}>();

const accent = computed(() => props.accentColor || '#0EA5E9');

function parseMbps(str: string): number {
  const n = parseFloat(str.replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? Math.min(100, Math.round((n / 600) * 100)) : 0;
}
</script>

<template>
  <div class="sg-observatory" :style="{ '--brand-accent': accent }">
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; border-bottom: 1px solid rgba(148,163,184,0.18); padding-bottom: 14px;">
      <div>
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8;">
          Performance Monitoring Report · 测速观测报告
        </div>
        <h3 style="margin: 4px 0 0; font-size: 18px; color: #f8fafc;">
          {{ brandName }} 节点速度与延迟证据档案
        </h3>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span v-if="speedtest20260811" class="sg-badge sg-badge-measured">
          ● Measured · 原始截图 (2026-08-11)
        </span>
        <span v-else class="sg-badge sg-badge-untested">
          ○ Not Tested · 无 2026-08-11 原始截图
        </span>
        <span v-if="hasConflict" class="sg-badge sg-badge-conflict">
          ! 存在数据冲突待复核
        </span>
      </div>
    </div>

    <!-- 2026-08-11 Real Screenshot Evidence -->
    <div v-if="speedtest20260811" style="margin-bottom: 20px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; margin-bottom: 14px;">
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(148,163,184,0.15); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">采样时间 (CST)</div>
          <div class="sg-mono" style="font-size: 13px; color: #f1f5f9; margin-top: 2px;">{{ speedtest20260811.testedAt || '待复核' }}</div>
        </div>
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(148,163,184,0.15); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">图中协议</div>
          <div class="sg-mono" style="font-size: 13px; color: #38bdf8; margin-top: 2px;">{{ speedtest20260811.protocolDisplayed }}</div>
        </div>
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(148,163,184,0.15); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">测试工具环境</div>
          <div class="sg-mono" style="font-size: 12.5px; color: #f1f5f9; margin-top: 2px;">{{ speedtest20260811.toolFamily }}</div>
        </div>
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(148,163,184,0.15); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">审核状态</div>
          <div class="sg-mono" style="font-size: 12.5px; color: #fbbf24; margin-top: 2px;">{{ speedtest20260811.reviewStatus }}</div>
        </div>
      </div>

      <figure style="margin: 0; background: #050c18; border: 1px solid rgba(148,163,184,0.2); border-radius: 10px; padding: 12px;">
        <img
          :src="speedtest20260811.image"
          :alt="`${brandName} 2026-08-11 节点测速截图，包含节点地区、协议、延迟和速度结果。`"
          title="点击放大查看原图"
          loading="lazy"
          width="1122"
          height="1402"
          style="width: 100%; max-width: 560px; height: auto; display: block; margin: 0 auto; border-radius: 6px; cursor: zoom-in;"
        />
        <figcaption style="font-size: 12px; color: #94a3b8; margin-top: 10px; line-height: 1.6; text-align: center;">
          测试时间：{{ speedtest20260811.testedAt }}（点击图片可放大查看细节）。本图记录当次测试环境下的节点延迟与吞吐结果，仅代表该时间点和测试线路，不代表长期表现或所有用户体验；图中同时保留 0B/异常节点，未做删减。
        </figcaption>
      </figure>
    </div>

    <!-- 2026-10-19 Supplied Text Table -->
    <div v-if="speed20261019 && speed20261019.rows.length" style="margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 13.5px; font-weight: 600; color: #e2e8f0;">
          历史资料文本测速参考（{{ speed20261019.date }} · {{ speed20261019.condition }}）
        </span>
        <span class="sg-badge sg-badge-vendor">Supplied Data · 原文文本记录（非本站独立实测）</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div
          v-for="r in speed20261019.rows"
          :key="r.region"
          style="background: rgba(15,23,42,0.65); border: 1px solid rgba(148,163,184,0.14); border-radius: 8px; padding: 10px 12px;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; margin-bottom: 6px;">
            <span style="font-weight: 600; color: #f8fafc;">{{ r.region }}</span>
            <span class="sg-mono" style="color: #94a3b8;">
              延迟 <strong style="color: #e2e8f0;">{{ r.latency }}</strong> ｜ 下载 <strong :style="{ color: accent }">{{ r.download }}</strong>
            </span>
          </div>
          <div style="height: 6px; background: rgba(148,163,184,0.15); border-radius: 999px; overflow: hidden;">
            <div :style="{ width: parseMbps(r.download) + '%', height: '100%', background: accent, borderRadius: '999px' }"></div>
          </div>
        </div>
      </div>
      <p style="font-size: 12px; color: #94a3b8; margin: 10px 0 0;">
        注意：以上 2026-10-19 数值来自《推广机场品牌清单》原文标注（非晚高峰），未附带原始测速后端截图与并发条件；部分品牌（如小明Cloud与光速云）原文存在数值完全一致的冲突，仅供结构化对照参考。
      </p>
    </div>

    <div v-if="!speedtest20260811 && (!speed20261019 || !speed20261019.rows.length)" style="padding: 18px; background: rgba(15,23,42,0.5); border-radius: 8px; text-align: center; color: #94a3b8; font-size: 13.5px;">
      当前品牌暂无本站保留的节点测速截图或分地区测速表（状态：<span class="sg-mono">Not Tested</span>）。建议先通过官方小额月付或自测工具验证当地晚高峰表现。
    </div>
  </div>
</template>
