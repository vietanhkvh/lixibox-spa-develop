import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import component from './component';

const mapStateToProps = (state) => ({ cartStore: state.cart });
const mapDispatchToProps = (_) => ({});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(component));
