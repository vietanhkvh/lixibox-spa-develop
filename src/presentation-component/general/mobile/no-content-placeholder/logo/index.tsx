import { lazy } from 'react';

export default Object.freeze({
  BASKET: lazy(() => import('./basket')),
  BELL: lazy(() => import('./bell')),
  COUPONS: lazy(() => import('./coupons')),
  MAINTENANCE: lazy(() => import('./maintenance')),
  MAKEUP: lazy(() => import('./makeup')),
  MISC: lazy(() => import('./misc')),
  ROBOT: lazy(() => import('./robot')),
  SEARCH_EMPTY: lazy(() => import('./search-empty')),
  SHIPMENT: lazy(() => import('./shipment')),
  SIGNAL: lazy(() => import('./signal'))
});
