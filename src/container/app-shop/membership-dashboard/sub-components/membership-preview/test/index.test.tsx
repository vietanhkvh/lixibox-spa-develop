import { reduxRender } from 'utils/test-utils';
import { MembershipLevels, UserSilver } from 'test/sample/api/user';
import MembershipPreview from '..';

const component = (params = {}) => {
  const props = {
    user: UserSilver,
    membershipInfo: MembershipLevels,
    progressInfoPath: '/',
    onProgressInfoClick: jest.fn()
  };

  return <MembershipPreview {...Object.assign({}, props, params)} />;
};

describe('MembershipPreview', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
