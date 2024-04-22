import { REDUCER_GROUP } from '../reducer.group';
import * as REFERRAL_ACTION_TYPE from './type';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { objectToHash } from '../../utils/encode';
import { isUndefined } from '../../utils/validate';
import { ReferralState } from './types';
import { dispatchApiError } from 'utils/exception';

export const INITIAL_STATE_REFERRAL: ReferralState = {
  availableSchemes: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  expiredSchemes: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  schemeDetail: {
    byQuery: {},
    fetching: false,
    loaded: false,
    errored: false
  },
  validatedSchemeDetail: {
    byQuery: {},
    fetching: false,
    loaded: false,
    errored: false
  },
  schemesShareLink: {
    link: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  schemeShareLink: {
    byQuery: {},
    fetching: false,
    loaded: false,
    errored: false
  },
  statisticsAndHistory: {
    summary: null,
    byQuery: {},
    pages: [],
    lastPaging: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  refereeSchemes: {
    byQuery: {},
    pages: [],
    lastPaging: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  refereeScheme: {
    byQuery: {},
    fetching: false,
    loaded: false,
    errored: false
  },
  applyReferralCode: {
    referrer: null,
    applying: false,
    applied: false,
    errored: false
  }
};

function referralReducer(
  state = INITIAL_STATE_REFERRAL,
  action = {
    type: '',
    payload: {
      schemes: [],
      scheme: {},
      referrer: null,
      reward_histories: [],
      summary: null,
      sharing_link: null,
      paging: {
        current_page: 1,
        per_page: 25,
        total_pages: 1
      }
    },
    meta: {} as any,
    group: '',
    asyncDispatch: (data: any) => {}
  }
) {
  if (action.group !== REDUCER_GROUP.REFERRAL) {
    return state;
  }

  try {
    const generationHash = !isUndefined(action.meta) ? objectToHash(action.meta) : '';

    switch (action.type) {
      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES): {
        const schemeType = `${action.meta.status}Schemes`;

        return Object.assign({}, state, {
          [schemeType]: Object.assign({}, state[schemeType], {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES): {
        const schemeType = `${action.meta.status}Schemes`;
        const pages: Array<number> = state[schemeType].pages.concat(action.payload.paging.current_page);
        const uniquePages = Array.from(new Set(pages));

        return Object.assign({}, state, {
          [schemeType]: Object.assign({}, state[schemeType], {
            byQuery: Object.assign({}, state[schemeType].byQuery, {
              [generationHash]: action.payload.schemes
            }),
            pages: uniquePages,
            lastPaging: action.payload.paging,
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES): {
        const schemeType = `${action.meta.status}Schemes`;

        return Object.assign({}, state, {
          [schemeType]: Object.assign({}, state[schemeType], {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_DETAIL): {
        return Object.assign({}, state, {
          schemeDetail: Object.assign({}, state.schemeDetail, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_DETAIL): {
        return Object.assign({}, state, {
          schemeDetail: Object.assign({}, state.schemeDetail, {
            byQuery: Object.assign({}, state.schemeDetail.byQuery, {
              [action.meta.id]: action.payload.scheme
            }),
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_DETAIL): {
        return Object.assign({}, state, {
          schemeDetail: Object.assign({}, state.schemeDetail, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_VALIDATED_DETAIL): {
        return Object.assign({}, state, {
          validatedSchemeDetail: Object.assign({}, state.validatedSchemeDetail, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_VALIDATED_DETAIL): {
        return Object.assign({}, state, {
          validatedSchemeDetail: Object.assign({}, state.validatedSchemeDetail, {
            byQuery: Object.assign({}, state.validatedSchemeDetail.byQuery, {
              [generationHash]: action.payload.scheme
            }),
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_VALIDATED_DETAIL): {
        return Object.assign({}, state, {
          validatedSchemeDetail: Object.assign({}, state.validatedSchemeDetail, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES_SHARE_LINK): {
        return Object.assign({}, state, {
          schemesShareLink: Object.assign({}, state.schemesShareLink, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES_SHARE_LINK): {
        return Object.assign({}, state, {
          schemesShareLink: Object.assign({}, state.schemesShareLink, {
            link: action.payload.sharing_link,
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEMES_SHARE_LINK): {
        return Object.assign({}, state, {
          schemesShareLink: Object.assign({}, state.schemesShareLink, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_SHARE_LINK): {
        return Object.assign({}, state, {
          schemeShareLink: Object.assign({}, state.schemeShareLink, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_SHARE_LINK): {
        return Object.assign({}, state, {
          schemeShareLink: Object.assign({}, state.schemeShareLink, {
            byQuery: Object.assign({}, state.schemeShareLink.byQuery, {
              [action.meta.id]: action.payload.sharing_link
            }),
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_SCHEME_SHARE_LINK): {
        return Object.assign({}, state, {
          schemeShareLink: Object.assign({}, state.schemeShareLink, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_STATISTICS_AND_HISTORY): {
        return Object.assign({}, state, {
          statisticsAndHistory: Object.assign({}, state.statisticsAndHistory, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_STATISTICS_AND_HISTORY): {
        const pages: Array<number> = state.statisticsAndHistory.pages.concat(action.payload.paging.current_page);
        const uniquePages = Array.from(new Set(pages));

        return Object.assign({}, state, {
          statisticsAndHistory: Object.assign({}, state.statisticsAndHistory, {
            summary: action.payload.summary,
            byQuery: Object.assign({}, state.statisticsAndHistory.byQuery, {
              [generationHash]: action.payload.reward_histories
            }),
            pages: uniquePages,
            lastPaging: action.payload.paging,
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFERRAL_STATISTICS_AND_HISTORY): {
        return Object.assign({}, state, {
          statisticsAndHistory: Object.assign({}, state.statisticsAndHistory, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEMES_BY_CODE): {
        return Object.assign({}, state, {
          refereeSchemes: Object.assign({}, state.refereeSchemes, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEMES_BY_CODE): {
        const pages: Array<number> = state.refereeSchemes.pages.concat(action.payload.paging.current_page);
        const uniquePages = Array.from(new Set(pages));

        return Object.assign({}, state, {
          refereeSchemes: Object.assign({}, state.refereeSchemes, {
            summary: action.payload.summary,
            byQuery: Object.assign({}, state.refereeSchemes.byQuery, {
              [generationHash]: action.payload
            }),
            pages: uniquePages,
            lastPaging: action.payload.paging,
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEMES_BY_CODE): {
        return Object.assign({}, state, {
          refereeSchemes: Object.assign({}, state.refereeSchemes, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEME_BY_CODE): {
        return Object.assign({}, state, {
          refereeScheme: Object.assign({}, state.refereeScheme, {
            fetching: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEME_BY_CODE): {
        return Object.assign({}, state, {
          refereeScheme: Object.assign({}, state.refereeScheme, {
            byQuery: Object.assign({}, state.refereeScheme.byQuery, {
              [generationHash]: action.payload
            }),
            fetching: false,
            loaded: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.FETCH_REFEREE_SCHEME_BY_CODE): {
        return Object.assign({}, state, {
          refereeScheme: Object.assign({}, state.refereeScheme, {
            fetching: false,
            errored: true
          })
        });
      }

      case PENDING_TYPE(REFERRAL_ACTION_TYPE.APPLY_REFERRAL_CODE): {
        return Object.assign({}, state, {
          applyReferralCode: Object.assign({}, state.applyReferralCode, {
            applying: true
          })
        });
      }

      case FULFILLED_TYPE(REFERRAL_ACTION_TYPE.APPLY_REFERRAL_CODE): {
        return Object.assign({}, state, {
          applyReferralCode: Object.assign({}, state.applyReferralCode, {
            referrer: action.payload.referrer,
            applying: false,
            applied: true,
            errored: false
          })
        });
      }

      case REJECTED_TYPE(REFERRAL_ACTION_TYPE.APPLY_REFERRAL_CODE): {
        action.meta.preventDefaultErrorMessage || dispatchApiError({ action });

        return Object.assign({}, state, {
          applyReferralCode: Object.assign({}, state.applyReferralCode, {
            applying: false,
            errored: true
          })
        });
      }

      default:
        return state;
    }
  } catch (e) {
    return state;
  }
}

export default referralReducer;
