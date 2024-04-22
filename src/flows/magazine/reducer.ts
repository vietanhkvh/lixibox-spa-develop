import { REDUCER_GROUP } from '../reducer.group';
import * as MAGAZINE_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';
import { MAGAZINE_LIST_TYPE } from '../../constants/application/magazine';

import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_MAGAZINE = {
  magazineList: {},
  magazineBySlug: {},
  magazineTagName: {},
  magazineKeyword: {},
  magazineCategory: {},
  magazineDashboard: {},
  magazineRelatedBox: {},
  magazineRelatedBlog: {},

  magazineCateTypes: {},

  magazineHomePaging: {},

  videoList: [],
  videoPaging: {},
  magazineSearchPaging: {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  },

  isLoading: false,
  isFetchMagazineListSuccess: false,
  isFetchMagazineBySlugSuccess: false,
  isMagazineDetailNotFound: false,
  isMagazineCategoryNotFound: false,
  isFetchMagazineDashboardSuccess: false,
  isFetchMagazineRelatedBlogSuccess: false
};

const magazineReducer = (
  state = INITIAL_STATE_MAGAZINE,
  action = {
    type: '',
    payload: {
      magazine: {},
      magazines: [],
      paging: { current_page: 0, per_page: 0, total_pages: 0 },
      categories: []
    },
    meta: { type: '', page: 1 },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) => {
  const {
    videoList,
    magazineList,
    magazineBySlug,
    magazineKeyword,
    magazineTagName,
    magazineCategory,
    magazineRelatedBox,
    magazineRelatedBlog
  } = state;

  if (action.group !== REDUCER_GROUP.MAGAZINE) {
    return state;
  }

  const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';
  let newMagazineItem, newMagazineList, tmpVideoList;

  switch (action.type) {
    /** Fetch magazine list */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_LIST):
      newMagazineItem = { [generationHash]: [] };
      newMagazineList = Object.assign({}, magazineList, newMagazineItem);

      tmpVideoList = MAGAZINE_LIST_TYPE.VIDEO === action.meta.type && action.meta.page === 1 ? [] : videoList;

      return Object.assign({}, state, {
        videoList: tmpVideoList,
        magazineList: newMagazineList,
        isFetchMagazineListSuccess: false
      });

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_LIST):
      newMagazineItem = { [generationHash]: action.payload.magazines };
      newMagazineList = Object.assign({}, magazineList, newMagazineItem);

      tmpVideoList = videoList;
      const video = MAGAZINE_LIST_TYPE.VIDEO === action.meta.type ? action.payload.magazines : [];
      const videoPaging = MAGAZINE_LIST_TYPE.VIDEO === action.meta.type ? action.payload.paging : {};

      return Object.assign({}, state, {
        videoPaging,
        magazineList: newMagazineList,
        magazineHomePaging: action.payload.paging,
        isFetchMagazineListSuccess: true,
        videoList: [...tmpVideoList, ...video]
      });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_LIST):
      newMagazineItem = { [generationHash]: [] };
      newMagazineList = Object.assign({}, magazineList, newMagazineItem);

      return Object.assign({}, state, {
        magazineList: newMagazineList,
        isFetchMagazineListSuccess: false
      });

    // CLEAR_DATA_MAGAZINE_LIST
    case MAGAZINE_ACTION_TYPE.CLEAR_DATA_MAGAZINE_LIST:
      return Object.assign({}, state, {
        magazineList: {}
      });
    // END CLEAR_DATA_MAGAZINE_LIST

    /** Fetch magazine list */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_DASHBOARD):
      return Object.assign({}, state, {
        isFetchMagazineDashboardSuccess: false
      });

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_DASHBOARD):
      return Object.assign({}, state, {
        magazineDashboard: action.payload,
        magazineCateTypes: action.payload?.categories,
        isFetchMagazineDashboardSuccess: true
      });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_DASHBOARD):
      return Object.assign({}, state, {
        isFetchMagazineDashboardSuccess: false
      });

    /** Fetch magazine category */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_CATEGORY):
      return Object.assign({}, state, { isMagazineCategoryNotFound: false });

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_CATEGORY):
      const item = { [generationHash]: action.payload };
      const newMagazineCategory = Object.assign({}, magazineCategory, item);

      return Object.assign({}, state, {
        magazineCategory: newMagazineCategory,
        magazineHomePaging: action.payload.paging,
        isMagazineCategoryNotFound: false
      });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_CATEGORY):
      return Object.assign({}, state, { isMagazineCategoryNotFound: true });

    /** Fetch magazine by slug (id) */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_SLUG):
      return Object.assign({}, state, {
        isFetchMagazineBySlugSuccess: false,
        isMagazineDetailNotFound: false
      });

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_SLUG):
      const magazineBySlugItem = { [generationHash]: action.payload };
      const newMagazineBySlug = Object.assign({}, magazineBySlug, magazineBySlugItem);

      return Object.assign({}, state, {
        magazineBySlug: newMagazineBySlug,
        isFetchMagazineBySlugSuccess: true,
        isMagazineDetailNotFound: false
      });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_SLUG):
      return Object.assign({}, state, {
        isFetchMagazineBySlugSuccess: false,
        isMagazineDetailNotFound: true
      });

    /** Fetch magazine related boxes by slug (id) */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BOXES):
      return state;

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BOXES):
      const magazineRelatedBoxItem = { [generationHash]: action.payload };
      const newMagazineRelatedBox = Object.assign({}, magazineRelatedBox, magazineRelatedBoxItem);

      return Object.assign({}, state, {
        magazineRelatedBox: newMagazineRelatedBox
      });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BOXES):
      return state;

    /** Fetch magazine related blogs by slug (id) */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BLOGS):
      return Object.assign({}, state, {
        isFetchMagazineRelatedBlogSuccess: false
      });

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BLOGS):
      const magazineRelatedBlogItem = {
        [generationHash]: action.payload.magazines
      };
      const newMagazineRelatedBlog = Object.assign({}, magazineRelatedBlog, magazineRelatedBlogItem);

      return Object.assign({}, state, {
        magazineRelatedBlog: newMagazineRelatedBlog,
        isFetchMagazineRelatedBlogSuccess: true
      });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_RELATED_BLOGS):
      return Object.assign({}, state, {
        isFetchMagazineRelatedBlogSuccess: false
      });

    /** Fetch magazine by tag name */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_TAG):
      return state;

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_TAG):
      const magazineTagNameItem = { [generationHash]: action.payload };
      const newMagazineTagName = Object.assign({}, magazineTagName, magazineTagNameItem);

      return Object.assign({}, state, { magazineTagName: newMagazineTagName });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_TAG):
      return state;

    /** Fetch magazine by keyword */
    case PENDING_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_KEYWORD):
      return Object.assign({}, state, { isLoading: true });

    case FULFILLED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_KEYWORD):
      const magazineKeywordItem = { [generationHash]: action.payload.magazines };
      const newMagazineKeyword = Object.assign({}, magazineKeyword, magazineKeywordItem);

      return Object.assign({}, state, {
        magazineKeyword: newMagazineKeyword,
        isLoading: false,
        magazineSearchPaging: action.payload?.paging
      });

    case REJECTED_TYPE(MAGAZINE_ACTION_TYPE.FETCH_MAGAZINE_BY_KEYWORD):
      return Object.assign({}, state, {
        isLoading: false,
        magazineSearchPaging: {}
      });

    case MAGAZINE_ACTION_TYPE.CLEAR_DATA_MAGAZINE:
      return Object.assign({}, state, {
        magazineBySlug: {},
        magazineTagName: {},
        magazineKeyword: {},
        magazineCategory: {},
        magazineDashboard: {},
        magazineRelatedBox: {},
        magazineRelatedBlog: {},
        videoList: [],
        videoPaging: {}
      });

    default:
      return state;
  }
};

export default magazineReducer;
