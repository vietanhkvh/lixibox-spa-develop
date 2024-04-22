import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { signInWithTokenAction } from 'flows/auth/action';
import { useAppAccessTokenAuthentication } from 'utils/hook';
import AppShopContainer from '../../container/app/shop';
import NotFoundContainer from '../../container/exception/404';
import * as ROUTINGS from '../path';

const Component = ({ signInWithTokenAction }) => {
  useAppAccessTokenAuthentication(signInWithTokenAction);

  return (
    <Switch>
      <Route path={ROUTINGS.ROUTING_SHOP_INDEX} component={AppShopContainer} />
      <Route path={'*'} render={(routeProps) => <NotFoundContainer {...routeProps} />} />
    </Switch>
  );
};

const AppRootSwitchRouting = connect(null, { signInWithTokenAction })(Component);

export { AppRootSwitchRouting };
