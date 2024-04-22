import { getCsrfToken } from '../utils/auth';
import { get, post, patch, del } from '../config/restful-method';

import { SHIPPING_TYPE } from '../constants/application/shipping';

/** Get cart list */
export const getCart = () =>
  get({
    path: '/cart',
    description: '[Cart] Get cart list /cart',
    errorMesssage: `Can't Get list cart. Please try again`
  });

export interface IAddToCartParam {
  boxId: string | number;
  quantity?: number;
  displayCartSumary?: boolean;
  purchaseType?: number;
  trackingCode?: string;
  utmId?: string;
}

export const addToCart = ({ boxId, quantity, purchaseType, trackingCode = '', utmId = '' }: IAddToCartParam) => {
  const data = {
    csrf_token: getCsrfToken(),
    box_id: boxId,
    quantity,
    purchase_type: purchaseType,
    tracking_code: trackingCode,
    utm_id: utmId
  };

  return post({
    path: '/cart/add_item',
    data,
    description: '[Cart] Add item to cart /cart/add_item',
    errorMesssage: `Can't Get list cart. Please try again`
  });
};

export interface RemoveFromCartApiParams {
  boxId: number;
  quantity: number;
  purchaseType: number;
}
export const removeFromCart = ({ boxId, quantity, purchaseType }: RemoveFromCartApiParams) => {
  const data = {
    csrf_token: getCsrfToken(),
    box_id: boxId,
    quantity,
    purchase_type: purchaseType
  };

  return post({
    path: '/cart/remove_item',
    data,
    description: '[Cart] Remove item from cart /cart/remove_item',
    errorMesssage: `Can't remove item in list cart. Please try again`
  });
};

export const addDiscountCode = ({ discountCode }) => {
  const data = {
    csrf_token: getCsrfToken(),
    discount_code: discountCode
  };

  return post({
    path: '/cart/add_discount_code',
    data,
    description: '[Cart] Add discount code /cart/add_discount_code',
    errorMesssage: `Can't add discount code. Please try again`
  });
};

export const removeDiscountCode = () => {
  const data = { csrf_token: getCsrfToken() };

  return post({
    path: '/cart/remove_discount_code',
    data,
    description: '[Cart] Remove discount code /cart/remove_discount_code',
    errorMesssage: `Can't remove discount code. Please try again`
  });
};

export const fetchAddOnList = ({ limit = 12 }) =>
  get({
    path: `/cart/addon_boxes?limit=${limit}`,
    description: '[Cart] Fetch Add On List /cart/addon_boxes',
    errorMesssage: `Can't get data. Please try again`
  });

export interface FetchCartDiscountCodesApiParams {
  page?: number;
  perPage?: number;
}
export const fetchCartDiscountCodesApi = ({ page = 1, perPage = 12 }: FetchCartDiscountCodesApiParams) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/cart/discount_codes${query}`,
    description: '[Cart] Fetch cart discount codes /cart/discount_codes',
    errorMesssage: `Can't fetch cart discount codes. Please try again`
  });
};

export interface FetchCartDiscountCodeApiParams {
  discountCode: string;
}
export const fetchCartDiscountCodeApi = ({ discountCode }: FetchCartDiscountCodeApiParams) => {
  return get({
    path: `/cart/discount_codes/${discountCode}`,
    description: '[Cart] Fetch cart discount code /cart/discount_codes/:discountCode',
    errorMesssage: `Can't fetch cart discount code. Please try again`
  });
};

export const checkout = ({
  saveNewAddress,
  addressId = '',
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
  const cart = {
    address_id: addressId,
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    address: address,
    province_id: provinceId,
    district_id: districtId,
    ward_id: wardId,
    shipping_package: shippingPackage,
    is_gift: isGift,
    gift_message: giftMessage,
    email: email,
    note: note
  };

  const data = {
    csrf_token: getCsrfToken(),
    save_new_address: saveNewAddress,
    address_id: addressId,
    cart
  };

  return post({
    path: '/cart/checkout',
    data,
    description: '[Cart] Cart checkout /cart/checkout',
    errorMesssage: `Can't cart checkout. Please try again`
  });
};

export const payment = ({ paymentMethod }) => {
  const data = {
    csrf_token: getCsrfToken(),
    payment_method: paymentMethod
  };

  return post({
    path: '/cart/payment',
    data,
    description: '[Cart] Cart payment /cart/payment',
    errorMesssage: `Can't cart payment. Please try again`
  });
};

export const getCartGift = () =>
  get({
    path: '/cart/available_gifts',
    description: '[Cart] Get cart available gifts /cart/available_gifts',
    errorMesssage: `Can't get cart available gifts. Please try again`
  });

export const selectGift = ({ discountCodeGiftId }) => {
  const data = {
    csrf_token: getCsrfToken(),
    discount_code_gift_id: discountCodeGiftId
  };

  return post({
    path: '/cart/select_gift',
    data,
    description: '[Cart] Cart select gift payment /cart/select_gift',
    errorMesssage: `Can't cart select gift payment. Please try again`
  });
};

export const selectSpecialAddOn = ({ discountCodeAddOnId }) => {
  const data = {
    csrf_token: getCsrfToken(),
    discount_code_addon_id: discountCodeAddOnId
  };

  return post({
    path: '/cart/select_special_add_on',
    data,
    description: '[Cart] Cart select add_on payment /cart/select_special_add_on',
    errorMesssage: `Can't cart select add_on payment. Please try again`
  });
};

export const fetchCartRedeemBoxes = ({ page = 1, perPage = 12 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/cart/redeem_boxes${query}`,
    description: '[Cart] Fetch cart redeem boxes /cart/redeem_boxes',
    errorMesssage: `Can't fetch cart redeem boxes. Please try again`
  });
};

