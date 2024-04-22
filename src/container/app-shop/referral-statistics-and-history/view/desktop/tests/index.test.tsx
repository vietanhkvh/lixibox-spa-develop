import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { ReferralStatisticsAndHistoryResponseRewardHistory } from '../../../../../../flows/referral/types';
import { reduxRender } from '../../../../../../utils/test-utils';
import { ReferralStatisticsAndHistoryTabs } from '../../../constant';
import View from '..';

const referrals = [
  {
    created_at: 1645595276,
    referee: {
      id: 378496,
      avatar: {
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/378/496/large/1605171296.jpg',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/378/496/medium/1605171296.jpg',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/378/496/original/1605171296.jpg',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/378/496/thumb/1605171296.jpg'
      },
      avatar_medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/378/496/medium/1605171296.jpg',
      avatar_thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/378/496/thumb/1605171296.jpg',
      email: 'hung.diep@lixibox.com',
      first_name: 'Diep',
      last_name: 'Hung',
      name: 'Hung Diep',
      referral_code: 'HUNG5E58',
      uuid: 'f021bcea-19ef-11ec-a8e0-f23c92951603'
    },
    reward_items: [],
    scheme: {
      id: 5,
      banner: {
        height: 0,
        url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/referral/schemes/banners/000/000/005/original/open-uri20220211-14977-gpwswc',
        width: 0
      },
      end_at: 1675962000,
      name: 'Scheme web 1',
      notes: [],
      platform: 'mobile',
      referee: {
        minimum_order_value: 500000,
        rewards: [],
        require_purchases: [],
        conditional_message: 'Buy halio nha',
        reward_message: '60k'
      },
      referrer: {
        rewards: [],
        reward_message: '50k'
      },
      start_at: 1644426000,
      status: 'available'
    },
    status: 'pending'
  },
  {
    created_at: 1645674942,
    referee: {
      id: 3,
      avatar: {
        large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=J',
        medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=J',
        thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=J'
      },
      avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=J',
      avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=J',
      email: 'sao@lixibox.com',
      first_name: 'Jen',
      last_name: 'Lonsdale',
      name: 'Lonsdale Jen',
      referral_code: 'SAOB097',
      uuid: 'e4a6fcc0-19ef-11ec-a8e0-f23c92951603'
    },
    reward_items: [
      {
        reward_amount: 10000,
        rewardable_box: null,
        rewardable_type: 'balance',
        rewardable_voucher: null,
        user: {
          id: 67402,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/large/1600417611.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/medium/1600417611.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/original/1600417611.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/thumb/1600417611.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/medium/1600417611.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/thumb/1600417611.jpg',
          email: 'nhan@lixibox.com',
          first_name: 'Nhân',
          last_name: 'Nguyễn Ngọc',
          name: 'Nguyễn Ngọc Nhân',
          referral_code: 'NHAN2391',
          uuid: 'e700f0be-19ef-11ec-a8e0-f23c92951603'
        }
      },
      {
        reward_amount: 8000,
        rewardable_box: null,
        rewardable_type: 'coins',
        rewardable_voucher: null,
        user: {
          id: 67402,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/large/1600417611.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/medium/1600417611.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/original/1600417611.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/thumb/1600417611.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/medium/1600417611.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/thumb/1600417611.jpg',
          email: 'nhan@lixibox.com',
          first_name: 'Nhân',
          last_name: 'Nguyễn Ngọc',
          name: 'Nguyễn Ngọc Nhân',
          referral_code: 'NHAN2391',
          uuid: 'e700f0be-19ef-11ec-a8e0-f23c92951603'
        }
      },
      {
        reward_amount: null,
        rewardable_box: null,
        rewardable_type: 'DiscountCode',
        rewardable_voucher: {
          id: 51260,
          amount: 50000,
          available: false,
          available_message: 'Ngoài thời gian sử dụng',
          code: 'F677874',
          description: 'Tết 2021: Lixibox lì xì bạn 50K khi mua đơn hàng 200K (HSD: 31/3)',
          end_date: 1617209940,
          is_expired: true,
          maximum_value: null,
          minimum_value: null,
          order_price_max: null,
          order_price_min: 200000,
          start_date: null,
          unit: 'vnd',
          usage_limit: 1,
          usage_limit_per_user: 1,
          user_levels: []
        },
        user: {
          id: 67402,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/large/1600417611.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/medium/1600417611.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/original/1600417611.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/thumb/1600417611.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/medium/1600417611.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/067/402/thumb/1600417611.jpg',
          email: 'nhan@lixibox.com',
          first_name: 'Nhân',
          last_name: 'Nguyễn Ngọc',
          name: 'Nguyễn Ngọc Nhân',
          referral_code: 'NHAN2391',
          uuid: 'e700f0be-19ef-11ec-a8e0-f23c92951603'
        }
      }
    ],
    scheme: {
      id: 5,
      banner: {
        height: 0,
        url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/referral/schemes/banners/000/000/005/original/open-uri20220211-14977-gpwswc',
        width: 0
      },
      end_at: 1675962000,
      name: 'Scheme web 1',
      notes: [],
      platform: 'mobile',
      referee: {
        minimum_order_value: 500000,
        rewards: [],
        require_purchases: [],
        conditional_message: 'Buy halio nha',
        reward_message: '60k'
      },
      referrer: {
        rewards: [],
        reward_message: '50k'
      },
      start_at: 1644426000,
      status: 'available'
    },
    status: 'pending'
  }
] as unknown as Array<ReferralStatisticsAndHistoryResponseRewardHistory>;

const statistics = {
  total_rewarded_coins: 21000,
  total_rewarded_balance: 22000
};

const component = (params = {}) => {
  const props = {
    isLoaded: true,
    statistics,
    referrals,
    tabs: ReferralStatisticsAndHistoryTabs,
    onTabSelect: jest.fn()
  };

  return withRouter((routerProps) => <View {...Object.assign({}, props, routerProps, params)} />);
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
