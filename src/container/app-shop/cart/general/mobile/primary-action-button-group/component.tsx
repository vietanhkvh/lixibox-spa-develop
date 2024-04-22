import { useState } from 'react';
import { createPortal } from 'react-dom';
import SubmitButton from 'presentation-component/ui/submit-button';
import { formatCurrency } from 'utils/currency';
import Icon from 'presentation-component/ui/icon';
import PricingBreakdown from '../../pricing-breakdown';
import PromotionsButton from '../../promotions-button';
import { PropsFromRedux } from './store';
import styles from './style.module.scss';

interface PrimaryActionButtonGroupProps extends PropsFromRedux {
  isLoading?: boolean;
  onClick?: () => void;
}
const PrimaryActionButtonGroup = ({ isLoading, onClick, cartStore: { cartDetail } }: PrimaryActionButtonGroupProps) => {
  const [isStickyBreakdownOpen, setIsStickyBreakdownOpen] = useState(false);
  const totalPrice = cartDetail?.total_price || 0;

  return (
    <>
      <div className={styles.primaryActionButtonGroup}>
        {isStickyBreakdownOpen && (
          <div className={styles.breakdownSection}>
            <PricingBreakdown {...{ classes: { container: styles.breakdownSectionContent } }} />
          </div>
        )}
        {!isStickyBreakdownOpen && <PromotionsButton classes={{ container: styles.promotionsButton }} />}
        <div className={styles.infoSection}>
          <div className={styles.infoSectionTitle}>Tổng tiền</div>
          <Icon
            name={isStickyBreakdownOpen ? 'angle-down' : 'angle-up'}
            className={styles.infoSectionPricingInfoButton}
            onClick={() => setIsStickyBreakdownOpen((prev) => !prev)}
          />
          <div className={styles.infoSectionContent} onClick={() => setIsStickyBreakdownOpen((prev) => !prev)}>
            {formatCurrency(totalPrice, { suffix: true })}
          </div>
        </div>
        <SubmitButton
          {...{
            title: 'Đặt hàng',
            classes: { container: styles.primaryActionButton },
            loading: isLoading,
            onSubmit() {
              onClick?.();
            }
          }}
        />
        {isStickyBreakdownOpen &&
          createPortal(
            <div className={styles.overlay} onClick={() => setIsStickyBreakdownOpen(false)} />,
            document.body
          )}
      </div>
      <div className={styles.filler} />
    </>
  );
};

export default PrimaryActionButtonGroup;
