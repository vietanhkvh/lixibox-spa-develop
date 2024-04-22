import { ConnectedProps, connect } from 'react-redux';
import { fetchTaxCodeDetail } from 'flows/cart/action';
import { RootState } from 'types/redux';
import InvoiceFormModal from './component';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart
});
export const mapDispatchToProps = {
  fetchTaxCodeDetail
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(InvoiceFormModal);
