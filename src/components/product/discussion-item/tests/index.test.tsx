jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductDiscussionItem from '..';

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
const component = (params = {}) => {
  const props = {
    openModal: jest.fn(),
    commentChild: boxDiscussions[0],
    addDiscussionComment: jest.fn(),
    hasLastChild: true,
    userInfo,
    isAddDiscussionCommentSuccess: true
  };

  return <ProductDiscussionItem {...Object.assign({}, props, params)} />;
};

describe('ProductDiscussionItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
