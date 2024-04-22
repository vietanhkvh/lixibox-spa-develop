jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FeedbackTestimonial from '..';

const component = (params = {}) => {
  const props = {
    data: [
      {
        id: 9749,
        created_at: 1610077496,
        message: '#lixibox',
        picture_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/loves/pictures/000/009/749/medium/130676210_2815993058726859_4597778155649992097_n.jpg',
        updated_at: 1610077500,
        user_avatar: {},
        user_name: 'Kha Kim Bảo Hân',
        youtube_video_id: '89Pq-DHbobs'
      },
      {
        id: 9748,
        created_at: 1610020528,
        message: '#Lixibox',
        picture_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/loves/pictures/000/009/748/medium/132147782_430940008041455_5054556831865232097_n.jpg',
        updated_at: 1610020533,
        user_avatar: {},
        user_name: 'Bùi Thị Thảo Vy',
        youtube_video_id: '3WodvWy86U0'
      }
    ],
    openModal: jest.fn()
  };

  return <FeedbackTestimonial {...Object.assign({}, props, params)} />;
};

describe('FeedbackTestimonial', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
