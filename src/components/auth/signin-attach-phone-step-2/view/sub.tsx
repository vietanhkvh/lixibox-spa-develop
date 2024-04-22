import { NavLink } from 'react-router-dom';

import { ROUTING_AUTH_SIGN_UP } from 'routings/path';
import { isMobileVersion } from 'utils';
import { generateTestId } from 'utils/test-utils';
import componentStyles from 'style/component.module.scss';

interface SubContainerProps {
  referrer: string;
  onSignup?: (event: { referrer: string }) => void;
}
const SubContainer = ({ referrer, onSignup }: SubContainerProps) => {
  const linkSignUpProps = {
    to: Object.assign({ pathname: ROUTING_AUTH_SIGN_UP }, referrer && { state: { referrer } }),
    onClick(event) {
      if (onSignup) {
        onSignup({ referrer });
        event.preventDefault();
      }
    }
  };

  return (
    <div>
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
          Bạn chưa có tài khoản?{' '}
        </span>
        <NavLink
          {...generateTestId({ name: 'link-signup' })}
          className={
            isMobileVersion()
              ? componentStyles.authBlockRelatedLinkLinkMobile
              : componentStyles.authBlockRelatedLinkLinkDesktop
          }
          {...linkSignUpProps}
        >
          Đăng ký
        </NavLink>
      </div>
    </div>
  );
};

export default SubContainer;
