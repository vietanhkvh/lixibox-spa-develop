import Loading from '../../../../components/ui/loading';
import FeedList from '../../../../components/container/feed-list';

import STYLE from './style';
import { IProps, IState } from './model';
import { renderLoadingPlaceholder } from './view';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import { ROUTING_SHOP_INDEX } from 'routings/path';

const loadMoreButton = () => (
  <div style={STYLE.btnWrap} id={'load-view-more'}>
    <Loading />
  </div>
);

const renderView = ({ list, userProfile, isHiddenLoadMore = false, isFetchFeedbackSuccessful, history }) => {
  const feedListProps = {
    history: window.history,
    list,
    userProfile,
    style: STYLE.feedList,
    isFeedDetail: true
  };

  const isShow = Array.isArray(list) && list.length > 0;

  return (
    <div style={STYLE.container}>
      <div className={'new-feeds-user-mobile'}>
        {isShow ? (
          <div>
            <FeedList {...feedListProps} />
          </div>
        ) : !!isFetchFeedbackSuccessful ? (
          <div style={STYLE.emptyMessage}>
            <NoContentPlaceholder
              title="Không tìm thấy hoạt động nào"
              subtitle="Vui lòng quay trở lai sau bạn nhé!"
              logo={NO_CONTENT_LOGO.MAKEUP}
              action={{ text: 'Tiếp tục mua sắm' }}
              onClick={() => history.push(ROUTING_SHOP_INDEX)}
            />
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
    activityFeedStore: { list, isFetchFeedbackSuccessful },
    history
  } = props as IProps;

  const { isFeebackFull } = state as IState;

  return (
    <div style={STYLE.wrapMobileLayout}>
      {renderView({
        list,
        userProfile: userInfo,
        isHiddenLoadMore: isFeebackFull,
        isFetchFeedbackSuccessful,
        history
      })}
    </div>
  );
}

export default renderComponent;
