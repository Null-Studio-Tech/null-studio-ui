# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Null Studio UI is a creative UI component library built with Astro, Tailwind CSS v4, React, and Vue. Each component provides dual-framework implementations (React & Vue) with consistent APIs, featuring modern visual design (gradients, glassmorphism, shadows).

## Development Commands

```bash
# Development server (http://localhost:4321)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Linting (ESLint v9 flat config)
pnpm lint

# Code formatting
pnpm format
```

## Architecture

### Multi-Framework Component System

Each component exists in its category directory with parallel React and Vue implementations:

```plaintext
src/components/{category}/{component-name}/
├── {ComponentName}.tsx          # React implementation
├── {ComponentName}.vue          # Vue implementation
├── {ComponentName}.astro        # Astro implementation
├── README.md                    # Developer documentation (design philosophy, usage)
└── AI.md                        # AI-friendly docs (concise API, code snippets)
```

**Key Principles:**

- React and Vue components share identical prop APIs (converted to Vue props)
- Styling is handled entirely through Tailwind utility classes
- No external CSS modules - all styles inline via className/class
- Components are self-contained with no cross-dependencies

### Astro Integration

- **Astro v5** serves as the static site generator for demos
- Both React (`@astrojs/react`) and Vue (`@astrojs/vue`) integrations are active
- Demo pages in `src/pages/demo/*.astro` showcase components from both frameworks
- Base layout: [src/layouts/Layout.astro](src/layouts/Layout.astro) imports global styles

### Tailwind CSS v4 Configuration

**Important:** This project uses Tailwind v4's new architecture - no `tailwind.config.js` exists.

- Global import: [src/styles/global.css](src/styles/global.css) contains `@import "tailwindcss";`
- Vite plugin handles compilation: `@tailwindcss/vite` in [astro.config.mjs](astro.config.mjs)
- All customizations go in [src/styles/global.css](src/styles/global.css) using CSS variables or `@theme`
- No PostCSS configuration needed

### ESLint Setup

Uses ESLint v9's flat configuration format ([eslint.config.mjs](eslint.config.mjs)):

- TypeScript files: `@typescript-eslint/parser`
- Astro files: `eslint-plugin-astro` with TypeScript parser
- React files: `eslint-plugin-react` + `eslint-plugin-react-hooks`
- Vue files: `vue-eslint-parser` with TypeScript
- **Browser globals**: All file types include `globals.browser` for DOM APIs (ResizeObserver, HTMLElement, etc.)

## Component Development Workflow

When adding a new component:

1. **Create directory structure:**

   ```plaintext
   src/components/{category}/{component-name}/
   ```

2. **Implement both frameworks:**
   - Create `{ComponentName}.tsx` (React) with typed props
   - Create `{ComponentName}.vue` (Vue) with equivalent props using `defineProps<T>()`
   - Ensure prop names match exactly between implementations

3. **Add documentation:**
   - `README.md`: Detailed design rationale, usage examples, accessibility notes (Chinese)
   - `AI.md`: Terse API reference with code snippets for AI agents (English)

4. **Create demo page:**

   ```astro
   // src/pages/demo/{component-name}.astro
   ---
   import Layout from '@/layouts/Layout.astro';
   import ComponentReact from '@/components/{category}/{component-name}/{ComponentName}.tsx';
   import ComponentVue from '@/components/{category}/{component-name}/{ComponentName}.vue';
   ---
   <Layout>
     {/* Side-by-side React/Vue examples */}
   </Layout>
   ```

5. **Styling guidelines:**
   - Use Tailwind utilities exclusively (no inline `style` attributes)
   - Follow glassmorphism patterns: `backdrop-blur-md`, `bg-white/60`, `border-white/20`
   - Support dark mode with `dark:` variant classes
   - Keep responsiveness in mind (`sm:`, `md:`, `lg:` breakpoints)

## File Paths and Imports

**Path Alias Configuration:**

- `@` is configured to resolve to the `src/` directory
- Configured in both [tsconfig.json](tsconfig.json) (TypeScript) and [astro.config.mjs](astro.config.mjs) (Vite)

**Usage Examples:**

```astro
// Astro files
import Layout from '@/layouts/Layout.astro';
import Component from '@/components/{category}/{name}/{Name}.tsx';
```

```tsx
// React/TypeScript files
import { someUtil } from "@/utils/helpers";
import Component from "@/components/button/Button";
```

```vue
<!-- Vue files -->
<script setup lang="ts">
import Component from "@/components/container/Container.vue";
</script>
```

## Visual Design Language

Components follow these creative principles:

- **Glassmorphism:** Translucent backgrounds with backdrop blur (`backdrop-blur-md`, `bg-white/60`)
- **Soft shadows:** Multiple shadow layers for depth (`shadow-xl`, custom shadows)
- **Rounded corners:** Generous border radius (`rounded-2xl`, `rounded-xl`)
- **Color gradients:** Multi-color gradients for accents (`bg-gradient-to-r`)
- **High contrast text:** Ensure readability over glassmorphic backgrounds

## Key Technical Constraints

1. **No client-side routing:** Astro's static MPA model - each page is a separate HTML file
2. **Islands architecture:** React/Vue components are isolated - use Astro props to pass data
3. **Build output:** Static HTML in `dist/` - no server runtime
4. **Type safety:** `tsconfig.json` extends `astro/tsconfigs/strict` - maintain type coverage

## Testing and Quality

- No test framework currently configured
- Quality assurance via ESLint + Prettier + TypeScript type checking
- Manual testing through demo pages at `http://localhost:4321/demo/*`
