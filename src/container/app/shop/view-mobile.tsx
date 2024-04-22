import { AppShopSwitchRouting } from '../../../routings/router';

import { auth } from '../../../utils/auth';
import { getUrlParameter } from '../../../utils/format';
import MobileSpecialDealMenu from '../../../components/container/mobile-special-deal-menu';
import DownloadApp from '../../../presentation-component/download-app';
import MobileNavigation from '../../../presentation-component/general/mobile-navigation';
import MobileInfoMenu from '../../../components/container/mobile-info-menu';
import MobileToolbar from '../../../components/container/mobile-toolbar';
import OverlayReload from '../../layout/overlay-reload';
import SubcribeEmail from '../../../components/modal/subcribe-email';
import UserBirthday from '../../../components/modal/user-birthday';
import MobileSigninAlert from '../../app-shop/mobile-index-tab/mobile-signin-alert';
import LiveBackground from '../../../presentation-component/live/live-background';
import { isShowDownloadAppBar } from '../../../utils/generic';
import Modal from '../../modal';
import SharedModal from '../../shared-modal';
import Alert from '../../alert';

import {
  ROUTING_INFO,
  ROUTING_SPECIAL_DEALS,
  ROUTING_THEME_DETAIL_PATH,
  ROUTING_REDEEM_PATH
} from '../../../routings/path';

import * as LAYOUT from '../../../style/layout';
import ErrorMessage from '../../exception/error';
import { WHITE_LIST_CHECK_OUT_CONTAINER, BLACK_LIST_GAME_HEADER_MOBILE } from './initialize';
import { IProps } from './model';
import STYLE from './style';

const renderMobile = (props: IProps, state, handleBackToHome, handleReload, handleSetIsShowBirthdayModal) => {
  const {
    history,
    location,
    openModalAction,
    modalStore,
    specialDealStore: { specialDealList },
    appStore: { mobileappWebviewStatus, isPrivateMode },
    notificationStore: { unreadCount }
  } = props;

  const { isError, isShowBirthdayModalForm } = state;

  const isInfoPage = location.pathname.indexOf(`${ROUTING_INFO}/`) === 0;
  const isSpecialDealsPage = location.pathname.indexOf(`${ROUTING_SPECIAL_DEALS}/`) === 0;
  const containPathList = WHITE_LIST_CHECK_OUT_CONTAINER.MOBILE.filter((item) => location.pathname.indexOf(item) === 0);

  const styleRootProps = {
    id: 'shop-app',
    style: Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalFlex, STYLE.mobile)
  };

  const mobileNavigationProps = {
    specialDealCategories: specialDealList,
    location
  };

  const renderMobileProps = () => {
    const path = location.pathname;
    const arrPath = path.toString().split('/');
    const getSlug = (index) => arrPath[index];
    const firstSlugPre = `/${getSlug(1)}`;
    const activeList = [ROUTING_THEME_DETAIL_PATH, ROUTING_REDEEM_PATH];
    const match = activeList.some((item) => item === firstSlugPre);
    return { isCountDown: match };
  };

  /* For central feedabck form */
  const autoRedirect = getUrlParameter(location.search, 'auto-redirect');
  const isShowByGameContainer = BLACK_LIST_GAME_HEADER_MOBILE.indexOf(location.pathname) < 0;

  const isShowMobileNavigation =
    !autoRedirect && // Only render if not redirect form
    containPathList &&
    containPathList.length === 0 && // Some screen not show mobile nav: auth, checkout, brands
    isShowByGameContainer && // Not show if game
    !mobileappWebviewStatus &&
    !isPrivateMode; // Not show in mobile app web view

  const mobileHeadNav = Object.assign({}, mobileNavigationProps, renderMobileProps(), {
    isCountDown: false,
    withDownloadAppBar: isShowDownloadAppBar()
  });

  if (0 === isError) return <ErrorMessage handleBackToHome={handleBackToHome} handleReload={handleReload} />;

  const mobileToolbarProps = { openModal: openModalAction, notificationUnreadCount: unreadCount };

  const isShowMobileToolbar = !mobileappWebviewStatus; // Not show in mobile app web view

  return (
    <div {...styleRootProps}>
      {!!isShowMobileToolbar && isShowDownloadAppBar() && <DownloadApp />}
      {isShowMobileNavigation && <MobileNavigation {...mobileHeadNav} />}
      {!window.isInsightsBot && isInfoPage && <MobileInfoMenu />}
      {isSpecialDealsPage && <MobileSpecialDealMenu categoryList={specialDealList} />}

      <div
        id={'app-container'}
        style={Object.assign({}, STYLE.mobile.container, modalStore.isShow && STYLE.mobile.containerDisableScroll)}
      >
        {1 === isError ? (
          <ErrorMessage handleBackToHome={handleBackToHome} handleReload={handleReload} />
        ) : (
          <AppShopSwitchRouting />
        )}
      </div>
      {!!isShowMobileToolbar && <MobileToolbar {...mobileToolbarProps} />}
      {!!auth.loggedIn()
        ? false && !isPrivateMode && !!isShowBirthdayModalForm && <UserBirthday />
        : !isPrivateMode && !mobileappWebviewStatus && <SubcribeEmail />}
      <Modal history={history} />
      <SharedModal />
      <Alert />
      <MobileSigninAlert />
      <LiveBackground />
      <OverlayReload />
    </div>
  );
};

export default renderMobile;
