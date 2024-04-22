import { connect } from 'react-redux';
import AdminEditButton from './component';

export const mapStateToProps = (state) => ({
  authStore: state.auth
});
export const mapDispatchToProps = (dispatch) => ({});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AdminEditButton);
