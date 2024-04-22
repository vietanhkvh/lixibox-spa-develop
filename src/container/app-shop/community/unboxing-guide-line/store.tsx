import { connect } from 'react-redux';
import { fetchUnboxingConfigAction } from 'flows/unboxing/action';
import UnboxingGuideline from './component';

export const mapStateToProps = (state) => ({
  unboxingStore: state.unboxing
});

export const mapDispatchToProps = (dispatch) => ({
  fetchUnboxingConfigAction: () => dispatch(fetchUnboxingConfigAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UnboxingGuideline);
