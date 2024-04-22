import { connect } from 'react-redux';
import DiscountCodeProductRedeemModal from './component';
import {
  toggleDiscountCodeGiftModalVisibilityAction,
  toggleDiscountCodeAddonModalVisibilityAction
} from '../../../../../../flows/cart/action';

const mapStateToProps = (state) => ({ cartStore: state.cart });
const mapDispatchToProps = (dispatch) => ({
  toggleDiscountCodeGiftModalVisibilityAction: (data) => dispatch(toggleDiscountCodeGiftModalVisibilityAction(data)),
  toggleDiscountCodeAddonModalVisibilityAction: (data) => dispatch(toggleDiscountCodeAddonModalVisibilityAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeProductRedeemModal);
