jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageLayout from '..';

const component = (params = {}) => {
  const props = {
    size: 'medium' as const,
    imageFlexRatio: 5 as const,
    link: '',
    imagePosition: 'left' as const,
    textWrapAlign: 'center' as const,
    image: {
      ratio: '1:1' as const,
      radius: 'none' as const,
      link: '',
      src: '',
      position: 'center-center' as const,
      display: 'contain' as const
    },
    heading: {
      text: 'Heading Text',
      size: 'medium' as const,
      color: '#202020',
      fontSize: 'large' as const,
      fontWeight: 'bold' as const,
      textAlign: 'center' as const
    },
    content: {
      text: 'Test text',
      size: 'medium' as const,
      color: '#757779',
      fontSize: 'medium' as const,
      fontWeight: 'regular' as const,
      textAlign: 'center' as const
    }
  };

  return <LandingPageLayout {...Object.assign({}, props, params)} />;
};

describe('LandingPageLayout', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
