import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import SampleRedeemPrompt from '../container';

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

const cartList = [
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
    quantity: 1,
    referrer_id: null,
    removable: true,
    updated_at: 1631667690
  }
];

const cartSampleList = [
  {
    id: 10126,
    avg_rate: 5,
    brand_name: 'Charlotte Tilbury',
    coins_price: 83000,
    for_redeem: true,
    is_individual: true,
    is_saleable: false,
    like_count: 10,
    name: 'Kem Dưỡng Da Xóa Nếp Nhăn Tăng Cường Độ Ẩm Charlotte’s Magic Cream 50ml',
    original_price: 2500000,
    price: 2500000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/facebook/1570421454.jpg?t=1617778088',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/large/1570421454.jpg?t=1617778088',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/medium/1570421454.jpg?t=1617778088',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/original/1570421454.jpg?t=1617778088',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/square/1570421454.jpg?t=1617778088',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/thumb/1570421454.jpg?t=1617778088',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/vertical/1570421454.jpg?t=1617778088'
    },
    rating: {
      avg_rate: 5,
      count: 1
    },
    short_description:
      "Kem dưỡng Charlotte Tilbury Charlotte's Magic Cream Ngoài dòng son và các sản phẩm trang điểm nổi trội, Charlotte Tilbury cũng cực kỳ thành công với các dòng dưỡng da của mình. Kem dưỡng da Charlotte’s Magic Cream là sản phẩm kem dưỡng đang cực hot với khả năng sản xuất collage và năng lượng tế bảo, sản phẩm giúp làm chống lại sự xuất hiện các nếp nhăn, tăng cường độ ẩm cho làn da, giúp da luôn rạng rỡ. Kem dưỡng da Charlotte’s Magic Cream với công thức Instant Turnaround Moisturiser Hydratant Instantané được ví như phép lạ cho làn da, Magic Cream chứa đựng bí quyết chống lão hoá, bổ sung dưỡng chất cải thiện làn da hư tổn, không đều màu thiếu sức sống trở nên rạng rỡ và ngậm nước tuyệt hảo nuôi dưỡng da từ sâu bên trong. Sản phẩm có kết cấu kem mỏng mịn, thành phần bao gồm BioNymph Peptide Complex với khả năng kích thích tế bào sản sinh collagen và năng lượng tế bào, giúp ngăn chặn nếp nhăn. Công thức sản phẩm còn chứa Hyaluronic Axit như một tấm màng giúp giữ ẩm cho làn da, cho da luôn căng mượt. Có chứa dầu dâu tằm kết hợp cùng Vitamin E sẽ mang đến cho bạn một làn da cực kì rạng rỡ, phục hồi làn da khi bạn thiếu ngủ hay căng thẳng. Sản phẩm rất thích hợp khi thời tiết hanh khô hay trong môi trường điều hòa, máy lạnh cả ngày. Kem dưỡng da dưỡng ẩm với các vitamin và oil cần thiết giúp da phục hồi, căng đầy và nuôi dưỡng da chống lão hoá. chất kem cực kì mềm mượt, dưỡng ẩm tối đa và thẩm thấu cực nhanh làm cho làn da mềm mượt, glowy suốt. Có thể dùng trước khi makeup 1 tiếng để da thật căng mọng nha.",
    slug: 'charlotte-tilbury-charlottes-magic-cream-50-ml',
    status: 'rejected',
    stock: 0
  },
  {
    id: 10172,
    avg_rate: 0,
    brand_name: 'Sephora',
    coins_price: 67000,
    for_redeem: true,
    is_individual: true,
    is_saleable: false,
    like_count: 31,
    name: 'Bộ trang điểm Sephora Favorites The Next Big Thing 2019',
    original_price: 2000000,
    price: 2000000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/facebook/1572936315.jpg?t=1619060135',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/large/1572936315.jpg?t=1619060135',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/medium/1572936315.jpg?t=1619060135',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/original/1572936315.jpg?t=1619060135',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/square/1572936315.jpg?t=1619060135',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/thumb/1572936315.jpg?t=1619060135',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/vertical/1572936315.jpg?t=1619060135'
    },
    rating: {
      avg_rate: 0,
      count: 0
    },
    short_description:
      '- 0.05 oz/ 1.5 g Artist Couture Diamond Lights Finisher in Spotlight Glitz (silver and pink reflects) - 0.17 oz/ 5 g Kaja Cheeky Stamp Blendable Blush in 04 Feisty (cool raspberry) - 0.14 oz/ 4.05 g Melt Cosmetics Lipstick in Old Rose (dusty rose) - 0.141 oz/ 4 g Natasha Denona Mini Diamond & Glow Cheek Duo - 0.085 oz/ 2.5 g Violet Voss Eye Glitter Topper in Dream (opaque rose gold with silver shimmer) - 0.17 oz/ 5 mL FARSÁLI Liquid Glass Radiance Serum - 0.21 oz/ 6 g Milk Makeup Cooling Water Mini',
    slug: 'sephora-favorites-the-next-big-thing-2019',
    status: 'rejected',
    stock: 0
  }
];

const component = (params = {}) => {
  const props = {
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      cartDetail,
      cartList,
      cartSampleList
    })
  };

  return withRouter((routerProps) => <SampleRedeemPrompt {...Object.assign({}, props, routerProps, params)} />);
};

describe('SampleRedeemPrompt', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
