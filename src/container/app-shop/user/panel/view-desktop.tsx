import classNames from 'classnames';

import { AppShopUserSwitchRouting } from '../../../../routings/router';
import {
  ROUTING_USER_INVITE_HISTORY,
  ROUTING_USER_TRANSACTIONS_BALANCE,
  ROUTING_USER_TRANSACTIONS_LIXICOIN
} from '../../../../routings/path';
import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';
import MainBlock from '../../../layout/main-block';
import UserSidePanel from '../side-panel';
import STYLE from './style';
import styles from './style.module.scss';

const NO_GLOBAL_STYLE_ROUTES = [
  ROUTING_USER_INVITE_HISTORY,
  ROUTING_USER_TRANSACTIONS_LIXICOIN,
  ROUTING_USER_TRANSACTIONS_BALANCE
];

const renderMainContainer = ({ location, shouldApplyGlobalStyle }) => {
  const routeLink = location.pathname;
  const listNavigation: any = [];

  const routeNameList = listNavigation.filter((item) => {
    if (!!item.isDisplay) {
      return routeLink === item.link;
    }

    return routeLink.indexOf(item.link) >= 0;
  });

  const routeName = (Array.isArray(routeNameList) && routeNameList.length > 0 && routeNameList[0].title) || '';
  const mainBlockProps = {
    title: routeName,
    showHeader: routeName !== '',
    showViewMore: false,
    content: <AppShopUserSwitchRouting />,
    style: {}
  };

  return (
    <div style={Object.assign({}, shouldApplyGlobalStyle && STYLE.desktopMainContent)}>
      <MainBlock {...mainBlockProps} />
    </div>
  );
};

interface ViewProps {
  location: any;
}
const View = ({ location }: ViewProps) => {
  const shouldApplyGlobalStyle = !NO_GLOBAL_STYLE_ROUTES.includes(location.pathname);
  const splitLayoutProps = {
    subContainer: <UserSidePanel />,
    size: 'larger',
    mainContainerClassName: classNames(styles.mainContainer, shouldApplyGlobalStyle && styles.mainContainerColor),
    mainContainer: renderMainContainer({ location, shouldApplyGlobalStyle })
  };

  return (
    <div style={STYLE.desktopWrapOuter}>
      <WrapLayout>
        <SplitLayout {...splitLayoutProps} />
      </WrapLayout>
    </div>
  );
};

export default View;
