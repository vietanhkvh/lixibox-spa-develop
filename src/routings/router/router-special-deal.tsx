import { Route, Switch } from 'react-router-dom';

import SpecialDealsDetailContainer from '../../container/app-shop/special-deals/detail';

export const AppShopSepcialSwitchRouting = () => (
  <Switch>
    <Route path={'/'} render={(routeProps) => <SpecialDealsDetailContainer {...routeProps} />} />
  </Switch>
);
