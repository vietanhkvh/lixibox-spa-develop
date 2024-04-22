import * as MAINTENANCE_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const setMaintenanceMode =
  ({ info }) =>
  (dispatch, getState) =>
    dispatch({
      type: MAINTENANCE_ACTION_TYPE.SET_MAINTENANCE_MODE,
      payload: info || {},
      meta: {},
      group: REDUCER_GROUP.MAINTENANCE
    });

export const clearMaintenanceMode = () => (dispatch, getState) =>
  dispatch({
    type: MAINTENANCE_ACTION_TYPE.CLEAR_MAINTENANCE_MODE,
    payload: {},
    meta: {},
    group: REDUCER_GROUP.MAINTENANCE
  });
