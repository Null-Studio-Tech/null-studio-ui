# Container 容器

- 功能定位：承载内容的基础外框，提升分组与层次；
- 视觉风格：玻璃拟态（毛玻璃）、半透明、柔和阴影，营造轻盈现代感；
- 适用场景：卡片、信息面板、工具浮层等。

## 使用示例

### React

```tsx
import Container from "@/components/container/react/Container";

export default function Demo() {
  return (
    <Container>
      <h3 className="text-lg font-semibold">Hello</h3>
      <p className="text-sm text-gray-600">Creative glassmorphism container.</p>
    </Container>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import Container from "@/components/container/vue/Container.vue";
</script>

<template>
  <Container>
    <h3 class="text-lg font-semibold">Hello</h3>
    <p class="text-sm text-gray-600">Creative glassmorphism container.</p>
  </Container>
</template>
```

## 无障碍

- 容器用于视觉分组，无特定语义；根据内容选用合适语义标签（section/article/aside）。
- 保持文本对比度可读。
