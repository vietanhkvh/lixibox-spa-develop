import { useState } from 'react';

import { usePrevious } from '../../../../../../utils/hook';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import ItemWithAction from '../../item-with-action';
import { ProductBox } from 'types/api/shop';
import { ViewedSource } from 'tracking/constants';

interface IProps {
  product: ProductBox;
  cartStore: any;
  appStore: any;
  className: string;
  addItemToCartAction: (data: any) => any;
  removeItemFromCartAction: (data: any) => any;
  fetchListLikedBoxesAction: (data: any) => any;
  unLikeProductAction: (data: any, onSuccess: any, onReject: any) => any;
  onClickProductItem?: (box: ProductBox) => void;
}
const RecommendationItemWithAction = ({
  product,
  cartStore: { cartDetail, isAddCartLoading, isRemoveCartLoading },
  className,
  addItemToCartAction,
  removeItemFromCartAction,
  unLikeProductAction,
  fetchListLikedBoxesAction,
  onClickProductItem
}: IProps) => {
  const [loading, toggleLoading] = useState(false);
  const wasAddCartLoading = usePrevious(isAddCartLoading);
  const wasRemoveCartLoading = usePrevious(isRemoveCartLoading);
  if (loading && ((wasAddCartLoading && !isAddCartLoading) || (wasRemoveCartLoading && !isRemoveCartLoading))) {
    toggleLoading(false);
  }
  const cartItem = cartDetail?.cart_items?.find(
    (item) => item.purchase_type === PURCHASE_TYPE.NORMAL && item.box.id === product.id
  );

  const updateQuantityPerTime = cartDetail?.cart_items?.find((item) => item.box.id === product.id)?.quantity || 1;
  const performAction = !!cartItem ? removeItemFromCartAction : addItemToCartAction;

  return (
    <ItemWithAction
      product={product}
      action={{
        title: !!cartItem ? 'Bỏ ra' : 'Thêm vào giỏ',
        icon: !!cartItem ? 'trash' : 'plus'
      }}
      purchaseType={PURCHASE_TYPE.NORMAL}
      isShowPricing
      isShowRating
      isShowVariants={false}
      isShowTrashExtraButton={true}
      singleItemOnly
      className={className}
      loading={loading}
      testId={{ name: 'addon-item-with-action', id: product?.slug }}
      onClick={() => {
        performAction({
          cartItem,
          box: product,
          boxId: product.id,
          quantity: updateQuantityPerTime,
          displayCartSumary: false,
          purchaseType: PURCHASE_TYPE.NORMAL,
          trackingSource: ViewedSource.CART_WISHLIST
        });

        toggleLoading(true);
      }}
      onClickProductItem={onClickProductItem}
      onClickTrashExtraButton={() => {
        unLikeProductAction(
          product,
          () => fetchListLikedBoxesAction({ page: 1, perPage: 12, stockStatus: 'in_stock' }),
          () => {}
        );
      }}
    />
  );
};

export default RecommendationItemWithAction;
