# Centralized Data Fetching Solution

This document describes the comprehensive data fetching solution that combines TypeScript types, centralized API calls, and automatic SEO handling.

## Overview

The solution provides:

- **Type-safe data fetching** with proper TypeScript types
- **Centralized API management** through composables
- **Automatic SEO handling** with meta tags and structured data
- **Enhanced error handling** and loading states
- **Consistent patterns** across all pages

## Core Components

### 1. `useStrapiData` - Main Composable

Located in `composables/useStrapiData.ts`, this is the core composable that handles all data fetching.

```typescript
import { usePortfolioPage } from '~/composables/useStrapiData';

// Basic usage with automatic SEO
const { data, pending, error, refresh } = await usePortfolioPage();

// With custom options
const { data, pending, error, refresh } = await usePortfolioPage({
  applySeo: true, // Apply SEO meta tags
  lazy: false, // Load immediately
  server: true, // Server-side rendering
  key: 'custom-key', // Custom cache key
});
```

### 2. `useSeoMetaCustom` - SEO Management

Located in `composables/useSeoMetaCustom.ts`, handles all SEO-related functionality.

```typescript
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';

const { metaTagsObj, structuredData, applyStructuredData } = useSeoMetaCustom(
  seoData,
  {
    defaultTitle: 'My Portfolio',
    defaultDescription: 'Portfolio description',
    titleTemplate: '%s | My Site',
  }
);

// Apply meta tags
useSeoMeta(metaTagsObj);

// Apply structured data
applyStructuredData();
```

### 3. TypeScript Types

All types are defined in `types/strapiTypes.ts`:

```typescript
import type {
  PortfolioPage,
  JavascriptPage,
  ServicesPage,
  FAQPage,
  PricePage,
  Sidebar,
} from '~/types/strapiTypes';
```

## Available Composables

### Page-Specific Composables

Each page has its own typed composable:

```typescript
// Portfolio page
const { data, pending, error, refresh } = await usePortfolioPage();

// JavaScript page
const { data, pending, error, refresh } = await useJavascriptPage();

// Services page
const { data, pending, error, refresh } = await useServicesPage();

// FAQ page
const { data, pending, error, refresh } = await useFaqPage();

// Price calculator page
const { data, pending, error, refresh } = await usePricePage();

// Sidebar data
const { data, pending, error, refresh } = await useSidebarData();
```

### Loading State Management

Use `useLoadingState` for enhanced loading state management:

```typescript
import { useLoadingState } from '~/composables/useStrapiData';

const { data, pending, error } = await usePortfolioPage();
const { isLoading, hasError, isReady } = useLoadingState(pending, error);
```

## Usage Examples

### Basic Page Implementation

```vue
<script setup lang="ts">
import { usePortfolioPage, useLoadingState } from '~/composables/useStrapiData';
import type { PortfolioPage } from '~/types/strapiTypes';

// Fetch data with automatic SEO
const { data, pending, error, refresh } = await usePortfolioPage({
  applySeo: true,
});

// Enhanced loading states
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Computed properties for template
const pageContent = computed(() => data.value);
const pageTitle = computed(() => pageContent.value?.title || 'Portfolio');
</script>

<template>
  <section>
    <div v-if="isLoading" class="loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="hasError" class="error">
      <p>Failed to load content.</p>
      <button @click="refresh">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent">
      <h1>{{ pageTitle }}</h1>
      <!-- Your content here -->
    </div>
  </section>
</template>
```

### Advanced Usage with Custom SEO

```vue
<script setup lang="ts">
import { useFaqPage } from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';

const { data } = await useFaqPage({ applySeo: false }); // Disable auto SEO

// Custom SEO handling
const { metaTagsObj, applyStructuredData } = useSeoMetaCustom(data.value?.seo, {
  defaultTitle: 'FAQ - Help Center',
  defaultDescription: 'Find answers to common questions',
  titleTemplate: '%s | Help Center',
});

// Apply custom meta tags
useSeoMeta(metaTagsObj);

// Apply structured data for FAQ
applyStructuredData();
</script>
```

### Data Transformation

For complex data transformation (like the price calculator):

```typescript
// Transform data before using
const calculatorData = computed(() => {
  const calculator = pageContent.value?.calculator || [];
  return calculator.map((block) => ({
    ...block,
    option: block.option.map((option) => ({
      ...option,
      active: false, // Add required properties
    })),
  }));
});
```

## Best Practices

### 1. Always Use Type Safety

```typescript
// ✅ Good - Typed
import type { PortfolioPage } from '~/types/strapiTypes';
const { data } = await usePortfolioPage();

// ❌ Bad - Untyped
const { data } = await useAsyncData('portfolio', () =>
  useStrapi().findOne('portfolio')
);
```

### 2. Handle Loading States Properly

```vue
<template>
  <!-- ✅ Good - Comprehensive state handling -->
  <div v-if="isLoading" class="loading">Loading...</div>
  <div v-else-if="hasError" class="error">
    <p>Error occurred</p>
    <button @click="refresh">Retry</button>
  </div>
  <div v-else-if="isReady && data">
    <!-- Content -->
  </div>
  <div v-else>No content available</div>
</template>
```

### 3. Use Computed Properties

```typescript
// ✅ Good - Computed properties for better reactivity
const pageTitle = computed(() => data.value?.title || 'Default Title');
const items = computed(() => data.value?.items || []);

// ❌ Bad - Direct access in template
// {{ data?.title || 'Default Title' }}
```

### 4. SEO Configuration

```typescript
// ✅ Good - Enable SEO for public pages
const { data } = await usePortfolioPage({ applySeo: true });

// ✅ Good - Disable SEO for components like Sidebar
const { data } = await useSidebarData({ applySeo: false });
```

## Error Handling

The solution provides comprehensive error handling:

```typescript
// Automatic error handling with user-friendly messages
const { data, pending, error, refresh } = await usePortfolioPage();

// Custom error handling
if (error.value) {
  console.error('Failed to load portfolio:', error.value);
  // Handle error appropriately
}
```

## Performance Considerations

- **Server-side rendering**: Enabled by default for better SEO
- **Caching**: Automatic caching with unique keys
- **Lazy loading**: Available for non-critical data
- **Parallel loading**: Multiple composables can load simultaneously

## Migration Guide

### From Old Pattern

```typescript
// ❌ Old pattern
const { data } = await useAsyncData('portfolio', () =>
  useStrapi().findOne('portfolio')
);
const content = computed(() => (data.value as any)?.data);
```

### To New Pattern

```typescript
// ✅ New pattern
const { data } = await usePortfolioPage({ applySeo: true });
const content = computed(() => data.value);
```

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Ensure you're importing the correct types
2. **SEO not working**: Check that `applySeo: true` is set
3. **Loading states**: Use `useLoadingState` for better state management
4. **Data not reactive**: Use computed properties instead of direct access

### Debug Mode

Enable debug mode by checking the browser console for detailed error messages and API responses.

## Future Enhancements

- [ ] Add pagination support
- [ ] Implement data caching strategies
- [ ] Add offline support
- [ ] Enhance error recovery mechanisms
- [ ] Add performance monitoring
