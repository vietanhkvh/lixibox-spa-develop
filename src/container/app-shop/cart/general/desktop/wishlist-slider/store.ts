import { connect } from 'react-redux';
import WishlistSlider from './container';

export const mapStateToProps = (state) => ({
  likeStore: state.like
});

export const mapDispatchToProps = (dispatch) => ({});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(WishlistSlider);
