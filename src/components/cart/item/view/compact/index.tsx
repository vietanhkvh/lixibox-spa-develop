// TODO: Refactor
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import SubmitButton from '../../../../ui/submit-button';
import HorizontalQuantity from '../../../../ui/horizontal-quantity';
import Icon from '../../../../ui/icon';
import MobileConfirmation from '../../../../ui/mobile-confirmation';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../../../tracking/google-analytic/ga-event-tracking';

import { PURCHASE_TYPE } from '../../../../../constants/application/purchase';
import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../../../routings/path';
import { decodeEntities } from '../../../../../utils/encode';
import { formatCurrency, CustomCurrencyType } from '../../../../../utils/currency';
import { isEmptyKeyObject } from '../../../../../utils/validate';
import { auth } from '../../../../../utils/auth';
import { generateTestId } from 'utils/test-utils';

import { PURCHASE_TYPE_LOCALE } from '../../constant';
import { ICartItemProps, ICartItemState } from '../../model';
import STYLE from './style';
import styles from './style.module.scss';
import VariantsSelector from 'components/cart/variants-selector';
import { EXPS as AB_TESTING_CONFIG } from 'tracking/ab-testing';
import { storageKey } from 'constants/application/client-storage';

const formatPrice = ({ price, coins, purchase_type }) => {
  switch (purchase_type) {
    case PURCHASE_TYPE.NORMAL:
    case PURCHASE_TYPE.ADDON:
      return formatCurrency(price, { suffix: true });
    case PURCHASE_TYPE.REDEEM:
      return formatCurrency(coins, { suffix: CustomCurrencyType.COIN });
    default:
      return null;
  }
};

const formatOriginalPrice = ({ original_price, purchase_type }) => {
  switch (purchase_type) {
    case PURCHASE_TYPE.NORMAL:
    case PURCHASE_TYPE.ADDON:
      return formatCurrency(original_price, { suffix: true });
    default:
      return null;
  }
};

const renderPrice = (data) => {
  if (!data) return null;
  const formattedPrice = formatPrice(data);
  const formattedOriginalPrice = data.price === data.original_price ? null : formatOriginalPrice(data);
  if (!formattedPrice) return null;

  return (
    <div className={styles.group}>
      <div
        {...generateTestId({ name: 'price-item-product-cart' })}
        className={styles.price}
        key={`cart-dditems-${data.box.id}`}
      >
        {formattedPrice}
        {formattedOriginalPrice && (
          <span {...generateTestId({ name: 'real-price-item-product-cart' })}>(trị giá {formattedOriginalPrice})</span>
        )}
      </div>
    </div>
  );
};

function renderQuantity({ data, removeConfirmation, wishlistConfirmation, onDecreaseBelowMinimum, update, isLoading }) {
  const quantityProps = {
    value: data.quantity,
    type: 'small' as const,
    style: (removeConfirmation || wishlistConfirmation || isLoading) && STYLE.quantityHidden,
    disabled: !isEmptyKeyObject(data, 'editable') && !data.editable,
    action: ({ oldValue, newValue }) => {
      update(data.box.id, oldValue, newValue, data.purchase_type, false, data.box, data);
    },
    onDecreaseBelowMinimum
  };

  return <HorizontalQuantity {...quantityProps} />;
}

