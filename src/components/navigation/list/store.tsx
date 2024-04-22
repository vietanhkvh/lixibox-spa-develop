import { connect } from 'react-redux';

import { signOutAction } from '../../../flows/auth/action';
import { clearCartAction } from '../../../flows/cart/action';

import UserPanelContainer from './container';

const mapStateToProps = (state) => ({
  userStore: state.user
});

const mapDispatchToProps = (dispatch) => ({
  signOut: (): void => dispatch(signOutAction()),
  clearCart: (): void => dispatch(clearCartAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UserPanelContainer);
