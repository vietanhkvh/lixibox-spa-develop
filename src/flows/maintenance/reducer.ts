import * as MAINTENANCE_ACTION_TYPE from './type';
import { storageKey } from '../../constants/application/client-storage';
import { REDUCER_GROUP } from '../reducer.group';
import { MaintenanceState } from './types';

export const INITIAL_STATE_MAINTENANCE: MaintenanceState = {
  isMaintenance: false,
  maintenanceInfo: {}
};

const maintenanceReducer = (
  state = INITIAL_STATE_MAINTENANCE,
  action = {
    type: '',
    payload: {},
    group: ''
  }
) => {
  if (action.group !== REDUCER_GROUP.MAINTENANCE) {
    return state;
  }

  switch (action.type) {
    case MAINTENANCE_ACTION_TYPE.SET_MAINTENANCE_MODE:
      // TODO: Remove localStorage usage. Use Redux state only (Reason: Redux state is now persisted on the available
      // local storage)
      localStorage.setItem(storageKey.IS_MAINTENANCE, 'true');
      return Object.assign({}, state, {
        isMaintenance: true,
        maintenanceInfo: action.payload
      });
    case MAINTENANCE_ACTION_TYPE.CLEAR_MAINTENANCE_MODE:
      localStorage.removeItem(storageKey.IS_MAINTENANCE);
      return Object.assign({}, state, {
        isMaintenance: false,
        maintenanceInfo: {}
      });
    default:
      return state;
  }
};

export default maintenanceReducer;
