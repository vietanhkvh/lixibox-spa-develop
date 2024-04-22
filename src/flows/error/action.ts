import * as ACTION from './type';
import { Error } from './model';
import { REDUCER_GROUP } from '../reducer.group';

/**
 * Global error store
 */

export const pushErrorAction = (payload: Error) => ({ type: ACTION.PUSH_ERROR, payload, group: REDUCER_GROUP.ERROR });
export const popErrorAction = (type: string) => ({
  type: ACTION.POP_ERROR,
  payload: { type },
  group: REDUCER_GROUP.ERROR
});
export const clearErrorsAction = () => ({ type: ACTION.CLEAR_ERRORS, group: REDUCER_GROUP.ERROR });
