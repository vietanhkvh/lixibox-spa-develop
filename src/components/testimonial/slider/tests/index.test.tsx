jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import TestimonialSlider from '..';

const loveBox = [
  {
    id: 16311,
    boxes: [
      {
        id: 10118,
        brand_name: 'Naruko',
        is_individual: true,
        is_saleable: true,
        name: 'Sữa Rửa Mặt Sáng Da Naruko RJT Pore Minimizing & Brightening Foaming Wash 120 ml',
        original_price: 246000,
        price: 185000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/434/facebook/1570418434.jpg?t=1612082696',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/434/large/1570418434.jpg?t=1612082696',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/434/medium/1570418434.jpg?t=1612082696',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/434/original/1570418434.jpg?t=1612082696',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/434/thumb/1570418434.jpg?t=1612082696'
        },
        short_description:
          'Tác dụng chính: làm sạch da, bước cơ bản giúp bạn có một làn da rực rỡ sạch vết bẩn Công dụng: sữa rửa mặt ý dĩ nhân đỏ naruko làm sạch sâu, đánh bật và loại bỏ các vết bẩn từ cả bên ngoài lẫn tận sâu bên trong da; nhẹ nhàng lây đi bụi bẩn nhưng không làm hại da; lưu lại độ ẩm nhất định cho da; tẩy tế bào chết; giúp làm đều màu da, cho bạn làn da luôn sạch bóng; cải thiện những vùng da tối màu, giảm thiếu tối đa các sắc tố gây đen da, cân bằng ẩm và điều tiết dầu trên da; làm sạch lỗ chân lông, tăng độ săn chắc cho da, giúp da luôn thư giãn và thoải mái.',
        slug: 'naruko-rjt-pore-minimizing-brightening-foaming-wash-120-ml',
        status: 'approved'
      }
    ],
    created_at: 1585384730,
    feedable_type: 'Love',
    liked: false,
    likes: [
      {
        id: 403261,
        avatar:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/403/261/medium/picture',
        comment_count: 0,
        feed_count: 0,
        feedback_count: 0,
        like_count: 327,
        membership_level: 1,
        name: 'Pham Quy',
        referral_code: 'QUY6151',
        unboxing_count: 0
      }
    ],
    message:
      'Lần đầu mua hàng, và chắc chắn từ bây giờ sẽ chuyển qua Lixibox để mua đồ. Box dễ thương dã man, mà giao hàng thì cực nhanh, hôm trước đặt hôm sau nhận được luôn, lại còn hàng xịn nữa ncl không chê đi đâu được❤️\n#lixibox #lixiphoto #lixivideo',
    picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/023/facebook/1585384731.jpg?v=1',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/023/large/1585384731.jpg?v=1',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/023/medium/1585384731.jpg?v=1',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/023/original/1585384731.jpg?v=1',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/048/023/thumb/1585384731.jpg?v=1'
    },
    pinned: false,
    share_link: 'https://lixibox.app/f/16311',
    total_comments: 0,
    total_likes: 1,
    user: {
      id: 379000,
      name: 'Mai Trang',
      referral_code: 'TRANGF519',
      avatar: {
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/379/000/large/avatar-1585391156.jpg',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/379/000/medium/avatar-1585391156.jpg',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/379/000/original/avatar-1585391156.jpg',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/379/000/thumb/avatar-1585391156.jpg'
      }
    },
    video: null
  }
];
const component = (params = {}) => {
  const props = {
    data: loveBox,
    type: 'full',
    title: 'Test Title',
    column: 4,
    showViewMore: true,
    showHeader: true,
    isCustomTitle: true,
    openModal: jest.fn()
  };

  return <TestimonialSlider {...Object.assign({}, props, params)} />;
};

describe('TestimonialSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
