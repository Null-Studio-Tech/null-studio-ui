# AspectContainer 宽高比容器组件

AspectContainer 是一个灵活的宽高比容器组件,支持两种工作模式:

1. **默认模式**: 保持固定宽高比,内容自适应布局
2. **缩放模式**: 保持固定宽高比,内容按设计尺寸缩放

## 设计理念

在响应式设计中,我们常常需要:

- 保持特定的宽高比(如视频播放器的 16:9)
- 根据设计稿(如 1920x1080)开发,自动适配不同屏幕尺寸
- 确保内容在任何容器尺寸下都不变形

AspectContainer 组件通过 CSS transform scale 和智能尺寸计算实现了这些需求。

## 功能特性

- ✅ **双模式支持**: 默认模式(自适应布局)和缩放模式(固定设计稿缩放)
- ✅ **多框架实现**: React、Vue、Astro 三种实现,API 完全一致
- ✅ **自动响应**: 使用 ResizeObserver 自动响应容器尺寸变化
- ✅ **高性能**: 使用 GPU 加速的 transform scale,性能优于修改 width/height
- ✅ **灵活配置**: 支持任意宽高比(16:9、4:3、21:9 等)
- ✅ **类型安全**: 完整的 TypeScript 类型定义

## API 说明

### Props

| 属性                  | 类型      | 默认值      | 说明                                   |
| --------------------- | --------- | ----------- | -------------------------------------- |
| `aspectRatio`         | `string`  | `"16:9"`    | 宽高比,格式为 "宽:高",如 "16:9", "4:3" |
| `className` / `class` | `string`  | `""`        | 自定义 CSS 类名                        |
| `scaleContent`        | `boolean` | `false`     | 是否启用内容缩放模式                   |
| `designWidth`         | `number`  | `undefined` | 设计基准宽度(px),启用缩放模式时必需    |

### 计算逻辑

**designHeight 自动计算**:

```
designHeight = designWidth / (宽高比)
例: aspectRatio="16:9", designWidth=1920
    => designHeight = 1920 / (16/9) = 1080
```

**缩放比例计算**:

```
scale = min(容器宽度 / designWidth, 容器高度 / designHeight)
```

## 使用示例

### 默认模式 - 自适应布局

内容根据容器实际尺寸自适应布局,适合响应式设计。

```tsx
// React
import AspectContainer from '@/components/container/aspect-container/AspectContainer.tsx';

<AspectContainer aspectRatio="16:9">
  <div style={{ width: '100%', height: '100%' }}>
    <h2>自适应内容</h2>
    <p>内容会自适应容器尺寸</p>
  </div>
</AspectContainer>
```

```vue
<!-- Vue -->
<script setup>
import AspectContainer from '@/components/container/aspect-container/AspectContainer.vue';
</script>

<template>
  <AspectContainer aspectRatio="16:9">
    <div style="width: 100%; height: 100%;">
      <h2>自适应内容</h2>
      <p>内容会自适应容器尺寸</p>
    </div>
  </AspectContainer>
</template>
```

```astro
---
// Astro
import AspectContainer from '@/components/container/aspect-container/AspectContainer.astro';
---

<AspectContainer aspectRatio="16:9">
  <div style="width: 100%; height: 100%;">
    <h2>自适应内容</h2>
    <p>内容会自适应容器尺寸</p>
  </div>
</AspectContainer>
```

### 缩放模式 - 固定设计稿

内容按固定设计尺寸开发,自动缩放适配容器,适合固定设计稿、演示动画等场景。

```tsx
// React - 1920x1080 设计稿
<AspectContainer
  aspectRatio="16:9"
  scaleContent
  designWidth={1920}
>
  <div style={{ width: 1920, height: 1080 }}>
    <h2 style={{ fontSize: '48px' }}>固定设计稿</h2>
    <p style={{ fontSize: '24px' }}>按 1920x1080 设计,自动缩放</p>
    <button style={{ padding: '20px 40px', fontSize: '18px' }}>
      固定尺寸按钮
    </button>
  </div>
</AspectContainer>
```

```vue
<!-- Vue - 1280x960 设计稿 -->
<AspectContainer
  aspectRatio="4:3"
  :scaleContent="true"
  :designWidth="1280"
>
  <div :style="{ width: '1280px', height: '960px' }">
    <h2 :style="{ fontSize: '40px' }">4:3 设计稿</h2>
    <p :style="{ fontSize: '20px' }">传统显示器比例</p>
  </div>
</AspectContainer>
```

