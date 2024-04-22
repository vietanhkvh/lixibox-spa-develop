import classNames from 'classnames';
import { formatCurrency } from 'utils/currency';
import Icon from 'presentation-component/ui/icon';
import { formatDateTime } from 'utils/date-time';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import { User } from 'types/api/auth';
import styles from './style.module.scss';

interface LixicoinPreviewProps {
  user: User;
  coinsExpireAt?: number;
  onTransactionsLinkClick?: () => void;
  classes?: { container?: string };
}
const LixicoinPreview = ({ user, coinsExpireAt, onTransactionsLinkClick, classes }: LixicoinPreviewProps) => {
  return (
    <div className={classNames(styles.lixicoinPreview, classes?.container)}>
      <div className={styles.coinViewContainer}>
        <div className={styles.coinView}>
          {formatCurrency(user.coins || 0)}
          <span>Lixicoin</span>
        </div>
        {!!coinsExpireAt && (
          <div className={styles.info}>{`Sẽ hết hạn vào ${formatDateTime(
            coinsExpireAt,
            DATETIME_FORMAT_TYPE.DD_MM_YYYY
          )}`}</div>
        )}
      </div>
      <div className={styles.infoView}>
        <div className={styles.link} onClick={() => onTransactionsLinkClick?.()}>
          Lịch sử Lixicoin
          <Icon name="angle-right" className={styles.linkIcon} />
        </div>
      </div>
    </div>
  );
};

export type { LixicoinPreviewProps };
export default LixicoinPreview;
