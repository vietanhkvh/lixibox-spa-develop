import { MAGAZINE_LIST_TYPE } from '../../../../constants/application/magazine';
import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  magazineDefaultParams: {
    page: 1,
    perPage: 17,
    type: MAGAZINE_LIST_TYPE.DEFAULT
  }
} as IProps;

export const INITIAL_STATE = {
  isPriorityBlock: true,
  page: 1
} as IState;
