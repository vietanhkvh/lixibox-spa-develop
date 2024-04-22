import { useEffect, useState } from 'react';
import { isMobileVersion, isUndefined } from 'utils';
import { auth } from 'utils/auth';
import { usePrevious } from 'utils/hook';
import { MOBILE_ALERT_ADD_TO_CART_SUCCESS, MODAL_SIGN_IN } from 'constants/application/modal';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { Product } from 'types/api/shop';
import { CartItem } from 'types/api/cart';
import { ShopState } from 'flows/shop/types';
import { CartState } from 'flows/cart/types';
import { CombinedProduct } from '../../../model';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';

interface GetPrimaryButtonPropsParams {
  product: Product;
  combinedProduct: CombinedProduct;

  // State management
  isLoadingAddToCard: boolean;
  setIsLoadingAddToCard: (status: boolean) => void;

  openModalAction: (data) => void;
  addItemToCartAction: (data) => void;
  addToWaitListAction: (data) => void;
  shopStore: ShopState;
}
const getPrimaryButtonProps = ({
  product,
  combinedProduct,

  // State management
  isLoadingAddToCard,
  setIsLoadingAddToCard,

  openModalAction,
  addItemToCartAction,
  addToWaitListAction,
  shopStore,
  shopStore: { addToWaitList }
}: GetPrimaryButtonPropsParams) => {
  const isRedeem = product && product.box && product.box.for_redeem && !product.box.is_saleable;
  const purchaseType = isRedeem ? PURCHASE_TYPE.REDEEM : PURCHASE_TYPE.NORMAL; // purchase_type: 1 - redeem (coin); 0 - normal (money)

  const buttonProps: {
    icon?: { name: string; position: 'left' | 'right' };
    color?: string;
    title?: string;
    disabled?: boolean;
    loading?: boolean;
    onSubmit?: () => any;
    dataTestId?: string;
  } = {};

  if (!product?.box?.is_saleable || product?.box?.status === 'rejected') {
    if (product?.box?.added_to_waitlist) {
      Object.assign(buttonProps, {
        icon: { name: 'history', position: 'left' },
        title: 'Đang chờ hàng về',
        dataTestId: 'btn-waiting-to-product',
        color: 'black',
        disabled: true
      });
    } else {
      Object.assign(buttonProps, {
        icon: { name: 'history', position: 'left' },
        title: 'Thêm vào danh sách chờ',
        color: 'black',
        dataTestId: 'btn-add-to-waitlist',
        onSubmit: () => {
          auth.loggedIn()
            ? addToWaitListAction({
                boxId: combinedProduct.id,
                box: combinedProduct.box,
                slug: combinedProduct.slug
              })
            : openModalAction(MODAL_SIGN_IN());
        }
      });
    }
  } else if (product?.box?.pre_order_status === 'pending') {
    Object.assign(buttonProps, {
      icon: { name: 'cart', position: 'left' },
      title: 'Đặt trước',
      color: 'pink',
      loading: isLoadingAddToCard,
      dataTestId: 'btn-pre-ordered',
      onSubmit: () => {
        setIsLoadingAddToCard(true);

        if (isMobileVersion()) {
          addItemToCartAction({
            box: combinedProduct.box,
            boxId: combinedProduct.id,
            quantity: 1,
            displayCartSumary: false,
            purchaseType,
            onSuccess: () => {
              openModalAction(
                MOBILE_ALERT_ADD_TO_CART_SUCCESS({
                  data: {
                    product: {
                      image:
                        !!combinedProduct.picture &&
                        !!combinedProduct.picture.length &&
                        combinedProduct.picture[0].medium_url,
                      price: combinedProduct.currentPrice,
                      name: combinedProduct.name
                    }
                  }
                })
              );
            }
          });
        } else {
          addItemToCartAction({
            box: combinedProduct.box,
            boxId: combinedProduct.id,
            quantity: 1,
            displayCartSumary: true,
            purchaseType
          });
        }
      }
    });
  } else if (product?.box?.stock <= 0) {
    if (product?.box?.added_to_waitlist) {
      Object.assign(buttonProps, {
        icon: { name: 'history', position: 'left' },
        title: 'Đang chờ hàng về',
        color: 'black',
        disabled: true,
        dataTestId: 'btn-waiting-to-waitlist'
      });
    } else {
      Object.assign(buttonProps, {
        icon: { name: 'history', position: 'left' },
        title: 'Thêm vào danh sách chờ',
        color: 'black',
        loading: (addToWaitList && addToWaitList.loading) || false,
        dataTestId: 'btn-add-to-waitlist',
        onSubmit: () => {
          auth.loggedIn()
            ? addToWaitListAction({
                boxId: combinedProduct.id,
                box: combinedProduct.box,
                slug: combinedProduct.slug
              })
            : openModalAction(MODAL_SIGN_IN());
        }
      });
    }
  } else {
    Object.assign(buttonProps, {
      icon: { name: 'cart', position: 'left' },
      title: 'Thêm vào giỏ',
      color: 'pink',
      loading: isLoadingAddToCard,
      dataTestId: 'btn-add-to-cart-product-detail',
      onSubmit: () => {
        setIsLoadingAddToCard(true);

        if (isMobileVersion()) {
          addItemToCartAction({
            box: combinedProduct.box,
            boxId: combinedProduct.id,
            quantity: 1,
            displayCartSumary: false,
            purchaseType,
            onSuccess: () => {
              openModalAction(
                MOBILE_ALERT_ADD_TO_CART_SUCCESS({
                  data: {
                    product: {
                      image:
                        !!combinedProduct.picture &&
                        !!combinedProduct.picture.length &&
                        combinedProduct.picture[0].medium_url,
                      price: combinedProduct.currentPrice,
                      name: combinedProduct.name
                    }
                  }
                })
              );
            }
          });
        } else {
          addItemToCartAction({
            box: combinedProduct.box,
            boxId: combinedProduct.id,
            quantity: 1,
            displayCartSumary: true,
            purchaseType
          });
        }
      }
    });
  }

  return buttonProps;
};

