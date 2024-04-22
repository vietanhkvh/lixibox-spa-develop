import { ConnectedProps, connect } from 'react-redux';
import { getCollectionDetailAction } from 'flows/activity-feed/action';
import { RootState } from 'types/redux';
import CollectionDetailContainer from './container';

export const mapStateToProps = (state: RootState) => ({
  activityFeedStore: state.activityFeed,
  authStore: state.auth,
  shopStore: state.shop,
  feedbackStore: state.feedback,
  magazineStore: state.magazine
});

export const mapDispatchToProps = {
  getCollectionDetailAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CollectionDetailContainer);
