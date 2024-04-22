import { connect } from 'react-redux';

import { openAlertAction } from '../../../flows/alert/action';
import { closeModalAction } from '../../../flows/modal/action';

import DeliveryForm from './component';

export const mapStateToProps = (state) => ({
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({
  closeModalAction: () => dispatch(closeModalAction()),
  openAlertAction: (data: any) => dispatch(openAlertAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DeliveryForm);
