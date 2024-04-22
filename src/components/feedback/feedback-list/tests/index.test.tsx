jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FeedbackList from '../component';

const _boxesToFeedback = [
  {
    id: 11308,
    added_to_waitlist: false,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Lixibox',
    coins_price: 2000,
    discount_percent: 15,
    for_redeem: true,
    is_individual: true,
    is_saleable: true,
    like_count: 49,
    lixicoin_bonus: 55,
    name: 'Bình Nước Nhựa Trong Suốt Lixibox',
    original_price: 65000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 55000,
    price_sale_off: 55000,
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
    rating: {
      avg_rate: 4.9,
      count: 19
    },
    short_description:
      'Bình Nước Nhựa Trong Suốt Lixibox Thiết kế bình đơn giản với tông màu xanh lá xinh xắn cùng phần thân trong suốt đẹp mắt. Bình nước kèm dây đeo tiện lợi khi mang đi ra ngoài. Có thể sử dụng khi mang đi tập gym-yoga, mang đi học, mang đến nơi làm việc một cách dễ dàng. Ngoài đựng nước lọc ra, còn dùng để làm bình đựng detox giảm cân đẹp da cũng rất phù hợp.',
    slug: 'binh-nuoc-nhua-trong-suot-lixibox',
    stock: 10,
    variant_options: [],
    variants: {
      colors: []
    }
  },
  {
    id: 8642,
    added_to_waitlist: false,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'OKAME Skincare',
    coins_price: null,
    discount_percent: 33,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 137,
    lixicoin_bonus: 260,
    name: 'Sữa Rửa Mặt Kiểm Soát Dầu Nhờn OKAME Peat Purifying Foam Cleanser',
    original_price: 390000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 260000,
    price_sale_off: 260000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/035/081/facebook/1537429327.png?t=1612428748',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/035/081/large/1537429327.png?t=1612428748',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/035/081/medium/1537429327.png?t=1612428748',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/035/081/original/1537429327.png?t=1612428748',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/035/081/thumb/1537429327.png?t=1612428748'
    },
    rating: {
      avg_rate: 4.7,
      count: 65
    },
    short_description:
      'Sửa rửa mặt Okame Peat Purifying Foam Cleanser được chiết xuất từ nước than bùn tự nhiên - 1 trong những thành phần đắt đỏ có khả năng thải độc, nhẹ nhàng làm sạch, hút dầu nhờn tương tự Than hoạt tính (charcoal) nhưng peat không qua xử lý nhiệt nên vẫn giữ được hàm lượng cao khoáng chất chống lão hóa và độ ẩm cho làn da. Sửa mặt mặt Okame bổ sung vitamin E giúp da trở nên tươi mới và đầy sức sống. Sửa mặt thích hợp cho da thường và da dầu',
    slug: 'okame-peat-purifying-foam-cleanser',
    stock: 10,
    variant_options: [],
    variants: {
      colors: []
    }
  }
];
const feedbacks = [
  {
    id: 22641,
    comments: [],
    created_at: 1509590186,
    feedbackable_id: 2180,
    feedbackable_image: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/040/530/facebook/1557805703.png?t=1590944359',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/040/530/large/1557805703.png?t=1590944359',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/040/530/medium/1557805703.png?t=1590944359',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/040/530/original/1557805703.png?t=1590944359',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/040/530/thumb/1557805703.png?t=1590944359'
    },
    feedbackable_name: 'Kem chống nắng Innisfree Intensive Long Lasting Sunscreen SPF50+ PA++++ 50ml',
    feedbackable_slug: 'kem-chng-nng-innisfree-perfect-uv-protection-cream-long-lasting-for-oily-skin',
    feedbackable_type: 'Box',
    parent_id: null,
    pictures: [],
    rate: 5,
    review: 'Sản phẩm rất tuyệt nhéDa trắng đều, không bị loang màu. Chắc chắn sẽ mua thêm!!!',
    status: 'approved',
    user: {
      id: 112448,
      avatar: {
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/large/avatar-20190522180419.jpeg',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/medium/avatar-20190522180419.jpeg',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/original/avatar-20190522180419.jpeg',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/thumb/avatar-20190522180419.jpeg'
      },
      avatar_medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/medium/avatar-20190522180419.jpeg',
      avatar_thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/thumb/avatar-20190522180419.jpeg',
      email: 'thanh.vo@lixibox.com',
      first_name: 'Võ',
      last_name: 'Thành 2',
      name: 'Thành 2 Võ'
    }
  },
  {
    id: 23187,
    comments: [],
    created_at: 1511171305,
    feedbackable_id: 3301,
    feedbackable_image: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/facebook/1502351590.png?t=1610077717',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/large/1502351590.png?t=1610077717',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/medium/1502351590.png?t=1610077717',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/original/1502351590.png?t=1610077717',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/thumb/1502351590.png?t=1610077717'
    },
    feedbackable_name: 'Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
    feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
    feedbackable_type: 'Box',
    parent_id: null,
    pictures: [],
    rate: 5,
    review: 'Sản phẩm rung rất êm nhé. Và pin rất lâu, từ khi mua tới giờ 3 tháng chưa sạc lần nào :D',
    status: 'approved',
    user: {
      id: 112448,
      avatar: {
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/large/avatar-20190522180419.jpeg',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/medium/avatar-20190522180419.jpeg',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/original/avatar-20190522180419.jpeg',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/thumb/avatar-20190522180419.jpeg'
      },
      avatar_medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/medium/avatar-20190522180419.jpeg',
      avatar_thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/thumb/avatar-20190522180419.jpeg',
      email: 'thanh.vo@lixibox.com',
      first_name: 'Võ',
      last_name: 'Thành 2',
      name: 'Thành 2 Võ'
    }
  }
];
const title = 'Test Title';
const showHeader = true;
const boxesToFeedback = _boxesToFeedback;
const isAddCartSuccess = true;
const isAddCartFail = false;
const onSubmitAddForm = jest.fn();
const onSubmitEditForm = jest.fn();
const currentNotFeedback = 0;
const perNotFeedback = 0;
const totalNotFeedback = 0;
const urlNotFeedbackList = [];
const currentFeedbacked = 0;
const perFeedbacked = 0;
const totalFeedbacked = 0;
const urlFeedbackedList = [];
const handleNotFeedback = jest.fn();
const handleFeedbacked = jest.fn();
const isShowPagination = true;
const addItemToCartAction = jest.fn();
const openModalAction = jest.fn();

const component = (params = {}) => {
  const props = {
    feedbacks,
    title,
    showHeader,
    boxesToFeedback,
    isAddCartSuccess,
    isAddCartFail,
    onSubmitAddForm,
    onSubmitEditForm,
    currentNotFeedback,
    perNotFeedback,
    totalNotFeedback,
    urlNotFeedbackList,
    currentFeedbacked,
    perFeedbacked,
    totalFeedbacked,
    urlFeedbackedList,
    handleNotFeedback,
    handleFeedbacked,
    isShowPagination,
    addItemToCartAction,
    openModalAction
  };

  return <FeedbackList {...Object.assign({}, props, params)} />;
};

describe('FeedbackList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
