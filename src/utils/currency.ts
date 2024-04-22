import { CartItem } from 'types/api/cart';
import { PURCHASE_TYPE } from '../constants/application/purchase';

// TODO: Refactor
export enum CustomCurrencyType {
  COIN = 'Lixicoin',
  LIXICOIN = 'Lixicoin'
}

/**
 * Format currency to VND
 * @param {number} currency value number of currency
 * @return {string} curency with format
 * TODO: Fix typo
 * @deprecated Use `formatCurrency` instead
 */
export const currenyFormat = (currency: number | any, type: string = 'currency') => {
  /**
   * Validate value
   * - NULL
   * - UNDEFINED
   * NOT A NUMBER
   */
  if (null === currency || 'undefined' === typeof currency || true === isNaN(currency)) {
    return '0';
  }

  /**
   * Validate value
   * < 0
   */
  if (currency < 0) {
    return '0';
  }

  const suffix = 'coin' === type ? ' Lixicoin' : ' ₫';

  return currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + suffix;
};

/**
 * Usage
 * - `formatCurrency(4334453) //=> 4.334.453`
 * - `formatCurrency(4334453, { suffix: true }) //=> 4.334.453 ₫`
 * - `formatCurrency(4334453, { suffix: CustomCurrencyType.COIN }) //=> 4.334.453 coins`
 * - `formatCurrency(4334453, { suffix: CustomCurrencyType.LIXICOIN }) //=> 4.334.453 Lixicoin`
 */
export const formatCurrency = (currency: number, options: { suffix?: true | CustomCurrencyType } = {}) => {
  let formatted: string = `${currency}${options.suffix === true ? ' ₫' : ''}`; // Fallback for some non-standard browsers (e.g. MiUi, QQ, ...)

  if (window.Intl) {
    formatted = Intl.NumberFormat(
      'vi',
      options.suffix === true ? { style: 'currency', currency: 'VND' } : undefined
    ).format(currency);
  }

  return options.suffix === true || options.suffix === undefined ? formatted : `${formatted} ${options.suffix}`;
};

export const formatCartItemPrice = (cartItem: CartItem) => {
  switch (cartItem.purchase_type) {
    case PURCHASE_TYPE.NORMAL:
    case PURCHASE_TYPE.ADDON:
      return formatCurrency(cartItem.price, { suffix: true });
    case PURCHASE_TYPE.REDEEM:
      return formatCurrency(cartItem.coins, { suffix: CustomCurrencyType.COIN });
    case PURCHASE_TYPE.GIFT:
    case PURCHASE_TYPE.SAMPLE:
    default:
      return null;
  }
};
