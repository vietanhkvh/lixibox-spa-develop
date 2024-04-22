import { connect } from 'react-redux';
import AddonSlider from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });

export default connect<any, any, any>(mapStateToProps)(AddonSlider);
