import { NavLink } from 'react-router-dom';
import SubmitButton from 'presentation-component/ui/submit-button';
import { ROUTING_AUTH_SIGN_UP } from 'routings/path';
import { prettifyPhoneNumber } from 'utils/format';
import { isMobileVersion } from 'utils';
import styles from './style.module.scss';

interface MainContainerProps {
  phone: string;
  referrer: string;
  handleSubmit?: () => void;
  onAlternateLinkClick?: (params: { phone: string; referrer: string }) => void;
}
const MainContainer = ({ phone, referrer, handleSubmit, onAlternateLinkClick }: MainContainerProps) => {
  return (
    <div className={styles.mainContainer}>
      <form noValidate>
        <div className={isMobileVersion() ? styles.phoneViewMobile : styles.phoneViewDesktop}>
          {prettifyPhoneNumber(phone)}
        </div>
        {isMobileVersion() && <div className={styles.phoneHint}>Số điện thoại chưa được xác thực</div>}
        <SubmitButton
          {...{
            title: 'Xác thực',
            classes: { container: styles.submitButton },
            onSubmit: () => handleSubmit?.(),
            testId: { name: 'phoneVerifyButton' },
            dataTestId: 'btn-phone-verify-button'
          }}
        />
        <NavLink
          to={`${ROUTING_AUTH_SIGN_UP}?phone=${phone}`}
          className={isMobileVersion() ? styles.alternateLinkMobile : styles.alternateLinkDesktop}
          onClick={(e) => {
            if (onAlternateLinkClick) {
              e.preventDefault();
              onAlternateLinkClick({ phone, referrer });
            }
          }}
        >
          Tạo một tài khoản mới với số điện thoại này
        </NavLink>
        <input type="submit" className={styles.noDisplay} />
      </form>
    </div>
  );
};

export default MainContainer;
