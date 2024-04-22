import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductList from '..';

const userInfo = {
  id: 112448,
  address: 'Qư Dhdb',
  addresses: [
    {
      id: 554007,
      address: 'Qư Dhdb',
      created_at: 1596447357,
      district_id: 769,
      district_name: '2',
      first_name: 'first',
      full_address: 'Qư Dhdb, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
      full_name: 'Address First',
      is_primary_address: true,
      is_usable: true,
      last_name: 'address',
      phone: '0909090909',
      province_id: 79,
      province_name: 'Hồ Chí Minh',
      ward: {
        id: 9203,
        district_id: 769,
        full_name: 'Phường Bình An',
        name: 'Bình An',
        unit: 'Phường'
      },
      ward_id: 9203,
      ward_name: 'Bình An'
    }
  ],
  avatar: {
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/large/avatar-20190522180419.jpeg',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/medium/avatar-20190522180419.jpeg',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/original/avatar-20190522180419.jpeg',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/thumb/avatar-20190522180419.jpeg'
  },
  balance: 0,
  birthday: 677462400,
  coins: 57506,
  created_at: 1488173669,
  discount_code_ids: [7776, 44713, 11213],
  district_id: 769,
  earned_coins: 0,
  email: 'user@lixibox.com',
  expert_slug: 'user-lixibox',
  first_name: 'User',
  full_address: 'Qư Dhdb, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
  gender: 1,
  is_admin: true,
  is_expert: true,
  last_name: 'Lixibox',
  membership_level: 1,
  membership_level_started_at: 0,
  mobile_referral_code: 'LIXIU648B',
  name: 'Lixibox User',
  order_statuses: [
    {
      statuses: ['unpaid'],
      title: 'Chưa thanh toán',
      count: 0
    },
    {
      statuses: ['confirmed'],
      title: 'Đã xác nhận',
      count: 0
    },
    {
      statuses: ['paid', 'shipped'],
      title: 'Đang đợi giao hàng',
      count: 0
    },
    {
      statuses: ['fulfilled'],
      title: 'Đã nhận hàng',
      count: 16
    },
    {
      statuses: ['cancelled'],
      title: 'Đã huỷ',
      count: 228
    }
  ],
  orders_count: 251,
  phone: '0987654322',
  province_id: 79,
  referral_code: 'LIXIUD51A',
  store_orders_count: 0,
  ward_id: 9203
};
const boxDiscussions = [
  {
    id: 6452,
    comments: [
      {
        id: 8910,
        avatar: {
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/large/logo_new.png',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/medium/logo_new.png',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/original/logo_new.png',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/thumb/logo_new.png'
        },
        content:
          'Dạ máy không dùng được với các sản phẩm AHA, BHA bạn nhé, vì các chất này hoạt động mạnh, nếu dùng máy đẩy tinh chất sâu vào da sẽ có thể gây tổn thưởng cho da ạ.\r\n',
        created_at: 1609829608,
        user_name: 'Tư Vấn Lixibox'
      },
      {
        id: 8911,
        avatar: {
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/large/logo_new.png',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/medium/logo_new.png',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/original/logo_new.png',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/000/013/thumb/logo_new.png'
        },
        content:
          'Chào bạn, bạn không nên dùng máy với các sản phẩm có chưa AHA/BHA/Retinol mạnh nhé, bạn vui lòng inbox đến https://www.facebook.com/lixiboxvn/ để Lixibox hỗ trợ kiểm tra cho bạn nhé.',
        created_at: 1609829623,
        user_name: 'Tư Vấn Lixibox'
      }
    ],
    content: 'Mình dùng AHA BHA thì dùng máy có vấn đề gì ko ạ?',
    created_at: 1609829279,
    user_avatar: {
      large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A',
      medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A',
      thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A'
    },
    user_name: 'Tomo Aki'
  }
];
const listMenu = {
  browse_nodes: [
    {
      id: 847,
      cover_image: {
        large_url: '/images/large/missing.png'
      },
      icon: {
        large_url: '/icons/large/missing.png',
        medium_url: '/icons/medium/missing.png'
      },
      menu_column: 0,
      name: 'Beauty Box',
      parent_id: null,
      slug: 'beauty-box',
      vn_name: null,
      sub_nodes: [
        {
          id: 848,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'New Beauty Box',
          parent_id: 847,
          slug: 'new-beauty-box',
          vn_name: 'Box mới nhất',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 849,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Bestsellers Beauty Box',
          parent_id: 847,
          slug: 'best-selling-beauty-box',
          vn_name: 'Box bán chạy nhất',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 850,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Makeup box',
          parent_id: 847,
          slug: 'makeup-beauty-box',
          vn_name: 'Box trang điểm',
          sub_nodes: [
            {
              id: 853,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'New Makeup Box',
              parent_id: 850,
              slug: 'new-makeup-beauty-box',
              vn_name: 'Box trang điểm mới nhất',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 856,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Bestsellers Makeup Box',
              parent_id: 850,
              slug: 'best-selling-makeup-beauty-box',
              vn_name: 'Box trang điểm bán chạy nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 851,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Skin Care Box',
          parent_id: 847,
          slug: 'skin-care-beauty-box',
          vn_name: 'Box dưỡng da',
          sub_nodes: [
            {
              id: 854,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'New Skincare Box',
              parent_id: 851,
              slug: 'new-skin-care-beauty-box',
              vn_name: 'Box dưỡng da mới nhất',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 857,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Bestsellers Skincare Box',
              parent_id: 851,
              slug: 'best-selling-skin-care-beauty-box',
              vn_name: 'Box dưỡng da bán chạy nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 852,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Acne Box',
          parent_id: 847,
          slug: 'acne-beauty-box',
          vn_name: 'Box trị mụn',
          sub_nodes: [
            {
              id: 855,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'New Acne Box',
              parent_id: 852,
              slug: 'new-acne-beauty-box',
              vn_name: 'Box trị mụn mới nhất',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 858,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Bestsellers Acne Box',
              parent_id: 852,
              slug: 'best-selling-acne-beauty-box',
              vn_name: 'Box trị mụn bán chạy nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 1173,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Mom & Baby Box',
          parent_id: 847,
          slug: 'mom-and-baby-box',
          vn_name: 'Box Mẹ & Bé ',
          sub_nodes: [],
          activeMenu: false
        }
      ],
      activeMenu: false
    }
  ]
};
const viewGroupTrackingList = {
  '421681106': {
    groupObjectId: 'HomePage',
    trackingCode: null
  }
};
const productByCategory = {
  success: true,
  browse_node: {
    id: 1115,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Bé mặc',
    parent_id: 1108,
    slug: 'be-mac',
    vn_name: 'Apparel and Accessories'
  },
  boxes: [
    {
      id: 11233,
      added_to_waitlist: false,
      badges: {
        message: null,
        top_left: null,
        top_right: null,
        bottom_right: null,
        bottom_left: null
      },
      brand_name: 'To the Stars',
      coins_price: null,
      discount_percent: 0,
      for_redeem: false,
      is_individual: true,
      is_saleable: true,
      like_count: 0,
      lixicoin_bonus: 150,
      name: 'Bộ Liền Bé Trai Kỳ Lân Biển To The Stars 3-6 Tháng',
      original_price: 150000,
      pre_order_release_date: null,
      pre_order_status: null,
      price: 150000,
      price_sale_off: 0,
      primary_picture: {
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/782/facebook/1600229652.jpg?t=1609908081',
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/782/large/1600229652.jpg?t=1609908081',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/782/medium/1600229652.jpg?t=1609908081',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/782/original/1600229652.jpg?t=1609908081',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/782/thumb/1600229652.jpg?t=1609908081'
      },
      rating: {
        avg_rate: 0,
        count: 0
      },
      short_description:
        'Bộ sưu tập Sealove của To The Stars với họa tiết dễ thương, truyền cảm hứng từ tình yêu của mẹ và thấu hiểu những khát khao mong muốn đem đến che chở, an toàn cho bé yêu. Chất liệu luôn được xem là ưu tiên hàng đầu của To The Stars, được làm từ 100% sợi bông cotton tự nhiên mềm mại, thoáng mát, thấm hút mồ hôi, co giãn giúp bé cử động thoải mái khám phá thế giới bên ngoài, nâng niu làn da mỏng manh, nhạy cảm của trẻ sơ sinh. Sản phẩm đạt tiêu chuẩn OEKO-TEX 100 - chứng chỉ quốc tế cho sản phẩm an toàn trong may mặc, hoàn toàn không sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, không hoá chất nhuộm trong công nghiệp. Từng đường may, mũi chỉ đều được kiểm soát chặt chẽ về chất lượng, đáp ứng được yêu cầu của cả những mẹ khó tính và khắt khe nhất trong việc lựa chọn đồ dùng cho bé yêu của mình. Thiết kế một mảnh liền nhẹ nhàng giữ ấm cho bụng và lưng bé. Cổ áo envelope và nút bấm không có chứa nickel tại đủng quần được cải tiến, giúp ba mẹ dễ dàng mặc đồ và thay bỉm cho bé.',
      slug: 'baby-boy-onesie-3-6m-narwhal',
      stock: 10,
      variant_options: [
        {
          box_id: 11209,
          box_slug: 'baby-boy-onesie',
          name: '',
          presentation: 'Good boy',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/818/thumb/1600245733.jpg?t=1609908082'
        },
        {
          box_id: 11210,
          box_slug: 'baby-boy-onesie-0-3m',
          name: '',
          presentation: 'Star',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/815/thumb/1600245604.jpg?t=1609908081'
        },
        {
          box_id: 11211,
          box_slug: 'baby-boy-onesie-3-6m',
          name: '',
          presentation: 'Narwhal',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/812/thumb/1600245494.jpg?t=1609908081'
        },
        {
          box_id: 11212,
          box_slug: 'baby-boy-onesie-6-9m',
          name: '',
          presentation: 'Good boy',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/809/thumb/1600245425.jpg?t=1609908082'
        },
        {
          box_id: 11213,
          box_slug: 'baby-boy-onesie-9-12m',
          name: '',
          presentation: 'Star',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/804/thumb/1600245163.jpg?t=1609908081'
        },
        {
          box_id: 11230,
          box_slug: 'baby-boy-onesie-0-3m-narwhal',
          name: '',
          presentation: 'Narwhal',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/799/thumb/1600244978.jpg?t=1609908081'
        },
        {
          box_id: 11231,
          box_slug: 'baby-boy-onesie-3-6m-good-boy',
          name: '',
          presentation: 'Good boy',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/788/thumb/1600229853.jpg?t=1609908082'
        },
        {
          box_id: 11232,
          box_slug: 'baby-boy-onesie-3-6m-star',
          name: '',
          presentation: 'Star',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/785/thumb/1600229757.jpg?t=1609908081'
        },
        {
          box_id: 11233,
          box_slug: 'baby-boy-onesie-3-6m-narwhal',
          name: '',
          presentation: 'Narwhal',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/782/thumb/1600229652.jpg?t=1609908081'
        },
        {
          box_id: 11234,
          box_slug: 'baby-boy-onesie-6-9m-good-boy',
          name: '',
          presentation: 'Good boy',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/779/thumb/1600229359.jpg?t=1609908082'
        },
        {
          box_id: 11235,
          box_slug: 'baby-boy-onesie-6-9m-star',
          name: '',
          presentation: 'Star',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/776/thumb/1600229228.jpg?t=1609908081'
        },
        {
          box_id: 11236,
          box_slug: 'baby-boy-onesie-6-9m-narwhal',
          name: '',
          presentation: 'Narwhal',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/773/thumb/1600229111.jpg?t=1609908081'
        },
        {
          box_id: 11237,
          box_slug: 'baby-boy-onesie-9-12m-good-boy',
          name: '',
          presentation: 'Good boy',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/770/thumb/1600228621.jpg?t=1609908082'
        },
        {
          box_id: 11238,
          box_slug: 'baby-boy-onesie-9-12m-star',
          name: '',
          presentation: 'Star',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/767/thumb/1600228378.jpg?t=1609908081'
        },
        {
          box_id: 11239,
          box_slug: 'baby-boy-onesie-9-12m-narwhal',
          name: '',
          presentation: 'Narwhal',
          color_code: null,
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/764/thumb/1600228062.jpg?t=1612255950'
        }
      ],
      variants: {
        colors: []
      }
    }
  ],
  available_filters: {
    brands: [
      {
        brand_id: 816,
        brand_slug: 'lullaby',
        brand_name: 'Lullaby',
        brand_logo:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/816/original/logo.png',
        count: 23
      },
      {
        brand_id: 824,
        brand_slug: 'le-coon',
        brand_name: 'LE COON',
        brand_logo:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/824/original/download.png',
        count: 14
      },
      {
        brand_id: 796,
        brand_slug: 'lixi-baby',
        brand_name: 'Lixi Baby',
        brand_logo:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/796/original/Screen_Shot_2020-07-01_at_3.13.50_PM.png',
        count: 10
      }
    ],
    pl: 0,
    ph: 4000
  },
  paging: {
    current_page: 1,
    per_page: 24,
    total_pages: 3
  }
};
const component = (params = {}) => {
  const props = {
    openModal: jest.fn(),
    commentChild: boxDiscussions[0],
    addDiscussionComment: jest.fn(),
    hasLastChild: true,
    userInfo,
    isAddDiscussionCommentSuccess: true,

    type: 'full',
    title: 'List Title',
    viewMore: 'Xem thêm',
    idCategory: 'be-mac',
    column: 4,
    brandShowNumber: 0,
    onSelectSort: jest.fn(),
    onSelectBrand: jest.fn(),
    productByCategory,
    listMenu,
    viewGroupTrackingList,
    likedIdList: [],
    openModalAction: jest.fn(),
    selectGiftAction: jest.fn(),
    likeProductAction: jest.fn(),
    unLikeProductAction: jest.fn(),
    addItemToCartAction: jest.fn(),
    categoryFilterHash: 'UNUSED'
  };

  return withRouter((routerProps) => <ProductList {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
