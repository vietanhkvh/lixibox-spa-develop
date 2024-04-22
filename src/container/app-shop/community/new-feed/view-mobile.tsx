import TrackVisibility from 'lixibox-react-on-screen';

import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';
import FeedInputCreator from '../../../../presentation-component/feed/feed-input-creator';
import BoxToFeedback from '../../../../presentation-component/feed/box-to-feedback';
import TopFeed from '../../../../presentation-component/feed/top-feed';

import Loading from '../../../../components/ui/loading';
import FeedList from '../../../../components/container/feed-list';

import { objectToHash } from '../../../../utils/encode';
import { isEmptyObject } from '../../../../utils/validate';
import { FEEDBACK_MOBILE_TABS } from '../../../../constants/application/feedback';

import STYLE from './style';
import { INewFeedProps, INewFeedState } from './model';

const loadMoreButton = () => (
  <div style={STYLE.btnWrap} id={'load-view-more'}>
    <Loading />
  </div>
);

const renderView = ({ state, props, handleGetFeed }) => {
  const {
    authStore: { userInfo },
    feedbackStore: { userBoxesToFeedback },
    cartStore: { constants },
    activityFeedStore: { list, hashtagFeeds },
    history
  } = props as INewFeedProps;

  const { showCommunityHashTag, isFetchFeedList, isFeedbackFull, isPriorityBlock, topFeedList } =
    state as INewFeedState;

  const { unboxing_enabled: unboxingEnabled } = constants;

  const feedList = showCommunityHashTag ? hashtagFeeds : list;

  const feedListProps = {
    history,
    userProfile: userInfo,
    list: feedList,
    style: STYLE.feedList
  };

  const tabs = FEEDBACK_MOBILE_TABS.filter((tab) => !(tab.code === 'unboxing' && !unboxingEnabled)).map((tab) =>
    tab.code === 'new' ? Object.assign({}, tab, { selected: true }) : tab
  );

  const userBoxesToFeedbackHash = objectToHash({ page: 1, perPage: 30 });
  const filteredUserBoxesToFeedback = userBoxesToFeedback[userBoxesToFeedbackHash];
  const isShowBoxToFeedBack =
    !isEmptyObject(userBoxesToFeedback) && !!filteredUserBoxesToFeedback && !isEmptyObject(userInfo);

  return (
    <div style={STYLE.container}>
      <MobileAutoDisplayHeader row={1}>
        <MobileTabHeader tabs={tabs} />
      </MobileAutoDisplayHeader>
      {!!unboxingEnabled && <FeedInputCreator userInfo={userInfo} />}
      {!!isShowBoxToFeedBack && <BoxToFeedback list={filteredUserBoxesToFeedback.boxes} />}
      <TopFeed list={topFeedList} />

      {!isPriorityBlock ? (
        <TrackVisibility offset={0}>
          {({ isVisible }) => {
            !!isVisible && !isFetchFeedList && !!handleGetFeed && handleGetFeed();

            return <FeedList {...feedListProps} />;
          }}
        </TrackVisibility>
      ) : (
        <Loading style={{ height: 400 }} />
      )}

      {!isFeedbackFull && loadMoreButton()}
    </div>
  );
};

export function renderComponent({ props, state, handleGetFeed }) {
  return (
    <div style={STYLE.wrapMobileLayout}>
      {renderView({
        state,
        props,
        handleGetFeed
      })}
    </div>
  );
}

export default renderComponent;
