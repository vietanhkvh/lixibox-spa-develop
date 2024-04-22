import { useState } from 'react';

import { usePrevious } from '../../../../../../utils/hook';
import ItemWithAction from '../../item-with-action';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import { ProductBox } from 'types/api/shop';

interface IProps {
  product: ProductBox;
  cartStore: any;
  selectGiftAction: any;
  onClickProductItem?: (box: ProductBox) => void;
}
const DiscountCodeGiftItemWithAction = ({
  product,
  cartStore: { cartList, isSelectedGiftCart },
  selectGiftAction,
  onClickProductItem
}: IProps) => {
  const wasGlobalSelected = usePrevious(isSelectedGiftCart);
  const [loading, toggleLoading] = useState(false);
  loading && !wasGlobalSelected && isSelectedGiftCart && toggleLoading(false);

  const isItemInCart = !!cartList.find(
    (cartItem) => cartItem.purchase_type === PURCHASE_TYPE.GIFT && cartItem.box.slug === product.slug
  );

  const action = {
    title: isItemInCart ? 'Đã chọn' : 'Chọn',
    icon: isItemInCart ? 'check-bold' : 'plus',
    selected: isItemInCart,
    disabled: !product?.stock
  };

  return (
    <ItemWithAction
      action={action}
      product={product}
      loading={loading}
      testId={{ name: 'discount-code-gift-item-with-action', id: product?.slug }}
      isShowPricing
      customPricing={{ price: 0, originalPrice: product?.original_price || 0 }}
      isOutOfStock={!product?.stock}
      tag="Quà tặng"
      outOfStockLabel="Hết quà"
      onClick={() => {
        selectGiftAction({ discountCodeGiftId: product.id });
        toggleLoading(true);
      }}
      onClickProductItem={onClickProductItem}
    />
  );
};

export default DiscountCodeGiftItemWithAction;
