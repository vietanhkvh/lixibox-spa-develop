// TODO: Refactor
import { useState, useEffect } from 'react';
import classNames from 'classnames';

import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import TabHeader from '../../../../../../presentation-component/general/mobile-tab-header';
import SubmitButton from '../../../../../../components/ui/submit-button';
import ProductSlider from '../../../../../../presentation-component/general/desktop/product-slider';
import DiscountCodeGiftItemWithAction from '../../product/discount-code-gift-item-with-action';
import DiscountCodeAddonItemWithAction from '../../product/discount-code-addon-item-with-action';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  onSectionItemClick?: (box: ProductBox, index: number, section: 'addon' | 'gift') => void;
  cartStore: any;
  toggleDiscountCodeGiftModalVisibilityAction: any;
  toggleDiscountCodeAddonModalVisibilityAction: any;
}

const DiscountCodeProductRedeemModal = ({
  onSectionItemClick,
  cartStore: { cartGiftList, specialAddOns, isDiscountCodeGiftModalOpen, isDiscountCodeAddonModalOpen },
  toggleDiscountCodeGiftModalVisibilityAction,
  toggleDiscountCodeAddonModalVisibilityAction
}: IProps) => {
  const generateTabEntries = (cartGiftList, specialAddOns, selectedId = 0) =>
    [
      { id: 0, title: 'Chọn quà tặng', products: cartGiftList },
      { id: 1, title: 'Chọn ưu đãi đặc biệt', products: specialAddOns }
    ].map((entry) => Object.assign({}, entry, { selected: entry.id === selectedId }));
  const [tabEntries, setTabEntries] = useState(generateTabEntries(cartGiftList, specialAddOns));
  const [currentTabId, setCurrentTabId] = useState(tabEntries[0].id);
  const updateCurrentTab = (tab) => {
    setTabEntries((entries) => entries.map((entry) => Object.assign({}, entry, { selected: entry.id === tab.id })));
    setCurrentTabId(tab.id);
    toggleDiscountCodeGiftModalVisibilityAction(tab.id === 0 ? true : false);
    toggleDiscountCodeAddonModalVisibilityAction(tab.id === 1 ? true : false);
  };
  const onRequestClose = () => {
    toggleDiscountCodeGiftModalVisibilityAction(false);
    toggleDiscountCodeAddonModalVisibilityAction(false);
  };
  const modalVisibility = isDiscountCodeAddonModalOpen || isDiscountCodeGiftModalOpen;
  useEffect(() => {
    setTabEntries(generateTabEntries(cartGiftList, specialAddOns, currentTabId));
  }, [cartGiftList, specialAddOns]);
  useEffect(() => {
    if (isDiscountCodeGiftModalOpen || isDiscountCodeAddonModalOpen) {
      updateCurrentTab({ id: isDiscountCodeGiftModalOpen ? 0 : 1 });
    }
  }, [isDiscountCodeGiftModalOpen, isDiscountCodeAddonModalOpen]);

  const hasMultipleTabs =
    tabEntries.length > 1 && tabEntries.length === tabEntries.filter(({ products }) => products.length).length;
  const activeTab = tabEntries.find((entry) => entry.selected);
  const modalTitle = (!hasMultipleTabs && activeTab?.title) || 'Vui lòng chọn sản phẩm bên dưới';

  return (
    <GeneralModal
      isOpen={modalVisibility}
      title={modalTitle}
      leftTitle=""
      rightIcon={'close'}
      className={style.discountCodeProductRedeemModal}
      classes={{ overlay: style.discountCodeProductRedeemModalOverlay }}
      testId={{ name: 'discount-code-product-redeem-modal' }}
      onRightActionClick={() => onRequestClose()}
      onRequestClose={() => onRequestClose()}
    >
      <div className={style.body}>
        {hasMultipleTabs && (
          <TabHeader
            isEqually={false}
            tabs={tabEntries}
            onSelect={(tab) => updateCurrentTab(tab)}
            className={style.tabHeader}
          />
        )}
        {tabEntries.map((entry, index) => (
          <ProductSlider
            key={index}
            column={4}
            data={entry.products.map((product) => ({
              key: product.id,
              product,
              onClickProductItem: () => onSectionItemClick?.(product, index, entry.id === 0 ? 'gift' : 'addon')
            }))}
            template={entry.id === 0 ? DiscountCodeGiftItemWithAction : DiscountCodeAddonItemWithAction}
            className={classNames(style.productSliderTab, entry.id !== currentTabId && style.noDisplay)}
          />
        ))}
        <div className={style.action}>
          <SubmitButton className={style.continueButton} title="Hoàn tất" onSubmit={() => onRequestClose()} />
        </div>
      </div>
    </GeneralModal>
  );
};

export default DiscountCodeProductRedeemModal;
