import { ORDER_TYPE } from 'constants/application/order';
import SvgIcon from 'presentation-component/ui/icon';
import { formatDateTime } from 'utils/date-time';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import styles from './style.module.scss';

interface DeliveryStatusProps {
  preOrderStatus: string;
  preOrderReleaseDate: number;
}
const DeliveryStatus = ({ preOrderStatus, preOrderReleaseDate }: DeliveryStatusProps) => {
  if (preOrderStatus !== ORDER_TYPE.PENDING) return null;

  const estTime = formatDateTime(preOrderReleaseDate, DATETIME_FORMAT_TYPE.DD_MM_YYYY);
  const title = `Bạn sẽ nhận được hàng từ ${estTime}`;

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <SvgIcon {...{ name: 'history', className: styles.icon }} />
        <span className={styles.text}>{title}</span>
      </div>
    </div>
  );
};

export default DeliveryStatus;
