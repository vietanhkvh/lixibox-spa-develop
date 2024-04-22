import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { openAlertAction } from 'flows/alert/action';
import { getReferralSchemesAction, GetReferralSchemesActionParams } from 'flows/referral/action';
import {
  clearDataUserTransactionListAction,
  clearDataUserOrderListAction,
  clearDataUserProfileAction,
  clearDataUserReferrerProfileAction,
  clearDataUserWaitListAction,
  clearDataUserWatchedListAction,
  fetchUserOrderCountAction
} from 'flows/user/action';
import { fetchUserProfileAction } from 'flows/auth/action';
import { getMembershipAction } from 'flows/lixicoin/action';
import { getOrderBirthdayReceived } from 'flows/order/action';

import SidePanel from './component';

const mapStateToProps = (state) => ({
  authStore: state.auth,
  userStore: state.user,
  cartStore: state.cart,
  referralStore: state.referral,
  orderStore: state.order,
  lixiCoinStore: state.lixicoin
});

const mapDispatchToProps = (dispatch) => ({
  openAlertAction: (data: any) => dispatch(openAlertAction(data)),
  fetchUserProfileAction: () => dispatch(fetchUserProfileAction()),
  fetchUserOrderCountAction: () => dispatch(fetchUserOrderCountAction()),
  getReferralSchemesAction: (data: GetReferralSchemesActionParams) => dispatch(getReferralSchemesAction(data)),
  getBirthdayOrder: (data) => dispatch(getOrderBirthdayReceived(data)),

  clearDataUserTransactionListAction: () => dispatch(clearDataUserTransactionListAction()),
  clearDataUserOrderListAction: () => dispatch(clearDataUserOrderListAction()),
  clearDataUserProfileAction: () => dispatch(clearDataUserProfileAction()),
  clearDataUserReferrerProfileAction: () => dispatch(clearDataUserReferrerProfileAction()),
  clearDataUserWaitListAction: () => dispatch(clearDataUserWaitListAction()),
  clearDataUserWatchedListAction: () => dispatch(clearDataUserWatchedListAction()),
  getMembershipAction: () => dispatch(getMembershipAction())
});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SidePanel));
