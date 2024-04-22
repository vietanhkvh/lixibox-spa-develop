import { useState, useEffect } from 'react';

import EntryButton from '../../../../../../../presentation-component/ui/entry-button';
import GeneralModal from '../../../../../../../presentation-component/modal/general-modal';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../../../presentation-component/general/mobile/no-content-placeholder';
import DiscountCoupon from '../../../../../../../presentation-component/general/discount-coupon';
import { usePrevious } from '../../../../../../../utils/hook';
import style from './style.module.scss';

const DiscountCodeModal = ({
  title = 'Mã giảm giá',
  isDisplayDiscountCodeInput = true,
  isDisplayDiscountCodeListTitle = true,
  toggleVisibility,
  isOpen,
  isSubmitting,
  discountCodes,
  status,
  error,
  appliedCode,
  applyingCode,
  isApplyingCode,
  onCodeSubmit,
  onAddSuccess,
  onEdit
}) => {
  const [code, setCode] = useState('');
  useEffect(() => setCode(''), [isOpen]);
  const wasAdding = usePrevious(status.loading);
  if (wasAdding && !status.loading && status.status) onAddSuccess();

  const [loading, setLoading] = useState(false);
  const wasSubmitting = usePrevious(isSubmitting);
  if (loading && wasSubmitting && !isSubmitting) setLoading(false);

  return (
    <GeneralModal
      isOpen={isOpen}
      title={title}
      leftTitle=""
      rightIcon={'close'}
      fullHeight
      className={style.generalModalContainer}
      testId={{ name: 'discount-code-modal-container' }}
      onRightActionClick={() => toggleVisibility(false)}
      onRequestClose={() => toggleVisibility(false)}
    >
      <div className={style.redeemDiscountCodeModal}>
        {!!isDisplayDiscountCodeInput && (
          <div className={style.entrySection}>
            <EntryButton
              title={'Áp dụng'}
              value={code}
              placeholder={'Nhập mã giảm giá'}
              loading={loading}
              onChange={(value) => onEdit()}
              onSubmit={(value) => {
                setLoading(true);
                onCodeSubmit(value);
              }}
            />
          </div>
        )}
        <div className={style.notificationSection}>{error}</div>
        <div className={style.listSection}>
          {!!discountCodes.length ? (
            <>
              {!!isDisplayDiscountCodeListTitle && <div className={style.title}>Chọn mã voucher đã sưu tầm</div>}
              <div className={style.list}>
                {discountCodes.map((coupon) => (
                  <DiscountCoupon
                    key={coupon.id}
                    enabled={!!coupon.available}
                    coupon={coupon}
                    onClickCoupon={() => onCodeSubmit(coupon.code)}
                    onClickApply={() => onCodeSubmit(coupon.code)}
                    isApplied={coupon.code === appliedCode}
                    isApplying={coupon.code === applyingCode && isApplyingCode}
                  />
                ))}
              </div>
            </>
          ) : (
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
