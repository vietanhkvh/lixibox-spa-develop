import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTING_USER_UPDATE_PASSWORD, ROUTING_USER_VERIFY } from 'routings/path';
import { isMobileVersion } from 'utils';
import { usePrevious } from 'utils/hook';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';

const ViewMode = Object.freeze({
  VERIFY_EMAIL: 'verify-email' as const,
  VERIFY_PHONE: 'verify-phone' as const,
  VERIFIED: 'verified' as const
});
type ViewModeType = 'verify-email' | 'verify-phone' | 'verified';
interface ViewProps {
  email: string;
  phone: string;
  emailVerificationLink: string;
  viewMode: ViewModeType;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isSubmitButtonLoading: boolean;
  onSubmit: (data?: { email?: string; phone?: string }) => void;
}
interface VerifyUserProps extends PropsFromRedux {}
const VerifyUser = ({
  authStore: {
    emailVerificationOtpRequest: { errored: isErroredEmailVerification },
    otpRequest,
    profile
  },
  requestOtpAction
}: VerifyUserProps) => {
  const history = useHistory();
  const [viewMode, setViewMode] = useState<ViewModeType>(null);
  const [isSubmitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const query = new URLSearchParams(history.location.search);
  const isEmailVerified = !!profile?.email_verified;
  const isPhoneVerified = !!profile?.phone_verified;
  useEffect(() => {
    if (query.get('view') === null) {
      const viewMode: ViewModeType = !isPhoneVerified
        ? ViewMode.VERIFY_PHONE
        : !isEmailVerified
        ? ViewMode.VERIFY_EMAIL
        : ViewMode.VERIFIED;
      const newQuery = new URLSearchParams(history.location.search);
      newQuery.set('view', viewMode);
      history.replace({ search: `?${newQuery.toString()}` });
      setViewMode(viewMode);
    } else {
      const queryView = query.get('view') as ViewModeType;
      const viewMode: ViewModeType = Object.values(ViewMode).includes(queryView) ? queryView : ViewMode.VERIFY_PHONE;
      setViewMode(viewMode);
    }
  }, [history.location.search]);

  const wasRequestingOtp = usePrevious(otpRequest.changePassword.requesting);
  useEffect(() => {
    if (wasRequestingOtp && !otpRequest.changePassword.requesting) {
      setSubmitButtonLoading(false);
      if (!otpRequest.changePassword.errored) {
        updatedEmail && history.push(`${ROUTING_USER_UPDATE_PASSWORD}?email=${encodeURIComponent(updatedEmail || '')}`);
        updatedPhone && history.push(`${ROUTING_USER_UPDATE_PASSWORD}?phone=${encodeURIComponent(updatedPhone || '')}`);
      }
    }
  }, [otpRequest.changePassword, wasRequestingOtp, updatedEmail, updatedPhone]);

  const getEmailVerificationLink = () => {
    const newQuery = new URLSearchParams(history.location.search);
    newQuery.set('view', ViewMode.VERIFY_EMAIL);
    return `${ROUTING_USER_VERIFY}?${newQuery.toString()}`;
  };
  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        email: profile?.email,
        phone: profile?.phone,
        emailVerificationLink: getEmailVerificationLink(),
        viewMode,
        isEmailVerified,
        isPhoneVerified,
        isSubmitButtonLoading,
        isErroredEmailVerification,
        onSubmit: (values) => {
          switch (viewMode) {
            case ViewMode.VERIFY_EMAIL:
              requestOtpAction({ email: values?.email || '', requestType: 'change_password' });
              setUpdatedEmail(values?.email || '');
              setSubmitButtonLoading(true);
              break;
            case ViewMode.VERIFY_PHONE:
              requestOtpAction({ phone: values?.phone || '', requestType: 'change_password' });
              setUpdatedPhone(values?.phone || '');
              setSubmitButtonLoading(true);
              break;
            case ViewMode.VERIFIED:
              requestOtpAction({ email: profile?.email || '', requestType: 'change_password' });
              setUpdatedEmail(profile?.email || '');
              setSubmitButtonLoading(true);
              break;
          }
        }
      }}
    />
  );
};

export type { ViewProps, ViewModeType };
export { ViewMode };
export default VerifyUser;
