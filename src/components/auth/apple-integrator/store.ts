import { ConnectedProps, connect } from 'react-redux';
import { setAppleSigninStateAction, unlinkSocialAccountAction } from 'flows/auth/action';
import { RootState } from 'types/redux';
import AppleIntegrator from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth
});

const mapDispatchToProps = {
  setAppleSigninStateAction,
  unlinkSocialAccountAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppleIntegrator);
