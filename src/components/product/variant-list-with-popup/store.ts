import { connect } from 'react-redux';

import VariantListWithPopup from './component';

const mapStateToProps = (state) => ({
  shopStore: state.shop
});

export default connect<any, any, any>(mapStateToProps)(VariantListWithPopup);
