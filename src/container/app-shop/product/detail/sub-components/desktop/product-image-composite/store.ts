import { connect } from 'react-redux';
import { openModalAction } from 'flows/modal/action';
import ProductImageComposite from './component';

export const mapStateToProps = (state) => ({});
export const mapDispatchToProps = (dispatch) => ({
  openModalAction: (data) => dispatch(openModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProductImageComposite);
