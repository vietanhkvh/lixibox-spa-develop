import { compareArray } from 'utils/validate';

export const handleChooseProductColor = ({ combinedSelectVariants, boxVariants, selected, onSelected }): void => {
  let isFallback = true;
  let fallbackUrl = '';

  Array.isArray(boxVariants) &&
    boxVariants.forEach((item) => {
      const filteredOptionValues = item.option_values.filter(
        (option) => !!option && option.type === selected.key && option.value_id === selected.value
      );
      if (!!filteredOptionValues && filteredOptionValues.length) {
        fallbackUrl = item.slug;
      }

      if (compareArray(item.option_values, combinedSelectVariants)) {
        isFallback = false;
        onSelected && onSelected(item.slug);
      }
    });

  /** Fall back when can not find correct variant */
  if (!!isFallback && !!fallbackUrl && !!fallbackUrl.length) {
    onSelected && onSelected(fallbackUrl);
  }
};
