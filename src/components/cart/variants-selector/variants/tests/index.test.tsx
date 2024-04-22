jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

import { reduxRender } from '../../../../../utils/test-utils';
import Variants from '../component';

const box2 = {
  added_to_waitlist: false,
  avg_rate: 0,
  badges: { top_left: null, top_right: null, bottom_right: null, bottom_left: null },
  box_products: [
    {
      box_id: 10577,
      expert_description: 'Set',
      id: 14473,
      product: {
        brand: 'Lixi Baby',
        brand_image_url: 'hg',
        description: 'Lixi.',
        id: 796,
        capacity: '42.0 gr',
        country: 'Vietnam',
        display_name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
        individual_box_slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
        ingredients: 'Polyester',
        made_in_country: 'China',
        name: 'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Set Pink Polka Dot',
        original_price: 50000,
        price: 20000,
        primary_picture: {
          facebook_url: 'https://g?t=1677582981',
          large_url: 'http7582981',
          medium_url: 'htt2981',
          original_url: 'htt81',
          square_url: 'https:/981',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/051/530/thumb/1595827215.jpg?t=1677582981',
          vertical_url: 'https:/2981'
        },
        primary_picture_webp: {
          facebook_url: 'https2981',
          large_url: 'htt81',
          medium_url: 'http2981',
          original_url: 'http981',
          square_url: 'htt81',
          thumb_url: 'htt82981',
          vertical_url: 'htt981'
        },
        saleable: true,
        slug: 'bo-03-cai-dung-cu-kep-ti-gia-chong-roi-lixi-baby-set-pink-polka-dot',
        usage: '1 đầu kẹp áo đeo theo người và 1 đầu giữ ti giả chống rơi cho em bé',
        usage_duration: null,
        wholesale_price: null
      },
      product_id: 10039,
      quantity: 1
    }
  ],
  length: 1,
  brand_name: 'Lixi Baby',
  categories: [{}, {}],
  coins_price: 0,
  delivery_time: {},
  for_redeem: false,
  id: 10577,
  is_bundle: false,
  is_individual: true,
  is_saleable: true,
  like_count: 1,
  lixibox_id: 'LXFB328307D8',
  lixicoin_bonus: 20,
  long_description: 'Set 3.\n',
  name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
  note: null,
  number_of_products: 1,
  original_price: 50000,
  pictures: [{}],
  pictures_webp: [{}],
  pre_order_release_date: null,
  pre_order_status: null,
  preview_picture: {},
  preview_picture_webp: {},
  price: 20000,
  price_sale_off: 20000,
  primary_picture: {
    facebook_url: '',
    large_url: '',
    medium_url: '',
    original_url: '',
    square_url: ''
  },
  primary_picture_webp: {
    facebook_url: '',
    large_url: '',
    medium_url: '',
    original_url: '',
    square_url: ''
  },
  rating: { avg_rate: 0, count: 0 },
  reason_to_sell: null,
  saving_bundle_value: 0,
  short_description: 'Sebé.',
  size_guides: [],
  slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
  status: 'approved',
  stock: 10,
  store_stock: 0,
  tracking: { category_key: 'shop-gifts-gifts-for-baby' },
  videos: []
};

const product = {
  box: box2,
  box_variants: [
    {
      option_values: [
        {
          type: 'pattern',
          value_id: 345,
          slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be'
        }
      ]
    }
  ],
  can_review: false,
  liked: false,
  option_types: [
    {
      name: 'pattern',
      presentation: 'Họa tiết',
      values: [
        {
          color_code: null,
          color_image_url: null,
          image_url: '',
          name: 'Hình Dưa Hấu',
          option_value_id: 345,
          option_value_name: 'Hình Dưa Hấu',
          presentation: 'Hình Dưa Hấu'
        }
      ]
    }
  ]
};
const component = (params = {}) => {
  const props = {
    product,
    onSelected: jest.fn()
  };

  return <Variants {...Object.assign({}, props, params)} />;
};

describe('Item', () => {
  test(`component should be rendered`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
