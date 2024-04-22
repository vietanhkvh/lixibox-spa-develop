import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { ReferralStatisticsAndHistoryResponseRewardHistoryRewardItem } from '../../../flows/referral/types';

export const generateBenefitMessagesFromRewardItems = (
  rewardItems: Array<ReferralStatisticsAndHistoryResponseRewardHistoryRewardItem>
): Array<string> => {
  return rewardItems
    .map((rewardItem) => {
      switch (rewardItem.reward_type) {
        case 'balance':
          return formatCurrency(rewardItem.reward_amount, { suffix: true });
        case 'coin':
          return formatCurrency(rewardItem.reward_amount, { suffix: CustomCurrencyType.LIXICOIN });
        case 'voucher':
          return `Mã giảm giá: ${rewardItem.reward_voucher && rewardItem.reward_voucher.description}`;
        case 'gift':
          return `${rewardItem.reward_box && rewardItem.reward_box.name}`;
        default:
          return '';
      }
    })
    .filter((benefit) => benefit);
};
