import { connect } from 'react-redux';
import DiscountCodeGiftItemWithAction from './component';
import { selectGiftAction } from '../../../../../../flows/cart/action';

const mapStateToProps = (state) => ({ cartStore: state.cart });
const mapDispatchToProps = (dispatch) => ({
  selectGiftAction: (data) => dispatch(selectGiftAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeGiftItemWithAction);
