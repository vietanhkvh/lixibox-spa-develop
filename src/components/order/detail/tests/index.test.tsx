jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import OrderDetail from '..';
import { ORDER_TYPE } from 'constants/application/order';

const data = {
  id: 298795,
  accompanies: [],
  actions: {
    cancellable: true,
    change_to_cod: false,
    invoice_viewable: false,
    invoice_editable: false,
    invoice_requestable: true
  },
  address: ' kid iw id iw fiw f oiw if',
  balance_used: 0,
  can_change_to_cod: false,
  cancelled_at: null,
  card_processor: null,
  created_at: 1611650482,
  discount_code: '',
  discount_price: 0,
  district_id: 760,
  first_name: 'odq',
  fulfilled_at: null,
  full_address: ' kid iw id iw fiw f oiw if, Phường Bến Thành, Quận 1, Thành Phố Hồ Chí Minh',
  gift_message: '',
  gift_price: 0,
  invoice: null,
  ip: null,
  is_freeship: false,
  is_gift: false,
  last_name: 'wd fowfiowf iowa',
  mobile_referral_code: null,
  note: '',
  number: 'F5CBCC73',
  order_boxes: [
    {
      id: 719500,
      box: {
        id: 10173,
        brand_name: 'Chacott',
        is_individual: true,
        is_saleable: true,
        name: 'Nước Tẩy Trang Chuyên Dụng Chacott for Professionals Cleansing Water 500ml',
        original_price: 600000,
        price: 449000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/facebook/1604984437.jpg?t=1611650484',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/large/1604984437.jpg?t=1611650484',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/medium/1604984437.jpg?t=1611650484',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/original/1604984437.jpg?t=1611650484',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/thumb/1604984437.jpg?t=1611650484'
        },
        short_description:
          'Nước tẩy trang CHACOTT for Professionals là nước tẩy trang dành cho da nhạy cảm và da mụn, cực kỳ dịu nhẹ và không gây kích ứng. - Sản phẩm cực kỳ dịu nhẹ nhưng dễ dàng loại bỏ những lớp make up nặng đô và gan lì nhất nhớ chứa phân tử nước siêu vi RO – được nghiên cứu và phát triển bởi cơ quan hàng không vũ trụ Mỹ NASA. Công nghệ RO hiện nay là công nghệ lọc nước tiên tiến nhất, những phân tử nước lọc qua công nghệ này nhỏ hơn 500.000 lần so với sợi tóc con người, có thể len sâu và làm sạch kể cả những vùng dưới sâu bề mặt da. - Không chỉ thế, với thành phần chủ yếu là chiết xuất thực vật và chứa nhiều chất dưỡng ẩm tự nhiên cho da. - Chiết xuất cây hương thảo có tác dụng kháng khuẩn và chống kích ứng da, làm dịu các vết thương do mụn gây ra. Bên cạnh đó, hương thảo còn có khả năng chống oxi hóa tuyệt vời, giúp bạn chống lại những dấu hiệu của lão hóa đó nha. - Chiết xuất từ hoa cúc La Mã có chứa rất nhiều vitamin B giúp làm dịu da và giữ ẩm hiệu quả. - Chiết xuất từ nha đam chiết xuất từ nha đam có tác dụng dưỡng ẩm. Hỗ trợ cho da bạn luôn mịn màng và tránh được tình trạng khô da khi tẩy trang. CÔNG DỤNG: - Chacott có thể dùng như 1 loại toner/essence và hoàn toàn không cần phải rửa lại với nước hay sữa rửa mặt. - Loại sạch bụi bẩn như một loại sửa rửa mặt chuyên dụng. - Đánh bay lớp trang điểm chai lì nhất. - An toàn trên da nhạy cảm và da mụn. - Làm sạch và se khít từng lỗ chân lông. - Dùng ngay các bước skincare ngay sau đó. - Dịu nhẹ làn da và dưỡng ẩm tối ưu. - Thích hợp cho cả mắt và mi mắt. * Được nhập khẩu và phân phối chính hãng bởi Lixibox',
        slug: 'chacott-for-professionals-cleansing-water-500ml',
        status: 'approved'
      },
      coins: 0,
      created_at: 1611650482,
      discount_price: 0,
      is_cancelled: false,
      is_pre_order: false,
      note: null,
      order_id: 298795,
      pre_order_release_date: null,
      price: 449000,
      purchase_type: 0,
      quantity: 1,
      referrer_id: null,
      status: 'created',
      updated_at: 1611650482
    }
  ],
  paid_at: null,
  payment_method: 5,
  phone: '0344444444',
  platform: 'mobile_web',
  promotions_price: 0,
  province_id: 79,
  services_price: 0,
  shipments: [
    {
      id: 306652,
      external_service_url: null,
      shipping_service: null,
      status: 'created',
      tracking_code: null
    }
  ],
  shipping: {
    id: 4,
    code: 'grab',
    description: 'Giao hàng siêu tốc với GrabExpress cho các quận ở HCM. Áp dụng cho đơn hàng thanh toán trước.',
    name: 'Grab',
    price: 50000,
    time: {
      min: 1614927450,
      max: 1615186650
    }
  },
  shipped_at: null,
  shipping_package_name: 'Giao hàng tiêu chuẩn',
  shipping_price: 0,
  status: 'unpaid',
  subtotal_coins: 0,
  subtotal_price: 449000,
  total_coins: 0,
  total_price: 449000,
  updated_at: 1611650482,
  user_id: 337441,
  ward: {
    id: 9081,
    district_id: 760,
    full_name: 'Phường Bến Thành',
    name: 'Bến Thành',
    unit: 'Phường'
  },
  ward_id: 9081
};