function renderImage({ data, isReadOnly, isPrivateMode, onImageLinkClick }) {
  const className = classNames(
    styles.imageLink,
    data.is_pre_order && styles.imageLinkPreOrder,
    isReadOnly && styles.imageLinkReadOnly
  );
  const navLinkProps = {
    className,
    to: data.purchase_type !== PURCHASE_TYPE.REDEEM ? `${ROUTING_PRODUCT_DETAIL_PATH}/${data.box.slug}` : '#',
    onClick: () => {
      data.purchase_type !== PURCHASE_TYPE.REDEEM && onImageLinkClick?.(data?.box);
    }
  };

  if (!!isPrivateMode) {
    return (
      <div className={className}>
        <Image
          {...generateTestId({ name: 'img-item-product-cart' })}
          className={styles.image}
          src={data.box.primary_picture.medium_url}
          alt={''}
        />
        {data.is_pre_order && <div className={styles.imagePreorder}>Đặt trước</div>}
      </div>
    );
  }

  return (
    <NavLink {...navLinkProps}>
      <Image
        {...generateTestId({ name: 'img-item-product-cart' })}
        className={styles.image}
        src={data.box.primary_picture.medium_url}
        alt={''}
      />
      {data.is_pre_order && <div className={styles.imagePreorder}>Đặt trước</div>}
    </NavLink>
  );
}

function renderInfo({ data, isShowNote, isReadOnly }) {
  if (!data || !data.box) return;

  const infoProps = {
    onTouchStart: this.handleTouchStart.bind(this),
    onTouchMove: this.handleTouchMove.bind(this),
    className: classNames(styles.sectionInfo, isReadOnly && styles.infoReadOnly),
    key: `cart-items-${data.box.id}`
  };

  return (
    <div {...infoProps}>
      <div
        {...generateTestId({ name: 'title-item-product-cart' })}
        className={classNames(styles.name, isShowNote && styles.nameShowNote)}
      >
        {isReadOnly && <span className={styles.sortQuantity}>{`${data.quantity} x `}</span>}
        {decodeEntities(data.box.name)}
      </div>
      {data.discount_message && (
        <div className={styles.discountMessage}>
          <div className={styles.content}>{data.discount_message}</div>
        </div>
      )}
      {renderPrice(data)}
    </div>
  );
}

function renderProductSummary({ data, isReadOnly, isShowNote }) {
  const imageLink =
    data.purchase_type !== PURCHASE_TYPE.REDEEM ? `${ROUTING_PRODUCT_DETAIL_PATH}/${data.box.slug}` : '#';

  return (
    <div className={styles.productSummary}>
      <NavLink to={imageLink}>
        <Image src={data.box.primary_picture.medium_url} alt={''} />
        {data.is_pre_order && <div className={styles.imagePreorderProductSummary}>Đặt trước</div>}
      </NavLink>
      {renderInfo.bind(this)({ data, isShowNote, isReadOnly })}
    </div>
  );
}

const renderPurchaseType = (data) => {
  const typeMessage = PURCHASE_TYPE_LOCALE[data.purchase_type];
  if (!typeMessage) return null;

  return (
    <div className={styles.rowPurchaseType}>
      <div className={styles.content}>{typeMessage}</div>
    </div>
  );
};

function renderConfirmationPrompt({
  data,
  removeConfirmation,
  wishlistConfirmation,
  update,
  isReadOnly,
  isShowNote,
  confirmationType
}) {
  const removeContentProps = {
    isShow: removeConfirmation,
    messsage: 'Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?',
    actionIcon: 'trash',
    actionMessage: 'Xóa',
    styleIcon: STYLE.iconTrashRemove,
    updateState: 'removeConfirmation',
    isWishlist: false,
    update,
    data,
    isReadOnly,
    isShowNote,
    confirmationType
  };

  const buylaterContentProps = {
    isShow: wishlistConfirmation,
    messsage: 'Sản phẩm này sẽ được xóa ra khỏi giỏ hàng và đưa vào danh sách yêu thích của bạn',
    actionIcon: 'heart',
    actionMessage: 'Lưu',
    styleIcon: STYLE.iconHeartBuyLater,
    updateState: 'wishlistConfirmation',
    isWishlist: true,
    update,
    data,
    isReadOnly,
    isShowNote,
    confirmationType
  };

  return (
    <div>
      {renderConfirmationContent.bind(this)(removeContentProps)}
      {renderConfirmationContent.bind(this)(buylaterContentProps)}
    </div>
  );
}

