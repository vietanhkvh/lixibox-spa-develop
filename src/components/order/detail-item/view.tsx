import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ROUTING_USER_ORDER, ROUTING_USER_ORDER_STORE_PURCHASES } from '../../../routings/path';
import Image from 'presentation-component/ui/image';
import OrderStatusLabel from '../../../presentation-component/order/order-status-label';
import SubmitButton from '../../../components/ui/submit-button';
import { currenyFormat } from '../../../utils/currency';
import { isMobileVersion } from '../../../utils/responsive';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';

import { IProps } from './model';
import styles from './style.module.scss';
import { isEmptyObject } from '../../../utils';
import { ORDER_TYPE } from 'constants/application/order';

const Heading = ({ id, status }) => (
  <div className={styles.header}>
    <div className={styles.orderId}>
      Mã đơn hàng: <span>#{id}</span>
    </div>
    <OrderStatusLabel type={status} className={styles.status} />
  </div>
);

function ProductItem(item, index) {
  if (!item || !item.box) return null;

  const isOrderCancelled = this.orderStatus === ORDER_TYPE.CANCELLED;
  const isItemCancelled = item.status === ORDER_TYPE.CANCELLED;

  const itemProps = {
    className: classnames(styles.item, !isOrderCancelled && isItemCancelled && styles.itemCancelled),
    key: item.id || index
  };

  return (
    <div {...itemProps}>
      <Image
        {...{
          alt: '',
          className: styles.img,
          src:
            item.box.primary_picture_medium_url ||
            (!!item.box.primary_picture && item.box.primary_picture.medium_url) ||
            ''
        }}
      />
      {!isMobileVersion() && <div className={styles.name}>{item.box.name}</div>}
    </div>
  );
}

const ProductList = ({ list, orderStatus }) => {
  if (!list || !list.length) return null;

  const nameList = `${!!list[0].box && list[0].box.name}${
    list.length > 1 ? '... và ' + (list.length - 1) + ' sản phẩm khác' : ''
  }`;

  return (
    <div className={styles.productList}>
      <div className={styles.panel}>
        {Array.isArray(list) && list.map(ProductItem, { orderStatus })}
        <div className={styles.offsetItem} />
      </div>
      {!!isMobileVersion() && <div className={styles.nameList}>{nameList}</div>}
    </div>
  );
};

const ContentInfoItem = ({ title, content }) => (
  <div className={styles.contentItem}>
    <div className={styles.title}>{title}</div>
    <div className={styles.value}>{content}</div>
  </div>
);

const Content = ({ openModalAction, data, cancelOrderAction, cancelOrderReasonList, pathOrderDetails }) => {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <ContentInfoItem
          title={'Ngày mua hàng:'}
          content={formatDateTime(data.created_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
        />
        <ContentInfoItem title={'Tổng tiền:'} content={currenyFormat(data.total_price)} />
      </div>

      {!isMobileVersion() && (
        <SubmitButton
          type={'link'}
          link={`${pathOrderDetails}/${data.number}`}
          title={'Xem chi tiết'}
          color={'borderGrey'}
          size={'small'}
          style={{ width: 100, margin: 0 }}
        />
      )}
    </div>
  );
};

const tranferStoreOrder = (newKeys, value) => {
  const renameKeys = (value) => {
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(renameKeys);
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [newKeys[k] || k, renameKeys(v)]));
  };
  const result = renameKeys(value);
  return result;
};

const renderView = (props: IProps) => {
  const { data, openModalAction, cancelOrderAction, cancelOrderReasonList, orderType } = props as IProps;
  let pathOrderDetails: string = '';
  let newData = { ...data };

  if (orderType === 'ONLINE_ORDER') {
    pathOrderDetails = ROUTING_USER_ORDER;
  } else {
    const newKeys = { checkouted_at: 'created_at', primary_picture_medium_url: 'primary_picture' };
    pathOrderDetails = ROUTING_USER_ORDER_STORE_PURCHASES;
    newData = Object.assign({ status: ORDER_TYPE.FULFILLED }, data);
    newData = tranferStoreOrder(newKeys, newData);
    const orderBoxes = newData.order_boxes || [];
    newData.order_boxes = orderBoxes.map((item) => {
      if (!item.box.primary_picture.medium_url) item.box.primary_picture = { medium_url: item.box.primary_picture };
      return item;
    });
  }
  return isEmptyObject(newData) ? null : (
    <NavLink
      to={`${pathOrderDetails}/${newData.number}`}
      className={classnames(styles.container, { [styles.desktop]: !isMobileVersion() })}
    >
      {Heading({ id: newData.number, status: newData.status })}
      {ProductList({ list: newData.order_boxes, orderStatus: newData.status })}
      {Content({
        openModalAction,
        data: newData,
        cancelOrderAction,
        cancelOrderReasonList,
        pathOrderDetails
      })}
    </NavLink>
  );
};

export default renderView;
