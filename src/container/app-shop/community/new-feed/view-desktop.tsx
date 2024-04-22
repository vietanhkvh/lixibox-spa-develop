import TrackVisibility from 'lixibox-react-on-screen';

import SplitLayout from '../../../layout/split';
import FeedInputCreator from '../../../../presentation-component/feed/feed-input-creator';
import TopFeed from '../../../../presentation-component/feed/top-feed';
import Loading from '../../../../components/ui/loading';
import RightBarCommunity from '../right-bar-container';
import FeedList from '../../../../components/container/feed-list';

import { INewFeedProps, INewFeedState } from './model';
import STYLE from './style';

const loadMoreButton = () => (
  <div style={STYLE.btnWrap} id={'load-view-more'}>
    <Loading />
  </div>
);

const renderHashTagTitle = ({ hashtag }) => (
  <div style={STYLE.hashTagTitle.container}>
    <div style={STYLE.hashTagTitle.character}>#</div>
    <div style={STYLE.hashTagTitle.content}>{hashtag}</div>
  </div>
);

const renderMainContainer = ({ state, props, handleGetFeed }) => {
  const {
    authStore: { userInfo },
    cartStore: { constants },
    match: {
      params: { hashtag }
    },
    activityFeedStore: { list, hashtagFeeds }
  } = props as INewFeedProps;

  const { unboxing_enabled: unboxingEnabled } = constants;

  const { showCommunityHashTag, isFeedbackFull, isFetchFeedList, topFeedList } = state as INewFeedState;

  const feedList = showCommunityHashTag ? hashtagFeeds : list;

  const feedListProps = {
    list: feedList,
    history: window.history,
    userProfile: userInfo,
    style: STYLE.feedList
  };

  return (
    <div style={STYLE.container} className={'user-select-all'}>
      {
        <div>
          {!showCommunityHashTag && !!unboxingEnabled && <FeedInputCreator userInfo={userInfo} />}
          <TopFeed list={topFeedList} />

          {showCommunityHashTag ? renderHashTagTitle({ hashtag }) : null}

          <TrackVisibility offset={0}>
            {({ isVisible }) => {
              !!isVisible && !isFetchFeedList && !!handleGetFeed && handleGetFeed();

              return <FeedList {...feedListProps} />;
            }}
          </TrackVisibility>
        </div>
      }
      {!isFeedbackFull && loadMoreButton()}
    </div>
  );
};

export function renderComponent({ props, state, handleGetFeed }) {
  const {
    activityFeedStore: { hashtags },
    match: {
      params: { hashtag }
    },
    feedbackStore: { userBoxesToFeedback }
  } = props as INewFeedProps;

  const rightBarCommunityProps = {
    hashtags,
    hashtagSelected: hashtag,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: renderMainContainer({
      state,
      props,
      handleGetFeed
    })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
