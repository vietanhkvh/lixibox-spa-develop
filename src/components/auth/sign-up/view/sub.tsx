import { NavLink } from 'react-router-dom';

import { ROUTING_AUTH_SIGN_IN } from 'routings/path';
import AppleSigninBlock from 'components/auth/apple-signin-block';
import GoogleSigninBlock from 'components/auth/google-signin-block';
import FacebookSigninBlock from 'components/auth/facebook-signin-block';
import { generateTestId } from 'utils/test-utils';
import { isMobileVersion } from 'utils';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import componentStyles from 'style/component.module.scss';
import styles from './style.module.scss';

interface SubContainerProps {
  referrer: string;
  onLogin: (event: { referrer: string }) => void;
}
const SubContainer = ({ referrer, onLogin }: SubContainerProps) => {
  const linkSignInProps = {
    to: Object.assign({ pathname: ROUTING_AUTH_SIGN_IN }, referrer && { state: { referrer } }),
    className: isMobileVersion()
      ? componentStyles.authBlockRelatedLinkLinkMobile
      : componentStyles.authBlockRelatedLinkLinkDesktop,
    onClick(event) {
      if (onLogin) {
        onLogin({ referrer });
        event.preventDefault();
      }
    }
  };

  return (
    <div>
      <FacebookSigninBlock
        referrer={referrer}
        intent={StoredSocialAuthIntent.SIGNUP}
        classes={{ container: styles.facebookSigninContainerDesktop }}
      />
      <GoogleSigninBlock
        referrer={referrer}
        intent={StoredSocialAuthIntent.SIGNUP}
        classes={{ container: styles.googleSigninContainerDesktop }}
      />
      <AppleSigninBlock
        authType="sign-up"
        intent={StoredSocialAuthIntent.SIGNUP}
        className={styles.appleLoginContainerDesktop}
      />
      <div
        className={
          isMobileVersion()
            ? componentStyles.authBlockRelatedLinkContainerMobile
            : componentStyles.authBlockRelatedLinkContainerDesktop
        }
      >
        <span
          className={
            isMobileVersion()
              ? componentStyles.authBlockRelatedLinkTextMobile
              : componentStyles.authBlockRelatedLinkTextDesktop
          }
        >
          Đã có tài khoản?{' '}
        </span>
        <NavLink {...generateTestId({ name: 'btn-signin' })} {...linkSignInProps}>
          Đăng nhập
        </NavLink>
      </div>
    </div>
  );
};

export default SubContainer;
