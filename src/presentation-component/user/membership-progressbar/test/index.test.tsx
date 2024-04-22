import { reduxRender } from 'utils/test-utils';
import { MembershipLevels, UserSilver } from 'test/sample/api/user';
import MembershipProgressbar from '..';

const component = (params = {}) => {
  const props = {
    userInfo: UserSilver,
    membershipInfo: MembershipLevels,
    infoPath: '/',
    onInfoClick: jest.fn()
  };

  return <MembershipProgressbar {...Object.assign({}, props, params)} />;
};

describe('MembershipProgressbar', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
