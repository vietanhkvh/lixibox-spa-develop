import classNames from 'classnames';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { usePrevious } from '../../../utils/hook';
import ProductItem from '../../../presentation-component/product/product-item';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';
import { isMobileVersion } from '../../../utils/responsive';
import { MOBILE_ALERT_ADD_TO_CART_SUCCESS } from '../../../constants/application/modal';
import SubmitButton from '../../../presentation-component/ui/submit-button';
import { ALERT_GENERAL_SUCCESS } from '../../../constants/application/alert';
import { ROUTING_USER_WISHLIST } from '../../../routings/path';
import { ViewedSource } from 'tracking/constants';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  product: any;
  page: number;
  perPage: number;
  productCountOnPage: number;

  cartStore: any;
  likeStore: any;
  onClick?: (item: ProductBox) => void;
  addItemToCartAction: (data: any) => any;
  unLikeProductAction: (data: any, onSuccess?: () => any, onFailure?: () => any) => any;
  fetchListLikedBoxesAction: (data?: any) => any;
  openModalAction: (data: any) => any;
  openAlertAction: (data: any) => any;
}

const WishlistProductItem = ({
  product,
  page,
  perPage,
  productCountOnPage,

  cartStore: { isAddCartSuccess },
  likeStore: { removeFromWishList },
  onClick,
  addItemToCartAction,
  unLikeProductAction,
  fetchListLikedBoxesAction,
  openModalAction,
  openAlertAction
}: IProps) => {
  const history = useHistory();
  const [localLoading, setLocalLoading] = useState(false);
  const [localRemoving, setLocalRemoving] = useState(false);
  const wasAddCartSuccess = usePrevious(isAddCartSuccess);
  const wasRemovingFromWishList = usePrevious(removeFromWishList.loading);
  const disabled = !product.stock || !product.is_saleable;
  if (localLoading && !wasAddCartSuccess && isAddCartSuccess) {
    setLocalLoading(false);
  }
  if (localRemoving && wasRemovingFromWishList && !removeFromWishList.loading && removeFromWishList.isSuccess) {
    setLocalRemoving(false);
  }

  const onAddToCart = () => {
    setLocalLoading(true);
    addItemToCartAction({
      box: product,
      boxId: product.id,
      quantity: 1,
      displayCartSumary: false,
      purchaseType: PURCHASE_TYPE.NORMAL,
      trackingSource: ViewedSource.WISHLIST,
      onSuccess: isMobileVersion()
        ? () => {
            openModalAction(
              MOBILE_ALERT_ADD_TO_CART_SUCCESS({
                data: {
                  product: {
                    image: product.preview_picture && product.preview_picture.medium_url,
                    price: product.price,
                    name: product.name
                  }
                }
              })
            );
          }
        : () => {
            openAlertAction(ALERT_GENERAL_SUCCESS({ content: 'Đã thêm vào giỏ hàng' }));
          }
    });
  };

  const onRemoveFromWishlist = () => {
    setLocalRemoving(true);
    unLikeProductAction(product, () => {
      productCountOnPage === 1
        ? history.push(`${ROUTING_USER_WISHLIST}?page=${page > 1 ? page - 1 : 1}`)
        : fetchListLikedBoxesAction({ page, perPage });
    });
  };

  return (
    <div className={classNames(style.productItemWithAction)}>
      <ProductItem
        product={product}
        isShowDiscountPercentage
        isFullPadding
        isShowVariants={false}
        onClick={() => onClick?.(product)}
      />
      <SubmitButton
        title={'Thêm vào giỏ'}
        icon={{ name: 'cart', position: 'left' }}
        color={'borderWhite'}
        disabled={disabled}
        loading={localLoading}
        onSubmit={onAddToCart}
        classes={{
          container: classNames(style.button, disabled && style.buttonDisabledState),
          title: style.title,
          icon: style.icon
        }}
      />
      <SubmitButton
        title={'Bỏ yêu thích'}
        icon={{ name: 'heart-line', position: 'left' }}
        color={'borderWhite'}
        loading={localRemoving}
        onSubmit={onRemoveFromWishlist}
        classes={{
          container: classNames(style.button, style.buttonRemove),
          title: style.title,
          icon: style.icon
        }}
      />
    </div>
  );
};

export default WishlistProductItem;
