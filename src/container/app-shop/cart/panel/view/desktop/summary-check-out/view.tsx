import DiscountCodeBlock from 'components/cart/discount-code';
import DescriptionInfo from 'components/cart/description-info';
import PricingSummary from 'presentation-component/checkout/generic/desktop/pricing-summary';
import CartProductsBrief from '../../../../general/desktop/cart-products-brief';
import PricingBreakdown from 'container/app-shop/cart/general/pricing-breakdown';
import PromotionsButton from 'container/app-shop/cart/general/promotions-button';
import { ROUTING_CHECK_OUT, ROUTING_CHECK_OUT_PAYMENT } from 'routings/path';
import { generateTestId } from 'utils/test-utils';
import * as VARIABLE from 'style/variable';
import STYLE from './style';
import styles from './style.module.scss';

const renderView = ({ props }) => {
  const {
    cartStore: { cartList, cartDetail, suggestionDiscountCodes },
    isShowDiscount,
    style,
    pathname
  } = props;
  const isCheckoutRoute = pathname === ROUTING_CHECK_OUT;

  const isShowCartDescription = pathname === ROUTING_CHECK_OUT && !!cartDetail && !!cartDetail.description;
  const isPaymentRoute = pathname === ROUTING_CHECK_OUT_PAYMENT;

  return (
    <div
      className={styles.cartSummaryCheckout}
      style={Object.assign({}, STYLE.container(), style)}
      {...generateTestId({ name: 'summary-checkout' })}
    >
      {isCheckoutRoute && <PromotionsButton classes={{ container: styles.promotionsButton }} />}
      {false && isShowCartDescription && (
        <DescriptionInfo
          color={'primary'}
          style={{ backgroundColor: VARIABLE.colorPrimary }}
          description={cartDetail.description}
        />
      )}
      {false &&
        isShowDiscount &&
        cartList &&
        !!cartList.length &&
        suggestionDiscountCodes &&
        Array.isArray(suggestionDiscountCodes) && (
          <DiscountCodeBlock classes={{ container: styles.discountCodeBlock }} />
        )}
      {false && isPaymentRoute && <CartProductsBrief />}
      {false && Object.keys(cartDetail).length && (
        <PricingSummary cartView={isCheckoutRoute} cartDetail={cartDetail} cartCheckout={isPaymentRoute} />
      )}
      {Object.keys(cartDetail).length && (
        <PricingBreakdown showTotal classes={{ container: styles.pricingBreakdown }} />
      )}
    </div>
  );
};

export default renderView;
