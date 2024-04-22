import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import MobileScreenHeaderDropdown from '../../../../presentation-component/general/mobile-screen-header-dropdown';
import SeparateLine from '../../../../presentation-component/ui/separate-line';
import FeedList from '../../../../components/container/feed-list';
import Loading from '../../../../components/ui/loading';

import { TOP_STAT_NAV } from '../../../../constants/application/community';
const CURRENT_TOP_NAV_CODE = 'communityTopLiked';

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
  const { isOpenScreenHeaderDropdown } = this.state;
  const {
    activityFeedStore: { communityTopLiked },
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

  const feedListProps = {
    history,
    userProfile: userInfo,
    list: communityTopLiked,
    style: {}
  };

  return (
    <div>
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader {...mobileScreenHeaderProps} />
        <MobileScreenHeaderDropdown {...mobileScreenHeaderDropdownProps} />
      </MobileAutoDisplayHeader>
      <SeparateLine />
      {!communityTopLiked || !communityTopLiked.length ? <Loading /> : <FeedList {...feedListProps} />}
    </div>
  );
}
export default view;
