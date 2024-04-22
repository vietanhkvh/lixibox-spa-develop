import { SearchSourceType } from 'constants/application/search.type';
import * as SEARCH_API_PATH from '../../api/search';
import * as SEARCH_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/** Search all */
export const searchAllAction =
  ({
    keyword,
    searchSource = '',
    brands = '',
    bids = '',
    pl = '',
    ph = '',
    sort = '',
    stockStatus = '',
    page = 1,
    perPage = 24
  }) =>
  (dispatch) => {
    return dispatch({
      type: SEARCH_ACTION_TYPE.SEARCH_ALL,
      payload: {
        promise: SEARCH_API_PATH.searchAll({
          keyword,
          searchSource,
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
      meta: { params: { keyword, page, perPage }, searchSource },
      group: REDUCER_GROUP.SEARCH
    });
  };

interface SearchProductActionParams {
  keyword: string;
  limit?: number;
}
/** Search suggestion */
export const searchSuggestionAction =
  ({ keyword, limit = 10 }: SearchProductActionParams) =>
  (dispatch) => {
    return dispatch({
      type: SEARCH_ACTION_TYPE.SEARCH_SUGGESTION,
      payload: {
        promise: SEARCH_API_PATH.searchSuggestion(keyword, limit).then((res) => res)
      },
      meta: { params: { keyword, limit } },
      group: REDUCER_GROUP.SEARCH
    });
  };

type MagazineSearchSuggestionActionParams = SEARCH_API_PATH.MagazineSearchSuggestionApiParams;
/** Magazine search suggestion */
export const magazineSearchSuggestionAction =
  ({ keyword, page = 1, perPage = 5 }: MagazineSearchSuggestionActionParams) =>
  (dispatch) => {
    return dispatch({
      type: SEARCH_ACTION_TYPE.MAGAZINE_SEARCH_SUGGESTION,
      payload: {
        promise: SEARCH_API_PATH.magazineSearchSuggestionApi({ keyword, page, perPage }).then((res) => res)
      },
      meta: { params: { keyword, page, perPage } },
      group: REDUCER_GROUP.SEARCH
    });
  };

/**  Filter Search suggestion select value */
export const filterSearchSuggestionSelectAction = (dataSelect: any) => ({
  type: SEARCH_ACTION_TYPE.SEARCH_SUGGESTION_SELECT,
  payload: dataSelect,
  group: REDUCER_GROUP.SEARCH
});

/**
 * Clear seach data after change routing
 */

export const clearDataSearchAction = () => ({
  type: SEARCH_ACTION_TYPE.CLEAR_DATA_SEARCH,
  payload: {},
  group: REDUCER_GROUP.SEARCH
});

export type GetTrendingKeywordsActionParams = SEARCH_API_PATH.GetPopularSearchApiParams;
/**
 * Search popular
 */
export const getTrendingKeywordsAction =
  ({ limit = 5 }: GetTrendingKeywordsActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: SEARCH_ACTION_TYPE.GET_POPULAR_SEARCH,
      payload: {
        promise: SEARCH_API_PATH.getPopularSearch({ limit }).then((res) => res)
      },
      meta: { limit },
      group: REDUCER_GROUP.SEARCH
    });

export type GetHistorySearchActionParams = SEARCH_API_PATH.GetHistorySearchApiParams;
/**
 * Search history
 */
export const getSearchHistoryAction =
  ({ limit = 5 }: GetHistorySearchActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: SEARCH_ACTION_TYPE.GET_HISTORY_SEARCH,
      payload: {
        promise: SEARCH_API_PATH.getHistorySearch({ limit }).then((res) => res)
      },
      meta: { limit },
      group: REDUCER_GROUP.SEARCH
    });

/**
 * Toggle submit search
 */
export const toggleSubmitSearchAction = () => ({
  type: SEARCH_ACTION_TYPE.TOGGLE_SUBMIT_SEARCH,
  payload: {},
  group: REDUCER_GROUP.SEARCH
});

export interface SetLastSearchSourceActionParams {
  source: SearchSourceType;
}
export const setLastSearchSourceAction = ({ source }: SetLastSearchSourceActionParams) => ({
  type: SEARCH_ACTION_TYPE.SET_LAST_SEARCH_SOURCE,
  payload: {},
  group: REDUCER_GROUP.SEARCH,
  meta: { source }
});

export const getSearchBarSectionsAction = () => (dispatch, getState) =>
  dispatch({
    type: SEARCH_ACTION_TYPE.GET_SEARCH_BAR_SECTIONS,
    payload: {
      promise: SEARCH_API_PATH.getSearchBarSectionsApi().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.SEARCH
  });
