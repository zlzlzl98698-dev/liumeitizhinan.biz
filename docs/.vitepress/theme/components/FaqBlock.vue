<script setup lang="ts">
defineProps<{
  items: { q: string; a: string }[];
}>();
</script>

<template>
  <div style="margin: 20px 0;">
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <details v-for="(item, idx) in items" :key="idx" open class="sg-card sg-faq-details" style="padding: 16px;">
        <summary class="sg-faq-q" style="margin: 0; list-style: none; cursor: pointer;">
          <span class="sg-faq-pill">Q{{ idx + 1 }}</span>
          <span style="flex: 1;">{{ item.q }}</span>
          <span class="sg-faq-chevron" aria-hidden="true">▾</span>
        </summary>
        <p style="margin: 10px 0 0; font-size: 13.5px; line-height: 1.72; color: var(--sg-muted);">{{ item.a }}</p>
      </details>
    </div>
  </div>
</template>
