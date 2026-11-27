<script setup lang="ts">
import { ref, computed } from 'vue';
import availabilityData from '../../../../data/availability-records.json';
import testRecordsData from '../../../../data/test-records.json';
import brandsData from '../../../../data/brands.json';

const brandFilter = ref('all');
const platformFilter = ref('all');
const categoryFilter = ref('all');
const statusFilter = ref('all');

const filteredAvailability = computed(() => {
  return availabilityData.records.filter((r) => {
    if (brandFilter.value !== 'all' && r.brandSlug !== brandFilter.value) return false;
    if (platformFilter.value !== 'all' && r.platform !== platformFilter.value) return false;
    if (categoryFilter.value !== 'all' && r.category !== categoryFilter.value) return false;
    if (statusFilter.value !== 'all' && r.status !== statusFilter.value) return false;
    return true;
  });
});

const platforms = ['ChatGPT', 'Claude', 'Gemini', 'Netflix', 'Disney+', 'YouTube', 'HBO Max', 'TikTok', 'Spotify'];
</script>

<template>
  <div style="margin: 18px 0;">
    <div class="sg-card" style="margin-bottom: 18px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">按品牌筛选</label>
          <select v-model="brandFilter" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部品牌 ({{ brandsData.totalBrands }})</option>
            <option v-for="b in brandsData.brands" :key="b.slug" :value="b.slug">{{ b.brandName }}</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">按服务平台</label>
          <select v-model="platformFilter" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部 AI 与流媒体平台</option>
            <option v-for="p in platforms" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">服务类别</label>
          <select v-model="categoryFilter" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部类别</option>
            <option value="AI">AI 工具（ChatGPT/Claude/Gemini）</option>
            <option value="Streaming">流媒体（Netflix/YouTube/Disney+等）</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">证据状态筛选</label>
          <select v-model="statusFilter" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--sg-border); background: var(--sg-bg); color: var(--sg-text); font-size: 13px;">
            <option value="all">全部状态</option>
            <option value="Available">Available（有实测图可用）</option>
            <option value="Partial">Partial（视节点/地区而定）</option>
            <option value="Vendor Data">Vendor Data（品牌资料标注）</option>
            <option value="Not Tested">Not Tested（未独立实测）</option>
          </select>
        </div>
      </div>
      <div style="font-size: 12.5px; color: var(--sg-muted); margin-top: 10px;">
        共匹配 <strong>{{ filteredAvailability.length }}</strong> 条平台可用性记录（其中独立实测图证据 {{ testRecordsData.totalRecords }} 条）。不同品牌测试日期、后端带宽及协议不同，未做相同受控条件横向胜出判定。
      </div>
    </div>

    <div style="overflow-x: auto; border: 1px solid var(--sg-border); border-radius: 10px; background: var(--sg-surface);">
      <table style="width: 100%; border-collapse: collapse; margin: 0; font-size: 13px;">
        <thead>
          <tr style="background: rgba(2, 132, 199, 0.06);">
            <th style="text-align: left; padding: 10px 12px;">品牌</th>
            <th style="text-align: left; padding: 10px 12px;">平台</th>
            <th style="text-align: left; padding: 10px 12px;">状态</th>
            <th style="text-align: left; padding: 10px 12px;">数据来源类型</th>
            <th style="text-align: left; padding: 10px 12px;">说明与局限</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, idx) in filteredAvailability.slice(0, 90)" :key="idx" style="border-top: 1px solid var(--sg-border);">
            <td style="padding: 9px 12px; font-weight: 600;">
              <a :href="`/brands/${r.brandSlug}/`">{{ r.brandName }}</a>
            </td>
            <td style="padding: 9px 12px;">{{ r.platform }}</td>
            <td style="padding: 9px 12px;">
              <span
                class="sg-badge"
                :class="r.status === 'Available' ? 'sg-light-badge-measured' : r.status === 'Partial' ? 'sg-light-badge-partial' : r.status === 'Vendor Data' ? 'sg-light-badge-vendor' : 'sg-light-badge-untested'"
              >
                {{ r.status }}
              </span>
            </td>
            <td class="sg-mono" style="padding: 9px 12px; font-size: 12px;">{{ r.sourceType }}</td>
            <td style="padding: 9px 12px; color: var(--sg-muted);">{{ r.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="filteredAvailability.length > 90" style="font-size: 12px; color: var(--sg-muted); margin-top: 8px;">
      提示：当前展示前 90 条结果，可通过上方筛选器精确查看特定品牌或平台。
    </p>

    <h3 style="margin-top: 28px;">已归档实测图片证据批次清单（{{ testRecordsData.totalRecords }} 条）</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; margin-top: 12px;">
      <div v-for="rec in testRecordsData.records" :key="rec.id" class="sg-card" style="padding: 14px;">
        <div style="display: flex; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
          <a :href="`/brands/${rec.brandSlug}/`" style="font-weight: 700;">{{ rec.brandName }}</a>
          <span class="sg-badge sg-light-badge-measured">{{ rec.testDate }}</span>
        </div>
        <div class="sg-mono" style="font-size: 11.5px; color: var(--sg-muted); margin-bottom: 6px;">
          {{ rec.protocol }} · {{ rec.tool }}
        </div>
        <div style="font-size: 12.5px; color: var(--sg-muted); line-height: 1.5;">{{ rec.note }}</div>
      </div>
    </div>
  </div>
</template>
