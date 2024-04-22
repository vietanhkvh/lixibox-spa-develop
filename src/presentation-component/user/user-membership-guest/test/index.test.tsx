import { reduxRender } from 'utils/test-utils';
import UserMembershipGuest from '..';

const component = (params = {}) => {
  const props = {
    info: 'test info'
  };

  return <UserMembershipGuest {...Object.assign({}, props, params)} />;
};

describe('UserMembershipGuest', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
