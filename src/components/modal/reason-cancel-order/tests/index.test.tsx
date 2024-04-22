import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReasonCancelOrderModal from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const orders = [
  {
    id: 288273,
    accompanies: [],
    actions: {
      cancellable: false,
      change_to_cod: false,
      invoice_viewable: false,
      invoice_editable: false,
      invoice_requestable: false
    },
    address: 'Lixi office 15',
    balance_used: 0,
    can_change_to_cod: false,
    cancelled_at: null,
    card_processor: null,
    created_at: 1605072836,
    discount_code: 'BINHNUOC11K',
    discount_price: 69000,
    district_id: 769,
    first_name: 'Thanh',
    fulfilled_at: 1605251523,
    full_address: 'Lixi office 15, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
    gift_message: '',
    gift_price: 0,
    invoice: null,
    ip: null,
    is_freeship: false,
    is_gift: false,
    last_name: 'Thanh',
    mobile_referral_code: null,
    note: '',
    number: 'B866BDB4',
    order_boxes: [
      {
        id: 690899,
        box: {
          id: 11308,
          brand_name: 'Lixibox',
          is_individual: true,
          is_saleable: true,
          name: 'Bình Nước Nhựa Trong Suốt Lixibox',
          original_price: 65000,
          price: 55000,
          primary_picture: {
            facebook_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/519/facebook/1603436220.jpg?t=1612082679',
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/519/large/1603436220.jpg?t=1612082679',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/519/medium/1603436220.jpg?t=1612082679',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/519/original/1603436220.jpg?t=1612082679',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/519/thumb/1603436220.jpg?t=1612082679'
          },
          short_description:
            'Bình Nước Nhựa Trong Suốt Lixibox Thiết kế bình đơn giản với tông màu xanh lá xinh xắn cùng phần thân trong suốt đẹp mắt. Bình nước kèm dây đeo tiện lợi khi mang đi ra ngoài. Có thể sử dụng khi mang đi tập gym-yoga, mang đi học, mang đến nơi làm việc một cách dễ dàng. Ngoài đựng nước lọc ra, còn dùng để làm bình đựng detox giảm cân đẹp da cũng rất phù hợp.',
          slug: 'binh-nuoc-nhua-trong-suot-lixibox',
          status: 'approved'
        },
        coins: 0,
        created_at: 1605072836,
        discount_price: 0,
        is_cancelled: false,
        is_pre_order: false,
        note: null,
        order_id: 288273,
        pre_order_release_date: null,
        price: 80000,
        purchase_type: 0,
        quantity: 1,
        referrer_id: null,
        status: 'created',
        updated_at: 1605072836
      }
    ],
    paid_at: null,
    payment_method: 5,
    phone: '0909012175',
    platform: 'android',
    promotions_price: 0,
    province_id: 79,
    services_price: 0,
    shipments: [
      {
        id: 295667,
        external_service_url: null,
        shipping_service: 'Lixibox',
        status: 'fulfilled',
        tracking_code: 'Lixibox'
      }
    ],
    shipped_at: 1605251494,
    shipping_package_name: 'Giao hàng tiêu chuẩn',
    shipping_price: 10000,
    status: 'fulfilled',
    subtotal_coins: 0,
    subtotal_price: 80000,
    total_coins: 0,
    total_price: 21000,
    updated_at: 1608718369,
    user_id: 112448,
    ward: {
      id: 9203,
      district_id: 769,
      full_name: 'Phường Bình An',
      name: 'Bình An',
      unit: 'Phường'
    },
    ward_id: 9203
  }
];
const cancelOrderReasonList = [
  {
    id: 1,
    content: 'Không có nhu cầu mua nữa'
  },
  {
    id: 2,
    content: 'Đặt trùng'
  },
  {
    id: 3,
    content: 'Không tiện nhận hàng'
  }
];
const component = (params = {}) => {
  const props = {
    data: {
      data: {
        number: orders[0].number,
        cancelOrderAction: jest.fn(),
        cancelOrderReasonList,
        order: orders[0]
      }
    }
  };

  return withRouter((routerProps) => <ReasonCancelOrderModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('ReasonCancelOrderModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
