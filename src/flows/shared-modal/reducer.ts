import { REDUCER_GROUP } from '../reducer.group';
import { SharedModalState } from './types';
import * as MODAL_ACTION_TYPE from './type';

export const INITIAL_STATE_SHARED_MODAL: SharedModalState = {
  byId: {},
  stack: []
};

function modalReducer(
  state = INITIAL_STATE_SHARED_MODAL,
  action = {
    type: '',
    payload: {
      id: null,
      isVisible: false,
      isStacked: false,
      surviveSingleRouteChange: false,
      reason: null,
      data: {}
    },
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.SHARED_MODAL) {
    return state;
  }

  switch (action.type) {
    case MODAL_ACTION_TYPE.OPEN_SHARED_MODAL: {
      const newById = {};
      const prevIds = Object.keys(state.byId);
      let idsToStack = [];

      if (action.payload.isStacked) {
        idsToStack = prevIds.filter((id) => state.byId[id] && state.byId[id].isVisible);
      }

      prevIds.forEach((id) => {
        newById[id] = Object.assign({}, state.byId[id], { isVisible: false });
      });

      return Object.assign({}, state, {
        byId: Object.assign({}, newById, {
          [action.payload.id]: {
            isVisible: true,
            data: action.payload.data,
            isStacked: !!action.payload.isStacked,
            surviveSingleRouteChange: action.payload.surviveSingleRouteChange
          }
        }),
        stack: state.stack.concat(idsToStack)
      });
    }

    case MODAL_ACTION_TYPE.UPDATE_SHARED_MODAL: {
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, {
          [action.payload.id]: Object.assign({}, state.byId[action.payload.id], {
            isVisible:
              typeof action.payload.isVisible === 'undefined'
                ? state.byId[action.payload.id]?.isVisible
                : action.payload.isVisible,
            data: Object.assign({}, state.byId[action.payload.id]?.data, action.payload.data)
          })
        })
      });
    }

    case MODAL_ACTION_TYPE.CLOSE_SHARED_MODAL: {
      const newById = {};
      const prevIds = Object.keys(state.byId);
      const newStack = [...state.stack];
      const modalIdToPop = newStack.pop();

      prevIds.forEach((id) => {
        const shouldShow = id === modalIdToPop;
        if (shouldShow) {
          newById[id] = Object.assign({}, state.byId[id], {
            isVisible: shouldShow,
            data: Object.assign({}, state.byId[id]?.data, action.payload.data, { isVisible: false })
          });
        } else {
          newById[id] = Object.assign({}, state.byId[id], { isVisible: false, data: {} });
        }
      });

      return Object.assign({}, state, {
        byId: Object.assign({}, newById),
        stack: newStack
      });
    }

    case MODAL_ACTION_TYPE.CLOSE_ALL_SHARED_MODAL: {
      const newById = {};
      const prevIds = Object.keys(state.byId);

      prevIds.forEach((id) => {
        const thisModal = state.byId[id];
        newById[id] = Object.assign(
          {},
          thisModal,
          thisModal?.surviveSingleRouteChange && action.payload.reason === 'routeChanged'
            ? { isVisible: thisModal.isVisible, surviveSingleRouteChange: false }
            : { isVisible: false, data: {} }
        );
      });

      return Object.assign({}, state, {
        byId: Object.assign({}, newById),
        stack: []
      });
    }

    default:
      return state;
  }
}

export default modalReducer;
