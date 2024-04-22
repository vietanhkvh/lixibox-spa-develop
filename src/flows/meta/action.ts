import * as META_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const updateMetaInfoAction = (data) => ({
  type: META_ACTION_TYPE.UPDATE_META_INFO,
  payload: data,
  group: REDUCER_GROUP.META
});
