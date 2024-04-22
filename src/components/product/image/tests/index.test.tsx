jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductImage from '..';

const badges = [
  {
    message: null,
    top_left: null,
    top_right: null,
    bottom_right: 'https://example.com/image.png',
    bottom_left: null
  }
];
const productBoxVideos = [
  {
    id: 67,
    created_at: 1590552345,
    thumb:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/videos/thumbs/000/000/067/original/1590552345.jpg',
    url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/videos/files/000/000/067/original/P1630216.mp4'
  },
  {
    id: 69,
    created_at: 1592366644,
    thumb:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/videos/thumbs/000/000/069/original/1592366644.jpg',
    url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/videos/files/000/000/069/original/Copy_of_Lixibox___Ko_text___Mask___Thien_Thu___M%E1%BA%B9.mp4'
  }
];
const component = (params = {}) => {
  const props = {
    list: ['https://example.com/image1.png', 'https://example.com/image2.png'],
    boxFeedbackPicture: [{ url: 'https://example.com/image1.png' }, { url: 'https://example.com/image2.png' }],
    onSelect: jest.fn(),
    video: productBoxVideos,
    badges,
    isFixedToolbar: false
  };

  return <ProductImage {...Object.assign({}, props, params)} />;
};

describe('ProductImage', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
