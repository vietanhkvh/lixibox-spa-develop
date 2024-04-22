jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageSection from '..';

const component = (params = {}) => {
  const props = {
    layout: 'fixed' as const,
    contentLayout: 'fixed' as const,
    size: 'medium' as const,
    background: '#FFFFFF',
    heading: null,
    content: null,
    componentType: '',
    componentData: {},
    extraData: {
      rating: []
    }
  };

  return <LandingPageSection {...Object.assign({}, props, params)} />;
};

describe('LandingPageSection', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
