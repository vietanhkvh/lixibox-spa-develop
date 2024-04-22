import { ROUTING_PRODUCT_DETAIL } from '../../routings/path';

// Environments where GA tracking is enabled
export const trackableEnvironments = ['production', 'staging-fe'];

// Differs GA pageview tracking for the following routes until impression and non-interactive event data is ready
// NOTE: Routes listed below must dispatch their own `pageview` hit
export const deferredPageviewRoutes = [ROUTING_PRODUCT_DETAIL];

export const GO_TRACKING_POINT = {
  SEARCH_PRODUCT_ITEM_INDIRECT: 'GO_SEARCH_PRODUCT_ITEM_INDIRECT',
  SEARCH_PRODUCT_ITEM_ADD_TO_CART: 'GO_SEARCH_PRODUCT_ITEM_ADD_TO_CART'
};

export const GO_TRACKING_STRORAGE_KEY = {};
