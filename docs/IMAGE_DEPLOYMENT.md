# Image Deployment Guide

This guide explains how to deploy your Nuxt frontend with static images while keeping Strapi for local development.

## How It Works

The `useGetImage` composable automatically detects the environment and serves images from the appropriate location:

- **Development**: Images are served from your local Strapi instance
- **Production**: Images are served from the `/public/uploads` folder in your Nuxt app

## Setup Steps

### 1. Copy Strapi Uploads to Public Folder

Before building for production, copy your Strapi uploads folder to your Nuxt public directory:

```bash
# Copy uploads from Strapi to Nuxt public folder
cp -r /path/to/your/strapi/public/uploads ./public/uploads
```

### 2. Build for Production

```bash
# Generate static site
pnpm run generate

# Or build for server-side rendering
pnpm run build
```

### 3. Deploy

Deploy the generated `.output` folder (or `dist` folder if using `generate`) to your remote server.

## Environment Configuration

### Automatic Detection

The system automatically detects the environment using `NODE_ENV`:

- `NODE_ENV=development` → Strapi images
- `NODE_ENV=production` → Static images

### Manual Override

You can force static images even in development by setting:

```bash
# Force static images in development
USE_STATIC_IMAGES=true pnpm run dev
```

## File Structure

After copying uploads, your structure should look like:

```
public/
├── uploads/
│   ├── image1.jpg
│   ├── image2.png
│   └── subfolder/
│       └── image3.jpg
├── favicon.png
└── img/
    └── ...
```

## Testing

### Test Static Images Locally

```bash
# Test with static images in development
USE_STATIC_IMAGES=true pnpm run dev
```

### Test Production Build

```bash
# Build and preview
pnpm run generate
pnpm run preview
```

## Notes

- The system handles both `/uploads/image.jpg` and `image.jpg` paths automatically
- Images are served from the root domain in production (e.g., `https://yoursite.com/uploads/image.jpg`)
- Make sure to copy the uploads folder before each deployment if you've added new images
- Consider setting up a build script to automate the copying process