export const fetchCartInvoice = () => {
  return get({
    path: `/cart/invoice`,
    description: '[Cart] Fetch cart invoice /cart/invoice',
    errorMesssage: `Can't fetch cart invoice. Please try again`
  });
};

export const fetchRecentInvoice = () => {
  return get({
    path: `/user/recent_invoice`,
    description: '[Cart] Fetch recent invoice /user/recent_invoice',
    errorMesssage: `Can't fetch recent invoice. Please try again`
  });
};

export const updateInvoice = (invoice: { code: string; name: string; email: string; address: string }) =>
  patch({
    path: `/cart/invoice`,
    data: invoice,
    description: '[Cart] Update invoice /cart/invoice',
    errorMesssage: `Can't update invoice. Please try again`
  });

export const deleteInvoice = () => {
  return del({
    path: `/cart/invoice`,
    description: '[Cart] Delete invoice /cart/invoice',
    errorMesssage: `Can't delete invoice. Please try again`
  });
};

export const fetchTaxCodeDetail = (taxCode) => {
  return get({
    path: `/invoices/${taxCode}`,
    description: '[Cart] Fetch tax code detail /invoice/:tax_code',
    errorMesssage: `Can't fetch tax code detail. Please try again`
  });
};

export const setPrimaryAddress = ({ addressId }) =>
  patch({
    path: `/addresses/${addressId}/set_as_primary`,
    data: { csrf_token: getCsrfToken() },
    description: "[Cart] Set user's primary address /addresses/:id/set_as_primary",
    errorMesssage: `Can't set user's primary address. Please try again`
  });

export const fetchCartRedeemSpecialBoxes = ({ page = 1, perPage = 12 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/redeems/specials${query}`,
    description: '[Cart] Fetch cart redeem special boxes /redeems/specials',
    errorMesssage: `Can't fetch cart redeem special boxes. Please try again`
  });
};

export const fetchCartRedeemUserBoxes = ({ page = 1, perPage = 12 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/redeems/me${query}`,
    description: '[Cart] Fetch cart redeem user boxes /redeems/me',
    errorMesssage: `Can't fetch cart redeem user boxes. Please try again`
  });
};

export const fetchCartRedeemLatestBoxes = ({ page = 1, perPage = 12 }) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/redeems${query}`,
    description: '[Cart] Fetch cart redeem latest boxes /redeems',
    errorMesssage: `Can't fetch cart redeem latest boxes. Please try again`
  });
};

export const paymentSuccess = ({ resultParams }) => {
  const data = {
    result_params: resultParams
  };

  return post({
    path: '/cart/update_onepay_payment',
    data,
    description: '[Cart] Cart payment success /cart/update_onepay_payment',
    errorMesssage: `Can't cart payment success. Please try again`
  });
};

export const fetchBoxesToFreeship = () => {
  return get({
    path: '/cart/boxes_to_freeship',
    description: '[Cart] Cart boxes to freeship /cart/boxes_to_freeship',
    errorMesssage: `Can't boxes to freeship. Please try again`
  });
};

export const fetchConstants = () => {
  return get({
    path: '/settings/constants',
    description: '[Settings] Setting constant /settings/constants',
    errorMesssage: `Can't setting constant. Please try again`
  });
};

export const checkSameDayShipping = ({ districtId = 0 }) => {
  const query = `?district_id=${districtId}`;
  return get({
    path: `/cart/check_same_day_shipping${query}`,
    description: '[Cart] Check same day shipping /cart/check_same_day_shipping',
    errorMesssage: `Can't check same day shipping. Please try again`
  });
};

export const fetchSuggestionDiscountCodes = () => {
  return get({
    path: `/cart/suggestion/discount_codes`,
    description: '[Cart] Fetch suggestion discount code /cart/suggestion/discount_codes',
    errorMesssage: `Can't fetch suggestion discount code. Please try again`
  });
};

