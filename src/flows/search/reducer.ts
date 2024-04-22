import { REDUCER_GROUP } from '../reducer.group';
import * as SEARCH_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { SearchSource } from 'constants/application/search';
import { FILTER_SUGGESTION_LIST } from '../../constants/application/global';
import { FULFILLED_TYPE, PENDING_TYPE, REJECTED_TYPE } from '../action.config';
import { SearchState } from './reducer.type';

export const INITIAL_STATE_SEARCH: SearchState = {
  searchSuggestion: {
    byQuery: {},
    lastQuery: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  magazineSearchSuggestion: {
    byQuery: {},
    lastQuery: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  searchBarSections: {
    promotionMessages: [],
    personalizedMessages: [],
    topBrands: [],
    topCategories: [],
    fetching: false,
    loaded: false,
    errored: false
  },
  dataSearchAll: {},
  isSearchAllSuccess: false,
  isFetchingSearchAll: false,
  filterSuggestionSelected: FILTER_SUGGESTION_LIST[0],
  trendingSearch: {
    keywords: [],
    fetching: false,
    loaded: false,
    errored: false
  },
  searchHistory: {
    keywords: [],
    fetching: false,
    loaded: false,
    errored: false
  },

  toggleSubmitSearch: false,
  searchPaging: {},
  lastSearchSource: SearchSource.NONE
};

function searchReducer(
  state = INITIAL_STATE_SEARCH,
  action = {
    type: '',
    payload: {
      suggestions: [],
      boxes: [],
      version: '',
      keywords: [],
      paging: {},
      promotion_messages: [],
      personalized_messages: [],
      top_brands: [],
      top_categories: []
    },
    meta: { params: { keyword: '', limit: 0 }, searchSource: '', source: SearchSource.NONE },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.SEARCH) {
    return state;
  }

  const { dataSearchAll, toggleSubmitSearch } = state;

  switch (action.type) {
    /** SEARCH_ALL */
    case PENDING_TYPE(SEARCH_ACTION_TYPE.SEARCH_ALL):
      return Object.assign({}, state, {
        isSearchAllSuccess: false,
        isFetchingSearchAll: true
      });

    case FULFILLED_TYPE(SEARCH_ACTION_TYPE.SEARCH_ALL):
      // FIXME: Fix object mutation
      // Ref.: https://redux.js.org/faq/immutable-data#accidental-object-mutation
      dataSearchAll[objectToHash(action.meta.params)] = action.payload;

      return Object.assign({}, state, {
        dataSearchAll,
        isSearchAllSuccess: true,
        searchPaging: action.payload.paging,
        isFetchingSearchAll: false
      });

    case REJECTED_TYPE(SEARCH_ACTION_TYPE.SEARCH_ALL):
      return Object.assign({}, state, {
        isSearchAllSuccess: false,
        isFetchingSearchAll: false
      });

    /** SEARCH_SUGGESTION */
    case PENDING_TYPE(SEARCH_ACTION_TYPE.SEARCH_SUGGESTION):
      return Object.assign({}, state, {
        searchSuggestion: Object.assign({}, state.searchSuggestion, {
          lastQuery: objectToHash(action.meta.params),
          loading: true,
          loaded: false,
          errored: false
        })
      });

    case FULFILLED_TYPE(SEARCH_ACTION_TYPE.SEARCH_SUGGESTION):
      return Object.assign({}, state, {
        searchSuggestion: Object.assign({}, state.searchSuggestion, {
          byQuery: Object.assign({}, state.searchSuggestion.byQuery, {
            [state.searchSuggestion.lastQuery]: {
              suggestions: action.payload.suggestions || [],
              boxes: action.payload.boxes || [],
              version: action.payload.version || ''
            }
          }),
          loading: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(SEARCH_ACTION_TYPE.SEARCH_SUGGESTION):
      return Object.assign({}, state, {
        searchSuggestion: Object.assign({}, state.searchSuggestion, {
          loading: false,
          loaded: false,
          errored: true
        })
      });

    /** SEARCH_SUGGESTION */
    case PENDING_TYPE(SEARCH_ACTION_TYPE.MAGAZINE_SEARCH_SUGGESTION):
      return Object.assign({}, state, {
        magazineSearchSuggestion: Object.assign({}, state.magazineSearchSuggestion, {
          lastQuery: objectToHash(action.meta.params),
          loading: true,
          loaded: false,
          errored: false
        })
      });

    case FULFILLED_TYPE(SEARCH_ACTION_TYPE.MAGAZINE_SEARCH_SUGGESTION):
      return Object.assign({}, state, {
        magazineSearchSuggestion: Object.assign({}, state.magazineSearchSuggestion, {
          byQuery: Object.assign({}, state.magazineSearchSuggestion.byQuery, {
            [state.magazineSearchSuggestion.lastQuery]: action.payload
          }),
          loading: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(SEARCH_ACTION_TYPE.MAGAZINE_SEARCH_SUGGESTION):
      return Object.assign({}, state, {
        magazineSearchSuggestion: Object.assign({}, state.magazineSearchSuggestion, {
          loading: false,
          loaded: false,
          errored: true
        })
      });

    /** SEARCH_SUGGESTION_SELECT */
    case SEARCH_ACTION_TYPE.SEARCH_SUGGESTION_SELECT:
      return Object.assign({}, state, {
        filterSuggestionSelected: action.payload
      });

    /** CLEAR SEARCH DATA */
    case SEARCH_ACTION_TYPE.CLEAR_DATA_SEARCH:
      return Object.assign({}, state, {
        dataSearchAll: {}
      });

    case PENDING_TYPE(SEARCH_ACTION_TYPE.GET_POPULAR_SEARCH):
      return Object.assign({}, state, {
        trendingSearch: Object.assign({}, state.trendingSearch, {
          fetching: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(SEARCH_ACTION_TYPE.GET_POPULAR_SEARCH):
      return Object.assign({}, state, {
        trendingSearch: Object.assign({}, state.trendingSearch, {
          keywords: action.payload.keywords || [],
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(SEARCH_ACTION_TYPE.GET_POPULAR_SEARCH):
      return Object.assign({}, state, {
        trendingSearch: Object.assign({}, state.trendingSearch, {
          fetching: false,
          errored: true
        })
      });

    case PENDING_TYPE(SEARCH_ACTION_TYPE.GET_HISTORY_SEARCH):
      return Object.assign({}, state, {
        searchHistory: Object.assign({}, state.searchHistory, {
          fetching: true,
          errored: false
        })
      });

    /** HISTORY SEARCH */
    case FULFILLED_TYPE(SEARCH_ACTION_TYPE.GET_HISTORY_SEARCH):
      return Object.assign({}, state, {
        searchHistory: Object.assign({}, state.searchHistory, {
          keywords: action.payload.keywords || [],
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(SEARCH_ACTION_TYPE.GET_HISTORY_SEARCH):
      return Object.assign({}, state, {
        searchHistory: Object.assign({}, state.searchHistory, {
          fetching: false,
          errored: true
        })
      });

    case PENDING_TYPE(SEARCH_ACTION_TYPE.GET_SEARCH_BAR_SECTIONS):
      return Object.assign({}, state, {
        searchBarSections: Object.assign({}, state.searchBarSections, {
          fetching: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(SEARCH_ACTION_TYPE.GET_SEARCH_BAR_SECTIONS):
      return Object.assign({}, state, {
        searchBarSections: Object.assign({}, state.searchBarSections, {
          promotionMessages: action.payload.promotion_messages || [],
          personalizedMessages: action.payload.personalized_messages || [],
          topBrands: action.payload.top_brands || [],
          topCategories: action.payload.top_categories || [],
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(SEARCH_ACTION_TYPE.GET_SEARCH_BAR_SECTIONS):
      return Object.assign({}, state, {
        searchBarSections: Object.assign({}, state.searchBarSections, {
          fetching: false,
          errored: true
        })
      });

    /** TOGGLE SUBMIT SEARCH */
    case SEARCH_ACTION_TYPE.TOGGLE_SUBMIT_SEARCH:
      return Object.assign({}, state, {
        toggleSubmitSearch: !toggleSubmitSearch
      });

    /** Set search source */
    case SEARCH_ACTION_TYPE.SET_LAST_SEARCH_SOURCE:
      return Object.assign({}, state, {
        lastSearchSource: action.meta.source
      });

    default:
      return state;
  }
}

export default searchReducer;