```astro
---
// Astro - 2560x1080 超宽屏设计稿
import AspectContainer from '@/components/container/aspect-container/AspectContainer.astro';
---

<AspectContainer
  aspectRatio="21:9"
  scaleContent={true}
  designWidth={2560}
>
  <div style="width: 2560px; height: 1080px;">
    <h2 style="font-size: 52px;">21:9 超宽屏</h2>
    <p style="font-size: 26px;">适合电影级宽屏</p>
  </div>
</AspectContainer>
```

## 使用场景

### 默认模式适用场景

- 视频播放器容器(保持 16:9 比例)
- 图片展示区域(避免变形)
- 卡片组件(固定宽高比)
- 响应式设计中需要保持比例的元素

### 缩放模式适用场景

- **固定设计稿适配**: 按照固定分辨率(如 1920x1080)设计界面,自动适配不同屏幕
- **演示动画**: PPT 式的全屏演示,内容按固定尺寸设计
- **数据大屏**: 数据可视化大屏,按固定尺寸布局,自动缩放到显示器
- **游戏界面**: 游戏 UI 按固定尺寸设计,缩放适配不同分辨率
- **原型演示**: 设计原型按固定尺寸开发,演示时自动适配

## 模式对比

| 特性     | 默认模式                  | 缩放模式           |
| -------- | ------------------------- | ------------------ |
| 内容布局 | 响应式,使用百分比/flex 等 | 固定像素尺寸       |
| 文字大小 | 可能需要响应式调整        | 固定大小,自动缩放  |
| 元素尺寸 | 相对单位(%, rem, em)      | 绝对单位(px)       |
| 开发方式 | 响应式布局思维            | 固定设计稿思维     |
| 性能     | 标准 DOM 渲染             | GPU 加速 transform |
| 适用场景 | 灵活布局需求              | 固定设计稿需求     |

## 技术细节

### 尺寸计算策略

容器使用 **contain 策略**:优先填充宽度或高度,确保至少一个维度与父容器相同,内容完整显示。

```typescript
// 伪代码
const heightByWidth = parentWidth / ratio;
const widthByHeight = parentHeight * ratio;

if (heightByWidth <= parentHeight) {
  // 宽度填满,高度居中
  finalWidth = parentWidth;
  finalHeight = heightByWidth;
} else {
  // 高度填满,宽度居中
  finalWidth = widthByHeight;
  finalHeight = parentHeight;
}
```

### Transform Scale 性能优化

- **GPU 加速**: `transform: scale()` 触发 GPU 加速,性能优于修改 width/height
- **单次重排**: 所有样式更新在一次重排中完成
- **避免抖动**: 使用 ResizeObserver 而非 window.resize

### 注意事项

1. **缩放比例限制**: 建议 scale > 0.5,过小的缩放可能导致文本模糊
2. **事件区域**: 缩放后的元素,鼠标事件区域保持原始尺寸
3. **溢出处理**: 组件自动设置 `overflow: hidden`,避免缩放溢出
4. **设计尺寸**: 缩放模式下,内容必须使用固定像素尺寸(px)

## 浏览器兼容性

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ 支持 ResizeObserver 的所有现代浏览器

## 常见问题

### Q: 何时使用默认模式,何时使用缩放模式?

**A**:

- 如果你的内容是响应式的(使用 %, flex, grid 等),使用**默认模式**
- 如果你有一个固定分辨率的设计稿,希望等比缩放,使用**缩放模式**

### Q: 缩放模式下文字会模糊吗?

**A**:

- 缩放比例接近 1 时,几乎无损
- 缩放比例 > 0.5 时,清晰度可接受
- 缩放比例 < 0.5 时,可能出现模糊,建议调整设计尺寸

### Q: 可以嵌套使用吗?

**A**: 技术上可以,但不推荐。嵌套会导致多次缩放计算,可能影响性能和精度。

### Q: 支持动态修改宽高比吗?

**A**: 支持!所有三个实现都监听了属性变化,修改 `aspectRatio`、`scaleContent`、`designWidth` 会自动重新计算。

## 相关组件

- **GlassmorphismContainer**: 毛玻璃效果容器
- 更多容器组件开发中...

## License

MIT