export const checkoutAddress = ({
  addressId: address_id,
  warehouseId: warehouse_id,
  firstName: first_name,
  lastName: last_name,
  phone
}) => {
  const cart = {
    warehouse_id,
    address_id,
    first_name,
    last_name,
    phone
  };

  const data = {
    csrf_token: getCsrfToken(),
    cart
  };

  return post({
    path: '/cart/checkout_address',
    data,
    description: '[Cart] Cart checkout address /cart/checkout_address',
    errorMesssage: `Can't cart checkout address. Please try again`
  });
};

export const fetchStores = () => {
  return get({
    path: '/settings/stores',
    description: '[Settings] Setting stores /settings/stores',
    errorMesssage: `Can't setting stores. Please try again`
  });
};

export const fetchSampleBoxes = () => {
  return get({
    path: '/cart/sample_boxes',
    description: '[Cart] Fetch sample boxes /cart/sample_boxes',
    errorMesssage: `Can't fetch sample boxes. Please try again`
  });
};

export const changePaymentToCOD = ({ orderId }) =>
  patch({
    path: `/orders/${orderId}/change_to_cod`,
    description: '[Cart] Change payment method to COD /orders/:id/change_to_cod',
    errorMesssage: `Can't patch data. Please try again`
  });

interface IGetMomoPaymentAddressUrl {
  orderNumber: string;
}

export const getMomoPaymentAddressUrl = ({ orderNumber }: IGetMomoPaymentAddressUrl) => {
  const data = { csrf_token: getCsrfToken() };

  return patch({
    path: `/orders/${orderNumber}/momo/pay`,
    data,
    description: '[Cart] Get momo payment address url id order id'
  });
};

interface IGetOnepayPaymentAddressUrl {
  orderNumber: string;
}

export const getOnepayPaymentAddressUrl = ({ orderNumber }: IGetOnepayPaymentAddressUrl) => {
  const data = { csrf_token: getCsrfToken() };

  return patch({
    path: `/orders/${orderNumber}/onepay/url`,
    data,
    description: '[Cart] Get onepay payment address url id order id'
  });
};

interface IUpdateOnepayPayment {
  orderNumber: string;
  params: string;
}

export const updateOnepayPayment = ({ orderNumber, params }: IUpdateOnepayPayment) => {
  return patch({
    path: `/orders/${orderNumber}/onepay/update`,
    data: { number: orderNumber, result_params: params },
    description: '[Cart] updapte onepay payment'
  });
};

export const updateContactPhone = (data: { number: string }) =>
  patch({
    path: `/cart/contact_phone`,
    data,
    description: '[Cart] Update contact phone /cart/contact_phone',
    errorMesssage: `Can't update contact phone. Please try again`
  });

export const fetchAccompanyServices = () => {
  return get({
    path: '/cart/accompany_services',
    description: '[Cart] Fetch accompany services /cart/accompany_services',
    errorMesssage: `Can't fetch accompany services. Please try again`
  });
};

export const updateAccompanyServices = (data: Array<any>) =>
  patch({
    path: `/cart/accompany_services`,
    data,
    description: '[Cart] Update accompany services /cart/accompany_services',
    errorMesssage: `Can't update accompany services. Please try again`
  });

export const deleteAccompanyService = ({ id }: { id: number }) => {
  return del({
    path: `/cart/accompanies/${id}`,
    description: '[Cart] Delete accompany service /cart/accompanies/:id',
    errorMesssage: `Can't delete accompany service. Please try again`
  });
};

interface UpdatePaymentMethod {
  paymentMethodId: number;
}
export const updatePaymentMethod = ({ paymentMethodId }: UpdatePaymentMethod) =>
  patch({
    path: `/cart/payment_method`,
    data: {
      payment_method: paymentMethodId,
      csrf_token: getCsrfToken()
    },
    description: '[Cart] Update payment method /cart/payment_method',
    errorMesssage: `Can't update payment method. Please try again`
  });

export const getCartReferralSchemesApi = () => {
  return get({
    path: `/cart/referral_schemes`,
    description: '[Cart] Get cart referral schemes /cart/referral_schemes',
    errorMesssage: `Can't get cart referral schemes. Please try again`
  });
};

export interface ApplyCartReferralSchemeApiParams {
  code: string;
  schemeId: number;
}
export const applyCartReferralSchemeApi = ({ code, schemeId }: ApplyCartReferralSchemeApiParams) => {
  return post({
    path: `/cart/referral_schemes`,
    data: { scheme_id: schemeId, referral_code: code },
    description: '[Cart] Apply cart referral scheme /cart/referral_schemes',
    errorMesssage: `Can't apply cart referral scheme. Please try again`
  });
};

export interface ToggleApplyBalanceStatusApiProps {
  enabled: boolean;
}
export const toggleApplyBalanceStatusApi = (params: ToggleApplyBalanceStatusApiProps) =>
  patch({
    path: `/cart/apply_balance`,
    data: params,
    description: '[Cart] Toggle apply balance status /cart/apply_balance',
    errorMesssage: `Can't toggle apply balance status. Please try again`
  });
