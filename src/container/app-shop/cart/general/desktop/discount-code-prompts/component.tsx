import classNames from 'classnames';

import DiscountCodeProductSelectionPrompt from '../../../../../../presentation-component/checkout/generic/discount-code-product-selection-prompt';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import { CartState } from '../../../../../../flows/cart/types';
import { generateReferralSchemeSelectionHint } from '../../../../../../utils/referral';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

interface IProps {
  onReferralHintClick?: () => any;
  cartStore: CartState;
  toggleDiscountCodeGiftModalVisibilityAction: any;
  toggleDiscountCodeAddonModalVisibilityAction: any;
}

const DiscountCodePrompts = ({
  onReferralHintClick,
  cartStore: {
    cartGiftList,
    cartDetail,
    cartDetail: { referral },
    specialAddOns
  },
  toggleDiscountCodeGiftModalVisibilityAction,
  toggleDiscountCodeAddonModalVisibilityAction
}: IProps) => {
  const inCartProductList = (Object.keys(cartDetail).length && cartDetail.cart_items) || [];
  const showDiscountCodeAddonPrompt = !!(specialAddOns.length && cartDetail.can_select_add_on);
  const showDiscountCodeGiftPrompt = !!(cartDetail && cartDetail.discount_code && cartGiftList.length);
  const anyGiftInCart = !!inCartProductList.find(({ purchase_type }) => purchase_type === PURCHASE_TYPE.GIFT);
  const anySpecialAddonInCart = !!inCartProductList.find(({ purchase_type }) => purchase_type === PURCHASE_TYPE.ADDON);

  return (
    <div
      className={classNames(style.discountCodePrompt, {
        [style.noDisplay]: !showDiscountCodeAddonPrompt && !showDiscountCodeGiftPrompt && !referral?.referrer
      })}
      {...generateTestId({ name: 'discount-code-prompt' })}
    >
      {showDiscountCodeGiftPrompt && (
        <DiscountCodeProductSelectionPrompt
          message={
            <>
              {anyGiftInCart ? 'Đã chọn quà của mã' : 'Chọn quà của mã'}{' '}
              <span className={style.bold}>{!!cartDetail ? cartDetail.discount_code : ''}</span>
            </>
          }
          actionTitle={anyGiftInCart ? 'Thay đổi' : 'Chọn'}
          onClick={() => toggleDiscountCodeGiftModalVisibilityAction(true)}
          className={classNames(style.prompt, style.referralHint)}
        />
      )}
      {showDiscountCodeAddonPrompt && (
        <DiscountCodeProductSelectionPrompt
          message={
            <>
              {anySpecialAddonInCart ? 'Đã chọn' : 'Chọn'} ưu đãi đặc biệt của mã{' '}
              <span className={style.bold}>{!!cartDetail ? cartDetail.discount_code : ''}</span>
            </>
          }
          actionTitle={anySpecialAddonInCart ? 'Thay đổi' : 'Chọn'}
          onClick={() => toggleDiscountCodeAddonModalVisibilityAction(true)}
          className={classNames(style.prompt, style.referralHint)}
        />
      )}
      {!!referral?.referrer && (
        <DiscountCodeProductSelectionPrompt
          message={generateReferralSchemeSelectionHint(referral)}
          actionTitle={referral?.applied_scheme ? 'Thay đổi' : 'Chọn'}
          onClick={() => onReferralHintClick?.()}
          className={classNames(style.prompt, style.referralHint)}
        />
      )}
    </div>
  );
};

export default DiscountCodePrompts;
