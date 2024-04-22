import classNames from 'classnames';

import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../presentation-component/general/mobile/no-content-placeholder';
import { sortedCartItems } from '../../../utils/cart';
import { generateTestId } from '../../../utils/test-utils';
import { checkCartEmptyMessage } from '../../../utils';
import Loading from '../../../components/ui/loading';
import CartItem from '../item';
import STYLE from './style';
import style from './style.module.scss';

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
      className={style.noCartItemPlaceholder}
    />
  );
};

const generateItemProps = (
  isReadOnly,
  handleChangeQuantity,
  item: any,
  index,
  style = {},
  isCheckedDiscount,
  isShowDiscountCodeMessage,
  compactView,
  confirmationType,
  isForceHideBuyLater,
  isPrivateMode,
  isLoading,
  onImageLinkClick
) => ({
  style,
  isReadOnly,
  data: item,
  update: handleChangeQuantity,
  key: `cart-item-list-${index}`,
  isCheckedDiscount,
  isShowDiscountCodeMessage,
  compactView,
  confirmationType,
  isForceHideBuyLater,
  isPrivateMode,
  isLoading,
  onImageLinkClick
});

const renderView = ({
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
  onItemClick
}) => {
  const length = (list && list.length) || 0;
  const isEmpty = 0 === list.length || (1 === list.length && 0 === list[0].quantity);

  return (
    <div
      style={Object.assign(
        {},
        STYLE.container(isEmpty, style),
        isReadOnly && STYLE.readOnlyMode,
        !!isLoading && STYLE.loadingMode
      )}
      className={classNames('scroll-view', className)}
      {...generateTestId({ name: 'cart-list' })}
    >
      {!isEmpty &&
        Array.isArray(list) &&
        sortedCartItems(list).map((item, index) => {
          const isLastChild = index === length - 1; // If it is last child then not add border bottom on mobile
          const itemProps = generateItemProps(
            isReadOnly,
            handleChangeQuantity,
            item,
            `${item.id}-${index}`,
            isLastChild ? cartItemStyle : {},
            isCheckedDiscount,
            isShowDiscountCodeMessage,
            compactView,
            confirmationType,
            isForceHideBuyLater,
            isPrivateMode,
            isLoading,
            () => {
              onItemClick?.(item?.box, index);
            }
          );
          return <CartItem {...itemProps} />;
        })}

      {!!isEmpty && <EmptyState {...{ handleContinueAddCart, userInfo, isReceivedBirthdayGift }} />}
      {!!isLoading && <LoadingState />}
    </div>
  );
};

export default renderView;
