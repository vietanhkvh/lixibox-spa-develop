import classNames from 'classnames';
import { MEMBERSHIP_LEVEL_TYPE } from 'constants/application/membership_level';
import Image from 'presentation-component/ui/image';
import Icon from 'presentation-component/ui/icon';
import AvatarWithMembershipProgress from 'presentation-component/user/avatar-with-membership-progress';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const UserMembership = ({ user, info, onInfoClick, classes }: ViewProps) => {
  const membership = MEMBERSHIP_LEVEL_TYPE[user.membership_level];

  return (
    <div className={classNames(styles.userMembership, classes?.container)}>
      <AvatarWithMembershipProgress user={user} classes={{ container: styles.membershipImage }} />
      <div className={styles.userName}>{user.name}</div>
      {!!membership.image && <Image src={membership.image} alt="membership level" className={styles.level} />}
      {!!info && (
        <div className={classNames(styles.info, onInfoClick && styles.infoClickable)} onClick={() => onInfoClick?.()}>
          {info}
          {!!onInfoClick && <Icon name="info" className={styles.infoIcon} />}
        </div>
      )}
    </div>
  );
};

export default UserMembership;
