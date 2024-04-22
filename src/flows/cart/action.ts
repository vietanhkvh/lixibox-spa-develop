import * as CART_API_PATH from '../../api/cart';
import * as SHOP_API_PATH from '../../api/shop';
import * as CART_ACTION_TYPE from './type';
import * as ALERT_ACTION_TYPE from '../alert/type';
import { REDUCER_GROUP } from '../reducer.group';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../tracking/google-analytic/type';
import { gaEventTracking } from '../../tracking/google-analytic/ga-event-tracking';
import { ALERT_GENERAL_ERROR } from '../../constants/application/alert';

import { scrollElement } from '../../utils/scroll';
import { PURCHASE_TYPE, PurchaseTypeType } from '../../constants/application/purchase';
import { SHIPPING_TYPE } from '../../constants/application/shipping';
import { isUndefined } from '../../utils/validate';
import { store } from '../../app/init-react-app';
import { CartItem } from 'types/api/cart';
import { ProductBox } from 'types/api/shop';
import { gatewayTrackRemoveFromCart } from 'tracking/gateway';
import { ViewedSourceType } from 'tracking/constants';
import { RepresentablePromotion } from './types';

/**
 * Show / Hide CartSumary with state params
 *
 * @param {boolean} state
 * showHideCartSumary_Action
 */
export const showHideCartSumaryLayoutAction =
  (state = false) =>
  (dispatch, getState) => {
    // FIXME: Legacy logic. Refactor.
    // When cart summary show then not allows sroll page
    if (state) {
      try {
        const shopAppElement: any = document.getElementById('shop-app');
        if (!!shopAppElement && 'fixed' !== shopAppElement.style.position) {
          const scrollYPages = window.scrollY;
          shopAppElement.style.top = `-${scrollYPages}px`;
          shopAppElement.style.width = '100%';
          shopAppElement.style.position = 'fixed';
        }

        /** Force hide facebook customer chat when open modal */
        const fbRootElement: any = document.getElementById('fb-root');
        if (!!fbRootElement) fbRootElement.style.display = 'none';
      } catch (e) {}
    } else {
      try {
        const shopAppElement: any = document.getElementById('shop-app');
        if (!!shopAppElement) {
          const scrollYPages = Math.abs(parseInt(shopAppElement.style.top));
          shopAppElement.setAttribute('style', '');
          scrollElement({ x: 0, y: scrollYPages });
        }

        /** Force hide facebook customer chat when open modal */
        const fbRootElement: any = document.getElementById('fb-root');
        if (!!fbRootElement) fbRootElement.style.display = 'block';
      } catch (e) {}
    }

    return dispatch({
      type: CART_ACTION_TYPE.SHOW_HIDE_CART_SUMMARY,
      payload: { isVisible: state },
      group: REDUCER_GROUP.CART
    });
  };

/** Get cart list */
export const getCartAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.GET_CART,
    payload: { promise: CART_API_PATH.getCart().then((res) => res) },
    group: REDUCER_GROUP.CART
  });

