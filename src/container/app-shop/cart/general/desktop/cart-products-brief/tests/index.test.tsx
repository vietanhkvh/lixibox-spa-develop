import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import CartProductsBrief from '../component';

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
      short_description: 'Short description 1',
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
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      cartList
    })
  };

  return withRouter((routerProps) => <CartProductsBrief {...Object.assign({}, props, routerProps, params)} />);
};

describe('CartProductsBrief', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
