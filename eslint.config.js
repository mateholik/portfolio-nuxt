import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt(
  {
    features: {
      typescript: true,
      vue: true,
    },
  },
  {
    ignores: ['.nuxt', '.output', 'dist', 'node_modules', '*.d.ts', 'public'],
    rules: {
      // Relax some strict rules for your project
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/html-self-closing': 'warn',
      'vue/attributes-order': 'warn',
      'vue/attribute-hyphenation': 'warn',

      // Make TypeScript errors fail the build
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
);
