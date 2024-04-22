import Modal from 'react-modal';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { INITIAL_STATE_ADDRESS } from '../../../../../../flows/address/reducer';
import UserAddress from '../';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const userAddress = {
  id: 548856,
  address: '123 Road, Abc, Cde',
  created_at: 1594695565,
  district_id: 760,
  district_name: '1',
  first_name: 'John',
  full_address: '123 Road, Abc, Cde, Phường Bến Thành, Quận 1, Thành Phố Hồ Chí Minh',
  full_name: 'John Doe',
  is_primary_address: true,
  is_usable: true,
  last_name: 'Doe',
  phone: '0344444444',
  province_id: 79,
  province_name: 'Hồ Chí Minh',
  ward: {
    id: 9081,
    district_id: 760,
    full_name: 'Phường Bến Thành',
    name: 'Bến Thành',
    unit: 'Phường'
  },
  ward_id: 9081,
  ward_name: 'Bến Thành'
};

const component = (params = {}) => {
  const props = {
    addressStore: Object.assign({}, INITIAL_STATE_ADDRESS, {
      userAddressList: Object.assign({}, INITIAL_STATE_ADDRESS.userAddressList, {
        list: [userAddress],
        isSuccess: true
      })
    }),
    addUserAddressAction: jest.fn(),
    deleteUserAddressAction: jest.fn(),
    editUserAddressAction: jest.fn(),
    setPrimaryAddressAction: jest.fn()
  };

  return <UserAddress {...Object.assign({}, props, params)} />;
};

describe('UserAddress', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
