import { connect } from 'react-redux';
import { fetchUserAddressListAction } from '../../../../flows/address/action';
import DeliveryContainer from './container';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  fetchUserAddressListAction: () => dispatch(fetchUserAddressListAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DeliveryContainer);
