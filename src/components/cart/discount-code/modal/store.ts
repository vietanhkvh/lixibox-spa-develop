import { connect } from 'react-redux';
import DiscountCodeModal from './view';
import { addDiscountCodeAction } from '../../../../flows/cart/action';
import { popErrorAction } from '../../../../flows/error/action';
import { openSharedModalAction, OpenSharedModalActionParams } from '../../../../flows/shared-modal/action';

const mapStateToProps = (state) => ({
  authStore: state.auth,
  cartStore: state.cart,
  errorStore: state.error,
  userStore: state.user
});

const mapDispatchToProps = (dispatch) => ({
  addDiscountCodeAction: (data) => dispatch(addDiscountCodeAction(data)),
  popErrorAction: (data) => dispatch(popErrorAction(data)),
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeModal);
