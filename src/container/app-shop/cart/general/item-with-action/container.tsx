import classnames from 'classnames';
import { useEffect, useState } from 'react';

import { usePrevious } from 'utils/hook';
import { generateTestId } from 'utils/test-utils';
import ProductItem from 'presentation-component/product/product-item';
import { PURCHASE_TYPE } from 'constants/application/purchase';

import SubmitButton from 'components/ui/submit-button';
import SvgIcon from 'presentation-component/ui/icon';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';
import * as VARIABLE from 'style/variable';
import { PropsFromRedux } from './store';

const TrashExtraAction = ({ onClick }) => (
  <div className={style.trashExtraAction} onClick={onClick}>
    <SvgIcon name={'trash'} className={style.icon} />
  </div>
);

/**
 * Component can be implemented in one of the two available modes
 * Mode 1:
 *   - Trigger: `onClick` is not provided as prop
 *   - Behavior: Component adds / removes product to / from cart using associated API
 * Mode 2:
 *   - Trigger: `onClick` is provided as prop
 *   - Behavior: Component skips built-in API, and provides the full control (using
 *     `onClick` and `loading` props) to the parent
 */
interface IProps extends PropsFromRedux {
  action: { title: string; icon: string; disabled?: boolean; selected?: boolean };
  actionComponent?: (props: {
    loading: boolean;
    title: string;
    icon: string;
    disabled: boolean;
    selected: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
  }) => JSX.Element;
  secondaryAction?: { title: string; icon: string };
  product: ProductBox;
  purchaseType: number;
  isShowRating: boolean;
  isShowPricing: boolean;
  isOutOfStock?: boolean;
  isFullPadding?: boolean;
  singleItemOnly: boolean; // Only a single `product.id` of this `purchaseType` can be added to the cart
  loading: boolean;
  isReadOnly?: boolean;
  customPricing: { price?: number; originalPrice?: number };
  tag: string;
  outOfStockLabel?: string;
  forcePriceUnit?: 'dong' | 'lixicoin';
  isShowDiscountPercentage?: boolean;
  isShowTrashExtraButton?: boolean;
  isShowSecondarySubmitButton?: boolean;
  shouldDisplayCartSummary?: boolean;

  isBrandHidden?: boolean;
  isNameHidden?: boolean;
  isOriginalPriceHidden?: boolean;

  testId?: { name?: string; id?: string };
  isShowVariants?: boolean;
  onClick?: () => void;
  onSuccess: () => void;

  /** Tracking */
  trackingSource?: string;
  trackingSourceId?: string;

  className: string;
  onClickProductItem?: (box: ProductBox) => void;
  onClickTrashExtraButton?: () => void;
  onClickSecondaryAction?: () => void;
  classes?: { salePriceGroup?: string };
}

