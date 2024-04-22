import { AppShopCheckOutSwitchRouting } from '../../../../../../routings/router';
import { mergeStyle } from '../../../../../../utils/responsive';
import { getCartPricing } from '../../../../../../utils/cart';
import {
  ROUTING_CHECK_OUT,
  ROUTING_CHECK_OUT_PAYMENT,
  ROUTING_CHECK_OUT_SUCCESS,
  ROUTING_ORDERS_TRACKINGS_PATH
} from '../../../../../../routings/path';
import Icon from '../../../../../../components/ui/icon';
import StickyActionButton from '../../../../../../components/ui/sticky-action-button';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import { ROUTING_SHOP_INDEX } from '../../../../../../routings/path';
import { isCartEmpty, isEmptyKeyObject } from '../../../../../../utils/validate';
import PrimaryActionButtonGroup from 'container/app-shop/cart/general/mobile/primary-action-button-group';
import { generateTestId } from 'utils/test-utils';
import STYLE from '../style';
import style from './style.module.scss';
import { IProps, IState } from '../../model';

const renderCheckOutAction = ({ currentRoute, history, isPrivateMode, privateModeLink }) => {
  const backIconNav = () => {
    if (!!isPrivateMode) {
      return history.push(privateModeLink);
    }
    if (currentRoute === ROUTING_CHECK_OUT_SUCCESS) {
      return history.push(ROUTING_SHOP_INDEX);
    }
    history.length >= 3 ? history.goBack() : history.push(ROUTING_SHOP_INDEX);
  };

  return (
    <div className={style.checkoutHeader}>
      <div className={style.leftSection}>
        <div className={style.action}>
          <div onClick={backIconNav}>
            <Icon
              {...{
                name: 'angle-left',
                style: STYLE.actionButton.iconButton,
                innerStyle: STYLE.actionButton.iconButton.inner
              }}
            />
          </div>
        </div>
        <div className={style.title}>Mua hàng</div>
      </div>
    </div>
  );
};

const renderPrimaryActionButton = ({
  history,
  currentRoute,
  submitLoading,
  handleCheckout,
  url,
  totalPrice,
  onCheckoutContinueClick
}) => {
  const lastPhase = currentRoute === ROUTING_CHECK_OUT_SUCCESS;
  const checkoutPhase = currentRoute === ROUTING_CHECK_OUT;
  const paymentPhase = currentRoute === ROUTING_CHECK_OUT_PAYMENT;

  const buttonProps = {
    action: { text: paymentPhase ? 'Tiến hành đặt hàng' : 'Đặt hàng' },
    loading: submitLoading && paymentPhase,
    onClick() {
      const action = {
        [ROUTING_CHECK_OUT]: () => onCheckoutContinueClick?.(),
        [ROUTING_CHECK_OUT_PAYMENT]: () => handleCheckout(),
        [ROUTING_CHECK_OUT_SUCCESS]: () => history.push(url)
      };

      action[currentRoute]();
    }
  };

  !lastPhase &&
    Object.assign(buttonProps, { info: { title: checkoutPhase ? 'Tạm tính:' : 'Tổng tiền', content: totalPrice } });

  return (
    <div className={style.primaryButton}>
      <StickyActionButton {...buttonProps} />
    </div>
  );
};

const renderMobile = ({ props, state, handleCheckout, onCheckoutContinueClick }) => {
  const {
    cartStore: { orderInfo, cartDetail },
    appStore: { isPrivateMode, privateModeLink },
    history,
    location
  } = props as IProps;
  const { submitLoading } = state as IState;

  const _isCartEmpty =
    isEmptyKeyObject(cartDetail, 'cart_items') || isCartEmpty(cartDetail.cart_items || [], PURCHASE_TYPE.NORMAL);

  const pathname = (location && location.pathname) || '';
  const isCartRoute = location.pathname === ROUTING_CHECK_OUT;
  const { viewSpecificTotalPriceFormatted } = getCartPricing({ cartDetail, isCartView: isCartRoute });

  return (
    <div
      className={'cart-panel-container'}
      style={mergeStyle(STYLE.mobile, pathname === ROUTING_CHECK_OUT_SUCCESS && STYLE.mobileSuccessPhase)}
      {...generateTestId({ name: 'cart-panel-container' })}
    >
      {renderCheckOutAction({
        currentRoute: pathname,
        history,
        isPrivateMode,
        privateModeLink
      })}

      <div style={STYLE.container}>
        <AppShopCheckOutSwitchRouting />
      </div>

      {false &&
        location.pathname !== ROUTING_CHECK_OUT_SUCCESS &&
        !(location.pathname === ROUTING_CHECK_OUT && _isCartEmpty) &&
        renderPrimaryActionButton({
          history,
          submitLoading,
          handleCheckout,
          currentRoute: pathname,
          url: `${ROUTING_ORDERS_TRACKINGS_PATH}/${orderInfo && orderInfo.number}`,
          totalPrice: viewSpecificTotalPriceFormatted,
          onCheckoutContinueClick
        })}
      {location.pathname !== ROUTING_CHECK_OUT_SUCCESS && !_isCartEmpty && (
        <PrimaryActionButtonGroup
          isLoading={submitLoading}
          onClick={() => {
            onCheckoutContinueClick();
          }}
        />
      )}
    </div>
  );
};

export default renderMobile;
