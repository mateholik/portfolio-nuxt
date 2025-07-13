# ESLint Configuration

This project uses ESLint for code quality and consistency across Vue.js, TypeScript, and JavaScript files.

## Configuration

- **Config File**: `eslint.config.js`
- **Framework**: Nuxt 3 ESLint config with TypeScript and Vue support
- **Rules**: Relaxed rules for practical development

## Available Scripts

```bash
# Run ESLint on all files
pnpm lint

# Run ESLint with auto-fix
pnpm lint:fix
```

## VS Code Integration

The project includes VS Code settings (`.vscode/settings.json`) that:

- Enable ESLint validation for Vue, TypeScript, and JavaScript files
- Auto-fix ESLint issues on save
- Format code on save

## Current Rule Configuration

### Relaxed Rules

- `vue/multi-word-component-names`: OFF (allows single-word component names)
- `vue/no-v-html`: WARN (allows v-html with warning)
- `vue/html-self-closing`: WARN (flexible self-closing tags)
- `vue/attributes-order`: WARN (flexible attribute ordering)
- `vue/attribute-hyphenation`: WARN (flexible attribute naming)
- `@typescript-eslint/no-unused-vars`: WARN (unused variables as warnings)
- `@typescript-eslint/no-explicit-any`: WARN (any type as warning)

### Ignored Files

- `.nuxt/` - Build directory
- `.output/` - Generated static files
- `dist/` - Distribution directory
- `node_modules/` - Dependencies
- `*.d.ts` - Type declaration files
- `public/` - Static assets

## Common Issues and Solutions

### Unused Variables

If you have intentionally unused variables, prefix them with underscore:

```typescript
// ❌ ESLint warning
const data = await fetch();

// ✅ No warning
const _data = await fetch();
```

### v-html Security

The `v-html` directive triggers warnings for XSS protection. Only use with trusted content:

```vue
<!-- ⚠️ Warning: potential XSS -->
<div v-html="userContent"></div>

<!-- ✅ Safe: sanitized content -->
<div v-html="sanitizedContent"></div>
```

### Self-closing Tags

ESLint prefers consistent self-closing tags:

```vue
<!-- ✅ Preferred -->
<img src="image.jpg" />
<MyComponent />

<!-- ⚠️ Warning -->
<img src="image.jpg">
<MyComponent></MyComponent>
```

## Customizing Rules

To modify ESLint rules, edit `eslint.config.js`:

```javascript
export default createConfigForNuxt(
  {
    // ... existing config
  },
  {
    rules: {
      // Add or modify rules here
      'vue/no-v-html': 'off', // Disable v-html warnings
      'vue/multi-word-component-names': 'error', // Enforce multi-word names
    },
  }
);
```
