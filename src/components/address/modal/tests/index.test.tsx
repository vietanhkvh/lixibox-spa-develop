import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import AddressModal from '../component';
import { INITIAL_STATE_ADDRESS } from '../../../../flows/address/reducer';
import { INITIAL_STATE_PROVINCE } from '../../../../flows/province/reducer';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const provinceStore = INITIAL_STATE_PROVINCE;
const addressStore = INITIAL_STATE_ADDRESS;
const closeModalAction = jest.fn();
const openAlertAction = jest.fn();
const fetchProvinceListAction = jest.fn();
const fetchWardByProvinceIdAction = jest.fn();
const fetchShipFeeByDistrictIdAction = jest.fn();
const onSaveAddressSelected = jest.fn();
const getFromDistrict = false;
const onRequestClose = jest.fn();

const component = (params = {}) => {
  const props = {
    provinceStore,
    addressStore,
    closeModalAction,
    openAlertAction,
    fetchProvinceListAction,
    fetchWardByProvinceIdAction,
    fetchShipFeeByDistrictIdAction,
    onSaveAddressSelected,
    getFromDistrict,
    onRequestClose
  };

  return <AddressModal {...Object.assign({}, props, params)} />;
};

describe('AddressModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
