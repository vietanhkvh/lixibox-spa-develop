import { Cart, CartItem } from '../types/api/cart';
import { DISPLAY_ORDER, PURCHASE_TYPE, PurchaseTypeType } from '../constants/application/purchase';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { CartDiscountCodes, RepresentablePromotion } from 'flows/cart/types';
import { CustomCurrencyType, formatCurrency } from './currency';

export const sortedCartItems = (items) => {
  let sortedList: Array<any> = [];
  DISPLAY_ORDER.forEach((purchaseType) => {
    const selectiveList = items?.filter((item) => item.purchase_type === purchaseType);
    selectiveList && sortedList.push(...selectiveList);
  });

  return sortedList;
};

// TODO: Accept `Cart` or `Order` objects
interface GetCartPricingParams {
  cartDetail: Cart;
  isCartView?: boolean;
  isOrderDetailView?: boolean;
}
interface GetCartPricingResult {
  totalPrice: number;
  servicesPrice: number;
  shippingPrice: number;
  applicableBalance: number;
  balanceUsed: number;
  subtotalPrice: number;
  subtotalCoins: number;
  discountPrice: number;
  promotionsPrice: number;
  discountCode: string;
  referralCode: string;
  lixicoinBonus: number;

  // Calculated
  additionalPrice: number;
  totalPriceWithoutAdditional: number;
  balancesUsed: number;

  // Price calculated for Individual view
  cartViewTotalPriceWithoutAdditional: number;
  cartViewBalancedUsed: number;

  // View specific price (calculated based on `isCartView` flag)
  viewSpecificTotalPrice: number;
  viewSpecificBalanceUsed: number;
  viewSpecificBalancesUsed: number;
  viewSpecificSubtotalPrice: number;
  viewSpecificSubtotalCoins: number;
  viewSpecificShippingPrice: number;
  viewSpecificServicesPrice: number;
  viewSpecificDiscountAndPromotionsPrice: number;
  viewSpecificDiscountOrReferralCode: string;
  viewSpecificLixicoinBonus: number;

