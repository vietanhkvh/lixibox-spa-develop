import SubmitButton from 'presentation-component/ui/submit-button';
import { ROUTING_AUTH_SIGN_UP } from 'routings/path';
import { ViewProps } from '../..';
import GuestAvatarWithLoyaltyProgressPreview from '../../sub-components/guest-avatar-with-loyalty-progress-preview';
import styles from './style.module.scss';

const UserMembershipGuest = ({ info }: ViewProps) => {
  return (
    <div className={styles.userMembership}>
      <GuestAvatarWithLoyaltyProgressPreview classes={{ container: styles.membershipImage }} isSmallView />
      <div className={styles.membershipInfo}>
        <div className={styles.userName}>Chương trình thành viên</div>
        {!!info && <div className={styles.info}>{info}</div>}
        <SubmitButton
          title="Đăng ký ngay"
          size="small"
          type="link"
          link={{ to: ROUTING_AUTH_SIGN_UP }}
          classes={{ container: styles.button }}
        />
      </div>
    </div>
  );
};

export default UserMembershipGuest;
