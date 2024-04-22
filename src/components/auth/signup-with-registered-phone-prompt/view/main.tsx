import { MouseEvent } from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import SubmitButton from 'presentation-component/ui/submit-button';
import { ROUTING_AUTH_SIGN_IN, ROUTING_AUTH_VERIFY_PHONE } from 'routings/path';
import { isMobileVersion } from 'utils';
import { prettifyPhoneNumber } from 'utils/format';
import styles from './style.module.scss';

interface MainContainerProps {
  phone: string;
  referrer: string;
  isAlternateLinkVisible?: boolean;
  handleAlternateSubmit: (e: MouseEvent<HTMLElement>) => void;
  onSubmit?: (params: { phone: string; referrer: string }) => void;
}
const MainContainer = ({
  phone,
  referrer,
  isAlternateLinkVisible,
  handleAlternateSubmit,
  onSubmit
}: MainContainerProps) => {
  return (
    <div>
      <form noValidate>
        <div className={isMobileVersion() ? styles.phoneViewMobile : styles.phoneViewDesktop}>
          {prettifyPhoneNumber(phone)}
        </div>
        <SubmitButton
          {...{
            title: 'Đăng nhập',
            type: 'link',
            link: { to: `${ROUTING_AUTH_SIGN_IN}?phone=${phone}` },
            testId: { name: 'phoneVerifyButton' },
            style: { marginTop: 0 },
            dataTestId: 'btn-phone-verify-button',
            onSubmit: (e) => {
              if (onSubmit) {
                e.preventDefault();
                onSubmit({ phone, referrer });
              }
            }
          }}
        />
        {!!isAlternateLinkVisible && (
          <NavLink
            to={generatePath(ROUTING_AUTH_VERIFY_PHONE, { phone })}
            onClick={(e) => handleAlternateSubmit?.(e)}
            className={isMobileVersion() ? styles.alternateLinkMobile : styles.alternateLinkDesktop}
          >
            Vẫn tạo một tài khoản mới
          </NavLink>
        )}
        <input type="submit" className={styles.noDisplay} />
      </form>
    </div>
  );
};

export default MainContainer;
