import { Province } from 'types/api/province';

export interface IProps {
  data?: any;
  provinceStore?: any;
  addressStore?: any;

  closeModalAction?: any;
  openAlertAction?: any;
  fetchProvinceListAction?: any;
  fetchWardByProvinceIdAction?: any;
  fetchShipFeeByDistrictIdAction?: any;

  filterProvince?: (provinces: Array<Province>) => Array<Province>;
  onSaveAddressSelected?: any;
  getFromDistrict?: boolean;
  address?: any;
  onRequestClose?: any;
}

export interface IState {
  keySearch?: string;
  addressSelectStep?: number;

  districtList?: any;
  provinceList?: any;
  districtData?: any;
  wardList?: any;
  filteredList?: any;

  provinceId?: number;
  districtId?: number;
  wardId?: number;

  provinceName?: string;
  districtName?: string;
  wardName?: string;
}
