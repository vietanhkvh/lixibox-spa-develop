import {
  closeModalAction,
  pushStateWhenOpeningModalAction,
  backStateWhenClosingModalAction
} from '../../flows/modal/action';
import { openMobileSigninAlertAction } from '../../flows/alert/action';

export const mapStateToProps = (state) => ({
  isShow: state.modal.isShow,
  data: state.modal.data
});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: (): void => dispatch(closeModalAction()),
  openMobileSigninAlert: (): void => dispatch(openMobileSigninAlertAction()),
  pushStateWhenOpeningModalAction: (data) => dispatch(pushStateWhenOpeningModalAction(data)),
  backStateWhenClosingModalAction: () => dispatch(backStateWhenClosingModalAction())
});
