jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveHighlightInfo from '..';

const productBox = {
  id: 10575,
  added_to_waitlist: false,
  avg_rate: 4.81132,
  badges: {
    message: null,
    top_left:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/badges/icons/000/000/151/detail/1608090564.png',
    top_right: null,
    bottom_right: null,
    bottom_left: null
  },
  box_products: [
    {
      id: 14471,
      box_id: 10575,
      expert_description: 'Expert description',
      product: {
        id: 10037,
        brand: {
          id: 455,
          brand_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/455/original/halio.png',
          description: 'Brand descriptio',
          name: 'Halio',
          slug: 'halio'
        },
        capacity: '120.0 gr',
        country: 'United States',
        description: 'Product description',
        display_name: 'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moisturizing Beauty Device Black',
        individual_box_slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
        ingredients:
          'Sản phẩm gồm có\r\n- 1 máy Halio Ion & Cleansing Beauty Device\r\n- 1 Dây sạc\r\n- 1 Hướng dẫn sử dụng\r\n- 1 Túi nhung\r\n- 1 Vòng nhựa dẻo\r\n- 1 Hộp máy',
        made_in_country: 'China',
        name: 'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moisturizing Beauty Device Black',
        original_price: 1600000,
        price: 1150000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/facebook/1591850909.png?t=1604031192',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?t=1604031192',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/medium/1591850909.png?t=1604031192',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/original/1591850909.png?t=1604031192',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1604031192'
        },
        saleable: true,
        slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
        usage: 'Usage description',
        usage_duration: null,
        wholesale_price: null
      },
      product_id: 10037,
      quantity: 1
    }
  ],
  brand_name: 'Halio',
  coins_price: 50000,
  delivery_time: {},
  for_redeem: true,
  is_individual: true,
  is_saleable: true,
  like_count: 109,
  lixicoin_bonus: 1150,
  long_description: 'description',
  name: 'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moisturizing Beauty Device Black',
  note: null,
  number_of_products: 1,
  original_price: 1600000,
  pictures: [
    {
      id: 50461,
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/facebook/1591850909.png?v=4',
      first_version: false,
      height: 650,
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?v=4',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/medium/1591850909.png?v=4',
      optimized_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/optimized/1591850909.png?v=4',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/original/1591850909.png?v=4',
      processing: false,
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?v=4',
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?v=4',
      width: 960
    },
    {
      id: 50464,
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/facebook/1591851808.png?v=3',
      first_version: false,
      height: 650,
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/large/1591851808.png?v=3',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/medium/1591851808.png?v=3',
      optimized_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/optimized/1591851808.png?v=3',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/original/1591851808.png?v=3',
      processing: false,
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/thumb/1591851808.png?v=3',
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/large/1591851808.png?v=3',
      width: 960
    },
    {
      id: 50466,
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/facebook/1591852257.png?v=3',
      first_version: false,
      height: 650,
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/large/1591852257.png?v=3',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/medium/1591852257.png?v=3',
      optimized_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/optimized/1591852257.png?v=3',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/original/1591852257.png?v=3',
      processing: false,
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/thumb/1591852257.png?v=3',
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/large/1591852257.png?v=3',
      width: 960
    }
  ],
  pre_order_release_date: null,
  pre_order_status: null,
  price: 1150000,
  price_sale_off: 1150000,
  primary_picture: {
    facebook_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/facebook/1591850909.png?t=1612431646',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?t=1612431646',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/medium/1591850909.png?t=1612431646',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/original/1591850909.png?t=1612431646',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1612431646'
  },
  rating: {
    avg_rate: 4.8,
    count: 53
  },
  reason_to_sell: null,
  saving_bundle_value: 100000,
  short_description: 'short description',
  size_guides: [],
  slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
  status: 'approved',
  stock: 10,
  variant_options: [
    {
      box_id: 10262,
      box_slug: 'may-day-tinh-chat-duong-trang-halio-ion',
      name: '',
      presentation: 'WHITE',
      color_code: '#FFFFFF',
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/447/thumb/1589427494.png?t=1612431641'
    },
    {
      box_id: 10575,
      box_slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
      name: '',
      presentation: 'BLACK',
      color_code: '#000000',
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1612431646'
    }
  ],
  variants: {
    colors: [
      {
        box_id: 10262,
        box_slug: 'may-day-tinh-chat-duong-trang-halio-ion',
        name: '',
        presentation: 'WHITE',
        color_code: '#FFFFFF',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/447/thumb/1589427494.png?t=1612431641'
      },
      {
        box_id: 10575,
        box_slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
        name: '',
        presentation: 'BLACK',
        color_code: '#000000',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1612431646'
      }
    ]
  },
  videos: []
};

const component = (params = {}) => {
  const props = {
    topComment: {
      id: 16433,
      content: 'test message',
      created_at: 1612497097,
      editable: false,
      userAvatar:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/medium/1612423885.jpg',
      userMobileReferralCode: 'ABCDEF',
      username: 'Nguyễn Andrew'
    },
    topDiscountCode: {
      id: 1,
      description: 'Test description 1',
      code: 'ABCDEF'
    },
    topBox: productBox,
    onSelect: jest.fn()
  };

  return <LiveHighlightInfo {...Object.assign({}, props, params)} />;
};

describe('LiveHighlightInfo', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
