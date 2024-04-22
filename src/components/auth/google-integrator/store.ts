import { ConnectedProps, connect } from 'react-redux';
import GoogleIntegrator from './component';
import { unlinkSocialAccountAction } from 'flows/auth/action';
import { RootState } from 'types/redux';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth
});

const mapDispatchToProps = {
  unlinkSocialAccountAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GoogleIntegrator);
