import { TAB_INFO_STATUS } from '../../../constants/application/product';

import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  data: [],
  title: '',
  type: TAB_INFO_STATUS.info,
  isIndividual: false,
  idProduct: '',
  isReasonToSell: false,
  isForceShow: false
} as IProps;

export const INITIAL_STATE = {
  isShow: false
} as IState;
