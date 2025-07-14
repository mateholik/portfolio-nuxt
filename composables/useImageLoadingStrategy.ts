interface BlockWithCards {
  card?: { length: number }[] | { length: number };
}

export const useImageLoadingStrategy = () => {
  /**
   * Determines optimal loading strategy for images based on their position
   * @param blockIndex - Index of the content block
   * @param cardIndex - Index of the card within the block
   * @param blocks - Array of blocks to calculate global position
   * @returns Object with loading and fetchpriority attributes
   */
  const getImagesLoadingStrategy = (
    blockIndex: number,
    cardIndex: number,
    blocks: BlockWithCards[]
  ) => {
    const globalIndex =
      blocks.slice(0, blockIndex).reduce((acc, block) => {
        const cardLength = Array.isArray(block.card) ? block.card.length : 0;
        return acc + cardLength;
      }, 0) + cardIndex;

    if (globalIndex < 4) {
      // First 4 images: high priority, eager loading (above-the-fold)
      return { loading: 'eager' as const, fetchpriority: 'high' as const };
    } else if (globalIndex < 6) {
      // Next 2 images: eager loading but normal priority (likely visible)
      return { loading: 'eager' as const, fetchpriority: 'auto' as const };
    } else {
      // Remaining images: lazy loading (below-the-fold)
      return { loading: 'lazy' as const, fetchpriority: 'auto' as const };
    }
  };

  return {
    getImagesLoadingStrategy,
  };
};
