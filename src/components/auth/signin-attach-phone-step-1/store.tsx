import { ConnectedProps, connect } from 'react-redux';

import { closeModalAction } from 'flows/modal/action';
import { requestOtpAction, signInAction } from 'flows/auth/action';
import { fetchConstantsAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import SigninAttachPhoneStep1 from './component';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth
});

export const mapDispatchToProps = {
  closeModalAction,
  signInAction,
  fetchConstantsAction,
  requestOtpAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SigninAttachPhoneStep1);
