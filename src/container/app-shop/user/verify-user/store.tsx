import { ConnectedProps, connect } from 'react-redux';
import { requestOtpAction } from 'flows/auth/action';
import { RootState } from 'types/redux';
import VerifyUser from './component';

const mapStateToProps = (state: RootState) => ({
  authStore: state.auth
});

const mapDispatchToProps = {
  requestOtpAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(VerifyUser);
