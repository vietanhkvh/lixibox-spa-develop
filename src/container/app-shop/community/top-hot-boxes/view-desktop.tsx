import SplitLayout from '../../../layout/split';
import RightBarCommunity from '../right-bar-container';
import { TOP_STAT_NAV } from '../../../../constants/application/community';
import STYLE from './style';
import styles from './style.module.scss';

import ProductItem from '../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';
import Loading from '../../../../components/ui/loading';
import { ViewedSource } from 'tracking/constants';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';

const CURRENT_TOP_NAV_CODE = 'communityGoodSale';
const getTopNavHeading = (topNav) => {
  const filtered = topNav.find((item) => CURRENT_TOP_NAV_CODE === item.code);
  if (!filtered) return '';
  return filtered.title;
};

const Heading = () => {
  return <div className={styles.heading}>{getTopNavHeading(TOP_STAT_NAV)}</div>;
};

const MainContainerView = ({ communityHotBoxes, onItemClick }) => {
  return (
    <div>
      <Heading />
      {!communityHotBoxes || !communityHotBoxes.length ? (
        <Loading />
      ) : (
        <ItemVerticalList column={3} className={styles.verticalList}>
          {communityHotBoxes.map((product, index) => (
            <ProductItem
              key={product.id || index}
              product={product}
              isFullPadding
              onClick={() => onItemClick?.(product, index)}
            />
          ))}
        </ItemVerticalList>
      )}
    </div>
  );
};

export function renderComponent() {
  const {
    activityFeedStore: { hashtags },
    feedbackStore: { userBoxesToFeedback },
    activityFeedStore: { communityHotBoxes }
  } = this.props;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: (
      <MainContainerView
        {...{
          communityHotBoxes,
          onItemClick: (box, index) => {
            gatewayTrackViewContentFromList({
              source: ViewedSource.HOT_BOXES,
              box,
              index
            });
          }
        }}
      />
    )
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
