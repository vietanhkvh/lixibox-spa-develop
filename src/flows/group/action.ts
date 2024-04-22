import * as GROUP_API_PATH from '../../api/group';
import * as GROUP_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const fetchGroupsByIdAction =
  ({ id }) =>
  (dispatch, getState) =>
    dispatch({
      type: GROUP_ACTION_TYPE.FETCH_GROUPS_BY_ID,
      payload: {
        promise: GROUP_API_PATH.fetchGroupsById({ id }).then((res) => res)
      },
      meta: { id },
      group: REDUCER_GROUP.GROUP
    });
