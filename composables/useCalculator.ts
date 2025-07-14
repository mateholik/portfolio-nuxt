import type { PriceBlock, PriceBlockOption } from '~/types/strapiTypes';

// Extended interface for calculator that includes the active state
interface CalculatorOption extends PriceBlockOption {
  active: boolean;
}

interface CalculatorBlock extends Omit<PriceBlock, 'option'> {
  option: CalculatorOption[];
}

export const useCalculator = (
  blocksSource: Ref<PriceBlock[]> | ComputedRef<PriceBlock[]>
) => {
  const totalPrice = ref(0);
  const calcBlocks = ref<CalculatorBlock[]>([]);
  const hintObj = ref({
    title: '',
    description: '',
  });
  const isInitialized = ref(false);

  // Function to transform blocks data
  const transformBlocks = (blocks: PriceBlock[]): CalculatorBlock[] => {
    return blocks.map((block) => ({
      ...block,
      option: block.option.map((option) => ({
        ...option,
        active: false,
      })),
    }));
  };

  // Watch for changes in the blocks source and update calcBlocks
  watch(
    blocksSource,
    (newBlocks) => {
      if (newBlocks.length > 0) {
        calcBlocks.value = transformBlocks(newBlocks);
        isInitialized.value = false; // Reset initialization flag when data changes
      } else {
        calcBlocks.value = [];
        isInitialized.value = false;
      }
    },
    { immediate: true }
  );

  const setTotalPrice = () => {
    let total = 0;
    const options = calcBlocks.value.flatMap((block) => block.option);

    options?.forEach((option: CalculatorOption) => {
      if (option.active) total += option.price;
    });
    totalPrice.value = total;
  };

  const resetBlockOptions = (index: number) => {
    if (calcBlocks.value[index]) {
      calcBlocks.value[index].option.forEach((option: CalculatorOption) => {
        option.active = false;
      });
    }
  };

  const setHintObj = (index: number, option: CalculatorOption) => {
    hintObj.value = {
      title: calcBlocks.value[index]?.blockTitle + ' -> ' + option.title,
      description: option.description,
    };
  };

  const selectOptionInBlock = (
    option: CalculatorOption,
    blockIndex: number
  ) => {
    resetBlockOptions(blockIndex);
    option.active = true;
    setTotalPrice();
    setHintObj(blockIndex, option);
  };

  const initCalc = () => {
    if (calcBlocks.value.length === 0) {
      return;
    }

    if (isInitialized.value) {
      return;
    }

    isInitialized.value = true;

    let timer = 500;
    for (let i = 0; i < calcBlocks.value.length; i++) {
      setTimeout(() => {
        if (calcBlocks.value[i]?.option?.length > 0) {
          const optionIndex = i % 2 === 0 ? 0 : 1;
          if (calcBlocks.value[i].option[optionIndex]) {
            calcBlocks.value[i].option[optionIndex].active = true;
            setTotalPrice();
          }
        }
      }, timer);
      timer += 500;
    }
  };

  return {
    totalPrice,
    calcBlocks,
    hintObj,
    isInitialized,
    setTotalPrice,
    selectOptionInBlock,
    initCalc,
  };
};
