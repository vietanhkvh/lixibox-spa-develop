import { connect } from 'react-redux';

import { openAlertAction } from '../../../flows/alert/action';
import { closeModalAction } from '../../../flows/modal/action';
import { saveAddressSelected } from '../../../flows/address/action';
import {
  fetchProvinceListAction,
  fetchWardByProvinceIdAction,
  fetchShipFeeByDistrictIdAction
} from '../../../flows/province/action';

import AddressComponent from './component';

export const mapStateToProps = (state) => ({
  addressStore: state.address,
  provinceStore: state.province
});

export const mapDispatchToProps = (dispatch) => ({
  closeModalAction: () => dispatch(closeModalAction()),
  openAlertAction: (data: any) => dispatch(openAlertAction(data)),
  saveAddressSelected: (data: any) => dispatch(saveAddressSelected(data)),
  fetchProvinceListAction: () => dispatch(fetchProvinceListAction()),
  fetchWardByProvinceIdAction: (data: any) => dispatch(fetchWardByProvinceIdAction(data)),
  fetchShipFeeByDistrictIdAction: (data: any) => dispatch(fetchShipFeeByDistrictIdAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AddressComponent);
