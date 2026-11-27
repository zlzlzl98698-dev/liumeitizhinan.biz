<script setup lang="ts">
import { ref, computed } from 'vue';

const price = ref(25);
const nominalGb = ref(168);
const multiplier = ref(1);

const presets = [
  { label: '光速云极速版 (¥25 / 168G · 1x)', price: 25, gb: 168, mult: 1 },
  { label: '高倍率陷阱示例 (¥20 / 200G · 2x)', price: 20, gb: 200, mult: 2 },
  { label: '高倍率极端示例 (¥15 / 300G · 3x)', price: 15, gb: 300, mult: 3 },
  { label: '光速云流光版 (¥34 / 268G · 1x)', price: 34, gb: 268, mult: 1 }
];

const multiplierChoices = [0.5, 1, 1.5, 2, 3, 5];

const usableGb = computed(() => {
  const m = multiplier.value > 0 ? multiplier.value : 1;
  return Math.round((Math.max(0, nominalGb.value) / m) * 10) / 10;
});

const realUnitCost = computed(() => {
  if (usableGb.value <= 0) return '0.000';
  return (Math.max(0, price.value) / usableGb.value).toFixed(3);
});

const nominalUnitCost = computed(() => {
  if (nominalGb.value <= 0) return '0.000';
  return (Math.max(0, price.value) / nominalGb.value).toFixed(3);
});

const netflix4kHours = computed(() => {
  return Math.floor(usableGb.value / 7);
});

function applyPreset(p: { price: number; gb: number; mult: number }) {
  price.value = p.price;
  nominalGb.value = p.gb;
  multiplier.value = p.mult;
}
</script>

<template>
  <div class="sg-card" style="margin: 18px 0; border-top: 3px solid var(--vp-c-brand-1);">
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 12px;">
      <div>
        <div style="font-size: 11.5px; font-weight: 700; color: var(--vp-c-brand-1); letter-spacing: 0.05em;">
          EFFECTIVE QUOTA CALCULATOR · 交互式汇率与倍率计算器
        </div>
        <h3 style="margin: 2px 0 0; font-size: 17px; color: var(--sg-text);">算清“真实可用流量”与实际每 GB 成本</h3>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        <button
          v-for="p in presets"
          :key="p.label"
          type="button"
          @click="applyPreset(p)"
          style="font-size: 11.5px; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); cursor: pointer;"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 14px;">
      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;">套餐价格（元）</label>
        <input
          v-model.number="price"
          type="number"
          min="1"
          step="0.5"
          style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 14px;"
        />
      </div>
      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;">标称流量（GB）</label>
        <input
          v-model.number="nominalGb"
          type="number"
          min="1"
          step="10"
          style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 14px;"
        />
      </div>
      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;">主力节点倍率（x）</label>
        <div style="display: flex; gap: 5px; flex-wrap: wrap;">
          <button
            v-for="m in multiplierChoices"
            :key="m"
            type="button"
            @click="multiplier = m"
            :style="{
              padding: '7px 10px',
              borderRadius: '8px',
              border: '1px solid ' + (multiplier === m ? '#0284c7' : 'var(--sg-border)'),
              background: multiplier === m ? '#0284c7' : 'var(--sg-bg)',
              color: multiplier === m ? '#ffffff' : 'var(--sg-text)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }"
          >
            {{ m }}x
          </button>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px;">
      <div style="padding: 12px; border-radius: 10px; background: var(--sg-bg); border: 1px solid var(--sg-border);">
        <div style="font-size: 11.5px; color: var(--sg-muted);">折算真实可用物理流量</div>
        <div class="sg-mono" style="font-size: 20px; font-weight: 800; color: var(--vp-c-brand-1); margin-top: 2px;">
          {{ usableGb }} GB
        </div>
      </div>
      <div style="padding: 12px; border-radius: 10px; background: var(--sg-bg); border: 1px solid var(--sg-border);">
        <div style="font-size: 11.5px; color: var(--sg-muted);">真实有效单价 vs 账面单价</div>
        <div class="sg-mono" style="font-size: 20px; font-weight: 800; color: var(--sg-text); margin-top: 2px;">
          ¥{{ realUnitCost }} <span style="font-size: 12px; font-weight: 500; color: var(--sg-muted);">/GB (账面 ¥{{ nominalUnitCost }})</span>
        </div>
      </div>
      <div style="padding: 12px; border-radius: 10px; background: var(--sg-bg); border: 1px solid var(--sg-border);">
        <div style="font-size: 11.5px; color: var(--sg-muted);">约合 Netflix 4K 观影时长</div>
        <div class="sg-mono" style="font-size: 20px; font-weight: 800; color: var(--sg-text); margin-top: 2px;">
          约 {{ netflix4kHours }} 小时
        </div>
      </div>
    </div>
  </div>
</template>
