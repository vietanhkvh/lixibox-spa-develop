import { REDUCER_GROUP } from '../reducer.group';
import * as FAQ_ACTION_TYPE from './type';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_FAQ = {
  topicList: [],
  isFetchTopicList: false,

  articlesList: [],
  isFetchArticlesList: false,

  articlesDetail: {},
  isFetchArticlesDetail: false
};

const faqReducer = (
  state = INITIAL_STATE_FAQ,
  action = {
    type: '',
    payload: {
      topics: [],
      articles: [],
      article: {}
    },
    meta: {
      userReferralCode: ''
    },
    asyncDispatch: (data: any) => {},
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.FAQ) {
    return state;
  }

  switch (action.type) {
    /** FETCH_FAQ_TOPIC_LIST */
    case PENDING_TYPE(FAQ_ACTION_TYPE.FETCH_FAQ_TOPIC_LIST):
      return Object.assign({}, state, {
        topicList: [],
        isFetchTopicList: true
      });

    case FULFILLED_TYPE(FAQ_ACTION_TYPE.FETCH_FAQ_TOPIC_LIST):
      return Object.assign({}, state, {
        topicList: action.payload.topics,
        isFetchTopicList: false
      });

    case REJECTED_TYPE(FAQ_ACTION_TYPE.FETCH_FAQ_TOPIC_LIST):
      return Object.assign({}, state, {
        topicList: [],
        isFetchTopicList: true
      });
    /** FETCH_FAQ_TOPIC_LIST */

    /** FETCH_FAQ_ARTICLE_LIST */
    case PENDING_TYPE(FAQ_ACTION_TYPE.FETCH_FAQ_ARTICLE_LIST):
      return Object.assign({}, state, {
        articlesList: [],
        isFetchArticlesList: true
      });

    case FULFILLED_TYPE(FAQ_ACTION_TYPE.FETCH_FAQ_ARTICLE_LIST):
      return Object.assign({}, state, {
        articlesList: action.payload.articles,
        isFetchArticlesList: false
      });

    case REJECTED_TYPE(FAQ_ACTION_TYPE.FETCH_FAQ_ARTICLE_LIST):
      return Object.assign({}, state, {
        articlesList: [],
        isFetchArticlesList: false
      });
    /** FETCH_FAQ_ARTICLE_LIST */

    /** GET_FAQ_ARTICLE_DETAIL */
    case PENDING_TYPE(FAQ_ACTION_TYPE.GET_FAQ_ARTICLE_DETAIL):
      return Object.assign({}, state, {
        articlesDetail: {},
        isFetchArticlesDetail: true
      });

    case FULFILLED_TYPE(FAQ_ACTION_TYPE.GET_FAQ_ARTICLE_DETAIL):
      return Object.assign({}, state, {
        articlesDetail: action.payload.article,
        isFetchArticlesDetail: false
      });

    case REJECTED_TYPE(FAQ_ACTION_TYPE.GET_FAQ_ARTICLE_DETAIL):
      return Object.assign({}, state, {
        articlesDetail: {},
        isFetchArticlesDetail: false
      });
    /** GET_FAQ_ARTICLE_DETAIL */

    default:
      return state;
  }
};

export default faqReducer;
