import classNames from 'classnames';

import CartList from 'components/cart/list2';
import RedeemSliders from 'container/app-shop/cart/general/desktop/redeem-sliders';
import AddonSlider from 'container/app-shop/cart/general/desktop/addon-slider';
import FreeDeliverySlider from 'container/app-shop/cart/general/desktop/free-delivery-slider';
import SamplesSlider from 'container/app-shop/cart/general/desktop/samples-slider';
import LoadingPlaceholder from 'components/ui/loading-placeholder';
import DiscountCodePrompts from 'container/app-shop/cart/general/desktop/discount-code-prompts';
import DiscountCodeProductRedeemModal from 'container/app-shop/cart/general/desktop/discount-code-product-redeem-modal';
import RecommendationSlider from 'container/app-shop/cart/general/desktop/recommendation-slider';
import WishlistSlider from 'container/app-shop/cart/general/desktop/wishlist-slider';
import AddressBlock from 'container/app-shop/cart/general/address-block';
import PaymentMethodBlock from 'container/app-shop/cart/payment/sub-components/desktop/payment-method-block';
import DeliveryMethodBlock from 'container/app-shop/cart/payment/sub-components/desktop/delivery-method-block';
import ServicesBlock from 'container/app-shop/cart/general/services-block';

import { isEmptyObject } from 'utils';
import { isEmptyKeyObject } from 'utils/validate';

