import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import * as ROUTINGS from 'routings/path';
import { auth } from 'utils/auth';
import { useConfirmationModal } from 'utils/hook/modal';
import { isMobileVersion } from 'utils/responsive';

import { PropsFromRedux } from './store';
import DesktopView from './view-desktop';
import MobileView from './view-mobile';

const getEmailUpdateAndVerificationModalState = ({ user, constants }) => {
  let modalState = {
    isVisible: false,
    title: 'Thông báo',
    message: '',
    button: { title: 'OK', color: 'black' }
  };

  if (!auth.loggedIn()) {
    localStorage.removeItem('openCountFromLastLogin');
    localStorage.removeItem('lastShownTime');
    return modalState;
  }

  if (!user || !constants) {
    return modalState;
  }

  // user panel open count
  let openCountFromLastLogin = parseInt(localStorage.getItem('openCountFromLastLogin')) || 0;
  // localStorage.setItem('openCountFromLastLogin', String(openCountFromLastLogin + 1));

  if (!user?.email_update_required && user?.email_verified) return modalState;
  const lastShownTime = new Date(parseInt(localStorage.getItem('lastShownTime')) || 0);
  const currentTime = new Date();
  // Skip if displayed in the last 24 hours
  if (currentTime.getTime() - lastShownTime.getTime() < 1000 * 60 * 60 * 24) return modalState;
  const emailUpdatePopupOpenTimes = constants?.email_update_popup_open_times_web || 0;
  const emailVerificationPopupOpenTimes = constants?.email_verification_popup_open_times_web || 0;

  // Check session open time

  if (
    user?.email_update_required &&
    emailUpdatePopupOpenTimes > 0 &&
    openCountFromLastLogin % emailUpdatePopupOpenTimes === 0
  ) {
    // Show update email modal
    localStorage.setItem('lastShownTime', currentTime.getTime().toString());
    Object.assign(modalState, {
      isVisible: true,
      message: 'Email của bạn không hợp lệ. Vui lòng cập nhật email để theo dõi thông tin đơn hàng',
      button: { title: 'Cập nhật ngay', color: 'black' }
    });
  } else if (
    !user?.email_verified &&
    emailVerificationPopupOpenTimes > 0 &&
    openCountFromLastLogin % emailVerificationPopupOpenTimes === 0
  ) {
    // Show verify email modal
    localStorage.setItem('lastShownTime', currentTime.getTime().toString());
    Object.assign(modalState, {
      isVisible: true,
      message: 'Email chưa xác thực',
      button: { title: 'Xác thực ngay', color: 'black' }
    });
  }

  return modalState;
};

const getPhoneUpdateAndVerificationModalState = ({ user, constants }) => {
  let modalState = {
    isVisible: false,
    title: 'Thông báo',
    message: '',
    button: { title: 'OK', color: 'black' }
  };

  if (!auth.loggedIn()) {
    localStorage.removeItem('phoneOtpModalOpenCountFromLastLogin');
    localStorage.removeItem('phoneOtpModalLastShownTime');
    return modalState;
  }

  if (!user || !constants) {
    return modalState;
  }

  // user panel open count
  let openCountFromLastLogin = parseInt(localStorage.getItem('phoneOtpModalOpenCountFromLastLogin')) || 0;
  // localStorage.setItem('openCountFromLastLogin', String(openCountFromLastLogin + 1));

  if (user?.phone && user?.phone_verified) return modalState;
  const lastShownTime = new Date(parseInt(localStorage.getItem('phoneOtpModalLastShownTime')) || 0);
  const currentTime = new Date();
  // Skip if displayed in the last 24 hours
  if (currentTime.getTime() - lastShownTime.getTime() < 1000 * 60 * 60 * 24) return modalState;
  const phoneUpdatePopupOpenTimes = constants?.phone_update_popup_open_times_web || 0;
  const phoneVerificationPopupOpenTimes = constants?.phone_verification_popup_open_times_web || 0;

  // Check session open time

  if (user?.email_verified && !user?.phone_verified) {
    if (!user?.phone && phoneUpdatePopupOpenTimes > 0 && openCountFromLastLogin % phoneUpdatePopupOpenTimes === 0) {
      // Show update phone modal
      localStorage.setItem('phoneOtpModalLastShownTime', currentTime.getTime().toString());
      Object.assign(modalState, {
        isVisible: true,
        message: 'Số điện thoại của bạn không hợp lệ. Vui lòng cập nhật số điện thoại để nhận thêm nhiều ưu đãi',
        button: { title: 'Cập nhật ngay', color: 'black' }
      });
    } else if (
      user?.phone &&
      phoneVerificationPopupOpenTimes > 0 &&
      openCountFromLastLogin % phoneVerificationPopupOpenTimes === 0
    ) {
      // Show verify phone modal
      localStorage.setItem('phoneOtpModalLastShownTime', currentTime.getTime().toString());
      Object.assign(modalState, {
        isVisible: true,
        message: 'Số điện thoại chưa xác thực',
        button: { title: 'Xác thực ngay', color: 'black' }
      });
    }
  }

  return modalState;
};

