import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import MobileScreenHeaderDropdown from '../../../../presentation-component/general/mobile-screen-header-dropdown';
import Loading from '../../../../components/ui/loading';
import ReviewStickyList from '../../../../presentation-component/feed/review-sticky-list';

import { TOP_STAT_NAV } from '../../../../constants/application/community';
const CURRENT_TOP_NAV_CODE = 'communityTopReview';

const formatTopNav = (topNav) => {
  return topNav.map((item) => ({
    ...item,
    selected: CURRENT_TOP_NAV_CODE === item.code
  }));
};

const getTopNavHeading = (topNav) => {
  const filtered = topNav.find((item) => CURRENT_TOP_NAV_CODE === item.code);
  if (!filtered) return '';
  return filtered.title;
};

function view() {
  const { isOpenScreenHeaderDropdown, isDisplayMobileAutoHeaeder } = this.state;
  const {
    activityFeedStore: { communityTopReview },
    authStore: { userInfo },
    history
  } = this.props;

  const mobileScreenHeaderProps = {
    title: getTopNavHeading(TOP_STAT_NAV),
    isShowIcon: true,
    onClick: () => this.handleDisplayScreenHeaderDropdown(!isOpenScreenHeaderDropdown)
  };

  const mobileScreenHeaderDropdownProps = {
    isOpen: isOpenScreenHeaderDropdown,
    list: formatTopNav(TOP_STAT_NAV),
    onClick: () => this.handleDisplayScreenHeaderDropdown(false)
  };

  window.addEventListener('scroll', () => {
    !!isOpenScreenHeaderDropdown && this.handleDisplayScreenHeaderDropdown(false);
  });

  const reviewStickyListProps = {
    stickyPosition: !!isDisplayMobileAutoHeaeder ? 94 : 50,
    history,
    userProfile: userInfo,
    list: communityTopReview,
    style: {}
  };

  return (
    <div>
      <MobileAutoDisplayHeader row={1} onSetDisplay={this.handleDisplayMobileAutoHeaeder.bind(this)}>
        <MobileScreenHeader {...mobileScreenHeaderProps} />
        <MobileScreenHeaderDropdown {...mobileScreenHeaderDropdownProps} />
      </MobileAutoDisplayHeader>

      {!communityTopReview || !communityTopReview.length ? (
        <Loading />
      ) : (
        <ReviewStickyList {...reviewStickyListProps} />
      )}
    </div>
  );
}
export default view;
