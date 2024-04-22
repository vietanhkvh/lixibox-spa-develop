jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveListItem from '..';

const component = (params = {}) => {
  const yesterday = new Date();
  const tomorrow = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const props = {
    data: {
      name: 'Test name 1',
      slug: 'test-slug-1',
      coverImage:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/banners/covers/000/000/404/large/banner-top.png',
      createdAt: yesterday.getTime() / 1000,
      endAt: tomorrow.getTime() / 1000
    },
    size: 'general' as const
  };

  return <LiveListItem {...Object.assign({}, props, params)} />;
};

describe('LiveListItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
