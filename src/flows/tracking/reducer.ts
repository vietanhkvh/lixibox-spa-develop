import { REDUCER_GROUP } from '../reducer.group';
import * as TRACKING_ACTION_TYPE from './type';

import { FULFILLED_TYPE, PENDING_TYPE, REJECTED_TYPE } from '../action.config';
import { stringToHash } from '../../utils/encode';

export const INITIAL_STATE_TRACKING = {
  utmId: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmExpiredTime: 0,
  trackingCode: '',
  productTracking: [],
  expertTrackingList: {},
  viewGroupTrackingList: {},
  isTrackingViewBoxSuccess: false,
  trackingUtmsLoading: false
};

function trackingReducer(
  state = INITIAL_STATE_TRACKING,
  action = {
    type: '',
    payload: {
      utm_id: '',
      utmId: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      slug: {},
      trackingCode: {},
      tracking_code: '',
      tracking_group: {}
    },
    meta: {
      code: '',
      groupObjectId: ''
    },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.TRACKING) {
    return state;
  }

  const { productTracking, expertTrackingList, viewGroupTrackingList } = state;

  switch (action.type) {
    case FULFILLED_TYPE(TRACKING_ACTION_TYPE.FETCH_EXPERTS_TRACKING_GROUP):
      const expertTrackingHash = stringToHash(action.meta.code);
      const expertTrackingItem = {
        [expertTrackingHash]: action.payload.tracking_group
      };
      const _expertTrackingList = Object.assign({}, expertTrackingList, expertTrackingItem);

      return Object.assign({}, state, {
        expertTrackingList: _expertTrackingList
      });

    case TRACKING_ACTION_TYPE.CLEAR_DATA_EXPERTS_TRACKING_GROUP:
      return Object.assign({}, state, { expertTrackingList: {} });

    case TRACKING_ACTION_TYPE.SAVE_PRODUCT_TRACKING:
      const list = productTracking.filter((item: any) => item.slug !== action.payload.slug);
      return Object.assign({}, state, {
        productTracking: [...list, action.payload]
      });

    case FULFILLED_TYPE(TRACKING_ACTION_TYPE.TRACKING_VIEW_GROUP):
      const keyHash = stringToHash(action.meta.groupObjectId);
      const item = {
        [keyHash]: Object.assign({}, action.meta, {
          trackingCode: action.payload.tracking_code
        })
      };
      const newViewGroupTrackingList = Object.assign({}, item, viewGroupTrackingList);

      return Object.assign({}, state, {
        viewGroupTrackingList: newViewGroupTrackingList
      });

    //

    case PENDING_TYPE(TRACKING_ACTION_TYPE.TRACKING_VIEW_BOX):
      return Object.assign({}, state, { isTrackingViewBoxSuccess: false });

    case FULFILLED_TYPE(TRACKING_ACTION_TYPE.TRACKING_VIEW_BOX):
      return Object.assign({}, state, {
        isTrackingViewBoxSuccess: true,
        trackingCode: action.payload.tracking_code
      });

    case REJECTED_TYPE(TRACKING_ACTION_TYPE.TRACKING_VIEW_BOX):
      return Object.assign({}, state, { isTrackingViewBoxSuccess: false });

    //

    case FULFILLED_TYPE(TRACKING_ACTION_TYPE.GET_UTM_ID_FROM_AFFILIATE): {
      const utmId = action.payload.utm_id.toString();

      const date = new Date();
      date.setDate(date.getDate() + 30); // Expire is 30 days

      return Object.assign(
        {},
        state,
        utmId && utmId !== state.utmId && { utmExpiredTime: date.getTime() },
        utmId && { utmId }
      );
    }

    //

    case TRACKING_ACTION_TYPE.SAVE_UTM_ID_TRACKING:
      const date = new Date();
      date.setDate(date.getDate() + 30); // Expire is 30 days

      return Object.assign(
        {},
        state,
        action.payload.utmId && action.payload.utmId !== state.utmId && { utmExpiredTime: date.getTime() },
        action.payload.utmId && { utmId: action.payload.utmId },
        action.payload.utmSource && { utmSource: action.payload.utmSource },
        action.payload.utmMedium && { utmMedium: action.payload.utmMedium },
        action.payload.utmCampaign && { utmCampaign: action.payload.utmCampaign }
      );

    case TRACKING_ACTION_TYPE.REMOVE_UTM_ID_TRACKING:
      return Object.assign({}, state, { utmId: '', utmExpiredTime: 0 });

    //

    case PENDING_TYPE(TRACKING_ACTION_TYPE.TRACKING_UTMS):
      return Object.assign({}, state, {
        trackingUtmsLoading: true
      });

    case FULFILLED_TYPE(TRACKING_ACTION_TYPE.TRACKING_UTMS):
      return Object.assign({}, state, {
        trackingUtmsLoading: false
      });

    case REJECTED_TYPE(TRACKING_ACTION_TYPE.TRACKING_UTMS):
      return Object.assign({}, state, {
        trackingUtmsLoading: false
      });
    //

    default:
      return state;
  }
}

export default trackingReducer;