const mockShipments = [
  {
    shipping_service: 'Service A',
    external_service_url: 'https://example.com/service-a'
  },
  {
    shipping_service: 'Service B',
    external_service_url: 'https://example.com/service-b'
  },
  {
    shipping_service: 'Service C',
    external_service_url: 'https://example.com/service-c'
  }
];

const constants = {
  success: true,
  phone: '1800 2040',
  enabled_sample: true,
  enabled_onepay: true,
  enabled_same_day_shipping: false,
  enabled_user_pickup_shipping_package: false,
  threshold_to_freeship: 199000,
  threshold_to_free_gift_packing: 800000,
  threshold_to_pick_sample: 1000000,
  threshold_to_cod: 200000,
  cart_limit_min_item: 1,
  cart_limit_max_item: 100,
  facebook_auth_scope: 'email,user_birthday',
  gift_message_words_limit: 75,
  delivery_note_words_limit: 75,
  gift_price: 30000,
  problem_report_url: 'https://service.lixibox.com/support_requests/new',
  search_input_placeholder: 'Tìm kiếm: son, máy rửa mặt, bình sữa,...',
  accompany_services_description: 'Gói quà - kèm lời chúc,...',
  referral: {
    minimum_order_price: 600000,
    referrer: {
      balance: 50000,
      coins: 200
    },
    referred: {
      gift_message: 'Set 4 Lixibox Masks trị giá 120.000đ'
    }
  },
  mobile_referral: {
    gift_name: null,
    gift_message: '',
    reward: 100000,
    minimum_order_price: 600000
  },
  mobile_referrer: {
    balance: 50000,
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
  }
};
const handleGetMomoPaymentAddressUrl = jest.fn();
const handleChangeToCOD = jest.fn();
const handleCancelOrder = jest.fn();
const style = {};

const props = {
  data,
  constants,
  handleGetMomoPaymentAddressUrl,
  handleChangeToCOD,
  handleCancelOrder,
  style
};

const component = (params = {}) => {
  return <OrderDetail {...Object.assign({}, props, params)} />;
};

const innerWidthMock = jest.fn();
Object.defineProperty(window, 'innerWidth', {
  get: innerWidthMock
});

