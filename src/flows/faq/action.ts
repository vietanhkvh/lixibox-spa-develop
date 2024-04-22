import * as FAQ_API_PATH from '../../api/faq';
import * as FAQ_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Fetch faq topic list
 *
 */
export const fetchFaqTopicListAction = () => (dispatch, getState) =>
  dispatch({
    type: FAQ_ACTION_TYPE.FETCH_FAQ_TOPIC_LIST,
    payload: {
      promise: FAQ_API_PATH.fetchFaqTopicList().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.FAQ
  });

/**
 * Fetch Faq articles list
 *
 */
export const fetchFaqArticlesList =
  ({ topicSlug }) =>
  (dispatch, getState) =>
    dispatch({
      type: FAQ_ACTION_TYPE.FETCH_FAQ_ARTICLE_LIST,
      payload: {
        promise: FAQ_API_PATH.fetchFaqArticlesList({ topicSlug }).then((res) => res)
      },
      meta: { topicSlug },
      group: REDUCER_GROUP.FAQ
    });

/**
 * Get Article Detail
 *
 */
export const getArticleDetail =
  ({ articleSlug }) =>
  (dispatch, getState) =>
    dispatch({
      type: FAQ_ACTION_TYPE.GET_FAQ_ARTICLE_DETAIL,
      payload: {
        promise: FAQ_API_PATH.getArticleDetail({ articleSlug }).then((res) => res)
      },
      meta: {},
      group: REDUCER_GROUP.FAQ
    });
