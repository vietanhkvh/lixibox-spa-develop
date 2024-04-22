import classnames from 'classnames';

import { ORDER_TYPE_VALUE } from '../../../constants/application/order';
import styles from './style.module.css';

const OrderStatusLabel = ({ type, className = '' }) => {
  if (!ORDER_TYPE_VALUE.hasOwnProperty(type)) return null;

  const title = ORDER_TYPE_VALUE[type].title;
  const color = ORDER_TYPE_VALUE[type].colorType;
  const itemProps = {
    className: classnames(styles.container, { [styles[color]]: true }, className)
  };

  return <div {...itemProps}>{title}</div>;
};

export default OrderStatusLabel;
