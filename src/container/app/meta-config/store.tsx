import { connect } from 'react-redux';

import MetaConfig from './container';

const mapStateToProps = (state) => ({
  metaStore: state.meta,
  cartStore: state.cart
});

const mapDispatchToProps = (dispatch) => ({});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MetaConfig);
