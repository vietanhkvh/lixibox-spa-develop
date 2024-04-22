import { formatCurrency } from '../../../utils/currency';
import { ReferralSchemeDetailResponse } from '../../../types/api/referral';

export const generateRewardMessage = (scheme: ReferralSchemeDetailResponse) => {
  const rewardMessage = scheme.referee.reward_message || '';
  const minOrderValue = scheme.referee.minimum_order_value || 0;
  const minOrderValueFormatted = formatCurrency(minOrderValue, { suffix: true });
  const conditionalMessage = scheme.referee.conditional_message || '';

  return (
    <>
      Ưu đãi:
      <span>{` ${rewardMessage} `}</span>
      cho đơn hàng đầu tiên
      {conditionalMessage ? <span>{` ${conditionalMessage} `}</span> : ' '}
      với giá trị từ
      <span>{` ${minOrderValueFormatted}`}</span>
    </>
  );
};
