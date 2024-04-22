import { ConnectedProps, connect } from 'react-redux';
import { fetchBannerAction } from 'flows/banner/action';
import { RootState } from 'types/redux';
import LixicoinRedeemPrompt from './container';

export const mapStateToProps = (state: RootState) => ({
  bannerStore: state.banner,
  authStore: state.auth,
  cartStore: state.cart
});
const mapDispatchToProps = { fetchBannerAction };

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LixicoinRedeemPrompt);
