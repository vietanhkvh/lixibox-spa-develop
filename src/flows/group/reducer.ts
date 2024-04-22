import { REDUCER_GROUP } from '../reducer.group';
import * as GROUP_ACTION_TYPE from './type';

import { objectToHash } from '../../utils/encode';
import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../action.config';

export const INITIAL_STATE_GROUP = {
  groups: {},
  isFetchGroupsByIdSuccess: false
};

function groupReducer(
  state = INITIAL_STATE_GROUP,
  action = {
    type: '',
    payload: null,
    meta: { id: '' },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.GROUP) {
    return state;
  }

  const { groups } = state;

  switch (action.type) {
    case PENDING_TYPE(GROUP_ACTION_TYPE.FETCH_GROUPS_BY_ID):
      return Object.assign({}, state, { isFetchGroupsByIdSuccess: false });

    case FULFILLED_TYPE(GROUP_ACTION_TYPE.FETCH_GROUPS_BY_ID):
      const keyHash = objectToHash(action.meta);
      const tmpList = { [keyHash]: action.payload };
      const tmpGroups = Object.assign({}, groups, tmpList);

      return Object.assign({}, state, {
        isFetchGroupsByIdSuccess: true,
        groups: tmpGroups
      });

    case REJECTED_TYPE(GROUP_ACTION_TYPE.FETCH_GROUPS_BY_ID):
      return Object.assign({}, state, { isFetchGroupsByIdSuccess: false });

    default:
      return state;
  }
}

export default groupReducer;
