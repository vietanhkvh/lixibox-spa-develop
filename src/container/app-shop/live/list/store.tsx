import Component from './component';
import { connect } from 'react-redux';

import { fetchLiveListAction } from '../../../../flows/live/action';

export const mapStateToProps = (state) => ({
  liveStore: state.live
});

export const mapDispatchToProps = (dispatch) => ({
  fetchLiveListAction: (data) => dispatch(fetchLiveListAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Component);
