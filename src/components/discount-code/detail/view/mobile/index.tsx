import classNames from 'classnames';
import ItemCarousel from '../../../../../presentation-component/item-list-hoc/item-carousel';
import ProductSlider from 'presentation-component/general/desktop/product-slider';
import ItemVerticalList from '../../../../../presentation-component/item-list-hoc/item-vertical-list';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import Loading from '../../../../../components/ui/loading';
import ProductItem from '../../../../../presentation-component/product/product-item';
import { ObserveVisibility } from '../../../../../utils/visibility';
import DiscountCodeSummary from '../../../summary';
import { ViewProps } from '../../component';
import styles from './style.module.scss';

const View = ({
  code,
  specialAddons,
  applicableBoxes,
  giftBoxes,
  isLoaded,
  isFailed,
  isCompact,
  hasPageToLoad,
  onLoadMore,
  onSectionItemClick,
  classes
}: ViewProps) => {
  return isFailed ? (
    <NoContentPlaceholder
      title="Mã giảm giá không hợp lệ"
      info="Mã giảm giá sai hoặc đã hết hạn sử dụng."
      logo={NO_CONTENT_LOGO.ROBOT}
      className={styles.noContentPlaceholder}
    />
  ) : !isLoaded ? (
    <Loading />
  ) : (
    <div className={classNames(styles.container, classes && classes.container)}>
      <DiscountCodeSummary code={code} classes={{ container: styles.info }} />
      {!!giftBoxes.index.length &&
        (isCompact ? (
          <ProductSlider
            {...{
              column: 2,
              data: giftBoxes.index.map((item, index) => ({
                key: item.id || index,
                product: item,
                isFullPadding: true,
                isShowRating: false,
                customPricing: { price: 0 },
                tag: 'Quà tặng',
                isPrivateMode: false,
                isShowVariants: false
              })),
              template: ProductItem,
              className: styles.compactSlider,
              sliderClassName: 'zzz',
              sliderItemClassName: styles.compactSliderItem,
              onSectionItemClick
            }}
          />
        ) : (
          <ItemCarousel
            viewMore={giftBoxes.showAll ? 'Xem tất cả' : ''}
            viewMoreLink={giftBoxes.showAllLink}
            title={'Danh sách quà tặng'}
            classes={
              isCompact
                ? { container: styles.carousel, child: styles.child }
                : { container: styles.carousel, child: styles.nonCompactChild }
            }
          >
            {giftBoxes.index.map((item, index) => (
              <ProductItem
                key={item.id || index}
                product={item}
                isFullPadding
                isShowRating={false}
                customPricing={{ price: 0 }}
                tag={'Quà tặng'}
                isPrivateMode={false}
                isShowVariants={false}
                onClick={() => onSectionItemClick?.(item, index, 'gift')}
              />
            ))}
          </ItemCarousel>
        ))}
      {/* TODO: Verify */}
      {!!specialAddons.index.length && (
        <ItemCarousel
          viewMore={specialAddons.showAll ? 'Xem tất cả' : ''}
          viewMoreLink={specialAddons.showAllLink}
          title={'Mua sản phẩm với giá ưu đãi'}
          classes={
            isCompact
              ? { container: styles.carousel, child: styles.child }
              : { container: styles.carousel, child: styles.nonCompactChild }
          }
        >
          {specialAddons.index.map((item, index) => (
            <ProductItem
              key={item.id || index}
              product={item}
              outOfStockLabel={'Hết quà'}
              isFullPadding
              isShowPricing
              isShowRating
              isPrivateMode
              customPricing={{ price: item.add_on_price || 0 }}
              onClick={() => onSectionItemClick?.(item, index, 'special')}
            />
          ))}
        </ItemCarousel>
      )}
      {!!applicableBoxes.index.length && (
        <ItemVerticalList title={`${applicableBoxes.count} sản phẩm được áp dụng`}>
          {applicableBoxes.index.map((item, index) => (
            <ProductItem
              key={item.id || index}
              product={item}
              isFullPadding
              isShowVariants={true}
              onClick={() => onSectionItemClick?.(item, index, 'applicable')}
            />
          ))}
        </ItemVerticalList>
      )}
      {hasPageToLoad && (
        <ObserveVisibility threshold={0.1}>
          {({ isVisible }) => {
            !!isVisible && onLoadMore();
            return <Loading />;
          }}
        </ObserveVisibility>
      )}
    </div>
  );
};

export default View;
