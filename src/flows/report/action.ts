import * as REPORT_API_PATH from '../../api/report';
import * as RECOMMENDATION_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const getReportsFeaturesAction =
  ({ code }: { code: string }) =>
  (dispatch, getState) =>
    dispatch({
      type: RECOMMENDATION_ACTION_TYPE.GET_REPORTS_FEATURES,
      payload: {
        promise: REPORT_API_PATH.getReportsFeatures({ code }).then((res) => res)
      },
      group: REDUCER_GROUP.REPORT
    });

export const feedbackReportsFeaturesAction =
  ({
    code,
    inputIds,
    outputIds,
    removedIds
  }: {
    code: string;
    inputIds: string;
    outputIds: string;
    removedIds: string;
  }) =>
  (dispatch, getState) =>
    dispatch({
      type: RECOMMENDATION_ACTION_TYPE.FEEDBACK_REPORTS_FEATURES,
      payload: {
        promise: REPORT_API_PATH.feedbackReportsFeatures({ code, inputIds, outputIds, removedIds }).then((res) => res)
      },
      group: REDUCER_GROUP.REPORT
    });
