jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageContent from '..';

const component = (params = {}) => {
  const props = {
    text: 'Test text',
    size: 'medium' as const,
    color: '#757779',
    fontSize: 'medium' as const,
    fontWeight: 'regular' as const,
    textAlign: 'center' as const
  };

  return <LandingPageContent {...Object.assign({}, props, params)} />;
};

describe('LandingPageContent', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
