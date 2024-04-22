import classNames from 'classnames';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { usePrevious } from '../../../utils/hook';
import ProductItem from '../../../presentation-component/product/product-item';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';
import { ROUTING_USER_WAITLIST } from '../../../routings/path';
import { isMobileVersion } from '../../../utils/responsive';
import { MOBILE_ALERT_ADD_TO_CART_SUCCESS } from '../../../constants/application/modal';
import SubmitButton from '../../../presentation-component/ui/submit-button';
import { ALERT_GENERAL_SUCCESS } from '../../../constants/application/alert';
import { ViewedSource } from 'tracking/constants';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';
import { PropsFromRedux } from './store';

interface IProps extends PropsFromRedux {
  product: ProductBox;
  page: number;
  perPage: number;
  productCountOnPage: number;
  onClick?: (item: ProductBox) => void;
}

const WaitlistProductItem = ({
  product,
  page,
  perPage,
  productCountOnPage,

  cartStore: { isAddCartSuccess },
  shopStore: { removeFromWaitList },
  onClick,
  addItemToCartAction,
  removeFromWaitListAction,
  fetchUserWaitListAction,
  openModalAction,
  openAlertAction
}: IProps) => {
  const history = useHistory();
  const [localLoading, setLocalLoading] = useState(false);
  const [localRemoving, setLocalRemoving] = useState(false);
  const wasAddCartSuccess = usePrevious(isAddCartSuccess);
  const wasRemovingFromWaitList = usePrevious(removeFromWaitList.loading);
  const disabled = !product.stock;
  if (localLoading && !wasAddCartSuccess && isAddCartSuccess) {
    setLocalLoading(false);
  }
  if (localRemoving && wasRemovingFromWaitList && !removeFromWaitList.loading && removeFromWaitList.isSuccess) {
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
      trackingSource: ViewedSource.WAITLIST,
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

  const onRemoveFromWaitlist = () => {
    setLocalRemoving(true);
    removeFromWaitListAction({
      boxId: product.id,
      box: product,
      slug: product.slug,
      onSuccess: () => {
        if (page === 1 || productCountOnPage > 1) {
          fetchUserWaitListAction({ page, perPage });
        } else {
          const previousPage = page > 1 ? page - 1 : 1;
          history.push(`${ROUTING_USER_WAITLIST}?page=${previousPage}`);
        }
      },
      onReject: () => {}
    });
  };

  return (
    <div className={classNames(style.productItemWithAction)}>
      <ProductItem product={product} isShowDiscountPercentage isFullPadding onClick={() => onClick?.(product)} />
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
        title={'Bỏ chờ'}
        color={'borderWhite'}
        loading={localRemoving}
        onSubmit={onRemoveFromWaitlist}
        classes={{
          container: classNames(style.button, style.buttonRemove),
          title: style.title,
          icon: style.icon
        }}
      />
    </div>
  );
};

export default WaitlistProductItem;
