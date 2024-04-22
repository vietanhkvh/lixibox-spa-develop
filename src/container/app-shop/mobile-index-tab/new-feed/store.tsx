import { ConnectedProps, connect } from 'react-redux';

import { fecthActivityFeedListAction } from '../../../../flows/activity-feed/action';
import { fetchUserProfileAction } from 'flows/auth/action';

import { RootState } from 'types/redux';
import NewFeedContainer from './container';

export const mapStateToProps = (state: RootState) => ({
  authStore: state.auth,
  activityFeedStore: state.activityFeed
});

export const mapDispatchToProps = {
  fecthActivityFeedListAction,
  fetchUserProfileAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NewFeedContainer);
