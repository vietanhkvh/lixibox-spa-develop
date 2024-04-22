import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import AddonItemWithAction from '../component';

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

const component = (params = {}) => {
  const props = {
    product: cartList[0].box,
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      cartList
    }),
    className: ''
  };

  return withRouter((routerProps) => <AddonItemWithAction {...Object.assign({}, props, routerProps, params)} />);
};

describe('AddonItemWithAction', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
