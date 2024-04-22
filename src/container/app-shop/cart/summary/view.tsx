import classNames from 'classnames';
import CartList, { ConfirmationType } from '../../../../components/cart/list';
import CartInfo from '../../../../components/cart/info';
import { isEmptyKeyObject } from '../../../../utils/validate';
import { generateTestId } from 'utils/test-utils';
import Icon from '../../../../components/ui/icon';
import DiscountCode from 'components/cart/discount-code';
import STYLE from './style';
import styles from './style.module.scss';

const renderPanelHeading = ({ cartList, showHideCartSumaryLayoutAction }) => {
  return (
    <div {...{ style: Object.assign({}, STYLE.heading, !cartList.length && STYLE.whiteHeading) }}>
      <div {...{ style: STYLE.cartHeadingGroup.title }} {...generateTestId({ name: 'topic-cart' })}>
        Giỏ hàng của bạn
      </div>
      <Icon
        {...{
          testId: { name: 'btn-close' },
          name: 'close',
          style: STYLE.cartHeadingGroup.icon,
          onClick: () => showHideCartSumaryLayoutAction?.(false),
          innerStyle: Object.assign({}, STYLE.cartHeadingGroup.inner, { width: 16 })
        }}
      />
    </div>
  );
};

const View = ({ props, handleTouchMove, handleUpdateCart, handleTouchStart }) => {
  const {
    cartStore: { cartDetail, isAddCartLoading, isRemoveCartLoading, isCartSummaryVisible },
    appStore: { isPrivateMode },
    showHideCartSumaryLayoutAction,
    history
  } = props;

  const cartList = (!isEmptyKeyObject(cartDetail, 'cart_items') && cartDetail.cart_items) || [];

  const isShowCartInfo = cartList && cartList.length > 0;

  return (
    <div
      {...{
        className: classNames('cart-summary', isCartSummaryVisible && 'is-show'),
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        style: STYLE.container,
        id: 'cart-summary-container'
      }}
      {...generateTestId({ name: 'cart-summary' })}
    >
      <div
        {...{
          style: STYLE.overlay,
          id: 'cart-summary-overlay',
          className: classNames(isCartSummaryVisible && 'is-show'),
          onClick: () => showHideCartSumaryLayoutAction?.(false)
        }}
      />

      <div style={STYLE.panel} id={'cart-summary-panel'} className={classNames(isCartSummaryVisible && 'is-show')}>
        <div style={STYLE.inner}>
          {renderPanelHeading({ cartList, showHideCartSumaryLayoutAction })}
          <div
            {...{
              className: 'scroll-view',
              style: STYLE.scrollView
            }}
          >
            <CartList
              {...{
                history,
                list: cartList,
                isPrivateMode,
                update: handleUpdateCart,
                isShowDiscountCodeMessage: false,
                isForceHideBuyLater: true,
                compactView: true,
                confirmationType: 'inline' as ConfirmationType,
                isLoading: isAddCartLoading || isRemoveCartLoading,
                showHideCartSumaryLayoutAction
              }}
            />
          </div>
          <DiscountCode mode="suggestionsOnly" classes={{ container: styles.discountCodeSuggestions }} />
          {isShowCartInfo && (
            <CartInfo
              history={history}
              data={cartDetail}
              showHideCartSumaryLayoutAction={showHideCartSumaryLayoutAction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
