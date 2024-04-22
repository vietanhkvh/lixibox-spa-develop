import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import MobileScreenHeaderDropdown from '../../../../presentation-component/general/mobile-screen-header-dropdown';
import Loading from '../../../../components/ui/loading';

import ProductItem from '../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';
import { ViewedSource } from 'tracking/constants';
import { TOP_STAT_NAV } from '../../../../constants/application/community';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import styles from './style.module.css';

const CURRENT_TOP_NAV_CODE = 'communityHotBoxes';

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
    activityFeedStore: { communityHotBoxes }
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

  const onItemClick = (box, index) => {
    gatewayTrackViewContentFromList({
      source: ViewedSource.HOT_BOXES,
      box,
      index
    });
  };

  return (
    <div>
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader {...mobileScreenHeaderProps} />
        <MobileScreenHeaderDropdown {...mobileScreenHeaderDropdownProps} />
      </MobileAutoDisplayHeader>
      {!communityHotBoxes || !communityHotBoxes.length ? (
        <Loading />
      ) : (
        <ItemVerticalList className={styles.verticalList}>
          {communityHotBoxes.map((item, index) => (
            <ProductItem
              key={item.id || index}
              product={item}
              isFullPadding
              onClick={() => onItemClick?.(item, index)}
            />
          ))}
        </ItemVerticalList>
      )}
    </div>
  );
}
export default view;
