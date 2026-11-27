<script setup lang="ts">
import { ref, computed } from 'vue';

const selectedPlatform = ref('netflix');
const selectedSymptom = ref('originals-only');

const tree: Record<string, { label: string; symptoms: { id: string; label: string; cause: string; steps: string[]; url: string }[] }> = {
  netflix: {
    label: 'Netflix 奈飞',
    symptoms: [
      {
        id: 'originals-only',
        label: '只能看到自制剧，搜不到第三方版权剧集',
        cause: '当前出口 IP 被 Netflix 识别为普通机房 IP，触发非原生版权过滤。',
        steps: ['切换至标注支持 Netflix 版权片库的节点（如新加坡、日本、美国或香港原生出口）', '关闭客户端 IPv6 或确保 IPv6 同步代理', '重启 Netflix App 清除旧区域缓存'],
        url: '/troubleshooting/netflix-network-error/'
      },
      {
        id: 'proxy-error',
        label: '播放报错 E114 / M7111-5059（检测到代理或解锁器）',
        cause: '出口 IP 或 DNS 解析出口被列入风控清单，或浏览器 WebRTC/DNS 与节点区域不一致。',
        steps: ['启用客户端自带远程 DNS（DoH/Fake-IP），避免本地 DNS 泄漏', '更换同区域其他节点重试', '检查账号是否处于同户验证限制期'],
        url: '/troubleshooting/netflix-playback-error/'
      },
      {
        id: 'low-res',
        label: '画质一直停留在 480p / 720p 无法升至 4K',
        cause: '并非单纯网速问题，常受限于账号等级（需 Premium）、浏览器 DRM（Chrome 最高 720p）或显示器 HDCP 2.2。',
        steps: ['Windows 使用 Edge 或官方客户端，macOS 使用 Safari', '确认账号为高级套餐且播放设置设为“高”', '测试节点下行吞吐是否稳定达到 25 Mbps 以上'],
        url: '/ai/netflix-4k-guide/'
      }
    ]
  },
  youtube: {
    label: 'YouTube 油管',
    symptoms: [
      {
        id: 'buffering',
        label: '4K 视频一直转圈缓冲或峰值跑不满',
        cause: '晚高峰国际出口拥堵、节点 CDN 调度跨洲，或 QUIC/UDP 丢包严重。',
        steps: ['优先切换近港/近新/近日本地区优质中转或 IEPL 专线节点', '在浏览器尝试关闭 Experimental QUIC protocol 对比 TCP 吞吐', '检查是否开启了全局而非规则分流导致带宽占用'],
        url: '/troubleshooting/youtube-buffering/'
      },
      {
        id: 'cn-region',
        label: '节点地区显示 CN（送中），Premium 后台播放与下载失效',
        cause: 'Google 将该节点 IP 归属地修正为中国大陆，常见于部分被高频共享的新加坡/台湾段。',
        steps: ['更换未送中的日本、美国或香港优质落地节点', '在客户端禁用 IPv6 避免双栈地址泄漏位置', '检查账号所属地区与浏览器位置权限'],
        url: '/ai/youtube-cdn-dns/'
      }
    ]
  },
  chatgpt: {
    label: 'ChatGPT (OpenAI)',
    symptoms: [
      {
        id: 'something-wrong',
        label: '页面提示 Something went wrong 或无法发送消息',
        cause: '出口 IP 地区不受支持（如香港网页端受限）、机房共享 IP 被风控，或桌面客户端未开启 TUN 模式。',
        steps: ['切至美国、日本或新加坡节点（注意部分机场香港节点仅限 App 可用）', '开启 Clash Verge Rev / v2rayN 的 TUN 模式接管所有进程', '禁用 IPv6 或强制 OpenAI 域名走 IPv4 出口'],
        url: '/troubleshooting/chatgpt-network-error/'
      },
      {
        id: 'login-loop',
        label: '登录验证无限循环或 Cloudflare 1020 拦截',
        cause: '高频共享节点 IP 触发 Cloudflare 安全挑战，或认证域名与对话域名分流到了不同国家节点。',
        steps: ['将 openai.com、chatgpt.com、auth0.com 统一绑定至同一个固定节点策略组', '清理站点 Cookie 后重新登录', '避免使用自动测速切换策略组'],
        url: '/ai/chatgpt-login-environment/'
      }
    ]
  },
  claude: {
    label: 'Claude (Anthropic)',
    symptoms: [
      {
        id: 'unavailable',
        label: '提示地区不可用或登录后不久触发风控停用',
        cause: 'Claude 对机房 ASN 声誉与对话期间 IP 频繁跨区跳变极为敏感。',
        steps: ['务必使用固定单节点（美/日/新/英），关闭负载均衡或自动切换', '避免使用人数过多的低价共享公共节点注册新号'],
        url: '/troubleshooting/claude-access-error/'
      }
    ]
  },
  gemini: {
    label: 'Gemini (Google)',
    symptoms: [
      {
        id: 'gemini-error',
        label: '提示 Something went wrong 或所在国家不可用',
        cause: '出口 IP 位于香港或被 Google 识别为送中 IP，或 Google 账号自身国家/年龄属性未满足条件。',
        steps: ['切换至美国或新加坡支持 Gemini 的节点', '核对 Google 账号关联地区与年龄验证状态', '统一 google.com 与 gemini.google.com 路由出口'],
        url: '/troubleshooting/gemini-error/'
      }
    ]
  }
};

