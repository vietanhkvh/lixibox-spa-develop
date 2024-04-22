import { useState } from 'react';
import classNames from 'classnames';

import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import { sortedCartItems } from 'utils/cart';
import { generateTestId } from 'utils/test-utils';
import { checkCartEmptyMessage } from 'utils';
import Icon from 'presentation-component/ui/icon';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import ChildrenOrientedExpander from 'presentation-component/ui/children-oriented-expander';
import Loading from 'components/ui/loading';
import CartItem from '../item2';
import STYLE from './style';
import styles from './style.module.scss';

const DEFAULT_MAX_VISIBLE_CART_ITEM_BLOCKS = 10;

const LoadingState = () => (
  <div style={STYLE.loadingPanel}>
    <Loading />
  </div>
);

const EmptyState = ({ handleContinueAddCart, userInfo, isReceivedBirthdayGift }) => {
  const cartEmptyMessage = checkCartEmptyMessage(userInfo, isReceivedBirthdayGift);

  return (
    <NoContentPlaceholder
      isShowBirthdayMessage={cartEmptyMessage?.isShowBirthdayMessage || false}
      userName={userInfo?.first_name || ''}
      title={cartEmptyMessage?.title || ''}
      info={cartEmptyMessage?.info || ''}
      logo={NO_CONTENT_LOGO.BASKET}
      action={{ text: 'Tiếp tục mua sắm' }}
      onClick={handleContinueAddCart}
      className={styles.noCartItemPlaceholder}
    />
  );
};

const View = ({
  userInfo,
  isReadOnly,
  list,
  style,
  cartItemStyle,
  isCheckedDiscount,
  handleChangeQuantity,
  handleContinueAddCart,
  isShowDiscountCodeMessage,
  className,
  compactView,
  confirmationType,
  isForceHideBuyLater,
  isPrivateMode,
  isLoading,
  isReceivedBirthdayGift,
  onItemClick,
  withHeader,
  withExpander,
  openLinkInNewTab
}) => {
  const [desktopActionsAlwaysVisible, setDesktopActionsAlwaysVisible] = useState(false);
  const length = (list && list.length) || 0;
  const isEmpty = 0 === list.length || (1 === list.length && 0 === list[0].quantity);
  const cartItemCount = (list || []).reduce((acc, item) => acc + item.quantity, 0);
  const cartItemBlockCount: number = (list || []).length || 0;
  const removableItemCount = isReadOnly
    ? 0
    : (list || []).reduce(
        (acc, item) => acc + (item.removable && item.purchase_type === PURCHASE_TYPE.NORMAL ? item.quantity : 0),
        0
      );

  return (
    <div
      style={Object.assign(
        {},
        STYLE.container(isEmpty, style),
        isReadOnly && STYLE.readOnlyMode,
        !!isLoading && STYLE.loadingMode
      )}
      className={classNames(styles.cartItems, 'scroll-view', className)}
      {...generateTestId({ name: 'cart-list' })}
    >
      {!!withHeader && !isEmpty && (
        <div className={styles.header}>
          <Icon name="cart" className={styles.icon} />
          <div className={styles.title}>GIỎ HÀNG{cartItemCount ? ` (${cartItemCount} SẢN PHẨM)` : ''}</div>
          {!!removableItemCount && (
            <div className={styles.action} onClick={() => setDesktopActionsAlwaysVisible((prevState) => !prevState)}>
              Sửa
            </div>
          )}
        </div>
      )}
      {!isEmpty && Array.isArray(list) && (
        <ChildrenOrientedExpander
          defaultVisibleChildrenCount={DEFAULT_MAX_VISIBLE_CART_ITEM_BLOCKS}
          expanderLabel={{
            collapsed: `Xem thêm (${cartItemBlockCount - DEFAULT_MAX_VISIBLE_CART_ITEM_BLOCKS} sản phẩm)`
          }}
          classes={{
            container: styles.expander,
            children: styles.expanderChildren,
            indicator: styles.expanderIndicator
          }}
        >
          {sortedCartItems(list).map((item, index) => (
            <CartItem
              {...{
                key: `cart-item-list-${item.id}-${index}`,
                isReadOnly,
                update: handleChangeQuantity,
                data: item,
                style: index === length - 1 ? cartItemStyle : {},
                isCheckedDiscount,
                isShowDiscountCodeMessage,
                compactView,
                confirmationType,
                isForceHideBuyLater,
                isPrivateMode,
                isLoading,
                onImageLinkClick: () => {
                  onItemClick?.(item?.box, index);
                },
                desktopActionsAlwaysVisible,
                openLinkInNewTab
              }}
            />
          ))}
        </ChildrenOrientedExpander>
      )}
      {!!isEmpty && <EmptyState {...{ handleContinueAddCart, userInfo, isReceivedBirthdayGift }} />}
      {!!isLoading && <LoadingState />}
    </div>
  );
};

export default View;
