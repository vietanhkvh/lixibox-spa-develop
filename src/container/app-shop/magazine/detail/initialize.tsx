import { MAGAZINE_LIST_TYPE } from '../../../../constants/application/magazine';
import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  magazineDefaultParams: {
    page: 1,
    perPage: 5,
    type: MAGAZINE_LIST_TYPE.DEFAULT
  }
} as IProps;

export const INITIAL_STATE = {
  isPriorityBlock: true,
  isFetchMagazineList: false,
  didScroll: false
} as IState;
