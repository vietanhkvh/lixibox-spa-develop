import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import LixicoinRedeemPrompt from './container';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart
});

const connector = connect(mapStateToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LixicoinRedeemPrompt);
