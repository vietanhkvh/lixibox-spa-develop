jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import ChangeEmailForm from '..';

const component = (params = {}) => {
  const props = {
    isRequestChangeEmailLoading: false,
    handleRequestChangeEmail: jest.fn()
  };

  return <ChangeEmailForm {...Object.assign({}, props, params)} />;
};

describe('ChangeEmailForm', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
