import * as THEME_API_PATH from '../../api/theme';
import * as THEME_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/** Fecth list all themes */
export const fetchThemeAction = () => (dispatch, getState) =>
  dispatch({
    type: THEME_ACTION_TYPE.FETCH_THEME,
    payload: { promise: THEME_API_PATH.fetchTheme().then((res) => res) },
    group: REDUCER_GROUP.THEME
  });

/** Fecth list all promotions */
export const fetchPromotionsAction = () => (dispatch, getState) =>
  dispatch({
    type: THEME_ACTION_TYPE.FETCH_PROMOTIONS,
    payload: { promise: THEME_API_PATH.fetchPromotions().then((res) => res) },
    group: REDUCER_GROUP.THEME
  });

/** Fecth list all product by theme id */
export const fetchProductByThemeIdAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: THEME_ACTION_TYPE.FETCH_PRODUCT_BY_THEME_ID,
      payload: {
        promise: THEME_API_PATH.fetchProductByThemeId({
          id
        }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.THEME
    });

export type FetchGwpSchemeExclusiveBoxesActionParams = THEME_API_PATH.FetchGwpSchemeExclusiveBoxesApiParams;
export const fetchGwpSchemeExclusiveBoxesAction =
  ({ schemeSlug, page = 1, perPage = 15 }: FetchGwpSchemeExclusiveBoxesActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: THEME_ACTION_TYPE.FETCH_GWP_SCHEME_EXCLUSIVE_BOXES,
      payload: {
        promise: THEME_API_PATH.fetchGwpSchemeExclusiveBoxesApi({
          schemeSlug,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { schemeSlug, page, perPage },
      group: REDUCER_GROUP.THEME
    });

/** Fetch theme boxes */
export type FetchThemeBoxesActionParams = THEME_API_PATH.FetchThemeBoxesApiParams;
export const fetchThemeBoxesAction =
  ({
    id,
    brands = '',
    bids = '',
    pl = '',
    ph = '',
    sort = '',
    stockStatus,
    page = 1,
    perPage = 20
  }: FetchThemeBoxesActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: THEME_ACTION_TYPE.FETCH_THEME_BOXES,
      payload: {
        promise: THEME_API_PATH.fetchThemeBoxes({
          id,
          brands,
          bids,
          pl,
          ph,
          sort,
          stockStatus,
          page,
          perPage
        }).then((res) => res)
      },
      meta: {
        id,
        page,
        perPage,
        hashKeys: {
          id,
          brands,
          bids,
          pl,
          ph,
          sort,
          stockStatus,
          page,
          perPage
        }
      },
      group: REDUCER_GROUP.THEME
    });

/** Fetch theme section */
export const fetchThemeSectionAction =
  ({ id, sectionId }) =>
  (dispatch, getState) =>
    dispatch({
      type: THEME_ACTION_TYPE.FETCH_THEME_SECTION,
      payload: {
        promise: THEME_API_PATH.fetchThemeSection({
          id,
          sectionId
        }).then((res) => res)
      },
      meta: { id, sectionId },
      group: REDUCER_GROUP.THEME
    });

/** Fecth list all product by theme id */
export const clearDataProductByThemeIdAction = () => (dispatch, getState) =>
  dispatch({
    type: THEME_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_THEME_ID,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.THEME
  });
