import { Route, Switch } from 'react-router-dom';

import InfoAboutContainer from '../../container/app-shop/info/about';
import * as ROUTINGS from '../path';

export const AppShopInfoSwitchRouting = () => {
  const INFO_ROUTING_LIST = [
    ROUTINGS.ROUTING_INFO_TERM,
    ROUTINGS.ROUTING_INFO_PRIVACY,
    ROUTINGS.ROUTING_INFO_PRIVACY_EN,
    ROUTINGS.ROUTING_INFO_ABOUT_US,
    ROUTINGS.ROUTING_INFO_MAKEOVER,
    // ROUTINGS.ROUTING_INFO_GUARANTEE,
    ROUTINGS.ROUTING_INFO_BUY_ON_APP,
    ROUTINGS.ROUTING_INFO_MASK_BAR,
    ROUTINGS.ROUTING_INFO_SKIN_TEST,
    ROUTINGS.ROUTING_INFO_RECOMMEND,
    ROUTINGS.ROUTING_INFO_BUY_ON_WEB,
    ROUTINGS.ROUTING_INFO_RECEIVE_TIME,
    ROUTINGS.ROUTING_INFO_SHIPPING_FEE,
    ROUTINGS.ROUTING_INFO_GIVE_GIFT_CARD,
    ROUTINGS.ROUTING_INFO_RECEIVE_AND_REDEEM,
    ROUTINGS.ROUTING_INFO_DELIVERY_AND_PAYMENT,
    ROUTINGS.ROUTING_INFO_QUESTION_RECEIVE_GIFT,
    ROUTINGS.ROUTING_INFO_QUESTION_GIFT_CARD_2019,
    ROUTINGS.ROUTING_INFO_QUESTION_INVITE_FRIENDS_GET_REWARDS,
    ROUTINGS.ROUTING_INFO_HALIO_DISTRIBUTOR
  ];

  return (
    <Switch>
      {Array.isArray(INFO_ROUTING_LIST) &&
        INFO_ROUTING_LIST.map((route) => (
          <Route
            key={`infor-item-${route}`}
            exact
            path={route}
            render={(routeProps) => <InfoAboutContainer {...routeProps} />}
          />
        ))}
    </Switch>
  );
};
