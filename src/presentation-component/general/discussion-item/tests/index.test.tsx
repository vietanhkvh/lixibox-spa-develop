jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DiscussionItem from '..';

const component = (params = {}) => {
  const props = {
    id: 123,
    content: 'Test content',
    userAvatar:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/430/319/medium/1612423885.jpg',
    username: 'username1',
    userMobileReferralCode: 'ABCDEF',
    createdAt: 1293840000,
    replyTo: {
      id: 111,
      content: 'Test reply',
      username: 'username2',
      isParent: true,
      userMobileReferralCode: 'BCDEFG',
      relatedId: 234
    },
    repliesCount: 0,
    isParent: true,
    isDisplayOnThread: true,
    onReplyTo: jest.fn()
  };

  return <DiscussionItem {...Object.assign({}, props, params)} />;
};

describe('DiscussionItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
