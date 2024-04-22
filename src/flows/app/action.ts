import * as APP_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const updateUrlParamsAction = (data) => ({
  type: APP_ACTION_TYPE.UPDATE_URL_PARAMS,
  payload: data,
  group: REDUCER_GROUP.APP
});

export const updatePrivateMode = (data) => ({
  type: APP_ACTION_TYPE.UPDATE_PRIVATE_MODE,
  payload: data,
  group: REDUCER_GROUP.APP
});

export const updateABTestingModeAction = (data) => ({
  type: APP_ACTION_TYPE.UPDATE_AB_TESTING_MODE,
  payload: data,
  group: REDUCER_GROUP.APP
});