function renderCloseAction({ data, isReadOnly }) {
  const nonRemovable = !!isEmptyKeyObject(data, 'removable') || !data.removable;

  return (
    <>
      <Icon
        onClick={() => {
          if (nonRemovable) return;
          this.setState({ removeConfirmation: true });
        }}
        name="close"
        className={classNames((nonRemovable || isReadOnly) && styles.invisible)}
        style={STYLE.compactCloseIcon}
        innerStyle={STYLE.iconInner}
        testId={{ name: 'remove-from-cart' }}
      />
    </>
  );
}

const PurchaseLaterActionMobile = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.actionSection} {...generateTestId({ name: 'add-to-wishlist' })}>
      <Icon name="heart" style={Object.assign({}, STYLE.icon, STYLE.purchaseLaterIcon)} innerStyle={STYLE.iconInner} />
      <div className={styles.purchaseLaterText}>Mua sau</div>
    </div>
  );
};

function renderConfirmationContent({
  isShow,
  update,
  data,
  messsage,
  actionMessage,
  actionIcon = '',
  styleIcon = {},
  updateState,
  isWishlist,
  isReadOnly,
  isShowNote,
  confirmationType
}) {
  const onConfirm = () => {
    this.setState({ hidden: true } as ICartItemState);
    update(data.box.id, data.quantity, 0, data.purchase_type, isWishlist, data.box, data);
    switch (updateState) {
      case 'removeConfirmation':
        this.setState({ removeConfirmation: false });
        gaEventTracking({
          category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
          action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.CHECKOUT_BUY_LATER,
          label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.CHECKOUT_BUY_LATER.REMOVE,
          value: 1
        });
        break;

      case 'wishlistConfirmation':
        this.setState({ wishlistConfirmation: false });
        gaEventTracking({
          category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
          action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.CHECKOUT_BUY_LATER,
          label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.CHECKOUT_BUY_LATER.BUY_LATER,
          value: 1
        });
        break;
    }
  };

  const onCancel = () => {
    switch (updateState) {
      case 'removeConfirmation':
        this.setState({ removeConfirmation: false } as ICartItemState);
        break;

      case 'wishlistConfirmation':
        this.setState({ wishlistConfirmation: false } as ICartItemState);
        break;
    }
  };

  const confirmButtonProps = {
    size: 'small',
    className: styles.button,
    icon: actionIcon,
    styleIcon,
    title: actionMessage,
    color: 'red',
    testId: { name: 'confirm' },
    onSubmit: () => onConfirm()
  };

  const cancelButtonProps = {
    className: classNames(styles.button, styles.cancelButton),
    icon: 'close',
    titleClass: styles.title,
    styleIcon: STYLE.confirmation.cancelIcon,
    size: 'small',
    title: 'Huỷ',
    testId: { name: 'cancel' },
    onSubmit: () => onCancel()
  };

  return (
    <>
      {confirmationType === 'popup' ? (
        <MobileConfirmation
          isOpen={isShow}
          prompt={messsage}
          confirmationButton={{ text: actionMessage, icon: actionIcon }}
          testId={{ name: 'cart-item-confirmation-modal' }}
          onCancel={() => onCancel()}
          onConfirm={() => {
            onConfirm();
            localStorage.setItem(storageKey.HAS_DISPLAYED_WISHLIST_NOTIFICATION, 'true');
          }}
        >
          {renderProductSummary.bind(this)({ data, isReadOnly, isShowNote })}
        </MobileConfirmation>
      ) : (
        <div
          className={classNames(styles.removeConfirmation, isShow && styles.removeConfirmationVisible)}
          {...generateTestId({ name: 'cart-item-confirmation-embedded' })}
        >
          <div className={styles.text}>{messsage}</div>
          <div className={styles.action}>
            <SubmitButton {...confirmButtonProps} />
            <SubmitButton {...cancelButtonProps} />
          </div>
        </div>
      )}
    </>
  );
}

