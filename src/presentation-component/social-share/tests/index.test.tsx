import { withRouter } from 'react-router';
jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import { INITIAL_STATE_META } from '../../../flows/meta/reducer';
import { INITIAL_STATE_MAGAZINE } from '../../../flows/live/reducer';
import { INITIAL_STATE_SHOP } from '../../../flows/shop/reducer';
import SocialShareDesktop from '../component';

const component = (params = {}) => {
  const props = {
    metaStore: INITIAL_STATE_META,
    magazineStore: INITIAL_STATE_MAGAZINE,
    shopStore: INITIAL_STATE_SHOP
  };

  return withRouter((routerProps) => <SocialShareDesktop {...Object.assign({}, props, routerProps, params)} />);
};

describe('SocialShareDesktop', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
