jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageImageCenterContent from '..';

const component = (params = {}) => {
  const props = {
    size: 'medium' as const,
    image: { src: '', size: '33%' as const },
    leftContent: [{ title: 'Left Title', content: 'Left Content' }],
    rightContent: [{ title: 'Left Title', content: 'Right Content' }]
  };

  return <LandingPageImageCenterContent {...Object.assign({}, props, params)} />;
};

describe('LandingPageImageCenterContent', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
