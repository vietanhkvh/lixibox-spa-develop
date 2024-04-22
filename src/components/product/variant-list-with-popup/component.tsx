import classNames from 'classnames';
import { ComponentType, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isMobileVersion } from '../../../utils/responsive';
import { stringToHash } from '../../../utils/encode';
import GeneralModal from '../../../presentation-component/modal/general-modal';
import NRowList from '../../../presentation-component/ui/n-row-list';
import NRowListDynamicSize from '../../../presentation-component/ui/n-row-list-dynamic-size';
import VariantsDropdown from './variants-dropdown';
import Popover from '../../../presentation-component/ui/popover';
import style from './style.module.scss';

interface MoreButtonProps {
  type: string;
  onClick: () => any;
}
const MoreButton = ({ type, onClick }: MoreButtonProps) => (
  <div
    className={classNames(
      style.showMore,
      ['color', 'pattern'].includes(type)
        ? style.showMoreColor
        : type === 'group'
        ? style.showMoreThumbnail
        : style.showMoreSize
    )}
    onClick={onClick}
  >
    <div className={style.content}>⋯</div>
  </div>
);

const rearrangeVariants = ({ entries, capacity, showMore, data: { selected } }) => {
  const selectedIndex = entries.findIndex(({ option_value_id: id }) => id === selected);
  const anySelected = selectedIndex !== -1;

  if (capacity > 0 && anySelected && selectedIndex >= capacity) {
    const newEntries = entries.filter((entry) => entry.option_value_id !== selected);
    const selectedEntry = entries.find((entry) => entry.option_value_id === selected);
    const rearrangedEntries = [...newEntries.slice(0, capacity - 1), selectedEntry, ...newEntries.slice(capacity)];
    return rearrangedEntries.slice(0, capacity);
  }

  return entries.slice(0, capacity);
};

interface VariantListWithPopupProps {
  variants: Array<any>;
  selected: string | number;
  onSelect: (param0: any) => any;
  optionTypes: Array<any>;
  selectedVariants: Array<any>;

  type: string;
  template: ComponentType<any>;
  classes?: { container?: string; item?: string };

  shopStore: any;
}
const VariantListWithPopup = ({
  variants,
  selected,
  onSelect,
  optionTypes,
  selectedVariants,

  type,
  template: Template,
  classes,

  shopStore: { productDetail }
}: VariantListWithPopupProps) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const containerRef = useRef<any>();
  const { idProduct } = useParams<any>();
  const popoverPositionAdjustment = ['color', 'pattern'].includes(type)
    ? { top: -111, left: 0 }
    : type === 'group'
    ? { top: -119, left: 0 }
    : { top: -149, left: 0 };
  const columnWidth = ['color', 'pattern'].includes(type) ? 36 : 40;
  const isLinearList = ['color', 'pattern', 'group'].includes(type);
  const productIdHash = stringToHash(idProduct);
  const currentProduct = productDetail[productIdHash] && productDetail[productIdHash].box;

  return (
    <>
      <div ref={containerRef} className={classNames(style.variantListWithPopup, classes && classes.container)}>
        {isLinearList ? (
          <NRowList
            columnWidth={columnWidth}
            maxRowCount={2}
            entries={variants}
            data={{ type, selected, onSelect }}
            contentTemplate={Template}
            moreButtonTemplate={() => <MoreButton type={type} onClick={() => setPopupOpen(true)} />}
            beforeDisplay={rearrangeVariants}
            classes={{ container: style.container, moreButton: style.moreButtonGrid }}
          />
        ) : (
          <NRowListDynamicSize
            maxRowCount={2}
            entries={variants}
            data={{ type, selected, onSelect }}
            contentTemplate={Template}
            onMoreClick={() => setPopupOpen(true)}
            beforeDisplay={rearrangeVariants}
            classes={{ container: style.container, moreButton: style.moreButtonGrid }}
          />
        )}
      </div>
      {isMobileVersion() ? (
        <GeneralModal
          isOpen={popupOpen}
          title="Lựa chọn"
          leftTitle=""
          rightIcon={'close'}
          fullHeight
          onLeftActionClick={() => setPopupOpen(false)}
          onRightActionClick={() => setPopupOpen(false)}
          onRequestClose={() => setPopupOpen(false)}
        >
          <VariantsDropdown
            onSelect={onSelect}
            optionTypes={optionTypes}
            selectedVariants={selectedVariants}
            product={currentProduct}
            onSelected={() => setPopupOpen(false)}
            classes={{ container: style.variantsDropdownMobile }}
          />
        </GeneralModal>
      ) : (
        <Popover
          anchorEl={containerRef}
          isOpen={popupOpen}
          onRequestClose={() => setPopupOpen(false)}
          positionAdjustment={popoverPositionAdjustment}
        >
          <VariantsDropdown
            onSelect={onSelect}
            optionTypes={optionTypes}
            selectedVariants={selectedVariants}
            onSelected={() => setPopupOpen(false)}
            classes={{ container: style.variantsDropdownDesktop }}
          />
        </Popover>
      )}
    </>
  );
};

export default VariantListWithPopup;
