// TODO: Refactor
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import SubmitButton from 'components/ui/submit-button';
import HorizontalQuantity from 'components/ui/horizontal-quantity';
import MobileConfirmation from 'components/ui/mobile-confirmation';
import VariantsSelector from 'components/cart/variants-selector';
import Image from 'presentation-component/ui/image';
import Pill from 'presentation-component/ui/pill';
import Icon from 'presentation-component/ui/icon';
import Tooltip from 'presentation-component/ui/tooltip';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from 'tracking/google-analytic/type';
import { gaEventTracking } from 'tracking/google-analytic/ga-event-tracking';

import { PURCHASE_TYPE } from 'constants/application/purchase';
import { ROUTING_PRODUCT_DETAIL_PATH } from 'routings/path';
import { decodeEntities } from 'utils/encode';
import { isEmptyKeyObject } from 'utils/validate';
import { auth } from 'utils/auth';
import { generateTestId } from 'utils/test-utils';

import { ICartItemProps, ICartItemState } from '../../model';
import { formatOriginalPrice, formatPrice, getGiftTag } from '../../utils';
import STYLE from './style';
import styles from './style.module.scss';

const renderPrice = (data) => {
  if (!data) return null;
  const formattedPrice = formatPrice(data);
  const formattedOriginalPrice = formatOriginalPrice(data);
  if (!formattedPrice) return null;

  return (
    <div className={styles.group}>
      <div
        {...generateTestId({ name: 'price-item-cart' })}
        className={styles.price}
        key={`cart-dditems-${data.box.id}`}
      >
        {formattedPrice}
        {formattedOriginalPrice && (
          <span {...generateTestId({ name: 'real-price-item-cart' })}>(trị giá {formattedOriginalPrice})</span>
        )}
      </div>
    </div>
  );
};

function renderQuantity({ data, onDecreaseBelowMinimum, update }) {
  const quantityProps = {
    value: data.quantity,
    type: 'small' as const,
    disabled: !isEmptyKeyObject(data, 'editable') && !data.editable,
    action: ({ oldValue, newValue }) =>
      update(data.box.id, oldValue, newValue, data.purchase_type, false, data.box, data),
    onDecreaseBelowMinimum
  };

  return <HorizontalQuantity {...quantityProps} />;
}

function renderImage({
  data,
  removeConfirmation,
  wishlistConfirmation,
  isReadOnly,
  isPrivateMode,
  openLinkInNewTab,
  onImageLinkClick
}) {
  const className = classNames(
    styles.imageLink,
    (removeConfirmation || wishlistConfirmation) && styles.imageLinkShowRemoveConfirmation,
    data.is_pre_order && styles.imageLinkPreOrder,
    isReadOnly && styles.imageLinkReadOnly
  );
  const hasLink = data.purchase_type !== PURCHASE_TYPE.REDEEM;
  const navLinkProps = {
    className,
    to: hasLink ? `${ROUTING_PRODUCT_DETAIL_PATH}/${data.box.slug}` : '#',
    target: hasLink && openLinkInNewTab ? '_blank' : undefined,
    onClick: () => {
      hasLink && onImageLinkClick?.(data?.box);
    }
  };

  if (!!isPrivateMode) {
    return (
      <div className={className}>
        <Image
          className={styles.image}
          src={data.box.primary_picture.thumb_url || data.box.primary_picture.square_url}
          alt={''}
        />
        {data.is_pre_order && <div className={styles.imagePreorder}>Đặt trước</div>}
      </div>
    );
  }

  return (
    <NavLink {...navLinkProps}>
      <Image
        className={styles.image}
        src={data.box.primary_picture.thumb_url || data.box.primary_picture.square_url}
        alt={''}
      />
      {data.is_pre_order && <div className={styles.imagePreorder}>Đặt trước</div>}
    </NavLink>
  );
}

