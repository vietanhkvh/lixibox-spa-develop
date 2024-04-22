import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../flows/meta/action';
import component from './component';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(component);
