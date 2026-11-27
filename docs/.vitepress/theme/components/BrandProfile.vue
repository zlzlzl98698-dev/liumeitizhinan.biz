<script setup lang="ts">
import { computed } from 'vue';
import brandsData from '../../../../data/brands.json';
import NetworkReport from './NetworkReport.vue';
import StreamingMatrix from './StreamingMatrix.vue';
import PricingTable from './PricingTable.vue';

const props = defineProps<{
  slug: string;
}>();

const brand = computed(() =>
  brandsData.brands.find((b) => b.slug === props.slug)
);

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

const hasIndependentReview = computed(() => reviewedSlugs.has(props.slug));

const relatedBrands = computed(() => {
  if (!brand.value) return [];
  return brandsData.brands
    .filter((b) => b.slug !== props.slug)
    .slice(0, 4);
});
</script>

<template>
  <div v-if="brand" style="margin: 12px 0 28px;">
    <!-- Infrastructure Service Snapshot -->
    <div class="sg-observatory" :style="{ borderColor: brand.accentColor + '55' }">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <img
            v-if="brand.logo"
            :src="brand.logo"
            :alt="`${brand.brandName} 品牌标识`"
            width="56"
            height="56"
            style="width: 56px; height: 56px; border-radius: 12px; object-fit: cover; background: #0f172a; border: 1px solid rgba(148,163,184,0.25);"
          />
          <div>
            <div style="font-size: 11.5px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">
              Infrastructure Service Snapshot · 品牌档案概览
            </div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 2px;">
              <span style="font-size: 22px; font-weight: 800; color: #ffffff;">{{ brand.brandName }}</span>
              <span v-if="brand.isFeatured" class="sg-badge sg-badge-measured">主推评测品牌</span>
              <span v-if="brand.speedtest20260811" class="sg-badge sg-badge-measured">有 2026-08-11 测速截图</span>
              <span v-else class="sg-badge sg-badge-untested">暂无测速截图</span>
            </div>
            <div v-if="brand.brandAliases?.length" style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
              常见别名：{{ brand.brandAliases.join(' / ') }}
            </div>
          </div>
        </div>

        <div v-if="brand.affiliateUrl || hasIndependentReview" style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <a
            v-if="brand.affiliateUrl"
            :href="brand.affiliateUrl"
            target="_blank"
            rel="nofollow sponsored noopener"
            class="sg-cta-btn"
          >
            前往 {{ brand.brandName }} 官方入口 →
          </a>
          <a
            v-if="hasIndependentReview"
            :href="`/reviews/${brand.slug}/`"
            style="font-size: 12.5px; color: #38bdf8; font-weight: 600; text-decoration: none;"
          >
            查看 {{ brand.brandName }} 独立深度评测 →
          </a>
          <div v-if="brand.couponCodes?.length" class="sg-mono" style="font-size: 12px; color: #38bdf8;">
            优惠码：{{ brand.couponCodes.join(' / ') }}
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-top: 18px;">
        <div style="background: rgba(15,23,42,0.7); border: 1px solid rgba(148,163,184,0.16); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">资料标注运营年份</div>
          <div class="sg-mono" style="font-size: 14px; color: #f8fafc; margin-top: 2px;">
            {{ brand.foundedYear ? brand.foundedYear + ' 年（资料标注）' : '未明确标注' }}
          </div>
        </div>
        <div style="background: rgba(15,23,42,0.7); border: 1px solid rgba(148,163,184,0.16); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">线路类型声明</div>
          <div style="font-size: 13.5px; color: #38bdf8; margin-top: 2px; font-weight: 600;">
            {{ brand.networkTypes?.length ? brand.networkTypes.join(' · ') : '待核实' }}
          </div>
        </div>
        <div style="background: rgba(15,23,42,0.7); border: 1px solid rgba(148,163,184,0.16); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">传输协议</div>
          <div class="sg-mono" style="font-size: 13.5px; color: #f8fafc; margin-top: 2px;">
            {{ brand.protocols?.length ? brand.protocols.join(' / ') : '未统一标注' }}
          </div>
        </div>
        <div style="background: rgba(15,23,42,0.7); border: 1px solid rgba(148,163,184,0.16); border-radius: 8px; padding: 10px 12px;">
          <div style="font-size: 11px; color: #94a3b8;">客户端接入方式</div>
          <div style="font-size: 13px; color: #e2e8f0; margin-top: 2px;">
            {{ brand.thirdPartyClientSupport === false ? '仅限专属客户端' : (brand.thirdPartyClientSupport === true ? '支持第三方订阅' : '待核实') }}
          </div>
        </div>
      </div>

      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(148,163,184,0.15); font-size: 12px; color: #94a3b8; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px;">
        <span>数据来源：{{ brand.dataSources.join('、') }}</span>
        <span>核实日期：{{ brand.verifiedAt }} ｜ 更新日期：{{ brand.updatedAt }}</span>
      </div>
    </div>

    <div v-if="brand.affiliateUrl" class="sg-disclosure-box">
      <strong>推广披露：</strong>本页上方及文内包含品牌推广链接（含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格），统一使用 <code class="sg-mono">rel="nofollow sponsored noopener"</code>。推广关系不影响本站对套餐限制、历史测速异常及数据缺口的独立标注。
    </div>

    <!-- Conflicts alert -->
    <div v-if="brand.conflicts?.length" style="margin: 16px 0; padding: 14px 16px; border-radius: 10px; border: 1px solid #fecaca; background: rgba(239, 68, 68, 0.06);">
      <div style="font-weight: 700; color: #dc2626; font-size: 14px; margin-bottom: 8px;">
        数据冲突与待核实提示（{{ brand.conflicts.length }} 项）
      </div>
      <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.7;">
        <li v-for="c in brand.conflicts" :key="c.id">
          <strong>{{ c.field }}：</strong>{{ c.sourceA }} vs {{ c.sourceB }} —— <em>{{ c.handling }}</em>
        </li>
      </ul>
    </div>

    <!-- Pricing Table -->
    <h2 id="brand-pricing">{{ brand.brandName }} 套餐价格与周期结构</h2>
    <PricingTable :brand-name="brand.brandName" :plans="brand.pricingPlans" :updated-at="brand.updatedAt" />

    <!-- Network Speed Report -->
    <h2 id="brand-speedtest">{{ brand.brandName }} 测速观测与历史实测记录</h2>
    <NetworkReport
      :brand-name="brand.brandName"
      :accent-color="brand.accentColor"
      :speedtest20260811="brand.speedtest20260811"
      :speed20261019="brand.speed20261019"
      :has-conflict="brand.conflicts?.some(c => c.field.includes('测速'))"
    />

    <!-- Guangsu Multi-ISP 2026-08-19 Tests -->
    <div v-if="brand.guangsu20260819Tests?.length" style="margin: 22px 0;">
      <h3>2026-08-19 多运营商（电信 / 移动 / 联通）MiaoKo 实测证据档案</h3>
      <p style="font-size: 13.5px; color: var(--sg-muted);">
        以下 5 张图片均为 2026-08-19 实测留存原图，分别覆盖长沙电信 2Gbps、广西移动 2Gbps、河北联通 2Gbps 普通测速及珠海联通 9Gbps 单线程 VLESS/AnyTLS 基础流媒体与订阅测速。图中真实保留了香港 OpenAI 仅 APP、新加坡/台湾 YouTube 送中、德国节点降速等实测差异。
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 12px;">
        <div v-for="t in brand.guangsu20260819Tests" :key="t.id" class="sg-card" style="padding: 14px;">
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">{{ t.title }}</div>
          <div class="sg-mono" style="font-size: 11.5px; color: var(--sg-muted); margin-bottom: 10px;">
            {{ t.date }} · {{ t.isp }} · {{ t.protocol }}
          </div>
          <img
            :src="t.image"
            :alt="`${brand.brandName} ${t.title} 实测截图`"
            loading="lazy"
            style="width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--sg-border);"
          />
          <p style="font-size: 12.5px; line-height: 1.6; color: var(--sg-muted); margin: 10px 0 0;">
            {{ t.highlights }}
          </p>
        </div>
      </div>
    </div>

    <!-- Streaming & AI Availability Matrix -->
    <h2 id="brand-availability">{{ brand.brandName }} AI 与流媒体服务可用性矩阵</h2>
    <StreamingMatrix :brand-slug="brand.slug" :brand-name="brand.brandName" />

    <!-- Conceptual Network Path Observatory -->
    <div class="sg-observatory" style="margin: 20px 0;">
      <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">
        Network Path Observatory · 网络路径概念示意
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin: 4px 0 14px;">
        <strong style="font-size: 16px; color: #f8fafc;">{{ brand.brandName }} 访问链路架构示意</strong>
        <span class="sg-badge sg-badge-partial">概念示意图（实际物理拓扑未独立审计）</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; align-items: center; text-align: center;">
        <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.28); border-radius: 10px; padding: 12px;">
          <div style="font-size: 11px; color: #94a3b8;">1. 用户设备与客户端</div>
          <div style="font-size: 13.5px; font-weight: 700; color: #f8fafc; margin-top: 4px;">
            {{ brand.thirdPartyClientSupport === false ? '官方专属客户端' : 'Clash / Shadowrocket / 自研' }}
          </div>
          <div class="sg-mono" style="font-size: 11.5px; color: #38bdf8; margin-top: 3px;">
            {{ brand.protocols?.join(' / ') || '协议待核实' }}
          </div>
        </div>
        <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.28); border-radius: 10px; padding: 12px;">
          <div style="font-size: 11px; color: #94a3b8;">2. 跨境传输声明</div>
          <div style="font-size: 13.5px; font-weight: 700; color: #f8fafc; margin-top: 4px;">
            {{ brand.networkTypes?.join(' / ') || '中转或专线（待核实）' }}
          </div>
          <div style="font-size: 11.5px; color: #94a3b8; margin-top: 3px;">资料宣称架构</div>
        </div>
        <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.28); border-radius: 10px; padding: 12px;">
          <div style="font-size: 11px; color: #94a3b8;">3. 海外落地与目标服务</div>
          <div style="font-size: 13.5px; font-weight: 700; color: #f8fafc; margin-top: 4px;">
            Netflix / YouTube / ChatGPT
          </div>
          <div style="font-size: 11.5px; color: #34d399; margin-top: 3px;">可用性取决于落地 IP 与平台规则</div>
        </div>
      </div>
    </div>

    <!-- Related Comparison Links -->
    <div class="sg-card" style="margin-top: 20px;">
      <div style="font-weight: 700; margin-bottom: 10px;">延伸对比、深度评测与下游参考</div>
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <a v-if="hasIndependentReview" :href="`/reviews/${brand.slug}/`" class="sg-badge sg-light-badge-measured">阅读 {{ brand.brandName }} 独立深度评测 →</a>
        <a href="/compare/" class="sg-badge sg-light-badge-vendor">进入品牌对比中心</a>
        <a href="/tools/streaming-check/" class="sg-badge sg-light-badge-measured">查询流媒体实测记录</a>
        <a href="/clients/" class="sg-badge sg-light-badge-untested">查看适配客户端教程</a>
        <a v-for="rb in relatedBrands" :key="rb.slug" :href="`/brands/${rb.slug}/`" class="sg-badge sg-light-badge-untested">
          档案：{{ rb.brandName }}
        </a>
      </div>
    </div>
  </div>
</template>
