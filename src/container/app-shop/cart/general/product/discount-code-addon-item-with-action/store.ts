import { connect } from 'react-redux';
import DiscountCodeAddonItemWithAction from './component';
import { selectSpecialAddOnAction, removeItemFromCartAction } from '../../../../../../flows/cart/action';

const mapStateToProps = (state) => ({ cartStore: state.cart });
const mapDispatchToProps = (dispatch) => ({
  selectSpecialAddOnAction: (data) => dispatch(selectSpecialAddOnAction(data)),
  removeItemFromCartAction: (data) => dispatch(removeItemFromCartAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeAddonItemWithAction);
