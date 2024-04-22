export const UserSilver = {
  id: 100000,
  address: 'Số 16 Đường 34, Kp. 2',
  addresses: [
    {
      id: 200000,
      address: 'Số 16 Đường 34, Kp. 2',
      created_at: 1578573080,
      district_id: 769,
      district_name: '2',
      first_name: 'John',
      full_address: 'Số 16 Đường 34, Kp. 2, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
      full_name: 'John Doe',
      is_primary_address: true,
      is_usable: true,
      last_name: 'Doe',
      phone: '0342621234',
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
    large_url: 'https://upload.lixibox.com/system/users/avatars/000/337/441/large/1652173319.jpeg',
    medium_url: 'https://upload.lixibox.com/system/users/avatars/000/337/441/medium/1652173319.jpeg',
    original_url: 'https://upload.lixibox.com/system/users/avatars/000/337/441/original/1652173319.jpeg',
    thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/337/441/thumb/1652173319.jpeg'
  },
  balance: 0,
  birthday: 1274054400,
  cashback: {
    balance_confirmed: 0,
    balance_pending: 0
  },
  coins: 3624,
  created_at: 1574136149,
  discount_code_ids: [],
  district_id: 769,
  earned_coins: 1509,
  email: 'john.doe@lixibox.com',
  email_update_required: false,
  email_verified: true,
  expert_slug: null,
  first_name: 'John',
  full_address: 'Số 16 Đường 34, Kp. 2, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
  gender: 1,
  is_admin: true,
  is_expert: false,
  last_name: 'Doe',
  membership_level: 1,
  membership_level_started_at: 0,
  mobile_referral_code: 'JOHNDX2029',
  name: 'John Doe',
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
      count: 11
    },
    {
      statuses: ['cancelled'],
      title: 'Đã huỷ',
      count: 2
    }
  ],
  orders_count: 13,
  phone: '0342621234',
  phone_verified: true,
  province_id: 79,
  referral_code: 'JOHNDX2029',
  social_accounts: [
    {
      email: '6aeh33ft4v@privaterelay.appleid.com',
      provider: 'apple'
    },
    {
      email: 'john.doe@lixibox.com',
      provider: 'google'
    },
    {
      email: 'john.doe@lixibox.com',
      provider: 'facebook'
    }
  ],
  store_orders_count: 0,
  uuid: 'ab988422-1b7d-11ec-aa2d-02447ca10480',
  ward_id: 9203
};

export const MembershipLevels = [
  {
    name: 'member',
    presentation: 'Member',
    level: 0,
    required_coins: 0,
    benefits: {
      lixicoin_earn_rate: 1,
      free_gift_wrap: 0,
      freeship: false,
      cashback_percentage: 11.0
    }
  },
  {
    name: 'silver',
    presentation: 'Silver',
    level: 1,
    required_coins: 100,
    benefits: {
      lixicoin_earn_rate: 1,
      free_gift_wrap: 0,
      freeship: false,
      cashback_percentage: 11.0
    }
  },
  {
    name: 'gold',
    presentation: 'Gold',
    level: 2,
    required_coins: 5000,
    benefits: {
      lixicoin_earn_rate: 1.5,
      free_gift_wrap: 3,
      freeship: false,
      cashback_percentage: 13.0
    }
  },
  {
    name: 'diamond',
    presentation: 'Diamond',
    level: 3,
    required_coins: 15000,
    benefits: {
      lixicoin_earn_rate: 2,
      free_gift_wrap: 3,
      freeship: true,
      cashback_percentage: 15.0
    }
  }
];
