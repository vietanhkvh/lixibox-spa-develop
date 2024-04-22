import { useState, useEffect } from 'react';
import classNames from 'classnames';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from 'tracking/google-analytic/type';
import { gaEventTracking } from 'tracking/google-analytic/ga-event-tracking';

import ErrorBlock from 'container/app-shop/cart/general/error-block';
import SvgIcon from 'presentation-component/ui/icon';
import { isMobileVersion } from 'utils/responsive';
import { generateTestId } from 'utils/test-utils';
import { usePrevious } from 'utils/hook';
import { SIGN_IN_STATE } from 'constants/application/global';

import VerticalCarousel from 'presentation-component/ui/vertical-carousel';
import DiscountCodeProgress from 'presentation-component/checkout/generic/discount-code-progress';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import DiscountCodeModal from './modal';
import DiscountCodeDetailModal from './detail-modal';
import { PropsFromRedux } from './store';
import style from './style.module.scss';

interface IProps extends PropsFromRedux {
  mode?: 'full' | 'suggestionsOnly';
  suggestionViewMode?: 'coupon' | 'plain';
  classes?: { container?: string };
}
const DiscountCodeBlock = (props: IProps) => {
  const {
    mode,
    suggestionViewMode,
    removeDiscountCodeAction,
    authStore: { signInStatus },
    cartStore: { cartDetail, suggestionDiscountCodes, suggestionDiscountCodesFetching, addDiscountCode },
    classes,
    fetchUserPersonalDiscountCodesAction,
    fetchUserVouchersAction
  } = props;
  const paging = { page: 1, perPage: 30 };
  const [modalVisibility, setModalVisibility] = useState(false);
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
  const mobileReferralCode = cartDetail?.mobile_referral_code || '';
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
    if (mode === 'full') {
      appliedCode || setModalVisibility(true);
    } else {
      setModalVisibility(true);
    }
  };

  return !(cartItems.length && Array.isArray(suggestionDiscountCodes)) ? null : (
    <>
      {mode === 'full' ? (
        <div
          className={classNames(style.discountBlock, appliedCode || style.clickable, classes?.container)}
          onClick={onDiscountCodeBlockClick}
          {...generateTestId({ name: 'discount-code-block' })}
        >
          <div className={style.titleSection}>
            <SvgIcon name="discount-code" className={style.primaryIcon} />
            <div className={style.title}>Mã giảm giá</div>
          </div>
          {mobileReferralCode && mobileReferralCode.length && (
            <ErrorBlock
              interactive
              onClick={(e) => {
                e.stopPropagation();
                removeDiscountCodeAction();
              }}
            >{`Mobile referral code ${mobileReferralCode} của bạn không thể sử dụng trên web.`}</ErrorBlock>
          )}
          <div className={style.entrySection}>
            <div className={style.entry}>
              <div className={appliedCode ? classNames(style.appliedCode, style.bold) : style.noAppliedCode}>
                {appliedCode ? (
                  <>
                    <div className={style.checkedIcon} />
                    {appliedCode}
                  </>
                ) : (
                  'Mã giảm giá'
                )}
              </div>
              <div
                className={classNames(style.action, appliedCode && style.clickable)}
                onClick={(e) => {
                  if (appliedCode) {
                    e.stopPropagation();
                    removeDiscountCodeAction();
                  }
                }}
              >
                {appliedCode ? (
                  <div className={style.removeText}>Hủy</div>
                ) : (
                  <SvgIcon name={'angle-right'} className={style.icon} />
                )}
              </div>
            </div>
          </div>
          <VerticalCarousel
            data={suggestionDiscountCodes?.map((code) => ({ discountCode: code, viewMode: suggestionViewMode })) || []}
            template={DiscountCodeProgress}
            height={100}
          />
        </div>
      ) : (
        <>
          {suggestionDiscountCodesFetching ? (
            <LoadingPlaceholder className={classNames(classes?.container, style.suggestionPlaceholder)} />
          ) : suggestionDiscountCodes?.length ? (
            <VerticalCarousel
              data={
                suggestionDiscountCodes?.map((code) => ({ discountCode: code, viewMode: suggestionViewMode })) || []
              }
              template={DiscountCodeProgress}
              height={100}
              classes={{ container: classes?.container }}
              onClick={onDiscountCodeBlockClick}
            />
          ) : null}
        </>
      )}
      <DiscountCodeModal
        isOpen={modalVisibility}
        toggleVisibility={(visibility: boolean) => setModalVisibility(visibility)}
        paging={paging}
        onCouponBodyClick={(coupon) => {
          setModalVisibility(false);
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
          setModalVisibility(true);
        }}
      />
    </>
  );
};
DiscountCodeBlock.defaultProps = {
  mode: 'full' as const,
  suggestionViewMode: 'coupon' as const
};

export default DiscountCodeBlock;
