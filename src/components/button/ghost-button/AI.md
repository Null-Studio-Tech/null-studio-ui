Component: Button
Category: button
Frameworks: react, vue
Props:
- variant: 'primary' | 'ghost' (default: 'primary')
- children: content slot

Design:
- Primary: gradient BG (indigo→purple→pink), hover elevation, visible focus ring.
- Ghost: bordered, translucent, backdrop-blur for glass effect.

Implementation Paths:
- React: `src/components/button/react/Button.tsx`
- Vue: `src/components/button/vue/Button.vue`

Usage Snippets:
- React: `<Button>Label</Button>` / `<Button variant="ghost">Label</Button>`
- Vue: `<Button>Label</Button>` / `<Button variant="ghost">Label</Button>`

Tailwind v4 Notes:
- Global CSS imports `@import "tailwindcss";` in `src/styles/global.css`.
- No PostCSS plugin is required; Vite plugin `@tailwindcss/vite` is enabled in `astro.config.mjs`.
