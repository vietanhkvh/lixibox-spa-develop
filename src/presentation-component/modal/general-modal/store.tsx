// TODO: Move out of presentation-component
import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = (state) => ({
  appStore: state.app
});

export default connect<any, any, any>(mapStateToProps, null)(Component);
