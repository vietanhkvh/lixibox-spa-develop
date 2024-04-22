import { objectToHash } from '../../../../utils/encode';
import FeedItem from '../../../../components/container/feed-item';
import { isUndefined, isEmptyObject } from '../../../../utils/validate';

import STYLE from './style';
import { IProps } from './model';

const renderView = ({ props, history, userProfile, item }) => {
  // const {
  // location: { pathname },
  // activityFeedStore: { hashtags }
  // } = props as IProps;

  const feedItemProps = {
    item,
    history,
    userProfile,
    showComment: true,
    isLastChild: true,
    isShowFullImage: true
  };

  // const keyHash = objectToHash({ days: 7 });
  // const hashTagList = hashtags && !isUndefined(hashtags[keyHash]) ? hashtags[keyHash] : [];

  // const headerMobileProps = {
  //   pathname,
  //   hashTagList
  // };

  return <div style={STYLE.container}>{!isEmptyObject(item) && <FeedItem {...feedItemProps} />}</div>;
};

export function renderComponent({ props }) {
  const {
    activityFeedStore: { activityFeedDetail },
    match: {
      params: { feedId }
    },
    authStore: { userInfo },
    history
  } = props as IProps;

  const keyHash = objectToHash({ feedId });
  const item = (activityFeedDetail && !isUndefined(activityFeedDetail[keyHash]) && activityFeedDetail[keyHash]) || {};

  return <div style={STYLE.wrapMobileLayout}>{renderView({ props, history, userProfile: userInfo, item })}</div>;
}

export default renderComponent;
