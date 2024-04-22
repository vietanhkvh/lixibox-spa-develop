export const Constants = {
  success: true,
  phone: '1800 2040',
  enabled_sample: false,
  enabled_onepay: true,
  enabled_same_day_shipping: false,
  enabled_user_pickup_shipping_package: false,
  threshold_to_freeship: 100000,
  threshold_to_free_gift_packing: 800000,
  threshold_to_pick_sample: 1000000,
  threshold_to_cod: 200000,
  marketing_support_shipping_fee: 15000,
  cart_limit_min_item: 1,
  cart_limit_max_item: 100,
  facebook_auth_scope: 'email',
  gift_message_words_limit: 35,
  delivery_note_words_limit: 75,
  gift_price: 30000,
  problem_report_url: 'https://service.lixibox.com/support_requests/new',
  search_input_placeholder: 'Tìm kiếm: son, máy rửa mặt, bình sữa,...',
  accompany_services_description: 'Gói quà - kèm lời chúc,...',
  lixibox_domains: [
    'lixibox.com',
    'lxspa.ml',
    'lvh.me',
    'lxb-stage-mb.cf',
    'lxb-stage-be.cf',
    'lxb-qa.cf',
    'lixibox.app',
    'www.lixibox.com'
  ],
  unboxing_enabled: true,
  lixicoin_share_box: 200,
  moengage_tracking_enabled: true,
  referral: {
    minimum_order_price: 600000,
    referrer: {
      balance: 500000,
      coins: 200
    },
    referred: {
      gift_message: 'Set 4 Lixibox Masks trị giá 120.000đ'
    }
  },
  referrer_reward: {
    balance: 500000,
    coins: null
  },
  unboxing_reward: {
    coins: 150,
    balance: 100000
  },
  box_feedback_lixicoin: 30,
  mobile_referral: {
    gift_name: null,
    gift_message: '',
    reward: 250000,
    minimum_order_price: 1100000,
    notes: [
      'Mã chỉ áp dụng trên ứng dụng Lixibox và cho đơn hàng có số điện thoại chưa từng mua hàng ở Lixibox.',
      'Tiền thưởng và Lixicoin của người giới thiệu sẽ được cộng ngay khi đơn hàng của người được giới thiệu được giao và thanh toán thành công.',
      'Mã ưu đãi không áp dụng cho Beauty Box / Combo sản phẩm có trong đơn hàng.'
    ],
    applicable_message: ''
  },
  mobile_referrer: {
    balance: 500000,
    coins: 200
  },
  bank_account: {
    bank: 'ACB (Ben Chuong Duong/HCM)',
    owner: 'CTCP Sachi',
    number: '258071699'
  },
  games: {
    redeem_coins: 100,
    play_times_per_day_limit: 3
  },
  social_login_services: {
    apple: {
      enabled: true,
      message: ''
    },
    google: {
      enabled: true,
      message: ''
    },
    facebook: {
      enabled: true,
      message: ''
    }
  },
  email_verification_popup_open_times: 3,
  email_update_popup_open_times: 3,
  phone_verification_popup_open_times: 3,
  email_verification_popup_open_times_web: 3,
  email_update_popup_open_times_web: 3,
  phone_verification_popup_open_times_web: 3,
  phone_update_popup_open_times_web: 3
};
