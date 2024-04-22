import { IMobileNavigationProps, IMobileNavigationState } from './model';

import {
  ROUTING_PROMOTION,
  ROUTING_SHOP_INDEX,
  ROUTING_USER,
  ROUTING_MAGAZINE,
  ROUTING_COMMUNITY_PATH
} from '../../../routings/path';

export const DEFAULT_PROPS = {
  isTranspanentMode: false,
  withDownloadAppBar: false
} as IMobileNavigationProps;

export const INITIAL_STATE = {
  openSearch: false,
  isShowDropdown: false,
  backListDisplayDropDown: [
    ROUTING_SHOP_INDEX,
    ROUTING_PROMOTION,
    ROUTING_COMMUNITY_PATH,
    ROUTING_MAGAZINE,
    ROUTING_USER
  ]
} as IMobileNavigationState;
