import { reduxRender } from 'utils/test-utils';
import ListFeedbackItemView from '..';

const boxFeedback = {
  id: 114953,
  comments: [],
  created_at: 1693459928,
  feedbackable_id: 16077,
  feedbackable_image: {
    facebook_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/720/facebook/1677559024.png?t=1693459929',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/720/large/1677559024.png?t=1693459929',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/720/medium/1677559024.png?t=1693459929',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/720/original/1677559024.png?t=1693459929',
    square_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/720/square/1677559024.png?t=1693459929',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/720/thumb/1677559024.png?t=1693459929',
    vertical_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/081/720/vertical/1677559024.png?t=1693459929'
  },
  feedbackable_lixibox_id: 'LX03377241F2',
  feedbackable_name: 'Đồ Chơi Gỗ Ghép Hình Crazy Store',
  feedbackable_slug: 'do-choi-go-ghep-hinh-crazy-store',
  feedbackable_type: 'Box',
  liked: false,
  parent_id: null,
  pictures: [
    {
      id: 86750,
      height: 650,
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/086/750/large/1693459923.png?v=1',
      width: 960
    }
  ],
  rate: 5,
  review: 'đồ chơi bằng gỗ chắc chắn,có chuông bấm nên bé rất thích',
  status: 'approved',
  total_likes: 0,
  user: {
    id: 577121,
    avatar: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/577/121/large/1681956643.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/577/121/medium/1681956643.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/577/121/original/1681956643.png',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/577/121/thumb/1681956643.png'
    },
    avatar_medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/577/121/medium/1681956643.png',
    avatar_thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/577/121/thumb/1681956643.png',
    email: 'tina.nguyen@lixibox.com',
    first_name: 'tina',
    last_name: 'Keke',
    name: 'Keke Tina',
    referral_code: 'TINACD13F4F',
    uuid: 'faf25355-c365-4e15-abb8-1e016151e2c0'
  }
};

const component = (params = {}) => {
  const props = {
    boxFeedback,
    isFirstItem: false,
    isLikeActionProcessing: false,
    onFeedbackImageClick: jest.fn(),
    onActionLike: jest.fn()
  };

  return <ListFeedbackItemView {...Object.assign({}, props, params)} />;
};

describe('ListFeedbackItemView', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
