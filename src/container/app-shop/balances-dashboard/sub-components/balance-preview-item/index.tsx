import classNames from 'classnames';
import { formatCurrency } from 'utils/currency';
import Icon from 'presentation-component/ui/icon';
import { formatDateTime } from 'utils/date-time';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import styles from './style.module.scss';

const BalancePreviewViewType = Object.freeze({
  CONFIRMED: 'confirmed' as const,
  PENDING: 'pending' as const
});
type BalancePreviewTypeType = (typeof BalancePreviewViewType)[keyof typeof BalancePreviewViewType];
interface BalancePreviewItemProps {
  type: BalancePreviewTypeType;
  value: number;
  expirableValue?: number;
  expiryDate?: number;
  classes?: { container?: string };
}
const BalancePreviewItem = ({ type, value, expirableValue, expiryDate, classes }: BalancePreviewItemProps) => {
  const isConfirmed = type === BalancePreviewViewType.CONFIRMED;

  return (
    <div
      className={classNames(
        styles.balancePreviewItem,
        classes?.container,
        !isConfirmed && styles.balancePreviewItemPending
      )}
    >
      <div className={styles.balancePreviewItemValue}>
        {isConfirmed && <Icon name="dollar-time" className={styles.itemIcon} />}
        <span className={classNames(styles.itemContent, isConfirmed && styles.itemContentWithIcon)}>
          {formatCurrency(value || 0)}
          <span className={styles.itemContentSuffix}>đ</span>
        </span>
      </div>
      {!isConfirmed ? (
        <div className={styles.balancePreviewItemInfo}>
          <span>Sẽ nhận được khi hoàn thành đơn hàng hiện tại</span>
        </div>
      ) : !!expirableValue ? (
        <div className={styles.balancePreviewItemInfo}>
          <span className={styles.expirableValue}>{formatCurrency(expirableValue, { suffix: true })}</span>
          <span>{`sẽ hết hạn vào ${formatDateTime(expiryDate, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}`}</span>
        </div>
      ) : null}
    </div>
  );
};

export type { BalancePreviewItemProps, BalancePreviewTypeType };
export { BalancePreviewViewType };
export default BalancePreviewItem;
