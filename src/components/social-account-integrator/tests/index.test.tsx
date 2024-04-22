jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import SocialAccountIntegrator from '..';

const component = (params = {}) => {
  const props = {
    icon: 'lixibox',
    name: 'Lixibox',
    isIntegrated: false,
    isLoading: false,
    email: '',
    onClick: jest.fn()
  };

  return <SocialAccountIntegrator {...Object.assign({}, props, params)} />;
};

describe('SocialAccountIntegrator', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
