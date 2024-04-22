import { connect } from 'react-redux';
import HorizontalQuantity from './component';

const mapStateToProps = (state) => ({
  cartStore: state.cart
});

export default connect<any, any, any>(mapStateToProps)(HorizontalQuantity);