const currentSymptoms = computed(() => tree[selectedPlatform.value]?.symptoms || []);
const activeSymptom = computed(() =>
  currentSymptoms.value.find((s) => s.id === selectedSymptom.value) || currentSymptoms.value[0]
);

function selectPlatform(key: string) {
  selectedPlatform.value = key;
  selectedSymptom.value = tree[key].symptoms[0].id;
}
</script>

<template>
  <div class="sg-card" style="border-top: 3px solid #0284c7; margin: 18px 0;">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
      <div>
        <div style="font-size: 11.5px; color: var(--vp-c-brand-1); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
          Interactive Diagnostic Flow · 流媒体与 AI 故障快速定位
        </div>
        <h3 style="margin: 2px 0 0; font-size: 18px;">先定位平台与症状，再决定是改配置还是换节点</h3>
      </div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
      <button
        v-for="(val, key) in tree"
        :key="key"
        type="button"
        @click="selectPlatform(String(key))"
        :style="{
          padding: '7px 14px',
          borderRadius: '8px',
          border: '1px solid ' + (selectedPlatform === key ? '#0284c7' : 'var(--sg-border)'),
          background: selectedPlatform === key ? '#0284c7' : 'var(--sg-bg)',
          color: selectedPlatform === key ? '#ffffff' : 'var(--sg-text)',
          fontWeight: 600,
          fontSize: '13px',
          cursor: 'pointer'
        }"
      >
        {{ val.label }}
      </button>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
      <button
        v-for="sym in currentSymptoms"
        :key="sym.id"
        type="button"
        @click="selectedSymptom = sym.id"
        :style="{
          padding: '6px 12px',
          borderRadius: '999px',
          border: '1px solid ' + (activeSymptom?.id === sym.id ? '#0891b2' : 'var(--sg-border)'),
          background: activeSymptom?.id === sym.id ? 'rgba(8, 145, 178, 0.12)' : 'transparent',
          color: activeSymptom?.id === sym.id ? '#0891b2' : 'var(--sg-muted)',
          fontSize: '12.5px',
          fontWeight: 600,
          cursor: 'pointer'
        }"
      >
        {{ sym.label }}
      </button>
    </div>

    <div v-if="activeSymptom" style="background: rgba(2, 132, 199, 0.05); border: 1px solid var(--sg-border); border-radius: 10px; padding: 14px 16px;">
      <div style="font-size: 13.5px; margin-bottom: 8px;">
        <strong>首要原因判断：</strong>{{ activeSymptom.cause }}
      </div>
      <div style="font-size: 13px; font-weight: 600; margin-bottom: 6px;">建议优先检查步骤：</div>
      <ol style="margin: 0 0 12px; padding-left: 18px; font-size: 13px; line-height: 1.7; color: var(--sg-muted);">
        <li v-for="(st, i) in activeSymptom.steps" :key="i">{{ st }}</li>
      </ol>
      <a :href="activeSymptom.url" class="sg-cta-btn">查看完整排查与验证教程 →</a>
    </div>
  </div>
</template>
