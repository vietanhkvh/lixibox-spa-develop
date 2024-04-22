import classNames from 'classnames';
import { generatePath, useHistory } from 'react-router-dom';
import Icon from 'presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import { formatDateTime } from 'utils/date-time';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import { ROUTING_PRODUCT_DETAIL } from 'routings/path';
import { UserTransaction, UserTransactionType } from 'flows/user/types';
import { ProductBox } from 'types/api/shop';
import styles from './style.module.scss';

const TransactionViewType = Object.freeze({
  ADDITION: 'addition' as const,
  SUBTRACTION: 'subtraction' as const,
  EXPIRED: 'expired' as const
});
type TransactionViewTypeType = (typeof TransactionViewType)[keyof typeof TransactionViewType];

const mapTransactionTypeToViewType = (transaction: UserTransaction): TransactionViewTypeType => {
  switch (transaction.type) {
    case UserTransactionType.BALANCE_ADDITION:
    case UserTransactionType.LIXICOIN_ADDITION:
      return TransactionViewType.ADDITION;
    case UserTransactionType.LIXICOIN_SUBTRACTION:
    case UserTransactionType.BALANCE_SUBTRACTION:
      if (transaction.reason === 'cashback_expired') {
        return TransactionViewType.EXPIRED;
      }
      return TransactionViewType.SUBTRACTION;
    default:
      return TransactionViewType.ADDITION;
  }
};

const isLixicoinTransaction = (transaction: UserTransaction): boolean => {
  switch (transaction.type) {
    case UserTransactionType.LIXICOIN_ADDITION:
    case UserTransactionType.LIXICOIN_SUBTRACTION:
      return true;
    default:
      return false;
  }
};

interface TransactionProps {
  title: string;
  id?: string;
  timestamp: number;
  delta: string;
  currentValue: string;
  boxes?: ProductBox[];
  viewType: TransactionViewTypeType;
  icon?: string;
}
const Transaction = ({ title, id, timestamp, delta, currentValue, boxes, viewType, icon }: TransactionProps) => {
  const history = useHistory();
  return (
    <div
      className={classNames(
        styles.transactionItem,
        viewType === TransactionViewType.ADDITION && styles.transactionItemAddition,
        viewType === TransactionViewType.SUBTRACTION && styles.transactionItemSubtraction,
        viewType === TransactionViewType.EXPIRED && styles.transactionItemExpired
      )}
    >
      <div className={styles.leftSection}>
        <div className={styles.transactionIconContainer}>
          <Icon name={icon} className={styles.transactionIcon} />
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightTopSection}>
          <div className={styles.info}>
            {!!title && <div className={styles.title}>{title}</div>}
            {!!id && <div className={styles.id}>#{id}</div>}
            {!!timestamp && (
              <div className={styles.timestamp}>{formatDateTime(timestamp, DATETIME_FORMAT_TYPE.DD_MM_YYYY_HH_MM)}</div>
            )}
          </div>
          <div className={styles.values}>
            {!!delta && <div className={styles.delta}>{delta}</div>}
            {!!currentValue && <div className={styles.currentValue}>{currentValue}</div>}
          </div>
        </div>
        {!!boxes?.length && (
          <div className={styles.rightBottomSection}>
            {boxes.map((box) => (
              <Image
                key={box.id}
                src={box.primary_picture?.thumb_url || ''}
                alt={''}
                className={styles.boxImage}
                onClick={() =>
                  history.push(box?.slug ? generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: box?.slug }) : '#')
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
Transaction.defaultProps = {
  icon: 'wallet'
};

export type { TransactionViewTypeType };
export { TransactionViewType, mapTransactionTypeToViewType, isLixicoinTransaction };
export default Transaction;
