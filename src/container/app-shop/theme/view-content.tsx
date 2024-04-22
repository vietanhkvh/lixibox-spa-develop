import Pagination from 'components/general/pagination';
import ItemVerticalList from '../../../presentation-component/item-list-hoc/item-vertical-list';
import NoContent from '../../exception/404';
import ItemWithAction from '../cart/general/item-with-action';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { ViewedSource } from 'tracking/constants';
import DesktopAutoDisplayToolbar from '../../../presentation-component/general/desktop-auto-display-toolbar';
import DesktopFilterToolbar from '../../../presentation-component/general/desktop-filter-toolbar';
import MobileAutoDisplayHeader from '../../../presentation-component/general/mobile-auto-display-header';
import MobileFilterHeader from '../../../presentation-component/general/mobile-filter-header';

import { isMobileVersion } from '../../../utils/responsive';
import { ERROR_TEXT_NO_RESULT } from '../../../config';

import Placeholder from './view-placeholder';

import STYLE from './style';
import styles from './style.module.scss';

const renderContent = ({
  history,
  list,
  paginationProps,
  isLoading,
  brandList,
  minPrice,
  maxPrice,
  bids,
  pl,
  ph,
  sort,
  stockStatus,
  handleFilterSubmit,
  onItemClick,
  slugIdSpecial
}) => {
  const noContentProps = { isShowNavigation: false, ...ERROR_TEXT_NO_RESULT };

  const mobileFilterHeaderProps = {
    sort,
    onSubmit: handleFilterSubmit,
    history,
    brandList,
    bids,
    minPrice,
    maxPrice,
    pl,
    ph,
    stockStatus
  };

  const desktopAutoDisplayToolbarProps = {
    sort,
    onSubmit: handleFilterSubmit,
    history,
    brandList,
    bids,
    minPrice,
    maxPrice,
    pl,
    ph,
    stockStatus
  };

  return (
    <>
      <div id={'theme-filter-heading'}>
        {!!isMobileVersion() ? (
          <MobileAutoDisplayHeader row={1}>
            <MobileFilterHeader {...mobileFilterHeaderProps} />
          </MobileAutoDisplayHeader>
        ) : (
          <DesktopAutoDisplayToolbar>
            <DesktopFilterToolbar {...desktopAutoDisplayToolbarProps} />
          </DesktopAutoDisplayToolbar>
        )}
      </div>

      <div style={STYLE.row}>
        {isLoading ? (
          <Placeholder />
        ) : Array.isArray(list) && list.length ? (
          <ItemVerticalList className={styles.verticalList} column={!!isMobileVersion() ? 2 : 5}>
            {list.map((product, index) => (
              <ItemWithAction
                key={product.id || index}
                product={product}
                isFullPadding
                isShowVariants
                action={{ title: 'Thêm vào giỏ', icon: 'plus' }}
                purchaseType={PURCHASE_TYPE.NORMAL}
                isShowPricing
                isShowRating
                shouldDisplayCartSummary
                onClickProductItem={() => onItemClick?.(product, index)}
                trackingSource={ViewedSource.THEME}
                trackingSourceId={slugIdSpecial}
              />
            ))}
          </ItemVerticalList>
        ) : (
          <NoContent {...noContentProps} />
        )}
      </div>
      <Pagination {...paginationProps} />
    </>
  );
};

export default renderContent;
