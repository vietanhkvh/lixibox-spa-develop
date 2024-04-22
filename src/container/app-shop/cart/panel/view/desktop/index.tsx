// TODO: Refactor
import classNames from 'classnames';

import { AppShopCheckOutSwitchRouting } from 'routings/router';
import { ROUTING_ORDERS_TRACKINGS_PATH, ROUTING_CHECK_OUT_SUCCESS, ROUTING_CHECK_OUT } from 'routings/path';

import { PURCHASE_TYPE } from 'constants/application/purchase';
import { isCartEmpty, isEmptyKeyObject } from 'utils/validate';
import { auth } from 'utils/auth';
import { generateTestId } from 'utils/test-utils';
import CheckoutHeader from 'presentation-component/checkout/header/desktop';
import CartSummaryCheckOut from './summary-check-out';

import WrapLayout from 'container/layout/wrap';
import SplitLayout from 'container/layout/split';
import AuthModalBlock from 'components/auth-modal-block/desktop';
import { ModalCloseRequestReason } from 'components/auth-modal-block/desktop/constant';
import { CHECKOUT_PHASES } from 'constants/application/checkout';

import CODSuggestionBlock from 'container/app-shop/cart/success/sub-components/desktop/cod-suggestion-block';
import { renderNavigateButton } from './primary-navigation';
import STYLE from '../style';
import style from './style.module.scss';

const renderSubContainer = ({
  url,
  history,
  pathname,
  cartStore,
  isCartEmpty,
  activeNavList,
  submitLoading,
  isShowDiscount,
  handleCheckout,
  isHiddenBtnGroup,
  isPrivateMode,
  privateModeLink,
  onCheckoutContinueClick
}) => {
  const cartProps = {
    pathname,
    isShowDiscount,
    isAllowCollapse: false
  };

  const navigationButtonProps = {
    url,
    history,
    isCartEmpty,
    activeNavList,
    submitLoading,
    handleCheckout,
    isHiddenBtnGroup,
    isModal: true,
    isPrivateMode,
    privateModeLink,
    onCheckoutContinueClick
  };

  const { orderInfo } = cartStore;

  return (
    <div className={style.sidePanel}>
      {renderNavigateButton(navigationButtonProps)}
      <CartSummaryCheckOut {...cartProps} />
      {!!orderInfo &&
        orderInfo.can_change_to_cod &&
        !!orderInfo.id &&
        history.location.pathname === ROUTING_CHECK_OUT_SUCCESS &&
        !!auth.loggedIn() && <CODSuggestionBlock className={style.codSuggestion} />}
    </div>
  );
};

const Title = ({ activeNavList }) =>
  !Array.isArray(activeNavList) || activeNavList.length === 0 || !activeNavList[0].generalTitle ? null : (
    <div {...generateTestId({ name: 'topic-cart' })} className={style.title}>
      {activeNavList[0].generalTitle}
    </div>
  );

const renderMainContainer = ({ activeNavList }) => {
  return (
    <div className={style.mainContainer}>
      <Title activeNavList={activeNavList} />
      <AppShopCheckOutSwitchRouting />
    </div>
  );
};

const renderDesktop = ({ props, state, handleCheckout, setAuthModalVisibility, onCheckoutContinueClick }) => {
  const {
    history,
    location,
    cartStore: { orderInfo, paidCartId, cartDetail, authModalState },
    appStore: { isPrivateMode, privateModeLink }
  } = props;
  const { submitLoading } = state;

  const onCartScreen = location.pathname === ROUTING_CHECK_OUT;
  const onThankYouScreen = location.pathname === ROUTING_CHECK_OUT_SUCCESS;
  const activeNavList = CHECKOUT_PHASES.filter((item) => location.pathname === item.name);

  const _isCartEmpty =
    isEmptyKeyObject(cartDetail, 'cart_items') || isCartEmpty(cartDetail.cart_items || [], PURCHASE_TYPE.NORMAL);
  const isHideSideBar = onThankYouScreen && cartDetail.id !== paidCartId;

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    isWithBorderSplit: false,
    style: STYLE.splitLayout,
    className: style.bodyContainer,
    subContainerClassName: classNames(style.sidePanelContainer, onCartScreen || style.sidePanelContainerPayment),
    subContainer: renderSubContainer({
      activeNavList,
      isShowDiscount: onCartScreen,
      handleCheckout,
      submitLoading,
      url: orderInfo ? `${ROUTING_ORDERS_TRACKINGS_PATH}/${orderInfo.number}` : '',
      isCartEmpty: _isCartEmpty,
      history,
      isHiddenBtnGroup: false,
      cartStore: props.cartStore,
      pathname: (history && history.location && history.location.pathname) || '',
      isPrivateMode,
      privateModeLink,
      onCheckoutContinueClick
    }),
    mainContainer: renderMainContainer({ activeNavList })
  };

  return (
    <div style={STYLE} className={'user-select-all'} {...generateTestId({ name: 'cart-panel-container' })}>
      <CheckoutHeader />

      <WrapLayout style={STYLE.wrapLayoutDesktop}>
        {!!_isCartEmpty || !!isHideSideBar ? (
          renderMainContainer({ activeNavList })
        ) : (
          <SplitLayout {...splitLayoutProps} />
        )}
      </WrapLayout>
      <AuthModalBlock
        {...{
          isOpen: authModalState.isAuthModalOpen,
          initialView: authModalState.authModalInitialView,
          referrer: ROUTING_CHECK_OUT,
          onRequestClose: (event) => {
            setAuthModalVisibility(false);
            event?.reason !== ModalCloseRequestReason.OVERLAY_CLICK_OR_ESC_PRESS && history.push(ROUTING_CHECK_OUT);
          }
        }}
      />
    </div>
  );
};

export default renderDesktop;
