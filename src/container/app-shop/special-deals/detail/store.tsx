import { connect } from 'react-redux';

import { clearDataBannerAction, fetchBannerAction } from '../../../../flows/banner/action';
import { fetchSpecialDealBySlugAction } from '../../../../flows/special-deals/action';
import SpecialDealsDetailContainer from './container';

const mapStateToProps = (state) => ({
  bannerStore: state.banner,
  specialDealStore: state.specialDeals
});

const mapDispatchToProps = (dispatch) => ({
  clearDataBannerAction: () => dispatch(clearDataBannerAction()),
  fetchBannerAction: (data) => dispatch(fetchBannerAction(data)),
  fetchSpecialDealBySlug: ({ slug }) => dispatch(fetchSpecialDealBySlugAction({ slug }))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SpecialDealsDetailContainer);
