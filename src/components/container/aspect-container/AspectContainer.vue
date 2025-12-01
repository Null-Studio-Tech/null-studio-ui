<template>
  <div
    ref="containerRef"
    class="aspect-container"
    :class="className"
  >
    <div
      ref="contentRef"
      class="aspect-container-content"
      :style="contentStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

// 确保 DOM 类型可用
type HTMLDiv = globalThis.HTMLDivElement;
type ResizeObs = globalThis.ResizeObserver;

interface Props {
  aspectRatio?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '16:9',
  class: '',
});

const containerRef = ref<HTMLDiv | null>(null);
const contentRef = ref<HTMLDiv | null>(null);
const contentStyle = ref({
  width: '100%',
  height: '100%',
});

let resizeObserver: ResizeObs | null = null;

// 解析宽高比
const parseAspectRatio = (aspectRatio: string): number => {
  const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number);
  return widthRatio / heightRatio;
};

const ratio = computed(() => parseAspectRatio(props.aspectRatio));

// 调整尺寸
const adjust = () => {
  if (!containerRef.value) return;

  const parentWidth = containerRef.value.clientWidth;
  const parentHeight = containerRef.value.clientHeight;

  if (parentWidth === 0 || parentHeight === 0) {
    return;
  }

  // 计算基于父容器宽度的高度
  const heightByWidth = parentWidth / ratio.value;
  // 计算基于父容器高度的宽度
  const widthByHeight = parentHeight * ratio.value;

  let finalWidth: number;
  let finalHeight: number;

  // 策略：优先填充宽度或高度，确保至少一个维度与父容器相同
  if (heightByWidth <= parentHeight) {
    finalWidth = parentWidth;
    finalHeight = heightByWidth;
  } else {
    finalWidth = widthByHeight;
    finalHeight = parentHeight;
  }

  // 更新样式
  contentStyle.value = {
    width: `${finalWidth}px`,
    height: `${finalHeight}px`,
  };
};

// 监听 aspectRatio 变化
watch(() => props.aspectRatio, () => {
  adjust();
});

// 组件挂载后初始化
onMounted(() => {
  if (!containerRef.value) return;

  // 初始调整
  adjust();

  // 监听容器尺寸变化
  resizeObserver = new (globalThis.ResizeObserver)(() => {
    adjust();
  });

  resizeObserver.observe(containerRef.value);
});

// 组件卸载时清理
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

// 暴露 className 用于 class 绑定
const className = computed(() => props.class);
</script>

<style scoped>
.aspect-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.aspect-container-content {
  position: relative;
}
</style>
