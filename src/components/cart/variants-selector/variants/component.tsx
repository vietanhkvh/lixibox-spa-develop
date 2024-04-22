import { useState } from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';
import ColorVariant from 'presentation-component/variants/color-variant/component';
import ThumbnailVariant from 'presentation-component/variants/thumbnail-variant/component';
import SizeVariant from 'presentation-component/variants/size-variant/component';

import { decodeEntities } from 'utils';
import { IVariantsProps } from './model';
import { getSelectedVariantFromProduct } from 'utils/product/variants';
import { handleChooseProductColor } from '../utils';
import { IOptionType, ISelectedVariant, IValue } from 'types/generic/product';

const Variants = (props: IVariantsProps) => {
  const { product, onSelected } = props;
  const optionTypes = product?.option_types || [];
  const boxVariants = product?.box_variants || [];
  const selectedVariant = getSelectedVariantFromProduct(product);
  const [selectedVariantItems, setSelectedVariantItems] = useState(selectedVariant || []);

  const detectSelectedFieldText = (type: string): string => {
    return selectedVariantItems?.find((variant: ISelectedVariant) => variant?.type === type)?.name || '';
  };

  const detectSelectedFieldId = (id: number): number => {
    const res = selectedVariantItems?.find((variant: ISelectedVariant) => variant?.option_value_id === id);
    return res?.option_value_id || res?.value_id;
  };

  return (
    <div>
      {optionTypes?.map((optionType: IOptionType) => {
        const Template = ['color', 'pattern'].includes(optionType?.name)
          ? ColorVariant
          : 'group' === optionType?.name && optionType?.values?.every((val) => val.image_url)
          ? ThumbnailVariant
          : SizeVariant;

        return (
          <div className={styles.variantWrapper}>
            <div className={classNames(styles.title)}>
              <div className={styles.type}>{decodeEntities(optionType?.presentation) || ''}:</div>{' '}
              <div className={styles.field}>{decodeEntities(detectSelectedFieldText(optionType?.name)) || ''}</div>
            </div>
            <div className={classNames(styles.containerBox)}>
              {optionType?.values?.map((option: IValue) => {
                const optionProps = {
                  item: option,
                  type: optionType?.name,
                  selected: detectSelectedFieldId(option?.option_value_id),
                  onSelect: ({ item, type }) => {
                    setSelectedVariantItems((prevState: ISelectedVariant[]) => {
                      return prevState?.map((currentVariant) => {
                        if (currentVariant?.type === type) {
                          return {
                            ...currentVariant,
                            name: item?.name,
                            option_value_id: item?.option_value_id,
                            presentation: item?.presentation,
                            value_id: item?.option_value_id
                          };
                        }

                        return currentVariant;
                      });
                    });

                    const modifiedSelectedVariantItems = selectedVariantItems?.map(
                      (currentVariant: ISelectedVariant) => {
                        if (currentVariant?.type === type) {
                          return {
                            type,
                            value_id: item?.option_value_id
                          };
                        }

                        return {
                          type: currentVariant?.type,
                          value_id: currentVariant?.option_value_id
                        };
                      }
                    );

                    handleChooseProductColor({
                      selected: { value: item?.option_value_id, key: type },
                      combinedSelectVariants: modifiedSelectedVariantItems,
                      boxVariants,
                      onSelected
                    });
                  }
                };

                return (
                  <div className={classNames(styles.variantContent)} key={`variant-item-${optionType?.name}`}>
                    <div
                      className={classNames(
                        ['color', 'pattern', 'group'].includes(optionType?.name) && styles.smallWrapperItem,
                        ['size'].includes(optionType?.name) && styles.bigWrapperItem
                      )}
                    >
                      <Template {...optionProps} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Variants;
