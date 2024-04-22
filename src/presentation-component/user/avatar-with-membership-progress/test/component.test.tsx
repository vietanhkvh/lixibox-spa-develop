import { reduxRender } from 'utils/test-utils';
import { UserSilver } from 'test/sample/api/user';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import AvatarWithMembershipProgress from '../component';

const component = (params = {}) => {
  const props = {
    user: UserSilver,
    authStore: INITIAL_STATE_AUTH,
    userStore: INITIAL_STATE_USER,
    changeAvatarUserAction: jest.fn(),
    openAlertAction: jest.fn()
  };

  return <AvatarWithMembershipProgress {...Object.assign({}, props, params)} />;
};

describe('AvatarWithMembershipProgress', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
