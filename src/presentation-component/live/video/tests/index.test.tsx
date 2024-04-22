jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { VERTICAL_TYPE } from '../../../../constants/application/live';
import LandingPageVideoGallery from '..';

const component = (params = {}) => {
  const props = {
    videoUrl: 'https://www.facebook.com/lixiboxvn/videos/1474342052759087',
    coverImageUrl:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/large/banner-top.png',
    ratioType: VERTICAL_TYPE
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
