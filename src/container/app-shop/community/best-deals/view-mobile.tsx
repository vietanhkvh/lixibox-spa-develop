import Loading from '../../../../components/ui/loading';
import FeedList from '../../../../components/container/feed-list';

import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';
import FeedInputCreator from '../../../../presentation-component/feed/feed-input-creator';
import BoxToFeedback from '../../../../presentation-component/feed/box-to-feedback';
import TopFeed from '../../../../presentation-component/feed/top-feed';

import { isEmptyObject } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';
import { FEEDBACK_MOBILE_TABS } from '../../../../constants/application/feedback';

import STYLE from './style';
import { IProps, IState } from './model';
import { renderLoadingPlaceholder } from './view';

const loadMoreButton = () => (
  <div style={STYLE.btnWrap} id={'load-view-more'}>
    <Loading />
  </div>
);

const renderView = ({ props, state, list, userProfile, isHiddenLoadMore = false }) => {
  const {
    feedbackStore: { userBoxesToFeedback },
    authStore: { userInfo },
    cartStore: { constants },
    history
  } = props as IProps;

  const { unboxing_enabled: unboxingEnabled } = constants;

  const { topFeedList } = state;

  const feedListProps = {
    history,
    list,
    userProfile,
    style: STYLE.feedList,
    isFeedDetail: true
  };

  const isShow = Array.isArray(list) && list.length > 0;

  const tabs = FEEDBACK_MOBILE_TABS.filter((tab) => !(tab.code === 'unboxing' && !unboxingEnabled)).map((tab) =>
    tab.code === 'from-lixibox' ? Object.assign({}, tab, { selected: true }) : tab
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

      <div className={'new-feeds-user-mobile'}>
        {isShow ? (
          <div>
            <FeedList {...feedListProps} />
          </div>
        ) : (
          renderLoadingPlaceholder()
        )}
      </div>
      {!isHiddenLoadMore && loadMoreButton()}
    </div>
  );
};

export function renderComponent({ props, state }) {
  const {
    authStore: { userInfo },
    activityFeedStore: { list }
  } = props as IProps;

  const { isFeebackFull } = state as IState;

  return (
    <div style={STYLE.wrapMobileLayout}>
      {renderView({
        list,
        props,
        state,
        userProfile: userInfo,
        isHiddenLoadMore: isFeebackFull
      })}
    </div>
  );
}

export default renderComponent;
