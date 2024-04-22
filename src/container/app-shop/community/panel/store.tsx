import { connect } from 'react-redux';

import CommunityPanelContainer from './container';

import {
  fetchCommunityHashtagsAction,
  clearDataCommunityHashtagsAction,
  clearDataCommunityHashtagFeedsAction
} from '../../../../flows/activity-feed/action';
import { openAlertAction } from '../../../../flows/alert/action';
import { fetchMagazineListAction, clearDataMagazineListAction } from '../../../../flows/magazine/action';
import { fetchUserBoxesToFeedbackAction, fetchUserFeedbacksAction } from '../../../../flows/feedback/action';
import { fetchHomeProductByCategoryAction, clearDataProductByCategoryAction } from '../../../../flows/shop/action';

const mapStateToProps = (state) => ({
  authStore: state.auth,
  activityFeedStore: state.activityFeed,
  cartStore: state.cart,
  feedStore: state.feed
});

const mapDispatchToProps = (dispatch) => ({
  openAlertAction: (data) => dispatch(openAlertAction(data)),
  fetchMagazineListAction: (data) => dispatch(fetchMagazineListAction(data)),
  clearDataMagazineListAction: () => dispatch(clearDataMagazineListAction()),
  fetchUserFeedbacksAction: (data) => dispatch(fetchUserFeedbacksAction(data)),
  fetchCommunityHashtagsAction: (data) => dispatch(fetchCommunityHashtagsAction(data)),
  clearDataProductByCategoryAction: () => dispatch(clearDataProductByCategoryAction()),
  clearDataCommunityHashtagsAction: () => dispatch(clearDataCommunityHashtagsAction()),
  fetchUserBoxesToFeedbackAction: (data) => dispatch(fetchUserBoxesToFeedbackAction(data)),
  fetchHomeProductByCategoryAction: (data) => dispatch(fetchHomeProductByCategoryAction(data)),
  clearDataCommunityHashtagFeedsAction: () => dispatch(clearDataCommunityHashtagFeedsAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CommunityPanelContainer);
