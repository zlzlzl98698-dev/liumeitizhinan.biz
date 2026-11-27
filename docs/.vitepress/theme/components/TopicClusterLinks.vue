<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import navData from '../../../../data/topic-navigation.json';

const route = useRoute();

const normalizedPath = computed(() => {
  let p = route.path.replace(/\.html$/, '');
  if (!p.endsWith('/')) p += '/';
  return p;
});

const entry = computed(() => {
  const routes = (navData as any).routes || {};
  return routes[normalizedPath.value] || null;
});
</script>

<template>
  <section v-if="entry" class="sg-card" style="margin: 28px 0 12px;" aria-label="专题图谱与站内关联导航">
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 12px;">
      <div style="font-weight: 700; font-size: 15px;">
        {{ entry.heading || '关联专题与延伸阅读路径' }}
      </div>
      <span v-if="entry.tierLabel" class="sg-badge sg-light-badge-vendor">{{ entry.tierLabel }}</span>
    </div>

    <div v-if="entry.parents && entry.parents.length" style="margin-bottom: 14px; font-size: 13px; color: var(--sg-muted); display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <span>上级专题：</span>
      <a
        v-for="p in entry.parents"
        :key="p.href"
        :href="p.href"
        class="sg-badge sg-light-badge-untested"
        style="text-decoration: none;"
      >
        ↑ {{ p.title }}
      </a>
    </div>

    <div v-if="entry.children && entry.children.length" style="margin-bottom: 14px;">
      <div style="font-size: 12.5px; font-weight: 600; color: var(--sg-muted); margin-bottom: 8px;">
        本专题核心长尾文章与指南（{{ entry.children.length }} 篇）
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
        <a
          v-for="item in entry.children"
          :key="item.href"
          :href="item.href"
          style="display: block; padding: 10px 12px; border: 1px solid var(--sg-border); border-radius: 8px; text-decoration: none; background: var(--sg-bg);"
        >
          <div style="font-weight: 600; font-size: 13.5px; color: var(--vp-c-brand-1);">{{ item.title }} →</div>
          <div v-if="item.desc" style="font-size: 12px; color: var(--sg-muted); margin-top: 4px; line-height: 1.5;">{{ item.desc }}</div>
        </a>
      </div>
    </div>

    <div v-if="entry.related && entry.related.length" style="margin-bottom: 10px;">
      <div style="font-size: 12.5px; font-weight: 600; color: var(--sg-muted); margin-bottom: 8px;">
        {{ entry.relatedHeading || '相关排障、评测与横向对比' }}
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
        <a
          v-for="item in entry.related"
          :key="item.href"
          :href="item.href"
          style="display: block; padding: 10px 12px; border: 1px solid var(--sg-border); border-radius: 8px; text-decoration: none; background: var(--sg-bg);"
        >
          <div style="font-weight: 600; font-size: 13.5px; color: var(--vp-c-brand-1);">{{ item.title }} →</div>
          <div v-if="item.desc" style="font-size: 12px; color: var(--sg-muted); margin-top: 4px; line-height: 1.5;">{{ item.desc }}</div>
        </a>
      </div>
    </div>
  </section>
</template>
