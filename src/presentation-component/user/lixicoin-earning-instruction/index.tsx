import {
  ROUTING_SHOP_INDEX,
  ROUTING_USER_INVITE,
  ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT,
  ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW
} from 'routings/path';
import { ConstantsStateReferrerReward, ConstantsStateUnboxingReward } from 'flows/cart/types';
import GetMoreCoin from './sub-components/get-more-coin';
import { tracking } from './tracking';

const coinSavingStep = (unboxing_reward, referrer_reward) => {
  const unboxCoins = unboxing_reward?.coins || 0;
  const referCoins = referrer_reward?.coins || 0;
  return [
    {
      link: ROUTING_SHOP_INDEX,
      title: 'Tham gia mua hàng',
      content: [
        {
          text: 'Nhận'
        },
        {
          isBold: true,
          text: '1'
        },
        {
          text: 'Lixicoin cho mỗi 1.000 VNĐ khi mua hàng'
        }
      ],
      icon: 'cart',
      iconWidth: 33,
      action: 'Mua sắm ngay',
      tracking: tracking.clickOn.coinSavingShop
    },
    {
      link: `${ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW}`,
      title: 'Chia sẻ Link đập hộp',
      type: 'unboxing-sharing',
      icon: 'heart-box',
      iconWidth: 41,
      content: [
        {
          text: 'Nhận đến '
        },
        {
          isBold: true,
          text: `${unboxCoins}`
        },
        {
          text: 'Lixicoin khi chia sẻ hình ảnh, video đập hộp lên Lixibox Feed'
        }
      ],
      action: 'Đập hộp ngay',
      tracking: tracking.clickOn.coinSavingUnboxing
    },
    {
      link: `${ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT}`,
      title: 'Đánh giá sản phẩm',
      icon: 'rating-stage',
      iconWidth: 47,
      content: [
        {
          text: 'Nhận'
        },
        {
          isBold: true,
          text: '10'
        },
        {
          text: 'Lixicoin cho mỗi đánh giá sản phẩm đã mua'
        }
      ],
      action: 'Đánh giá ngay',
      tracking: tracking.clickOn.coinSavingRating
    },
    {
      link: ROUTING_USER_INVITE,
      title: 'Giới thiệu bạn bè',
      icon: 'invite-email',
      iconWidth: 35,
      content: [
        {
          text: 'Nhận'
        },
        {
          isBold: true,
          text: `${referCoins}`
        },
        {
          text: 'Lixicoin cho mỗi đơn hàng giới thiệu thành công'
        }
      ],

      action: 'Giới thiệu ngay',
      tracking: tracking.clickOn.coinSavingInvite
    }
  ];
};

const filterUnboxingOnCoinSavingStep = ({ unboxingEnabled, coinSavingStep, earnRate }) => {
  const newCoinSavingStep = coinSavingStep
    .map((c, i) => {
      if (i === 0) c.content[1].text = earnRate;
      return c;
    })
    .filter((item) => {
      if ('unboxing-sharing' !== item.type) return true;
      return !!unboxingEnabled;
    });

  return newCoinSavingStep;
};

interface LixicoinEarningInstructionProps {
  /**
   * constants.unboxing_enabled
   */
  isUnboxingEnabled: boolean;
  /**
   * constants.unboxing_reward
   */
  unboxingReward: ConstantsStateUnboxingReward;
  /**
   * constants.referrer_reward
   */
  referrerReward: ConstantsStateReferrerReward;
  /**
   * lixicoinStore.membershipInfo[authStore.userInfo.membership_level].benefits.lixicoin_earn_rate
   */
  earnRate: number;
}
/**
 * NOTE: This is a FC adaptation of a legacy component
 * TODO: Refactor spaghetti code
 */
const LixicoinEarningInstruction = ({
  isUnboxingEnabled,
  unboxingReward,
  referrerReward,
  earnRate
}: LixicoinEarningInstructionProps) => {
  return (
    <GetMoreCoin
      coinSavingStep={filterUnboxingOnCoinSavingStep({
        unboxingEnabled: isUnboxingEnabled,
        coinSavingStep: coinSavingStep(unboxingReward, referrerReward),
        earnRate
      })}
    />
  );
};

export type { LixicoinEarningInstructionProps };
export default LixicoinEarningInstruction;
