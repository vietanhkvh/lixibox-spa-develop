import Signin from 'components/auth/sign-in';
import Signup from 'components/auth/sign-up';
import CheckoutFastTrack from 'components/auth/checkout-fast-track';
import OTPPasswordReset from 'components/auth/otp-password-reset';
import SignupWithRegisteredPhonePrompt from 'components/auth/signup-with-registered-phone-prompt';
import SignupVerifyPhone from 'components/auth/signup-verify-phone';
import SigninWithUnconfirmedPhonePrompt from 'components/auth/signin-with-unconfirmed-phone-prompt';
import SigninAttachPhoneStep1 from 'components/auth/signin-attach-phone-step-1';
import SigninAttachPhoneStep2 from 'components/auth/signin-attach-phone-step-2';
import { ViewProps } from '../model';
import { AUTH_VIEW, ModalCloseRequestReason } from '../constant';

const View = ({ currentAuthView, setCurrentAuthView, referrer, inLineNotification, onRequestClose }: ViewProps) => {
  switch (currentAuthView.view) {
    case AUTH_VIEW.CHECKOUT_FAST_TRACK:
      return (
        <CheckoutFastTrack
          isOnModal
          referrer={referrer}
          onLogin={() => setCurrentAuthView({ view: AUTH_VIEW.LOGIN })}
          onSignup={() => setCurrentAuthView({ view: AUTH_VIEW.SIGNUP })}
          onFastTrackSuccess={() =>
            onRequestClose({
              reason: ModalCloseRequestReason.FAST_TRACK_SUCCESS,
              origin: AUTH_VIEW.CHECKOUT_FAST_TRACK
            })
          }
        />
      );
    case AUTH_VIEW.LOGIN:
      return (
        <Signin
          isOnModal
          phone={currentAuthView.state?.phone || ''}
          referrer={referrer}
          onSignup={() => setCurrentAuthView({ view: AUTH_VIEW.SIGNUP })}
          inLineNotification={inLineNotification}
          onLoginSuccess={() =>
            onRequestClose({ reason: ModalCloseRequestReason.LOGIN_SUCCESS, origin: AUTH_VIEW.LOGIN })
          }
          onLoginFailure={(event) => {
            if (event?.reason === 'unverified_phone_exists') {
              setCurrentAuthView({
                view: AUTH_VIEW.LOGIN_UNCONFIRMED_PHONE_PROMPT,
                state: { phone: event?.phone || '' }
              });
            }
          }}
          onForgotPassword={() => setCurrentAuthView({ view: AUTH_VIEW.FORGOT_PASSWORD })}
        />
      );
    case AUTH_VIEW.SIGNUP:
      return (
        <Signup
          isOnModal
          phone={currentAuthView.state?.phone || ''}
          referrer={referrer}
          onSignupSuccess={() =>
            onRequestClose({ reason: ModalCloseRequestReason.SIGNUP_SUCCESS, origin: AUTH_VIEW.SIGNUP })
          }
          onSignupFailure={(event) => {
            switch (event?.reason) {
              case 'phone_not_exists':
                setCurrentAuthView({ view: AUTH_VIEW.SIGNUP_VERIFY_PHONE, state: { phone: event?.phone || '' } });
                break;
              case 'verified_phone_exists':
              case 'unverified_phone_exists':
                setCurrentAuthView({
                  view: AUTH_VIEW.SIGNUP_PHONE_REGISTERED,
                  state: { phone: event?.phone || '', status: event?.status }
                });
                break;
            }
          }}
          onLogin={() => setCurrentAuthView({ view: AUTH_VIEW.LOGIN })}
        />
      );
    case AUTH_VIEW.FORGOT_PASSWORD:
      return (
        <OTPPasswordReset
          onSuccess={() => {
            // TODO: Investigate. Can't we just log user in after OTP password reset? Why are we redirecting to login screen?
            // setInLineNotification({
            //   content: ALERT_FORGOT_PASSWORD_SUCCESS.content,
            //   type: InLineNotificationType.SUCCESS
            // });
            onRequestClose({
              reason: ModalCloseRequestReason.RESET_PASSWORD_SUCCESS,
              origin: AUTH_VIEW.FORGOT_PASSWORD
            });
          }}
          onSignin={() => setCurrentAuthView({ view: AUTH_VIEW.LOGIN })}
        />
      );
    case AUTH_VIEW.SIGNUP_PHONE_REGISTERED:
      return (
        <SignupWithRegisteredPhonePrompt
          {...{
            isOnModal: true,
            phone: currentAuthView.state?.phone || '',
            status: currentAuthView.state?.status || '',
            referrer,
            onSubmit: (event) => {
              setCurrentAuthView({ view: AUTH_VIEW.LOGIN, state: { phone: event?.phone || '' } });
            },
            onAlternateLinkClick: (event) => {
              setCurrentAuthView({ view: AUTH_VIEW.SIGNUP_VERIFY_PHONE, state: { phone: event?.phone || '' } });
            }
          }}
        />
      );
    case AUTH_VIEW.SIGNUP_VERIFY_PHONE:
      return (
        <SignupVerifyPhone
          {...{
            isOnModal: true,
            phone: currentAuthView.state?.phone || '',
            referrer,
            onSignupSuccess: () =>
              onRequestClose({ reason: ModalCloseRequestReason.SIGNUP_SUCCESS, origin: AUTH_VIEW.SIGNUP_VERIFY_PHONE }),
            onLogin: () => setCurrentAuthView({ view: AUTH_VIEW.LOGIN }),
            onInvalidState: () => setCurrentAuthView({ view: AUTH_VIEW.SIGNUP })
          }}
        />
      );
    case AUTH_VIEW.LOGIN_UNCONFIRMED_PHONE_PROMPT:
      return (
        <SigninWithUnconfirmedPhonePrompt
          {...{
            isOnModal: true,
            phone: currentAuthView.state?.phone || '',
            referrer,
            onSubmit: () => setCurrentAuthView({ view: AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_1 }),
            onAlternateLinkClick: (event) => {
              setCurrentAuthView({ view: AUTH_VIEW.SIGNUP, state: { phone: event?.phone || '' } });
            },
            onSignup: () => setCurrentAuthView({ view: AUTH_VIEW.SIGNUP })
          }}
        />
      );
    case AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_1:
      return (
        <SigninAttachPhoneStep1
          {...{
            isOnModal: true,
            referrer,
            inLineNotification,
            onSuccess: () => setCurrentAuthView({ view: AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_2 }),
            onCloudTokenAvailable: () => setCurrentAuthView({ view: AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_2 }),
            onSignup: () => setCurrentAuthView({ view: AUTH_VIEW.SIGNUP }),
            onInvalidState: () => setCurrentAuthView({ view: AUTH_VIEW.LOGIN })
          }}
        />
      );
    case AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_2:
      return (
        <SigninAttachPhoneStep2
          {...{
            isOnModal: true,
            referrer,
            inLineNotification,
            onLoginSuccess: () =>
              onRequestClose({
                reason: ModalCloseRequestReason.LOGIN_SUCCESS,
                origin: AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_2
              }),
            onSignup: () => setCurrentAuthView({ view: AUTH_VIEW.SIGNUP }),
            onInvalidState: () => setCurrentAuthView({ view: AUTH_VIEW.LOGIN }),
            onRetry: () => setCurrentAuthView({ view: AUTH_VIEW.LOGIN_ATTACH_PHONE_STEP_1 })
          }}
        />
      );
    default:
      return null;
  }
};

export default View;
