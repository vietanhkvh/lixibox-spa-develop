// TODO: Move out of presentation component
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SocialShare from './component';

const mapStateToProps = (state) => ({
  metaStore: state.meta,
  shopStore: state.shop,
  magazineStore: state.magazine
});

export default withRouter<any, any>(connect<any, any, any>(mapStateToProps)(SocialShare));
