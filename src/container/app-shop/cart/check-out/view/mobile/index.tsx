import classNames from 'classnames';
import TrackVisibility from 'lixibox-react-on-screen';
import CartList, { ConfirmationType } from 'components/cart/list2';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import DiscountCode from 'components/cart/discount-code';
import SvgIcon from 'presentation-component/ui/icon';
import ItemVerticalList from 'presentation-component/item-list-hoc/item-vertical-list';
import ProductItem from 'presentation-component/product/product-item';

import { checkCartEmptyMessage, isEmptyObject, isUndefined } from 'utils';
import { checkBirthdayGift } from 'utils/generic';
import { isEmptyKeyObject } from 'utils/validate';
import { objectToHash } from 'utils/encode';
import { generateReferralSchemeSelectionHint } from 'utils/referral';
import { generateTestId } from 'utils/test-utils';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { BEST_SELLING_PARAMS } from 'constants/application/product';
import LixicoinRedeemPromptMobile from '../../../general/mobile/lixicoin-redeem-prompt';
import SampleRedeemPromptMobile from '../../../general/mobile/sample-redeem-prompt';
import AddonSlider from '../../../general/addon-slider';
import WishlistSlider from '../../../general/wishlist-slider';
import RecommendationSlider from '../../../general/recommendation-slider';
import FreeshipSlider from '../../../general/freeship-slider';
import PricingBreakdown1 from 'presentation-component/checkout/generic/pricing-breakdown';
import PricingBreakdown from 'container/app-shop/cart/general/pricing-breakdown';
import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';
import DiscountCodeGiftModal from '../../../general/mobile/discount-code-gift-modal';
import DiscountCodeAddonModal from '../../../general/mobile/discount-code-addon-modal';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import { ROUTING_SHOP_INDEX } from 'routings/path';
import DiscountCodeProductSelectionPrompt from 'presentation-component/checkout/generic/discount-code-product-selection-prompt';
import AddressBlock from 'container/app-shop/cart/general/address-block';
import DeliveryMethodBlock from 'container/app-shop/cart/payment/sub-components/mobile/delivery-method-block';
import PaymentMethodBlock from 'container/app-shop/cart/payment/sub-components/mobile/payment-method-block';
import ServicesBlock from 'container/app-shop/cart/general/services-block';
import { gatewayTrackViewAllItems, gatewayTrackViewContentFromList, gatewayTrackViewItemList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { TrackInViewport } from 'utils/visibility';
import { IProps, IState } from '../../model';
import style from './style.module.scss';

const CartListPlaceholder = () => {
  return (
    <div className={style.cartListPlaceholder}>
      <LoadingPlaceholder className={style.placeholder} />
    </div>
  );
};

interface FreeshipNoteProps {
  note: string;
  theme?: 'primary';
}
const FreeshipNote = ({ note, theme }: FreeshipNoteProps) => {
  const isPrimaryTheme = theme === 'primary';
  return (
    <div className={classNames(style.freeshipNoteBlock, isPrimaryTheme && style.freeshipNoteBlockPrimaryTheme)}>
      <div className={style.iconSection}>
        <SvgIcon name="tip" className={style.icon} />
      </div>
      <div className={style.textSection}>
        <SanitizedAndPreprocessedHTMLContent content={note} isSantitizeHtml={false} formatRNAsLineBreak />
      </div>
    </div>
  );
};

const renderComponent = ({ state, props, handleUpdateCart, onReferralHintClick }) => {
  const {
    cartStore: {
      cartGiftList,
      boxesToFreeship,
      cartDetail,
      cartDetail: { referral },
      addOnList,
      cartSampleList,
      specialAddOns,
      suggestionDiscountCodes,
      redeemable,
      isAddCartLoading,
      isRemoveCartLoading
    },
    authStore: { userInfo },
    appStore: { isPrivateMode },
    recommendationStore: { cartRecommendationList },
    shopStore: { productByCategory },
    orderStore: {
      birthdayOrder: { orders, store_orders }
    },
    history,
    toggleDiscountCodeGiftModalVisibilityAction,
    toggleDiscountCodeAddonModalVisibilityAction,
    showHideCartSumaryLayoutAction
  } = props as IProps;
  const specialRedeemable = redeemable && redeemable.special ? redeemable.special.index : [];
  const userRedeemable = redeemable && redeemable.user ? redeemable.user.index : [];
  const latestRedeemable = redeemable && redeemable.latest ? redeemable.latest.index : [];
  const { isGetCartListLoadding } = state as IState;

  const cartList = (!isEmptyKeyObject(cartDetail, 'cart_items') && cartDetail.cart_items) || [];

  // check and create cart empty message
  const isReceivedBirthdayGift = checkBirthdayGift(orders, store_orders);
  const cartEmptyMessage = checkCartEmptyMessage(userInfo, isReceivedBirthdayGift);

  const showDiscountCodeAddonPrompt = !!(specialAddOns.length && cartDetail.can_select_add_on);
  const showDiscountCodeGiftPrompt = !!(cartDetail && cartDetail.discount_code && cartGiftList.length);
  const showRedeemPrompt = !!(specialRedeemable.length || userRedeemable.length || latestRedeemable.length);
  const showSamplePrompt = !!cartSampleList.length;
  const showAddonSlider =
    !!cartDetail &&
    Array.isArray(cartDetail.cart_items) &&
    cartDetail.cart_items.length > 0 &&
    Array.isArray(addOnList) &&
    addOnList.length > 0;
  const showRecommendationSlider = !!cartRecommendationList && !!cartRecommendationList.length;
  const showFreeDeliverySlider =
    !isEmptyObject(cartDetail) &&
    cartDetail.cart_items &&
    0 < cartDetail.cart_items.length &&
    0 !== boxesToFreeship.length;
  const hasRegularProduct = cartDetail?.cart_items?.some((box) => box.editable);
  const inCartProductList = (!isEmptyObject(cartDetail) && hasRegularProduct && cartDetail.cart_items) || [];
  const anyGiftInCart = !!inCartProductList.find(({ purchase_type }) => purchase_type === PURCHASE_TYPE.GIFT);
  const anySpecialAddonInCart = !!inCartProductList.find(({ purchase_type }) => purchase_type === PURCHASE_TYPE.ADDON);
  const bestSellingHash = objectToHash({
    categoryId: BEST_SELLING_PARAMS.idCategory,
    limit: BEST_SELLING_PARAMS.limit
  });
  const bestSellingList =
    (!isEmptyObject(productByCategory) &&
      !isUndefined(productByCategory[bestSellingHash]) &&
      !isEmptyObject(productByCategory[bestSellingHash]) &&
      Array.isArray(productByCategory[bestSellingHash].boxes) &&
      productByCategory[bestSellingHash].boxes) ||
    [];

  const cartListProp = {
    history,
    isPrivateMode,
    update: handleUpdateCart,
    style: { paddingBottom: 0 },
    cartItemStyle: { borderBottom: `none` },
    list: inCartProductList,
    isCheckedDiscount:
      Object.keys(cartDetail).length && cartDetail.discount_code && cartDetail.discount_code.length > 0,
    compactView: true,
    confirmationType: 'popup' as ConfirmationType,
    isLoading: isAddCartLoading || isRemoveCartLoading,
    showHideCartSumaryLayoutAction,
    onItemClick: (box, index) => {
      gatewayTrackViewContentFromList({
        source: ViewedSource.CART,
        box,
        index
      });
    },
    withExpander: true,
    openLinkInNewTab: true
  };

  const noContentPlaceholderProps = {
    isShowBirthdayMessage: cartEmptyMessage?.isShowBirthdayMessage || false,
    userName: userInfo?.first_name || '',
    className: style.emptyCartPlaceholder,
    logo: NO_CONTENT_LOGO.BASKET,
    title: `${cartEmptyMessage?.title || ''}`,
    info: `${cartEmptyMessage?.info || ''}`,
    action: { text: 'Tiếp tục mua sắm' },
    onClick: () => history.push(ROUTING_SHOP_INDEX)
  };

  return (
    <div className={style.checkoutContainer} {...generateTestId({ name: 'checkout-container' })}>
      {!isGetCartListLoadding && !inCartProductList.length ? (
        <>
          <NoContentPlaceholder {...noContentPlaceholderProps} />
          {/* Empty cart view only */}
          {!cartDetail?.cart_items?.length && (
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
          )}
          {!!bestSellingList.length && (
            <ItemVerticalList title="Sản phẩm bán chạy" className={style.fallbackItemList}>
              {bestSellingList.map((product, index) => (
                <ProductItem
                  product={product}
                  isShowRating={true}
                  isShowPricing={true}
                  isFullPadding
                  onClick={() => {
                    gatewayTrackViewContentFromList({
                      source: ViewedSource.CART_BEST_SELLING_BOXES,
                      box: product,
                      index
                    });
                  }}
                />
              ))}
            </ItemVerticalList>
          )}
        </>
      ) : (
        <>
          {false && !!cartDetail.description && <FreeshipNote note={cartDetail.description} theme={'primary'} />}
          {/* Address block */}
          {!!cartDetail?.cart_items?.length && <AddressBlock />}
          {isGetCartListLoadding ? (
            <CartListPlaceholder />
          ) : (
            <div className={style.blockContainer}>
              <CartList {...cartListProp} />
            </div>
          )}

          {!!cartDetail?.cart_items?.length && showDiscountCodeGiftPrompt && (
            <DiscountCodeProductSelectionPrompt
              message={
                <>
                  {anyGiftInCart ? 'Đã chọn quà của mã' : 'Chọn quà của mã'}{' '}
                  <span className={style.bold}>{!!cartDetail ? cartDetail.discount_code : ''}</span>
                </>
              }
              classes={{ container: style.referralHint }}
              actionTitle={anyGiftInCart ? 'Thay đổi' : 'Chọn'}
              onClick={() => toggleDiscountCodeGiftModalVisibilityAction(true)}
            />
          )}
          {!!cartDetail?.cart_items?.length && showDiscountCodeAddonPrompt && (
            <DiscountCodeProductSelectionPrompt
              message={
                <>
                  {anySpecialAddonInCart ? 'Đã chọn' : 'Chọn'} ưu đãi đặc biệt của mã{' '}
                  <span className={style.bold}>{!!cartDetail ? cartDetail.discount_code : ''}</span>
                </>
              }
              classes={{ container: style.referralHint }}
              actionTitle={anySpecialAddonInCart ? 'Thay đổi' : 'Chọn'}
              onClick={() => toggleDiscountCodeAddonModalVisibilityAction(true)}
            />
          )}
          {!!cartDetail?.cart_items?.length && !!referral?.referrer && (
            <DiscountCodeProductSelectionPrompt
              message={generateReferralSchemeSelectionHint(referral)}
              classes={{ container: style.referralHint }}
              actionTitle={referral?.applied_scheme ? 'Thay đổi' : 'Chọn'}
              onClick={() => onReferralHintClick()}
            />
          )}
          {/* Payment method block */}
          {!!cartDetail?.cart_items?.length && <PaymentMethodBlock />}
          {/* Delivery method */}
          {!!cartDetail?.cart_items?.length && <DeliveryMethodBlock />}
          {/* Services block */}
          {!!cartDetail?.cart_items?.length && <ServicesBlock />}
          {false &&
            cartList &&
            !!cartList.length &&
            suggestionDiscountCodes &&
            Array.isArray(suggestionDiscountCodes) && <DiscountCode />}
          {false && showRedeemPrompt && (
            <LixicoinRedeemPromptMobile
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.REDEEM,
                  box,
                  index
                });
              }}
              onViewMoreClick={() => gatewayTrackViewAllItems({ source: ViewedSource.REDEEM })}
            />
          )}
          {false && showSamplePrompt && (
            <SampleRedeemPromptMobile
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.SAMPLE,
                  box,
                  index
                });
              }}
            />
          )}
          {/* FIXME: Improve offset. Issue: TrackVisibility doesn't support a negative offset */}
          {false && showRecommendationSlider && (
            <TrackVisibility once>
              <TrackInViewport onVisible={() => gatewayTrackViewItemList({ source: ViewedSource.CART_RECOMMENDATION })}>
                <RecommendationSlider
                  onItemClick={(box, index) => {
                    gatewayTrackViewContentFromList({
                      source: ViewedSource.CART_RECOMMENDATION,
                      box,
                      index
                    });
                  }}
                />
              </TrackInViewport>
            </TrackVisibility>
          )}
          {/* FIXME: Improve offset. Issue: TrackVisibility doesn't support a negative offset */}
          {false && showAddonSlider && (
            <TrackVisibility once>
              <TrackInViewport onVisible={() => gatewayTrackViewItemList({ source: ViewedSource.ADD_ON })}>
                <AddonSlider
                  onItemClick={(box, index) => {
                    gatewayTrackViewContentFromList({
                      source: ViewedSource.ADD_ON,
                      box,
                      index
                    });
                  }}
                />
              </TrackInViewport>
            </TrackVisibility>
          )}
          {false && showFreeDeliverySlider && (
            <FreeshipSlider
              onItemClick={(box, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.CART_FREESHIP_SUGGESTION,
                  box,
                  index
                });
              }}
            />
          )}
          {false && Object.keys(cartDetail).length && <PricingBreakdown1 cartView className={style.breakdown} />}
          {Object.keys(cartDetail).length && <PricingBreakdown classes={{ container: style.pricingBreakdown }} />}
          <DiscountCodeGiftModal
            onItemClick={(box, index) => {
              gatewayTrackViewContentFromList({
                source: ViewedSource.GIFT,
                box,
                index
              });
            }}
          />
          <DiscountCodeAddonModal
            onItemClick={(box, index) => {
              gatewayTrackViewContentFromList({
                source: ViewedSource.ADD_ON,
                box,
                index
              });
            }}
          />
        </>
      )}
    </div>
  );
};

export default renderComponent;
