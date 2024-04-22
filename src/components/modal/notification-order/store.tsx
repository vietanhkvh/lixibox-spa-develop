import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendSubcribeInfoAction } from '../../../flows/subcribe/action';

import component from './component';

const mapStateToProps = (state) => ({
  subcribeStore: state.subcribe
});

const mapDispatchToProps = (dispatch) => ({
  sendSubcribeInfoAction: (data: any) => dispatch(sendSubcribeInfoAction(data))
});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(component));
