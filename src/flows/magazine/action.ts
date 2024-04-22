import * as MAGAZINE_API_PATH from '../../api/magazine';
import * as MAGAZINE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch love list by filter paramsx
 *
 * @param {number} page ex: 1, 2, 3, 4
 * @param {number} perPage ex: 10, 15, 20
 * @param {'default' | 'video-post' | 'quote-post'} type
 */
export const fetchMagazineListAction =
  ({ page, perPage, type }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_LIST,
      payload: {
        promise: MAGAZINE_API_PATH.fetchMagazineList({
          page,
          perPage,
          type
        }).then((res) => res)
      },
      meta: { page, perPage, type },
      group: REDUCER_GROUP.MAGAZINE
    });

export const fetchMagazineDashboardAction = () => (dispatch, getState) =>
  dispatch({
    type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_DASHBOARD,
    payload: {
      promise: MAGAZINE_API_PATH.fetchMagazineDashboard().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.MAGAZINE
  });

/**
 * Fetch magazine category by slug (id)
 *
 * @param {string} slug ex: makeup
 * @param {number} page ex: 1, 2, 3, 4
 * @param {number} perPage ex: 10, 15, 20
 */
export const fetchMagazineCategoryAction =
  ({ slug, page = 1, perPage = 12 }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_CATEGORY,
      payload: {
        promise: MAGAZINE_API_PATH.fetchMagazineCategory({
          slug,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { slug, page, perPage },
      group: REDUCER_GROUP.MAGAZINE
    });

/**
 * Fetch magazine by slug (id)
 *
 * @param {string} slug ex: makeup
 */
export const fetchMagazineBySlugAction =
  ({ slug }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_SLUG,
      payload: {
        promise: MAGAZINE_API_PATH.fetchMagazineBySlug({ slug }).then((res) => res)
      },
      meta: { slug },
      group: REDUCER_GROUP.MAGAZINE
    });

/**
 * Fetch magazine related blogs by slug (id)
 *
 * @param {string} slug ex: makeup
 */
export const fetchMagazineRelatedBlogAction =
  ({ slug }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BLOGS,
      payload: {
        promise: MAGAZINE_API_PATH.fetchMagazineRelatedBlog({ slug }).then((res) => res)
      },
      meta: { slug },
      group: REDUCER_GROUP.MAGAZINE
    });

/**
 * Fetch magazine related boxes by slug (id)
 *
 * @param {string} slug ex: makeup
 * @param {number} limit ex: 1, 2, 3, 4
 */
export const fetchMagazineRelatedBoxAction =
  ({ slug, limit = 6 }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BOXES,
      payload: {
        promise: MAGAZINE_API_PATH.fetchMagazineRelatedBox({ slug, limit }).then((res) => res)
      },
      meta: { slug },
      group: REDUCER_GROUP.MAGAZINE
    });

/**
 * Fetch magazine by tag name
 *
 * @param {string} tagName ex: halio
 * @param {number} page ex: 1, 2, 3, 4
 * @param {number} perPage ex: 10, 15, 20
 */
export const fetchMagazineByTagNameAction =
  ({ slug, page = 1, perPage = 12 }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_TAG,
      payload: {
        promise: MAGAZINE_API_PATH.fetchMagazineByTagName({
          slug,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { slug, page, perPage },
      group: REDUCER_GROUP.MAGAZINE
    });

/**
 * Fetch magazine by keyword
 *
 * @param {string} keyword ex: halio
 * @param {number} page ex: 1, 2, 3, 4
 * @param {number} perPage ex: 10, 15, 20
 */
export const fetchMagazineByKeywordAction =
  ({ keyword, searchSource = '', page = 1, perPage = 12 }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_KEYWORD,
      payload: {
        promise: MAGAZINE_API_PATH.fetchMagazineByKeyword({
          keyword,
          searchSource,
          page,
          perPage
        }).then((res) => res)
      },
      meta: { keyword, page, perPage },
      group: REDUCER_GROUP.MAGAZINE
    });

/** Clear data magazine list */
export const clearDataMagazineListAction = () => (dispatch, getState) =>
  dispatch({
    type: MAGAZINE_ACTION_TYPE.CLEAR_DATA_MAGAZINE_LIST,
    payload: {},
    group: REDUCER_GROUP.MAGAZINE
  });

/** Clear magazine data after leave page */
export const clearDataMagazineAction = () => (dispatch, getState) =>
  dispatch({
    type: MAGAZINE_ACTION_TYPE.CLEAR_DATA_MAGAZINE,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.MAGAZINE
  });
