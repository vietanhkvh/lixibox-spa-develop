import classNames from 'classnames';

import WrapLayout from '../../../../../container/layout/wrap';
import SplitLayout from '../../../../../container/layout/split';
import MainBlock from '../../../../../container/layout/main-block';
import LoadingPlaceholder2 from '../../../../ui/loading-placeholder';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import ProductSlider from '../../../../../presentation-component/general/desktop/product-slider-with-heading';
import ProductItem from '../../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../../presentation-component/item-list-hoc/item-vertical-list';
import Loading from '../../../../../components/ui/loading';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import { ObserveVisibility } from '../../../../../utils/visibility';
import DiscountCodeSummary from '../../../summary';
import * as VARIABLE from '../../../../../style/variable';
import { ViewProps } from '../../component';
import styles from './style.module.scss';
import { ProductBox } from 'types/api/shop';

interface ICombinedProductSlider {
  dataList: Array<any>;
  title: string;
  viewMoreTitle?: string;
  viewMoreLink?: string;
  isShowViewMore?: boolean;

  isShowVariants?: boolean;
  isPrivateMode?: boolean;
  isFullPadding?: boolean;
  isShowRating?: boolean;
  customPricing?: any;
  outOfStockLabel?: string;
  tag?: any;
  isAddon?: boolean;
  [key: string]: any;
}
const CombinedProductSlider = ({
  isShowVariants = true,
  isPrivateMode = false,
  isFullPadding = false,
  isShowRating = true,
  customPricing = {},
  tag = '',
  isAddon = false,
  dataList,
  outOfStockLabel,
  ...props
}: ICombinedProductSlider) => {
  const dataProps = dataList.map((product) =>
    Object.assign(
      {},
      {
        key: product.id,
        product,
        isShowVariants,
        isPrivateMode,
        isFullPadding,
        isShowRating,
        customPricing,
        outOfStockLabel,
        tag
      },
      isAddon && { customPricing: { price: product.add_on_price || 0 } }
    )
  );

  return <ProductSlider data={dataProps} template={ProductItem} {...props} />;
};

interface ClientAreaProps {
  specialAddons: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  applicableBoxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  giftBoxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  hasPageToLoad: boolean;
  hasNoContent: boolean;
  onNoContentClick: () => any;
  onLoadMore: () => any;
  onSectionItemClick?: (box: ProductBox, index: number, section: string) => void;
}
const ClientArea = ({
  giftBoxes,
  specialAddons,
  applicableBoxes,
  hasPageToLoad,
  hasNoContent,
  onNoContentClick,
  onLoadMore,
  onSectionItemClick
}: ClientAreaProps) => {
  return (
    <div className={styles.clientArea}>
      {hasNoContent && (
        <NoContentPlaceholder
          logo={NO_CONTENT_LOGO.SHIPMENT}
          onClick={() => onNoContentClick()}
          className={styles.noContentPlaceholder}
        />
      )}
      {!!giftBoxes.index.length && (
        <div className={styles.combinedProductContainer}>
          <CombinedProductSlider
            dataList={giftBoxes.index}
            title={'Danh sách quà tặng'}
            viewMoreLink={giftBoxes.showAllLink}
            outOfStockLabel={'Hết quà'}
            isShowViewMore={giftBoxes.showAll}
            isFullPadding
            isShowRating={false}
            customPricing={{ price: 0 }}
            tag={'Quà tặng'}
            isPrivateMode={false}
            isShowVariants={false}
            classes={{ container: styles.productSliderContainer, titleSection: styles.sliderTitle }}
            sliderClassName={styles.sliderClassName}
            sliderItemClassName={styles.sliderItemClassName}
            onItemClick={(box, index) => onSectionItemClick?.(box, index, 'gift')}
          />
        </div>
      )}
      {!!specialAddons.index.length && (
        <CombinedProductSlider
          dataList={specialAddons.index}
          title={'Mua sản phẩm với giá ưu đãi'}
          viewMoreLink={specialAddons.showAllLink}
          outOfStockLabel={'Hết hàng'}
          isShowViewMore={specialAddons.showAll}
          isFullPadding
          isShowPricing
          isShowRating
          isPrivateMode
          isAddon
          classes={{ container: styles.productSliderContainer, titleSection: styles.sliderTitle }}
          onItemClick={(box, index) => onSectionItemClick?.(box, index, 'special')}
        />
      )}
      {!!applicableBoxes.index.length && (
        <div className={styles.verticalList}>
          <div
            className={classNames('headline-typo', styles.verticalListTitle)}
          >{`${applicableBoxes.count} sản phẩm được áp dụng`}</div>
          <ItemVerticalList column={4}>
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
        </div>
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

const renderItemPlaceholder = (item) => (
  <div className={styles.productItem} key={item}>
    <LoadingPlaceholder className={styles.image} />
    <LoadingPlaceholder className={styles.text} />
    <LoadingPlaceholder className={styles.lastText} />
  </div>
);
const renderLoadingPlaceholder = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className={styles.placeholder}>
      <LoadingPlaceholder2
        style={{
          background: VARIABLE.colorF0,
          display: VARIABLE.display.block,
          width: '50%',
          height: 40,
          margin: '0 auto 30px'
        }}
      />
      <div className={styles.productList}>{list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const PrimaryTitle = ({ code, isLoaded, className }: { code: string; isLoaded: boolean; className?: string }) => {
  return (
    <div className={classNames(styles.primaryTitle, className)}>{`Mã giảm giá${isLoaded ? `: #${code}` : ''}`}</div>
  );
};

const View = ({
  code,
  specialAddons,
  applicableBoxes,
  giftBoxes,
  isLoaded,
  isFailed,
  hasPageToLoad,
  hasNoContent,
  onNoContentClick,
  onLoadMore,
  onSectionItemClick,
  classes
}: ViewProps) => {
  return (
    <div className={classNames(styles.container, classes && classes.container)}>
      {(isLoaded && hasNoContent) || isFailed ? (
        <div className={styles.layoutNoBoxes}>
          {isFailed ? (
            <NoContentPlaceholder
              title="Mã giảm giá không hợp lệ"
              info="Mã giảm giá sai hoặc đã hết hạn sử dụng."
              logo={NO_CONTENT_LOGO.ROBOT}
              classes={{
                container: styles.loadFailedPlaceholder,
                title: styles.placeholderTitle,
                info: styles.placeholderInfo
              }}
            />
          ) : (
            <>
              <PrimaryTitle code={code} isLoaded={isLoaded} className={styles.title} />
              <DiscountCodeSummary code={code} classes={{ container: styles.info }} />
            </>
          )}
        </div>
      ) : (
        <WrapLayout>
          <SplitLayout
            subContainer={
              isLoaded ? (
                <div className={styles.sidebar}>
                  <DiscountCodeSummary code={code} classes={{ container: styles.info }} />
                </div>
              ) : null
            }
            mainContainer={
              <MainBlock
                {...{
                  title: <PrimaryTitle code={code} isLoaded={isLoaded} />,
                  style: {},
                  showHeader: true,
                  showViewMore: false,
                  content: isLoaded ? (
                    <ClientArea
                      {...{
                        giftBoxes,
                        specialAddons,
                        applicableBoxes,
                        hasPageToLoad,
                        hasNoContent,
                        onNoContentClick,
                        onLoadMore,
                        onSectionItemClick
                      }}
                    />
                  ) : (
                    renderLoadingPlaceholder()
                  )
                }}
              />
            }
          />
        </WrapLayout>
      )}
    </div>
  );
};

export default View;
