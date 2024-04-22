import Loading from '../../../../components/ui/loading';
import FeedList from '../../../../components/container/feed-list';
import FeedInputCreator from '../../../../presentation-component/feed/feed-input-creator';
import SplitLayout from '../../../layout/split';
import RightBarCommunity from '../right-bar-container';

import { IProps, IState } from './model';
import { renderLoadingPlaceholder } from './view';
import STYLE from './style';

const loadMoreButton = () => (
  <div style={STYLE.btnWrap} id={'load-view-more'}>
    <Loading />
  </div>
);

const renderMainContainer = ({
  list,
  userProfile,
  cartStore: { constants },
  authStore: { userInfo },
  isHiddenLoadMore = false
}) => {
  const { unboxing_enabled: unboxingEnabled } = constants;
  const feedListProps = {
    list,
    history: window.history,
    userProfile,
    style: STYLE.feedList,
    isFeedDetail: true
  };

  const isShow = Array.isArray(list) && list.length > 0;

  return (
    <div style={STYLE.container} className={'user-select-all'}>
      {!!unboxingEnabled && <FeedInputCreator userInfo={userInfo} />}
      <div className={'new-feeds-user-desktop'}>
        {isShow ? <FeedList {...feedListProps} /> : renderLoadingPlaceholder()}
      </div>
      {!isHiddenLoadMore && loadMoreButton()}
    </div>
  );
};

export function renderComponent({ props, state }) {
  const {
    authStore,
    authStore: { userInfo },
    cartStore,
    activityFeedStore: { list, hashtags },
    feedbackStore: { userBoxesToFeedback }
  } = props as IProps;

  const { isFeebackFull } = state as IState;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: renderMainContainer({
      list,
      userProfile: userInfo,
      authStore,
      cartStore,
      isHiddenLoadMore: isFeebackFull
    })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
