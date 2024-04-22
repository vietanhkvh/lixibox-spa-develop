import { connect } from 'react-redux';

import { openAlertAction } from '../../../flows/alert/action';
import Quantity from './component';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  openAlertAction: (data: any) => dispatch(openAlertAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Quantity);
