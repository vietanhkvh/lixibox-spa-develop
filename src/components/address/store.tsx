import { connect } from 'react-redux';

import { openModalAction } from '../../flows/modal/action';

import AddressComponent from './component';

export const mapStateToProps = (state) => ({
  addressStore: state.address,
  provinceStore: state.province
});

export const mapDispatchToProps = (dispatch) => ({
  openModalAction: (data) => dispatch(openModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AddressComponent);
