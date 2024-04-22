import { useState } from 'react';

import { usePrevious } from '../../../../../../utils/hook';
import ItemWithAction from '../../item-with-action';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import { ProductBox } from 'types/api/shop';

interface IProps {
  product: ProductBox;
  cartStore: any;
  selectSpecialAddOnAction: any;
  removeItemFromCartAction: any;
  onClickProductItem?: (box: ProductBox) => void;
}
const DiscountCodeAddonItemWithAction = ({
  product,
  cartStore: { cartList, isSelectedGiftCart, isRemoveCartSuccess },
  selectSpecialAddOnAction,
  removeItemFromCartAction,
  onClickProductItem
}: IProps) => {
  const wasGlobalSelected = usePrevious(isSelectedGiftCart);
  const wasGlobalRemoved = usePrevious(isRemoveCartSuccess);
  const [loading, toggleLoading] = useState(false);
  loading &&
    ((!wasGlobalSelected && isSelectedGiftCart) || (!wasGlobalRemoved && isRemoveCartSuccess)) &&
    toggleLoading(false);

  const addonsInCart = cartList.filter((cartItem) => cartItem.purchase_type === PURCHASE_TYPE.ADDON);
  const cartItem = addonsInCart.find((addon) => addon.box.slug === product.slug);

  return (
    <ItemWithAction
      action={{
        title: !!cartItem ? 'Bỏ ra' : 'Thêm vào giỏ',
        icon: !!cartItem ? 'trash' : 'plus',
        disabled: addonsInCart.length && !cartItem
      }}
      product={product}
      loading={loading}
      isShowPricing
      testId={{ name: 'discount-code-addon-item-with-action', id: product?.slug }}
      onClick={() => {
        // TODO: Ask backend for product code in addon list and once resolved, remove the following patch
        !!cartItem
          ? removeItemFromCartAction({
              cartItem,
              box: cartItem.box,
              boxId: cartItem.box.id,
              quantity: 1,
              purchaseType: PURCHASE_TYPE.ADDON
            })
          : selectSpecialAddOnAction({ discountCodeAddOnId: product.id });
        toggleLoading(true);
      }}
      onClickProductItem={onClickProductItem}
    />
  );
};

export default DiscountCodeAddonItemWithAction;
