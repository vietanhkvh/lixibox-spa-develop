import classNames from 'classnames';
import TrackVisibility from 'lixibox-react-on-screen';

import ItemVerticalList from '../../../../../presentation-component/item-list-hoc/item-vertical-list';
import Loading from '../../../../../components/ui/loading';
import ProductItem from '../../../../../presentation-component/product/product-item';
import DiscountCodeSummary from '../../../summary';
import { BOX_CATEGORY } from '../../component';
import styles from './style.module.scss';

interface ViewProps {
  code: string;
  boxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  boxCategory: string;
  isLoaded: boolean;
  hasPageToLoad: boolean;
  onLoadMore: () => any;
  classes?: { container?: string };
}
const View = ({ code, boxes, boxCategory, isLoaded, hasPageToLoad, onLoadMore, classes }: ViewProps) => {
  return !isLoaded ? (
    <Loading />
  ) : (
    <div className={classNames(styles.container, classes && classes.container)}>
      <DiscountCodeSummary code={code} classes={{ container: styles.info }} />
      {boxCategory === BOX_CATEGORY.GiftBoxes && !!boxes.index.length && (
        <ItemVerticalList title={'Danh sách quà tặng'}>
          {boxes.index.map((item, index) => (
            <ProductItem
              key={item.id || index}
              product={item}
              isFullPadding
              isShowRating={false}
              customPricing={{ price: 0 }}
              tag={'Quà tặng'}
              outOfStockLabel={'Hết quà'}
              isPrivateMode
              isShowVariants={false}
            />
          ))}
        </ItemVerticalList>
      )}
      {/* TODO: Verify */}
      {boxCategory === BOX_CATEGORY.SpecialAddons && !!boxes.index.length && (
        <ItemVerticalList title={'Mua sản phẩm với giá ưu đãi'}>
          {boxes.index.map((item, index) => (
            <ProductItem
              key={item.id || index}
              product={item}
              isFullPadding
              isShowPricing
              isShowRating
              isPrivateMode
              customPricing={{ price: item.add_on_price || 0 }}
            />
          ))}
        </ItemVerticalList>
      )}
      {boxCategory === BOX_CATEGORY.ApplicableBoxes && !!boxes.index.length && (
        <ItemVerticalList title={`${boxes.count} sản phẩm được áp dụng`}>
          {boxes.index.map((item, index) => (
            <ProductItem key={item.id || index} product={item} isFullPadding isShowVariants={true} />
          ))}
        </ItemVerticalList>
      )}
      {hasPageToLoad && (
        <TrackVisibility offset={10}>
          {({ isVisible }) => {
            !!isVisible && onLoadMore();
            return <Loading />;
          }}
        </TrackVisibility>
      )}
    </div>
  );
};

export default View;
