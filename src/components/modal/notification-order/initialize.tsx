import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  listLikedId: [],
  displayCartSumaryOption: true,
  data: {}
} as IProps;

export const INITIAL_STATE = {
  isMinimal: true,
  isSubmitLoading: false,
  inputValue: {
    value: '',
    valid: false
  }
} as IState;

export const processList = [
  { id: 1, iconName: 'cart', title: 'Xác nhận đơn hàng', status: 'unpaid' },
  { id: 2, iconName: 'gift', title: 'Đóng gói sản phẩm' },
  { id: 3, iconName: 'deliver', title: 'Giao hàng' },
  { id: 5, iconName: 'check', title: 'Đơn hàng thành công' }
];
