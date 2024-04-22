import { PURCHASE_TYPE } from '../../constants/application/purchase';
import { currenyFormat, formatCurrency, formatCartItemPrice, CustomCurrencyType } from '../currency';

test('[Utils Function] Format currency', () => {
  /** With currency */
  expect(currenyFormat(0, 'currency')).toBe('0 ₫');
  expect(currenyFormat(999, 'currency')).toBe('999 ₫');
  expect(currenyFormat(1000000, 'currency')).toBe('1.000.000 ₫');

  /** With coin */
  expect(currenyFormat(0, 'coin')).toBe('0 Lixicoin');
  expect(currenyFormat(999, 'coin')).toBe('999 Lixicoin');
  expect(currenyFormat(1000000, 'coin')).toBe('1.000.000 Lixicoin');

  /** With unvalid value */
  expect(currenyFormat(-1, 'currency')).toBe('0');
  expect(currenyFormat('abcd', 'currency')).toBe('0');

  /** With default value */
  expect(currenyFormat(1)).toBe('1 ₫');
});

test('[Utils Function] formatCurrency', () => {
  /** No suffix */
  expect(formatCurrency(0)).toBe('0');
  expect(formatCurrency(999)).toBe('999');
  expect(formatCurrency(1000000)).toBe('1.000.000');
  expect(formatCurrency(-1)).toBe('-1');
  expect(formatCurrency(-999)).toBe('-999');
  expect(formatCurrency(-1000000)).toBe('-1.000.000');

  /** With suffix */
  expect(formatCurrency(0, { suffix: true })).toEqual('0\xa0₫');
  expect(formatCurrency(0, { suffix: true })).toBe('0\xa0₫');
  expect(formatCurrency(999, { suffix: true })).toBe('999\xa0₫');
  expect(formatCurrency(1000000, { suffix: true })).toBe('1.000.000\xa0₫');
  expect(formatCurrency(-1, { suffix: true })).toBe('-1\xa0₫');
  expect(formatCurrency(-999, { suffix: true })).toBe('-999\xa0₫');
  expect(formatCurrency(-1000000, { suffix: true })).toBe('-1.000.000\xa0₫');

  /** With custom currency suffix */
  expect(formatCurrency(0, { suffix: CustomCurrencyType.LIXICOIN })).toBe('0 Lixicoin');
  expect(formatCurrency(999, { suffix: CustomCurrencyType.LIXICOIN })).toBe('999 Lixicoin');
  expect(formatCurrency(1000000, { suffix: CustomCurrencyType.LIXICOIN })).toBe('1.000.000 Lixicoin');
  expect(formatCurrency(-1, { suffix: CustomCurrencyType.LIXICOIN })).toBe('-1 Lixicoin');
  expect(formatCurrency(-999, { suffix: CustomCurrencyType.LIXICOIN })).toBe('-999 Lixicoin');
  expect(formatCurrency(-1000000, { suffix: CustomCurrencyType.LIXICOIN })).toBe('-1.000.000 Lixicoin');
});

test('[Utils Function] formatCartItemPrice', () => {
  /** Regular scenarios */
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.NORMAL, price: 1999999 })).toBe('1.999.999\xa0₫');
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.ADDON, price: 1999999 })).toBe('1.999.999\xa0₫');
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.REDEEM, coins: 1999999 })).toBe('1.999.999 Lixicoin');
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.GIFT, price: 1999999 })).toBe(null);
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.GIFT, coins: 1999999 })).toBe(null);
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.SAMPLE, price: 1999999 })).toBe(null);
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.SAMPLE, coins: 1999999 })).toBe(null);
  expect(formatCartItemPrice({ purchase_type: -1, price: 1999999 })).toBe(null);
  expect(formatCartItemPrice({ purchase_type: -1, coins: 1999999 })).toBe(null);

  /** Unrelated property inclusion */
  expect(
    formatCartItemPrice({
      purchase_type: PURCHASE_TYPE.NORMAL,
      price: 1999999,
      cat: 'Tom',
      mouse: 'Jerry'
    } as any)
  ).toBe('1.999.999\xa0₫');

  /** Missing price */
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.NORMAL })).toBe('NaN\xa0₫');
  expect(formatCartItemPrice({ purchase_type: PURCHASE_TYPE.SAMPLE })).toBe(null);
  expect(formatCartItemPrice({ purchase_type: -1 })).toBe(null);
});
