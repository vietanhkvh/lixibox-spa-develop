import { connect } from 'react-redux';

import { toggleDiscountCodeAddonModalVisibilityAction } from '../../../../../../flows/cart/action';
import DiscountCodeAddonModal from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  toggleDiscountCodeAddonModalVisibilityAction: (data) => dispatch(toggleDiscountCodeAddonModalVisibilityAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeAddonModal);
