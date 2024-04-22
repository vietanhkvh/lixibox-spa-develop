import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import AddressBlock from './component';
import {
  checkSameDayShippingAction,
  checkoutAction,
  checkoutAddressAction,
  deliveryChooseAddressAction,
  fetchStoresAction,
  resetCheckoutPhaseReadiness
} from 'flows/cart/action';
import { fetchUserAddressListAction, saveAddressSelected } from 'flows/address/action';

const mapStateToProps = (state: RootState) => ({
  addressStore: state.address,
  authStore: state.auth,
  cartStore: state.cart
});

const mapDispatchToProps = {
  checkoutAction,
  checkoutAddressAction,
  checkSameDayShippingAction,
  deliveryChooseAddressAction,
  fetchStoresAction,
  fetchUserAddressListAction,
  saveAddressSelected,
  resetCheckoutPhaseReadiness
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddressBlock);
