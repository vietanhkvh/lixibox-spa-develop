import { REDUCER_GROUP } from '../reducer.group';
import * as CART_ACTION_TYPE from './type';

import {
  showHideCartSumaryLayoutAction,
  fetchSuggestionDiscountCodesAction,
  fetchRecentInvoiceAction
} from '../cart/action';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { openModalAction, closeModalAction } from '../modal/action';
import { fetchUserAddressListAction } from '../address/action';
import { removeUtmIdTrackingAction } from '../tracking/action';
import { updateOrderAction } from '../order/action';
import { openAlertAction } from '../alert/action';
import { pushErrorAction } from '../error/action';

import { isExistError, formatErrorMessage } from '../../utils/exception';
import { isEmptyKeyObject } from '../../utils/validate';

import { PURCHASE_TYPE } from '../../constants/application/purchase';
import { SHIPPING_TYPE } from '../../constants/application/shipping';
import { PAYMENT_METHOD_TYPE } from '../../constants/application/payment';
import { MOBILE_ALERT_ADD_TO_CART_SUCCESS, MODAL_CHECKOUT_SUCCESS } from '../../constants/application/modal';
import {
  ALERT_GENERAL_ERROR,
  ALERT_GENERAL_SUCCESS,
  MESSAGE_ADD_CART_SUCCESS
} from '../../constants/application/alert';
import { storageKey } from '../../constants/application/client-storage';
import { generateCategoryHirarchy } from '../../container/app-shop/product/detail/utils';

import { ROUTING_CHECK_OUT_SUCCESS, ROUTING_CHECK_OUT_PAYMENT, ROUTING_CHECK_OUT } from '../../routings/path';
import { Cart, CartItem } from '../../types/api/cart';
import { CartState } from './types';
import { isMobileDevice, isMobileVersion } from 'utils/responsive';
import { parseObject } from 'utils/string';
import { gatewayTrackAddToCart } from 'tracking/gateway';
import { AUTH_VIEW } from 'components/auth-modal-block/desktop/constant';
import { ProductBox } from 'types/api/shop';

