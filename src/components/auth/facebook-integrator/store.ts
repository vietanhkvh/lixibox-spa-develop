import { ConnectedProps, connect } from 'react-redux';
import { unlinkSocialAccountAction } from '../../../flows/auth/action';
import { RootState } from 'types/redux';
import FacebookIntegrator from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart
});

const mapDispatchToProps = {
  unlinkSocialAccountAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FacebookIntegrator);
