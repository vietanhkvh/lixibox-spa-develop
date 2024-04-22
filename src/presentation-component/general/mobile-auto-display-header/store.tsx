import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MobileAutoDisplayHeader from './component';

const mapStateToProps = (state) => ({
  appStore: state.app
});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps)(MobileAutoDisplayHeader));
