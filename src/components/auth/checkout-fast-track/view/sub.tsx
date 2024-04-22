import AppleSigninBlock from 'components/auth/apple-signin-block';
import GoogleSigninBlock from 'components/auth/google-signin-block';
import FacebookSigninBlock from 'components/auth/facebook-signin-block';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import styles from './style.module.scss';

interface SubContainerProps {
  referrer: string;
}
const SubContainer = ({ referrer }: SubContainerProps) => {
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
    </div>
  );
};

export default SubContainer;
