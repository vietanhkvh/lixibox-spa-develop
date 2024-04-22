import { generateTestId } from 'utils/test-utils';
import { formatCurrency, CustomCurrencyType } from '../../../../../utils/currency';
import style from './style.module.scss';

interface IProps {
  lixicoinBonus: number;
  cartView?: boolean;
  cartCheckout?: boolean;
}
const LixicoinBonus = ({ lixicoinBonus, cartView, cartCheckout }: IProps) => {
  const dataTestId = (type: boolean) => {
    switch (type) {
      case cartView:
        return 'total_coin_cart';
      case cartCheckout:
        return 'total_coin_amount_checkout';
      default:
        return 'total_coin_success_order';
    }
  };
  return (
    <div className={style.lixicoinBonus} {...generateTestId({ name: 'lixicoin-bonus' })}>
      <div className={style.title}>Bạn sẽ nhận được</div>
      <div {...generateTestId({ name: dataTestId(cartView || cartCheckout) })} className={style.value}>
        {formatCurrency(lixicoinBonus || 0, { suffix: CustomCurrencyType.LIXICOIN })}
      </div>
    </div>
  );
};

export default LixicoinBonus;
