import type { PriceBlock, PriceBlockOption } from '~/types/strapiTypes';

// Extended interface for calculator that includes the active state
interface CalculatorOption extends PriceBlockOption {
  active: boolean;
}

interface CalculatorBlock extends Omit<PriceBlock, 'option'> {
  option: CalculatorOption[];
}

export const useCalculator = (blocks: PriceBlock[]) => {
  // Transform the blocks to include active property
  const initialBlocks: CalculatorBlock[] = blocks.map((block) => ({
    ...block,
    option: block.option.map((option) => ({
      ...option,
      active: false,
    })),
  }));

  const totalPrice = ref(0);
  const calcBlocks = ref(initialBlocks);
  const hintObj = ref({
    title: '',
    description: '',
  });

  const setTotalPrice = () => {
    let total = 0;
    const options = calcBlocks.value.flatMap((block) => block.option);

    options?.forEach((option: CalculatorOption) => {
      if (option.active) total += option.price;
    });
    totalPrice.value = total;
  };

  const resetBlockOptions = (index: number) => {
    calcBlocks.value[index].option.forEach((option: CalculatorOption) => {
      option.active = false;
    });
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
    let timer = 500;
    for (let i = 0; i < calcBlocks.value.length; i++) {
      setTimeout(() => {
        calcBlocks.value[i].option[i % 2 === 0 ? 0 : 1].active = true;
        setTotalPrice();
      }, timer);
      timer += 500;
    }
  };

  return {
    totalPrice,
    calcBlocks,
    hintObj,
    setTotalPrice,
    selectOptionInBlock,
    initCalc,
  };
};
