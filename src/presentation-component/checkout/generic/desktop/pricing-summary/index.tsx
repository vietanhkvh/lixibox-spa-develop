import { generateTestId } from 'utils/test-utils';
import PricingBreakdown from '../../pricing-breakdown';
import style from './style.module.scss';

interface IProps {
  cartDetail: any;
  cartView: boolean;
  cartCheckout: boolean;
}

const PricingSummary = ({ cartView, cartCheckout }: IProps) => {
  return (
    <div className={style.pricingSummary} {...generateTestId({ name: 'pricing-summary' })}>
      <PricingBreakdown cartCheckout={cartCheckout} cartView={cartView} className={style.breakdown} />
    </div>
  );
};

export default PricingSummary;
