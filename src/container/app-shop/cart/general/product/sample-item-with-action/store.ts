import { connect } from 'react-redux';
import SampleItemWithAction from './component';

const mapStateToProps = (state) => ({ cartStore: state.cart });

export default connect<any, any, any>(mapStateToProps)(SampleItemWithAction);
