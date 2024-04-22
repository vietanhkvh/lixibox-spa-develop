import { withRouter } from 'react-router-dom';
import { Scheme } from 'types/api/gwp';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from 'utils/test-utils';
import View from '..';

const schemeDetail = {
  banner: {
    height: 0,
    url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/061/471/original/1658220377.jpeg?v=3',
    width: 0
  },
  benefit_message:
    'Benefit message abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi ',
  description:
    'GWP Scheme Description 1 abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi abc def ghi ',
  discount_code: {
    id: 46819,
    amount: 0,
    available: true,
    available_message: null,
    code: 'MATTIFY',
    description: 'Tặng giấy thấm dầu Lixibox cho các sản phẩm trị mụn ',
    end_date: 1663693140,
    errors: [],
    gift_boxes: [
      {
        id: 6220,
        brand_name: 'Lixibox',
        is_individual: true,
        is_saleable: true,
        lixibox_id: 'LX0ECED147C8',
        name: 'Giấy Thấm Dầu Lixibox Bamboo Charcoal Oil Control Paper',
        original_price: 55000,
        price: 47000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/692/facebook/1515141838.png?t=1628760897',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/692/large/1515141838.png?t=1628760897',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/692/medium/1515141838.png?t=1628760897',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/692/original/1515141838.png?t=1628760897',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/692/square/1515141838.png?t=1628760897',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/692/thumb/1515141838.png?t=1628760897',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/692/vertical/1515141838.png?t=1628760897'
        },
        short_description:
          'Giấy thấm dầu Lixibox với thành phần bột than giúp hút dầu hiệu quả, không gây bí tắc lỗ chân lông mà không ảnh hưởng tới lớp makeup. Hạn sử dụng : 5 năm sau ngày sản xuất',
        slug: 'lixibox-bamboo-charcoal-oil-control-paper',
        status: 'approved'
      }
    ],
    order_price_max: null,
    order_price_min: null,
    remaining_amount: 0,
    start_date: 1600016400,
    unit: 'vnd'
  },
  link_url: 'https://www.google.com',
  linked_items: [
    {
      link_url:
        'https://www.lxb-fe.click/shop/combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-capella',
      linked_object_id: 11705,
      linked_object_type: 'Box',
      name: 'Item 1'
    },
    {
      link_url:
        'https://www.lxb-fe.click/shop/combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-capella',
      linked_object_id: 60,
      linked_object_type: 'Box',
      name: 'Item 2'
    },
    {
      link_url:
        'https://www.lxb-fe.click/shop/combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-capella',
      linked_object_id: 20,
      linked_object_type: 'Box',
      name: 'Item 3'
    }
  ],
  linked_object_id: 10341,
  linked_object_type: 'Box',
  name: 'GWP Scheme Name 1',
  slug: 'gwp-scheme-name-1',
  style: 'large'
} as Scheme;

const schemes = {
  index: [schemeDetail],
  fetching: false,
  loaded: true,
  errored: false
};

const gwpBanner = {
  id: 955,
  cover_image: {
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/955/large/1657007922.jpeg',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/955/medium/1657007922.jpeg',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/955/original/1657007922.jpeg',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/955/thumb/1657007922.jpeg'
  },
  links: ['https://www.lixibox.com'],
  name: 'GWP Banner 1',
  order: null
};

const weeklyBanners = [
  {
    id: 885,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/885/large/qua-tang-kem-don-hang.jpg',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/885/medium/qua-tang-kem-don-hang.jpg',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/885/original/qua-tang-kem-don-hang.jpg',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/885/thumb/qua-tang-kem-don-hang.jpg'
    },
    links: [],
    name: 'text 2 ',
    order: 0
  },
  {
    id: 886,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/886/large/LXB_weeklyspecial_lustre_%283%29.jpg',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/886/medium/LXB_weeklyspecial_lustre_%283%29.jpg',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/886/original/LXB_weeklyspecial_lustre_%283%29.jpg',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/886/thumb/LXB_weeklyspecial_lustre_%283%29.jpg'
    },
    links: ['https://www.lixibox.com/brands/lustre'],
    name: 'lustre',
    order: 1
  },
  {
    id: 888,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/888/large/LXB_weeklyspecial_halio_%281%29.jpg',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/888/medium/LXB_weeklyspecial_halio_%281%29.jpg',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/888/original/LXB_weeklyspecial_halio_%281%29.jpg',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/888/thumb/LXB_weeklyspecial_halio_%281%29.jpg'
    },
    links: ['https://www.lixibox.com/brands/halio'],
    name: 'Halio',
    order: 2
  },
  {
    id: 904,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/904/large/111_%281%29.jpg',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/904/medium/111_%281%29.jpg',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/904/original/111_%281%29.jpg',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/904/thumb/111_%281%29.jpg'
    },
    links: ['https://www.lixibox.com/search/halio%20ion'],
    name: 'giftcode',
    order: 3
  },
  {
    id: 905,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/905/large/LXB_weeklyspecial_okame.jpg',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/905/medium/LXB_weeklyspecial_okame.jpg',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/905/original/LXB_weeklyspecial_okame.jpg',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/905/thumb/LXB_weeklyspecial_okame.jpg'
    },
    links: ['https://www.lixibox.com/brands/okame'],
    name: 'okame ',
    order: null
  }
];

const bannerState = {
  lastId: 'gwp',
  fetching: false,
  loaded: true,
  errored: false
};

const component = (params = {}) => {
  const props = {
    schemes,
    gwpBanner,
    weeklyBanners,
    bannerState
  } as any;

  return withRouter((routerProps) => <View {...Object.assign({}, props, routerProps, params)} />);
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
