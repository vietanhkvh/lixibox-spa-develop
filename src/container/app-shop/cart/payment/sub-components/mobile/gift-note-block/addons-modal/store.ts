import { connect } from 'react-redux';

import {
  checkoutAction,
  deliverySetGiftMessage,
  fetchAccompanyServicesAction,
  updateAccompanyServicesAction,
  setAccompaniesLocalAction,
  touchAccompaniesLocalAction,
  selectAccompaniesLocalOptionAction,
  updateAccompaniesLocalNoteAction,
  toggleSelectedAccompaniesLocalAction
} from '../../../../../../../../flows/cart/action';
import AddonsModal from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  checkout: (data: any) => dispatch(checkoutAction(data)),
  deliverySetGiftMessage: (data: any) => dispatch(deliverySetGiftMessage(data)),
  fetchAccompanyServices: () => dispatch(fetchAccompanyServicesAction()),
  updateAccompanyServices: (data: any) => dispatch(updateAccompanyServicesAction(data)),
  setAccompaniesLocalAction: () => dispatch(setAccompaniesLocalAction()),
  touchAccompaniesLocalAction: () => dispatch(touchAccompaniesLocalAction()),
  selectAccompaniesLocalOptionAction: (data: any) => dispatch(selectAccompaniesLocalOptionAction(data)),
  updateAccompaniesLocalNoteAction: (data: any) => dispatch(updateAccompaniesLocalNoteAction(data)),
  toggleSelectedAccompaniesLocalAction: (data: any) => dispatch(toggleSelectedAccompaniesLocalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AddonsModal);
