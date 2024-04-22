import { connect } from 'react-redux';

import { openModalAction } from '../../../flows/modal/action';
import { fecthActivityFeedListNavigationAction } from '../../../flows/activity-feed/action';
import { fetchMagazineListAction, fetchMagazineDashboardAction } from '../../../flows/magazine/action';
import { fetchBannerAction } from '../../../flows/banner/action';
import { fetchBrandListAction } from '../../../flows/brand/action';
import { fetchListMenuAction } from '../../../flows/menu/action';
import { fetchThemeAction } from '../../../flows/banner/action';
import DesktopNavigation from './component';
import { IProps } from './model';

const mapStateToProps = (state) =>
  ({
    menuStore: state.menu,
    activityFeedStore: state.activityFeed,
    brandStore: state.brand,
    magazineStore: state.magazine,
    bannerStore: state.banner,
    themeListStore: state.banner.theme.list
  } as IProps);

const mapDispatchToProps = (dispatch) =>
  ({
    openModal: (data: any) => dispatch(openModalAction(data)),
    fecthActivityFeedListNavigationAction: () => dispatch(fecthActivityFeedListNavigationAction()),
    fetchMagazineDashboardAction: () => dispatch(fetchMagazineDashboardAction()),
    fetchMagazineListAction: (data) => dispatch(fetchMagazineListAction(data)),
    fetchBrandListAction: () => dispatch(fetchBrandListAction()),
    fetchListMenuAction: () => dispatch(fetchListMenuAction()),
    fetchBannerAction: (data) => dispatch(fetchBannerAction(data)),
    fetchThemeAction: () => dispatch(fetchThemeAction())
  } as IProps);

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DesktopNavigation);