export const INITIAL_STATE_CART: CartState = {
  accompanies: {
    available: {
      index: [],
      fetching: false,
      loaded: false,
      errored: false
    },
    local: [],
    edited: false,
    update: {
      updating: false,
      errored: false
    }
  },
  paidCartId: 0,
  cartDetail: {
    id: 0
  } as Cart,
  constants: {
    bank_account: { bank: '', owner: '', number: '' },
    cart_limit_max_item: 100,
    cart_limit_min_item: 1,
    enabled_onepay: true,
    enabled_same_day_shipping: false,
    enabled_sample: false,
    enabled_user_pickup_shipping_package: true,
    facebook_auth_scope: 'email,user_birthday',
    games: { redeem_coins: 100, play_times_per_day_limit: 3 },
    gift_message_words_limit: 75,
    moengage_tracking_enabled: false,
    phone: '',
    problem_report_url: '',
    referral: {
      minimum_order_price: 400000,
      referrer: {
        balance: 0,
        coins: 200
      },
      referred: {
        gift_message: '4 Lixibox Mask'
      }
    },
    threshold_to_cod: 200000,
    threshold_to_free_gift_packing: 800000,
    threshold_to_freeship: 199000,
    threshold_to_pick_sample: 1000000,
    mobile_referral: {
      gift_name: null,
      gift_message: '',
      reward: 0,
      minimum_order_price: 0
    },
    mobile_referrer: {
      balance: 0,
      coins: 0
    },
    box_feedback_lixicoin: 0
  },
  invoice: {
    info: {
      name: '',
      email: '',
      address: '',
      code: ''
    },
    fetching: false,
    updating: false,
    deleting: false,
    loaded: false,
    errored: false
  },
  orderInfo: {},
  orderBoxCategories: {},
  taxCode: {
    index: [],
    adding: false,
    loaded: false,
    errored: false
  },
  stores: [],
  cartList: [],
  addOnList: [],
  cartRedeemList: [],
  // Move into shopReducer
  redeemable: {
    special: {
      index: [],
      fetching: false,
      loaded: false,
      errored: false
    },
    user: {
      index: [],
      fetching: false,
      loaded: false,
      errored: false
    },
    latest: {
      index: [],
      fetching: false,
      loaded: false,
      errored: false
    }
  },
  paymentMethodUpdate: {
    // TODO: Consider using middleware
    updating: false,
    updated: false,
    errored: false
  },
  cartGiftList: [],
  specialAddOns: [],
  cartSampleList: [],
  boxesToFreeship: [],
  suggestionDiscountCodes: [],
  excludedBoxIds: [],
  addDiscountCode: {
    code: '',
    status: false,
    loading: false
  },
  removeDiscountCode: {
    status: false,
    loading: false
  },

  deliveryConfig: {
    addressId: 0,
    giftMessage: '',
    noteMessage: '',
    shippingPackage: SHIPPING_TYPE.STANDARD,
    deliveryGuestAddress: {},
    deliveryUserPickupStoreAddress: {}
  },

  payment: {
    // TODO: Remove. Unused (`.payment`)
    method: PAYMENT_METHOD_TYPE.COD.id
  },
  paymentHighlightErrorBlock: '',
  phaseReadiness: {
    payment: {
      address: false,
      deliveryNote: true,
      giftMessage: true,
      invoice: true,
      paymentMethod: true
    }
  },
  // `state.cart.referralSchemes` contains additional attributes `conditions` and `is_selected`, which is unavailable
  // on `state.referral.*`
  referralSchemes: {
    index: [],
    fetching: false,
    loaded: false,
    errored: false
  },
  applyReferralScheme: {
    lastId: { code: '', schemeId: null },
    applying: false,
    applied: false,
    errored: false
  },
  toggleApplyBalanceStatus: {
    processing: false,
    processed: false,
    errored: false
  },
  cartDiscountCodes: {
    index: [],
    fetching: false,
    loaded: false,
    errored: false
  },
  cartDiscountCode: {
    discountCode: null,
    lastId: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  addToCart: {
    lastCartItemId: null,
    lastBoxId: null,
    processing: false,
    processed: false,
    errored: false
  },
  removeFromCart: {
    lastCartItemId: null,
    lastBoxId: null,
    processing: false,
    processed: false,
    errored: false
  },

  momoPaymentAddreessUrl: '',
  onepayPaymentAddreessUrl: '',
  redirectUrl: '',
  paymentStatus: '',
  representablePromotions: [],
  authModalState: {
    isAuthModalOpen: false,
    authModalInitialView: AUTH_VIEW.CHECKOUT_FAST_TRACK
  },
  promotionsViewCountSinceCheckoutMounted: 0,
  promotionsPopupVisibility: false,

  isCartSummaryVisible: false,
  isFetchingCheckout: false,
  checkoutSuccess: false,
  paymentSuccess: false,
  isSelectedGiftCart: false,
  isGetCartList: false,
  isGetCartListSuccess: false,
  isGetCartGiftListSuccess: false,
  isGetCartSampleListSuccess: false,
  isAddCartLoading: false,
  isAddCartFail: false,
  isCheckoutFail: false,
  isAddCartSuccess: false,
  isRemoveCartLoading: false,
  isRemoveCartSuccess: false,
  isPaymentFail: false,
  isCheckSameDayShipping: false,
  canApplySameDayShipping: false,
  isUpdateOnepayPayment: false,
  suggestionDiscountCodesFetching: false,
  suggestionDiscountCodesLoaded: false,
  suggestionDiscountCodesErrored: false,
  isCheckoutAddressSuccess: false,
  isFetchingCheckoutAddress: false,
  isCheckoutDeliveryMethodSuccess: false,
  isFetchingConfig: false,
  isGetConstantSuccess: false,
  isFetchingMomoPaymentAddreessUrl: false,
  isFetchingMomoPaymentAddreessUrlSuccess: false,
  isFetchingOnepayPaymentAddreessUrl: false,
  isFetchingOnepayPaymentAddreessUrlSuccess: false,
  isUpdatingOnepayPaymentAddreessUrl: false,
  isUpdatingOnepayPaymentAddreessUrlSuccess: false,
  isDiscountCodeGiftModalOpen: false,
  isDiscountCodeAddonModalOpen: false,
  isPrimaryAddressSetSuccess: false,
  popupSetPasswordType: '',
  updatedVariantQuantity: 0
};

const reCalculateQuantity = (cartList: Array<any>, boxId: number, quantity: number, purchaseType) => {
  let newCartList: Array<any> = [];

  Array.isArray(cartList) &&
    cartList.forEach((item) => {
      if (boxId === item.box.id && item.purchase_type === purchaseType) {
        /** Lock edit when calling api */
        item.editable = false;

        /** Increase / descrease*/
        item.quantity = item.quantity + quantity;
      }

      newCartList = [...newCartList, item];
    });

  return newCartList;
};

const mapAccompanySelections = (services, selections) => {
  return services.map((service) => {
    const selection = selections.find((selection) => selection.linked_object.id === service.id);
    let selectionOptionId = selection && selection.external && selection.external.id;
    if (typeof selectionOptionId !== 'number' && service.options && service.options.length) {
      // pre select
      selectionOptionId = service.options[0].id;
    }

    if (selection) {
      const validity = service.required_note ? !!selection.note : true;

      return {
        serviceId: selection.linked_object.id,
        optionId: selectionOptionId,
        selected: true,
        fee: selection.fee,
        note: selection.note || '',
        isValid: validity
      };
    }

    return {
      serviceId: service.id,
      optionId: selectionOptionId,
      selected: false,
      fee: 0,
      note: '',
      isValid: true
    };
  });
};

function cartReducer(
  state = INITIAL_STATE_CART,
  action = {
    type: '',
    payload: {
      isAddCartFail: false,
      isAddCartSuccess: false,
      isAddCartLoading: false,
      isVisible: false,
      user: null,
      cart: { cart_items: [], can_select_add_on: false },
      order: {
        order_boxes: [],
        total_price: {}
      },
      guest_user: {
        email: '',
        phone: ''
      },
      paymentId: {},
      deliveryGuestAddress: {},
      deliveryUserPickupStoreAddress: {},
      errors: [],
      addons: [],
      redeems: [],
      gifts: [],
      special_add_ons: [],
      boxes: [],
      discount_codes: [],
      discount_code: null,
      stores: [],
      success: false,
      can_apply_same_day_shipping: false,
      addressId: 0,
      giftMessage: '',
      noteMessage: '',
      error: '',
      message: '',
      redirect_url: '',
      payment_status: '',
      deliveryMethod: SHIPPING_TYPE.STANDARD,
      excluded_box_ids: [],
      pay_url: '',
      url: '',
      popup_type: '',
      otp_expire_in: 0,
      visibility: false,
      blockId: '',
      categories: [],
      schemes: [],
      quantity: 0,
      idNewItem: -1,
      count: 0,
      representablePromotions: []
    },
    meta: {
      box: {} as ProductBox,
      boxId: 0,
      orderId: 0,
      quantity: 0,
      code: '',
      schemeId: null,
      displayCartSumary: false,
      purchaseType: PURCHASE_TYPE.NORMAL,
      isRemoveTracking: false,
      isOpenCartSummary: false,
      showErrorAsSystemNotification: true,
      productId: '',
      enableFallbackAlert: false,
      skipSuccessAlert: false,
      trackingSource: null,
      trackingSourceId: null
    },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) {
  if (action.group !== REDUCER_GROUP.CART) {
    return state;
  }

  try {
    const payload: any = action.payload; // TODO: Provide full typescript coverage and remove
    const cartDetail = (action.payload.cart || {
      cart_items: []
    }) as Cart;
    const boxId = action.meta && action.meta.boxId;
    const quantity = action.meta && action.meta.quantity;
    const success = action.payload && action.payload.success;
    const isOpenCartSummary = action.meta && action.meta.isOpenCartSummary;
    const { cartList, deliveryConfig, constants, orderInfo, paymentStatus } = state;

    switch (action.type) {
      case PENDING_TYPE(CART_ACTION_TYPE.GET_CART):
        return Object.assign({}, state, {
          isGetCartListSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.GET_CART):
        /**
         * GET_CART_SUCCESS
         *
         * Get cart at the first load
         * Receive data & push each product into cartList
         */

        /** Loop in data list received */
        // let _cartList = cartList;
        // const cart_items: Array<any> = cartDetail.cart_items;
        // Array.isArray(cart_items)
        //   && cart_items.map(itemOrigin => {
        //     let checkExist = false;

        //     /** Loop in storaged list data */
        //     _cartList = Array.isArray(_cartList)
        //       ? _cartList.map(_itemStorage => {
        //         /** Update for old product */
        //         if (itemOrigin.box.id === _itemStorage.box.id && itemOrigin.purchase_type === _itemStorage.purchase_type) {
        //           checkExist = true;
        //           _itemStorage = itemOrigin;

        //           /** Set editable to increase / decrease quantity */
        //           _itemStorage.editable = true;
        //         };

        //         return _itemStorage;
        //       })
        //       : [];

        //     /** Add new product */
        //     if (false === checkExist) {
        //       /** Set editable to increase / decrease quantity */
        //       itemOrigin.editable = true;
        //       _cartList.push(itemOrigin);
        //     }
        //   });

        // _cartList = 0 === cartDetail.cart_items.length ? [] : _cartList.filter(itemStorage => itemStorage.quantity > 0);

        return Object.assign({}, state, {
          cartDetail,
          isGetCartListSuccess: true,
          cartList: (cartDetail && cartDetail.cart_items) || []
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.GET_CART):
        return Object.assign({}, state, {
          isGetCartListSuccess: false
        });

      case PENDING_TYPE(CART_ACTION_TYPE.ADD_TO_CART):
        /** Tracking FB Pixel */
        const UniqueTrackingAddToCart = localStorage.getItem(storageKey.UNIQUE_TRACKING_ADD_TO_CART);
        if (!UniqueTrackingAddToCart) {
          // cartList.map(item => {

          //   if (item.box.id === action.meta.boxId) {
          //   }
          // });

          localStorage.setItem(storageKey.UNIQUE_TRACKING_ADD_TO_CART, '1');
        }

        /**
         * ADD_TO_CART_PENDING
         *
         * Set editable = false when call api update cart
         */

        const cartListBeforeAddItem = parseObject(cartList);
        const cartListAfterAddItem = reCalculateQuantity(
          cartListBeforeAddItem,
          action.meta.boxId,
          quantity,
          action.meta.purchaseType
        );

        return Object.assign({}, state, {
          cartList: cartListAfterAddItem,
          isAddCartFail: false,
          isAddCartSuccess: false,
          isAddCartLoading: true,
          addToCart: {
            lastCartItemId: null,
            lastBoxId: action.meta.box?.id || action.meta.boxId,
            processing: true,
            processed: false,
            errored: false
          }
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.ADD_TO_CART):
        /**
         * ADD_TO_CART_SUCCESS
         * REMOVE_FROM_CART_SUCCESS
         *
         * Receive data and update into cart list by {meta: {BoxId}}
         */

        /** Loop in storaged list data to udpate new data */
        let newListItem: Array<any> = parseObject(!!cartDetail && cartDetail.cart_items);
        let _cartList: Array<any> = parseObject(!!cartDetail && cartDetail.cart_items);
        _cartList = Array.isArray(_cartList)
          ? _cartList.map((itemStorage: any) => {
              /**
               * Condition to update
               *
               * 1. Box id of received data match true with box id in meta data
               * 2.1. Update fail with message error
               * 2.2. Product can be editable (not waiting api)
               */
              const conditionToUpdate = action.meta.boxId === itemStorage.box.id && (!success || itemStorage.editable);

              if (conditionToUpdate) {
                /** filter received list to get by {meta: {BoxId}} */
                let cart_items: Array<CartItem> = !!cartDetail && cartDetail.cart_items;
                itemStorage = cart_items.filter(
                  (item) => boxId === item.box.id && itemStorage.purchase_type === item.purchase_type
                )[0];
              }

              newListItem = newListItem.filter(
                (item) =>
                  itemStorage.box.id !== item.box.id ||
                  (itemStorage.box.id === item.box.id && itemStorage.purchase_type !== item.purchase_type)
              );

              return itemStorage;
            })
          : [];

        if (newListItem.length) newListItem = newListItem.map((item) => Object.assign(item, { isNewItem: true }));

        /** Push new items into cart */
        let cartListNew = [..._cartList, ...newListItem];
        cartListNew = cartListNew.filter((itemStorage) => itemStorage.quantity > 0);

        const addedProduct = cartListNew.find((item) => item.box?.id === action.meta.boxId);
        if (action.meta && action.meta.displayCartSumary === true) {
          if (isMobileVersion()) {
            action.asyncDispatch(
              openModalAction(
                MOBILE_ALERT_ADD_TO_CART_SUCCESS({
                  data: {
                    product: {
                      image: addedProduct?.box?.primary_picture.medium_url || '',
                      price: addedProduct?.box?.price || 0,
                      name: addedProduct?.box?.name || ''
                    }
                  }
                })
              )
            );
          } else {
            action.asyncDispatch(showHideCartSumaryLayoutAction?.(true));
          }
        }

        /* Fetch new suggestion discount code when user added a product to cart */
        action.asyncDispatch(fetchSuggestionDiscountCodesAction());

        /** Remove tracking code */
        action.meta.isRemoveTracking && action.asyncDispatch(removeUtmIdTrackingAction());

        /** Message for add to cart only in cart */
        isMobileDevice() &&
          ROUTING_CHECK_OUT === window.location.pathname &&
          newListItem.length &&
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_SUCCESS({
                content: formatErrorMessage(MESSAGE_ADD_CART_SUCCESS(newListItem[newListItem.length - 1]?.box?.name))
              })
            )
          );

        if (!!action.meta.box && !!cartDetail) {
          gatewayTrackAddToCart({
            box: action.meta.box,
            quantity,
            purchaseType: action.meta.purchaseType,
            source: action.meta.trackingSource,
            sourceId: action.meta.trackingSourceId,
            cartId: cartDetail?.id,
            totalValue: cartDetail?.total_price || 0
          });
        }

        return Object.assign({}, state, {
          cartDetail,
          cartList: cartListNew,
          isAddCartFail: false,
          isAddCartSuccess: true,
          isAddCartLoading: false,
          addToCart: Object.assign({}, state.addToCart, {
            processing: false,
            processed: true,
            errored: false
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.ADD_TO_CART):
        /** Remove tracking code */
        action.meta.isRemoveTracking && action.asyncDispatch(removeUtmIdTrackingAction());

        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        // if (action.meta && action.meta.displayCartSumary === true) {
        //   fetchSuggestionDiscountCodesAction();
        //   showHideCartSumaryLayoutAction(true);
        // }

        return Object.assign({}, state, {
          cartList: (!!cartDetail && cartDetail.cart_items) || [],
          addDiscountCode: { code: '', status: false, loading: false },
          isGetCartList: false,
          cartGiftList: [],
          isAddCartFail: true,
          isAddCartSuccess: false,
          isAddCartLoading: false,
          addToCart: Object.assign({}, state.addToCart, {
            processing: false,
            processed: false,
            errored: true
          })
        });

      case CART_ACTION_TYPE.SIMULATE_ADD_TO_CART_ACTION:
        const { isAddCartFail, isAddCartSuccess, isAddCartLoading } = action.payload;
        return Object.assign({}, state, { isAddCartFail, isAddCartSuccess, isAddCartLoading });

      // CLEAR LOGIC NEW ADDED ITEM HIHGLIGHT IN CART
      case CART_ACTION_TYPE.CLEAR_NEW_ITEM_CURRENTLY:
        const { idNewItem } = action.payload;

        const cartNew = state.cartList?.map((item) => (item.id === idNewItem ? { ...item, isNewItem: false } : item));

        return Object.assign({}, state, { cartList: cartNew });

      case CART_ACTION_TYPE.SHOW_HIDE_CART_SUMMARY:
        return Object.assign({}, state, { isCartSummaryVisible: action.payload.isVisible });

      case PENDING_TYPE(CART_ACTION_TYPE.REMOVE_FROM_CART):
        /**
         * REMOVE_FROM_CART_PENDING
         *
         * Set editable = false when call api update cart
         */
        const cartListBeforeRemoveItem = parseObject(cartList);
        const cartListAfterRemoveItem = reCalculateQuantity(
          cartListBeforeRemoveItem,
          action.meta.boxId,
          quantity * -1,
          action.meta.purchaseType
        );

        return Object.assign({}, state, {
          cartList: cartListAfterRemoveItem,
          isRemoveCartLoading: true,
          isRemoveCartSuccess: false,
          removeFromCart: {
            lastCartItemId: null,
            lastBoxId: action.meta.box?.id || action.meta.boxId,
            processing: true,
            processed: false,
            errored: false
          }
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.REMOVE_FROM_CART):
        /**
         * ADD_TO_CART_SUCCESS
         * REMOVE_FROM_CART_SUCCESS
         *
         * Receive data and update into cart list by {meta: {BoxId}}
         */

        /** Loop in storaged list data */
        // _cartList = Array.isArray(cartList)
        //   ? cartList.map(itemStorage => {
        //     if (boxId === itemStorage.box.id && itemStorage.editable) {
        //       /** filter received list to get by {meta: {BoxId}} */
        //       let cart_items: Array<any> = cartDetail.cart_items;
        //       itemStorage = cart_items.filter(
        //         item => boxId === item.box.id && itemStorage.purchase_type === item.purchase_type
        //       )[0];
        //     };

        //     return itemStorage;
        //   })
        //   : [];

        /** Remove item with quantity === 0*/
        // _cartList = _cartList.filter(
        //   itemStorage => itemStorage.quantity > 0
        //   );

        /* Fetch new suggestion discount code when user added a product to cart */
        action.asyncDispatch(fetchSuggestionDiscountCodesAction());

        _cartList = (cartDetail && cartDetail.cart_items) || [];

        return Object.assign({}, state, {
          cartDetail,
          cartList: _cartList,
          isRemoveCartLoading: false,
          isRemoveCartSuccess: true,
          removeFromCart: Object.assign({}, state.removeFromCart, {
            processing: false,
            processed: true,
            errored: false
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.REMOVE_FROM_CART):
        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        return Object.assign({}, state, {
          cartDetail,
          cartList: (!isEmptyKeyObject(cartDetail, 'cart_items') && cartDetail.cart_items) || [],
          isRemoveCartLoading: false,
          isRemoveCartSuccess: false,
          removeFromCart: Object.assign({}, state.removeFromCart, {
            processing: false,
            processed: false,
            errored: true
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.ADD_DISCOUNT_CODE):
        return Object.assign({}, state, {
          addDiscountCode: { code: (action.meta as any).discountCode, status: false, loading: true },
          excludedBoxIds: []
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.ADD_DISCOUNT_CODE):
        if (!action.payload.cart) return state;

        if (!!isOpenCartSummary) {
          action.asyncDispatch(closeModalAction());
          action.asyncDispatch(showHideCartSumaryLayoutAction?.(true));
        }

        action.payload.message &&
          action.asyncDispatch(openAlertAction(ALERT_GENERAL_SUCCESS({ content: action.payload.message })));

        return Object.assign({}, state, {
          addDiscountCode: { code: state.addDiscountCode.code, status: true, loading: false },
          removeDiscountCode: { status: false },
          cartDetail: action.payload.cart || {},
          cartList: action.payload.cart.cart_items,
          cartGiftList: action.payload.gifts,
          specialAddOns: action.payload.special_add_ons || [],
          excludedBoxIds: action.payload.excluded_box_ids || []
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.ADD_DISCOUNT_CODE):
        if (isExistError(action.payload.error, action.payload.errors)) {
          const message = formatErrorMessage(action.payload.error || action.payload.errors);
          action.asyncDispatch(
            action.meta.showErrorAsSystemNotification
              ? openAlertAction(ALERT_GENERAL_ERROR({ content: message }))
              : pushErrorAction({ type: CART_ACTION_TYPE.ADD_DISCOUNT_CODE, message })
          );
        }

        return Object.assign({}, state, {
          addDiscountCode: { code: '', status: false, loading: false },
          excludedBoxIds: action.payload.excluded_box_ids || []
        });

      case PENDING_TYPE(CART_ACTION_TYPE.REMOVE_DISCOUNT_CODE):
        return Object.assign({}, state, {
          removeDiscountCode: { status: false, loading: true }
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.REMOVE_DISCOUNT_CODE):
        if (!action.payload.cart) return state;

        !!action.payload.message &&
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_SUCCESS({
                content: action.payload.message
              })
            )
          );

        return Object.assign({}, state, {
          removeDiscountCode: { status: true, loading: false },
          addDiscountCode: { code: '', status: false, loading: false },
          cartDetail: action.payload.cart || {},
          cartList: action.payload.cart.cart_items,
          isGetCartList: false,
          cartGiftList: [],
          specialAddOns: []
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_ADD_ON_LIST):
        return Object.assign({}, state, {
          addOnList: action.payload.addons || []
        });

      case CART_ACTION_TYPE.REMOVE_ITEM_FROM_ADD_ON_LIST:
        return Object.assign({}, state, {
          addOnList: state.addOnList.filter((addon: any) => addon.id !== payload.id)
        });

      case CART_ACTION_TYPE.CHECKOUT_DELIVERY_CHOOSE_ADDRESS:
        return Object.assign({}, state, {
          deliveryConfig: Object.assign({}, deliveryConfig, {
            addressId: action.payload.addressId
          })
        });

      case CART_ACTION_TYPE.CHECKOUT_DELIVERY_GUEST_ADDRESS:
        return Object.assign({}, state, {
          deliveryConfig: Object.assign({}, deliveryConfig, {
            deliveryGuestAddress: action.payload.deliveryGuestAddress
          })
        });

      case CART_ACTION_TYPE.CHECKOUT_DELIVERY_USER_PICKUP_STORE_ADDRESS:
        return Object.assign({}, state, {
          deliveryConfig: Object.assign({}, deliveryConfig, {
            deliveryUserPickupStoreAddress: action.payload.deliveryUserPickupStoreAddress
          })
        });

      case CART_ACTION_TYPE.CHECKOUT_DELIVERY_SET_GIFT_MESSAGE:
        return Object.assign({}, state, {
          deliveryConfig: Object.assign({}, deliveryConfig, {
            giftMessage: action.payload.giftMessage
          })
        });

      case CART_ACTION_TYPE.CHECKOUT_DELIVERY_SET_NOTE_MESSAGE:
        return Object.assign({}, state, {
          deliveryConfig: Object.assign({}, deliveryConfig, {
            noteMessage: action.payload.noteMessage
          })
        });

      case CART_ACTION_TYPE.CHECKOUT_DELIVERY_SET_DELIVERY_METHOD:
        return Object.assign({}, state, {
          deliveryConfig: Object.assign({}, deliveryConfig, {
            shippingPackage: action.payload.deliveryMethod
          })
        });

      case CART_ACTION_TYPE.CHECKOUT_CLEAR_DELIVERY_CONFIG:
        return Object.assign({}, state, {
          deliveryConfig: {
            addressId: 0,
            giftMessage: '',
            noteMessage: '',
            shippingPackage: SHIPPING_TYPE.STANDARD,
            deliveryGuestAddress: {},
            deliveryUserPickupStoreAddress: {}
          },
          paymentSuccess: false,
          redirectUrl: ''
        });

      case PENDING_TYPE(CART_ACTION_TYPE.CHECKOUT):
        return Object.assign({}, state, {
          popupSetPasswordType: '',
          isFetchingCheckout: true,
          checkoutSuccess: false,
          isCheckoutFail: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.CHECKOUT):
        return Object.assign({}, state, {
          cartDetail: action.payload.cart || {},
          // TODO: Hot revert OTP features
          popupSetPasswordType: '',
          cartList: action.payload.cart.cart_items,
          isFetchingCheckout: false,
          checkoutSuccess: true,
          isCheckoutFail: false
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.CHECKOUT):
        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        return Object.assign({}, state, {
          // popupSetPasswordType: action.payload.popup_type,
          // TODO: Hot revert OTP features
          popupSetPasswordType: '',
          isFetchingCheckout: false,
          checkoutSuccess: false,
          isCheckoutFail: true
        });

      ///
      case PENDING_TYPE(CART_ACTION_TYPE.CLEAR_PASSWORD_OTP_STATUS):
        return Object.assign({}, state, {
          popupSetPasswordType: ''
        });
      //

      case PENDING_TYPE(CART_ACTION_TYPE.PAYMENT):
        return Object.assign({}, state, {
          paymentSuccess: false,
          isPaymentFail: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.PAYMENT): {
        localStorage.setItem(storageKey.AUTO_RELOAD_PAYMENT_ONE_TIME, '1');
        localStorage.removeItem(storageKey.UNIQUE_TRACKING_ADD_TO_CART);
        localStorage.removeItem(storageKey.UNIQUE_TRACKING_INITIATE_CHECKOUT);

        const currentURL = window.location.pathname;
        if (currentURL !== ROUTING_CHECK_OUT_SUCCESS && currentURL !== ROUTING_CHECK_OUT_PAYMENT) {
          action.asyncDispatch(
            openModalAction(
              MODAL_CHECKOUT_SUCCESS({
                data: {
                  constants,
                  orderInfo,
                  paymentStatus
                }
              })
            )
          );
        }

        const paidCartId = state.cartDetail.id;

        return Object.assign({}, state, {
          paidCartId,
          orderInfo: action.payload.order,
          guestUser: action.payload.guest_user,
          redirectUrl: action.payload.redirect_url,
          paymentSuccess: true,
          isPaymentFail: false,
          paymentStatus: ''
        });
      }

      case REJECTED_TYPE(CART_ACTION_TYPE.PAYMENT):
        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        return Object.assign({}, state, {
          paymentSuccess: false,
          isPaymentFail: true
        });

      case PENDING_TYPE(CART_ACTION_TYPE.PAYMENT_SUCCESS):
        return Object.assign({}, state, {
          isUpdateOnepayPayment: false,
          paymentStatus: ''
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.PAYMENT_SUCCESS): {
        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        const paidCartId = state.cartDetail.id;

        return Object.assign({}, state, {
          paidCartId,
          isUpdateOnepayPayment: true,
          paymentStatus: action.payload.payment_status,
          orderInfo: action.payload.order
        });
      }

      case REJECTED_TYPE(CART_ACTION_TYPE.PAYMENT_SUCCESS):
        return Object.assign({}, state, {
          isUpdateOnepayPayment: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.CHANGE_PAYMENT_TO_COD):
        action.asyncDispatch(
          updateOrderAction({
            number: action.meta.orderId,
            data: action.payload.order
          })
        );
        return Object.assign({}, state, { orderInfo: action.payload.order });

      case CART_ACTION_TYPE.CLEAR_CART:
        return Object.assign({}, state, {
          cartDetail: {},
          orderInfo: {},
          cartList: []
        });

      case PENDING_TYPE(CART_ACTION_TYPE.GET_CART_GIFT):
        return Object.assign({}, state, {
          isGetCartGiftListSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.GET_CART_GIFT):
        return Object.assign({}, state, {
          isGetCartGiftListSuccess: true,
          cartGiftList: action.payload.gifts
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.GET_CART_GIFT):
        return Object.assign({}, state, {
          isGetCartGiftListSuccess: false
        });

      case PENDING_TYPE(CART_ACTION_TYPE.SET_PRIMARY_ADDRESS):
        return Object.assign({}, state, {
          isPrimaryAddressSetSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.SET_PRIMARY_ADDRESS):
        action.asyncDispatch(fetchUserAddressListAction());
        return Object.assign({}, state, {
          isPrimaryAddressSetSuccess: true
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.SET_PRIMARY_ADDRESS):
        return Object.assign({}, state, {
          isPrimaryAddressSetSuccess: false
        });

      case PENDING_TYPE(CART_ACTION_TYPE.SELECT_GIFT):
        return Object.assign({}, state, {
          isSelectedGiftCart: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.SELECT_GIFT):
        if (!action.payload.cart) return state;

        return Object.assign({}, state, {
          isSelectedGiftCart: true,
          cartDetail: action.payload.cart || {},
          cartList: action.payload.cart.cart_items
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.SELECT_GIFT):
        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        return Object.assign({}, state, {
          isSelectedGiftCart: true
        });

      case PENDING_TYPE(CART_ACTION_TYPE.UPDATE_PAYMENT_METHOD):
        return Object.assign({}, state, {
          paymentMethodUpdate: Object.assign({}, state.paymentMethodUpdate, {
            updating: true
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.UPDATE_PAYMENT_METHOD): {
        const hasCartDetail = typeof action.payload.cart === 'object';

        return Object.assign({}, state, {
          cartDetail: hasCartDetail ? action.payload.cart : {},
          cartList: hasCartDetail ? action.payload.cart.cart_items : [],
          paymentMethodUpdate: Object.assign({}, state.paymentMethodUpdate, {
            updating: false,
            updated: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(CART_ACTION_TYPE.UPDATE_PAYMENT_METHOD):
        if (action.meta.enableFallbackAlert && isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        return Object.assign({}, state, {
          paymentMethodUpdate: Object.assign({}, state.paymentMethodUpdate, {
            updating: false,
            updated: false,
            errored: true
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_ORDER_BOX_CATEGORY):
        return Object.assign({}, state, {
          orderBoxCategories: Object.assign({}, state.orderBoxCategories, {
            [action.meta.productId]: {
              category: '',
              fetching: true,
              loaded: false,
              errored: false
            }
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_ORDER_BOX_CATEGORY): {
        const categories = Array.isArray(action.payload.categories) ? action.payload.categories : [];
        const categoryHierarchy = generateCategoryHirarchy(categories);
        const rootCategory = categoryHierarchy.filter((category) => category.depth === 0);
        const category = rootCategory.length ? rootCategory[0].name : 'Beauty Box';

        return Object.assign({}, state, {
          orderBoxCategories: Object.assign({}, state.orderBoxCategories, {
            [action.meta.productId]: {
              category,
              fetching: false,
              loaded: true,
              errored: false
            }
          })
        });
      }

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_ORDER_BOX_CATEGORY):
        return Object.assign({}, state, {
          orderBoxCategories: Object.assign({}, state.orderBoxCategories, {
            [action.meta.productId]: {
              category: '',
              fetching: false,
              loaded: false,
              errored: true
            }
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.SELECT_SPECIAL_ADD_ON):
        return Object.assign({}, state, {
          isSelectedGiftCart: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.SELECT_SPECIAL_ADD_ON):
        if (!action.payload.cart) return state;

        if (!action.payload.cart.can_select_add_on) {
          action.asyncDispatch(closeModalAction());
        }

        return Object.assign({}, state, {
          isSelectedGiftCart: true,
          cartDetail: action.payload.cart || {},
          cartList: action.payload.cart.cart_items
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.SELECT_SPECIAL_ADD_ON):
        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        return Object.assign({}, state, {
          isSelectedGiftCart: true
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_BOXES):
        return Object.assign({}, state, {
          cartRedeemList: action.payload.redeems
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_SPECIAL_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            special: Object.assign({}, state.redeemable.special, {
              fetching: true,
              errored: false
            })
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_SPECIAL_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            special: Object.assign({}, state.redeemable.special, {
              index: action.payload.boxes || [],
              fetching: false,
              loaded: true,
              errored: false
            })
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_SPECIAL_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            special: Object.assign({}, state.redeemable.special, {
              fetching: false,
              errored: true
            })
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_USER_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            user: Object.assign({}, state.redeemable.user, {
              fetching: true,
              errored: false
            })
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_USER_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            user: Object.assign({}, state.redeemable.user, {
              index: action.payload.boxes || [],
              fetching: false,
              loaded: true,
              errored: false
            })
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_USER_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            user: Object.assign({}, state.redeemable.user, {
              fetching: false,
              errored: true
            })
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_LATEST_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            latest: Object.assign({}, state.redeemable.latest, {
              fetching: true,
              errored: false
            })
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_LATEST_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            latest: Object.assign({}, state.redeemable.latest, {
              index: action.payload.boxes || [],
              fetching: false,
              loaded: true,
              errored: false
            })
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_CART_REDEEM_LATEST_BOXES):
        return Object.assign({}, state, {
          redeemable: Object.assign({}, state.redeemable, {
            latest: Object.assign({}, state.redeemable.latest, {
              fetching: false,
              errored: true
            })
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_BOXES_TO_FREESHIP):
        // TODO: Confirm API response and remove guard
        const boxesToFreeship = Array.isArray(action.payload.boxes) ? action.payload.boxes : [];
        return Object.assign({}, state, { boxesToFreeship });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_CONSTANTS):
        return Object.assign({}, state, {
          isFetchingConfig: true,
          isGetConstantSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_CONSTANTS):
        const { bank_account, games, referral, ...other_constants }: any = action.payload;
        // NOTE: localStorage is required, as the updated state is not available on app mount
        localStorage.setItem(
          storageKey.SETTINGS_MOE_TRACKING_ENABLED,
          String(state.constants.moengage_tracking_enabled)
        );

        return Object.assign({}, state, {
          isFetchingConfig: false,
          isGetConstantSuccess: true,
          constants: Object.assign({}, other_constants, {
            bank_account: Object.assign({}, state.constants.bank_account, bank_account),
            games: Object.assign({}, state.constants.games, games),
            referral: Object.assign({}, state.constants.referral, referral)
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODES):
        return Object.assign({}, state, {
          cartDiscountCodes: Object.assign({}, state.cartDiscountCodes, {
            fetching: true,
            loaded: false,
            errored: false
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODES):
        return Object.assign({}, state, {
          cartDiscountCodes: Object.assign({}, state.cartDiscountCodes, {
            index: action.payload.discount_codes || [],
            fetching: false,
            loaded: true,
            errored: false
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODES):
        return Object.assign({}, state, {
          cartDiscountCodes: Object.assign({}, state.cartDiscountCodes, {
            fetching: false,
            errored: true
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODE):
        return Object.assign({}, state, {
          cartDiscountCode: Object.assign({}, state.cartDiscountCode, {
            lastId: action.meta.code,
            fetching: true,
            loaded: false,
            errored: false
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODE):
        return Object.assign({}, state, {
          cartDiscountCode: Object.assign({}, state.cartDiscountCode, {
            discountCode: action.payload.discount_code,
            fetching: false,
            loaded: true,
            errored: false
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_CART_DISCOUNT_CODE):
        return Object.assign({}, state, {
          cartDiscountCode: Object.assign({}, state.cartDiscountCode, {
            fetching: false,
            errored: true
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_CONSTANTS):
        return Object.assign({}, state, {
          isFetchingConfig: false,
          isGetConstantSuccess: false
        });

      case PENDING_TYPE(CART_ACTION_TYPE.CHECK_SAME_DAY_SHIPPING):
        return Object.assign({}, state, {
          isCheckSameDayShipping: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.CHECK_SAME_DAY_SHIPPING):
        return Object.assign({}, state, {
          canApplySameDayShipping: action.payload.can_apply_same_day_shipping,
          isCheckSameDayShipping: true
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.CHECK_SAME_DAY_SHIPPING):
        return Object.assign({}, state, {
          isCheckSameDayShipping: false
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_SUGGESTION_DISCOUNT_CODES):
        return Object.assign({}, state, {
          suggestionDiscountCodesFetching: true,
          suggestionDiscountCodesErrored: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_SUGGESTION_DISCOUNT_CODES): {
        let codes = action.payload.discount_codes;
        codes = Array.isArray(codes) ? codes.filter((code) => code) : [];

        return Object.assign({}, state, {
          suggestionDiscountCodes: codes,
          suggestionDiscountCodesFetching: false,
          suggestionDiscountCodesLoaded: true,
          suggestionDiscountCodesErrored: false
        });
      }

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_SUGGESTION_DISCOUNT_CODES):
        return Object.assign({}, state, {
          suggestionDiscountCodesFetching: false,
          suggestionDiscountCodesErrored: true
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_STORES):
        return Object.assign({}, state, {
          stores: action.payload.stores
        });

      case PENDING_TYPE(CART_ACTION_TYPE.CHECKOUT_ADDRESS):
        return Object.assign({}, state, {
          isFetchingCheckoutAddress: true,
          isCheckoutAddressSuccess: false,
          isCheckoutDeliveryMethodSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.CHECKOUT_ADDRESS):
        if (!action.payload.cart) return state;

        return Object.assign({}, state, {
          isFetchingCheckoutAddress: false,
          isCheckoutAddressSuccess: true,
          isCheckoutDeliveryMethodSuccess: true,
          cartDetail: action.payload.cart || {},
          cartList: action.payload.cart.cart_items
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.CHECKOUT_ADDRESS):
        return Object.assign({}, state, {
          isFetchingCheckoutAddress: false,
          isCheckoutAddressSuccess: false,
          isCheckoutDeliveryMethodSuccess: false
        });

      case PENDING_TYPE(CART_ACTION_TYPE.FETCH_SAMPLE_BOXES):
        return Object.assign({}, state, {
          isGetCartSampleListSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.FETCH_SAMPLE_BOXES):
        return Object.assign({}, state, {
          isGetCartSampleListSuccess: true,
          cartSampleList: action.payload.boxes
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.FETCH_SAMPLE_BOXES):
        return Object.assign({}, state, {
          isGetCartSampleListSuccess: false
        });

      ////
      case PENDING_TYPE(CART_ACTION_TYPE.GET_MOMO_PAYMENT_ADDRESS_URL):
        return Object.assign({}, state, {
          momoPaymentAddreessUrl: '',
          isFetchingMomoPaymentAddreessUrl: true,
          isFetchingMomoPaymentAddreessUrlSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.GET_MOMO_PAYMENT_ADDRESS_URL):
        return Object.assign({}, state, {
          momoPaymentAddreessUrl: action.payload.pay_url,
          isFetchingMomoPaymentAddreessUrl: false,
          isFetchingMomoPaymentAddreessUrlSuccess: true
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.GET_MOMO_PAYMENT_ADDRESS_URL):
        return Object.assign({}, state, {
          momoPaymentAddreessUrl: '',
          isFetchingMomoPaymentAddreessUrl: false,
          isFetchingMomoPaymentAddreessUrlSuccess: false
        });

      /////

      case PENDING_TYPE(CART_ACTION_TYPE.GET_ONEPAY_PAYMENT_ADDRESS_URL):
        return Object.assign({}, state, {
          onepayPaymentAddreessUrl: '',
          isFetchingOnepayPaymentAddreessUrl: true,
          isFetchingOnepayPaymentAddreessUrlSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.GET_ONEPAY_PAYMENT_ADDRESS_URL):
        return Object.assign({}, state, {
          onepayPaymentAddreessUrl: action.payload.url,
          isFetchingOnepayPaymentAddreessUrl: false,
          isFetchingOnepayPaymentAddreessUrlSuccess: true
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.GET_ONEPAY_PAYMENT_ADDRESS_URL):
        return Object.assign({}, state, {
          onepayPaymentAddreessUrl: '',
          isFetchingOnepayPaymentAddreessUrl: false,
          isFetchingOnepayPaymentAddreessUrlSuccess: false
        });

      ///

      case PENDING_TYPE(CART_ACTION_TYPE.UPDATE_ONEPAY_PAYMENT):
        return Object.assign({}, state, {
          isUpdatingOnepayPaymentAddreessUrl: true,
          isUpdatingOnepayPaymentAddreessUrlSuccess: false
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.UPDATE_ONEPAY_PAYMENT):
        return Object.assign({}, state, {
          isUpdatingOnepayPaymentAddreessUrl: false,
          isUpdatingOnepayPaymentAddreessUrlSuccess: true
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.UPDATE_ONEPAY_PAYMENT):
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: formatErrorMessage(action.payload.error || action.payload.errors)
            })
          )
        );
        return Object.assign({}, state, {
          isUpdatingOnepayPaymentAddreessUrl: false,
          isUpdatingOnepayPaymentAddreessUrlSuccess: false
        });

      ///

      case PENDING_TYPE(CART_ACTION_TYPE.INVOICE_FETCH_RECENT):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { fetching: true, errored: false })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.INVOICE_FETCH_RECENT):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, {
            info: Object.assign({}, state.invoice.info, (action.payload as any).invoice),
            fetching: false,
            loaded: true
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.INVOICE_FETCH_RECENT):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { fetching: false, errored: true })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.INVOICE_FETCH):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { fetching: true, errored: false })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.INVOICE_FETCH):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, {
            info: Object.assign({}, state.invoice.info, (action.payload as any).invoice),
            fetching: false,
            loaded: true
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.INVOICE_FETCH):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { fetching: false, errored: true })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.INVOICE_UPDATE):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { updating: true, errored: false })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.INVOICE_UPDATE):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, {
            info: Object.assign({}, state.invoice.info, payload.invoice),
            updating: false,
            loaded: true
          }),
          cartDetail: payload.cart || {},
          cartList: payload.cart.cart_items
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.INVOICE_UPDATE):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { updating: false, errored: true })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.ACCOMPANY_SERVICES_FETCH):
        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            available: Object.assign({}, state.accompanies.available, { fetching: true, errored: false })
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.ACCOMPANY_SERVICES_FETCH):
        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            available: Object.assign({}, state.accompanies.available, {
              index: payload.accompany_services,
              fetching: false,
              loaded: true,
              errored: false
            })
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.ACCOMPANY_SERVICES_FETCH):
        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            available: Object.assign({}, state.accompanies.available, { fetching: false, errored: true })
          })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.ACCOMPANY_SERVICES_UPDATE):
        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            update: Object.assign({}, state.accompanies.update, { updating: true, errored: false })
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.ACCOMPANY_SERVICES_UPDATE):
        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            update: Object.assign({}, state.accompanies.update, { updating: false, errored: false })
          }),
          cartDetail: payload.cart || {},
          cartList: payload.cart.cart_items
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.ACCOMPANY_SERVICES_UPDATE):
        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            update: Object.assign({}, state.accompanies.update, { updating: false, errored: true })
          })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.CONTACT_PHONE_UPDATE):
        return Object.assign({}, state, { cartDetail });

      case PENDING_TYPE(CART_ACTION_TYPE.INVOICE_DELETE):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { deleting: true, errored: false })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.INVOICE_DELETE):
        action.asyncDispatch(fetchRecentInvoiceAction());
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { deleting: false }),
          cartDetail: payload.cart || {},
          cartList: payload.cart.cart_items
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.INVOICE_DELETE):
        return Object.assign({}, state, {
          invoice: Object.assign({}, state.invoice, { deleting: false, errored: true })
        });

      case PENDING_TYPE(CART_ACTION_TYPE.TAX_CODE_FETCH_DETAIL):
        return Object.assign({}, state, {
          taxCode: Object.assign({}, state.taxCode, { adding: true, errored: false })
        });

      case FULFILLED_TYPE(CART_ACTION_TYPE.TAX_CODE_FETCH_DETAIL):
        const fetchedInfo = (action.payload as any).info;
        const validEntry = !!(fetchedInfo.name || fetchedInfo.address);
        const existingEntry = state.taxCode.index.find(({ code }) => fetchedInfo.code === code);
        const indexUpdate =
          validEntry && !existingEntry ? state.taxCode.index.concat(fetchedInfo) : state.taxCode.index;

        return Object.assign({}, state, {
          taxCode: Object.assign({}, state.taxCode, {
            index: indexUpdate,
            adding: false,
            loaded: true
          })
        });

      case REJECTED_TYPE(CART_ACTION_TYPE.TAX_CODE_FETCH_DETAIL):
        return Object.assign({}, state, {
          taxCode: Object.assign({}, state.taxCode, { adding: false, errored: true })
        });

      case CART_ACTION_TYPE.TOGGLE_DISCOUNT_CODE_GIFT_MODAL_VISIBILITY:
        return Object.assign({}, state, { isDiscountCodeGiftModalOpen: action.payload.visibility });

      case CART_ACTION_TYPE.TOGGLE_DISCOUNT_CODE_ADDON_MODAL_VISIBILITY:
        return Object.assign({}, state, { isDiscountCodeAddonModalOpen: action.payload.visibility });

      case CART_ACTION_TYPE.SET_CHECKOUT_PHASE_READINESS:
        return Object.assign({}, state, {
          phaseReadiness: Object.assign({}, state.phaseReadiness, {
            [payload.phase]: Object.assign({}, state.phaseReadiness[payload.phase], {
              [payload.step]: payload.readiness
            })
          })
        });

      case CART_ACTION_TYPE.RESET_CHECKOUT_PHASE_READINESS:
        let phase = INITIAL_STATE_CART.phaseReadiness[payload.phase];

        return Object.assign({}, state, {
          phaseReadiness: Object.assign({}, state.phaseReadiness, { [payload.phase]: Object.assign({}, phase) })
        });

      case CART_ACTION_TYPE.SET_ACCOMPANIES_LOCAL:
        let _local = (state.cartDetail as any).accompanies || [];
        _local = mapAccompanySelections(state.accompanies.available.index, _local);
        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            local: _local,
            edited: false
          })
        });

      case CART_ACTION_TYPE.TOUCH_ACCOMPANIES_LOCAL:
        return Object.assign({}, state, { accompanies: Object.assign({}, state.accompanies, { edited: true }) });

      case CART_ACTION_TYPE.SELECT_ACCOMPANIES_LOCAL_OPTION:
        let service;
        let validity;
        _local = (state.accompanies as any).local.map((localAccompany) => {
          if (localAccompany.serviceId === payload.serviceId) {
            service = (state.accompanies as any).available.index.find(
              (accompany) => accompany.id === payload.serviceId
            );
            validity = service && service.required_note ? !!localAccompany.note : true;
            return Object.assign({}, localAccompany, { optionId: payload.optionId, selected: true, isValid: validity });
          }
          return localAccompany;
        });

        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            local: _local,
            edited: true
          })
        });

      case CART_ACTION_TYPE.UPDATE_ACCOMPANIES_LOCAL_NOTE:
        _local = (state.accompanies as any).local.map((localAccompany) =>
          localAccompany.serviceId === payload.serviceId
            ? Object.assign({}, localAccompany, { note: payload.note, isValid: payload.isValid, selected: true })
            : localAccompany
        );

        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            local: _local,
            edited: true
          })
        });

      case CART_ACTION_TYPE.TOGGLE_SELECTED_ACCOMPANIES_LOCAL:
        _local = (state.accompanies as any).local.map((localAccompany) => {
          if (localAccompany.serviceId === payload.serviceId) {
            service = (state.accompanies as any).available.index.find(
              (accompany) => accompany.id === payload.serviceId
            );
            validity = service && service.required_note ? !!localAccompany.note : true;
            return Object.assign({}, localAccompany, { selected: payload.action === 'add', isValid: validity });
          }
          return localAccompany;
        });

        return Object.assign({}, state, {
          accompanies: Object.assign({}, state.accompanies, {
            local: _local,
            edited: true
          })
        });

      case CART_ACTION_TYPE.SET_PAYMENT_HIGHLIGHT_ERROR_BLOCK:
        return Object.assign({}, state, { paymentHighlightErrorBlock: payload.blockId });

      case CART_ACTION_TYPE.RESET_PAYMENT_HIGHLIGHT_ERROR_BLOCK:
        return Object.assign({}, state, { paymentHighlightErrorBlock: '' });

      case CART_ACTION_TYPE.UPDATE_VARIANT_QUANTITY: {
        const { quantity } = action.payload;
        return Object.assign({}, state, { updatedVariantQuantity: quantity });
      }

      case CART_ACTION_TYPE.UPDATE_REPRESENTABLE_PROMOTIONS: {
        const existingTypes = state.representablePromotions.map((promotion) => promotion.type);
        const newEntries = action.payload.representablePromotions.filter(
          (promotion) => !existingTypes.includes(promotion.type)
        );

        return Object.assign({}, state, {
          representablePromotions: [
            ...state.representablePromotions.map(
              (promotion) =>
                action.payload.representablePromotions.find((promo) => promo.type === promotion.type) || promotion
            ),
            ...newEntries
          ]
        });
      }

      case CART_ACTION_TYPE.UPDATE_AUTH_MODAL_STATE: {
        return Object.assign({}, state, {
          authModalState: Object.assign({}, state.authModalState, action.payload)
        });
      }

      case CART_ACTION_TYPE.UPDATE_PROMOTIONS_VIEW_COUNT: {
        return Object.assign({}, state, {
          promotionsViewCountSinceCheckoutMounted: action.payload.count
        });
      }

      case CART_ACTION_TYPE.SET_PROMOTIONS_POPUP_VISIBILITY: {
        return Object.assign({}, state, {
          promotionsPopupVisibility: !!action.payload.visibility
        });
      }

      case PENDING_TYPE(CART_ACTION_TYPE.GET_CART_REFERRAL_SCHEMES): {
        return Object.assign({}, state, {
          referralSchemes: Object.assign({}, state.referralSchemes, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(CART_ACTION_TYPE.GET_CART_REFERRAL_SCHEMES): {
        return Object.assign({}, state, {
          referralSchemes: Object.assign({}, state.referralSchemes, {
            index: action.payload.schemes || [],
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(CART_ACTION_TYPE.GET_CART_REFERRAL_SCHEMES): {
        return Object.assign({}, state, {
          referralSchemes: Object.assign({}, state.referralSchemes, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(CART_ACTION_TYPE.APPLY_CART_REFERRAL_SCHEME): {
        return Object.assign({}, state, {
          applyReferralScheme: Object.assign({}, state.applyReferralScheme, {
            lastId: { code: action.meta.code, schemeId: action.meta.schemeId },
            applying: true
          })
        });
      }

      case FULFILLED_TYPE(CART_ACTION_TYPE.APPLY_CART_REFERRAL_SCHEME): {
        action.meta.skipSuccessAlert ||
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_SUCCESS({
                content: `Bạn vừa áp dụng chương trình ${
                  cartDetail.referral?.applied_scheme?.referee_scheme_name ||
                  cartDetail.referral?.applied_scheme?.name ||
                  'scheme'
                } vào giỏ hàng`
              })
            )
          );

        return Object.assign({}, state, {
          applyReferralScheme: Object.assign({}, state.applyReferralScheme, {
            applying: false,
            applied: true,
            errored: false
          }),
          cartDetail,
          cartList: (cartDetail && cartDetail.cart_items) || []
        });
      }

      case REJECTED_TYPE(CART_ACTION_TYPE.APPLY_CART_REFERRAL_SCHEME): {
        if (isExistError(action.payload.error, action.payload.errors)) {
          action.asyncDispatch(
            openAlertAction(
              ALERT_GENERAL_ERROR({
                content: formatErrorMessage(action.payload.error || action.payload.errors)
              })
            )
          );
        }

        return Object.assign({}, state, {
          applyReferralScheme: Object.assign({}, state.applyReferralScheme, {
            applying: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(CART_ACTION_TYPE.TOGGLE_APPLY_BALANCE_STATUS): {
        return Object.assign({}, state, {
          toggleApplyBalanceStatus: Object.assign({}, state.toggleApplyBalanceStatus, {
            processing: true,
            errored: false
          })
        });
      }
      case FULFILLED_TYPE(CART_ACTION_TYPE.TOGGLE_APPLY_BALANCE_STATUS): {
        return Object.assign({}, state, {
          toggleApplyBalanceStatus: Object.assign({}, state.toggleApplyBalanceStatus, {
            processing: false,
            processed: true,
            errored: false
          }),
          cartDetail,
          cartList: cartDetail?.cart_items || []
        });
      }
      case REJECTED_TYPE(CART_ACTION_TYPE.TOGGLE_APPLY_BALANCE_STATUS): {
        return Object.assign({}, state, {
          toggleApplyBalanceStatus: Object.assign({}, state.toggleApplyBalanceStatus, {
            processing: false,
            errored: true
          })
        });
      }

      default:
        return state;
    }
  } catch (e) {
    return state;
  }
}

export default cartReducer;
