import type { Blocks, Option } from "~/types/strapiPricePage";

export const useCalculator = (blocks: Blocks[]) => {
  const totalPrice = ref(0);
  const calcBlocks = ref(blocks);
  const hintObj = ref({
    title: "",
    description: "",
  });

  const setTotalPrice = () => {
    let total = 0;
    const options = calcBlocks.value.flatMap((block) => block.option);

    options?.forEach((option) => {
      if (option.active) total += option.price;
    });
    totalPrice.value = total;
  };
  const resetBlockOptions = (index: number) => {
    calcBlocks.value[index].option.forEach((option) => {
      option.active = false;
    });
  };
  const setHintObj = (index: number, option: Option) => {
    hintObj.value = {
      title: calcBlocks.value[index]?.blockTitle + " -> " + option.title,
      description: option.description,
    };
  };
  const selectOptionInBlock = (option: Option, blockIndex: number) => {
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
