import { connect } from 'react-redux';

import { fetchStoresAction } from '../../../flows/cart/action';
import Stores from './component';

const mapStateToProps = (state) => ({
  cartStore: state.cart
});
const mapDispatchToProps = (dispatch) => ({
  fetchStoresAction: () => dispatch(fetchStoresAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Stores);
