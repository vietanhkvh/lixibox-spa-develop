import Modal from 'react-modal';
jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import Address from '..';
import { INITIAL_STATE_ADDRESS } from '../../../flows/address/reducer';
import { INITIAL_STATE_PROVINCE } from '../../../flows/province/reducer';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const provinceStore = INITIAL_STATE_PROVINCE;
const addressStore = INITIAL_STATE_ADDRESS;
const openModalAction = jest.fn();
const fetchProvinceListAction = jest.fn();
const fetchWardByProvinceIdAction = jest.fn();
const saveAddressSelected = true;
const address = 'An address';
const isShowError = true;

const component = (params = {}) => {
  const props = {
    provinceStore,
    addressStore,
    openModalAction,
    fetchProvinceListAction,
    fetchWardByProvinceIdAction,
    saveAddressSelected,
    address,
    isShowError
  };

  return <Address {...Object.assign({}, props, params)} />;
};

describe('Address', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