interface AddItemToCartActionParams {
  box: ProductBox;
  /**
   * @deprecated Use `box.id` instead
   * @todo Investigate for any regression before removal
   */
  boxId: number | string;
  quantity?: number;
  displayCartSumary?: boolean;
  purchaseType?: PurchaseTypeType;
  trackingCode?: string;
  utmId?: string;
  trackingSource?: ViewedSourceType;
  trackingSourceId?: string | number;
  onSuccess?: () => void;
  onReject?: () => void;
}
export const addItemToCartAction = ({
  box,
  boxId,
  quantity = 1,
  displayCartSumary = false,
  purchaseType = PURCHASE_TYPE.NORMAL,
  trackingCode = '',
  utmId = '',
  trackingSource = '',
  trackingSourceId = '',
  onSuccess,
  onReject
}: AddItemToCartActionParams) => {
  const state = store.getState();
  const trackingState = state && (state as any).tracking;
  const productTracking = trackingState ? trackingState.productTracking : [];

  const cartState = state && (state as any).cart;
  const { cartList } = cartState;

  const isExistNormalProduct = cartList.some((product) => product.purchase_type === PURCHASE_TYPE.NORMAL);
  if (!isExistNormalProduct && purchaseType === PURCHASE_TYPE.REDEEM) {
    return (dispatch, getState) => {
      dispatch({
        type: ALERT_ACTION_TYPE.OPEN_ALERT,
        payload: Object.assign(
          {},
          ALERT_GENERAL_ERROR({
            content: 'Giỏ hàng của bạn đang trống. Hãy mua ít nhất 1 sản phẩm để tiếp tục đổi quà từ Lixicoin'
          }),
          { id: new Date().getTime() }
        ),
        group: REDUCER_GROUP.ALERT
      });

      dispatch({
        type: CART_ACTION_TYPE.SIMULATE_ADD_TO_CART_ACTION,
        payload: {
          isAddCartFail: false,
          isAddCartSuccess: false,
          isAddCartLoading: true
        },
        group: REDUCER_GROUP.CART
      });

      setTimeout(() => {
        dispatch({
          type: CART_ACTION_TYPE.SIMULATE_ADD_TO_CART_ACTION,
          payload: {
            isAddCartFail: true,
            isAddCartSuccess: false,
            isAddCartLoading: false
          },
          group: REDUCER_GROUP.CART
        });
      }, 500);

      return;
    };
  }

  if (purchaseType === PURCHASE_TYPE.NORMAL && 0 < productTracking.length) {
    const product = productTracking.filter((item) => item.slug === boxId || item.boxId === boxId);
    trackingCode = 0 !== product.length ? product[0].trackingCode : '';
  }

  let isRemoveTracking = false;
  if ((typeof utmId === 'undefined' || utmId === null || utmId === '') && trackingState) {
    const utmExpiredTime = !isUndefined(trackingState.utmExpiredTime) ? parseInt(trackingState.utmExpiredTime) : 0;

    const date = new Date();

    if (date.getTime() <= utmExpiredTime && !isUndefined(trackingState.utmId)) {
      utmId = trackingState.utmId;
    } else {
      isRemoveTracking = utmExpiredTime !== 0;
    }
  }

  return (dispatch, getState) =>
    dispatch({
      type: CART_ACTION_TYPE.ADD_TO_CART,
      payload: {
        promise: CART_API_PATH.addToCart({
          boxId,
          quantity,
          purchaseType,
          trackingCode,
          utmId
        }).then((res) => res)
      },
      meta: {
        box,
        boxId,
        quantity,
        displayCartSumary,
        purchaseType,
        isRemoveTracking,
        trackingSource,
        trackingSourceId
      },
      group: REDUCER_GROUP.CART,
      onSuccess,
      onReject
    });
};

export const clearNewItemAction = (idNewItem) => {
  return (dispatch) =>
    dispatch({ type: CART_ACTION_TYPE.CLEAR_NEW_ITEM_CURRENTLY, payload: { idNewItem }, group: REDUCER_GROUP.CART });
};

export interface removeItemFromCartActionParams {
  cartItem: CartItem;
  box: ProductBox;
  boxId: number;
  quantity?: number;
  purchaseType?: number;
}
export const removeItemFromCartAction = ({
  cartItem,
  box,
  boxId,
  quantity = 1,
  purchaseType = 0
}: removeItemFromCartActionParams) => {
  gatewayTrackRemoveFromCart({ cartItem, quantity });

  return (dispatch, getState) =>
    dispatch({
      type: CART_ACTION_TYPE.REMOVE_FROM_CART,
      payload: {
        promise: CART_API_PATH.removeFromCart({
          boxId,
          quantity,
          purchaseType
        }).then((res) => res)
      },
      meta: { box, boxId, quantity, purchaseType },
      group: REDUCER_GROUP.CART
    });
};

/**
 * Add discount code
 *
 * @param {string} discountCode ex: EMPLOYEE123
 */
