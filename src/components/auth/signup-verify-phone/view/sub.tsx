import { NavLink } from 'react-router-dom';

import { ROUTING_AUTH_SIGN_IN } from 'routings/path';
import { generateTestId } from 'utils/test-utils';
import { isMobileVersion } from 'utils';
import componentStyles from 'style/component.module.scss';

interface SubContainerProps {
  referrer: string;
  onLogin: (event: { referrer: string }) => void;
}
const SubContainer = ({ referrer, onLogin }: SubContainerProps) => {
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
          Bạn đã có tài khoản?{' '}
        </span>
        <NavLink
          {...{
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
          }}
          {...generateTestId({ name: 'btn-signin' })}
        >
          Đăng nhập
        </NavLink>
      </div>
    </div>
  );
};

export default SubContainer;
