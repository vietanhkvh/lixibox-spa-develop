jest.mock('../../app/init-react-app', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }
}));
import { CDN_ASSETS, CDN_ASSETS_PREFIX, generateFacebookShareUrl } from '../uri';

describe('CDN_ASSETS', () => {
  test(`generates a valid URL for the expected host`, () => {
    expect(CDN_ASSETS('/test/asset.png')).toEqual('https://js.lixibox.com/test/asset.png');
  });
});

describe('CDN_ASSETS_PREFIX', () => {
  test(`generates a valid URL for the expected host`, () => {
    expect(CDN_ASSETS_PREFIX('/test/asset.png')).toEqual('https://js.lixibox.com/image-assets/test/asset.png');
  });
});

describe('generateFacebookShareUrl', () => {
  test(`generates a valid encoded URL`, () => {
    expect(
      generateFacebookShareUrl({
        shareUrl: 'https://www.example.com/share',
        redirectUrl: 'https://www.example.com/shared'
      })
    ).toEqual(
      'https://www.facebook.com/dialog/share?app_id=1637891543106606&display=popup&href=https%3A%2F%2Fwww.example.com%2Fshare&redirect_uri=https%3A%2F%2Fwww.example.com%2Fshared'
    );
  });
});
