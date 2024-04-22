import { IState } from './model';

export const DEFAULT_PROPS = {
  alertStore: { list: [] },
  closeAlert: () => {}
};

export const INITIAL_STATE = {
  waitingClose: [],
  waitingShow: []
} as IState;
