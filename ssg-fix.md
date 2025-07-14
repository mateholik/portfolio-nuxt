# SSG Data Fetching Fix Summary

## Problem

After deploying a Nuxt 3 SSG build to production, the static site was still making runtime API calls to Strapi endpoints (`localhost:1337/api/services-page`, etc.), causing `net::ERR_CONNECTION_REFUSED` errors when Strapi wasn't running.

## Root Cause

- Only `sidebar` data was being fetched during the SSG build process
- Individual page data (`services-page`, `portfolio-page`, `javascript-page`, etc.) was NOT being fetched during build
- Pages were using `await useServicesPage()` calls in their setup scripts, but these weren't executing during prerendering
- The payload files only contained sidebar data, not individual page data

## Solutions Attempted

### ❌ Failed Approaches

1. **Modified `useAsyncData` configuration** - Tried various options like `client: false`, `dedupe: 'defer'`, `server: true` - didn't solve the core issue
2. **Client-side plugin** - Created `plugins/prerender-data.client.ts` but plugins don't run during prerendering on client side
3. **Updated nuxt.config.ts prerendering routes** - Routes were already correctly configured

### ✅ Working Solution

**Server-side plugin approach** - Created `plugins/prerender-data.server.ts`:

- Runs only during prerendering (`process.env.NODE_ENV === 'prerender'`)
- Imports all data fetching functions (`usePortfolioPage`, `useServicesPage`, etc.)
- Forces execution of all page data fetching during build process using `Promise.all()`
- Ensures all data is cached in payload files

## Technical Details

- **Issue**: Nuxt 3 SSG limitation where individual page data fetching functions in page setup scripts weren't being executed during prerendering
- **Solution**: Server plugin that explicitly calls all composables during build time
- **Result**: All data properly serialized in `_payload.json` files for each route

## Verification

After the fix:

- Build logs showed all page data being fetched successfully during build
- Payload files contained complete data for all pages, not just sidebar
- Static site works without runtime API dependencies
- Can deploy `dist/` folder to any static hosting without needing production Strapi server

## Key Files Modified

- `plugins/prerender-data.server.ts` - New server plugin to fetch all page data during build
- No changes needed to existing composables or pages

## Outcome

✅ True static site generation achieved - no runtime API calls required
