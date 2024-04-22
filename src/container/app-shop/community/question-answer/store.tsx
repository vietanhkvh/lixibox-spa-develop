import { ConnectedProps, connect } from 'react-redux';

import { fecthActivityFeedListAction } from '../../../../flows/activity-feed/action';
import { fetchUserProfileAction } from 'flows/auth/action';
import { openModalAction } from '../../../../flows/modal/action';

import QuestionAnswerContainer from './container';
import { RootState } from 'types/redux';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  activityFeedStore: state.activityFeed,
  shopStore: state.shop,
  magazineStore: state.magazine,
  feedbackStore: state.feedback
});

export const mapDispatchToProps = {
  fecthActivityFeedListAction,
  fetchUserProfileAction,
  openModalAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(QuestionAnswerContainer);
