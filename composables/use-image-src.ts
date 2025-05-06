/**
 * Composable to concatenate Directus URL with image source paths
 * Handles error cases and provides a standalone function
 */

/**
 * Creates a full image URL by concatenating the Directus URL with the image path
 * @param imagePath - The path of the image in Directus
 * @param fallbackImage - Optional fallback image path to use if the main image is invalid
 * @returns The complete image URL or fallback image URL
 */
const createImageSrc = (
  imagePath: string | null | undefined,
  fallbackImage?: string
): string => {
  // Get Directus URL from runtime config
  const config = useRuntimeConfig();
  const directusUrl = config.public.directusUrl;

  // Handle missing Directus URL
  if (!directusUrl) {
    console.error("Directus URL is not defined in runtime config");
    return fallbackImage || "";
  }

  // Handle invalid image path
  if (!imagePath) {
    return fallbackImage || "";
  }

  // Remove leading slash if present to avoid double slashes
  const cleanImagePath = imagePath.startsWith("/")
    ? imagePath.substring(1)
    : imagePath;

  // Ensure directusUrl ends with a slash
  const baseUrl = directusUrl.endsWith("/") ? directusUrl : `${directusUrl}/`;

  // Return the complete URL
  return `${baseUrl}assets/${cleanImagePath}`;
};

/**
 * Composable that provides a function to concatenate Directus URL with image paths
 * @returns Object containing the getImageSrc function
 */
export function useImageSrc() {
  /**
   * Gets the full image URL by concatenating the Directus URL with the image path
   * @param imagePath - The path of the image in Directus
   * @param fallbackImage - Optional fallback image path to use if the main image is invalid
   * @returns The complete image URL or fallback image URL
   */
  const getImageSrc = (
    imagePath: string | null | undefined,
    fallbackImage?: string
  ): string => {
    return createImageSrc(imagePath, fallbackImage);
  };

  return {
    getImageSrc,
  };
}

// Export the standalone function for direct use
export { createImageSrc };