describe('OrderDetail', () => {
  describe('mobile layout', () => {
    test(`renders`, () => {
      innerWidthMock.mockReturnValueOnce(320);
      expect(() => {
        reduxRender(component(), { initialState: {} });
      }).not.toThrow();
    });
    test(`display shipping service if shipments existed`, () => {
      innerWidthMock.mockReturnValueOnce(320);
      const { container } = reduxRender(
        <OrderDetail {...{ ...props, data: { ...data, shipments: mockShipments } }} />,
        {
          initialState: {}
        }
      );

      const links = container.querySelectorAll('.generalRowBoldText');
      expect(links.length).toBe(mockShipments.length);
    });

    test(`renders accompanying services correctly when accompanies prop is provided`, () => {
      innerWidthMock.mockReturnValueOnce(320);
      const { getByText } = reduxRender(
        <OrderDetail
          {...{
            ...props,
            data: {
              ...data,
              accompanies: [
                {
                  id: 1,
                  external: { name: 'External Service Name' },
                  fee: 10,
                  linked_object: { name: 'Linked Object Name' },
                  note: 'Additional Note'
                }
              ]
            },
            constants: {
              accompany_services_description: 'Description of accompanying services'
            }
          }}
        />,
        {
          initialState: {}
        }
      );

      expect(getByText('Dịch vụ kèm theo')).toBeInTheDocument();
      expect(getByText('Linked Object Name')).toBeInTheDocument();
      expect(getByText('Lựa chọn: External Service Name')).toBeInTheDocument();
      expect(getByText('Additional Note')).toBeInTheDocument();
    });

    test('render QR code if "payment_qr" exists', () => {
      innerWidthMock.mockReturnValueOnce(320);
      const { container } = reduxRender(
        <OrderDetail
          {...{
            ...props,
            data: {
              ...data,
              payment_method: 2,
              payment_qr: 'this-is-the-qr-code',
              status: ORDER_TYPE.UNPAID
            }
          }}
        />,
        {
          initialState: {}
        }
      );

      expect(container.getElementsByClassName('dividerText')[0]).toBeInTheDocument();
    });
  });

  describe('desktop layout', () => {
    innerWidthMock.mockReturnValueOnce(1200);
    test(`renders`, () => {
      expect(() => {
        reduxRender(component(), { initialState: {} });
      }).not.toThrow();
    });

    test(`display shipping service if shipments existed`, () => {
      const { container } = reduxRender(
        <OrderDetail {...{ ...props, data: { ...data, shipments: mockShipments } }} />,
        {
          initialState: {}
        }
      );

      const links = container.querySelectorAll('.generalRowBoldText');
      expect(links.length).toBe(mockShipments.length);
    });

    test(`renders accompanying services correctly when accompanies prop is provided`, () => {
      const { getByText } = reduxRender(
        <OrderDetail
          {...{
            ...props,
            data: {
              ...data,
              accompanies: [
                {
                  id: 1,
                  external: { name: 'External Service Name' },
                  fee: 10,
                  linked_object: { name: 'Linked Object Name' },
                  note: 'Additional Note'
                }
              ]
            },
            constants: {
              accompany_services_description: 'Description of accompanying services'
            }
          }}
        />,
        {
          initialState: {}
        }
      );

      expect(getByText('Dịch vụ kèm theo')).toBeInTheDocument();
      expect(getByText('Linked Object Name')).toBeInTheDocument();
      expect(getByText('Lựa chọn: External Service Name')).toBeInTheDocument();
      expect(getByText('Additional Note')).toBeInTheDocument();
    });

    test('render QR code if "payment_qr" exists', () => {
      const { container } = reduxRender(
        <OrderDetail
          {...{
            ...props,
            data: {
              ...data,
              payment_method: 2,
              payment_qr: 'this-is-the-qr-code',
              status: ORDER_TYPE.UNPAID
            }
          }}
        />,
        {
          initialState: {}
        }
      );

      expect(container.getElementsByClassName('dividerText')[0]).toBeInTheDocument();
    });
  });
});