import { checkBirthdayGift } from 'utils/generic';
import { generateTestId } from 'utils/test-utils';
import { gatewayTrackViewAllItems, gatewayTrackViewContentFromList, gatewayTrackViewItemList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { IProps, IState } from '../../model';
import style from './style.module.scss';
import TrackVisibility from 'lixibox-react-on-screen';
import { TrackInViewport } from 'utils/visibility';

const renderCartListPlaceholder = () => {
  return (
    <div className={style.cartListPlaceholder}>
      <LoadingPlaceholder />
    </div>
  );
};

const renderComponent = ({ state, props, handleUpdateCart, onReferralHintClick }) => {
  const {
    cartStore: {
      cartRedeemList,
      boxesToFreeship,
      cartDetail,
      addOnList,
      cartSampleList,
      constants,
      isAddCartLoading,
      isRemoveCartLoading
    },
    orderStore: {
      birthdayOrder: { orders, storeOrders }
    },
    recommendationStore: { cartRecommendationList },
    authStore: { userInfo },
    appStore: { isPrivateMode, privateModeLink },
    showHideCartSumaryLayoutAction,
    history
  } = props as IProps;

  const { isGetCartListLoadding } = state as IState;
  const itemsRegularProduct = cartDetail?.cart_items?.filter((box) => box.editable) || [];

  const cartList =
    (!isEmptyKeyObject(cartDetail, 'cart_items') && itemsRegularProduct.length && itemsRegularProduct) || [];

  // check user have received gift
  const isReceivedBirthdayGift = checkBirthdayGift(orders, storeOrders);

  const isShowRedeemList = cartList && 0 !== cartList.length && cartRedeemList && 0 !== cartRedeemList.length;
  const showAddonSlider =
    !!itemsRegularProduct &&
    Array.isArray(itemsRegularProduct) &&
    itemsRegularProduct.length > 0 &&
    Array.isArray(addOnList) &&
    addOnList.length > 0;
  const showRecommendationSlider = !!cartRecommendationList && !!cartRecommendationList.length;
  const showFreeDeliverySlider =
    !isEmptyObject(itemsRegularProduct) &&
    itemsRegularProduct &&
    0 < itemsRegularProduct.length &&
    0 !== boxesToFreeship.length;

  const cartListProp = {
    userInfo: userInfo,
    isReceivedBirthdayGift: isReceivedBirthdayGift,
    history,
    isPrivateMode,
    privateModeLink,
    update: handleUpdateCart,
    style: { paddingBottom: 0 },
    cartItemStyle: { borderBottom: `none` },
    isLoading: isAddCartLoading || isRemoveCartLoading,
    list: (!isEmptyObject(cartDetail) && itemsRegularProduct?.length && cartDetail?.cart_items) || [],
    isCheckedDiscount: !!cartDetail && cartDetail.discount_code && cartDetail.discount_code.length > 0,
    showHideCartSumaryLayoutAction,
    onItemClick: (box, index) => {
      gatewayTrackViewContentFromList({
        source: ViewedSource.CART,
        box,
        index
      });
    },
    withHeader: true,
    withExpander: true,
    openLinkInNewTab: true
  };

  const isShowSampleSlider = (!!constants && constants.enabled_sample) || false;

  return (
    <div className={style.checkoutContainer} {...generateTestId({ name: 'checkout-container' })}>
      <div>
        {!!cartDetail?.cart_items?.length && <AddressBlock />}
        {isGetCartListLoadding ? (
          renderCartListPlaceholder()
        ) : (
          <>
            <div className={style.blockContainer}>
              <CartList {...cartListProp} />
              {!!cartDetail?.cart_items?.length && <DiscountCodePrompts onReferralHintClick={onReferralHintClick} />}
            </div>
          </>
        )}
        {/* Payment method */}
        {!!cartDetail?.cart_items?.length && <PaymentMethodBlock />}
        {/* Delivery method */}
        {!!cartDetail?.cart_items?.length && <DeliveryMethodBlock />}
        {/* Services block */}
        {!!cartDetail?.cart_items?.length && <ServicesBlock />}
        {/* Empty cart view only */}
        {!cartDetail?.cart_items?.length && (
          <div className={classNames(style.blockContainerChildrenAware, style.blockContainerSiblingChildrenAware)}>
            <WishlistSlider
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({
                  source: cartDetail?.cart_items?.length
                    ? ViewedSource.CART_WISHLIST
                    : ViewedSource.EMPTY_CART_WISHLIST,
                  box,
                  index
                });
              }}
              onViewMoreClick={() =>
                gatewayTrackViewAllItems({
                  source: cartDetail?.cart_items?.length ? ViewedSource.CART_WISHLIST : ViewedSource.EMPTY_CART_WISHLIST
                })
              }
            />
          </div>
        )}
        {/* FIXME: Improve offset. Issue: TrackVisibility doesn't support a negative offset */}
        {!cartDetail?.cart_items?.length && showRecommendationSlider && (
          <TrackVisibility once>
            <TrackInViewport onVisible={() => gatewayTrackViewItemList({ source: ViewedSource.CART_RECOMMENDATION })}>
              <div className={classNames(style.blockContainer, style.blockContainerSibling)}>
                <RecommendationSlider
                  onItemClick={(box, index) => {
                    gatewayTrackViewContentFromList({
                      source: ViewedSource.CART_RECOMMENDATION,
                      box,
                      index
                    });
                  }}
                />
              </div>
            </TrackInViewport>
          </TrackVisibility>
        )}
        {false && isShowRedeemList && (
          <div
            className={classNames(
              'lixicoinRedeemBlock', // FIXME: Use ref instead
              style.blockContainer,
              style.blockContainerSibling
            )}
          >
            <RedeemSliders
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.REDEEM,
                  box,
                  index
                });
              }}
              onViewMoreClick={() => gatewayTrackViewAllItems({ source: ViewedSource.REDEEM })}
            />
          </div>
        )}
        {/* FIXME: Improve offset. Issue: TrackVisibility doesn't support a negative offset */}
        {false && showAddonSlider && (
          <TrackVisibility once>
            <TrackInViewport onVisible={() => gatewayTrackViewItemList({ source: ViewedSource.ADD_ON })}>
              <div className={classNames(style.blockContainer, style.blockContainerSibling)}>
                <AddonSlider
                  onItemClick={(box, index) => {
                    gatewayTrackViewContentFromList({
                      source: ViewedSource.ADD_ON,
                      box,
                      index
                    });
                  }}
                />
              </div>
            </TrackInViewport>
          </TrackVisibility>
        )}
        {false && showFreeDeliverySlider && (
          <div className={classNames(style.blockContainer, style.blockContainerSibling)}>
            <FreeDeliverySlider
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.CART_FREESHIP_SUGGESTION,
                  box,
                  index
                });
              }}
            />
          </div>
        )}
        {false &&
          !!cartDetail &&
          !!isShowSampleSlider &&
          Array.isArray(cartDetail.cart_items) &&
          cartDetail.cart_items.length > 0 &&
          Array.isArray(cartSampleList) &&
          cartSampleList.length > 0 && (
            <div className={classNames(style.blockContainer, style.blockContainerSibling)}>
              <SamplesSlider
                onItemClick={(box, index) => {
                  gatewayTrackViewContentFromList({
                    source: ViewedSource.SAMPLE,
                    box,
                    index
                  });
                }}
              />
            </div>
          )}
        <div className={style.filler} />
        <DiscountCodeProductRedeemModal
          onSectionItemClick={(box, index, section) => {
            gatewayTrackViewContentFromList({
              source: section === 'gift' ? ViewedSource.GIFT : ViewedSource.ADD_ON,
              box,
              index
            });
          }}
        />
      </div>
    </div>
  );
};

export default renderComponent;
