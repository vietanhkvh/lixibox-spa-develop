import * as BANNER_API_PATH from '../../api/banner';
import * as BANNER_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 *  Fetch Banner list Action with bannerID and limit value
 *
 * @param {string} idBanner
 * @param {number} limit defalut with
 */
export interface FetchBannerActionParams {
  idBanner: string;
  limit: number;
}
export const fetchBannerAction =
  ({ idBanner, limit }: FetchBannerActionParams) =>
  (dispatch, getState) =>
    dispatch({
      type: BANNER_ACTION_TYPE.FETCH_BANNER,
      payload: {
        promise: BANNER_API_PATH.fetchBanner({ idBanner, limit }).then((res) => res)
      },
      meta: { metaFilter: { idBanner, limit } },
      group: REDUCER_GROUP.BANNER
    });

/** Fecth list all themes */
export const fetchThemeAction = () => (dispatch, getState) =>
  dispatch({
    type: BANNER_ACTION_TYPE.FETCH_THEME,
    payload: { promise: BANNER_API_PATH.fetchTheme().then((res) => res) },
    group: REDUCER_GROUP.BANNER
  });

/**
 *  Clear data banner
 */
export const clearDataBannerAction = () => (dispatch, getState) =>
  dispatch({
    type: BANNER_ACTION_TYPE.CLEAR_DATA_BANNER,
    payload: '',
    group: REDUCER_GROUP.BANNER
  });
