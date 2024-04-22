import { connect } from 'react-redux';

import InfoAboutContainer from './container';
import { updateMetaInfoAction } from '../../../../flows/meta/action';

const mapStateToProps = (state) => ({
  cartStore: state.cart,
  appStore: state.app
});

const mapDispatchToProps = (dispatch) => ({
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(InfoAboutContainer);
