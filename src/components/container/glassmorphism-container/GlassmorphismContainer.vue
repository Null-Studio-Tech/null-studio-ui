<script setup lang="ts">
defineProps<{ className?: string }>();
</script>

<template>
  <div
    class="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-100"
    :class="className"
  >
    <slot />
  </div>
</template>
