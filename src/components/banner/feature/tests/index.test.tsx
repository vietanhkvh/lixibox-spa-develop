jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Feature from '..';

const list = [
  {
    id: 404,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/large/banner-top.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/medium/banner-top.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/original/banner-top.png',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/thumb/banner-top.png'
    },
    links: ['https://www.lixibox.com/special-deals/weekly-specials'],
    name: '!!! Săn mã nhận QUÀ KHỦNG đến 2 triệu !!!',
    order: null
  }
];

const component = (params = {}) => {
  const props = {
    list
  };

  return <Feature {...Object.assign({}, props, params)} />;
};

describe('Feature', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
