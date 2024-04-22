import { IProps, IState } from './model';

export const DEFAULT_PROPS = {
  address: {},
  onRequestClose: () => {}
} as IProps;

export const INITIAL_STATE = {
  keySearch: '',
  addressSelectStep: 0,

  districtList: [],
  provinceList: [],
  wardList: [],
  filteredList: [],
  districtData: {},

  provinceId: 0,
  districtId: 0,
  wardId: 0,

  provinceName: '',
  districtName: '',
  wardName: ''
} as IState;
