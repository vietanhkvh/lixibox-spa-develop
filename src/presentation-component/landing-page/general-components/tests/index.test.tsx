jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageGeneralComponents from '..';
import { defaultDataList } from '../initialize';

const component = (params = {}) => {
  const props = {
    autoSlide: true,
    autoSlideTimer: 3,
    isDisplayNavigationButton: true,
    list: defaultDataList,
    navButtonType: 'light' as const
  };

  return <LandingPageGeneralComponents {...Object.assign({}, props, params)} />;
};

describe('LandingPageGeneralComponents', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
