import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import { fetchUserProfileAction } from 'flows/auth/action';
import { getUserMembershipAction } from 'flows/user/action';
import { fetchBannerAction } from 'flows/banner/action';
import { getMembershipAction } from 'flows/lixicoin/action';
import LixicoinDashboard from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  bannerStore: state.banner,
  lixicoinStore: state.lixicoin
});
const mapDispatchToProps = {
  fetchBannerAction,
  fetchUserProfileAction,
  getMembershipAction,
  getUserMembershipAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LixicoinDashboard);
