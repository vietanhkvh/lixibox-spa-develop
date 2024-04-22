import { NavLink } from 'react-router-dom';

import { ROUTING_AUTH_SIGN_IN } from 'routings/path';
import { isMobileVersion } from 'utils';
import componentStyles from 'style/component.module.scss';
import './style.css';

interface SubContainerProps {
  referrer: string;
  onSignin?: (event: { referrer: string }) => void;
}
const SubContainer = ({ referrer, onSignin }: SubContainerProps) => {
  const linkSignInProps = {
    to: Object.assign({ pathname: ROUTING_AUTH_SIGN_IN }, referrer && { state: { referrer } }),
    className: isMobileVersion()
      ? componentStyles.authBlockRelatedLinkLinkMobile
      : componentStyles.authBlockRelatedLinkLinkDesktop,
    onClick: (e) => {
      if (onSignin) {
        onSignin({ referrer });
        e.preventDefault();
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
          Bạn đã có mật khẩu?{' '}
        </span>
        <NavLink {...linkSignInProps}>Đăng nhập</NavLink>
      </div>
    </div>
  );
};

export default SubContainer;
