import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface TransactionHistoryTabCapsuleProps {
  icon: string;
  title: string;
  value: string;
  isActive: boolean;
  onClick?: () => void;
  classes?: { container?: string };
}
const TransactionHistoryTabCapsule = ({
  icon,
  title,
  value,
  isActive,
  onClick,
  classes
}: TransactionHistoryTabCapsuleProps) => {
  return (
    <div
      className={classNames(styles.tabCapsule, classes?.container, isActive && styles.tabCapsuleActive)}
      onClick={() => !isActive && onClick?.()}
    >
      <div className={styles.tabIconContainer}>
        <Icon name={icon} className={styles.tabIcon} />
      </div>
      <div className={styles.tabInfo}>
        <div className={styles.value}>{value}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default TransactionHistoryTabCapsule;
