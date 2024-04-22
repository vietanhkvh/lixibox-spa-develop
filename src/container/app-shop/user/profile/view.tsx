import { useHistory } from 'react-router-dom';
import { removeQueryParamFromCurrentPath } from 'utils/uri';
import UserProfile from '../../../../components/profile';
import {
  ALERT_CHANGE_AVATAR_USER_ERROR,
  ALERT_IMAGE_FILE_NOT_CORRECT,
  ALERT_IMAGE_MAX_SUPPORTED_SIZE_EXCEEDED,
  ALERT_RESET_PASSWORD_SUCCESS
} from '../../../../constants/application/alert';
import { IMAGE_MAX_SIZE, IMAGE_SUPPORTED_EXTENSIONS } from '../../../../constants/application/file';
import GeneralModal from '../../../../presentation-component/modal/general-modal';
import ChangeEmailForm from './change-email-form';
import ChangePhoneForm from './change-phone-form';
import VerifyEmailForm from './verify-email-form';
import VerifyPhoneForm from './verify-phone-form';

const View = ({
  props,
  state,
  setState,
  handleRequestChangeEmail,
  handleRequestChangePhone,
  handleVerifyEmail,
  handleVerifyPhone
}) => {
  const history = useHistory();
  const {
    userStore,
    authStore,
    editUserProfileAction,
    changePasswordUserAction,
    openAlertAction,
    requestEmailVerificationAction,
    requestPhoneVerificationOtpAction,
    changeAvatarUserAction,
    userStore: { isRequestChangeEmailLoading, isVerifyEmailLoading, isVerifyPhoneLoading }
  } = props;
  const userInfo = authStore?.userInfo || {};
  const {
    isOpenChangeEmailModal,
    isOpenChangePhoneModal,
    isOpenOtpModal,
    isOpenPhoneOtpModal,
    emailInput,
    phoneInput
    // TODO: Remove following unused props and traces
    // otpInput
  } = state;

  const userProfileProps = {
    openAlertAction,
    showHeader: false,
    user: userInfo,
    editUserProfileForm: editUserProfileAction,
    handleUploadImage: (e) => {
      e.preventDefault();
      const resetValue = () => {
        if (e.target?.value) e.target.value = null;
      };
      const file = e.target.files[0];
      if ('undefined' === typeof file || null === file) {
        openAlertAction?.(ALERT_CHANGE_AVATAR_USER_ERROR);
        resetValue();
        return;
      }

      // Validate supported image format
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop();
      if (IMAGE_SUPPORTED_EXTENSIONS.indexOf(fileExtension.toLowerCase()) === -1) {
        openAlertAction?.(ALERT_IMAGE_FILE_NOT_CORRECT);
        resetValue();
        return;
      }

      // Validate max. supported size
      if (file.size > IMAGE_MAX_SIZE) {
        openAlertAction?.(ALERT_IMAGE_MAX_SUPPORTED_SIZE_EXCEEDED);
        resetValue();
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        // Upload avatar file in server
        changeAvatarUserAction({
          avatar: reader.result
        });
      };

      reader.readAsDataURL(file);
      resetValue();
    },
    onRequestChangeEmail: () => {
      setState({ isOpenChangeEmailModal: true });
    },
    onRequestChangePhone: () => {
      setState({ isOpenChangePhoneModal: true });
    },
    onRequestVerifyEmail: () => {
      requestEmailVerificationAction();
      setState({
        isOpenOtpModal: true,
        emailInput: {
          value: authStore.userInfo && authStore.userInfo.email,
          valid: true
        }
      });
    },
    onRequestVerifyPhone: () => {
      const phone = authStore.userInfo?.phone || '';
      requestPhoneVerificationOtpAction({ phone });
      setState({
        isOpenPhoneOtpModal: true,
        phoneInput: {
          value: authStore.userInfo?.phone || '',
          valid: true
        }
      });
    },
    changePasswordForm: ({ password }) =>
      changePasswordUserAction({
        password,
        onSuccess: () => {
          openAlertAction(ALERT_RESET_PASSWORD_SUCCESS);
        }
      }),
    isChangedPasswordSuccess: userStore.isChangedPasswordSuccess,
    isChangedProfileSuccess: authStore.isChangedProfileSuccess,
    isWaitingChangeProfile: authStore.isWaitingChangeProfile,
    isChangingAvatar: authStore.isChangingAvatar
  };

  const changeEmailModalProps = {
    isOpen: isOpenChangeEmailModal,
    title: 'Thay đổi email',
    rightIcon: 'close',
    onRightActionClick: () => {
      setState({ isOpenChangeEmailModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    },
    onRequestClose: () => {
      setState({ isOpenChangeEmailModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    }
  };

  const changePhoneModalProps = {
    isOpen: isOpenChangePhoneModal,
    title: 'Thay đổi số điện thoại',
    rightIcon: 'close',
    onRightActionClick: () => {
      setState({ isOpenChangePhoneModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    },
    onRequestClose: () => {
      setState({ isOpenChangePhoneModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    }
  };

  const otpModalProps = {
    isOpen: isOpenOtpModal,
    title: 'Xác nhận',
    rightIcon: 'close',
    onRightActionClick: () => {
      setState({ isOpenOtpModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    },
    onRequestClose: () => {
      setState({ isOpenOtpModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    }
  };

  const phoneOtpModalProps = {
    isOpen: isOpenPhoneOtpModal,
    title: 'Xác nhận',
    rightIcon: 'close',
    onRightActionClick: () => {
      setState({ isOpenPhoneOtpModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    },
    onRequestClose: () => {
      setState({ isOpenPhoneOtpModal: false });
      removeQueryParamFromCurrentPath({ param: 'modal', history, mode: 'replace' });
    }
  };

  return (
    <div>
      <UserProfile {...userProfileProps} />
      <GeneralModal {...changeEmailModalProps}>
        <ChangeEmailForm
          isRequestChangeEmailLoading={isRequestChangeEmailLoading}
          handleRequestChangeEmail={handleRequestChangeEmail}
        />
      </GeneralModal>
      <GeneralModal {...changePhoneModalProps}>
        <ChangePhoneForm
          phone={userInfo?.phone || ''}
          isRequestChangePhoneLoading={false}
          handleRequestChangePhone={handleRequestChangePhone}
        />
      </GeneralModal>
      <GeneralModal {...otpModalProps}>
        <VerifyEmailForm
          emailInput={emailInput}
          isVerifyEmailLoading={isVerifyEmailLoading}
          handleVerifyEmail={handleVerifyEmail}
        />
      </GeneralModal>
      <GeneralModal {...phoneOtpModalProps}>
        <VerifyPhoneForm
          phoneInput={phoneInput}
          isVerifyPhoneLoading={isVerifyPhoneLoading}
          handleVerifyPhone={handleVerifyPhone}
        />
      </GeneralModal>
    </div>
  );
};

export default View;
