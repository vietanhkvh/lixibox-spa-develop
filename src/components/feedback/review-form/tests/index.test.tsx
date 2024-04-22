jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReviewForm from '../component';
import { FORM_TYPE } from '../../../../constants/application/form';
import { INITIAL_STATE_FEEDBACK } from '../../../../flows/feedback/reducer';

const feedback = {
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
};

const item = {
  id: feedback.id,
  slug: feedback.feedbackable_slug,
  img_url: (feedback.feedbackable_image && feedback.feedbackable_image.medium_url) || '',
  name: feedback.feedbackable_name,
  box_id: feedback.feedbackable_id,
  created_at: feedback.created_at,
  rate: feedback.rate,
  review: feedback.review
};

const data = {
  handleSubmitForm: jest.fn(),
  type: FORM_TYPE.EDIT,
  item
};
const feedbackStore = INITIAL_STATE_FEEDBACK;
const closeModalAction = jest.fn();
const openAlertAction = jest.fn();

const component = (params = {}) => {
  const props = {
    data,
    feedbackStore,
    closeModalAction,
    openAlertAction
  };

  return <ReviewForm {...Object.assign({}, props, params)} />;
};

describe('ReviewForm', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
