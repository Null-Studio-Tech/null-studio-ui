# Null Studio UI

> 创意与功能并重的 UI 组件库，基于 Astro、Tailwind v4、React & Vue 构建。

## 特性

- **创意优先**：采用渐变、玻璃拟态、浮动阴影等现代视觉语言，兼具实用性
- **多框架支持**：每个组件提供 React 与 Vue 两种实现，API 保持一致
- **AI 友好**：每个组件配备两份文档
  - `README.md`：面向开发者的设计原理与使用指南
  - `AI.md`：面向 AI 的精简上下文与代码片段
- **最新技术栈**：
  - Astro v5 静态站点生成
  - Tailwind CSS v4（使用 `@tailwindcss/vite` 插件，无需 PostCSS）
  - ESLint v9 扁平配置 + Prettier

## 快速开始

\`\`\`bash

# 安装依赖

pnpm install

# 启动开发服务器

pnpm dev

# 构建生产版本

pnpm build

# 代码检查与格式化

pnpm lint
pnpm format
\`\`\`

访问 [http://localhost:4321](http://localhost:4321) 查看组件演示。

## 组件分类

### Button（按钮）

- **Primary**：多彩渐变 + 浮动阴影
- **Ghost**：半透明毛玻璃质感

### Container（容器）

- **Glassmorphism**：玻璃拟态风格，支持深色模式

## 项目结构

\`\`\`
src/
├── components/
│ ├── button/
│ │ ├── react/Button.tsx
│ │ ├── vue/Button.vue
│ │ ├── README.md
│ │ └── AI.md
│ └── container/
│ ├── react/Container.tsx
│ ├── vue/Container.vue
│ ├── README.md
│ └── AI.md
├── pages/
│ ├── index.astro # 组件索引首页
│ └── demo/
│ ├── button.astro
│ └── container.astro
├── layouts/Layout.astro
└── styles/global.css # Tailwind v4 入口
\`\`\`

## 技术细节

### Tailwind v4

使用全新的 `@import "tailwindcss";` 语法，无需传统的 `tailwind.config.js`：

- 全局样式：`src/styles/global.css`
- Vite 插件：`@tailwindcss/vite`（已在 `astro.config.mjs` 启用）

### 组件规范

- 每个分类目录包含 `react/` 与 `vue/` 子目录
- `README.md`：设计理念、使用示例、无障碍指南
- `AI.md`：简化的 API、实现路径、使用片段

## 开发计划

- [ ] 更多组件分类（Input、Card、Modal 等）
- [ ] 暗色模式完善
- [ ] 动画库集成（Framer Motion / Vue Motion）
- [ ] Storybook 文档

## License

MIT
