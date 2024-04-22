import { ConnectedProps, connect } from 'react-redux';

import { addItemToCartAction } from '../../../flows/cart/action';
import { removeFromWaitListAction } from '../../../flows/shop/action';
import { fetchUserWaitListAction } from '../../../flows/user/action';
import { openModalAction } from '../../../flows/modal/action';
import { openAlertAction } from '../../../flows/alert/action';
import { RootState } from 'types/redux';
import WaitlistProductItem from './container';

export const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart,
  shopStore: state.shop
});

export const mapDispatchToProps = {
  addItemToCartAction,
  removeFromWaitListAction,
  fetchUserWaitListAction,
  openModalAction,
  openAlertAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WaitlistProductItem);
