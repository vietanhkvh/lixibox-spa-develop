import { connect } from 'react-redux';
import CartProductsBrief from './component';

export const mapStateToProps = (state) => ({ cartStore: state.cart });

export default connect<any, any, any>(mapStateToProps)(CartProductsBrief);
