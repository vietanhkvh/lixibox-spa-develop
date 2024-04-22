import { REDUCER_GROUP } from '../reducer.group';
import * as MENU_ACTION_TYPE from './type';

import { updateMenuSelect, getCategorySlideList, refreshListMenu } from '../../utils/menu';
import { FULFILLED_TYPE } from '../action.config';

export const INITIAL_STATE_MENU = {
  categorySlideList: [],
  isShowInfoMenu: false,
  isShowMobileMenu: false,
  menuSelected: { id: '' },
  mobileHomeMenu: [],
  isShowSpecialDealMenu: false,
  listMenu: { browse_nodes: [] },
  isShowMobileMagazineMenu: false
};

function menuReducer(
  state = INITIAL_STATE_MENU,
  action = {
    type: '',
    payload: { browse_nodes: {}, idCategory: '', shortcuts: [] },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.MENU) {
    return state;
  }

  switch (action.type) {
    case MENU_ACTION_TYPE.DISPLAY_MOBILE_MENU:
      if (!!action.payload) {
        document.getElementsByTagName('html')?.[0]?.setAttribute('style', 'overflow-y:hidden');
      } else {
        document.getElementsByTagName('html')?.[0]?.setAttribute('style', '');
      }
      return Object.assign({}, state, { isShowMobileMenu: action.payload });

    case FULFILLED_TYPE(MENU_ACTION_TYPE.FETCH_LIST_MENU):
      const menu = state;
      const { browse_nodes } = action.payload;

      return Object.assign({}, state, {
        categorySlideList: getCategorySlideList(browse_nodes),
        listMenu: updateMenuSelect({ browse_nodes }, (menu && menu.menuSelected && menu.menuSelected.id) || '')
      });

    case FULFILLED_TYPE(MENU_ACTION_TYPE.FETCH_MOBILE_HOME_MENU):
      return Object.assign({}, state, {
        mobileHomeMenu: action.payload.shortcuts
      });

    case MENU_ACTION_TYPE.UPDATE_MENU_SELECTED:
      /** Get old state of list menu */
      const { listMenu } = state;

      return Object.assign({}, state, {
        menuSelected: { id: action.payload.idCategory },
        listMenu: updateMenuSelect(listMenu, action.payload.idCategory)
      });

    case MENU_ACTION_TYPE.DISPLAY_MOBILE_MAGAZINE_MENU:
      return Object.assign({}, state, {
        isShowMobileMagazineMenu: action.payload
      });

    case MENU_ACTION_TYPE.DISPLAY_INFO_MENU:
      return Object.assign({}, state, { isShowInfoMenu: action.payload });

    case MENU_ACTION_TYPE.DISPLAY_SPECIAL_DEAL_MENU:
      return Object.assign({}, state, {
        isShowSpecialDealMenu: action.payload
      });
    case MENU_ACTION_TYPE.REMOVE_ACTIVE_MENU_STATUS:
      /** current state list menu */
      const freshListMenu = state.listMenu && refreshListMenu(state.listMenu);
      return Object.assign({}, state, {
        listMenu: freshListMenu
      });
    default:
      return state;
  }
}

export default menuReducer;
