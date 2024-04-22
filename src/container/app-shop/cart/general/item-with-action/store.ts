import { ConnectedProps, connect } from 'react-redux';

import { addItemToCartAction, removeItemFromCartAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import ItemWithAction from './container';

export const mapStateToProps = (state: RootState) => ({
  appStore: state.app,
  cartStore: state.cart,
  userStore: state.user
});

export const mapDispatchToProps = {
  addItemToCartAction,
  removeItemFromCartAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ItemWithAction);
