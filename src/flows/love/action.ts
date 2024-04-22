import * as LOVE_API_PATH from '../../api/love';
import * as LOVE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch love list by filter params
 *
 * @param {'asc' | 'desc'} sort
 * @param {number} page ex: 1, 2, 3, 4
 * @param {number} perPage ex: 10, 15, 20
 */
export const fetchLoveListAction =
  ({ sort, page, perPage }) =>
  (dispatch, getState) =>
    dispatch({
      type: LOVE_ACTION_TYPE.FETCH_LOVE_LIST,
      payload: {
        promise: LOVE_API_PATH.fetchLoveList({ sort, page, perPage }).then((res) => res)
      },
      meta: { page, perPage },
      group: REDUCER_GROUP.LOVE
    });

/**
 * Get love detail by id
 *
 * @param {number} id
 */
export const getLoveDetailAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: LOVE_ACTION_TYPE.GET_LOVE_DETAIL,
      payload: { promise: LOVE_API_PATH.getLoveDetail({ id }).then((res) => res) },
      meta: { id },
      group: REDUCER_GROUP.LOVE
    });

/**
 * Add love by share_url
 *
 * @param {string} share_url
 */
export const addLoveAction =
  ({ sharedUrl }) =>
  (dispatch, getState) =>
    dispatch({
      type: LOVE_ACTION_TYPE.ADD_LOVE,
      payload: { promise: LOVE_API_PATH.addLove({ sharedUrl }).then((res) => res) },
      group: REDUCER_GROUP.LOVE
    });

/**
 * Get love box by id
 *
 * @param {number} id
 */
export const getLoveBoxByIdAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: LOVE_ACTION_TYPE.GET_LOVE_BOX,
      payload: { promise: LOVE_API_PATH.getLoveBoxById({ id }).then((res) => res) },
      meta: { id },
      group: REDUCER_GROUP.LOVE
    });
