import { connect } from 'react-redux';
import { fetchConstantsAction } from 'flows/cart/action';
import { clearMaintenanceMode } from 'flows/maintenance/action';
import Page503 from './component';

const mapStateToProps = (state) => ({
  cartStore: state.cart,
  maintenanceStore: state.maintenance
});

const mapDispatchToProps = (dispatch) => ({
  clearMaintenanceMode: () => dispatch(clearMaintenanceMode()),
  fetchConstantsAction: () => dispatch(fetchConstantsAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Page503);
