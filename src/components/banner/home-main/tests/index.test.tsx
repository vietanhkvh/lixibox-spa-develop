jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import HomeMain from '..';

const item = {
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
};

const list1 = [
  {
    id: 404,
    ...item
  }
];

const list3 = [
  {
    id: 401,
    ...item
  },
  {
    id: 402,
    ...item
  },
  {
    id: 403,
    ...item
  }
];

const list5 = [
  {
    id: 401,
    ...item
  },
  {
    id: 402,
    ...item
  },
  {
    id: 403,
    ...item
  },
  {
    id: 404,
    ...item
  },
  {
    id: 405,
    ...item
  }
];

describe('HomeMain', () => {
  test(`Render without item`, () => {
    expect(() => {
      reduxRender(<HomeMain {...Object.assign({}, { list: [], style: {} })} />, { initialState: {} });
    }).not.toThrow();
  });

  test(`Rrender with 1 item`, () => {
    expect(() => {
      reduxRender(<HomeMain {...Object.assign({}, { list: list1 })} />, { initialState: {} });
    }).not.toThrow();
  });

  test(`Render with 3 items`, () => {
    expect(() => {
      reduxRender(<HomeMain {...Object.assign({}, { list: list3, style: {} })} />, { initialState: {} });
    }).not.toThrow();
  });

  test(`Render with 5 items`, () => {
    expect(() => {
      reduxRender(<HomeMain {...Object.assign({}, { list: list5, style: {} })} />, { initialState: {} });
    }).not.toThrow();
  });
});
