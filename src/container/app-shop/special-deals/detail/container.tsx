import { PureComponent } from 'react';

import { objectToHash } from '../../../../utils/encode';
import { isUndefined } from '../../../../utils/validate';
import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../../constants/application/default';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class SpecialDealsDetailContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { fetchSpecialDealBySlug } = this.props as IProps;

    fetchSpecialDealBySlug({ slug: 'weekly-specials' });

    this.fetchSpecialDealBanner('weekly-specials');

    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const { isSubCategoryOnTop, heightSubCategoryToTop = 0 } = this.state as IState;

    let eleInfo = this.getPositionElementById('special-deals-menu');

    eleInfo &&
      eleInfo.top <= 0 &&
      !isSubCategoryOnTop &&
      this.setState({
        isSubCategoryOnTop: true,
        heightSubCategoryToTop: window.scrollY
      });

    heightSubCategoryToTop >= window.scrollY && isSubCategoryOnTop && this.setState({ isSubCategoryOnTop: false });
  }

  getPositionElementById(elementId) {
    const el = document.getElementById(elementId);
    return el && el.getBoundingClientRect();
  }

  handleShowSubCategory() {
    this.setState({ showSubCategory: !this.state.showSubCategory });
  }

  fetchSpecialDealBanner(url) {
    const {
      fetchBannerAction,
      bannerStore: { bannerList }
    } = this.props as IProps;

    const bannerId = this.getBannerIdByUrl(url);

    const isWeeklySpecialsLarge = bannerId === BANNER_ID.WEEKLY_SPECIALS_LARGE;

    /** Special weekly banner */
    const specialDealBannerParam = {
      idBanner: bannerId,
      limit: isWeeklySpecialsLarge ? 30 : BANNER_LIMIT_DEFAULT
    };

    const specialDealBannerHash = objectToHash(specialDealBannerParam);
    isUndefined(bannerList[specialDealBannerHash]) && fetchBannerAction(specialDealBannerParam);

    // Get weekly specials small
    if (isWeeklySpecialsLarge) {
      const weeklySpecialSmallParam = {
        idBanner: BANNER_ID.WEEKLY_SPECIALS_SMALL,
        limit: 30
      };

      const weeklySpecialSmallHash = objectToHash(weeklySpecialSmallParam);
      isUndefined(bannerList[weeklySpecialSmallHash]) && fetchBannerAction(weeklySpecialSmallParam);

      const weeklySpecialSmallTwoParam = {
        idBanner: BANNER_ID.WEEKLY_SPECIALS_SMALL_02,
        limit: 30
      };

      const weeklySpecialSmallTwoHash = objectToHash(weeklySpecialSmallTwoParam);
      isUndefined(bannerList[weeklySpecialSmallTwoHash]) && fetchBannerAction(weeklySpecialSmallTwoParam);

      const weeklySpecialLargeTwoParam = {
        idBanner: BANNER_ID.WEEKLY_SPECIALS_LARGE_02,
        limit: 30
      };

      const weeklySpecialLargeTwoHash = objectToHash(weeklySpecialLargeTwoParam);
      isUndefined(bannerList[weeklySpecialLargeTwoHash]) && fetchBannerAction(weeklySpecialLargeTwoParam);
    }
  }

  getBannerIdByUrl(url) {
    if (url && url.indexOf(BANNER_ID.WEEKLY_SPECIALS_LARGE) >= 0) {
      return BANNER_ID.WEEKLY_SPECIALS_LARGE;
    }

    if (url && url.indexOf(BANNER_ID.EVERYDAY_DEALS) >= 0) {
      return BANNER_ID.EVERYDAY_DEALS;
    }

    if (url && url.indexOf(BANNER_ID.SUMMER_SALE) >= 0) {
      return BANNER_ID.SUMMER_SALE;
    }

    return BANNER_ID.WEEKLY_SPECIALS_LARGE;
  }

  componentWillUnmount() {
    window.addEventListener('scroll', () => {});
    this.props.clearDataBannerAction();
  }

  render() {
    const args = {
      state: this.state,
      props: this.props,
      getBannerIdByUrl: this.getBannerIdByUrl.bind(this),
      handleShowSubCategory: this.handleShowSubCategory.bind(this)
    };

    return renderView(args);
  }
}

export default SpecialDealsDetailContainer;
