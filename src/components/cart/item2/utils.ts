import { PURCHASE_TYPE } from 'constants/application/purchase';
import { CartItem } from 'types/api/cart';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';

export const formatPrice = ({ price, coins, purchase_type }) => {
  switch (purchase_type) {
    case PURCHASE_TYPE.NORMAL:
    case PURCHASE_TYPE.ADDON:
      return formatCurrency(price, { suffix: true });
    case PURCHASE_TYPE.REDEEM:
      return formatCurrency(coins, { suffix: CustomCurrencyType.COIN });
    default:
      return 'FREE';
  }
};

export const formatOriginalPrice = ({ price, original_price, gift_price, purchase_type }) => {
  switch (purchase_type) {
    case PURCHASE_TYPE.NORMAL:
    case PURCHASE_TYPE.ADDON:
      if (price === original_price) return null;
      return formatCurrency(original_price, { suffix: true });
    case PURCHASE_TYPE.REDEEM:
      return null;
    default:
      return gift_price ? formatCurrency(gift_price, { suffix: true }) : null;
  }
};

interface GetGiftTagReturn {
  type: string;
  message: string;
  color?: string;
}
export const getGiftTag = (cartItem: CartItem): GetGiftTagReturn | null => {
  if (cartItem?.box_type?.type === 'membership_gift') {
    return {
      type: 'membership',
      message: 'Quà tặng thành viên',
      color: 'primary'
    };
  }

  if (cartItem?.box_type?.type === 'birthday_gift') {
    return {
      type: 'birthday',
      message: 'Quà sinh nhật',
      color: 'primary'
    };
  }

  switch (cartItem?.purchase_type) {
    case PURCHASE_TYPE.GIFT:
      return {
        type: 'gift',
        message: 'Quà tặng',
        color: 'greenBold'
      };
    case PURCHASE_TYPE.SAMPLE:
      return {
        type: 'sample',
        message: 'Dùng thử miễn phí',
        color: 'greenBold'
      };
    case PURCHASE_TYPE.REDEEM:
      return {
        type: 'redeem',
        message: 'Quà Lixicoin',
        color: 'greenBold'
      };
    case PURCHASE_TYPE.ADDON:
      return {
        type: 'addon',
        message: 'Ưu đãi',
        color: 'greenBold'
      };
    default:
      return null;
  }
};
