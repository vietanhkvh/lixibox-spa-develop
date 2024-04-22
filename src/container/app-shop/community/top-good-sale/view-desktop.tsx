import SplitLayout from '../../../layout/split';
import RightBarCommunity from '../right-bar-container';
import { TOP_STAT_NAV } from '../../../../constants/application/community';
import STYLE from './style';
import styles from './style.module.scss';

import ProductItem from '../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';
import Loading from '../../../../components/ui/loading';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import { ROUTING_SHOP_INDEX } from 'routings/path';

function RenderBoxItem(product, index) {
  return <ProductItem key={product.id || index} product={product} isFullPadding />;
}

const CURRENT_TOP_NAV_CODE = 'communityGoodSale';
const getTopNavHeading = (topNav) => {
  const filtered = topNav.find((item) => CURRENT_TOP_NAV_CODE === item.code);
  if (!filtered) return '';
  return filtered.title;
};

const Heading = () => {
  return <div className={styles.heading}>{getTopNavHeading(TOP_STAT_NAV)}</div>;
};

function view({ communityGoodSale, isFetchCommunityGoodSale, history }) {
  return (
    <div>
      <Heading />
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
        <ItemVerticalList column={3} className={styles.verticalList}>
          {communityGoodSale.map(RenderBoxItem)}
        </ItemVerticalList>
      )}
    </div>
  );
}

export function renderComponent() {
  const {
    activityFeedStore: { hashtags },
    feedbackStore: { userBoxesToFeedback },
    activityFeedStore: { communityGoodSale, isFetchCommunityGoodSale },
    history
  } = this.props;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: view.bind(this)({ communityGoodSale, isFetchCommunityGoodSale, history })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
