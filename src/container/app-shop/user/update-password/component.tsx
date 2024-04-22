import { useHistory } from 'react-router-dom';
import { AuthState } from 'flows/auth/types';
import { useState, useEffect } from 'react';
import { isMobileVersion } from 'utils';
import { usePrevious } from 'utils/hook';
import { getPhoneOrEmail } from 'utils/validate';
import { ALERT_RESET_PASSWORD_SUCCESS } from 'constants/application/alert';
import { ROUTING_USER_PROFILE_EDIT } from 'routings/path';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface ViewProps {
  phoneOrEmail: string;
  isOtpByPhone: boolean;
  isSubmitButtonLoading: boolean;
  isUpdatedPassword: boolean;
  onSubmit: (data?: any) => void;
}
interface UpdatePasswordProps {
  authStore?: AuthState;
  updatePasswordByOtpAction?: (data: any) => void;
  openAlertAction?: (data: any) => void;
}
const UpdatePassword = ({
  authStore: {
    updatePasswordByOtp: { updating: isUpdatingPassword, updated: isUpdatedPassword }
  },
  updatePasswordByOtpAction,
  openAlertAction
}: UpdatePasswordProps) => {
  const history = useHistory();
  const [isSubmitButtonLoading, setSubmitButtonLoading] = useState(false);
  const wasUpdatingPassword = usePrevious(isUpdatingPassword);
  useEffect(() => {
    if (wasUpdatingPassword && !isUpdatingPassword) {
      setSubmitButtonLoading(false);
    }
  }, [isUpdatingPassword]);
  const query = new URLSearchParams(history.location.search);
  const phoneOrEmail = query.get('email') || query.get('phone') || '';
  const isOtpByPhone = !!query.get('phone');

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        phoneOrEmail,
        isOtpByPhone,
        isSubmitButtonLoading,
        isUpdatedPassword,
        onSubmit: ({ phoneOrEmail, otp, password }) => {
          const [phone, email] = getPhoneOrEmail(phoneOrEmail);
          setSubmitButtonLoading(true);
          updatePasswordByOtpAction(
            Object.assign(
              {},
              {
                otp,
                email,
                password,
                onSuccess: () => {
                  history.push(ROUTING_USER_PROFILE_EDIT);
                  openAlertAction(ALERT_RESET_PASSWORD_SUCCESS);
                }
              },
              phone && { phone },
              email && { email }
            )
          );
        }
      }}
    />
  );
};

export type { ViewProps };
export default UpdatePassword;
