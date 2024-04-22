import { withRouter } from 'react-router';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveBackground from '..';

const component = (params = {}) => {
  const props = {
    liveDetailStore: {
      title: 'Test title',
      video_link: 'https://www.facebook.com/lixiboxvn/videos/1474342052759087',
      ratio_type: 'horizontal',
      slug: 'test-slug',
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/thumb/1502421179.jpg?t=1612082684'
    },
    isShowLiveBackgroundStore: true,
    displayLiveBackgroundAction: jest.fn()
  };

  return withRouter<any, any>(<LiveBackground {...Object.assign({}, props, params)} />);
};

describe('LiveBackground', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
