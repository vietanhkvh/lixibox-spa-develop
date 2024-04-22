import { DiscountCode } from 'types/api/cart';
import DiscountBlock from 'presentation-component/ui/discount-block';
import Icon from 'presentation-component/ui/icon';
import { formatCurrency } from 'utils/currency';
import * as VARIABLE from 'style/variable';
import styles from './style.module.scss';

interface DisplayContainerProps {
  children: React.ReactNode;
  viewMode: 'coupon' | 'plain';
  classes?: { container?: string };
}
const DisplayContainer = ({ children, viewMode, classes }: DisplayContainerProps) => {
  return viewMode === 'coupon' ? (
    <DiscountBlock edgeColor={VARIABLE.colorF4} classes={{ container: styles.container }}>
      {children}
    </DiscountBlock>
  ) : (
    <div className={classes?.container}>{children}</div>
  );
};

interface DiscountCodeProgressProps {
  discountCode: DiscountCode;
  viewMode?: 'coupon' | 'plain';
}
const DiscountCodeProgress = ({
  discountCode: { description: _description, order_price_min, remaining_amount, code },
  viewMode
}: DiscountCodeProgressProps) => {
  const description = _description || '';
  const orderPriceMin = order_price_min || 0;
  const remainingAmount = remaining_amount || 0;
  const firstDiscountCode = code || '';
  const progressPercentage = (1 - Math.max(0, remainingAmount) / orderPriceMin) * 100;

  return (
    <DisplayContainer viewMode={viewMode} classes={{ container: styles.container }}>
      <div className={styles.hintBox}>
        <div className={styles.hint}>
          {remainingAmount > 0 && (
            <>
              Mua thêm <span className={styles.bold}>{formatCurrency(remainingAmount, { suffix: true })}</span> để được
              &nbsp;
            </>
          )}
          {description}
          {remainingAmount > 0 || (
            <>
              &nbsp; - Nhập mã <span className={styles.bold}>{firstDiscountCode}</span>
            </>
          )}
        </div>
        <div className={styles.progress}>
          <div className={styles.bar}>
            <div style={{ width: `${progressPercentage}%` }} className={styles.segmentDone} />
          </div>
          <div className={styles.iconContainer}>
            <Icon name={'gift'} className={styles.icon} />
          </div>
        </div>
      </div>
    </DisplayContainer>
  );
};
DiscountCodeProgress.defaultProps = {
  viewMode: 'coupon' as const
};

export default DiscountCodeProgress;
