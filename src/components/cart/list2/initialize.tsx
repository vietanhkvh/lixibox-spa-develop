import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  userInfo: {},
  list: [],
  isReadOnly: false,
  isForceHideBuyLater: false,
  type: 'small',
  style: {},
  cartItemStyle: {},
  isCheckedDiscount: false,
  isShowDiscountCodeMessage: true,
  className: '',
  compactView: false,
  confirmationType: 'inline',
  isPrivateMode: false,
  isLoading: false,
  isReceivedBirthdayGift: false
} as IProps;

export const INITIAL_STATE = {} as IState;