function renderInfo({ removeConfirmation, wishlistConfirmation, data, isShowNote, isReadOnly }) {
  return (
    !!data?.box && (
      <div
        {...{
          key: `cart-items-${data.box.id}`,
          onTouchStart: this.handleTouchStart.bind(this),
          onTouchMove: this.handleTouchMove.bind(this),
          className: classNames(
            styles.sectionInfo,
            (removeConfirmation || wishlistConfirmation) && styles.infoHidden,
            isReadOnly && styles.infoReadOnly
          )
        }}
      >
        <div
          {...generateTestId({ name: 'title-item-cart' })}
          className={classNames(styles.name, isShowNote && styles.nameShowNote)}
        >
          {isReadOnly && <span className={styles.sortQuantity}>{`${data.quantity} x `}</span>}
          {decodeEntities(data.box.name)}
        </div>
        {false && data.discount_message && (
          <div className={styles.discountMessage}>
            <div className={styles.content}>{data.discount_message}</div>
          </div>
        )}
        {renderPrice(data)}
      </div>
    )
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
      {renderInfo.bind(this)({
        removeConfirmation: false,
        wishlistConfirmation: false,
        data,
        isShowNote,
        isReadOnly
      })}
    </div>
  );
}

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
    actionIcon: 'trash',
    actionMessage: 'Xóa',
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

  return (
    <>
      {confirmationType === 'popup' ? (
        <MobileConfirmation
          isOpen={isShow}
          prompt={messsage}
          confirmationButton={{ text: actionMessage, icon: actionIcon }}
          testId={{ name: 'cart-item-confirmation-modal' }}
          onCancel={() => onCancel()}
          onConfirm={() => onConfirm()}
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
            <SubmitButton
              {...{
                size: 'small',
                className: styles.button,
                icon: actionIcon,
                styleIcon,
                title: actionMessage,
                color: 'red',
                testId: { name: 'confirm' },
                onSubmit: () => {
                  onConfirm();
                }
              }}
            />
            <SubmitButton
              {...{
                className: classNames(styles.button, styles.cancelButton),
                icon: 'close',
                titleClass: styles.title,
                styleIcon: STYLE.confirmation.cancelIcon,
                size: 'small',
                title: 'Huỷ',
                testId: { name: 'cancel' },
                onSubmit: () => onCancel()
              }}
            />
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
    isPrivateMode,
    isLoading,
    onImageLinkClick,
    desktopActionsAlwaysVisible,
    openLinkInNewTab
  } = this.props as ICartItemProps;

  const PREFIX_ID = this.PREFIX_ID;
  const { removeConfirmation, wishlistConfirmation, highlight, hidden } = this.state as ICartItemState;

  const isShowNote = data && !!data.discount_message && isShowDiscountCodeMessage;

  const isRemovable = !isReadOnly && data.removable;
  const quantityVisible = !isReadOnly && data.editable;
  const giftTag = getGiftTag(data);

  return (
    <div
      {...{
        className: classNames(
          styles.cartItemContainer,
          hidden && styles.hidden,
          isReadOnly && styles.readOnlyMode,
          highlight && styles.highlightRecent
        ),
        key: `${PREFIX_ID}-${data.box.id}`,
        style,
        id: `${PREFIX_ID}-${data?.id}`
      }}
      {...generateTestId({ name: 'cart-item', id: data?.box?.slug })}
    >
      <div
        className={classNames(
          styles.confirmationOverlay,
          (removeConfirmation || wishlistConfirmation) && styles.confirmationOverlayVisible
        )}
      />
      <div className={classNames(styles.overlay, hidden && styles.overlayVisible)}></div>
      <div className={styles.sectionLeft}>
        {renderImage.bind(this)({
          data,
          isReadOnly,
          removeConfirmation,
          wishlistConfirmation,
          isPrivateMode,
          openLinkInNewTab,
          onImageLinkClick
        })}
      </div>
      <div className={styles.sectionRight}>
        <div className={styles.rowTop}>
          <div className={styles.segmentInfo}>
            {renderInfo.bind(this)({
              isReadOnly,
              removeConfirmation,
              wishlistConfirmation,
              isShowNote,
              data
            })}
          </div>
          {!!isRemovable && (
            <Tooltip
              tip="Xóa"
              classes={{ container: styles.tooltipContainer, tooltip: styles.tooltip }}
              position="left"
            >
              <Icon
                name="close"
                className={classNames(styles.segmentAction, desktopActionsAlwaysVisible && styles.visible)}
                onClick={() => {
                  this.setState(
                    !!auth.loggedIn() && data?.purchase_type !== PURCHASE_TYPE.REDEEM
                      ? { wishlistConfirmation: true }
                      : { removeConfirmation: true }
                  );
                }}
              />
            </Tooltip>
          )}
        </div>

        {false && data && quantityVisible && <VariantsSelector currentVariant={data} />}

        <div className={classNames(styles.rowBottom)}>
          <div className={styles.quantitySection}>
            {quantityVisible && (
              <>
                {!!isLoading}
                {renderQuantity.bind(this)({
                  data,
                  onDecreaseBelowMinimum: () => {
                    this.setState(
                      !!auth.loggedIn() && data?.purchase_type !== PURCHASE_TYPE.REDEEM
                        ? { wishlistConfirmation: true }
                        : { removeConfirmation: true }
                    );
                  },
                  update
                })}
              </>
            )}
            <div className={classNames(styles.badges, 'badges')}>
              {!!data?.box?.variants?.length &&
                data.box.variants.map((variant, index) => (
                  <Pill key={index} color="greyOutlined">
                    {variant.value}
                  </Pill>
                ))}
              {!!giftTag && <Pill color={giftTag.color as any}>{giftTag.message}</Pill>}
            </div>
          </div>
          <div className={styles.meta}>
            {!!data.discount_message && (
              <div className={styles.rowErrorMessage}>
                <div className={styles.message}>{data.discount_message}</div>
              </div>
            )}
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
