import { withRouter } from 'react-router-dom';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import { LeftNavigationMobile as Left } from '../left';
import { INITIAL_STATE_MENU } from '../../../../../flows/menu/reducer';
import { INITIAL_STATE_AUTH } from '../../../../../flows/auth/reducer';

const closeLeftPanel = jest.fn();
const signOut = jest.fn();
const userInfo = INITIAL_STATE_AUTH.userInfo;
const signInStatus = INITIAL_STATE_AUTH.signInStatus;
const menuStore = INITIAL_STATE_MENU;

const component = (params = {}) => {
  const props = {
    closeLeftPanel,
    signOut,
    userInfo,
    signInStatus,
    menuStore
  };

  return withRouter((routerProps) => <Left {...Object.assign({}, props, routerProps, params)} />);
};

describe('Left', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
