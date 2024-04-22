jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { INITIAL_STATE_ACTIVITY_FEED } from '../../../../flows/activity-feed/reducer';
import { INITIAL_STATE_AUTH } from '../../../../flows/auth/reducer';
import InputField from '../../../ui/input-field';
import { screen } from '@testing-library/react';
import { activityFeed } from 'test/sample/api/activity-feed';
import { UserSilver } from 'test/sample/api/user';
import { reduxRender } from '../../../../utils/test-utils';
import FeedItem from '../component';
import userEvent from '@testing-library/user-event';
import { ROUTING_COMMUNITY_FEEDBACK_EDIT_PATH } from 'routings/path';

const userProfile = {
  list: UserSilver
};

const component = (params = {}) => {
  const props = {
    item: activityFeed,
    type: InputField.INPUT_TYPE.TEXT,
    limitTextLength: 100,
    userProfile,
    isLastChild: true,
    activityFeedStore: INITIAL_STATE_ACTIVITY_FEED,
    authStore: INITIAL_STATE_AUTH,
    fecthActivityFeedCommentListAction: jest.fn(),
    addActivityFeedCommentAction: jest.fn(),
    addActivityFeedLikeAction: jest.fn(),
    deleteActivityFeedLikeAction: jest.fn(),
    openModal: jest.fn(),
    showComment: true,
    listLikedId: [],
    likeProduct: jest.fn(),
    unLikeProduct: jest.fn(),
    isShowImage: true,
    isShowFullImage: true,
    isShowContent: true,
    isFeedDetail: true,
    isFixSizeCover: true,
    forceDisableVideo: false,
    onDisableVideo: jest.fn()
  };

  return <FeedItem {...Object.assign({}, props, params)} />;
};

describe('FeedItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
  test('active action edit feed', async () => {
    const user = userEvent.setup();
    reduxRender(component(), { initialState: {} });
    const actionGroupIcon = document.getElementsByClassName('moreIcon')[0];
    expect(actionGroupIcon).toBeInTheDocument();
    await user.click(actionGroupIcon);

    const actionContainer = document.getElementsByClassName('contextActions visible')[0];
    expect(actionContainer).toBeInTheDocument();

    const editBtn = screen.getByText('Chỉnh sửa');
    await user.click(editBtn);
    expect(window.location.pathname.includes(ROUTING_COMMUNITY_FEEDBACK_EDIT_PATH)).toEqual(true);
  });
});
