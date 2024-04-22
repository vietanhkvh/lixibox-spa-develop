import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { isEmptyObject } from 'utils/validate';
import { formatDateTime } from 'utils/date-time';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import { ORDER_TYPE } from 'constants/application/order';
import { numberFormat } from 'utils/format';
import { isMobileVersion } from 'utils/responsive';
import { currenyFormat } from 'utils/currency';
import { getProductStockNotice } from 'utils/model/product';
import SvgIcon from 'presentation-component/ui/icon';
import * as ROUTINGS from 'routings/path';
import styles from './style.module.scss';
import { Product } from 'types/api/shop';
import { CombinedProduct } from '../../../model';
import { CartState } from 'flows/cart/types';
import { ShopState } from 'flows/shop/types';

const RowItem = ({ onClick = () => {}, icon, children, isWithoutBorder = false, isDisplayAngleIcon = true }) => {
  const iconProps = icon;

  const angleIconProps = {
    name: 'angle-right',
    className: styles.angleIcon
  };

  return (
    <div className={classnames(styles.rowItem, { [styles.rowWithoutBorder]: !!isWithoutBorder })} onClick={onClick}>
      <SvgIcon {...iconProps} />
      <div className={styles.text}>{children}</div>
      {!!isDisplayAngleIcon && <SvgIcon {...angleIconProps} />}
    </div>
  );
};

const BigItem = ({ icon, children }) => {
  const iconProps = icon;

  return (
    <div className={styles.bigItem}>
      <SvgIcon {...iconProps} />
      <div className={styles.text}>{children}</div>
    </div>
  );
};

const GetCoin = ({ lixicoinBonus }) => {
  const iconProps = {
    name: 'dollar',
    className: styles.dollarIcon
  };

  return (
    <BigItem icon={iconProps}>
      {`Nhận ngay `}
      <span className={styles.boldText}>{`${numberFormat(lixicoinBonus)} Lixicoin`}</span>
      {` khi mua sản phẩm này`}
      <NavLink to={ROUTINGS.ROUTING_LIXI_COIN} className={styles.link}>
        <SvgIcon name={'info'} className={styles.infoIcon} />
      </NavLink>
    </BigItem>
  );
};

const FreeShip = ({ price, thresholdToFreeship, marketingSupportShippingFee }) => {
  const iconProps = {
    name: 'delivery',
    className: styles.deliveryIcon
  };

  return (
    <BigItem icon={iconProps}>
      <span className={styles.boldText}>{'Miễn phí giao hàng '}</span>
      {marketingSupportShippingFee > 0 && (
        <>
          tối đa <span className={styles.boldText}>{numberFormat(marketingSupportShippingFee / 1000)}K</span>{' '}
        </>
      )}
      {price < thresholdToFreeship ? (
        <>
          cho đơn hàng từ <span className={styles.boldText}>{numberFormat(thresholdToFreeship / 1000)}K</span>
        </>
      ) : (
        'cho sản phẩm này'
      )}
      <NavLink to={ROUTINGS.ROUTING_INFO_SHIPPING_FEE} className={styles.link}>
        <SvgIcon name={'info'} className={styles.infoIcon} />
      </NavLink>
    </BigItem>
  );
};

const Refund = () => {
  const iconProps = {
    name: 'refurn',
    className: styles.refurnIcon
  };

  return (
    <BigItem icon={iconProps}>
      {'Đổi trả hàng '}
      <br />
      {' trong '}
      <span className={styles.boldText}>7 ngày</span>
      <NavLink to={ROUTINGS.ROUTING_INFO_RECEIVE_AND_REDEEM} className={styles.link}>
        <SvgIcon name={'info'} className={styles.infoIcon} />
      </NavLink>
    </BigItem>
  );
};

const InStore = ({ onClick }) => {
  const iconProps = {
    name: 'store',
    className: styles.storeIcon
  };

  return (
    <RowItem onClick={onClick} icon={iconProps}>
      Có sẵn tại cửa hàng
    </RowItem>
  );
};

