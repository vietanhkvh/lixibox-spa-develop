import FeedItem from '../../../../components/container/feed-item';
import SplitLayout from '../../../layout/split';
import Page404 from '../../../exception/404';

import { isUndefined, isEmptyObject } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';
import RightBarCommunity from '../right-bar-container';

import STYLE from './style';
import { IProps } from './model';

const renderMainContainer = ({ history, userProfile, item, isFetchActivityFeedDetailFail }) => {
  const feedItemProps = {
    history,
    item,
    userProfile,
    showComment: true,
    isLastChild: true
  };

  if (!!isFetchActivityFeedDetailFail) {
    return (
      <div style={STYLE.notfoundContainer}>
        <Page404 isShowNavigation={false} />
      </div>
    );
  }

  return <div style={STYLE.container}>{!isEmptyObject(item) && <FeedItem {...feedItemProps} />}</div>;
};

export function renderComponent({ props }) {
  const {
    history,
    authStore: { userInfo },
    match: {
      params: { feedId }
    },
    activityFeedStore: { activityFeedDetail, isFetchActivityFeedDetailFail, hashtags },
    feedbackStore: { userBoxesToFeedback }
  } = props as IProps;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const keyHash = objectToHash({ feedId });
  const item =
    (!isEmptyObject(activityFeedDetail) && !isUndefined(activityFeedDetail[keyHash]) && activityFeedDetail[keyHash]) ||
    {};

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: renderMainContainer({
      history,
      userProfile: userInfo,
      item,
      isFetchActivityFeedDetailFail
    })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