export default function renderComponent() {
  const {
    data,
    update,
    style,
    isShowDiscountCodeMessage,
    isReadOnly,
    confirmationType,
    isForceHideBuyLater,
    isPrivateMode,
    isLoading,
    appStore: { abTestingMode },
    onImageLinkClick
  } = this.props as ICartItemProps;

  const { removeConfirmation, wishlistConfirmation, highlight, hidden } = this.state as ICartItemState;

  const isShowNote = data && !!data.discount_message && isShowDiscountCodeMessage;

  const containerProps = {
    className: classNames(
      styles.cartItemContainer,
      hidden && styles.hidden,
      isReadOnly && styles.readOnlyMode,
      highlight && styles.highlightRecent
    ),
    key: `cart-item-${data.box.id}`,
    style
  };
  const wishlistAddable =
    !!auth.loggedIn() && !isReadOnly && data.removable && data.purchase_type === PURCHASE_TYPE.NORMAL;
  const quantityVisible = !isReadOnly && data.editable;

  const selectProductVariants =
    abTestingMode?.selectProductVariants || AB_TESTING_CONFIG.SELECT_PRODUCT_VARIANTS.VARS.V1.VALUE;

  const hasDisplayedWishlistNotification = localStorage.getItem(storageKey.HAS_DISPLAYED_WISHLIST_NOTIFICATION);

  return (
    <div {...containerProps} {...generateTestId({ name: 'cart-item', id: data?.box?.slug })}>
      <div className={styles.confirmationOverlay} />
      <div className={classNames(styles.overlay, hidden && styles.overlayVisible)}></div>
      <div className={styles.sectionLeft}>
        {renderImage.bind(this)({ data, isReadOnly, isPrivateMode, onImageLinkClick })}
      </div>
      <div className={styles.sectionRight}>
        <div className={styles.rowTop}>
          {renderInfo.bind(this)({ isReadOnly, isShowNote, data })}
          <div className={styles.sectionClose}>{renderCloseAction.bind(this)({ data, isReadOnly })}</div>
        </div>

        {data &&
          quantityVisible &&
          selectProductVariants === AB_TESTING_CONFIG.SELECT_PRODUCT_VARIANTS.VARS.V2.VALUE && (
            <VariantsSelector currentVariant={data} />
          )}

        <div className={styles.rowBottom}>
          <div className={styles.actions}>
            <div className={styles.quantitySection}>
              {quantityVisible &&
                renderQuantity.bind(this)({
                  data,
                  removeConfirmation,
                  wishlistConfirmation,
                  onDecreaseBelowMinimum: () => {
                    this.setState({ removeConfirmation: true });
                  },
                  update,
                  isLoading
                })}
            </div>
            {wishlistAddable && !isForceHideBuyLater && (
              <PurchaseLaterActionMobile
                onClick={() => {
                  if (!!hasDisplayedWishlistNotification) {
                    this.setState({ hidden: true } as ICartItemState);
                    update(data.box.id, data.quantity, 0, data.purchase_type, true, data.box);
                    gaEventTracking({
                      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.CHECKOUT_BUY_LATER,
                      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.CHECKOUT_BUY_LATER.BUY_LATER,
                      value: 1
                    });

                    return;
                  }
                  this.setState({ wishlistConfirmation: true });
                }}
              />
            )}
          </div>
          <div className={styles.meta}>
            {data.note && (
              <div className={styles.rowErrorMessage}>
                <div {...generateTestId({ name: 'mes-stock-product-cart' })} className={styles.message}>
                  {data.note}
                </div>
              </div>
            )}
            {renderPurchaseType(data)}
          </div>
        </div>
      </div>
      {!isReadOnly &&
        renderConfirmationPrompt.bind(this)({
          data,
          removeConfirmation,
          wishlistConfirmation,
          update,
          isReadOnly,
          isShowNote,
          confirmationType
        })}
    </div>
  );
}
