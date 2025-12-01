# Button 按钮

- 功能定位：交互式触发操作的核心控件，强调创意与动效表现。
- 设计要点：
  - Primary 使用多彩渐变与轻微浮动阴影，传达活力与焦点；
  - Ghost 适用于次要操作，半透明与毛玻璃质感更低干扰；
  - 焦点可见性与键盘可达性通过 `focus-visible` 与 `ring` 保证。

## 使用示例

### React

```tsx
import Button from '@/components/button/react/Button';

export default function Demo() {
  return (
    <div className="flex gap-3">
      <Button>Primary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import Button from '@/components/button/vue/Button.vue'
</script>

<template>
  <div class="flex gap-3">
    <Button>Primary</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
</template>
```

## 无障碍

- 使用 `button` 语义标签与可见焦点环。
- 色彩对比建议满足 WCAG AA。

## 自定义

- 可通过替换渐变色或添加图标扩展风格。
- 支持在容器上叠加 `data-loading` 等状态做动效。
