import { connect } from 'react-redux';

import { showHideCartSumaryLayoutAction } from 'flows/cart/action';
import ItemProduct from './component';

const mapStateToProps = (state) => ({
  authStore: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  showHideCartSumaryLayoutAction: (data) => dispatch(showHideCartSumaryLayoutAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ItemProduct);
