import * as MENU_API_PATH from '../../api/menu';
import * as MENU_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/** Get Main menu - Browsers node */
export const fetchListMenuAction = () => (dispatch, getState) =>
  dispatch({
    type: MENU_ACTION_TYPE.FETCH_LIST_MENU,
    payload: { promise: MENU_API_PATH.fetchListMenu().then((res) => res) },
    group: REDUCER_GROUP.MENU
  });

/** Get Mobile homepage menu - Browsers node */
export const fetchMobileHomeMenuAction = () => (dispatch, getState) =>
  dispatch({
    type: MENU_ACTION_TYPE.FETCH_MOBILE_HOME_MENU,
    payload: { promise: MENU_API_PATH.fetchMobileHomeMenu().then((res) => res) },
    group: REDUCER_GROUP.MENU
  });

/** BACKGROUND ACTION: UPDATE SELECT MENU TREE */
export const updateMenuSelectedAction = (idCategory) => ({
  type: MENU_ACTION_TYPE.UPDATE_MENU_SELECTED,
  payload: { idCategory },
  group: REDUCER_GROUP.MENU
});
/** BACKGROUND ACTION: REMOVE SELECT MENU TREE STATUS*/
export const removeMenuSelectedAction = () => ({
  type: MENU_ACTION_TYPE.REMOVE_ACTIVE_MENU_STATUS,
  payload: {},
  group: REDUCER_GROUP.MENU
});
/**
 * Show / Hide Info menu with state params
 *
 * @param {boolean} state
 */
export const showHideInfoMenuAction = (state = false) => ({
  type: MENU_ACTION_TYPE.DISPLAY_INFO_MENU,
  payload: state,
  group: REDUCER_GROUP.MENU
});

/**
 * Show / Hide specail deal menu with state params
 *
 * @param {boolean} state
 */
export const showHideSpecialDealMenuAction = (state = false) => ({
  type: MENU_ACTION_TYPE.DISPLAY_SPECIAL_DEAL_MENU,
  payload: state,
  group: REDUCER_GROUP.MENU
});

/**
 * Show / Hide menu of magazine page with state params
 *
 * @param {boolean} state
 */
export const showHideMobileMagazineMenuAction = (state = false) => ({
  type: MENU_ACTION_TYPE.DISPLAY_MOBILE_MAGAZINE_MENU,
  payload: state,
  group: REDUCER_GROUP.MENU
});
