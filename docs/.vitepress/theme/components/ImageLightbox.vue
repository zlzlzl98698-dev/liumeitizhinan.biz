<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const activeSrc = ref<string | null>(null);
const activeAlt = ref('');

function close() {
  activeSrc.value = null;
  activeAlt.value = '';
}

function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target || target.tagName !== 'IMG') return;
  const img = target as HTMLImageElement;
  if (img.closest('a') || img.classList.contains('no-zoom')) return;
  if (img.closest('.VPNavBar') || img.closest('.sg-meta-bar')) return;

  const isEvidence = Boolean(img.closest('figure') || img.closest('.sg-observatory'));
  if (!isEvidence && img.clientWidth < 180) return;

  activeSrc.value = img.currentSrc || img.src;
  const figcap = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
  activeAlt.value = figcap || img.alt || '原图预览';
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && activeSrc.value) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="activeSrc"
      role="dialog"
      aria-modal="true"
      aria-label="图片放大预览"
      @click.self="close"
      style="position: fixed; inset: 0; z-index: 9999; background: rgba(2, 6, 23, 0.88); backdrop-filter: blur(4px); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; cursor: zoom-out;"
    >
      <button
        type="button"
        @click="close"
        aria-label="关闭大图预览"
        style="position: fixed; top: 16px; right: 20px; background: rgba(15, 23, 42, 0.85); color: #f8fafc; border: 1px solid rgba(148,163,184,0.35); border-radius: 999px; padding: 6px 14px; font-size: 13px; font-weight: 600; cursor: pointer;"
      >
        关闭 (ESC) ✕
      </button>
      <img
        :src="activeSrc"
        :alt="activeAlt"
        style="max-width: 94vw; max-height: 82vh; width: auto; height: auto; border-radius: 10px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65); background: #0f172a; cursor: default;"
      />
      <div
        v-if="activeAlt"
        style="margin-top: 12px; max-width: 780px; text-align: center; font-size: 12.5px; color: #cbd5e1; line-height: 1.6;"
      >
        {{ activeAlt }}
      </div>
    </div>
  </Teleport>
</template>
