jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageImage from '..';

const component = (params = {}) => {
  const props = {
    style: {},
    ratio: '1:1' as const,
    radius: 'none' as const,
    link: '',
    src: '',
    position: 'center-center' as const,
    display: 'contain' as const
  };

  return <LandingPageImage {...Object.assign({}, props, params)} />;
};

describe('LandingPageImage', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
