import { MAGAZINE_LIST_TYPE } from '../../../../constants/application/magazine';
import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  perPage: 17,
  magazineDefaultParams: {
    page: 1,
    perPage: 6,
    type: MAGAZINE_LIST_TYPE.DEFAULT
  }
} as IProps;

export const INITIAL_STATE = {
  page: 1,
  urlList: [],
  isPriorityBlock: true
} as IState;
