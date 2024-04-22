import classNames from 'classnames';
import TrackVisibility from 'lixibox-react-on-screen';

import WrapLayout from '../../../../../container/layout/wrap';
import SplitLayout from '../../../../../container/layout/split';
import MainBlock from '../../../../../container/layout/main-block';
import LoadingPlaceholder from '../../../../ui/loading-placeholder';
import ProductItem from '../../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../../presentation-component/item-list-hoc/item-vertical-list';
import Loading from '../../../../../components/ui/loading';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import { BOX_CATEGORY } from '../../component';
import DiscountCodeSummary from '../../../summary';
import * as VARIABLE from '../../../../../style/variable';
import styles from './style.module.scss';

interface ClientAreaProps {
  boxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  boxCategory: string;
  hasPageToLoad: boolean;
  hasNoContent: boolean;
  onNoContentClick: () => any;
  onLoadMore: () => any;
}
const ClientArea = ({
  boxes,
  boxCategory,
  hasPageToLoad,
  hasNoContent,
  onNoContentClick,
  onLoadMore
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
      {boxCategory === BOX_CATEGORY.GiftBoxes && !!boxes.index.length && (
        <>
          <div className={styles.verticalListTitle}>{'Danh sách quà tặng'}</div>
          <ItemVerticalList column={4}>
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
        </>
      )}
      {boxCategory === BOX_CATEGORY.SpecialAddons && !!boxes.index.length && (
        <>
          <div className={styles.verticalListTitle}>{'Mua sản phẩm với giá ưu đãi'}</div>
          <ItemVerticalList column={4}>
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
        </>
      )}
      {boxCategory === BOX_CATEGORY.ApplicableBoxes && !!boxes.index.length && (
        <>
          <div className={styles.verticalListTitle}>{`${boxes.count} sản phẩm được áp dụng`}</div>
          <ItemVerticalList column={4}>
            {boxes.index.map((item, index) => (
              <ProductItem key={item.id || index} product={item} isFullPadding isShowVariants={true} />
            ))}
          </ItemVerticalList>
        </>
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

const renderItemPlaceholder = (item) => (
  <div className={styles.productItem} key={item}>
    <LoadingPlaceholder style={styles.image} />
    <LoadingPlaceholder style={styles.text} />
    <LoadingPlaceholder style={styles.lastText} />
  </div>
);
const renderLoadingPlaceholder = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className={styles.placeholder}>
      <LoadingPlaceholder
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

interface ViewProps {
  code: string;
  boxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  boxCategory: string;
  isLoaded: boolean;
  hasPageToLoad: boolean;
  hasNoContent: boolean;
  onNoContentClick: () => any;
  onLoadMore: () => any;
  classes?: { container?: string };
}
const View = ({
  code,
  boxes,
  boxCategory,
  isLoaded,
  hasPageToLoad,
  hasNoContent,
  onNoContentClick,
  onLoadMore,
  classes
}: ViewProps) => {
  return (
    <div className={classNames(styles.container, classes && classes.container)}>
      {isLoaded && hasNoContent ? (
        <div className={styles.layoutNoBoxes}>
          <PrimaryTitle code={code} isLoaded={isLoaded} className={styles.title} />
          <DiscountCodeSummary code={code} classes={{ container: styles.info }} />
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
                        boxes,
                        boxCategory,
                        hasPageToLoad,
                        hasNoContent,
                        onNoContentClick,
                        onLoadMore
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
