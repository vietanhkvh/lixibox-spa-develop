import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';
import { PURCHASE_TYPE } from '../../../../constants/application/purchase';
import ProductSlider from '..';

const addonList = [
  {
    id: 11332,
    brand_name: 'Lixibox',
    is_individual: true,
    is_saleable: true,
    name: 'Túi Tote Lixibox - TÚI ĐỰNG "ĐỒ"',
    original_price: 80000,
    price: 45000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/524/facebook/1603437257.jpg?t=1612082681',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/524/large/1603437257.jpg?t=1612082681',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/524/medium/1603437257.jpg?t=1612082681',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/524/original/1603437257.jpg?t=1612082681',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/524/thumb/1603437257.jpg?t=1612082681'
    },
    short_description:
      'Túi Tote là một trong những món phụ kiện thời trang không thể thiếu của các cô nàng yêu thích sự giản dị và tiện lợi. Chiếc túi vải dày dặn đa năng thích hợp cho đi học, đi làm, đi chơi mà không phải cầm mang những vật dụng linh tinh vướng víu. Hãy chọn cho mình 1 chiếc túi hợp dáng người để làm tăng vẻ đẹp của trang phục bạn mặc tạo ấn tượng trong mắt người đối diện bạn nhé.',
    slug: 'qua-tang-tui-tote-tui-dung-do',
    status: 'approved'
  },
  {
    id: 11308,
    brand_name: 'Lixibox',
    is_individual: true,
    is_saleable: true,
    name: 'Bình Nước Nhựa Trong Suốt Lixibox',
    original_price: 65000,
    price: 45000,
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
  }
];
const likedIdList = [9962, 10329];
const component = (params = {}) => {
  const props = {
    title: 'Slider Title',
    description: 'Slider description',
    isShowHeader: true,
    isCustomTitle: true,
    column: 4,
    viewMoreText: 'View More',
    viewMoreLink: '/',
    isShowViewMore: true,
    type: 'full',
    data: addonList,
    isShowQuickView: true,
    isShowQuickBuy: true,
    isShowLike: true,
    displayCartSumaryOption: true,
    lineTextNumber: 3,
    isShowPagination: true,
    isShowCurrentPrice: true,
    isShowRating: true,
    isShowHorizontal: true,
    isShowImage: true,
    purchaseType: PURCHASE_TYPE.ADDON,
    isShowCartSummary: true,
    isSpecialAddOn: false,
    cartStore: INITIAL_STATE_CART,
    likedIdList,
    openAlertAction: jest.fn(),
    openModalAction: jest.fn(),
    closeModalAction: jest.fn(),
    selectGiftAction: jest.fn(),
    selectSpecialAddOnAction: jest.fn(),
    likeProductAction: jest.fn(),
    unLikeProductAction: jest.fn(),
    addItemToCartAction: jest.fn(),
    handleSelectProductId: jest.fn(),
    productIdSelected: '',
    referrerTracking: {}
  };

  return withRouter((routerProps) => <ProductSlider {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
