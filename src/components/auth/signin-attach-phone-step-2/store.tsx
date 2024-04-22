import { ConnectedProps, connect } from 'react-redux';

import { closeModalAction } from 'flows/modal/action';
import { attachPhoneAction, signInAction } from 'flows/auth/action';
import { getCartAction } from 'flows/cart/action';
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
  getCartAction,
  attachPhoneAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SigninAttachPhoneStep1);
