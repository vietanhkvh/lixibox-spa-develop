import BoxMessage from 'components/box-message';
import UserInfo from 'components/user/user-info';
import { DISCOUNT_CODE_TAB } from 'constants/application/discount-code';
import { SIGN_IN_STATE } from 'constants/application/global';
import { CartState } from 'flows/cart/types';
import { LixicoinState } from 'flows/lixicoin/types';
import { ReferralState } from 'flows/referral/types';
import {
  ROUTING_COMMUNITY_USER_FEED_PATH,
  ROUTING_VOUCHERS_PATH,
  ROUTING_USER_INVITE,
  ROUTING_USER_INVITE_HISTORY
} from 'routings/path';
import { objectToHash, checkMessageReminder, checkUserInfoFields } from 'utils';
import FadeIn from '../../../layout/fade-in';
import { OrderNavigation, ListNavWithTitle } from '../dashboard/view-mobile';
import { checkBirthdayGift } from 'utils/generic';

import {
  listOrderNavigation,
  listAccountNavigation,
  listProductNavigation,
  listPromotionNavigation as _listPromotionNavigation,
  listInfoNavigation
} from './initialize';
import STYLE from './style';
import styles from './style.module.scss';

interface ViewProps {
  authStore: any;
  cartStore: CartState;
  userStore: any;
  lixiCoinStore: LixicoinState;
  referralStore: ReferralState;
  openAlertAction: any;
  orderStore: any;
}
const View = ({
  userStore: { orderCount },
  authStore: { signInStatus, profile: user },
  lixiCoinStore: { membershipInfo },
  referralStore: { availableSchemes },
  openAlertAction,
  orderStore: {
    birthdayOrder: { orders, store_orders }
  }
}: ViewProps) => {
  const availableSchemeList = availableSchemes.byQuery[objectToHash({ status: 'available' })] || [];

  const userInfoProps = {
    openAlert: openAlertAction,
    userInfo: user,
    membershipInfo,
    style: STYLE.userInfoContainer
  };
  const isReceivedBirthdayGift = checkBirthdayGift(orders, store_orders);

  const BoxMessageProps = {
    message: checkMessageReminder(user, isReceivedBirthdayGift)
  };
  const isUpdatedAllUserInfoFields = checkUserInfoFields(user);

  const myProfileLink = !!user ? `${ROUTING_COMMUNITY_USER_FEED_PATH}/${user.referral_code}` : '';
  const defaultReferralSchemeRewardMessage = availableSchemeList[0]?.referrer?.reward_message || '';
  const discountCodePromoEntry = {
    icon: 'discount-code',
    title: 'Mã giảm giá',
    badge: 'Hot',
    link: `${ROUTING_VOUCHERS_PATH}?tab=${DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug}`
  };
  const listPromotionNavigation = [
    ..._listPromotionNavigation,
    {
      icon: 'user-plus',
      title: 'Giới thiệu bạn bè',
      description: defaultReferralSchemeRewardMessage ? `Nhận ngay ${defaultReferralSchemeRewardMessage}` : '',
      link: ROUTING_USER_INVITE
    },
    {
      icon: 'user-referral',
      title: 'Lịch sử giới thiệu bạn bè',
      link: ROUTING_USER_INVITE_HISTORY
    }
  ];
  const promotionNavs = Array.isArray(listPromotionNavigation)
    ? [discountCodePromoEntry, ...listPromotionNavigation]
    : [discountCodePromoEntry];

  const isAuthenticatedSession = signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS;

  return (
    <FadeIn style={STYLE.desktopSubContent}>
      {isAuthenticatedSession && (
        <>
          <UserInfo {...userInfoProps} />
          <BoxMessage {...BoxMessageProps} />

          <OrderNavigation
            orderCount={orderCount}
            className={styles.orderNavigation}
            listOrderNavigation={listOrderNavigation}
          />

          {!!listAccountNavigation && (
            <ListNavWithTitle
              className={styles.listNav}
              title={'Tài khoản'}
              list={listAccountNavigation(myProfileLink)}
              isUpdatedAllUserInfoFields={isUpdatedAllUserInfoFields}
            />
          )}
          {!!listProductNavigation && (
            <ListNavWithTitle className={styles.listNav} title={'Sản phẩm'} list={listProductNavigation} />
          )}
        </>
      )}
      {!!promotionNavs && !!listInfoNavigation && (
        <ListNavWithTitle
          isForceToggleOpen={true}
          title={'Thông tin'}
          list={[...promotionNavs, ...listInfoNavigation]}
        />
      )}
    </FadeIn>
  );
};

export default View;
