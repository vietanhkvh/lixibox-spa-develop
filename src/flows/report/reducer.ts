import { REDUCER_GROUP } from '../reducer.group';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

import * as REPORT_ACTION_TYPE from './type';
import { ReportState } from './types';

export const INITIAL_STATE_REPORT: ReportState = {
  featureInfo: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    code: '',
    title: '',
    description: ''
  }
};

function recommendationReducer(
  state = INITIAL_STATE_REPORT,
  action = {
    type: '',
    payload: { feature: {} },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) {
  if (action.group !== REDUCER_GROUP.REPORT) return state;

  try {
    switch (action.type) {
      case PENDING_TYPE(REPORT_ACTION_TYPE.GET_REPORTS_FEATURES):
        return Object.assign({}, state, {
          featureInfo: {
            id: 0,
            createdAt: '',
            updatedAt: '',
            code: '',
            title: '',
            description: ''
          }
        });

      case FULFILLED_TYPE(REPORT_ACTION_TYPE.GET_REPORTS_FEATURES):
        const feature = action.payload.feature as any;
        return Object.assign({}, state, {
          featureInfo: {
            id: feature.id,
            createdAt: feature.created_at,
            updatedAt: feature.updated_at,
            code: feature.code,
            title: feature.title,
            description: feature.description
          }
        });

      case REJECTED_TYPE(REPORT_ACTION_TYPE.GET_REPORTS_FEATURES):
        return Object.assign({}, state, {
          featureInfo: {
            id: 0,
            createdAt: '',
            updatedAt: '',
            code: '',
            title: '',
            description: ''
          }
        });

      default:
        return state;
    }
  } catch (e) {
    return state;
  }
}

export default recommendationReducer;
