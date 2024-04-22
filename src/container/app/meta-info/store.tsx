import { connect } from 'react-redux';
import { updateMetaInfoAction } from '../../../flows/meta/action';

import container from './container';

const mapStateToProps = (state) => ({
  metaStore: state.meta
});

const mapDispatchToProps = (dispatch) => ({
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(container);
