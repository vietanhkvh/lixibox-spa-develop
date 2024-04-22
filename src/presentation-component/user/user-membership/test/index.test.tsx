import { reduxRender } from 'utils/test-utils';
import { UserSilver } from 'test/sample/api/user';
import UserMembership from '..';

const component = (params = {}) => {
  const props = {
    user: UserSilver,
    info: 'test info',
    onInfoClick: jest.fn()
  };

  return <UserMembership {...Object.assign({}, props, params)} />;
};

describe('UserMembership', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
