import { connect } from 'react-redux';

import { toggleDiscountCodeGiftModalVisibilityAction } from '../../../../../../flows/cart/action';
import DiscountCodeGiftModal from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  toggleDiscountCodeGiftModalVisibilityAction: (data) => dispatch(toggleDiscountCodeGiftModalVisibilityAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeGiftModal);
