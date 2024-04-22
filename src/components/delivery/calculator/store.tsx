import { connect } from 'react-redux';

import { fetchProvinceListAction, fetchShipFeeByDistrictIdAction } from '../../../flows/province/action';
import { openModalAction } from '../../../flows/modal/action';

import DeliverCalculationContainer from './component';

export const mapStateToProps = (state) => ({
  provinceStore: state.province,
  addressStore: state.address
});

export const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModalAction(data)),
  fetchProvinceListAction: () => dispatch(fetchProvinceListAction()),
  fetchShipFeeByDistrictIdAction: ({ districtId }) => dispatch(fetchShipFeeByDistrictIdAction({ districtId }))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DeliverCalculationContainer);
