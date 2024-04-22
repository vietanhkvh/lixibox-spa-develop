import { useState } from 'react';
import classNames from 'classnames';
import { getCartPricing } from 'utils/cart';
import { generateTestId } from 'utils/test-utils';
import { formatCurrency } from 'utils/currency';
import Icon from 'presentation-component/ui/icon';
import Loading from 'components/ui/loading';
import CashbackInfoModal from 'presentation-component/checkout/generic/cashback-info-modal';
import PriceSegment from 'presentation-component/checkout/generic/price-segment';
import { PropsFromRedux } from './store';
import style from './style.module.scss';
import { useLocation } from 'react-router-dom';
import { ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT } from 'routings/path';

interface CashbackAppliedLabelProps {
  value: number;
  isApplied: boolean;
  isToggling: boolean;
  isDisabled?: boolean;
  onToggle: (enable: boolean) => void;
  onInfoClick: () => void;
}
const CashbackAppliedLabel = ({
  value,
  isApplied,
  isToggling,
  isDisabled,
  onToggle,
  onInfoClick
}: CashbackAppliedLabelProps) => {
  return (
    <span className={style.cashbackAppliedLabel}>
      {isToggling ? (
        <Loading classes={{ container: style.loader }} />
      ) : (
        <Icon
          name={isApplied ? 'checkbox-checked' : 'checkbox-empty'}
          className={classNames(style.checkbox, isDisabled && style.checkboxDisabled)}
          onClick={() => !isToggling && onToggle(!isApplied)}
        />
      )}
      <span className={classNames(style.label, isDisabled && style.labelDisabled)}>
        Dùng số dư{!!value ? ` (tối đa ${formatCurrency(value, { suffix: true })})` : ''}
      </span>
      <Icon name={'info'} className={style.info} onClick={() => onInfoClick?.()} />
    </span>
  );
};

interface PriceBreakdownItem {
  id: string;
  type: string;
  value: string;
  classes?: { container?: string; label?: string; value?: string };
}
interface PricingBreakdownProps extends PropsFromRedux {
  cartView: boolean;
  className: string;
  cartCheckout?: boolean;
}
/**
 * Prerequisites:
 * - cartDetail must be available
 */
