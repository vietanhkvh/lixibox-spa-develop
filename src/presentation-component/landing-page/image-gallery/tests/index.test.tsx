jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageImageGallery from '..';
import { defaultDataList } from '../initialize';

const component = (params = {}) => {
  const props = {
    size: 'medium' as const,
    column: 4,
    mobileColumn: 2,
    list: defaultDataList,
    itemPadding: 'medium' as const
  };

  return <LandingPageImageGallery {...Object.assign({}, props, params)} />;
};

describe('LandingPageImageGallery', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
