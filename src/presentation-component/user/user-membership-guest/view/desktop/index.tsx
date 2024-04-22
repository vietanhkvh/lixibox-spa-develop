import classNames from 'classnames';
import SubmitButton from 'presentation-component/ui/submit-button';
import { ROUTING_AUTH_SIGN_UP } from 'routings/path';
import GuestAvatarWithLoyaltyProgressPreview from '../../sub-components/guest-avatar-with-loyalty-progress-preview';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const UserMembershipGuest = ({ info, classes }: ViewProps) => {
  return (
    <div className={classNames(styles.userMembership, classes?.container)}>
      <GuestAvatarWithLoyaltyProgressPreview classes={{ container: styles.membershipImage }} />
      <div className={styles.username}>Chương trình thành viên</div>
      {!!info && <div className={styles.info}>{info}</div>}
      <SubmitButton
        title="Đăng ký ngay"
        type="link"
        link={{ to: ROUTING_AUTH_SIGN_UP }}
        classes={{ container: styles.button }}
      />
    </div>
  );
};

export default UserMembershipGuest;
