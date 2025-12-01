import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  { ignores: ["dist", "node_modules", "*.log", ".astro"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroPlugin.parser,
      parserOptions: { parser: tseslint.parser },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: { react: reactPlugin, "react-hooks": reactHooks },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, extraFileExtensions: [".vue"] },
      globals: {
        ...globals.browser,
      },
    },
    plugins: { vue: vuePlugin },
    rules: { ...vuePlugin.configs["flat/recommended"].rules },
  },
];
