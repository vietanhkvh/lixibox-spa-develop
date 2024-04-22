import { connect } from 'react-redux';

import { displayLiveBackgroundAction } from '../../../flows/live/action';

import Component from './component';

const mapStateToProps = (state) => ({
  liveDetailStore: state.live.liveDetail,
  isShowLiveBackgroundStore: state.live.isShowLiveBackground
});

const mapDispatchToProps = (dispatch) => ({
  displayLiveBackgroundAction: (data) => dispatch(displayLiveBackgroundAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Component);