interface ViewProps {
  addToCartButtonProps: { [key: string]: any };
  isLiked: boolean;
  isLoadingLove: boolean;
  isPriceBtnOnTop: boolean; // Mobile view specific
  cartItems: Array<CartItem>; // Mobile view specific
  onWishlistClick: () => void;
  classes?: { container?: string };
}
interface PrimaryButtonGroupProps {
  product: Product;
  combinedProduct: CombinedProduct;
  classes?: { container?: string };

  isPriceBtnOnTop?: boolean; // Mobile view specific

  cartStore: CartState;
  shopStore: ShopState;
  appStore: any;
  likedIdList: Array<any>; // TODO: Specify type
  addItemToCartAction: (data) => void;
  addToWaitListAction: (data) => void;
  openModalAction: (data) => void;
  likeProductAction: (productId: string) => void;
  unLikeProductAction: (productId: string) => void;
}
const PrimaryButtonGroup = ({
  product,
  combinedProduct,
  classes,

  isPriceBtnOnTop, // Mobile view specific

  cartStore,
  cartStore: { isAddCartLoading },
  shopStore,
  likedIdList,
  addItemToCartAction,
  addToWaitListAction,
  openModalAction,
  likeProductAction,
  unLikeProductAction
}: PrimaryButtonGroupProps) => {
  const wasAddCartLoading = usePrevious(isAddCartLoading);
  const [isLoadingAddToCard, setIsLoadingAddToCard] = useState(false);
  useEffect(() => {
    wasAddCartLoading && !isAddCartLoading && setIsLoadingAddToCard(false);
  }, [isAddCartLoading]);

  const prevLikedIdList = usePrevious(likedIdList);
  const [isLoadingLove, setIsLoadingLove] = useState(false);
  useEffect(() => {
    Array.isArray(prevLikedIdList) &&
      Array.isArray(likedIdList) &&
      prevLikedIdList.length !== likedIdList.length &&
      setIsLoadingLove(false);
  }, [likedIdList]);

  const cartItems = cartStore?.cartDetail?.cart_items || [];
  const addToCartButtonProps = getPrimaryButtonProps({
    product,
    combinedProduct,

    // State management
    isLoadingAddToCard,
    setIsLoadingAddToCard,

    openModalAction,
    addItemToCartAction,
    addToWaitListAction,
    shopStore
  });
  const isLiked =
    true !== isUndefined(product) &&
    auth.loggedIn() &&
    Array.isArray(likedIdList) &&
    likedIdList.indexOf(combinedProduct.id || 0) >= 0;

  const onWishlistClick = () => {
    if (auth.loggedIn()) {
      setIsLoadingLove(true);
      isLiked ? unLikeProductAction(combinedProduct.box) : likeProductAction(combinedProduct.box);
    } else {
      openModalAction(MODAL_SIGN_IN());
    }
  };

  const View = isMobileVersion() ? MobileView : DesktopView;
  return (
    <View
      {...{
        addToCartButtonProps,
        isLiked,
        isLoadingLove,
        classes,
        onWishlistClick,
        isPriceBtnOnTop,
        cartItems
      }}
    />
  );
};

export type { ViewProps };
export default PrimaryButtonGroup;
