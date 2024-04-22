import classNames from 'classnames';

import MembershipProgressbar from 'presentation-component/user/membership-progressbar';
import { User } from 'types/api/auth';
import { formatCurrency } from 'utils/currency';
import styles from './style.module.scss';

interface MembershipPreviewProps {
  user: User;
  membershipInfo: any;
  progressInfoPath?: string;
  onProgressInfoClick?: () => void;
  classes?: { container?: string };
}
const MembershipPreview = ({
  user,
  membershipInfo,
  onProgressInfoClick,
  progressInfoPath,
  classes
}: MembershipPreviewProps) => {
  return (
    <div className={classNames(styles.membershipPreview, classes?.container)}>
      <div className={styles.coinView}>
        {formatCurrency(user.earned_coins || 0)}
        <span>Điểm thành viên</span>
      </div>
      <MembershipProgressbar
        userInfo={user}
        membershipInfo={membershipInfo}
        infoPath={progressInfoPath}
        onInfoClick={onProgressInfoClick}
        classes={{ container: styles.progressbarView }}
      />
    </div>
  );
};

export type { MembershipPreviewProps };
export default MembershipPreview;
