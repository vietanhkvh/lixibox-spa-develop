jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageVideo from '..';

const component = (params = {}) => {
  const props = {
    url: 'https://upload.lixibox.com/videos/halio-1.mp4?t=1',
    youtubeVideoId: '',
    type: 'original' as const,
    ratio: '16:9' as const,
    title: 'Video title at here',
    autoPlayVideo: true,
    withShadow: true
  };

  return <LandingPageVideo {...Object.assign({}, props, params)} />;
};

describe('LandingPageVideo', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
