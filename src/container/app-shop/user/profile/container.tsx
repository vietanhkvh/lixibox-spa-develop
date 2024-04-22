import { PureComponent } from 'react';

import { ALERT_CHANGE_PASSWORD_ERROR } from '../../../../constants/application/alert';

import View from './view';
import { IProps } from './model';
import { INITIAL_STATE } from './initialize';
import { removeQueryParamFromCurrentPath } from 'utils/uri';

class ProfileContainer extends PureComponent<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const shouldOpenOtpConfirmationModal = query.get('modal') === 'otpConfirmation';
    const shouldOpenPhoneOtpConfirmationModal = query.get('modal') === 'phoneOtpConfirmation';
    const shouldOpenEmailUpdateModal = query.get('modal') === 'emailUpdate';
    const shouldOpenPhoneUpdateModal = query.get('modal') === 'phoneUpdate';
    if (shouldOpenOtpConfirmationModal) {
      this.setState({
        isOpenOtpModal: true,
        emailInput: {
          value: this.props.authStore?.userInfo?.email || '',
          valid: true
        }
      });
    }
    if (shouldOpenPhoneOtpConfirmationModal) {
      this.setState({
        isOpenPhoneOtpModal: true,
        phoneInput: {
          value: this.props.authStore?.userInfo?.phone || '',
          valid: true
        }
      });
    }
    if (shouldOpenEmailUpdateModal) {
      this.setState({
        isOpenChangeEmailModal: true
      });
    }
    if (shouldOpenPhoneUpdateModal) {
      this.setState({
        isOpenChangePhoneModal: true
      });
    }
    this.props.fetchUserProfileAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { openAlertAction, history, location } = this.props;

    if (nextProps.location.search !== location.search) {
      const query = new URLSearchParams(nextProps.location.search);
      const shouldOpenOtpConfirmationModal = query.get('modal') === 'otpConfirmation';
      const shouldOpenEmailUpdateModal = query.get('modal') === 'emailUpdate';
      const shouldOpenPhoneUpdateModal = query.get('modal') === 'phoneUpdate';
      const shouldOpenPhoneOtpConfirmationModal = query.get('modal') === 'phoneOtpConfirmation';
      if (shouldOpenOtpConfirmationModal) {
        this.setState({
          isOpenOtpModal: true,
          emailInput: {
            value: this.props.authStore?.userInfo?.email || '',
            valid: true
          }
        });
      }
      if (shouldOpenEmailUpdateModal) {
        this.setState({
          isOpenChangeEmailModal: true
        });
      }
      if (shouldOpenPhoneUpdateModal) {
        this.setState({
          isOpenChangePhoneModal: true
        });
      }
      if (shouldOpenPhoneOtpConfirmationModal) {
        this.setState({
          isOpenPhoneOtpModal: true,
          phoneInput: {
            value: this.props.authStore?.userInfo?.phone || '',
            valid: true
          }
        });
      }
    }

    if (
      true === this.props.userStore.isWaitingChangePassword &&
      false === nextProps.userStore.isWaitingChangePassword
    ) {
      if (false === nextProps.userStore.isChangedPasswordSuccess) {
        openAlertAction(ALERT_CHANGE_PASSWORD_ERROR);
      }
    }

    if (
      !!this.props.userStore.isRequestChangeEmailLoading &&
      !nextProps.userStore.isRequestChangeEmailLoading &&
      !this.props.userStore.isRequestChangeEmailSuccess &&
      !!nextProps.userStore.isRequestChangeEmailSuccess
    ) {
      this.setState({
        isOpenChangeEmailModal: false,
        isOpenOtpModal: true
      });
    }

    if (
      !!this.props.authStore.phoneVerificationOtpRequest.requesting &&
      !nextProps.authStore.phoneVerificationOtpRequest.requesting &&
      !nextProps.authStore.phoneVerificationOtpRequest.errored
    ) {
      this.setState({
        isOpenChangePhoneModal: false,
        isOpenPhoneOtpModal: true
      });
    }

    if (
      !!this.props.userStore.isVerifyEmailLoading &&
      !nextProps.userStore.isVerifyEmailLoading &&
      !this.props.userStore.isVerifyEmailSuccess &&
      !!nextProps.userStore.isVerifyEmailSuccess
    ) {
      this.setState({
        isOpenOtpModal: false
      });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    }

    if (
      !!this.props.userStore.isVerifyPhoneLoading &&
      !nextProps.userStore.isVerifyPhoneLoading &&
      !this.props.userStore.isVerifyPhoneSuccess &&
      !!nextProps.userStore.isVerifyPhoneSuccess
    ) {
      this.setState({
        isOpenPhoneOtpModal: false
      });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    }
  }

  handleRequestChangeEmail({ email }) {
    const { requestChangeEmailAction } = this.props;
    this.setState({ emailInput: { value: email, valid: true } });
    requestChangeEmailAction({ email });
  }

  handleRequestChangePhone({ phone }) {
    const { authStore, requestPhoneVerificationOtpAction } = this.props;

    if (phone === authStore?.userInfo?.phone && authStore?.userInfo?.phone_verified) {
      this.setState({
        isOpenChangePhoneModal: false
      });
      return;
    }
    requestPhoneVerificationOtpAction({ phone });
    this.setState({
      phoneInput: {
        value: phone,
        valid: true
      }
    });
  }

  handleVerifyEmail({ otp }) {
    const { verifyEmailAction } = this.props;
    const { emailInput } = this.state;
    !!emailInput.valid &&
      verifyEmailAction({
        otp,
        email: emailInput.value
      });
  }

  handleVerifyPhone({ otp }) {
    const { verifyPhoneAction } = this.props;
    const { phoneInput } = this.state;
    !!phoneInput.valid &&
      verifyPhoneAction({
        otp,
        phone: phoneInput.value
      });
  }

  render() {
    return (
      <View
        {...{
          props: this.props,
          state: this.state,
          setState: this.setState.bind(this),
          handleRequestChangeEmail: this.handleRequestChangeEmail.bind(this),
          handleRequestChangePhone: this.handleRequestChangePhone.bind(this),
          handleVerifyEmail: this.handleVerifyEmail.bind(this),
          handleVerifyPhone: this.handleVerifyPhone.bind(this)
        }}
      />
    );
  }
}

export default ProfileContainer;
