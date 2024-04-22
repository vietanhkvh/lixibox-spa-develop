import { BADGE_POSITION_API_KEYS } from 'constants/application/product';
import { ProductBox, ProductBoxBadgeItemResponse } from 'types/api/shop';
import { formatCurrency } from 'utils/currency';

/**
 * Decorate the cashback rebate value
 *
 * If the price is less than 10000, return the rebate as a percentage
 * Else, return the rebate as a currency
 */
export const decorateCashbackRebate = ({ price, rebate }: { price: number; rebate: number }): string => {
  return price < 10000 ? `${String((rebate / price) * 100)}%` : `${formatCurrency(rebate, { suffix: true })}`;
};

/**
 * Aggregates all badges from all positions
 */
export const getBoxBadges = (box: ProductBox): ProductBoxBadgeItemResponse[] => {
  try {
    let badges: ProductBoxBadgeItemResponse[] = [];
    if (!box?.badge) return badges;

    BADGE_POSITION_API_KEYS.forEach((positionKey) => {
      const badgesInPosition = Array.isArray(box.badge[positionKey]) ? box.badge[positionKey] : [];
      badges = [...badges, ...badgesInPosition];
    });

    return badges;
  } catch (error) {
    return [];
  }
};
