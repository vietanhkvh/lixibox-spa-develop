import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import { fetchUserProfileAction } from 'flows/auth/action';
import { getUserMembershipAction } from 'flows/user/action';
import { getMembershipAction } from 'flows/lixicoin/action';
import { fetchRedeemLatestBoxesAction } from 'flows/shop/action';
import LixicoinDashboard from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  lixicoinStore: state.lixicoin,
  shopStore: state.shop,
  userStore: state.user
});
const mapDispatchToProps = {
  fetchRedeemLatestBoxesAction,
  fetchUserProfileAction,
  getMembershipAction,
  getUserMembershipAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LixicoinDashboard);
