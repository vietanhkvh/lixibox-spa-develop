jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageImageCarousel from '..';
import { ImageCarouselMode } from '../component';

const defaultDataItem = {
  ratio: '1:1',
  radius: 'none',
  link: '',
  src: '',
  position: 'center-center',
  display: 'contain'
};

const component = (params = {}) => {
  const props = {
    mode: ImageCarouselMode.FIVE_ITEM_AND_MORE,
    autoSlideTimer: 3,
    focusedScaleValue: 1.1,
    isDisplayNavigationButton: true,
    isDisplaySelectedContent: false,
    list: [defaultDataItem, defaultDataItem, defaultDataItem, defaultDataItem],
    navButtonType: 'light' as const
  };

  return <LandingPageImageCarousel {...Object.assign({}, props, params)} />;
};

describe('LandingPageImageCarousel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
