import { connect } from 'react-redux';

import { deliverySetNoteMessage } from '../../../../../../../flows/cart/action';
import DeliveryNoteBlock from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  deliverySetNoteMessage: (data) => dispatch(deliverySetNoteMessage(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DeliveryNoteBlock);
