import { connect } from 'react-redux';
import MetaInfoComposite from './component';

export const mapStateToProps = (state) => ({
  shopStore: state.shop
});
export const mapDispatchToProps = (dispatch) => ({});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MetaInfoComposite);
