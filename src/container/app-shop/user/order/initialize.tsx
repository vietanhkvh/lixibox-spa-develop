import { generateMobileTab } from './handler';
import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  perPage: 20
} as IProps;

export const INITIAL_STATE = ({ status = '', page = 1 }) =>
  ({
    urlList: [],
    page: page * 1,
    mobileTabs: generateMobileTab({ status }),
    status
  } as IState);
