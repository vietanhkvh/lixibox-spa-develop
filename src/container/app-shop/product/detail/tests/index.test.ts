jest.mock('app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import ProductDetailContainer from '../index';
import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_SHOP } from 'flows/shop/reducer';
import { INITIAL_STATE_ERROR } from 'flows/error/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import { INITIAL_STATE_LOVE } from 'flows/love/reducer';
import { INITIAL_STATE_BRAND } from 'flows/brand/reducer';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_PROVINCE } from 'flows/province/reducer';
import { INITIAL_STATE_TRACKING } from 'flows/tracking/reducer';
import { INITIAL_STATE_DISCOUNT_CODE } from 'flows/discount-code/reducer';
const boxFeebBack = {
  '1639542806': {
    success: true,
    feedbacks: [
      {
        id: 111878,
        comments: [],
        created_at: 1679285463,
        feedbackable_id: 16830,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/408/facebook/1676255473.jpg?t=1687599406',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/408/large/1676255473.jpg?t=1687599406',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/408/medium/1676255473.jpg?t=1687599406',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/408/original/1676255473.jpg?t=1687599406',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/408/square/1676255473.jpg?t=1687599406',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/408/thumb/1676255473.jpg?t=1687599406',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/408/vertical/1676255473.jpg?t=1687599406'
        },
        feedbackable_lixibox_id: 'LXA6CA450B7B',
        feedbackable_name:
          'Box Máy tẩy trắng răng Halio Blue Light, Set 7 Miếng Dán Trắng Răng và 2 Bút Tẩy Trắng Răng Halio Brightening The Smile',
        feedbackable_slug:
          'box-may-tay-trang-rang-halio-blue-light-set-7-mieng-dan-trang-rang-va-2-but-tay-trang-rang-halio-brightening-the-smile',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Sản phẩm tốt, hiệu quả sau 3 miếng dán',
        status: 'approved',
        user: {
          id: 404461,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/404/461/large/picture',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/404/461/medium/picture',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/404/461/original/picture',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/404/461/thumb/picture'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/404/461/medium/picture',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/404/461/thumb/picture',
          email: 'tramko3996@gmail.com',
          first_name: 'Ngọc',
          last_name: 'Văn Huân',
          name: 'Văn Huân Ngọc',
          referral_code: 'NGOCA5D2',
          uuid: 'ad78f450-1b7d-11ec-aa2d-02447ca10480'
        }
      }
    ],
    paging: {
      current_page: 1,
      per_page: 10,
      total_pages: 1
    }
  }
};

const component = (params = {}) => {
  const props = {
    shopStore: { ...INITIAL_STATE_SHOP, boxFeebBack },
    errorStore: INITIAL_STATE_ERROR,
    loveStore: INITIAL_STATE_LOVE,
    brandStore: INITIAL_STATE_BRAND,
    userStore: INITIAL_STATE_USER,
    cartStore: INITIAL_STATE_CART,
    authStore: INITIAL_STATE_AUTH,
    provinceStore: INITIAL_STATE_PROVINCE,
    trackingStore: INITIAL_STATE_TRACKING,
    discountCodeStore: INITIAL_STATE_DISCOUNT_CODE,
    signInStatus: INITIAL_STATE_AUTH.signInStatus
  };
  const Component = new ProductDetailContainer(props);
  return Component;
};

describe('ProductDetailContainer', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`modal`, () => {
    reduxRender(component(), { initialState: {} });
    const modal = document.getElementsByClassName('ReactModalPortal')[0];
    expect(modal).toBeInTheDocument();
  });
});
