jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageHeading from '..';

const component = (params = {}) => {
  const props = {
    text: 'Heading Text',
    size: 'medium' as const,
    color: '#202020',
    fontSize: 'large' as const,
    fontWeight: 'bold' as const,
    textAlign: 'center' as const
  };

  return <LandingPageHeading {...Object.assign({}, props, params)} />;
};

describe('LandingPageHeading', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