const PricingBreakdown = ({
  cartView,
  className,
  cartCheckout,
  cartStore: { cartDetail, toggleApplyBalanceStatus, constants },
  toggleApplyBalanceStatusAction
}: PricingBreakdownProps) => {
  const location = useLocation();
  const [isCashbackInfoModalOpen, setIsCashbackInfoModalOpen] = useState(false);
  let priceBreakdownSectionGeneric: Array<PriceBreakdownItem> = [],
    priceBreakdownSectionBonus: Array<PriceBreakdownItem> = [];
  const isCartOrPaymentView = [ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT].includes(location.pathname);

  const cartPricingOrder = ['subtotalPrice', 'subtotalCoins', 'discountPrice', 'balanceUsed', 'lixicoinAccumulated'];
  const paymentPricingOrder = [
    'subtotalPrice',
    'subtotalCoins',
    'shippingPrice',
    'servicesPrice',
    'discountPrice',
    'discountCode',
    'balanceUsed',
    'lixicoinAccumulated'
  ];
  const pricingOrder: Array<any> = cartView ? cartPricingOrder : paymentPricingOrder;
  const {
    applicableBalance,
    viewSpecificSubtotalPriceFormatted,
    viewSpecificSubtotalCoinsFormatted,
    viewSpecificShippingPriceFormatted,
    viewSpecificServicesPrice,
    viewSpecificServicesPriceFormatted,
    viewSpecificDiscountAndPromotionsPrice,
    viewSpecificDiscountAndPromotionsPriceFormatted,
    viewSpecificDiscountOrReferralCode,
    viewSpecificBalanceUsed,
    viewSpecificBalanceUsedFormatted,
    viewSpecificLixicoinBonusFormatted,
    viewSpecificCashbackBonusFormatted,
    viewSpecificTotalPriceFormatted
  } = getCartPricing({ cartDetail, isCartView: cartView });

  // TODO: Deduplicate (order detail pricing breakdown is duplicate)
  priceBreakdownSectionGeneric.push({
    id: 'subtotalPrice',
    type: 'Tiền hàng',
    value: viewSpecificSubtotalPriceFormatted
  });
  priceBreakdownSectionGeneric.push({
    id: 'shippingPrice',
    type: 'Phí giao hàng',
    value: viewSpecificShippingPriceFormatted
  });
  viewSpecificServicesPrice &&
    priceBreakdownSectionGeneric.push({
      id: 'servicesPrice',
      type: 'Phí dịch vụ kèm theo',
      value: viewSpecificServicesPriceFormatted
    });
  viewSpecificDiscountAndPromotionsPrice &&
    priceBreakdownSectionGeneric.push({
      id: 'discountPrice',
      type: 'Giảm giá',
      value: viewSpecificDiscountAndPromotionsPriceFormatted,
      classes: { value: style.highlightBlue }
    });
  viewSpecificDiscountOrReferralCode &&
    priceBreakdownSectionGeneric.push({
      id: 'discountCode',
      type: 'Mã giảm giá',
      value: viewSpecificDiscountOrReferralCode,
      classes: { value: style.highlightBlue }
    });

  priceBreakdownSectionGeneric = pricingOrder
    .map((orderedId) => priceBreakdownSectionGeneric.find(({ id }) => id === orderedId))
    .filter((item) => item);

  // Bonus section
  priceBreakdownSectionBonus.push({
    id: 'lixicoinAccumulated',
    type: 'Lixicoin nhận được',
    value: viewSpecificLixicoinBonusFormatted,
    classes: { value: style.highlightGreen }
  });
  priceBreakdownSectionBonus.push({
    id: 'cashbackAccumulated',
    type: 'Hoàn tiền',
    value: viewSpecificCashbackBonusFormatted,
    classes: { value: style.highlightGreen }
  });

  const dataTestIdName = (type) => {
    if (type === 'Tiền hàng') {
      if (cartView) {
        return 'payment_amount_cart';
      }
      if (cartCheckout) {
        return 'payment_order_checkout';
      }
      return 'payment_amount2_success_order';
    } else if (type === 'Phí giao hàng') {
      if (cartView) {
        return 'fee_deliver_cart';
      }
      if (cartCheckout) {
        return 'fee_deliver_checkout';
      }
      return 'fee_deliver_success_order';
    } else {
      if (cartView) {
        return 'coin_amount_cart';
      }
      if (cartCheckout) {
        return 'coin_amount_checkout';
      }
      return 'coin_success_order';
    }
  };

  return (
    <div className={classNames(style.pricingBreakdown, className)} {...generateTestId({ name: 'pricing-breakdown' })}>
      <div className={style.breakdownSection}>
        {priceBreakdownSectionGeneric.map(({ type, value, classes }, index) => (
          <PriceSegment key={index} {...{ label: type, value, classes, testId: dataTestIdName(type) }} />
        ))}
        <div className={style.dashedDivider} />
        {/* RedeemSection: subtotalCoins */}
        <PriceSegment
          label={'Dùng Lixicoin'}
          value={viewSpecificSubtotalCoinsFormatted}
          testId={dataTestIdName('Dùng Lixicoin')}
        />
        {/* RedeemSection: redeemedBalances */}
        {!isCartOrPaymentView ? (
          <PriceSegment
            label={'Dùng số dư'}
            value={
              cartDetail?.applied_applicable_balances
                ? viewSpecificBalanceUsedFormatted
                : formatCurrency(0, { suffix: true })
            }
            testId={dataTestIdName('Dùng số dư')}
          />
        ) : (
          <PriceSegment
            label={
              <CashbackAppliedLabel
                value={cartDetail?.applicable_balance || 0}
                isApplied={!!cartDetail?.applied_applicable_balances}
                isToggling={toggleApplyBalanceStatus.processing}
                isDisabled={!applicableBalance}
                onToggle={(enable) => toggleApplyBalanceStatusAction({ enabled: enable })}
                onInfoClick={() => setIsCashbackInfoModalOpen(true)}
              />
            }
            value={
              cartDetail?.applied_applicable_balances
                ? viewSpecificBalanceUsedFormatted
                : formatCurrency(0, { suffix: true })
            }
            testId={dataTestIdName('Dùng số dư')}
          />
        )}
        <div className={style.solidDivider} />
        <PriceSegment
          {...{
            label: cartView ? 'Tạm tính' : 'Tổng tiền',
            value: viewSpecificTotalPriceFormatted,
            classes: { value: style.emphasized }
          }}
        />
        {!!priceBreakdownSectionBonus.length && <div className={style.dashedDivider} />}
        {priceBreakdownSectionBonus.map(({ type, value, classes }, index) => (
          <PriceSegment key={index} {...{ label: type, value, classes, testId: dataTestIdName(type) }} />
        ))}
      </div>
      <CashbackInfoModal
        isOpen={isCashbackInfoModalOpen}
        totalBalance={viewSpecificBalanceUsed}
        /**
         * FIXME: 30% hardcoded fallback was added since the constants API was not available at the time of release.
         * TODO: Replace hardcoded fallback with 0 once constants API is available.
         */
        cashbackRedeemPercentage={constants?.cashback_redeem_percentage || 30}
        onRequestClose={() => setIsCashbackInfoModalOpen(false)}
      />
    </div>
  );
};
PricingBreakdown.defaultProps = { className: '', cartView: false };

export default PricingBreakdown;
