Component: Container
Category: container
Frameworks: react, vue
Props:

- className?: string (optional)

Design:

- Glassmorphism: translucent white/black surfaces, subtle border and blur.
- Use rounded corners and soft shadow; keep text contrast high.

Implementation Paths:

- React: `src/components/container/react/Container.tsx`
- Vue: `src/components/container/vue/Container.vue`

Usage Snippets:

- React:

  ```tsx
  <Container className="max-w-md">Content</Container>
  ```

- Vue:

  ```vue
  <Container class="max-w-md">Content</Container>
  ```

Tailwind v4 Notes:

- Styles come from global `@import "tailwindcss";` in `src/styles/global.css`.
- Vite plugin `@tailwindcss/vite` is enabled in `astro.config.mjs`.
