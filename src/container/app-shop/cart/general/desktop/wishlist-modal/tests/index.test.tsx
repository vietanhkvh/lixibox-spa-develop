jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import ProductSlider from '..';

const item = {
  added_to_waitlist: false,
  badges: {
    top_left: null,
    top_right: null,
    bottom_right: null,
    bottom_left: null
  },
  brand_name: 'Combo box',
  coins_price: null,
  discount_percent: 40,
  for_redeem: false,
  is_individual: false,
  is_saleable: true,
  like_count: 410,
  lixicoin_bonus: 125,
  name: 'Lixibox Daily Facial Mask Sheet Set',
  original_price: 210000,
  pre_order_release_date: null,
  pre_order_status: null,
  preview_picture: {},
  price: 125000,
  price_sale_off: 125000,
  primary_picture: {
    facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/037/194/facebook/1543982402.png?t=1620360260',
    large_url: 'https://upload.lixibox.com/system/pictures/files/000/037/194/large/1543982402.png?t=1620360260',
    medium_url: 'https://upload.lixibox.com/system/pictures/files/000/037/194/medium/1543982402.png?t=1620360260',
    original_url: 'https://upload.lixibox.com/system/pictures/files/000/037/194/original/1543982402.png?t=1620360260',
    square_url: 'https://upload.lixibox.com/system/pictures/files/000/037/194/square/1543982402.png?t=1620360260',
    thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/037/194/thumb/1543982402.png?t=1620360260',
    vertical_url: 'https://upload.lixibox.com/system/pictures/files/000/037/194/vertical/1543982402.png?t=1620360260'
  },
  rating: {
    avg_rate: 4.6,
    count: 325
  },
  short_description:
    'Lixibox Daily Facial Mask Sheet - Acai Berry Lixibox Daily Facial Mask Sheet - Seaweed Lixibox Daily Facial Mask Sheet - Milk Lixibox Daily Facial Mask Sheet - Aloe Lixibox Daily Facial Mask Sheet - Green Tea Lixibox Daily Facial Mask Sheet - Bird Nest Lixibox Daily Facial Mask Sheet - Pearl',
  slug: 'lixibox-daily-facial-mask-sheet-set',
  stock: 10,
  store_stock: 10,
  variant_options: [],
  variants: {
    colors: []
  }
};
const list1 = [
  {
    id: 9396,
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

describe('Product sliders', () => {
  test(`Rrender without item`, () => {
    expect(() => {
      reduxRender(
        <ProductSlider
          {...Object.assign(
            {},
            {
              column: 5,
              data: [],
              template: () => <div></div>,
              className: ''
            }
          )}
        />,
        { initialState: {} }
      );
    }).not.toThrow();
  });

  test(`Rrender with 1 item`, () => {
    expect(() => {
      reduxRender(
        <ProductSlider
          {...Object.assign(
            {},
            {
              column: 5,
              data: list1,
              template: () => <div></div>,
              className: ''
            }
          )}
        />,
        { initialState: {} }
      );
    }).not.toThrow();
  });

  test(`Rrender with 3 item`, () => {
    expect(() => {
      reduxRender(
        <ProductSlider
          {...Object.assign(
            {},
            {
              column: 4,
              data: list3,
              template: () => <div></div>,
              className: ''
            }
          )}
        />,
        { initialState: {} }
      );
    }).not.toThrow();
  });

  test(`Rrender with 5 item`, () => {
    expect(() => {
      reduxRender(
        <ProductSlider
          {...Object.assign(
            {},
            {
              column: 3,
              data: list5,
              template: () => <div></div>,
              className: ''
            }
          )}
        />,
        { initialState: {} }
      );
    }).not.toThrow();
  });
});
