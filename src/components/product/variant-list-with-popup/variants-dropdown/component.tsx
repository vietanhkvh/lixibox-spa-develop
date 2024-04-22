import classNames from 'classnames';
import { isMobileVersion } from '../../../../utils/responsive';
import ColorVariant from '../../../../presentation-component/variants/color-variant';
import SizeVariant from '../../../../presentation-component/variants/size-variant';
import ThumbnailVariant from '../../../../presentation-component/variants/thumbnail-variant';
import ProductPreview from '../../../../presentation-component/product/preview';
import StickyActionButton from '../../../../components/ui/sticky-action-button';
import style from './style.module.scss';

const Variant = ({ header, optionType, onSelect, selected, template: Template, type }) => {
  return (
    <div className={style.variant}>
      <div className={classNames(style.header, isMobileVersion() && style.headerMobile)}>
        <span className={style.title}>
          {header.title}
          {header.value && ':'}
        </span>
        {header.value}
      </div>
      <div
        className={classNames(
          ['color', 'pattern', 'group'].includes(type) ? style.indexGrid : style.index,
          ['color', 'pattern'].includes(type) && style.indexGridColor,
          'group' === type && style.indexGridThumbnail
        )}
      >
        {optionType.values.map((item, index) => (
          <div key={index} className={classNames(style.item)}>
            <Template {...{ item, type, onSelect, selected }} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface VariantsDropdownProps {
  onSelect: (param0: any) => any;
  optionTypes: Array<any>;
  selectedVariants: Array<any>;

  product?: any;
  onSelected?: (param?: any) => any;
  classes?: { container?: string };
}
const VariantsDropdown = ({
  onSelect: _onSelect,
  optionTypes,
  selectedVariants,
  product,
  classes,
  onSelected
}: VariantsDropdownProps) => {
  const onSelect = (data) => {
    _onSelect(data);
    !isMobileVersion() && onSelected && onSelected();
  };

  return (
    <div className={classNames(style.variantsDropdown)}>
      {isMobileVersion() && !!product && (
        <ProductPreview product={product} classes={{ container: style.productPreview }} />
      )}
      <div className={classNames(style.variants, classes && classes.container)}>
        {Array.isArray(optionTypes) &&
          optionTypes.map((item, index) => {
            const selectVariantsItem = selectedVariants.filter((variant) => variant.type === item.name);
            const selectVariantsId = !!selectVariantsItem.length ? selectVariantsItem[0].value_id : 0;
            const selectedValueVariants = !!item.values
              ? item.values.filter(
                  (item) => !!selectVariantsItem.length && item.option_value_id === selectVariantsItem[0].value_id
                )
              : null;
            const header = {
              title: item.presentation || item.name,
              value:
                !!selectedValueVariants && !!selectedValueVariants[0]
                  ? selectedValueVariants[0].presentation || selectedValueVariants[0].name
                  : ''
            };

            if ('color' === item.name || 'pattern' === item.name) {
              return (
                <Variant
                  {...{
                    key: index,
                    optionType: item,
                    onSelect,
                    selected: selectVariantsId,
                    template: ColorVariant,
                    type: item.name,
                    header
                  }}
                />
              );
            }
            if ('group' === item.name && item.values.every((val) => val.image_url)) {
              return (
                <Variant
                  {...{
                    key: index,
                    optionType: item,
                    onSelect,
                    selected: selectVariantsId,
                    template: ThumbnailVariant,
                    type: item.name,
                    header
                  }}
                />
              );
            }

            return (
              <Variant
                {...{
                  key: index,
                  optionType: item,
                  onSelect,
                  selected: selectVariantsId,
                  template: SizeVariant,
                  type: item.name,
                  header
                }}
              />
            );
          })}
      </div>
      {isMobileVersion() && (
        <StickyActionButton
          action={{ text: 'Chọn' }}
          buttonClass={style.popupStickyButton}
          onClick={() => onSelected && onSelected()}
        />
      )}
    </div>
  );
};

export default VariantsDropdown;
