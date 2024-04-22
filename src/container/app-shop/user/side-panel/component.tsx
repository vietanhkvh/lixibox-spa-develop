import { useEffect } from 'react';

import { CartState } from 'flows/cart/types';
import { LixicoinState } from 'flows/lixicoin/types';
import { SIGN_IN_STATE } from 'constants/application/global';
import { GetReferralSchemesActionParams } from 'flows/referral/action';
import { ReferralState } from 'flows/referral/types';

import View from './view';

// TODO: Refactor. Extracted from user/panel as is

interface SidePanelProps {
  onMount?: () => any;

  location?: any;
  history?: any;
  children: any;
  match: any;
  authStore: any;
  cartStore: CartState;
  userStore: any;
  referralStore: ReferralState;
  orderStore: any;
  lixiCoinStore: LixicoinState;

  fetchUserProfileAction: any;
  fetchUserOrderCountAction: any;
  getReferralSchemesAction: (data: GetReferralSchemesActionParams) => any;
  getBirthdayOrder: (data) => any;
  getMembershipAction: () => any;
  openAlertAction: any;

  clearDataUserTransactionListAction?: any;
  clearDataUserOrderListAction?: any;
  clearDataUserProfileAction?: any;
  clearDataUserReferrerProfileAction?: any;
  clearDataUserWaitListAction?: any;
  clearDataUserWatchedListAction?: any;
}
const SidePanel = ({
  onMount,
  authStore,
  authStore: { signInStatus },
  cartStore,
  userStore,
  referralStore,
  orderStore,
  lixiCoinStore,
  openAlertAction,
  fetchUserOrderCountAction,
  fetchUserProfileAction,
  getReferralSchemesAction,
  getMembershipAction,
  getBirthdayOrder,
  clearDataUserTransactionListAction,
  clearDataUserOrderListAction,
  clearDataUserProfileAction,
  clearDataUserReferrerProfileAction,
  clearDataUserWaitListAction,
  clearDataUserWatchedListAction
}: SidePanelProps) => {
  const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1).getTime() / 1000;
  const currentYear = Math.floor(new Date().getTime() / 1000);
  const data = {
    startAt: firstDayCurrentYear,
    endAt: currentYear
  };
  useEffect(() => {
    onMount && onMount();
    getReferralSchemesAction({ status: 'available' });

    if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
      fetchUserProfileAction();
      fetchUserOrderCountAction();
      getBirthdayOrder(data);
      getMembershipAction();
    }

    return () => {
      clearDataUserTransactionListAction();
      clearDataUserOrderListAction();
      clearDataUserProfileAction();
      clearDataUserReferrerProfileAction();
      clearDataUserWaitListAction();
      clearDataUserWatchedListAction();
    };
  }, []);

  return (
    <View
      {...{
        authStore,
        cartStore,
        userStore,
        lixiCoinStore,
        referralStore,
        openAlertAction,
        orderStore
      }}
    />
  );
};

export default SidePanel;
