import { useEffect, useState } from 'react';
import { initAppleSignin } from 'utils/auth';
import { isMobileVersion } from 'utils';
import { StoredSocialAuthIntent } from 'constants/application/storage';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { IProps } from './model';

const MAX_INIT_RETRY = 120;
const RETRY_INTERVAL_MS = 500;

const AuthBlock = (props: IProps) => {
  const [retrySchedulerId, setRetrySchedulerId] = useState<NodeJS.Timeout>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  useEffect(() => {
    document.body?.classList.add('full-body');
  }, []);
  // TODO: Verify operability of retry logic
  useEffect(() => {
    if (!initAppleSignin()) {
      setRetrySchedulerId(
        setInterval(function () {
          if (initAppleSignin() || retryCount >= MAX_INIT_RETRY) {
            clearInterval(retrySchedulerId);
            return;
          }

          setRetryCount((prevRetryCount) => prevRetryCount + 1);
        }, RETRY_INTERVAL_MS)
      );
    }

    return () => {
      document.body?.classList.remove('full-body');
      clearInterval(retrySchedulerId);
    };
  }, []);

  const View = isMobileVersion() ? MobileView : DesktopView;
  return <View {...props} />;
};
AuthBlock.defaultProps = {
  type: 'left',
  descriptionVisibility: { mobile: true, desktop: true },
  isInviteSignup: false,
  isShowMobileTop: true,
  withMobileDescription: false,
  withoutSocialButtons: false,
  socialButtonHint: 'Hoặc tiếp tục với',
  socialAuthIntent: StoredSocialAuthIntent.SIGNIN
};

export default AuthBlock;
