import TrackVisibility from 'lixibox-react-on-screen';

import Loading from '../../../../components/ui/loading';
import FeedList from '../../../../components/container/feed-list';
import BoxToFeedback from '../../../../presentation-component/feed/box-to-feedback';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';
import FeedInputCreator from '../../../../presentation-component/feed/feed-input-creator';
import TopFeed from '../../../../presentation-component/feed/top-feed';

import { objectToHash } from '../../../../utils/encode';
import { isEmptyObject } from '../../../../utils/validate';
import { FEEDBACK_MOBILE_TABS } from '../../../../constants/application/feedback';

import STYLE from './style';
import { IProps, IState } from './model';

const loadMoreButton = () => (
  <div style={STYLE.btnWrap} id={'load-view-more'}>
    <Loading />
  </div>
);

const renderView = ({ state, props, handleGetFeed }) => {
  const {
    history,
    authStore: { userInfo },
    cartStore: { constants },
    feedbackStore: { userBoxesToFeedback },
    activityFeedStore: { list }
  } = props as IProps;

  const { unboxing_enabled: unboxingEnabled } = constants;

  const { isFeedbackFull, isFetchFeedList, isPriorityBlock, topFeedList } = state as IState;

  const feedListProps = {
    list,
    history,
    userProfile: userInfo,
    style: STYLE.feedList
  };

  const tabs = FEEDBACK_MOBILE_TABS.filter((tab) => !(tab.code === 'unboxing' && !unboxingEnabled)).map((tab) =>
    tab.code === 'unboxing' ? Object.assign({}, tab, { selected: true }) : tab
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
      <FeedInputCreator userInfo={userInfo} />
      {!!isShowBoxToFeedBack && unboxingEnabled && <BoxToFeedback list={filteredUserBoxesToFeedback.boxes} />}
      <TopFeed list={topFeedList} />

      <div className={'new-feeds-love-mobile'}>
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
      </div>
      {!isFeedbackFull && loadMoreButton()}
    </div>
  );
};

export function renderComponent({ props, state, handleGetFeed }) {
  return (
    <div style={STYLE.wrapMobileLayout}>
      {renderView({
        props,
        state,
        handleGetFeed
      })}
    </div>
  );
}

export default renderComponent;
