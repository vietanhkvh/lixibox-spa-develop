import classNames from 'classnames';
import MobileAutoDisplayHeader from '../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../presentation-component/general/mobile-screen-header';
import ProductItem from '../../presentation-component/product/product-item';
import ItemVerticalList from '../../presentation-component/item-list-hoc/item-vertical-list';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../presentation-component/general/mobile/no-content-placeholder';
import { isMobileVersion } from '../../utils/responsive';
import LoadingPlaceholder from '../ui/loading-placeholder';
import Pagination from 'components/general/pagination';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { getItemIndexAcrossPages } from 'utils/page';

import { IProps, IState } from './model';
import styles from './style.module.scss';
import STYLE from './style';

export const renderItemPlaceholder = (item) => (
  <div
    style={Object.assign({}, STYLE.placeholder.productItem, isMobileVersion() && STYLE.placeholder.productMobileItem)}
    key={item}
  >
    <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.lastText} />
  </div>
);

const renderLoadingPlaceholder = () => {
  const list = isMobileVersion() ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div style={STYLE.placeholder}>
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const renderView = ({ props, state }) => {
  const { list, style, current, per, total, urlList } = props as IProps;

  const { isLoadingList } = state as IState;

  return (
    <div className={'summary-watched-list'} style={Object.assign({}, STYLE.container, style)}>
      {!!isMobileVersion() ? (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={'Sản phẩm đã xem'} />
        </MobileAutoDisplayHeader>
      ) : (
        <div className={styles.desktopHeading}>Sản phẩm đã xem</div>
      )}
      {isLoadingList ? (
        renderLoadingPlaceholder()
      ) : Array.isArray(list) && list.length > 0 ? (
        <div className={classNames(styles.indexContainer, !isMobileVersion() && styles.desktopLayout)}>
          <div style={STYLE.row}>
            {!!list.length && (
              <ItemVerticalList column={4}>
                {list.map((box, index) => (
                  <ProductItem
                    isShowVariants={false}
                    key={box.id || index}
                    product={box}
                    isFullPadding
                    onClick={() => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.RECENT_VIEWED,
                        box,
                        index: getItemIndexAcrossPages({ itemIndexInPage: index, currentPage: current, perPage: per })
                      });
                    }}
                  />
                ))}
              </ItemVerticalList>
            )}
          </div>
          <Pagination
            {...{
              current,
              per,
              total,
              urlList,
              handleClick: () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }}
          />
        </div>
      ) : (
        <NoContentPlaceholder
          title="Không có kết quả nào"
          info="Không tìm thấy danh sách sản phẩm đã xem."
          logo={NO_CONTENT_LOGO.SHIPMENT}
          className={isMobileVersion() ? styles.noContentPlaceholderMobile : styles.noContentPlaceholderDesktop}
        />
      )}
    </div>
  );
};

export default renderView;
