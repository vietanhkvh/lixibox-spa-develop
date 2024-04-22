import { connect } from 'react-redux';
import DiscountCodePrompts from './component';
import {
  toggleDiscountCodeGiftModalVisibilityAction,
  toggleDiscountCodeAddonModalVisibilityAction
} from '../../../../../../flows/cart/action';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
const mapDispatchToProps = (dispatch) => ({
  toggleDiscountCodeGiftModalVisibilityAction: (data) => dispatch(toggleDiscountCodeGiftModalVisibilityAction(data)),
  toggleDiscountCodeAddonModalVisibilityAction: (data) => dispatch(toggleDiscountCodeAddonModalVisibilityAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodePrompts);
