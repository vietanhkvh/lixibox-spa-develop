import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import MobileScreenHeaderDropdown from '../../../../presentation-component/general/mobile-screen-header-dropdown';
import Loading from '../../../../components/ui/loading';

import ProductItem from '../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';

import { TOP_STAT_NAV } from '../../../../constants/application/community';
import styles from './style.module.css';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import { ROUTING_SHOP_INDEX } from 'routings/path';

const CURRENT_TOP_NAV_CODE = 'communityGoodSale';

function RenderBoxItem(product, index) {
  return <ProductItem key={product.id || index} product={product} isFullPadding />;
}

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
    activityFeedStore: { communityGoodSale, isFetchCommunityGoodSale },
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

  return (
    <div>
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader {...mobileScreenHeaderProps} />
        <MobileScreenHeaderDropdown {...mobileScreenHeaderDropdownProps} />
      </MobileAutoDisplayHeader>
      {isFetchCommunityGoodSale && isFetchCommunityGoodSale ? (
        <Loading />
      ) : !communityGoodSale || !communityGoodSale.length ? (
        <NoContentPlaceholder
          title="Chưa có nội dung"
          info="Hiện tại chưa có nội dung nào, vui lòng quay lại sau bạn nhé!"
          logo={NO_CONTENT_LOGO.SHIPMENT}
          action={{ text: 'Tiếp tục mua sắm' }}
          onClick={() => history.push(ROUTING_SHOP_INDEX)}
          className={styles.noContentPlaceholder}
        />
      ) : (
        <ItemVerticalList className={styles.verticalList}>{communityGoodSale.map(RenderBoxItem)}</ItemVerticalList>
      )}
    </div>
  );
}
export default view;
