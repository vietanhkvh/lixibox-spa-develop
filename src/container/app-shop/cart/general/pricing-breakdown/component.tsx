import { useState } from 'react';
import classNames from 'classnames';
import { formatCurrency } from 'utils/currency';
import {
  getRepresentableCartPriceReductions,
  getRepresentableCartServicePrices,
  getRepresentableCartTotalPrice,
  getRepresentableCartValue
} from 'utils/cart';
import {
  getRepresentableOrderPriceReductions,
  getRepresentableOrderServicePrices,
  getRepresentableOrderTotalPrice,
  getRepresentableOrderValue
} from 'utils/order';
import Icon from 'presentation-component/ui/icon';
import MobileConfirmation from 'presentation-component/ui/mobile-confirmation';
import { Order } from 'types/api/order';
import { PropsFromRedux } from './store';
import styles from './style.module.scss';

interface ChargeReductionItemProps {
  icon: string;
  title: string;
  value: number;
  classes?: { container?: string };
}
const ChargeReductionItem: React.FC<ChargeReductionItemProps> = ({ icon, title, value, classes }) => {
  return (
    <div className={classNames(styles.chargeReductionItem, classes?.container)}>
      <Icon name={icon} className={styles.chargeReductionItemIcon} />
      <div className={classNames(styles.chargeReductionItemTitle, 'lineClamp1')}>{title}</div>
      <div className={styles.chargeReductionItemValue}>-{formatCurrency(value, { suffix: true })}</div>
    </div>
  );
};

interface PricingBreakdownProps extends PropsFromRedux {
  showTotal?: boolean;
  /**
   * When order is specified, the pricing breakdown will be based on the order's data.
   */
  order?: Order;
  classes?: { container?: string };
}
const PricingBreakdown: React.FC<PricingBreakdownProps> = ({
  showTotal,
  order,
  cartStore: { cartDetail },
  classes
}) => {
  const [isServiceBreakdownPopupOpen, setIsServiceBreakdownPopupOpen] = useState(false);
  const [servicePrices, servicePriceTotal] = order
    ? getRepresentableOrderServicePrices({ order })
    : getRepresentableCartServicePrices({ cart: cartDetail });
  const cartValue = order ? getRepresentableOrderValue({ order }) : getRepresentableCartValue({ cart: cartDetail });
  const priceReductions = order
    ? getRepresentableOrderPriceReductions({ order })
    : getRepresentableCartPriceReductions({ cart: cartDetail });
  const totalPrice = order
    ? getRepresentableOrderTotalPrice({ order })
    : getRepresentableCartTotalPrice({ cart: cartDetail });

  return (
    <div className={classNames(styles.pricingBreakdown, classes?.container)}>
      <div className={styles.cartValue}>
        <div className={styles.cartValueTitle}>Tiền hàng</div>
        <div className={styles.cartValueContent}>{formatCurrency(cartValue, { suffix: true })}</div>
      </div>
      {!!servicePrices?.length && (
        <div className={styles.serviceChargeTotal}>
          <div className={styles.serviceChargeTotalTitle}>Phí dịch vụ</div>
          <Icon
            name="info"
            className={styles.serviceChargeTotalInfo}
            onClick={() => setIsServiceBreakdownPopupOpen(true)}
          />
          <div className={styles.serviceChargeTotalContent}>{formatCurrency(servicePriceTotal, { suffix: true })}</div>
        </div>
      )}
      {priceReductions.map((priceReduction, index) => (
        <ChargeReductionItem
          key={index}
          icon={priceReduction?.icon}
          title={priceReduction?.title}
          value={priceReduction?.value}
        />
      ))}
      {showTotal && (
        <div className={styles.total}>
          <div className={styles.totalTitle}>Tổng tiền</div>
          <div className={styles.totalContent}>{formatCurrency(totalPrice, { suffix: true })}</div>
        </div>
      )}
      <MobileConfirmation
        isOpen={isServiceBreakdownPopupOpen}
        title="Phí dịch vụ"
        confirmationButton={{ text: 'Đồng ý' }}
        onConfirm={() => setIsServiceBreakdownPopupOpen(false)}
        onCancel={() => setIsServiceBreakdownPopupOpen(false)}
      >
        <div className={styles.serviceBreakdownPopupContent}>
          {servicePrices.map((service, index) => (
            <div key={index} className={styles.serviceBreakdownPopupItem}>
              <div className={styles.serviceBreakdownPopupItemSection1}>
                <div className={classNames(styles.serviceBreakdownPopupItemTitle, 'lineClamp1')}>{service.name}</div>
                <div className={styles.serviceBreakdownPopupItemValue}>
                  {formatCurrency(service?.price || 0, { suffix: true })}
                </div>
              </div>
              {!!service.description && (
                <div className={classNames(styles.serviceBreakdownPopupItemDescription, 'lineClamp1')}>
                  {service.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </MobileConfirmation>
    </div>
  );
};

export default PricingBreakdown;
