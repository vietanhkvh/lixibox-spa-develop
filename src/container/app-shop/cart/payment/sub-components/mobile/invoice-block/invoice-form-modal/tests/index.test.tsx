import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../../../flows/cart/reducer';
import InvoiceFormModal from '../component';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const cartDetail = {
  id: 10001102,
  accompanies: [],
  address: 'fonero o ergor e ogior',
  address_id: 570818,
  auto_add_gifts: true,
  available_payment_methods: [
    {
      id: 5,
      code: 5,
      description:
        'Bạn sẽ thanh toán bằng tiền mặt cho nhân viên khi giao hàng. Vui lòng kiểm tra số lượng, tình trạng sản phẩm và số tiền trong đơn hàng khi thanh toán.',
      disable_reason: null,
      enabled: true,
      image_url: 'https://service.lixibox.com/images/mobile/cod.png',
      name: 'Tiền mặt'
    },
    {
      id: 6,
      code: 6,
      description: 'Thanh toán bằng ví điện tử MoMo',
      disable_reason: null,
      enabled: true,
      image_url: 'https://service.lixibox.com/images/mobile/momo.png',
      name: 'Ví MoMo'
    },
    {
      id: 2,
      code: 2,
      description:
        'Hướng dẫn chuyển khoản sẽ được thông báo sau khi bạn hoàn tất đặt hàng trên màn hình và qua tin nhắn hoặc địa chỉ email.',
      disable_reason: null,
      enabled: true,
      image_url: 'https://service.lixibox.com/images/mobile/bank.png',
      name: 'Chuyển khoản'
    },
    {
      id: 3,
      code: 3,
      description:
        'Thanh toán bảo mật qua cổng OnePAY\n Lưu ý: thẻ ATM của bạn phải đăng ký sử dụng internet banking để hoàn tất dịch vụ này.',
      disable_reason: null,
      enabled: true,
      image_url: 'https://service.lixibox.com/images/mobile/atm.png',
      name: 'Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)'
    },
    {
      id: 4,
      code: 4,
      description: 'Thanh toán bảo mật qua cổng OnePAY.',
      disable_reason: null,
      enabled: true,
      image_url: 'https://service.lixibox.com/images/mobile/credit-card.png',
      name: 'Thanh toán bằng thẻ quốc tế Visa, Master, JCB'
    }
  ],
  available_shipping_packages: [
    {
      id: 1,
      code: 'standard',
      description:
        'Bạn sẽ thanh toán bằng tiền mặt cho nhân viên khi giao hàng. Vui lòng kiểm tra số lượng, tình trạng sản phẩm và số tiền trong đơn hàng khi thanh toán.',
      disable_reason: '',
      enabled: true,
      name: 'Giao hàng tiêu chuẩn',
      original_price: 10000,
      price: 0,
      time: {
        min: 1632129023,
        max: 1632301823
      }
    }
  ],
  balance_used: 0,
  can_cod: true,
  can_select_add_on: false,
  can_select_gift: false,
  card_processor: null,
  cart_items: [
    {
      id: 2773594,
      box: {
        id: 10694,
        brand_name: 'The Auragins',
        is_individual: true,
        is_saleable: true,
        name: '[Nhập TA88 - FREE quà 105K] Gel rửa mặt làm sạch sâu cho da dầu mụn The Auragins Oil Balancing Gel Cleanser 150ml',
        original_price: 350000,
        price: 280000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/311/facebook/1598843842.png?t=1631262376',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/311/large/1598843842.png?t=1631262376',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/311/medium/1598843842.png?t=1631262376',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/311/original/1598843842.png?t=1631262376',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/311/square/1598843842.png?t=1631262376',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/311/thumb/1598843842.png?t=1631262376',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/311/vertical/1598843842.png?t=1631262376'
        },
        short_description:
          'Sữa rửa mặt The Auragins Oil Balancing Gel Cleanser dịu nhẹ chiết xuất từ tràm trà và rau má, pH đạt chuẩn, cân bằng lượng dầu thừa giúp làm sạch sâu mà không mất đi độ ẩm tự nhiên của làn da. Sữa rửa mặt có kết cấu gel trong suốt nhẹ nhàng làm sạch bụi bẩn, dầu thừa, cặn trang điểm nhưng không làm khô da. Với thành phần chính là Tràm Trà sản phẩm giúp làm sạch sâu và cân bằng lượng dầu thừa trên da. Chiết xuất rau má được ví như vị cứu tinh cho làn da dầu mụn với tính năng ngăn ngừa sự phát triển của mụn và giảm tình trạng sưng viêm, ửng đỏ đồng thời bổ sung Vitamin B5 giúp lưu giữ được độ ẩm tự nhiên cho da - Cảm giác tươi mát, phù hợp với da dầu và da nhạy cảm. Gel rửa mặt lành tính gây ấn tượng với người dùng bởi tiêu chí: không chứa xà phòng (soap free), dầu (oil free), cồn khô, Paraben và màu nhân tạo',
        slug: 'sua-rua-mat-the-auragins-oil-balancing-gel-cleanser-150ml',
        status: 'approved'
      },
      cart_id: 10001102,
      coins: 0,
      created_at: 1631667690,
      discount_message: null,
      discount_price: 0,
      editable: true,
      is_pre_order: false,
      linked_gift_type: null,
      note: '',
      original_price: 350000,
      pre_order_release_date: null,
      price: 280000,
      purchase_type: 0,
      quantity: 4,
      referrer_id: null,
      removable: true,
      updated_at: 1631956219
    },
    {
      id: 2773597,
      box: {
        id: 3377,
        brand_name: 'Halio',
        is_individual: true,
        is_saleable: true,
        name: 'Dây sạc máy rửa mặt Halio Facial Cleansing & Massaging Device đầu USB',
        original_price: 100000,
        price: 100000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/facebook/1491810469.jpg?t=1628770695',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/large/1491810469.jpg?t=1628770695',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/medium/1491810469.jpg?t=1628770695',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/original/1491810469.jpg?t=1628770695',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/square/1491810469.jpg?t=1628770695',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/thumb/1491810469.jpg?t=1628770695',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/599/vertical/1491810469.jpg?t=1628770695'
        },
        short_description: 'Dây sạc máy rửa mặt Halio đầu USB',
        slug: 'day-sac-may-rua-mat-halio-dau-usb',
        status: 'approved'
      },
      cart_id: 10001102,
      coins: 1500,
      created_at: 1631956193,
      discount_message: null,
      discount_price: 0,
      editable: false,
      is_pre_order: null,
      linked_gift_type: null,
      note: 'Chỉ còn 5 trong kho - đặt hàng sớm',
      original_price: 0,
      pre_order_release_date: null,
      price: 0,
      purchase_type: 1,
      quantity: 1,
      referrer_id: null,
      removable: true,
      updated_at: 1631956193
    }
  ],
  cod_min_price: 200000,
  contact_phone: null,
  created_at: 1631605198,
  description: 'Lì xì voucher ĐẾN 200K cho đơn hàng tiếp theo từ 300K, khi mua đơn hàng từ 2 triệu. Nhận lì xì ngay!',
  discount_code: 'MINIBALM',
  discount_price: 0,
  district_id: 770,
  first_name: 'Another',
  full_address: 'fonero o ergor e ogior, Phường 06, Quận 3, Thành Phố Hồ Chí Minh',
  gift_message: '',
  gift_price: 0,
  invoice_requested: false,
  ip: null,
  is_freeship: false,
  is_gift: null,
  last_name: 'User Name',
  lixicoin_bonus: 1135,
  mobile_referral_code: null,
  note: '',
  number: null,
  payment_method: 5,
  phone: '0958858855',
  promotions_price: 0,
  province_id: 79,
  services_price: 0,
  shipping_package: 'standard',
  shipping_package_name: 'Giao hàng tiêu chuẩn',
  shipping_price: 0,
  subtotal_coins: 1500,
  subtotal_price: 1135000,
  total_coins: 1500,
  total_price: 1135000,
  updated_at: 1631956222,
  user_id: 337441,
  ward: {
    id: 9218,
    created_at: '2018-05-28T11:37:03.000+07:00',
    updated_at: '2018-05-28T11:37:03.000+07:00',
    name: '06',
    unit: 'Phường',
    district_id: 770,
    position: 5,
    latitude: '10.78733',
    longitude: '106.6909'
  },
  ward_id: 9218,
  warehouse_id: null
};

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

const invoice = {
  info: {
    name: 'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ VÀ XÂY DỰNG THẮNG LAN',
    email: 'shakil@lixibox.com',
    address: 'Số 187C Đường Đằng Hải, Phường Đằng Hải, Quận Hải An, Hải Phòng',
    code: '0202125435',
    status: 'processing'
  },
  fetching: false,
  updating: false,
  deleting: false,
  loaded: true,
  errored: false
};

const taxCode = {
  index: [
    {
      code: '0202125435',
      name: 'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ VÀ XÂY DỰNG THẮNG LAN',
      address: 'Số 187C Đường Đằng Hải, Phường Đằng Hải, Quận Hải An, Hải Phòng'
    }
  ],
  adding: false,
  loaded: true,
  errored: false
};

const component = (params = {}) => {
  const props = {
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      cartDetail,
      invoice,
      taxCode
    }),
    authStore: Object.assign({}, INITIAL_STATE_AUTH, {
      profile: userProfile
    }),
    fetchTaxCodeDetail: jest.fn(),
    isOpen: true,
    onSubmit: jest.fn(),
    onRequestClose: jest.fn()
  };

  return withRouter((routerProps) => <InvoiceFormModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('InvoiceFormModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