  // View specific formatted price
  viewSpecificTotalPriceFormatted: string;
  viewSpecificApplicableBalanceFormatted: string;
  viewSpecificBalanceUsedFormatted: string;
  viewSpecificSubtotalPriceFormatted: string;
  viewSpecificSubtotalCoinsFormatted: string;
  viewSpecificShippingPriceFormatted: string;
  viewSpecificServicesPriceFormatted: string;
  viewSpecificDiscountAndPromotionsPriceFormatted: string;
  viewSpecificLixicoinBonusFormatted: string;
  viewSpecificCashbackBonusFormatted: string;
  viewSpecificBalancesUsedFormatted: string;
}
export const getCartPricing = ({
  cartDetail,
  isCartView,
  isOrderDetailView
}: GetCartPricingParams): GetCartPricingResult => {
  const _cartDetail = Object.assign({} as Cart, cartDetail);
  const {
    total_price,
    services_price,
    shipping_price,
    applicable_balance,
    balance_used,
    subtotal_price,
    subtotal_coins,
    discount_price,
    promotions_price,
    discount_code,
    referral_code,
    lixicoin_bonus,
    address_id,
    shipping_package,
    cashback
  } = _cartDetail;
  // Primitive
  const totalPrice = total_price || 0;
  const servicesPrice = services_price || 0;
  const shippingPrice = shipping_price || 0;
  const applicableBalance = applicable_balance || 0;
  const balanceUsed = balance_used || 0;
  const subtotalPrice = subtotal_price || 0;
  const subtotalCoins = subtotal_coins || 0;
  const discountPrice = discount_price || 0;
  const promotionsPrice = promotions_price || 0;
  const discountCode = discount_code || '';
  const referralCode = referral_code || '';
  const lixicoinBonus = lixicoin_bonus || 0;
  const cashbackBonus = cashback?.bonus || 0;

  // Calculated (view agnostic)
  const additionalPrice = servicesPrice + shippingPrice;
  const totalPriceWithoutAdditional = totalPrice - additionalPrice;
  const balancesUsed = balanceUsed;

  // Price calculated for Individual view
  const cartViewTotalPriceWithoutAdditional = Math.max(0, totalPriceWithoutAdditional);
  const cartViewBalancedUsed =
    totalPriceWithoutAdditional < 0 ? balanceUsed + totalPriceWithoutAdditional : balanceUsed;

  // View specific price (calculated based on `isCartView` flag)
  const viewSpecificTotalPrice = isCartView ? cartViewTotalPriceWithoutAdditional : totalPrice;
  const viewSpecificBalanceUsed = isCartView ? cartViewBalancedUsed : balanceUsed;
  const viewSpecificBalancesUsed = viewSpecificBalanceUsed + (cashback?.balance_used || 0);
  const viewSpecificSubtotalPrice = subtotalPrice;
  const viewSpecificSubtotalCoins = subtotalCoins;
  const viewSpecificShippingPrice = shippingPrice;
  const viewSpecificServicesPrice = servicesPrice;
  const viewSpecificDiscountAndPromotionsPrice = discountPrice + promotionsPrice;
  const viewSpecificDiscountOrReferralCode = discountCode || referralCode;
  const viewSpecificLixicoinBonus = lixicoinBonus;

  // View specific formatted price
  const viewSpecificTotalPriceFormatted = formatCurrency(viewSpecificTotalPrice, { suffix: true });
  const viewSpecificApplicableBalanceFormatted = formatCurrency(applicableBalance, { suffix: true });
  const viewSpecificBalanceUsedFormatted = formatCurrency(
    viewSpecificBalanceUsed > 0 ? -viewSpecificBalanceUsed : viewSpecificBalanceUsed,
    { suffix: true }
  );
  const viewSpecificBalancesUsedFormatted = formatCurrency(
    viewSpecificBalancesUsed > 0 ? -viewSpecificBalancesUsed : viewSpecificBalancesUsed,
    { suffix: true }
  );
  const viewSpecificSubtotalPriceFormatted = formatCurrency(viewSpecificSubtotalPrice, { suffix: true });
  const viewSpecificSubtotalCoinsFormatted = formatCurrency(
    viewSpecificSubtotalCoins > 0 ? -viewSpecificSubtotalCoins : viewSpecificSubtotalCoins,
    {
      suffix: CustomCurrencyType.COIN
    }
  );
  const conditionDeliveryFee =
    shipping_package === SHIPPING_TYPE.USER_PICKUP ? true : isOrderDetailView || !!address_id;
  const viewSpecificShippingPriceFormatted = conditionDeliveryFee
    ? viewSpecificShippingPrice
      ? formatCurrency(viewSpecificShippingPrice, { suffix: true })
      : 'Miễn phí'
    : 'Hãy nhập địa chỉ trước';
  const viewSpecificServicesPriceFormatted = formatCurrency(viewSpecificServicesPrice, { suffix: true });
  const viewSpecificDiscountAndPromotionsPriceFormatted = formatCurrency(
    viewSpecificDiscountAndPromotionsPrice > 0
      ? -viewSpecificDiscountAndPromotionsPrice
      : viewSpecificDiscountAndPromotionsPrice,
    {
      suffix: true
    }
  );
  const viewSpecificLixicoinBonusFormatted = `+${formatCurrency(viewSpecificLixicoinBonus, {
    suffix: CustomCurrencyType.COIN
  })}`;
  const viewSpecificCashbackBonusFormatted = `+${formatCurrency(cashbackBonus, { suffix: true })}`;

  return {
    // Primitive
    totalPrice,
    servicesPrice,
    shippingPrice,
    applicableBalance,
    balanceUsed,
    subtotalPrice,
    subtotalCoins,
    discountPrice,
    promotionsPrice,
    discountCode,
    referralCode,
    lixicoinBonus,

    // Calculated (view agnostic)
    additionalPrice,
    totalPriceWithoutAdditional,
    balancesUsed,

    // Price calculated for Individual view
    cartViewTotalPriceWithoutAdditional,
    cartViewBalancedUsed,
    viewSpecificBalancesUsed,

    // View specific price (calculated based on `isCartView` flag)
    viewSpecificTotalPrice,
    viewSpecificBalanceUsed,
    viewSpecificSubtotalPrice,
    viewSpecificSubtotalCoins,
    viewSpecificShippingPrice,
    viewSpecificServicesPrice,
    viewSpecificDiscountAndPromotionsPrice,
    viewSpecificDiscountOrReferralCode,
    viewSpecificLixicoinBonus,

    // View specific formatted price
    viewSpecificTotalPriceFormatted,
    viewSpecificApplicableBalanceFormatted,
    viewSpecificBalanceUsedFormatted,
    viewSpecificSubtotalPriceFormatted,
    viewSpecificSubtotalCoinsFormatted,
    viewSpecificShippingPriceFormatted,
    viewSpecificServicesPriceFormatted,
    viewSpecificDiscountAndPromotionsPriceFormatted,
    viewSpecificLixicoinBonusFormatted,
    viewSpecificCashbackBonusFormatted,
    viewSpecificBalancesUsedFormatted
  };
};

