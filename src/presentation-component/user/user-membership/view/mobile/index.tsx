import classNames from 'classnames';
import { MEMBERSHIP_LEVEL_TYPE } from 'constants/application/membership_level';
import Image from 'presentation-component/ui/image';
import AvatarWithMembershipProgress from 'presentation-component/user/avatar-with-membership-progress';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';
import { ViewProps } from '../..';

const UserMembership = ({ user, info, onInfoClick }: ViewProps) => {
  const membership = MEMBERSHIP_LEVEL_TYPE[user.membership_level];

  return (
    <div className={styles.userMembership}>
      <AvatarWithMembershipProgress user={user} classes={{ container: styles.membershipImage }} isSmallView />
      <div className={styles.membershipInfo}>
        <div className={styles.userName}>{user.name}</div>
        {!!membership.image && <Image src={membership.image} alt="membership level" className={styles.level} />}
        {!!info && (
          <div className={classNames(styles.info, onInfoClick && styles.infoClickable)} onClick={() => onInfoClick?.()}>
            {info}
            {!!onInfoClick && <Icon name="info" className={styles.infoIcon} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMembership;
