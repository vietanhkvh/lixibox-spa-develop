import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

import EntryButton from '../../../../../../presentation-component/ui/entry-button';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../../presentation-component/general/mobile/no-content-placeholder';
import DiscountCoupon from '../../../../../../presentation-component/general/discount-coupon';
import { usePrevious } from '../../../../../../utils/hook';
import { getGlobalErrorMessage } from '../../../../../../utils/exception';
import { isMobileVersion, objectToHash } from '../../../../../../utils';
import { SIGN_IN_STATE } from '../../../../../../constants/application/global';
import { ADD_DISCOUNT_CODE } from '../../../../../../flows/cart/type';
import { SHARED_MODAL_ID } from '../../../../../../constants/application/shared-modal';
import { REFEREE_SCHEMES_MODAL_INVOCATION_MODE } from '../../../../../../constants/application/referral';
import { OpenSharedModalActionParams } from '../../../../../../flows/shared-modal/action';
import { CartState } from '../../../../../../flows/cart/types';
import style from './style.module.scss';

interface DiscountCodeModalProps {
  isOpen: boolean;
  paging: { page: number; perPage: number };
  toggleVisibility: (isVisible: boolean) => any;
  onCouponBodyClick?: (coupon: any) => any;
  authStore: any;
  cartStore: CartState;
  errorStore: any;
  userStore: any;
  addDiscountCodeAction: (param0?: any) => any;
  popErrorAction: (param0?: any) => any;
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
}
const DiscountCodeModal = ({
  toggleVisibility,
  isOpen,
  paging,
  onCouponBodyClick,
  authStore: { signInStatus },
  cartStore: { cartDetail, addDiscountCode, suggestionDiscountCodes },
  errorStore: { index: errorIndex },
  userStore: {
    personalDiscountCode,
    vouchers: { byQuery: vouchersByQuery }
  },
  addDiscountCodeAction,
  popErrorAction,
  openSharedModalAction
}: DiscountCodeModalProps) => {
  let asyncEventId: any = null;
  const inputElement = useRef<HTMLInputElement | null>(null);
  const signedIn = signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS;
  const errorMessage = getGlobalErrorMessage(errorIndex, ADD_DISCOUNT_CODE);
  const pageHash = objectToHash(paging);
  const vouchers = vouchersByQuery[pageHash] || [];
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);
  useEffect(() => setCode(''), [isOpen]);
  const wasAdding = usePrevious(addDiscountCode.loading);
  const wasOpen = usePrevious(isOpen);
  useEffect(() => {
    if (wasAdding && !addDiscountCode.loading && addDiscountCode.status) {
      toggleVisibility(false);
      cartDetail.referral_code &&
        openSharedModalAction({
          id: SHARED_MODAL_ID.RefereeSchemesModal,
          data: { code: cartDetail.referral_code, mode: REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITHOUT_BUTTON }
        });
    }
  }, [addDiscountCode.loading]);
  useEffect(() => {
    wasOpen && !isOpen && popErrorAction(ADD_DISCOUNT_CODE);
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      asyncEventId = setTimeout(() => {
        inputElement.current && inputElement.current.focus();
      }, 350);
    }

    return () => clearInterval(asyncEventId);
  }, [isOpen]);
  useEffect(() => {
    !!errorMessage && !!errorMessage.length && 'null' !== errorMessage && setShowError(true);
  }, [errorMessage]);

  const [loading, setLoading] = useState(false);
  const isSubmitting = addDiscountCode && addDiscountCode.loading; // TODO: ***verify
  const wasSubmitting = usePrevious(isSubmitting);
  if (loading && wasSubmitting && !isSubmitting) setLoading(false);
  const onCodeSubmit = (code) =>
    addDiscountCodeAction({ discountCode: code, isOpenCartSummary: false, whereAdded: 'Discount code modal' });
  const hotDiscountCodeAvailable = !!suggestionDiscountCodes.length;
  const personalDiscountCodeAvailable =
    !!personalDiscountCode && !!personalDiscountCode.index && !!personalDiscountCode.index.length;
  const vouchersAvailable = !!vouchers.length;
  const anyDiscountCodeAvailable = hotDiscountCodeAvailable || personalDiscountCodeAvailable || vouchersAvailable;

  return (
    <GeneralModal
      isOpen={isOpen}
      title="Mã giảm giá"
      leftTitle=""
      rightIcon={'close'}
      fullHeight
      classes={{ header: style.header, clientArea: style.clientArea }}
      className={classNames(isMobileVersion() ? style.modalContainerMobile : style.modalContainerDesktop)}
      testId={{ name: 'discount-code-modal' }}
      onRightActionClick={() => toggleVisibility(false)}
      onRequestClose={() => toggleVisibility(false)}
    >
      <div className={style.redeemDiscountCodeModal}>
        <div className={style.entrySection}>
          <EntryButton
            title={'Áp dụng'}
            value={code}
            placeholder={'Nhập mã giảm giá'}
            loading={loading}
            ref={inputElement}
            upperCaseOnly
            onChange={(value) => popErrorAction(ADD_DISCOUNT_CODE)}
            onSubmit={(value) => {
              setLoading(true);
              onCodeSubmit(value && value.toLocaleUpperCase());
            }}
            onFocus={() => setShowError(false)}
          />
        </div>
        {showError && <div className={style.notificationSection}>{errorMessage}</div>}
        <div className={style.separator}>
          <div className={style.content} />
        </div>
        <div className={style.listSection}>
          {signedIn && vouchersAvailable && (
            <>
              <div className={style.title}>Vouchers</div>
              <div className={style.list}>
                {vouchers.map((coupon) => (
                  <DiscountCoupon
                    key={coupon.id}
                    enabled={!!coupon.available}
                    coupon={coupon}
                    isApplying={addDiscountCode && addDiscountCode.code === coupon.code && addDiscountCode.loading}
                    onClickCoupon={() => {
                      if (onCouponBodyClick) {
                        onCouponBodyClick(coupon);
                        return;
                      }
                      onCodeSubmit(coupon.code);
                    }}
                    onClickApply={() => onCodeSubmit(coupon.code)}
                  />
                ))}
              </div>
            </>
          )}
          {hotDiscountCodeAvailable && (
            <>
              <div className={style.title}>Mã giảm giá hot</div>
              <div className={style.list}>
                {suggestionDiscountCodes.map((coupon) => (
                  <DiscountCoupon
                    key={coupon.id}
                    enabled={!!coupon.available}
                    coupon={coupon}
                    isApplying={addDiscountCode && addDiscountCode.code === coupon.code && addDiscountCode.loading}
                    onClickCoupon={() => {
                      if (onCouponBodyClick) {
                        onCouponBodyClick(coupon);
                        return;
                      }
                      onCodeSubmit(coupon.code);
                    }}
                    onClickApply={() => onCodeSubmit(coupon.code)}
                  />
                ))}
              </div>
            </>
          )}
          {signedIn && personalDiscountCodeAvailable && (
            <>
              <div className={style.title}>Dành riêng cho bạn</div>
              <div className={style.list}>
                {personalDiscountCode.index.map((coupon) => (
                  <DiscountCoupon
                    key={coupon.id}
                    enabled={!!coupon.available}
                    coupon={coupon}
                    isApplying={addDiscountCode && addDiscountCode.code === coupon.code && addDiscountCode.loading}
                    onClickCoupon={() => {
                      if (onCouponBodyClick) {
                        onCouponBodyClick(coupon);
                        return;
                      }
                      onCodeSubmit(coupon.code);
                    }}
                    onClickApply={() => onCodeSubmit(coupon.code)}
                  />
                ))}
              </div>
            </>
          )}
          {anyDiscountCodeAvailable || (
            <NoContentPlaceholder
              title="Không có mã giảm giá"
              info="Hãy tiếp tục chọn cho mình sản phẩm yêu thích bạn nhé"
              logo={NO_CONTENT_LOGO.COUPONS}
              className={style.noPromoPlaceholder}
            />
          )}
        </div>
      </div>
    </GeneralModal>
  );
};

export default DiscountCodeModal;
