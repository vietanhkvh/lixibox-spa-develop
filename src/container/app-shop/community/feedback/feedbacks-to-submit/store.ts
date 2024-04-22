import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import container from './container';

export const mapStateToProps = (state) => ({
  feedbackStore: state.feedback
});

export const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(container));
