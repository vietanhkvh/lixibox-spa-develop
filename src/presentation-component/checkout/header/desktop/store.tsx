// TODO: Move out of presentation-component
import { connect } from 'react-redux';
import CheckoutContainer from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart, appStore: state.app });
export default connect<any, any, any>(mapStateToProps)(CheckoutContainer);
