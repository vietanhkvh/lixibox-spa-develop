import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { RootState } from 'types/redux';
import { closeAlertAction } from '../../flows/alert/action';
import Alert from './container';

export const mapStateToProps = (state: RootState) => ({
  alertStore: state.alert,
  cartStore: state.cart
});

export const mapDispatchToProps = (dispatch) => ({
  closeAlert: (alertId: number) => dispatch(closeAlertAction(alertId))
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Alert));
