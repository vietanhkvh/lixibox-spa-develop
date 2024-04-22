import { REDUCER_GROUP } from '../reducer.group';
import * as BANNER_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';
import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../constants/application/default';
import { isEmptyObject, isUndefined } from '../../utils/validate';
import { BannerState } from './types';

export const INITIAL_STATE_BANNER: BannerState = {
  bannerList: {},
  banner: {
    lastId: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  theme: { list: [] }
};

function bannerReducer(
  state = INITIAL_STATE_BANNER,
  action = {
    type: '',
    payload: { banners: {} },
    meta: { metaFilter: {} as any },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.BANNER) {
    return state;
  }

  const { bannerList } = state;
  let bannerHash, newBannerItem, newBannerList;

  switch (action.type) {
    /** Fetch banner */
    case PENDING_TYPE(BANNER_ACTION_TYPE.FETCH_BANNER):
      bannerHash = objectToHash(action.meta.metaFilter);
      newBannerItem = { [bannerHash]: [] };
      newBannerList = Object.assign({}, bannerList, newBannerItem);

      return Object.assign({}, state, {
        bannerList: newBannerList,
        banner: Object.assign({}, state.banner, {
          lastId: action.meta.metaFilter?.idBanner,
          fetching: true
        })
      });

    case FULFILLED_TYPE(BANNER_ACTION_TYPE.FETCH_BANNER):
      bannerHash = objectToHash(action.meta.metaFilter);
      newBannerItem = { [bannerHash]: action.payload.banners };
      newBannerList = Object.assign({}, bannerList, newBannerItem);

      return Object.assign({}, state, {
        bannerList: newBannerList,
        banner: Object.assign({}, state.banner, {
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(BANNER_ACTION_TYPE.FETCH_BANNER):
      return Object.assign({}, state, {
        banner: Object.assign({}, state.banner, {
          fetching: false,
          errored: true
        })
      });

    /** Fetch list theme */
    case FULFILLED_TYPE(BANNER_ACTION_TYPE.FETCH_THEME):
      return Object.assign({}, state, {
        theme: {
          list: action.payload
        }
      });

    /** Clear data banner */
    case BANNER_ACTION_TYPE.CLEAR_DATA_BANNER:
      // Keep header top banner
      const bannerHeaderTopKeyHash = objectToHash({
        idBanner: BANNER_ID.HEADER_TOP,
        limit: BANNER_LIMIT_DEFAULT
      });
      const tmpBannerList = Object.assign(
        {},
        !isEmptyObject(bannerList) && !isUndefined(bannerList[bannerHeaderTopKeyHash])
          ? { [bannerHeaderTopKeyHash]: bannerList[bannerHeaderTopKeyHash] }
          : {}
      );
      return Object.assign({}, state, { bannerList: tmpBannerList });

    default:
      return state;
  }
}

export default bannerReducer;
