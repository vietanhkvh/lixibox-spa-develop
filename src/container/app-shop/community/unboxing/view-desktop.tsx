import TrackVisibility from 'lixibox-react-on-screen';

import Loading from '../../../../components/ui/loading';
import RightBarCommunity from '../right-bar-container';
import FeedList from '../../../../components/container/feed-list';
import FeedInputCreator from '../../../../presentation-component/feed/feed-input-creator';
import TopFeed from '../../../../presentation-component/feed/top-feed';

import SplitLayout from '../../../layout/split';

import { IProps, IState } from './model';
import STYLE from './style';

const loadMoreButton = () => (
  <div style={STYLE.btnWrap} id={'load-view-more'}>
    <Loading />
  </div>
);

const renderMainContainer = ({ state, props, handleGetFeed }) => {
  const { showCommunityHashTag, topFeedList, isFeedbackFull, isFetchFeedList } = state as IState;
  const {
    authStore: { userInfo },
    activityFeedStore: { list },
    cartStore: { constants }
  } = props as IProps;

  const feedListProps = {
    list,
    history: window.history,
    userProfile: userInfo,
    style: STYLE.feedList
  };

  const { unboxing_enabled: unboxingEnabled } = constants;

  return (
    <div style={STYLE.container} className={'user-select-all'}>
      <div className={'new-feeds-love-desktop'}>
        {!showCommunityHashTag && unboxingEnabled && <FeedInputCreator userInfo={userInfo} />}
        <TopFeed list={topFeedList} />
        <TrackVisibility offset={0}>
          {({ isVisible }) => {
            !!isVisible && !isFetchFeedList && !!handleGetFeed && handleGetFeed();

            return <FeedList {...feedListProps} />;
          }}
        </TrackVisibility>
      </div>
      {!isFeedbackFull && loadMoreButton()}
    </div>
  );
};

export function renderComponent({ props, state, handleGetFeed }) {
  const {
    activityFeedStore: { hashtags },
    feedbackStore: { userBoxesToFeedback }
  } = props as IProps;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: renderMainContainer({
      handleGetFeed,
      state,
      props
    })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
