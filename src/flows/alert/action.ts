import * as ALERT_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

interface IOpenAlertParam {
  icon?: string;
  iconText?: string;
  isShowIconTextt?: boolean;
  title: string;
  content: string;
  type: string;
}

/**
 * Open alert
 * combine data with id params - generate by unix time
 *
 * @param {IOpenAlertParam} data
 */
export type OpenAlertActionParams = IOpenAlertParam;
export const openAlertAction = (data: IOpenAlertParam) => (dispatch, getState) => {
  const { mobileappWebviewStatus } = getState().app;
  if (!!mobileappWebviewStatus) return;

  return dispatch({
    type: ALERT_ACTION_TYPE.OPEN_ALERT,
    payload: Object.assign({}, data, { id: new Date().getTime() }),
    group: REDUCER_GROUP.ALERT
  });
};

/**  Close Alert */
export const closeAlertAction = (alertId) => ({
  type: ALERT_ACTION_TYPE.CLOSE_ALERT,
  payload: alertId,
  group: REDUCER_GROUP.ALERT
});

export const openMobileSigninAlertAction = () => (dispatch, getState) => {
  const { mobileappWebviewStatus } = getState().app;
  if (!!mobileappWebviewStatus) return;

  return dispatch({
    type: ALERT_ACTION_TYPE.OPEN_MOBILE_SIGNIN_ALERT,
    payload: '',
    group: REDUCER_GROUP.ALERT
  });
};

/**  Close Modal */
export const clolseMobileSigninAlertAction = () => ({
  type: ALERT_ACTION_TYPE.CLOSE_MOBILE_SIGNIN_ALERT,
  payload: '',
  group: REDUCER_GROUP.ALERT
});
