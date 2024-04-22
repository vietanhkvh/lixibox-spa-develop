import { Component } from 'react';

import { auth } from '../../../../utils/auth';
import { isEmptyObject, isUndefined } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';
import { BEST_SELLING_PARAMS } from '../../../../constants/application/product';
import { TYPE_UPDATE } from '../../../../constants/application/cart';
import { trackingFacebookPixel } from '../../../../tracking/facebook-pixel';
import { trackingTiktokPixel } from '../../../../tracking/tiktok-pixel';
import { PURCHASE_TYPE } from '../../../../constants/application/purchase';
import { MOBILE_ALERT_DISCOUNT_CODE_SUCCESS } from '../../../../constants/application/modal';
import { SHARED_MODAL_ID } from '../../../../constants/application/shared-modal';
import { REFEREE_SCHEMES_MODAL_INVOCATION_MODE } from '../../../../constants/application/referral';
import { handleGtagTrackingService } from 'utils/tracking';
import { ViewedSource } from 'tracking/constants';
import { gatewayTrackViewCart } from 'tracking/gateway';
import renderComponent from './view';
import { IProps, IState } from './model';
import { INITIAL_STATE } from './initialize';

class CartContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }
  private PER_PAGE_MAX = 50;
  private PER_PAGE_MIN = 12;
  // When user remove items on cart list => update fetch the addon list and sample list => update status button again
  handleUpdateCart({ type, data: { cartItem, box, boxId, quantity, purchaseType }, isWishList }) {
    const {
      likeProductAction,
      addItemToCartAction,
      fetchAddOnListAction,
      fetchSampleBoxesAction,
      removeItemFromCartAction
    } = this.props;

    switch (type) {
      case TYPE_UPDATE.QUANTITY:
        if (quantity < 0) {
          removeItemFromCartAction({
            cartItem,
            box,
            boxId,
            purchaseType,
            quantity: Math.abs(quantity)
          });
        } else {
          addItemToCartAction({ box, boxId, quantity, purchaseType, trackingSource: ViewedSource.CART });
        }
        break;

      default:
        break;
    }

    if (purchaseType === PURCHASE_TYPE.ADDON || purchaseType === PURCHASE_TYPE.GIFT) {
      /** After add / remove item need to re-fetch add on box */
      fetchAddOnListAction({ limit: 25 });
    }

    /** If have update sample need to re-fetch sample */
    purchaseType === PURCHASE_TYPE.SAMPLE && fetchSampleBoxesAction();

    /** Buy later */
    !!isWishList && likeProductAction(box, true);
  }

  handleShowDiscountCodeModal() {
    const {
      openModalAction,
      addDiscountCodeAction,
      showHideCartSumaryLayoutAction,
      cartStore: { suggestionDiscountCodes, cartDetail }
    } = this.props;

    showHideCartSumaryLayoutAction?.(false);
    openModalAction(
      MOBILE_ALERT_DISCOUNT_CODE_SUCCESS({
        data: {
          suggestionDiscountCodes,
          cartDetail,
          addDiscountCodeAction
        }
      })
    );
  }

  handleReferralHintClick() {
    const {
      cartStore: {
        cartDetail: { referral }
      }
    } = this.props;
    const referralCode = referral?.referrer?.referral_code;

    referralCode &&
      this.props.openSharedModalAction?.({
        id: SHARED_MODAL_ID.RefereeSchemesModal,
        data: { code: referralCode, mode: REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITHOUT_BUTTON }
      });
  }

  componentDidMount() {
    const {
      getCart,
      fetchCartRedeemBoxes,
      fetchCartRedeemSpecialBoxes,
      fetchCartRedeemUserBoxes,
      fetchCartRedeemLatestBoxes,
      fetchAddOnListAction,
      fetchSampleBoxesAction,
      fetchBoxesToFreeshipAction,
      fetchSuggestionDiscountCodesAction,
      fetchUserProfileAction,
      fetchCartRecommendationListAction,
      getReportsFeaturesAction,
      fetchListLikedBoxesAction,
      getOrderBirthdayReceived,
      updatePromotionsViewCountSinceCheckoutMountedAction
    } = this.props;

    // Get cart list
    this.setState({ isGetCartListLoadding: true }, () => getCart());

    // Reset promotions popup view count;
    updatePromotionsViewCountSinceCheckoutMountedAction({ count: 0 });

    //data for get orderBirthdayReceived
    const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1).getTime() / 1000;
    const currentYear = Math.floor(new Date().getTime() / 1000);
    const data = {
      startAt: firstDayCurrentYear,
      endAt: currentYear
    };

    // User is a guest not get redeem (coin) list
    if (auth.loggedIn()) {
      fetchUserProfileAction();
      getOrderBirthdayReceived(data);
      false && fetchCartRedeemBoxes({ page: 1, perPage: this.PER_PAGE_MIN });
      false && fetchCartRedeemSpecialBoxes({ page: 1, perPage: this.PER_PAGE_MIN });
      false && fetchCartRedeemUserBoxes({ page: 1, perPage: this.PER_PAGE_MIN });
      false && fetchCartRedeemLatestBoxes({ page: 1, perPage: this.PER_PAGE_MAX });
      fetchListLikedBoxesAction({ page: 1, perPage: 12, stockStatus: 'in_stock' });
    }

    fetchAddOnListAction({ limit: 25 });

    // TODO: check price < 800 fetch data
    fetchBoxesToFreeshipAction();

    fetchSuggestionDiscountCodesAction();

    // Fetch sample product for user use
    fetchSampleBoxesAction();

    fetchCartRecommendationListAction({ page: 1, perPage: 12 });

    getReportsFeaturesAction({ code: 'cart_recommendation' });

    handleGtagTrackingService('spv_view_cart');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // TODO: Refactor
    const {
      cartStore: {
        cartDetail,
        isGetCartListSuccess,
        addDiscountCode: { status }
      },
      shopStore: { productByCategory },
      closeModalAction,
      toggleDiscountCodeGiftModalVisibilityAction,
      toggleDiscountCodeAddonModalVisibilityAction,
      fetchHomeProductByCategoryAction
    } = this.props;

    if (
      !status &&
      !isEmptyObject(nextProps.cartStore) &&
      !isEmptyObject(nextProps.cartStore.addDiscountCode) &&
      nextProps.cartStore.addDiscountCode.status &&
      nextProps.cartStore.cartDetail.can_select_gift &&
      !!nextProps.cartStore.cartGiftList.length
    ) {
      closeModalAction(); // Close discount code list modal

      toggleDiscountCodeGiftModalVisibilityAction(true);
    }

    if (
      !status &&
      !isEmptyObject(nextProps.cartStore) &&
      !isEmptyObject(nextProps.cartStore.addDiscountCode) &&
      nextProps.cartStore.addDiscountCode.status &&
      !!nextProps.cartStore.cartDetail.can_select_add_on &&
      !!nextProps.cartStore.specialAddOns.length
    ) {
      closeModalAction(); // Close discount code list modal

      toggleDiscountCodeAddonModalVisibilityAction(true);
    }

    if (!isGetCartListSuccess && !isEmptyObject(nextProps.cartStore) && nextProps.cartStore.isGetCartListSuccess) {
      const cartList = nextProps?.cartStore?.cartList.map((item) => item.box.id) || [];
      localStorage.setItem('PERSIST_CART_AT_FRIST_LOAD', JSON.stringify(cartList));

      /** Fetch best selling products, if not already fetched */
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
      if (!nextProps.cartStore.cartList.length && !Object.keys(bestSellingList).length) {
        fetchHomeProductByCategoryAction({
          categoryId: BEST_SELLING_PARAMS.idCategory,
          limit: BEST_SELLING_PARAMS.limit
        });
      }

      this.setState({ isGetCartListLoadding: false });

      if (!!cartDetail && !!cartDetail.cart_items) {
        let quantityTotal = 0;
        cartDetail.cart_items.forEach((item) => {
          quantityTotal += item.quantity;
        });

        trackingFacebookPixel('InitiateCheckout', {
          num_items: quantityTotal,
          value: cartDetail.total_price,
          currency: 'VND',
          content_name: cartDetail.cart_items.map((item) => item.box.name).join(', '),
          content_type: 'product',
          contents: cartDetail.cart_items.map((item) => ({
            id: item.box.id,
            quantity: item.quantity
          })),
          content_ids: cartDetail.cart_items.map((item) => item.box.id) || []
        });

        trackingTiktokPixel('StartCheckout', {
          content_type: 'product_group',
          contents:
            cartDetail.cart_items.map((item) => ({
              content_type: 'product',
              content_id: item.box.id,
              quantity: item.quantity,
              price: item.price
            })) || [],
          value: cartDetail.total_price,
          currency: 'VND'
        });

        this.state.isViewCartEventTracked ||
          this.setState({ isViewCartEventTracked: true }, () => {
            gatewayTrackViewCart({ cart: nextProps.cartStore.cartDetail });
          });

        try {
          'function' === typeof window.gtag &&
            window.gtag('event', 'begin_checkout', {
              currency: 'VND',
              value: cartDetail.total_price,
              coupon: cartDetail.discount_code || '',
              items: Array.isArray(cartDetail.cart_items)
                ? cartDetail.cart_items.map((item, idx) => ({
                    item_id: item?.box?.id || '',
                    item_name: item?.box?.name || '',
                    affiliation: '',
                    coupon: cartDetail.discount_code,
                    discount: item?.box?.original_price - item?.box?.price,
                    index: idx + 1,
                    item_brand: item?.box?.brand_name || '',
                    item_category: '',
                    item_category2: '',
                    item_category3: '',
                    item_category4: '',
                    item_category5: '',
                    item_list_id: '',
                    item_list_name: '',
                    item_variant: '',
                    location_id: '',
                    price: item.price,
                    quantity: item.quantity
                  }))
                : []
            });
        } catch (e) {}
      }
    }
  }

  getCartGift(condition, list, action) {
    true === condition && 0 === list.length && action();
  }

  render() {
    const renderViewProps = {
      state: this.state,
      props: this.props,
      handleUpdateCart: this.handleUpdateCart.bind(this),
      handleShowDiscountCodeModal: this.handleShowDiscountCodeModal.bind(this),
      onReferralHintClick: this.handleReferralHintClick.bind(this)
    };

    return renderComponent(renderViewProps);
  }
}

export default CartContainer;
