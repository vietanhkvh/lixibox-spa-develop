jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import UserInvitation from '..';

const component = (params = {}) => {
  const props = {};

  return <UserInvitation {...Object.assign({}, props, params)} />;
};

describe('UserInvitation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
