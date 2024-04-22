jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { defaultDataList } from '../initialize';
import LandingPageVideoGallery from '..';

const component = (params = {}) => {
  const props = {
    size: 'medium' as const,
    list: defaultDataList
  };

  return <LandingPageVideoGallery {...Object.assign({}, props, params)} />;
};

describe('LandingPageVideoGallery', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
