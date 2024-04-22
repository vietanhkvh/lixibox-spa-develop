import { Component, Fragment } from 'react';

import VariantListWithPopup from '../variant-list-with-popup';
import ColorVariant from '../../../presentation-component/variants/color-variant';
import ThumbnailVariant from '../../../presentation-component/variants/thumbnail-variant';
import SizeVariant from '../../../presentation-component/variants/size-variant';
import { handleChooseProductColor, detectSelectedVariants } from './module';
import { IProductColorProps, IProductColorState } from './model';
import { DEFAULT_PROPS } from './initialize';
import STYLE from './style';
import styles from './style.module.scss';
import { parseObject } from 'utils/string';

class Variants extends Component<IProductColorProps, IProductColorState> {
  static defaultProps: IProductColorProps = DEFAULT_PROPS;

  onSelect(item, key) {
    const { boxSlug, optionTypes, boxVariants, onSelected } = this.props;
    const selectedVariants = detectSelectedVariants({
      boxSlug,
      optionTypes,
      boxVariants
    });

    const combinedSelectVariants = selectedVariants.map((variant) => {
      if (variant.type === key) {
        return Object.assign({}, variant, { value_id: item.option_value_id });
      }

      return variant;
    });

    handleChooseProductColor({
      selected: { value: item.option_value_id, key },
      combinedSelectVariants,
      boxVariants,
      onSelected
    });
  }

  render() {
    const { boxSlug, optionTypes = [], boxVariants = [] } = this.props;
    const slugBoxVariant = boxVariants.map((b) => b.option_values.length > 0 && b.option_values[0].value_id);
    let newOptionTypes = parseObject(optionTypes);
    if (newOptionTypes.length > 0) {
      newOptionTypes[0].values =
        newOptionTypes && newOptionTypes[0].values.filter((o) => slugBoxVariant.includes(o.option_value_id));
    }
    const selectedVariants = detectSelectedVariants({
      optionTypes: newOptionTypes,
      boxVariants,
      boxSlug
    });

    if (!newOptionTypes.length || !boxVariants.length || !selectedVariants) {
      return null;
    }

    return (
      <div style={STYLE.container}>
        {Array.isArray(newOptionTypes) &&
          newOptionTypes.map((item, $index) => {
            const selectVariantsItem = selectedVariants.filter((variant) => variant.type === item.name);
            const selectVariantsId = !!selectVariantsItem.length ? selectVariantsItem[0].value_id : 0;
            const selectedValueVariants = !!item.values
              ? item.values.filter(
                  (item) => !!selectVariantsItem.length && item.option_value_id === selectVariantsItem[0].value_id
                )
              : null;
            const VariantTemplate = ['color', 'pattern'].includes(item.name)
              ? ColorVariant
              : 'group' === item.name && item.values.every((val) => val.image_url)
              ? ThumbnailVariant
              : SizeVariant;

            return (
              <Fragment key={`variants-${$index}`}>
                {!!selectedValueVariants && !!selectedValueVariants[0] && (
                  <VariantsHeading
                    title={item.presentation || item.name}
                    value={selectedValueVariants[0].presentation || selectedValueVariants[0].name}
                  />
                )}

                <VariantListWithPopup
                  {...{
                    variants: item.values || [],
                    selected: selectVariantsId,
                    onSelect: ({ item, type }) => this.onSelect(item, type),
                    optionTypes: newOptionTypes,
                    selectedVariants: selectedVariants,

                    template: VariantTemplate,
                    type: item.name,
                    classes: { container: styles.container }
                  }}
                />
              </Fragment>
            );
          })}
      </div>
    );
  }
}

const VariantsHeading = ({ title, value }) => {
  return (
    <div style={STYLE.variantsHeading}>
      {title}:<span style={STYLE.variantsHeadingValue}>{value}</span>
    </div>
  );
};

export default Variants;
