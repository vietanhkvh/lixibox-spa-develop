import { ConnectedProps, connect } from 'react-redux';
import { likeAFeedbackAction, unlikeAFeedbackAction } from 'flows/shop/action';
import { openModalAction } from 'flows/modal/action';
import { RootState } from 'types/redux';
import ListFeedbackItem from './component';

const mapStateToProps = (state: RootState) => ({
  shopStore: state.shop
});

const mapDispatchToProps = {
  likeAFeedbackAction,
  unlikeAFeedbackAction,
  openModalAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ListFeedbackItem);
