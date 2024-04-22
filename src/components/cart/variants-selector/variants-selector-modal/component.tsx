import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './style.module.scss';
import Loading from 'components/ui/loading/component';
import SubmitButton from 'presentation-component/ui/submit-button';
import HorizontalQuantity from 'components/ui/horizontal-quantity/component';
import Image from 'presentation-component/ui/image/component';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import MobileConfirmation from 'presentation-component/ui/mobile-confirmation';
import Variants from '../variants/component';

import { isMobileDevice } from 'utils/responsive';
import { IVariantsSelectorModalProps } from '../model';
import { formatCartItemPrice } from 'utils/currency';
import { isEmptyKeyObject } from 'utils/validate';
import { ROUTING_PRODUCT_DETAIL_PATH } from 'routings/path';
import { decodeEntities, isMobileVersion } from 'utils';
import { handleGtagTrackingService } from 'utils/tracking';

const VariantsSelectorModal = (props: IVariantsSelectorModalProps) => {
  const { variantProps, updatedVariantQuantity, updateVariantQuantityAction } = props || {};
  const { nextBox, isLoading, onSubmit, submitData, onSelected, product, handleRemoveCartItem, currentVariant } =
    variantProps || {};
  const { purchaseType, coins } = currentVariant || {};

  const note =
    nextBox?.stock <= 10 && nextBox?.stock > 0
      ? `Chỉ còn ${nextBox?.stock} trong kho - đặt hàng sớm`
      : nextBox?.stock === 0
      ? 'Đã hết - Vui lòng chọn sản phẩm khác'
      : '';
  const { price, original_price, name } = nextBox || {};

  const [isShowRemoveConfirmationModal, setIsShowRemoveConfirmationModal] = useState(false);

  useEffect(() => {
    updateVariantQuantityAction(variantProps?.currentVariant?.quantity);
  }, []);

  if (!variantProps) return null;

  const LoadingState = () => (
    <div className={classNames(styles.modalOverlay)}>
      <Loading />
    </div>
  );

  const renderTop = ({ data, isUsedOnConfirmationModal }: { data: any; isUsedOnConfirmationModal?: boolean }) => {
    const imageLink =
      data?.purchase_type !== PURCHASE_TYPE.REDEEM ? `${ROUTING_PRODUCT_DETAIL_PATH}/${data?.nextBox?.slug}` : '#';
    return (
      <div className={classNames(styles.topCartItem, isUsedOnConfirmationModal && styles.onConfirmationModal)}>
        <div className="cart-image">
          <NavLink to={imageLink}>
            <Image src={nextBox?.primary_picture?.medium_url} alt="" className={styles.imageTop} />
          </NavLink>
        </div>

        <div className="rightZone">
          <div className={classNames(styles.test)}>{decodeEntities(name)} </div>

          <div className={classNames(styles.priceZone)}>
            <div className={classNames(styles.currentPrice)}>
              {formatCartItemPrice({ price, coins, purchase_type: purchaseType })}
            </div>
            {price !== original_price && (
              <div className={classNames(styles.originalPrice)}>
                {formatCartItemPrice({ price: original_price, coins, purchase_type: purchaseType })}
              </div>
            )}
          </div>

          {!isUsedOnConfirmationModal && (
            <HorizontalQuantity
              {...{
                value: updatedVariantQuantity,
                type: 'small' as const,
                disabled: !isEmptyKeyObject(variantProps, 'editable') && !variantProps?.editable,
                action: ({ oldValue, newValue }) => {
                  updateVariantQuantityAction(newValue);
                  handleGtagTrackingService('spv_change_quantity');
                },
                onDecreaseBelowMinimum: () => {
                  setIsShowRemoveConfirmationModal(true);
                }
              }}
            />
          )}
          {!isUsedOnConfirmationModal && note && <div className={classNames(styles.note)}>{decodeEntities(note)}</div>}
        </div>
      </div>
    );
  };

  const renderConfirmationPopup = () => {
    const confirmButtonProps = {
      title: 'Xóa',
      icon: { name: 'trash' },
      color: 'red',
      size: 'small' as const,
      classes: {
        container: classNames(styles.button),
        icon: styles.iconTrashRemove
      },
      testId: { name: 'confirm' },
      onSubmit: () => {
        handleRemoveCartItem(submitData);
      }
    };

    const cancelButtonProps = {
      title: 'Huỷ',
      icon: { name: 'close' },
      color: 'red',
      size: 'small' as const,
      classes: {
        container: classNames(styles.button, styles.cancelButton),
        icon: styles.cancelIcon,
        title: styles.title
      },
      testId: { name: 'cancel' },
      onSubmit: () => {
        setIsShowRemoveConfirmationModal(false);
      }
    };

    return isMobileDevice() ? (
      <MobileConfirmation
        isOpen={isShowRemoveConfirmationModal}
        prompt={'Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?'}
        confirmationButton={{ text: 'Xóa', icon: 'trash' }}
        onCancel={() => setIsShowRemoveConfirmationModal(false)}
        onConfirm={() => handleRemoveCartItem(submitData)}
      >
        {renderTop({ data: variantProps, isUsedOnConfirmationModal: true })}
      </MobileConfirmation>
    ) : (
      <div>
        <div
          className={classNames(
            styles.removeConfirmation,
            isShowRemoveConfirmationModal && styles.removeConfirmationVisible
          )}
        >
          <div className={styles.text}>Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?</div>
          <div className={styles.action}>
            <SubmitButton {...confirmButtonProps} />
            <SubmitButton {...cancelButtonProps} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classNames('variants-selector-modal')}>
      <div
        className={classNames(styles.modal, !!isLoading && styles.loadingMode, isMobileVersion() && styles.mobileModal)}
      >
        <div className={classNames(styles.modalProductDetail)}>
          {!nextBox ? (
            <LoadingState />
          ) : (
            <div id="cart-item-testingId" className={styles.cartItem}>
              {renderTop({ data: variantProps, isUsedOnConfirmationModal: false })}
              {isShowRemoveConfirmationModal && renderConfirmationPopup()}
            </div>
          )}
        </div>

        <Variants product={product} onSelected={onSelected} />

        <div className={classNames(styles.note)}>
          <div className={classNames(styles.note)}>Lưu ý:</div>
          <div className={classNames(styles.noteText)}>
            Việc thay đổi sản phẩm có thể ảnh hưởng đến giá tiền, mã giảm giá và các quà tặng liên quan. Vui lòng kiểm
            tra lại thông tin sau khi xác nhận.
          </div>
        </div>
        {!!isLoading && <LoadingState />}
      </div>

      <div className={classNames(styles.submitZone, isMobileVersion() && styles.mobileSubmit)}>
        <SubmitButton
          {...{
            disabled: nextBox?.stock === 0 || updatedVariantQuantity > nextBox?.stock,
            title: 'Xác nhận',
            loading: isLoading,
            onSubmit: onSubmit,
            testId: { name: 'buttonChangeVariant' },
            classes: {
              container: classNames(styles.submitButton)
            }
          }}
        />
      </div>
    </div>
  );
};

export default VariantsSelectorModal;