export interface GetRepresentableCartValueParams {
  cart?: Cart;
}
export const getRepresentableCartValue = ({ cart }: GetRepresentableCartValueParams): number => {
  return (cart?.cart_items || []).reduce(
    (total, item) =>
      total +
      ([PURCHASE_TYPE.NORMAL, PURCHASE_TYPE.ADDON].includes(item?.purchase_type)
        ? (item?.price || 0) * (item?.quantity || 1)
        : [PURCHASE_TYPE.GIFT, PURCHASE_TYPE.SAMPLE].includes(item?.purchase_type)
        ? (item?.gift_price || 0) * (item?.quantity || 1)
        : 0),
    0
  );
};

export interface GetRepresentableCartTotalPriceParams {
  cart?: Cart;
}
export const getRepresentableCartTotalPrice = ({ cart }: GetRepresentableCartTotalPriceParams): number => {
  return cart?.total_price || 0;
};

export interface GetRepresentableCartServicePricesParams {
  cart?: Cart;
}
export interface RepresentableCartServicePrice {
  name: string;
  price: number;
  description?: string;
}
export const getRepresentableCartServicePrices = ({
  cart
}: GetRepresentableCartServicePricesParams): [RepresentableCartServicePrice[], number] => {
  const representableServicePrices: RepresentableCartServicePrice[] = [];

  const isShippable = cart?.shipping_package !== SHIPPING_TYPE.USER_PICKUP;
  const originalShippingPrice = cart?.original_shipping_price || 0;

  isShippable &&
    originalShippingPrice > 0 &&
    representableServicePrices.push({
      name: 'Giao hàng',
      price: originalShippingPrice
    });

  const servicePrices = cart?.service_prices || [];
  servicePrices.forEach((service) => {
    service?.service?.name &&
      service?.price &&
      representableServicePrices.push({
        name: service?.service?.name || '',
        price: service?.price || 0,
        description: service?.service?.description
      });
  });

  const totalServicePrice = representableServicePrices.reduce((total, service) => total + service.price, 0);

  return [representableServicePrices, totalServicePrice];
};

export interface GetRepresentableCartPriceReductionsParams {
  cart?: Cart;
}
export interface CartValueReductionItem {
  title: string;
  icon: string;
  value: number;
}
/**
 * Reducible price items
 * - Discount code reduction
 * - Cart items
 *   - PURCHASE_TYPE.ADDON
 *   - PURCHASE_TYPE.REDEEM
 *   - PURCHASE_TYPE.GIFT
 *   - PURCHASE_TYPE.SAMPLE
 * - Cashback
 * - Shipping fee
 */
export const getRepresentableCartPriceReductions = ({
  cart
}: GetRepresentableCartPriceReductionsParams): CartValueReductionItem[] => {
  const reductions: CartValueReductionItem[] = [];

  // Discount code reduction
  (cart?.discount_price || cart?.promotions_price) &&
    reductions.push({
      title: 'Giảm giá',
      icon: 'discount-code',
      value: cart?.discount_price || cart?.promotions_price
    });

  // Cart items
  (cart?.cart_items || [])
    .filter((item) => [PURCHASE_TYPE.GIFT, PURCHASE_TYPE.SAMPLE].includes(item?.purchase_type) && item?.gift_price)
    .forEach((item) => {
      reductions.push({
        title: item?.box?.name || '',
        icon: 'gift',
        value: (item?.gift_price || 0) * (item?.quantity || 1)
      });
    });

  // Cashback
  cart?.cashback?.balance_used &&
    reductions.push({
      title: 'Dùng số dư hoàn tiền',
      icon: 'dollar-time',
      value: cart.cashback.balance_used
    });

  // Shipping fee
  const isShippable = cart?.shipping_package !== SHIPPING_TYPE.USER_PICKUP;
  const shippingFeeSavings = (cart?.original_shipping_price || 0) - (cart?.shipping_price || 0);

  isShippable &&
    shippingFeeSavings > 0 &&
    reductions.push({
      title: 'Giảm phí giao hàng',
      icon: 'delivery',
      value: shippingFeeSavings
    });

  return reductions;
};

