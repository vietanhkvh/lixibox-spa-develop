import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { addDiscountCodeAction, fetchSuggestionDiscountCodesAction } from '../../../flows/cart/action';
import { fetchUserPersonalDiscountCodesAction, fetchUserVouchersAction } from '../../../flows/user/action';
import { popErrorAction } from '../../../flows/error/action';
import DiscountCodeTabs from './component';

const mapStateToProps = (state) => ({
  authStore: state.auth,
  cartStore: state.cart,
  errorStore: state.error,
  userStore: state.user
});

const mapDispatchToProps = (dispatch) => ({
  addDiscountCodeAction: (data, meta) => dispatch(addDiscountCodeAction(data, meta)),
  popErrorAction: (data) => dispatch(popErrorAction(data)),
  fetchUserPersonalDiscountCodesAction: (data) => dispatch(fetchUserPersonalDiscountCodesAction(data)),
  fetchUserVouchersAction: (data) => dispatch(fetchUserVouchersAction(data)),
  fetchSuggestionDiscountCodesAction: () => dispatch(fetchSuggestionDiscountCodesAction())
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeTabs));
