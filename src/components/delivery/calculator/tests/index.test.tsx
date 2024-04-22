jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Calculator from '../component';
import { INITIAL_STATE_ADDRESS } from '../../../../flows/address/reducer';
import { INITIAL_STATE_PROVINCE } from '../../../../flows/province/reducer';

const openModal = jest.fn();
const addressStore = INITIAL_STATE_ADDRESS;
const provinceStore = INITIAL_STATE_PROVINCE;
const fetchProvinceListAction = jest.fn();
const fetchShipFeeByDistrictIdAction = jest.fn();
const boxId = 0;

const component = (params = {}) => {
  const props = {
    openModal,
    addressStore,
    provinceStore,
    fetchProvinceListAction,
    fetchShipFeeByDistrictIdAction,
    boxId
  };

  return <Calculator {...Object.assign({}, props, params)} />;
};

describe('Calculator', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
