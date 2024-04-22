import { connect } from 'react-redux';
import component from './component';

import { updateOnepayPayment } from '../../../../flows/cart/action';

export const mapStateToProps = (state) => ({
  cartStore: state.cart
});
export const mapDispatchToProps = (dispatch) => ({
  updateOnepayPayment: (data: any) => dispatch(updateOnepayPayment(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(component);
