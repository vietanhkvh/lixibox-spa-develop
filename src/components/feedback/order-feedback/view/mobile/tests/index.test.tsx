import Modal from 'react-modal';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import MobileView from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const feedback = {
  id: 90393,
  comments: [],
  created_at: 1631528194,
  feedbackable_id: 3148,
  feedbackable_image: {
    facebook_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/266/facebook/1484019700.jpg?t=1631528260',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/266/large/1484019700.jpg?t=1631528260',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/266/medium/1484019700.jpg?t=1631528260',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/266/original/1484019700.jpg?t=1631528260',
    square_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/266/square/1484019700.jpg?t=1631528260',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/266/thumb/1484019700.jpg?t=1631528260',
    vertical_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/012/266/vertical/1484019700.jpg?t=1631528260'
  },
  feedbackable_name: 'Phiếu quà tặng Lixibox Gift Voucher 100k',
  feedbackable_slug: 'lixibox-gift-voucher-100000d',
  feedbackable_type: 'Box',
  parent_id: null,
  pictures: [
    {
      id: 61461,
      height: 650,
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/061/461/large/1631528186.png?v=1',
      width: 960
    }
  ],
  rate: 4,
  review: 'test test test test test test test test test test test test test test test test test test test',
  social_shared: true,
  status: 'approved',
  user: {
    id: 337441,
    avatar: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/337/441/large/1616663247.jpg',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/337/441/medium/1616663247.jpg',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/337/441/original/1616663247.jpg',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/337/441/thumb/1616663247.jpg'
    },
    avatar_medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/337/441/medium/1616663247.jpg',
    avatar_thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/337/441/thumb/1616663247.jpg',
    email: 'shakil@lixibox.com',
    first_name: 'Shakil',
    last_name: 'Shakil',
    name: 'Shakil Shakil'
  }
};

const popup = {
  isOpen: false,
  title: 'Test title',
  message: 'Test message',
  action: { text: 'OK' },
  onRequestClose: jest.fn()
};

const component = (params = {}) => {
  const props = {
    fbCoins: 200,
    feedback,
    popup,
    onSubmit: jest.fn(),
    onImageClick: jest.fn()
  };

  return <MobileView {...Object.assign({}, props, params)} />;
};

describe('MobileView', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
