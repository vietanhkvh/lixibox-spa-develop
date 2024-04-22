import { withRouter } from 'react-router-dom';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import { NavigationMobile as Nav } from '../nav';

const component = (params = {}) => {
  const props = {
    showHideCartSumaryLayoutAction: jest.fn()
  };

  return withRouter((routerProps) => <Nav {...Object.assign({}, props, routerProps, params)} />);
};

describe('Nav', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