interface UserPanelContainerProps extends PropsFromRedux {}
const UserPanelContainer = ({
  authStore: { profile: user },
  cartStore,
  sharedModalStore,
  openConfirmationModalAction,
  closeConfirmationModalAction,
  requestPhoneVerificationOtpAction,
  getEmailVerificationAction
}: UserPanelContainerProps) => {
  const history = useHistory();
  const location = useLocation();
  const constants = cartStore?.constants;
  useEffect(() => {
    if (!isMobileVersion() && location.pathname === ROUTINGS.ROUTING_USER) {
      history.push(ROUTINGS.ROUTING_USER_ORDER);
    }
  }, []);
  useEffect(() => {
    let openCountFromLastLogin = parseInt(localStorage.getItem('openCountFromLastLogin')) || 0;
    localStorage.setItem('openCountFromLastLogin', String(openCountFromLastLogin + 1));
    let phoneOtpModalOpenCountFromLastLogin =
      parseInt(localStorage.getItem('phoneOtpModalOpenCountFromLastLogin')) || 0;
    localStorage.setItem('phoneOtpModalOpenCountFromLastLogin', String(phoneOtpModalOpenCountFromLastLogin + 1));
  }, []);
  useEffect(() => {
    const emailModalState = getEmailUpdateAndVerificationModalState({ user, constants });
    if (emailModalState.isVisible) {
      openConfirmationModalAction({
        title: emailModalState.title,
        id: 'emailVerificationModal',
        message: emailModalState.message,
        button: emailModalState.button
      });
    }

    const phoneModalState = getPhoneUpdateAndVerificationModalState({ user, constants });
    if (phoneModalState.isVisible) {
      openConfirmationModalAction({
        title: phoneModalState.title,
        id: 'phoneVerificationModal',
        message: phoneModalState.message,
        button: phoneModalState.button
      });
    }
  }, [user, constants]);
  useConfirmationModal(
    (data) => {
      closeConfirmationModalAction();

      if (data?.id === 'emailVerificationModal') {
        const modalToDisplay = user?.email_update_required ? 'emailUpdate' : 'otpConfirmation';
        !user?.email_update_required && getEmailVerificationAction();
        const query = new URLSearchParams(history.location.search);
        if (history.location.pathname === ROUTINGS.ROUTING_USER_PROFILE_EDIT && query.get('modal') === modalToDisplay) {
          history.replace(ROUTINGS.ROUTING_USER_PROFILE_EDIT);
          setTimeout(() => {
            history.replace(`${ROUTINGS.ROUTING_USER_PROFILE_EDIT}?modal=${modalToDisplay}`);
          }, 200);
        } else {
          history.push(`${ROUTINGS.ROUTING_USER_PROFILE_EDIT}?modal=${modalToDisplay}`);
        }
      } else if (data?.id === 'phoneVerificationModal') {
        const modalToDisplay = user?.phone ? 'phoneOtpConfirmation' : 'phoneUpdate';
        const phone = user?.phone || '';
        phone && requestPhoneVerificationOtpAction({ phone });
        const query = new URLSearchParams(history.location.search);
        if (history.location.pathname === ROUTINGS.ROUTING_USER_PROFILE_EDIT && query.get('modal') === modalToDisplay) {
          history.replace(ROUTINGS.ROUTING_USER_PROFILE_EDIT);
          setTimeout(() => {
            history.replace(`${ROUTINGS.ROUTING_USER_PROFILE_EDIT}?modal=${modalToDisplay}`);
          }, 200);
        } else {
          history.push(`${ROUTINGS.ROUTING_USER_PROFILE_EDIT}?modal=${modalToDisplay}`);
        }
      }
    },
    () => {
      closeConfirmationModalAction();
    },
    sharedModalStore
  );
  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View location={location} />;
};

export default UserPanelContainer;
