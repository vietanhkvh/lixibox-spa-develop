import { useState } from 'react';

import { usePrevious } from '../../../../../../utils/hook';
import ItemWithAction from '../../item-with-action';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import { ProductBox } from 'types/api/shop';
import { ViewedSource } from 'tracking/constants';

interface IProps {
  product: ProductBox;
  cartStore?: any;
  appStore?: any;
  className: string;
  addItemToCartAction?: (data: any) => any;
  removeItemFromCartAction?: (data: any) => any;
  onClickProductItem?: (box: ProductBox) => void;
}
const AddonItemWithAction = ({
  product,
  cartStore: { cartList, isAddCartLoading, isRemoveCartLoading },
  className,
  addItemToCartAction,
  removeItemFromCartAction,
  onClickProductItem
}: IProps) => {
  const [loading, toggleLoading] = useState(false);
  const wasAddCartLoading = usePrevious(isAddCartLoading);
  const wasRemoveCartLoading = usePrevious(isRemoveCartLoading);
  if (loading && ((wasAddCartLoading && !isAddCartLoading) || (wasRemoveCartLoading && !isRemoveCartLoading))) {
    toggleLoading(false);
  }

  const cartItem = cartList?.find?.(
    (cartItem) => cartItem.purchase_type === PURCHASE_TYPE.ADDON && cartItem.box.id === product.id
  );

  const performAction = !!cartItem ? removeItemFromCartAction : addItemToCartAction;

  return (
    <ItemWithAction
      product={product}
      action={{
        title: !!cartItem ? 'Bỏ ra' : 'Thêm vào giỏ',
        icon: !!cartItem ? 'trash' : 'plus'
      }}
      loading={loading}
      purchaseType={PURCHASE_TYPE.ADDON}
      isShowPricing
      isShowRating
      singleItemOnly
      className={className}
      testId={{ name: 'addon-item-with-action', id: product?.slug }}
      onClick={() => {
        performAction({
          cartItem,
          box: product,
          boxId: product.id,
          quantity: 1,
          displayCartSumary: false,
          purchaseType: PURCHASE_TYPE.ADDON,
          trackingSource: ViewedSource.ADD_ON
        });

        toggleLoading(true);
      }}
      onClickProductItem={onClickProductItem}
    />
  );
};

export default AddonItemWithAction;
