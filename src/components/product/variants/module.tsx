import { compareArray } from '../../../utils/validate';
/**
 * Find selected color
 *
 * @param colorList : Array<any> list product color
 * @param idProduct : product id <slug>
 *
 * @return ip selected color <number id>
 */
export const findSelectedColor = (colorList: Array<any>, idProduct: string): number => {
  /** List color inlavid */
  if (colorList.length <= 1) {
    return 0;
  }

  const filteredList = colorList.filter((colorItem) => colorItem.box_slug === idProduct);
  /** List color inlavid */
  if (filteredList.length === 0) {
    return 0;
  }

  return filteredList[0].box_id;
};

/**
 * handle event choose product color
 * 1. Filter list color
 * 2. Get product slug
 *
 * @param colorList : Array<any> list product color
 * @param selectColor : any selected color from event
 *
 * @return new slug string
 */
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

export const detectSelectedVariants = ({ boxSlug, optionTypes, boxVariants }) => {
  if (!optionTypes || !optionTypes.length || !boxVariants.length) {
    return null;
  }

  const selectedVariantsGroup: Array<any> =
    (Array.isArray(boxVariants) && boxVariants.filter((item) => boxSlug === item.slug)) || [];

  if (!selectedVariantsGroup.length) {
    return null;
  }

  return selectedVariantsGroup[0].option_values;
};
