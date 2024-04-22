import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import style from './style.module.scss';
import Icon from 'presentation-component/ui/icon';
import GeneralModal from 'presentation-component/modal/general-modal/component';
import VariantsSelectorModal from './variants-selector-modal';

import { IUpdateCartProps, IVariantsSelectorProps } from './model';
import { IProduct, ISelectedVariant } from 'types/generic/product';
import { generateTestId } from 'utils/test-utils';
import { isMobileVersion, stringToHash } from 'utils';
import { getCartPricing } from 'utils/cart';
import { handleGtagTrackingService } from 'utils/tracking';
import { getSelectedVariantFromProduct } from 'utils/product/variants';
import { storageKey } from 'constants/application/client-storage';

const VariantsSelector = (props: IVariantsSelectorProps) => {
  const {
    shopStore: { productDetail },
    cartStore: { isAddCartLoading, isRemoveCartLoading, updatedVariantQuantity, cartDetail, cartList },
    getProductDetailAction,
    currentVariant,
    addItemToCartAction,
    removeItemFromCartAction
  } = props;
  const { box, quantity } = currentVariant || {};

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentSlug, setCurrentSlug] = useState<string>(box?.slug || '');
  const { viewSpecificTotalPrice } = getCartPricing({ cartDetail, isCartView: false });

  const originalSlug = useRef<null | string>(box?.slug || '');
  const originalPrice = useRef<null | number>(viewSpecificTotalPrice || 0);
  const originalDiscountCode = useRef<null | string>(cartDetail?.discount_code || '');
  const originalCartQuantity = useRef<null | number>(cartList?.length || 0);
  const [originalVariantQuantity, setOriginalVariantQuantity] = useState<null | number>(quantity);

  const getCartItem = (cartDetail, box) => cartDetail?.cart_items?.find((item) => item?.box?.id === box?.id);
  const handleUpdateCart = ({ oldVariant, newVariant }: IUpdateCartProps) => {
    if (!oldVariant?.box || (oldVariant?.boxId === newVariant?.boxId && oldVariant?.quantity === newVariant?.quantity))
      return;

    addItemToCartAction({
      box: newVariant?.box,
      boxId: newVariant?.boxId,
      purchaseType: newVariant?.purchaseType,
      quantity: Math.abs(newVariant?.quantity)
    });

    removeItemFromCartAction({
      cartItem: getCartItem(cartDetail, oldVariant?.box),
      box: oldVariant?.box,
      boxId: oldVariant?.boxId,
      purchaseType: oldVariant?.purchaseType,
      quantity: Math.abs(oldVariant?.quantity)
    });
  };

  useEffect(() => {
    getProductDetailAction({ productId: currentSlug || box?.slug || '', isTrackingViewBox: true });
  }, [box?.slug, currentSlug, getProductDetailAction]);

  useEffect(() => {
    setOriginalVariantQuantity(quantity);
  }, [handleUpdateCart]);

  if (!box?.slug || !productDetail) return null;

  function onVariantSelected(slug: string) {
    getProductDetailAction({ productId: slug });
  }

  const handleRemoveCartItem = ({ oldVariant }) => {
    setIsModalVisible(false);
    removeItemFromCartAction({
      cartItem: getCartItem(cartDetail, oldVariant?.box),
      box: oldVariant?.box,
      boxId: oldVariant?.boxId,
      purchaseType: oldVariant?.purchaseType,
      quantity: Math.abs(oldVariant?.quantity)
    });
  };

  const idProductHash = stringToHash(box.slug);
  const product: IProduct = productDetail[idProductHash];

  if (!product || product?.option_types?.length <= 0) return null;

  const selectedVariant = getSelectedVariantFromProduct(product);

  const nextProduct: IProduct = productDetail?.[stringToHash(currentSlug)];

  const originalProduct = productDetail?.[stringToHash(originalSlug.current as string)];

  const submitData = {
    oldVariant: {
      box: originalProduct?.box,
      boxId: originalProduct?.box?.id,
      quantity: originalVariantQuantity,
      purchaseType: currentVariant?.purchase_type
    },
    newVariant: {
      box: nextProduct?.box,
      boxId: nextProduct?.box?.id,
      quantity: updatedVariantQuantity,
      purchaseType: currentVariant?.purchase_type
    }
  };

  const handlePushGtagWhenPriceDiff = (latestPrice: number) => {
    // Todo: Sometime not get the latest price
    if (latestPrice !== originalPrice.current) {
      handleGtagTrackingService('spv_detect_diff_price');
    }
  };

  const handlePushGtagWhenDiscountCodeDiff = (latestDiscountCode: string) => {
    if (latestDiscountCode !== originalDiscountCode.current) {
      handleGtagTrackingService('spv_detect_diff_discount_code');
    }
  };

  const handlePushGtagWhenTotalItemsDiff = (latestCartQty: number) => {
    if (latestCartQty !== originalCartQuantity.current) {
      handleGtagTrackingService('spv_detect_diff_total_items');
    }
  };

  if (localStorage.getItem(storageKey.HAS_VIEW_PRODUCT_VARIANT) !== 'true') {
    handleGtagTrackingService('spv_view_cart_has_variant');
    localStorage.setItem(storageKey.HAS_VIEW_PRODUCT_VARIANT, 'true');
  }

  const modalProps = {
    product,
    handleRemoveCartItem,
    onSelected: (slug) => {
      setCurrentSlug(slug);
      handleGtagTrackingService('spv_change_variant');
      onVariantSelected && onVariantSelected(slug);
    },
    currentVariant,
    nextBox: nextProduct?.box,
    isLoading: isAddCartLoading || isRemoveCartLoading,
    onSubmit: async () => {
      handleGtagTrackingService('spv_submit_change_variant');
      setIsModalVisible(false);
      await handleUpdateCart(submitData);
      handlePushGtagWhenPriceDiff(cartDetail?.total_price);
      handlePushGtagWhenDiscountCodeDiff(cartDetail?.discount_code);
      handlePushGtagWhenTotalItemsDiff(cartList?.length);
    },
    submitData
  };

  return (
    <>
      <div className={classNames('variants-selector')}>
        <div
          className={classNames(style.variantSelector)}
          onClick={() => {
            setIsModalVisible(true);
            handleGtagTrackingService('spv_click_dropdown');
          }}
          {...generateTestId({ name: 'variants-selector-dropdown' })}
        >
          <div className={classNames(style.itemList)}>
            {selectedVariant?.map((variant: ISelectedVariant) => {
              const variantInfo = variant?.presentation || variant?.name || '';
              return (
                <div
                  className={classNames(style.smallItem, !isMobileVersion() && style.bigItemWidth)}
                  key={variant?.value_id}
                >
                  {variantInfo}
                </div>
              );
            })}
          </div>

          <div className={classNames(style.icon)}>
            <Icon name={'carret-down'} className={style.iconCollapse} />
          </div>
        </div>
      </div>
      <GeneralModal
        isOpen={isModalVisible}
        title="Đổi sản phẩm khác"
        leftTitle=""
        rightIcon={'close'}
        fullHeight
        classes={{ header: style.header, clientArea: classNames(style.clientArea, 'withScrollbar') }}
        className={classNames(isMobileVersion() || style.modalContainerDesktop, style.header)}
        testId={{ name: 'multi-variants-selection-modal' }}
        onRightActionClick={() => setIsModalVisible(false)}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <VariantsSelectorModal variantProps={modalProps} updatedVariantQuantity={updatedVariantQuantity} />
      </GeneralModal>
    </>
  );
};

export default VariantsSelector;
