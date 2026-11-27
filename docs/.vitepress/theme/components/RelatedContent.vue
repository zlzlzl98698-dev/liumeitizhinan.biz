<script setup lang="ts">
defineProps<{
  links: { title: string; href: string; desc?: string }[];
  heading?: string;
}>();
</script>

<template>
  <div class="sg-card" style="margin: 24px 0;">
    <div style="font-weight: 700; font-size: 15px; margin-bottom: 12px;">{{ heading || '下一步推荐阅读与相关专题' }}</div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        style="display: block; padding: 10px 12px; border: 1px solid var(--sg-border); border-radius: 8px; text-decoration: none; background: var(--sg-bg);"
      >
        <div style="font-weight: 600; font-size: 13.5px; color: var(--vp-c-brand-1);">{{ l.title }} →</div>
        <div v-if="l.desc" style="font-size: 12px; color: var(--sg-muted); margin-top: 4px;">{{ l.desc }}</div>
      </a>
    </div>
  </div>
</template>