const DeliverFee = ({ onClick, shipFeeList }) => {
  const iconProps = {
    name: 'mark-location',
    className: styles.markLocationIcon
  };

  return isEmptyObject(shipFeeList) ? (
    <RowItem onClick={onClick} icon={iconProps}>
      Xem phí giao hàng
    </RowItem>
  ) : (
    <>
      <RowItem isWithoutBorder onClick={onClick} icon={iconProps}>
        Địa chỉ: <span className={styles.blueText}>{`${shipFeeList.districtName}, ${shipFeeList.provinceName}`}</span>
      </RowItem>
      <ShippingFee shipFeeList={shipFeeList} />
    </>
  );
};

const ShippingFee = ({ shipFeeList }) => {
  const deliveryFee = !!shipFeeList.shipping_fee ? currenyFormat(shipFeeList.shipping_fee) : 'Miễn phí';
  const minTime =
    (shipFeeList.shipping_time.min && formatDateTime(shipFeeList.shipping_time.min, DATETIME_FORMAT_TYPE.DD_MM)) || 0;
  const maxTime =
    (shipFeeList.shipping_time.max && formatDateTime(shipFeeList.shipping_time.max, DATETIME_FORMAT_TYPE.DD_MM)) || 0;
  const deliveryTime = minTime + ' - ' + maxTime;
  const isShowEstTime = !!minTime && !!maxTime;
  return (
    <div className={styles.estTime}>
      <div className={classnames(styles.text)}>
        Giao hàng tiêu chuẩn: <span className={styles.boldText}>{deliveryFee}</span>
      </div>
      {!!isShowEstTime && (
        <div className={classnames(styles.text)}>
          Thời gian giao dự kiến: <span className={styles.boldText}>{deliveryTime}</span>
        </div>
      )}
      <div className={classnames(styles.text)}>Giao hàng giờ hành chính từ Thứ 2 đến Thứ 7</div>
    </div>
  );
};

const Stock = ({ notice, stock, storeStock, preOrderStatus, onClick }) => {
  if (preOrderStatus === ORDER_TYPE.PENDING) return null;
  if (null === stock || stock > 5) return null;

  const iconProps = {
    name: 'info',
    className: styles.warningIcon
  };

  const onClickAction = 0 === stock && 0 !== storeStock ? onClick : () => {};

  return (
    <RowItem icon={iconProps} onClick={onClickAction} isDisplayAngleIcon={false}>
      <span className={styles.redText}>{notice}</span>
    </RowItem>
  );
};

interface NewProductInfoProps {
  product: Product;
  combinedProduct: CombinedProduct;
  cartStore: CartState;
  shopStore: ShopState;
  provinceStore: any;
  onClickStore: () => void;
  onClickDeliveryCalc: () => void;
}
const NewProductInfo = ({
  product,
  combinedProduct,
  cartStore,
  shopStore: { storeBoxes },
  provinceStore: { shipFeeList },
  onClickStore = () => {},
  onClickDeliveryCalc = () => {}
}: NewProductInfoProps) => {
  const box = product?.box;
  const stock = combinedProduct.stock;
  const storeStock = combinedProduct.storeStock;
  const price = combinedProduct.currentPrice;
  const lixicoinBonus = !!product && !!product.box && product.box.lixicoin_bonus;
  const preOrderStatus = (product && product.box && product.box.pre_order_status) || '';
  const constants = cartStore.constants || null;

  const thresholdToFreeship = constants.threshold_to_freeship || 0;
  const marketingSupportShippingFee = constants.marketing_support_shipping_fee || 0;
  const { shouldShow, notice } = getProductStockNotice({ box });

  return (
    <div className={classnames(styles.container, { [styles.containerWithBoreder]: !isMobileVersion() })}>
      <div className={styles.bigContainer}>
        <GetCoin lixicoinBonus={lixicoinBonus} />
        <FreeShip
          price={price}
          thresholdToFreeship={thresholdToFreeship}
          marketingSupportShippingFee={marketingSupportShippingFee}
        />
        <Refund />
      </div>
      <div className={styles.rowContainer}>
        {!!shouldShow && !!notice && (
          <Stock {...{ notice, stock, storeStock, preOrderStatus }} onClick={onClickStore} />
        )}
        {Array.isArray(storeBoxes) && storeBoxes.length > 0 && <InStore onClick={onClickStore} />}
        <DeliverFee onClick={onClickDeliveryCalc} shipFeeList={shipFeeList} />
      </div>
    </div>
  );
};

export default NewProductInfo;
