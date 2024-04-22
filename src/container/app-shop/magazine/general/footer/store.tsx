import { connect } from 'react-redux';

import Footer from './container';

const mapStateToProps = (state) => ({
  cartStore: state.cart
});
const mapDispatchToProps = (dispatch) => ({});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Footer);
