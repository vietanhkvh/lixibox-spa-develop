import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUnboxingConfigAction } from 'flows/unboxing/action';
import { addLoveAction } from 'flows/love/action';
import UnboxingFeedbackInnerBlock from './component';

export const mapStateToProps = (state) => ({
  authStore: state.auth,
  loveStore: state.love,
  unboxingStore: state.unboxing
});

export const mapDispatchToProps = (dispatch) => ({
  addLoveAction: (data) => dispatch(addLoveAction(data)),
  fetchUnboxingConfigAction: () => dispatch(fetchUnboxingConfigAction())
});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UnboxingFeedbackInnerBlock));
