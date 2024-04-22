import { withRouter } from 'react-router';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { INITIAL_STATE_ADDRESS } from '../../../../../../flows/address/reducer';
import { reduxRender } from '../../../../../../utils/test-utils';
import UserAddresses from '../component';

const component = (params = {}) => {
  const props = {
    addressStore: INITIAL_STATE_ADDRESS,
    addUserAddressAction: jest.fn(),
    deleteUserAddressAction: jest.fn(),
    editUserAddressAction: jest.fn(),
    setPrimaryAddressAction: jest.fn()
  };

  return withRouter<any, any>(<UserAddresses {...Object.assign({}, props, params)} />);
};

describe('UserAddresses', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
