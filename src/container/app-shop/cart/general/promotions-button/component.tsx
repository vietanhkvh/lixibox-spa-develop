import { useState, useEffect } from 'react';
import classNames from 'classnames';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from 'tracking/google-analytic/type';
import { gaEventTracking } from 'tracking/google-analytic/ga-event-tracking';

import { isMobileVersion } from 'utils/responsive';
import { generateTestId } from 'utils/test-utils';
import { usePrevious } from 'utils/hook';
import { SIGN_IN_STATE } from 'constants/application/global';
import Icon from 'presentation-component/ui/icon';

import PromotionsModal from './modal';
import DiscountCodeDetailModal from './detail-modal';
import { PropsFromRedux } from './store';
import styles from './style.module.scss';

interface PromotionsButtonProps extends PropsFromRedux {
  suggestionViewMode?: 'coupon' | 'plain';
  classes?: { container?: string };
}
const PromotionsButton = ({
  authStore: { signInStatus },
  cartStore: {
    cartDetail,
    suggestionDiscountCodes,
    addDiscountCode,
    representablePromotions,
    promotionsPopupVisibility
  },
  classes,
  fetchUserPersonalDiscountCodesAction,
  fetchUserVouchersAction,
  setPromotionsPopupVisibilityAction
}: PromotionsButtonProps) => {
  const paging = { page: 1, perPage: 30 };
  const [detailModalState, setDetailModalState] = useState({ visible: false, code: '' });
  const updateDetailModalState = (attr: { visible?: boolean; code?: string }) =>
    setDetailModalState((prevState) => Object.assign({}, prevState, attr));
  const cartItems = Array.isArray(cartDetail?.cart_items) ? cartDetail.cart_items : [];

  useEffect(() => {
    if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
      fetchUserPersonalDiscountCodesAction(paging);
      fetchUserVouchersAction(paging);
    }
  }, []);

  const appliedCode = cartDetail?.discount_code || cartDetail?.referral_code || '';
  const wasAddingDiscountCode = usePrevious(!!addDiscountCode?.loading);
  useEffect(() => {
    detailModalState.visible &&
      addDiscountCode?.code === appliedCode &&
      wasAddingDiscountCode &&
      !addDiscountCode?.loading &&
      addDiscountCode?.status &&
      updateDetailModalState({ visible: false });
  }, [addDiscountCode]);

  const onDiscountCodeBlockClick = () => {
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR,
      label: `${
        GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DISCOUNT_CODE_BEHAVIOR.DISPLAY_ON_SCREEN
      } : ${'Discountcode Checkout Modal'}`,
      value: 1
    });

    setPromotionsPopupVisibilityAction({ visibility: true });
  };

  const appliedPromotionsCount = representablePromotions.filter((promotion) => promotion.isApplied).length;

  return !(cartItems.length && Array.isArray(suggestionDiscountCodes)) ? null : (
    <>
      <div
        className={classNames(styles.promotionsButton, classes?.container)}
        onClick={onDiscountCodeBlockClick}
        {...generateTestId({ name: 'discount-code-block' })}
      >
        <Icon name="discount-code" className={styles.programIcon} />
        <div className={classNames(styles.content, 'lineClamp1')}>
          {appliedPromotionsCount ? `Đã áp dụng ${appliedPromotionsCount} ưu đãi` : 'Áp dụng ưu đãi để được giảm giá'}
        </div>
        <Icon name="angle-right" className={styles.navIcon} />
      </div>
      <PromotionsModal
        isOpen={promotionsPopupVisibility}
        toggleVisibility={(visibility: boolean) => {
          setPromotionsPopupVisibilityAction({ visibility });
        }}
        paging={paging}
        onCouponBodyClick={(coupon) => {
          setPromotionsPopupVisibilityAction({ visibility: false });
          updateDetailModalState({ visible: true, code: coupon.code });
        }}
      />
      <DiscountCodeDetailModal
        code={detailModalState.code}
        isOpen={detailModalState.visible}
        isCompact={!isMobileVersion()}
        toggleVisibility={(isOpen) => updateDetailModalState({ visible: isOpen })}
        onGoBack={() => {
          updateDetailModalState({ visible: false });
          setPromotionsPopupVisibilityAction({ visibility: true });
        }}
      />
    </>
  );
};
PromotionsButton.defaultProps = {
  suggestionViewMode: 'coupon' as const
};

export default PromotionsButton;
