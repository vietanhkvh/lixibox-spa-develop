import { REDUCER_GROUP } from '../reducer.group';
import * as ACTION from './type';
import IState from './model';

// TODO: Change export name to `INITIAL_STATE_ERROR`
export const INITIAL_STATE_ERROR: IState = {
  index: []
};

function cartReducer(state = INITIAL_STATE_ERROR, action) {
  if (action.group !== REDUCER_GROUP.ERROR) return state;

  switch (action.type) {
    case ACTION.PUSH_ERROR:
      return Object.assign({}, state, { index: [action.payload, ...state.index] });
    case ACTION.POP_ERROR:
      const poppable = state.index.length && state.index[0].type === action.payload.type;
      return poppable ? Object.assign({}, state, { index: state.index.slice(1) }) : state;
    case ACTION.CLEAR_ERRORS:
      return Object.assign({}, state, { index: [] });
    default:
      return state;
  }
}

export default cartReducer;
