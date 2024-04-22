jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import Comment from '../component';

const activityFeed = {
  id: 19076,
  box: {
    id: 11215,
    slug: 'baby-girl-onesie-0-3m',
    name: 'Bộ Liền Bé Gái Rái Cá To The Stars Newborn'
  },
  boxes: [
    {
      id: 11215,
      brand_name: 'To the Stars',
      is_individual: true,
      is_saleable: true,
      name: 'Bộ Liền Bé Gái Rái Cá To The Stars Newborn',
      original_price: 150000,
      price: 150000,
      primary_picture: {
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/facebook/1600252004.jpg?t=1618303863',
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/large/1600252004.jpg?t=1618303863',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/medium/1600252004.jpg?t=1618303863',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/original/1600252004.jpg?t=1618303863',
        square_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/square/1600252004.jpg?t=1618303863',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/thumb/1600252004.jpg?t=1618303863',
        vertical_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/vertical/1600252004.jpg?t=1618303863'
      },
      short_description:
        'Bộ sưu tập Sealove của To The Stars với họa tiết dễ thương, truyền cảm hứng từ tình yêu của mẹ và thấu hiểu những khát khao mong muốn đem đến che chở, an toàn cho bé yêu. Chất liệu luôn được xem là ưu tiên hàng đầu của To The Stars, được làm từ 100% sợi bông cotton tự nhiên mềm mại, thoáng mát, thấm hút mồ hôi, co giãn giúp bé cử động thoải mái khám phá thế giới bên ngoài, nâng niu làn da mỏng manh, nhạy cảm của trẻ sơ sinh. Sản phẩm đạt tiêu chuẩn OEKO-TEX 100 - chứng chỉ quốc tế cho sản phẩm an toàn trong may mặc, hoàn toàn không sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, không hoá chất nhuộm trong công nghiệp. Từng đường may, mũi chỉ đều được kiểm soát chặt chẽ về chất lượng, đáp ứng được yêu cầu của cả những mẹ khó tính và khắt khe nhất trong việc lựa chọn đồ dùng cho bé yêu của mình. Thiết kế một mảnh liền nhẹ nhàng giữ ấm cho bụng và lưng bé. Cổ áo envelope và nút bấm không có chứa nickel tại đủng quần được cải tiến, giúp ba mẹ dễ dàng mặc đồ và thay bỉm cho bé.',
      slug: 'baby-girl-onesie-0-3m',
      status: 'approved'
    }
  ],
  created_at: 1612496986,
  feedable_type: 'Feedback',
  liked: false,
  likes: [
    {
      id: 430319,
      avatar:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/medium/1612423885.jpg',
      comment_count: 0,
      feed_count: 4,
      feedback_count: 7,
      like_count: 1,
      membership_level: 2,
      name: 'Nguyễn Andrew',
      referral_code: 'DUNGFA8DF56',
      unboxing_count: 0
    }
  ],
  message:
    'Grhhrc yrb hff ued jhbn fd. Wef wef trgyh weg. Rtyh ergh tyjn erh ryj fgh. Ergh werg rtyj rytj. Erth erhg erthy yjmty ;klnmrg wem,n dfgbh,r ukg dfv,m ergo;i h vdyj fsmkgd',
  picture: {
    facebook_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/facebook/1600252004.jpg?t=1618303863',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/large/1600252004.jpg?t=1618303863',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/medium/1600252004.jpg?t=1618303863',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/original/1600252004.jpg?t=1618303863',
    square_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/square/1600252004.jpg?t=1618303863',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/thumb/1600252004.jpg?t=1618303863',
    vertical_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/052/860/vertical/1600252004.jpg?t=1618303863'
  },
  pictures: [
    {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/374/facebook/1612496987.jpg?v=1',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/374/large/1612496987.jpg?v=1',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/374/medium/1612496987.jpg?v=1',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/374/original/1612496987.jpg?v=1',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/374/square/1612496987.jpg?v=1',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/374/thumb/1612496987.jpg?v=1',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/374/vertical/1612496987.jpg?v=1'
    }
  ],
  pinned: false,
  rating: 5,
  share_link: 'https://lixibox.app/f/19076',
  total_comments: 6,
  total_likes: 1,
  user: {
    id: 430319,
    name: 'Nguyễn Andrew',
    referral_code: 'DUNGFA8DF56',
    avatar: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/large/1612423885.jpg',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/medium/1612423885.jpg',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/original/1612423885.jpg',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/thumb/1612423885.jpg'
    }
  }
};

const activityFeedComments = [
  {
    id: 16433,
    content: 'test message',
    created_at: 1612497097,
    editable: false,
    user: {
      id: 430319,
      avatar:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/medium/1612423885.jpg',
      comment_count: 0,
      feed_count: 4,
      feedback_count: 7,
      like_count: 1,
      membership_level: 2,
      name: 'Nguyễn Andrew',
      referral_code: 'DUNGFA8DF56',
      unboxing_count: 0
    },
    user_name: 'Nguyễn Andrew'
  }
];

const component = (params = {}) => {
  const props = {
    feed: activityFeed,
    comment: activityFeedComments[0],
    currentUserId: activityFeedComments[0].user.id,
    updateActivityFeedCommentAction: jest.fn(),
    deleteActivityFeedCommentAction: jest.fn()
  };

  return <Comment {...Object.assign({}, props, params)} />;
};

describe('Comment', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