const ItemWithAction = ({
  action: { title, icon, disabled, selected },
  actionComponent,
  secondaryAction,
  product,
  purchaseType,
  isShowRating,
  isShowPricing,
  isOutOfStock,
  singleItemOnly,
  className,
  loading,
  isReadOnly,
  customPricing,
  isShowDiscountPercentage,
  tag,
  outOfStockLabel,
  forcePriceUnit,
  testId,
  isShowVariants = true,
  onClick,
  onSuccess,
  trackingSource,
  trackingSourceId,
  cartStore: { cartList, isAddCartSuccess, isRemoveCartSuccess, addToCart, removeFromCart },
  appStore: { isPrivateMode },
  addItemToCartAction,
  removeItemFromCartAction,
  onClickProductItem,
  isShowTrashExtraButton = false,
  onClickTrashExtraButton,
  isShowSecondarySubmitButton = false,
  shouldDisplayCartSummary,
  isBrandHidden,
  isNameHidden,
  isOriginalPriceHidden,
  onClickSecondaryAction,
  classes
}: IProps) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [secondaryLocalLoading, setSecondaryLocalLoading] = useState(false);
  const wasAddCartSuccess = usePrevious(isAddCartSuccess);
  const wasRemoveCartSuccess = usePrevious(isRemoveCartSuccess);

  useEffect(() => {
    if (
      (addToCart.lastBoxId === product?.id && addToCart.processing) ||
      (removeFromCart.lastBoxId === product?.id && removeFromCart.processing)
    ) {
      setLocalLoading(true);
    }
  }, [addToCart.lastBoxId, addToCart.processing, removeFromCart.lastBoxId, removeFromCart.processing, product?.id]);

  const wasAddingToCart = usePrevious(addToCart.processing);
  const wasRemovingFromCart = usePrevious(removeFromCart.processing);
  useEffect(() => {
    if ((wasAddingToCart && !addToCart.processing) || (wasRemovingFromCart && !removeFromCart.processing)) {
      setLocalLoading(false);
    }
  }, [addToCart.processing, removeFromCart.processing, wasAddingToCart, wasRemovingFromCart]);

  if (localLoading && ((!wasAddCartSuccess && isAddCartSuccess) || (!wasRemoveCartSuccess && isRemoveCartSuccess))) {
    onSuccess();
  }

  const cartItem = cartList.find(
    (cartItem) => cartItem.purchase_type === purchaseType && cartItem.box.id === product.id
  );
  const performAction: any = singleItemOnly && !!cartItem ? removeItemFromCartAction : addItemToCartAction;

  const inlineStyle = {
    color: VARIABLE.color20,
    backgroundColor: VARIABLE.colorWhite,
    border: `1px solid ${VARIABLE.color3E}`,
    borderRadius: 4,
    fontWeight: VARIABLE.fontRegular,
    fontSize: 14,
    height: 32,
    marginBottom: 10,

    remove: {
      backgroundColor: VARIABLE.colorF5,
      border: `1px solid ${VARIABLE.colorF5}`
    },

    secondary: {
      marginTop: 0
    },

    disabled: {
      color: VARIABLE.color8A,
      border: `1px solid ${VARIABLE.color8A}`
    },

    selected: {
      color: VARIABLE.color20,
      backgroundColor: VARIABLE.colorF5,
      border: `none`
    },

    titleStyle: {
      fontWeight: VARIABLE.fontRegular,
      fontSize: 14
    },

    titleStyleDisabled: {
      fontWeight: VARIABLE.fontLight
    },

    iconStyle: {
      color: VARIABLE.color20,
      width: 12.8,
      height: 12.8,
      marginRight: 11,
      marginBottom: 1,
      marginLeft: 0
    }
  };

  const onActionSubmit = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick();
      return;
    } else {
      // Ensures that the button click event doesn't trigger a preview click event
      e.stopPropagation();

      performAction({
        cartItem,
        box: product,
        boxId: product.id,
        quantity: 1,
        displayCartSumary: shouldDisplayCartSummary,
        purchaseType,
        trackingSource,
        trackingSourceId
      });
      setLocalLoading(true);
    }
  };

  return (
    <div
      className={classnames(style.productItemWithAction, className)}
      {...generateTestId(Object.assign({ name: 'item-with-action', id: product?.slug }, testId))}
    >
      {isShowTrashExtraButton && <TrashExtraAction onClick={onClickTrashExtraButton} />}
      <ProductItem
        isShowVariants={isShowVariants}
        onClick={onClickProductItem}
        product={product}
        customPricing={customPricing}
        tag={tag}
        outOfStockLabel={outOfStockLabel}
        isShowRating={isShowRating}
        isShowPricing={isShowPricing}
        isOutOfStock={isOutOfStock}
        isShowDiscountPercentage={isShowDiscountPercentage}
        isFullPadding
        isPrivateMode={isPrivateMode || isReadOnly}
        isBrandHidden={isBrandHidden}
        isNameHidden={isNameHidden}
        isOriginalPriceHidden={isOriginalPriceHidden}
        forcePriceUnit={forcePriceUnit || undefined}
        classes={{ salePriceGroup: classes?.salePriceGroup }}
      />
      {!!actionComponent ? (
        actionComponent({
          title,
          icon,
          loading: onClick ? loading : localLoading,
          disabled: disabled || selected,
          selected,
          onClick: onActionSubmit
        })
      ) : (
        <SubmitButton
          loading={onClick ? loading : localLoading}
          title={title}
          icon={icon}
          style={Object.assign(
            {},
            inlineStyle,
            singleItemOnly && !!cartItem && inlineStyle.remove,
            disabled && inlineStyle.disabled,
            selected && inlineStyle.selected
          )}
          titleStyle={Object.assign({}, inlineStyle.titleStyle, disabled && inlineStyle.titleStyleDisabled)}
          styleIcon={inlineStyle.iconStyle}
          disabled={disabled || selected}
          onSubmit={onActionSubmit}
        />
      )}
      {isShowSecondarySubmitButton && secondaryAction && (
        <SubmitButton
          loading={secondaryLocalLoading}
          title={secondaryAction?.title}
          icon={secondaryAction?.icon}
          color={'lightGrey'}
          style={Object.assign({}, inlineStyle, inlineStyle.secondary, inlineStyle.selected)}
          titleStyle={Object.assign({}, inlineStyle.titleStyle, disabled && inlineStyle.titleStyleDisabled)}
          styleIcon={inlineStyle.iconStyle}
          onSubmit={() => {
            setSecondaryLocalLoading(true);
            onClickSecondaryAction();
          }}
        />
      )}
    </div>
  );
};

ItemWithAction.defaultProps = {
  action: { title: 'Chọn', icon: 'plus', disabled: false, style: {} },
  className: '',
  purchaseType: PURCHASE_TYPE.NORMAL,
  tag: '',
  isShowRating: false,
  isShowPricing: false,
  singleItemOnly: false,
  shouldDisplayCartSummary: false,
  loading: false,
  customPricing: {},
  onSuccess: () => {},
  trackingSource: '',
  trackingSourceId: ''
};

export default ItemWithAction;