export const addDiscountCodeAction =
  ({ discountCode, isOpenCartSummary, whereAdded = null }, showErrorAsSystemNotification = false) =>
  (dispatch, getState) => {
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR,
      label: `${GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR.ADD_CODE}${
        !!whereAdded ? ' : ' + whereAdded : ''
      }`,
      value: 1
    });

    return dispatch({
      type: CART_ACTION_TYPE.ADD_DISCOUNT_CODE,
      payload: {
        promise: CART_API_PATH.addDiscountCode({ discountCode }).then((res) => res)
      },
      meta: {
        isOpenCartSummary,
        discountCode,
        showErrorAsSystemNotification
      },
      group: REDUCER_GROUP.CART
    });
  };

export const fetchOrderBoxCategoryAction = (productId) => (dispatch, getState) => {
  return dispatch({
    type: CART_ACTION_TYPE.FETCH_ORDER_BOX_CATEGORY,
    payload: {
      promise: SHOP_API_PATH.fetchBoxesCategories({ productId }).then((res) => res)
    },
    meta: { productId },
    group: REDUCER_GROUP.CART
  });
};

export const fetchCartInvoiceAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.INVOICE_FETCH,
    payload: {
      promise: CART_API_PATH.fetchCartInvoice().then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export const fetchRecentInvoiceAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.INVOICE_FETCH_RECENT,
    payload: {
      promise: CART_API_PATH.fetchRecentInvoice().then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export const updateInvoiceAction = (invoice) => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.INVOICE_UPDATE,
    payload: {
      promise: CART_API_PATH.updateInvoice(invoice).then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export const deleteInvoiceAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.INVOICE_DELETE,
    payload: {
      promise: CART_API_PATH.deleteInvoice().then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export const fetchTaxCodeDetail = (taxCode) => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.TAX_CODE_FETCH_DETAIL,
    payload: {
      promise: CART_API_PATH.fetchTaxCodeDetail(taxCode).then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

/**
 * Remove discount code
 */
export const removeDiscountCodeAction = () => (dispatch, getState) => {
  gaEventTracking({
    category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
    action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR.REMOVE_CODE,
    value: 1
  });

  return dispatch({
    type: CART_ACTION_TYPE.REMOVE_DISCOUNT_CODE,
    payload: { promise: CART_API_PATH.removeDiscountCode().then((res) => res) },
    meta: {},
    group: REDUCER_GROUP.CART
  });
};

/**
 * Fetch add on list
 *
 * @param {number} limit ex : 12
 */
export const fetchAddOnListAction =
  ({ limit }) =>
  (dispatch, getState) =>
    dispatch({
      type: CART_ACTION_TYPE.FETCH_ADD_ON_LIST,
      payload: {
        promise: CART_API_PATH.fetchAddOnList({ limit }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.CART
    });

export const removeItemFromAddonList = (id) => ({
  type: CART_ACTION_TYPE.REMOVE_ITEM_FROM_ADD_ON_LIST,
  payload: { id },
  group: REDUCER_GROUP.CART
});

/**
 * Delivery Choose Address Action
 *
 * @param {number} addressId
 */
export const deliveryChooseAddressAction = ({ addressId = 0 }) => ({
  type: CART_ACTION_TYPE.CHECKOUT_DELIVERY_CHOOSE_ADDRESS,
  payload: { addressId },
  group: REDUCER_GROUP.CART
});

/**
 * Delivery add address for guest
 *
 * @param {object} deliveryGuestAddress
 */
export const deliveryGuestAddressAction = (deliveryGuestAddress = {}) => ({
  type: CART_ACTION_TYPE.CHECKOUT_DELIVERY_GUEST_ADDRESS,
  payload: { deliveryGuestAddress },
  group: REDUCER_GROUP.CART
});

/**
 * Delivery add address for guest
 *
 * @param {object} deliveryGuestAddress
 */
export const deliveryUserPickupStoreAddressAction = (deliveryUserPickupStoreAddress = {}) => ({
  type: CART_ACTION_TYPE.CHECKOUT_DELIVERY_USER_PICKUP_STORE_ADDRESS,
  payload: { deliveryUserPickupStoreAddress },
  group: REDUCER_GROUP.CART
});

/**
 * Delivery Set Gift Message for order
 *
 * @param {string} giftMessage
 */
export const deliverySetGiftMessage = ({ giftMessage = '' }) => ({
  type: CART_ACTION_TYPE.CHECKOUT_DELIVERY_SET_GIFT_MESSAGE,
  payload: { giftMessage },
  group: REDUCER_GROUP.CART
});

/**
 * Delivery Set Note Message for order
 *
 * @param {string} noteMessage
 */
export const deliverySetNoteMessage = ({ noteMessage = '' }) => ({
  type: CART_ACTION_TYPE.CHECKOUT_DELIVERY_SET_NOTE_MESSAGE,
  payload: { noteMessage },
  group: REDUCER_GROUP.CART
});

/**
 * Delivery Set delivery method for order
 *
 * @param {string} deliveryMethod
 */
export const deliverySetDeliveryMethod = ({ deliveryMethod = SHIPPING_TYPE.STANDARD }) => ({
  type: CART_ACTION_TYPE.CHECKOUT_DELIVERY_SET_DELIVERY_METHOD,
  payload: { deliveryMethod },
  group: REDUCER_GROUP.CART
});

/**
 * Clear delivery address
 *
 */
export const clearDeliveryConfigAction = (deliveryGuestAddress = {}) => ({
  type: CART_ACTION_TYPE.CHECKOUT_CLEAR_DELIVERY_CONFIG,
  payload: {},
  group: REDUCER_GROUP.CART
});

/**
 * Checkout
 *
 * @param {boolean} saveNewAddress ex: true | false
 * @param {number} addressId ex: 1234
 * @param {boolean} isGift ex: true | false
 * @param {string} giftMessage ex: Luckly for you
 * @param {string} note ex: Good product
 */
export const checkoutAction = ({
  saveNewAddress,
  addressId,
  firstName = '',
  lastName = '',
  phone = '',
  address = '',
  provinceId = '',
  districtId = '',
  wardId = '',
  shippingPackage = SHIPPING_TYPE.STANDARD,
  isGift,
  giftMessage,
  email = '',
  note
}) => {
  const state = store.getState();
  const cartState = state && (state as any).cart;

  if (cartState.isFetchingCheckout) {
    return {
      type: CART_ACTION_TYPE.PREVENT_ACTION,
      payload: {},
      group: REDUCER_GROUP.CART
    };
  }

  return {
    type: CART_ACTION_TYPE.CHECKOUT,
    payload: {
      promise: CART_API_PATH.checkout({
        saveNewAddress,
        addressId,
        firstName,
        lastName,
        phone,
        address,
        provinceId,
        districtId,
        wardId,
        shippingPackage,
        isGift,
        giftMessage,
        email,
        note
      }).then((res) => res)
    },
    group: REDUCER_GROUP.CART
  };
};

/**
 * Payment
 *
 * @param {number} paymentMethod ex: 1
 */
export const paymentAction = ({ paymentMethod }) => ({
  type: CART_ACTION_TYPE.PAYMENT,
  payload: {
    promise: CART_API_PATH.payment({ paymentMethod }).then((res) => res)
  },
  group: REDUCER_GROUP.CART
});

export type ToggleApplyBalanceStatusActionProps = CART_API_PATH.ToggleApplyBalanceStatusApiProps;
export const toggleApplyBalanceStatusAction = ({ enabled }) => ({
  type: CART_ACTION_TYPE.TOGGLE_APPLY_BALANCE_STATUS,
  payload: { promise: CART_API_PATH.toggleApplyBalanceStatusApi({ enabled }).then((res) => res) },
  group: REDUCER_GROUP.CART,
  meta: { enabled }
});

/**
 * Clear cart
 */
export const clearCartAction = () => ({
  type: CART_ACTION_TYPE.CLEAR_CART,
  payload: {},
  group: REDUCER_GROUP.CART
});

/** Get cart gift list */
export const getCartGiftAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.GET_CART_GIFT,
    payload: { promise: CART_API_PATH.getCartGift().then((res) => res) },
    group: REDUCER_GROUP.CART
  });

export const selectGiftAction = ({ discountCodeGiftId }) => ({
  type: CART_ACTION_TYPE.SELECT_GIFT,
  payload: {
    promise: CART_API_PATH.selectGift({ discountCodeGiftId }).then((res) => res)
  },
  group: REDUCER_GROUP.CART
});

export const selectSpecialAddOnAction = ({ discountCodeAddOnId }) => ({
  type: CART_ACTION_TYPE.SELECT_SPECIAL_ADD_ON,
  payload: {
    promise: CART_API_PATH.selectSpecialAddOn({ discountCodeAddOnId }).then((res) => res)
  },
  group: REDUCER_GROUP.CART
});

export const fetchCartRedeemBoxesAction = ({ page, perPage }) => ({
  type: CART_ACTION_TYPE.FETCH_CART_REDEEM_BOXES,
  payload: {
    promise: CART_API_PATH.fetchCartRedeemBoxes({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.CART
});

export const fetchCartRedeemSpecialBoxesAction = ({ page, perPage }) => ({
  type: CART_ACTION_TYPE.FETCH_CART_REDEEM_SPECIAL_BOXES,
  payload: {
    promise: CART_API_PATH.fetchCartRedeemSpecialBoxes({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.CART
});

export const fetchCartRedeemUserBoxesAction = ({ page, perPage }) => ({
  type: CART_ACTION_TYPE.FETCH_CART_REDEEM_USER_BOXES,
  payload: {
    promise: CART_API_PATH.fetchCartRedeemUserBoxes({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.CART
});

export const fetchCartRedeemLatestBoxesAction = ({ page, perPage }) => ({
  type: CART_ACTION_TYPE.FETCH_CART_REDEEM_LATEST_BOXES,
  payload: {
    promise: CART_API_PATH.fetchCartRedeemLatestBoxes({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.CART
});

/**
 * Payment success
 *
 * @param {string} resultParams
 */
export const paymentSuccessAction = ({ resultParams }) => ({
  type: CART_ACTION_TYPE.PAYMENT_SUCCESS,
  payload: {
    promise: CART_API_PATH.paymentSuccess({ resultParams }).then((res) => res)
  },
  group: REDUCER_GROUP.CART
});

export const fetchBoxesToFreeshipAction = () => ({
  type: CART_ACTION_TYPE.FETCH_BOXES_TO_FREESHIP,
  payload: {
    promise: CART_API_PATH.fetchBoxesToFreeship().then((res) => res)
  },
  group: REDUCER_GROUP.CART
});

export const fetchConstantsAction = () => ({
  type: CART_ACTION_TYPE.FETCH_CONSTANTS,
  payload: { promise: CART_API_PATH.fetchConstants().then((res) => res) },
  group: REDUCER_GROUP.CART
});

// TODO: Obsolete. Replace implementations with `state.cart.cartDetail.constants.enabled_same_day_shipping`
export const checkSameDayShippingAction = ({ districtId }) => ({
  type: CART_ACTION_TYPE.CHECK_SAME_DAY_SHIPPING,
  payload: {
    promise: CART_API_PATH.checkSameDayShipping({ districtId }).then((res) => res)
  },
  group: REDUCER_GROUP.CART
});

export const fetchSuggestionDiscountCodesAction = () => ({
  type: CART_ACTION_TYPE.FETCH_SUGGESTION_DISCOUNT_CODES,
  payload: {
    promise: CART_API_PATH.fetchSuggestionDiscountCodes().then((res) => res)
  },
  group: REDUCER_GROUP.CART
});

/**
 * Checkout
 *
 * @param {number} addressId ex: 1
 * @param {string} firstName ex: Vulee
 * @param {string} lastName ex: Smith
 * @param {string} phone ex: 0901234567
 * @param {number} warehouseId ex: 1
 */
export const checkoutAddressAction = ({ warehouseId, addressId, firstName, lastName, phone }) => {
  const state = store.getState();
  const cartState = state && (state as any).cart;

  if (cartState.isFetchingCheckoutAddress) {
    return {
      type: CART_ACTION_TYPE.PREVENT_ACTION,
      payload: {},
      group: REDUCER_GROUP.CART
    };
  }

  return {
    type: CART_ACTION_TYPE.CHECKOUT_ADDRESS,
    payload: {
      promise: CART_API_PATH.checkoutAddress({
        addressId,
        firstName,
        lastName,
        phone,
        warehouseId
      }).then((res) => res)
    },
    group: REDUCER_GROUP.CART
  };
};

export const fetchStoresAction = () => ({
  type: CART_ACTION_TYPE.FETCH_STORES,
  payload: { promise: CART_API_PATH.fetchStores().then((res) => res) },
  group: REDUCER_GROUP.CART
});

export const fetchSampleBoxesAction = () => ({
  type: CART_ACTION_TYPE.FETCH_SAMPLE_BOXES,
  payload: { promise: CART_API_PATH.fetchSampleBoxes().then((res) => res) },
  group: REDUCER_GROUP.CART
});

export type FetchCartDiscountCodesActionParams = CART_API_PATH.FetchCartDiscountCodesApiParams;
export const fetchCartDiscountCodesAction = ({ page, perPage }: FetchCartDiscountCodesActionParams) => ({
  type: CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODES,
  payload: {
    promise: CART_API_PATH.fetchCartDiscountCodesApi({ page, perPage }).then((res) => res)
  },
  meta: { page, perPage },
  group: REDUCER_GROUP.CART
});

export type FetchCartDiscountCodeActionParams = CART_API_PATH.FetchCartDiscountCodeApiParams;
export const fetchCartDiscountCodeAction = ({ discountCode }: FetchCartDiscountCodeActionParams) => ({
  type: CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODE,
  payload: {
    promise: CART_API_PATH.fetchCartDiscountCodeApi({ discountCode }).then((res) => res)
  },
  meta: { code: discountCode },
  group: REDUCER_GROUP.CART
});

export const changePaymentToCODAction = ({ orderId }) => ({
  type: CART_ACTION_TYPE.CHANGE_PAYMENT_TO_COD,
  payload: { promise: CART_API_PATH.changePaymentToCOD({ orderId }).then((res) => res) },
  meta: { orderId },
  group: REDUCER_GROUP.CART
});

export const setPrimaryAddressAction = ({ addressId, fetchAddressesOnSuccess = false }) => ({
  type: CART_ACTION_TYPE.SET_PRIMARY_ADDRESS,
  payload: { promise: CART_API_PATH.setPrimaryAddress({ addressId }).then((res) => res) },
  meta: { fetchAddressesOnSuccess },
  group: REDUCER_GROUP.CART
});

interface IGetMomoPaymentAddressUrlAction {
  orderNumber: string;
}

export const getMomoPaymentAddressUrlAction = ({ orderNumber }: IGetMomoPaymentAddressUrlAction) => ({
  type: CART_ACTION_TYPE.GET_MOMO_PAYMENT_ADDRESS_URL,
  payload: { promise: CART_API_PATH.getMomoPaymentAddressUrl({ orderNumber }).then((res) => res) },
  group: REDUCER_GROUP.CART
});

interface IGetOnepayPaymentAddressUrl {
  orderNumber: string;
}

export const getOnepayPaymentAddressUrlAction = ({ orderNumber }: IGetOnepayPaymentAddressUrl) => ({
  type: CART_ACTION_TYPE.GET_ONEPAY_PAYMENT_ADDRESS_URL,
  payload: { promise: CART_API_PATH.getOnepayPaymentAddressUrl({ orderNumber }).then((res) => res) },
  group: REDUCER_GROUP.CART
});

interface IUpdateOnepayPayment {
  orderNumber: string;
  params: string;
}

export const updateOnepayPayment = ({ orderNumber, params }: IUpdateOnepayPayment) => ({
  type: CART_ACTION_TYPE.UPDATE_ONEPAY_PAYMENT,
  payload: { promise: CART_API_PATH.updateOnepayPayment({ orderNumber, params }).then((res) => res) },
  group: REDUCER_GROUP.CART
});

export const clearPasswordOtpStatusAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.CLEAR_PASSWORD_OTP_STATUS,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.CART
  });

export const toggleDiscountCodeGiftModalVisibilityAction = (visibility: boolean) => ({
  type: CART_ACTION_TYPE.TOGGLE_DISCOUNT_CODE_GIFT_MODAL_VISIBILITY,
  payload: { visibility },
  group: REDUCER_GROUP.CART
});

export const toggleDiscountCodeAddonModalVisibilityAction = (visibility: boolean) => ({
  type: CART_ACTION_TYPE.TOGGLE_DISCOUNT_CODE_ADDON_MODAL_VISIBILITY,
  payload: { visibility },
  group: REDUCER_GROUP.CART
});

export const setCheckoutPhaseReadiness = ({ phase, step, readiness }) => ({
  type: CART_ACTION_TYPE.SET_CHECKOUT_PHASE_READINESS,
  payload: { phase, step, readiness },
  group: REDUCER_GROUP.CART
});

export const resetCheckoutPhaseReadiness = ({ phase }) => ({
  type: CART_ACTION_TYPE.RESET_CHECKOUT_PHASE_READINESS,
  payload: { phase },
  group: REDUCER_GROUP.CART
});

export interface UpdateRepresentablePromotionsActionParams {
  representablePromotions: Array<RepresentablePromotion>;
}
export const updateRepresentablePromotionsAction = ({
  representablePromotions
}: UpdateRepresentablePromotionsActionParams) => ({
  type: CART_ACTION_TYPE.UPDATE_REPRESENTABLE_PROMOTIONS,
  payload: { representablePromotions },
  group: REDUCER_GROUP.CART
});

export interface UpdateAuthModalStateActionParams {
  isAuthModalOpen?: boolean;
  authModalInitialView?: string;
}
export const updateAuthModalStateAction = (payload: UpdateAuthModalStateActionParams) => ({
  type: CART_ACTION_TYPE.UPDATE_AUTH_MODAL_STATE,
  payload,
  group: REDUCER_GROUP.CART
});

export interface UpdatePromotionsViewCountSinceCheckoutMountedActionParams {
  count: number;
}
export const updatePromotionsViewCountSinceCheckoutMountedAction = (
  payload: UpdatePromotionsViewCountSinceCheckoutMountedActionParams
) => ({
  type: CART_ACTION_TYPE.UPDATE_PROMOTIONS_VIEW_COUNT,
  payload,
  group: REDUCER_GROUP.CART
});

export interface SetPromotionsPopupVisibilityActionParams {
  visibility: boolean;
}
export const setPromotionsPopupVisibilityAction = ({ visibility }: SetPromotionsPopupVisibilityActionParams) => ({
  type: CART_ACTION_TYPE.SET_PROMOTIONS_POPUP_VISIBILITY,
  payload: { visibility },
  group: REDUCER_GROUP.CART
});

export const updateContactPhoneAction = (phoneNumber: string) => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.CONTACT_PHONE_UPDATE,
    payload: {
      promise: CART_API_PATH.updateContactPhone({ number: phoneNumber }).then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export const fetchAccompanyServicesAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.ACCOMPANY_SERVICES_FETCH,
    payload: { promise: CART_API_PATH.fetchAccompanyServices().then((res) => res) },
    group: REDUCER_GROUP.CART
  });

export const updateAccompanyServicesAction = (data: Array<any>) => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.ACCOMPANY_SERVICES_UPDATE,
    payload: {
      promise: CART_API_PATH.updateAccompanyServices(data).then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export const deleteAccompanyServiceAction = (id: number) => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.ACCOMPANY_SERVICE_DELETE,
    payload: {
      promise: CART_API_PATH.deleteAccompanyService({ id }).then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export const setAccompaniesLocalAction = () => ({
  type: CART_ACTION_TYPE.SET_ACCOMPANIES_LOCAL,
  payload: {},
  group: REDUCER_GROUP.CART
});

export const touchAccompaniesLocalAction = () => ({
  type: CART_ACTION_TYPE.TOUCH_ACCOMPANIES_LOCAL,
  payload: {},
  group: REDUCER_GROUP.CART
});

export const selectAccompaniesLocalOptionAction = (data: { serviceId; optionId }) => ({
  type: CART_ACTION_TYPE.SELECT_ACCOMPANIES_LOCAL_OPTION,
  payload: data,
  group: REDUCER_GROUP.CART
});

export const updateAccompaniesLocalNoteAction = (data: { serviceId: number; note: string; isValid: boolean }) => ({
  type: CART_ACTION_TYPE.UPDATE_ACCOMPANIES_LOCAL_NOTE,
  payload: data,
  group: REDUCER_GROUP.CART
});

export const toggleSelectedAccompaniesLocalAction = (data: { serviceId: number; action: 'add' | 'remove' }) => ({
  type: CART_ACTION_TYPE.TOGGLE_SELECTED_ACCOMPANIES_LOCAL,
  payload: data,
  group: REDUCER_GROUP.CART
});

export const setPaymentHighlightErrorBlockAction = (data: { blockId: string }) => ({
  type: CART_ACTION_TYPE.SET_PAYMENT_HIGHLIGHT_ERROR_BLOCK,
  payload: data,
  group: REDUCER_GROUP.CART
});

export const resetPaymentHighlightErrorBlockAction = () => ({
  type: CART_ACTION_TYPE.RESET_PAYMENT_HIGHLIGHT_ERROR_BLOCK,
  payload: {},
  group: REDUCER_GROUP.CART
});

interface UpdatePaymentMethodAction {
  paymentMethodId: number;
  enableFallbackAlert: boolean;
}
export const updatePaymentMethodAction =
  ({ paymentMethodId, enableFallbackAlert = false }: UpdatePaymentMethodAction) =>
  (dispatch, getState) =>
    dispatch({
      type: CART_ACTION_TYPE.UPDATE_PAYMENT_METHOD,
      payload: {
        promise: CART_API_PATH.updatePaymentMethod({ paymentMethodId }).then((res) => res)
      },
      group: REDUCER_GROUP.CART,
      meta: { paymentMethodId, enableFallbackAlert }
    });

export const getCartReferralSchemesAction = () => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.GET_CART_REFERRAL_SCHEMES,
    payload: {
      promise: CART_API_PATH.getCartReferralSchemesApi().then((res) => res)
    },
    group: REDUCER_GROUP.CART
  });

export type ApplyCartReferralSchemeActionParams = CART_API_PATH.ApplyCartReferralSchemeApiParams & {
  skipSuccessAlert?: boolean;
};
export const applyCartReferralSchemeAction = (params: ApplyCartReferralSchemeActionParams) => (dispatch, getState) =>
  dispatch({
    type: CART_ACTION_TYPE.APPLY_CART_REFERRAL_SCHEME,
    payload: {
      promise: CART_API_PATH.applyCartReferralSchemeApi(params).then((res) => res)
    },
    meta: params,
    group: REDUCER_GROUP.CART
  });

export const updateVariantQuantityAction = (quantity: number) => ({
  type: CART_ACTION_TYPE.UPDATE_VARIANT_QUANTITY,
  payload: { quantity },
  group: REDUCER_GROUP.CART
});