export const getMembershipGift = (cartItems: CartItem[]): CartItem | null =>
  cartItems.find((item) => item.box_type?.type === 'membership_gift') || null;
export const getBirthdayGift = (cartItems: CartItem[]): CartItem | null =>
  cartItems.find((item) => item.box_type?.type === 'birthday_gift') || null;

interface CalculateRepresentablePromotionsParams {
  cart: Cart;
  cartDiscountCodes: CartDiscountCodes;
  isRedeemableLoaded: boolean;
  canUserRedeem: boolean;
}
export const calculateRepresentablePromotions = ({
  cart,
  cartDiscountCodes,
  isRedeemableLoaded,
  canUserRedeem
}: CalculateRepresentablePromotionsParams): RepresentablePromotion[] => {
  const representablePromotions: RepresentablePromotion[] = [];

  if (!cart) {
    return representablePromotions;
  }

  // referral
  const isReferralApplied = !!cart?.referral_code || !!cart?.mobile_referral_code;

  representablePromotions.push({
    type: 'referral',
    isReady: true,
    isApplied: isReferralApplied,
    appliedCount: isReferralApplied ? 1 : 0,
    isAnyActionAvailable: false
  });

  // membership
  const membershipGift = getMembershipGift(cart.cart_items || []);
  representablePromotions.push({
    type: 'membership',
    isReady: true,
    isApplied: !!membershipGift,
    appliedCount: !!membershipGift ? 1 : 0,
    isAnyActionAvailable: false
  });

  // birthday
  const birthdayGift = getBirthdayGift(cart.cart_items || []);
  representablePromotions.push({
    type: 'birthday',
    isReady: true,
    isApplied: !!birthdayGift,
    appliedCount: !!birthdayGift ? 1 : 0,
    isAnyActionAvailable: false
  });

  // discountCode
  const isDiscountCodeApplied = !!cart?.discount_code;
  const anyApplicableDiscountCodes = !!(cartDiscountCodes.index || []).filter(
    (discountCode) => discountCode.is_applicable
  ).length;
  representablePromotions.push({
    type: 'discountCode',
    isReady: cartDiscountCodes.loaded,
    isApplied: isDiscountCodeApplied,
    appliedCount: isDiscountCodeApplied ? 1 : 0,
    isAnyActionAvailable: anyApplicableDiscountCodes
  });

  // cashback
  const isCashbackApplied = !!cart?.applied_applicable_balances;
  representablePromotions.push({
    type: 'cashback',
    isReady: true,
    isApplied: isCashbackApplied,
    appliedCount: isCashbackApplied ? 1 : 0,
    isAnyActionAvailable: !!cart?.applicable_balance
  });

  // freeship
  const originalShippingPrice = cart?.original_shipping_price || 0;
  const shippingPrice = cart?.shipping_price || 0;
  const shippingDiscount = originalShippingPrice - shippingPrice;
  representablePromotions.push({
    type: 'freeship',
    isReady: true,
    isApplied: shippingDiscount > 0,
    appliedCount: shippingDiscount > 0 ? 1 : 0,
    isAnyActionAvailable: false
  });

  // redeemable
  const redeemablesInCart = (cart.cart_items || []).filter((item) => item.purchase_type === PURCHASE_TYPE.REDEEM);
  const cartHasRedeemable = !!redeemablesInCart.length;
  const redeemablesCount = redeemablesInCart.reduce((total, item) => total + item.quantity, 0);

  representablePromotions.push({
    type: 'redeemable',
    isReady: isRedeemableLoaded,
    isApplied: cartHasRedeemable,
    appliedCount: redeemablesCount,
    isAnyActionAvailable: cartHasRedeemable || canUserRedeem
  });

  return representablePromotions;
};

export function getPurchaseTypeKeyStrFromValue(value: PurchaseTypeType): string | null {
  for (const key in PURCHASE_TYPE) {
    if (PURCHASE_TYPE[key as keyof typeof PURCHASE_TYPE] === value) {
      return key.toLowerCase();
    }
  }
  return null;
}

export const getCartItemPrice = (item: CartItem): number => {
  if ([PURCHASE_TYPE.NORMAL, PURCHASE_TYPE.ADDON].includes(item.purchase_type)) {
    return (item.price || 0) * (item.quantity || 1);
  }

  return 0;
};
