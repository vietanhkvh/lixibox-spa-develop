import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import { fetchUserProfileAction } from 'flows/auth/action';
import { fetchUserExclusiveCashbackBoxesAction } from 'flows/user/action';
import { fetchBannerAction } from 'flows/banner/action';
import { getMembershipAction } from 'flows/lixicoin/action';
import BalancesDashboard from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  bannerStore: state.banner,
  lixicoinStore: state.lixicoin,
  userStore: state.user
});

const mapDispatchToProps = {
  fetchBannerAction,
  fetchUserExclusiveCashbackBoxesAction,
  fetchUserProfileAction,
  getMembershipAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BalancesDashboard);
