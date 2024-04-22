import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import * as VARIABLE from '../../../style/variable';
import { isUndefined } from '../../../utils/validate';
import { getDeviceVersion } from '../../../utils/responsive';
import { SIGN_IN_STATE, APP_VERSION } from '../../../constants/application/global';
import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';
import { ORDER_TYPE } from '../../../constants/application/order';
import { isMobileVersion } from '../../../utils/responsive';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';
import { MODAL_SIGN_IN } from '../../../constants/application/modal';
import Quantity from '../../ui/quantity';
import ProductSummary from '../../product/summary';
import ButtonSubmit from '../../ui/submit-button';
import ProductPrice from '../../product/price';
import ProductName from '../../product/name';

import { IQuickViewProps, IQuickViewState } from './model';
import STYLE from './style';

const renderImage = ({ data, closeModal }) => {
  const linkProps = {
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${data.slug}`,
    onClick: closeModal
  };

  const btnViewMore = {
    color: 'white',
    title: 'Xem chi tiết',
    style: STYLE.productImage.viewDetail.btn
  };

  return (
    <div style={STYLE.productImage.container}>
      <div style={STYLE.productImage.imageWrap}>
        <Image alt={''} style={STYLE.productImage.img} src={data.primary_picture.large_url} />
      </div>
      <div style={STYLE.productImage.viewDetail}>
        <NavLink {...linkProps}>
          <ButtonSubmit {...btnViewMore} />
        </NavLink>
      </div>
    </div>
  );
};

function renderBtnGroup() {
  const { isLoadingAddToCard, isLoadingLove, isAddToWaitListSuccess } = this.state as IQuickViewState;

  const {
    shopStore: { addToWaitList },
    removeItemFromCartAction,
    displayCartSumaryOption,
    addToWaitListAction,
    addItemToCartAction,
    cartStore,
    authStore,
    listLikedId,
    likeProduct,
    unLikeProduct,
    openModal,
    data
  } = this.props as IQuickViewProps;

  const cartItem = cartStore?.cartDetail?.cart_items?.find((item) => item?.box?.id === data?.id);
  const isLiked =
    true !== isUndefined(data) &&
    SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus &&
    Array.isArray(listLikedId) &&
    listLikedId.indexOf(data.id) >= 0;

  let quantityInCart = 0;

  const isRedeem = data && true === data.for_redeem && false === data.is_saleable;
  const purchaseType = isRedeem ? PURCHASE_TYPE.REDEEM : PURCHASE_TYPE.NORMAL; // purchase_type: 1 - redeem (coin); 0 - normal (money)
  const isDisableAddToCartBtn = data && false === data.for_redeem && false === data.is_saleable;

  cartStore &&
    Array.isArray(cartStore.cartList) &&
    cartStore.cartList.forEach((item) => {
      if (
        data.id === item.box.id &&
        item.purchase_type !== PURCHASE_TYPE.ADDON &&
        item.purchase_type !== PURCHASE_TYPE.GIFT
      ) {
        quantityInCart = item.quantity;
      }
    });

  const switchAddWaitListTitle = { MOBILE: 'CHỜ HÀNG', DESKTOP: 'CHỜ HÀNG VỀ' };
  const addWaitListProps = {
    loading: (addToWaitList && addToWaitList.loading) || false,
    color: 'pink',
    icon: 'time',
    title: switchAddWaitListTitle[getDeviceVersion()],
    onSubmit: () =>
      SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus
        ? addToWaitListAction({ boxId: data.id, box: data, slug: data.slug })
        : openModal(MODAL_SIGN_IN()),
    style: Object.assign({}, STYLE.buttonGroup.button, STYLE.buttonGroup.button.left),
    styleIcon: STYLE.buttonGroup.button.iconTime
  };

  const switchAddToCartTitle = { MOBILE: 'MUA', DESKTOP: 'THÊM VÀO GIỎ' };
  const addToCartProps = {
    loading: isLoadingAddToCard,
    color: 'pink',
    icon: 'cart-line',
    title: data.pre_order_status === ORDER_TYPE.PENDING ? 'ĐẶT TRƯỚC' : switchAddToCartTitle[getDeviceVersion()],
    disabled: isDisableAddToCartBtn,
    onSubmit: () => {
      this.setState({ isLoadingAddToCard: true } as IQuickViewState);
      !!data &&
        this.handleTrackingFacebook({
          productSlug: data.slug,
          productId: data.id,
          price: data.price,
          isIndividual: data.is_individual
        });
      addItemToCartAction({
        box: data,
        boxId: data.id,
        quantity: 1,
        displayCartSumary: displayCartSumaryOption,
        purchaseType
      });
    },
    style: Object.assign({}, STYLE.buttonGroup.button, STYLE.buttonGroup.button.left),
    styleIcon: STYLE.buttonGroup.button.iconCart
  };

  const quantityProps = {
    color: { background: VARIABLE.colorWhite },
    value: quantityInCart,
    type: 'normal' as const,
    style: STYLE.buttonGroup.quantity,
    action: ({ oldValue, newValue }) => {
      const quantity = newValue - oldValue;
      if (quantity < 0) {
        removeItemFromCartAction({
          cartItem,
          box: data,
          boxId: data.id,
          quantity: Math.abs(quantity),
          displayCartSumary: false,
          purchaseType
        });
      } else {
        addItemToCartAction({
          box: data,
          boxId: data.id,
          quantity,
          displayCartSumary: false,
          purchaseType
        });
        this.handleTrackingFacebook({
          productSlug: data.slug,
          productId: data.id,
          price: data.price,
          isIndividual: data.is_individual
        });
      }
    }
  };

  const likeProps = {
    loading: isLoadingLove,
    title: isLiked ? 'ĐÃ THÍCH' : 'YÊU THÍCH',
    icon: isLiked ? 'heart-full' : 'heart-line',
    color: 'borderBlack',
    onSubmit: () => {
      if (SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus) {
        this.setState({ isLoadingLove: true } as IQuickViewState);
        isLiked ? unLikeProduct(data) : likeProduct(data);
      } else {
        openModal(MODAL_SIGN_IN());
      }
    },
    style: Object.assign({}, STYLE.buttonGroup.button, STYLE.buttonGroup.button.right),
    styleIcon: Object.assign(
      {},
      STYLE.buttonGroup.button.iconLove,
      true === isLiked && STYLE.buttonGroup.button.iconLove.liked
    )
  };

  const renderAddCartNormalBtn = () =>
    0 === quantityInCart ? <ButtonSubmit {...addToCartProps} /> : <Quantity {...quantityProps} />;

  return (
    <div style={STYLE.buttonGroup.container}>
      {data.pre_order_status === ORDER_TYPE.PENDING ? (
        renderAddCartNormalBtn()
      ) : 0 === data.stock ? (
        data.added_to_waitlist || isAddToWaitListSuccess ? (
          <ButtonSubmit title={'ĐANG CHỜ HÀNG'} style={STYLE.buttonGroup.btnWaiting} />
        ) : (
          <ButtonSubmit {...addWaitListProps} />
        )
      ) : (
        renderAddCartNormalBtn()
      )}
      <ButtonSubmit {...likeProps} />
    </div>
  );
}

function renderInfo() {
  const {
    data,
    openModal,
    shopStore: { storeBoxes }
  } = this.props as IQuickViewProps;

  const isRedeem = data && true === data.for_redeem && false === data.is_saleable;

  const productPriceProps = {
    style: STYLE.productPrice,
    currentPrice: data.price,
    oldPrice: data.original_price,
    coinsPrice: data.coins_price,
    currencyFormatType: isRedeem ? 'coin' : 'currency',
    version: APP_VERSION.DESKTOP
  };

  const productSummaryProps = {
    box: data,
    openModal,
    storeBoxes,
    style: STYLE.productSummary,
    stock: data.stock,
    boxId: data ? data.id : 0,
    rating: data.rating,
    love: data.like_count,
    lixicoinBonus: data.lixicoin_bonus,
    price: data.price ? data.price : data.coins_price,
    currencyFormatType: isRedeem ? 'coin' : 'currency',
    preOrderStatus: (data && data.pre_order_status) || '',
    preOrderReleaseDate: (data && data.pre_order_release_date) || 0
  };

  return (
    <div style={STYLE.productInfo.container}>
      <ProductName slug={data.slug} name={data.name} />
      <ProductPrice {...productPriceProps} />
      <ProductSummary {...productSummaryProps} />
      <div style={STYLE.productInfo.description}>{data.long_description}</div>
      {!isMobileVersion() && renderBtnGroup.bind(this)()}
    </div>
  );
}

export function renderComponent() {
  const { data, closeModal } = this.props as IQuickViewProps;

  return (
    <div style={STYLE.wrap}>
      <div className={'scroll-view'}>
        <div style={STYLE.container}>
          {renderImage({ data, closeModal })}
          {renderInfo.bind(this)()}
        </div>
      </div>
      {isMobileVersion() && renderBtnGroup.bind(this)()}
    </div>
  );
}
