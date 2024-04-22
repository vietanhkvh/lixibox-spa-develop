import { connect } from 'react-redux';

import SampleRedeemPrompt from './container';

export const mapStateToProps = (state) => ({ cartStore: state.cart });

export const mapDispatchToProps = (dispatch) => ({});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SampleRedeemPrompt);
