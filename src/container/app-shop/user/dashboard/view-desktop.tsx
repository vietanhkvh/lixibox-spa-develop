import { SIGN_IN_STATE } from '../../../../constants/application/global';
import SignIn from '../../../../components/auth/sign-in';

const renderView = ({ props, state }) => {
  const {
    authStore: { signInStatus }
  } = props;

  if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) return null;

  return <SignIn />;
};

export default renderView;
