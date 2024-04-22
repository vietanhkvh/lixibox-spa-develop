import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';
import MobileScreenHeaderDropdown from '../../../../presentation-component/general/mobile-screen-header-dropdown';
import SeparateLine from '../../../../presentation-component/ui/separate-line';
import FeedList from '../../../../components/container/feed-list';
import Loading from '../../../../components/ui/loading';
import { objectToHash } from '../../../../utils/encode';

import { TOP_STAT_NAV } from '../../../../constants/application/community';
const CURRENT_TOP_NAV_CODE = 'hash';

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
  const { isOpenScreenHeaderDropdown, selectedHashIndex } = this.state;
  const {
    activityFeedStore: { hashtags, hashtagFeeds },
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

  const hashString = objectToHash({ days: 7 });
  const tabs = (!!hashtags && hashtags[hashString]) || [];
  const formatTabs = tabs.map((item, index) => ({
    title: `${item.name} (${item.count})`,
    name: item.name,
    id: index,
    selected: index === selectedHashIndex
  }));

  const mobileTabHeaderProps = {
    isBorderStyle: true,
    tabs: formatTabs,
    onSelect: this.handleSelectHashTabs.bind(this)
  };

  const feedListProps = {
    history,
    userProfile: userInfo,
    list: hashtagFeeds,
    style: {}
  };

  return (
    <div>
      <MobileAutoDisplayHeader fixHeight={114}>
        <MobileScreenHeader {...mobileScreenHeaderProps} />
        <MobileScreenHeaderDropdown {...mobileScreenHeaderDropdownProps} />
        <MobileTabHeader {...mobileTabHeaderProps} />
      </MobileAutoDisplayHeader>
      <SeparateLine />
      {!hashtagFeeds || !hashtagFeeds.length ? <Loading /> : <FeedList {...feedListProps} />}
    </div>
  );
}
export default view;
