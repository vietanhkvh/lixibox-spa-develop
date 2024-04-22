import { connect } from 'react-redux';
import { openAlertAction } from 'flows/alert/action';
import VerifyEmail from './component';
import { updatePasswordByOtpAction } from 'flows/auth/action';

const mapStateToProps = (state) => ({
  authStore: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  updatePasswordByOtpAction: (data) => dispatch(updatePasswordByOtpAction(data)),
  openAlertAction: (data: any) => dispatch(openAlertAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(VerifyEmail);
