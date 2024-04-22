import { GiftBox, Scheme } from 'types/api/gwp';
import { formatCurrency } from './currency';
import { unixSecondsNow } from './time';

export const getConditionalMessage = (scheme: Scheme): string => {
  const message = scheme?.condition_message || '';
  if (message) {
    return message;
  }

  const minOrderPrice = scheme?.discount_code?.order_price_min || 0;
  return `Đơn từ ${formatCurrency(minOrderPrice, { suffix: true })}`;
};

export const getBoxPrice = (box: GiftBox) => {
  if (!box) return 0;

  return Math.max(box?.price || 0, box?.original_price || 0);
};

export const getTotalGiftValue = (gifts: GiftBox[]): number => {
  return gifts.reduce((acc, gift) => acc + getBoxPrice(gift), 0);
};

export const getSellableGiftBoxes = (gifts: GiftBox[]): GiftBox[] =>
  (gifts || []).filter((box) => box?.is_saleable && box?.stock);

export const getIsSchemeExpired = (scheme: Scheme): boolean => {
  const discountCodeEndDate = scheme?.discount_code?.end_date || 0;
  return !!discountCodeEndDate && unixSecondsNow() > discountCodeEndDate;
};
