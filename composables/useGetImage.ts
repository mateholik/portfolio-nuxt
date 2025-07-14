export const useGetImage = (imageLink: string): string => {
  const config = useRuntimeConfig();

  // Check if we should use static images (either in production or forced via config)
  const isDevelopment = process.env.NODE_ENV === 'development';
  const useStaticImages = config.public.useStaticImages;
  const shouldUseStaticImages = !isDevelopment || useStaticImages;

  if (shouldUseStaticImages) {
    return `/img/${imageLink}`;
  } else {
    // In development, serve images from Strapi

    return config.public.strapiApiUrl + imageLink;
  }
};
