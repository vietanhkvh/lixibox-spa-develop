import { IProps, IState } from './model';

export const DEFAULT_PROPS = {} as IProps;
export const INITIAL_STATE = {
  codeSearch: '',
  isSearch: false
} as IState;

export const processList = [
  { id: 1, iconName: 'cart', title: 'ĐANG XÁC NHẬN', status: 'unpaid' },
  { id: 2, iconName: 'gift', title: 'LIXIBOX ĐANG ĐÓNG GÓI' },
  { id: 3, iconName: 'deliver', title: 'GIAO HÀNG' },
  { id: 5, iconName: 'success', title: 'ĐÃ NHẬN HÀNG' }
];

export const defaultShipment = [
  {
    id: -1,
    status: 'cancelled',
    tracking_code: '',
    shipping_service: 'Ninjavan',
    external_service_url: null,
    box_ids: [-1]
  }
];
