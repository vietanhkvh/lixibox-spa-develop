import { NavLink } from 'react-router-dom';

import Icon from 'components/ui/icon';
import { SIGN_IN_STATE } from 'constants/application/global';
import { ROUTING_COMMUNITY_USER_FEED_PATH, ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS } from 'routings/path';
import { AppShopCommunitySwitchRouting } from 'routings/router';
import { gaEventTracking } from 'tracking/google-analytic/ga-event-tracking';
import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from 'tracking/google-analytic/type';
import MainBlock from '../../../layout/main-block';
import SplitLayout from '../../../layout/split';
import WrapLayout from '../../../layout/wrap';

import { renderUserCover } from './view-general';
import { navigationList } from './initialize';
import { IProps } from './model';
import STYLE from './style';

const generateLinkProps = (item, pathname) => {
  const linkProps = {
    style: STYLE.category,
    activeStyle: item.link.indexOf(pathname) === 0 ? STYLE.category.active : {},
    to: item.link,
    key: `community-category-${item.id}`,
    onClick: () => {
      gaEventTracking({
        category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
        action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
        label: item.clickTracking,
        value: 1
      });
    }
  };

  const iconProps = {
    name: item.icon,
    className: item.class,
    style: Object.assign({}, STYLE.mainNavigation.icon, STYLE.mainNavigation.customOuterIcon[item.icon]),
    innerStyle: Object.assign({}, STYLE.mainNavigation.innerIcon, STYLE.mainNavigation.customIcon[item.icon])
  };

  return (
    <NavLink {...linkProps}>
      <Icon {...iconProps} />
      {item.title}
    </NavLink>
  );
};

const renderLeftSidebar = (pathname, authStore, cartStore) => {
  const {
    constants: { unboxing_enabled: unboxingEnabled }
  } = cartStore;
  const blockProps = {
    id: 'desktop-community-left-sticky',
    style: STYLE.leftSideBarBlock
  };

  const { signInStatus, profile: user } = authStore;
  const isLogin = SIGN_IN_STATE.LOGIN_SUCCESS === signInStatus;
  const _navigationList = unboxingEnabled ? navigationList : navigationList.filter((nav) => nav.id !== 2); // TODO: Use constant as an ID

  return (
    <div {...blockProps}>
      {_navigationList.map((item) => generateLinkProps(item, pathname))}
      {!!isLogin && renderUserNavigation({ userInfo: user })}
    </div>
  );
};

const renderUserNavigation = ({ userInfo }) => {
  const userFeedbackProps = {
    key: 'user-feedback',
    link: ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS,
    title: 'Đánh giá sản phẩm',
    icon: 'star-line'
  };

  return (
    <div style={STYLE.userNavigation}>
      <div style={STYLE.userNavigation.lineBreak} />

      <div>
        {renderUserSubNav({ userInfo })}
        {renderUserCustomSubNav(userFeedbackProps)}
      </div>
    </div>
  );
};

const renderUserSubNav = ({ userInfo }) => {
  const navLinkProps = {
    to: `${ROUTING_COMMUNITY_USER_FEED_PATH}/${userInfo.referral_code}`,
    style: STYLE.userNavigation.subNav,
    activeStyle: STYLE.userNavigation.subNavActive,

    onClick: () => {
      gaEventTracking({
        category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
        action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
        label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.SUB_NAVIGATION.USER_PROFILE,
        value: 1
      });
    }
  };

  const avatarProps = {
    style: Object.assign({}, STYLE.userNavigation.subNav.image, {
      backgroundImage: `url('${!!userInfo.avatar && userInfo.avatar.medium_url}')`
    })
  };

  return (
    <NavLink {...navLinkProps}>
      <div key={'community-user-sub-nav'} style={STYLE.userNavigation.subNav.inner}>
        <div {...avatarProps} />
        <div style={STYLE.userNavigation.subNav.title}>{userInfo.name}</div>
      </div>
    </NavLink>
  );
};

const renderUserCustomSubNav = ({ key, link, title, icon }) => {
  const navLinkProps = {
    to: link,
    style: STYLE.userNavigation.subNav,
    activeStyle: STYLE.userNavigation.subNavActive,
    onClick: () => {
      gaEventTracking({
        category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
        action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
        label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.SUB_NAVIGATION.BOX_RATING,
        value: 1
      });
    }
  };

  const iconProps = {
    name: icon,
    style: STYLE.userNavigation.subNav.icon,
    innerStyle: Object.assign({}, STYLE.userNavigation.subNav.innerIcon, STYLE.userNavigation.subNav.customeIcon[icon])
  };

  return (
    <NavLink {...navLinkProps}>
      <div key={key} style={STYLE.userNavigation.subNav.inner}>
        <Icon {...iconProps} />
        <div style={STYLE.userNavigation.subNav.title}>{title}</div>
      </div>
    </NavLink>
  );
};

const renderMainContainer = () => {
  const mainBlockProps = {
    showHeader: false,
    showViewMore: false,
    content: <AppShopCommunitySwitchRouting />,
    style: STYLE.container
  };

  return <MainBlock {...mainBlockProps} />;
};

const renderDesktop = (props: IProps) => {
  const {
    location,
    activityFeedStore: { userInfo },
    authStore,
    cartStore,
    cartStore: {
      constants: { unboxing_enabled: unboxingEnabled }
    }
  } = props;
  const splitLayoutProps = {
    subContainer: renderLeftSidebar((location && location.pathname) || '', authStore, cartStore),
    mainContainer: renderMainContainer()
  };

  const IS_SHOW_USER_COVER = location.pathname.indexOf(ROUTING_COMMUNITY_USER_FEED_PATH) >= 0;

  return (
    <div className={'community-panel-container'} style={STYLE.wrap}>
      {!!IS_SHOW_USER_COVER && renderUserCover({ userInfo, unboxingEnabled })}

      <WrapLayout>
        <SplitLayout {...splitLayoutProps} />
      </WrapLayout>
    </div>
  );
};

export default renderDesktop;
