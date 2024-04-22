import { IOptionValue, IProduct } from 'types/generic/product';

export const getSelectedVariantFromProduct = (product: IProduct) => {
  if (!product) return null;

  const {
    box: { slug },
    option_types: optionTypes,
    box_variants: boxVariants
  } = product || {};

  if (!optionTypes || !optionTypes?.length || !boxVariants?.length || !slug) {
    return null;
  }

  const selectedVariantsGroup: Array<any> =
    (Array.isArray(boxVariants) && boxVariants?.filter((item) => slug === item.slug)) || [];

  if (!selectedVariantsGroup.length) {
    return null;
  }

  return selectedVariantsGroup[0]?.option_values?.map((variant: IOptionValue) => {
    const optionsValue = optionTypes
      .find((option) => option.name === variant.type)
      .values.find((value) => value.option_value_id === variant.value_id);
    return { ...variant, ...optionsValue };
  });
};
