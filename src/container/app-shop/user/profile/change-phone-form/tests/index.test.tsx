jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import ChangePhoneForm from '..';

const component = (params = {}) => {
  const props = {
    phone: '0123456789',
    isRequestChangePhoneLoading: false,
    handleRequestChangePhone: jest.fn()
  };

  return <ChangePhoneForm {...Object.assign({}, props, params)} />;
};

describe('ChangePhoneForm', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
