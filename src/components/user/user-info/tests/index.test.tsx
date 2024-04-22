import { reduxRender } from 'utils/test-utils';
import UserInfo from '../component';

jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const userProfile = {
  list: {
    id: 337445,
    address: 'fonero o ergor e ogior',
    addresses: [
      {
        id: 469741,
        address: 'Số 15 Đường 34, Kp. 2',
        created_at: 1578573080,
        district_id: 769,
        district_name: '2',
        first_name: 'Shakil',
        full_address: 'Số 15 Đường 34, Kp. 2, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
        full_name: 'Shakil Shakil',
        is_primary_address: false,
        is_usable: true,
        last_name: 'Shakil',
        phone: '0342623003',
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
      large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S',
      medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S',
      thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S'
    },
    balance: null,
    birthday: 667872000,
    coins: 1460,
    created_at: 1574136149,
    discount_code_ids: [],
    district_id: 770,
    earned_coins: 0,
    email: 'zzz@lixibox.com',
    expert_slug: null,
    first_name: 'ZZZ',
    full_address: 'fonero o ergor e ogior, Phường 06, Quận 3, Thành Phố Hồ Chí Minh',
    gender: 1,
    is_admin: true,
    is_expert: false,
    last_name: 'ZZZ',
    membership_level: 1,
    membership_level_started_at: 0,
    mobile_referral_code: 'DNWOW099',
    name: 'ZZZ ZZZ',
    order_statuses: [
      {
        statuses: ['unpaid'],
        title: 'Chưa thanh toán',
        count: 14
      },
      {
        statuses: ['confirmed'],
        title: 'Đã xác nhận',
        count: 1
      },
      {
        statuses: ['paid', 'shipped'],
        title: 'Đang đợi giao hàng',
        count: 0
      },
      {
        statuses: ['fulfilled'],
        title: 'Đã nhận hàng',
        count: 3
      },
      {
        statuses: ['cancelled'],
        title: 'Đã huỷ',
        count: 1
      }
    ],
    orders_count: 19,
    phone: '0342623005',
    province_id: 79,
    referral_code: 'JOWEWAF9F',
    store_orders_count: 0,
    ward_id: 9218
  }
};
const component = (params = {}) => {
  const props = {
    userInfo: userProfile.list,
    memberShipInfo: [
      {
        name: 'member',
        presentation: 'Member',
        level: 0,
        required_coins: 0,
        benefits: { lixicoin_earn_rate: 1, free_gift_wrap: 0, freeship: false, cashback_percentage: 6 }
      },
      {
        name: 'silver',
        presentation: 'Silver',
        level: 1,
        required_coins: 100,
        benefits: { lixicoin_earn_rate: 1, free_gift_wrap: 0, freeship: false, cashback_percentage: 6 }
      },
      {
        name: 'gold',
        presentation: 'Gold',
        level: 2,
        required_coins: 5000,
        benefits: { lixicoin_earn_rate: 1.5, free_gift_wrap: 3, freeship: false, cashback_percentage: 8 }
      },
      {
        name: 'diamond',
        presentation: 'Diamond',
        level: 3,
        required_coins: 15000,
        benefits: { lixicoin_earn_rate: 2, free_gift_wrap: 3, freeship: true, cashback_percentage: 10 }
      }
    ],
    style: {},
    getEmailVerificationAction: jest.fn(),
    requestPhoneVerificationOtpAction: jest.fn()
  };

  return <UserInfo {...Object.assign({}, props, params)} />;
};

describe('UserInfo', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
  test(`renders without StatSection`, () => {
    expect(() => {
      reduxRender(component(), {
        initialState: {
          isDisplayStatSection: false
        }
      });
    }).not.toThrow();
  });

  test(`renders memberhsip empty`, () => {
    expect(() => {
      reduxRender(component(), {
        initialState: {
          memberShipInfo: []
        }
      });
    }).not.toThrow();
  });
});
