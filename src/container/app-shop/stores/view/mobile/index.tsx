import MobileAutoDisplayHeader from '../../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../../presentation-component/general/mobile-screen-header';
import SearchHeader from '../../../../../presentation-component/store/search-header';
import StorePreview from '../../../../../presentation-component/store/store-preview';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import { ViewProps } from '../../component';
import style from './style.module.scss';

const View = ({
  stores,
  searchKeyword,
  searchPlaceholder,
  isFilterAddressSelected,
  onSearchKeywordChange,
  onClickAddress,
  onFilterLocationSelect,
  onFilterReset
}: ViewProps) => {
  return (
    <div className={style.stores}>
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader title={'Danh sách cửa hàng'} />
      </MobileAutoDisplayHeader>
      <SearchHeader
        {...{
          value: searchKeyword,
          placeholder: searchPlaceholder,
          isAddressSelected: isFilterAddressSelected,
          onLocationSelect: onFilterLocationSelect,
          onReset: onFilterReset,
          onChange: onSearchKeywordChange,
          classes: { container: style.searchHeader }
        }}
      />
      {!!stores.length ? (
        <div className={style.index}>
          {stores.map((store, index) => (
            <StorePreview
              key={index}
              store={store}
              onClickAddress={onClickAddress}
              classes={{ container: style.storePreview }}
            />
          ))}
        </div>
      ) : (
        <NoContentPlaceholder
          title="Không tìm thấy cửa hàng"
          info="Tìm kiếm với một từ khóa hoặc vị trí khác"
          logo={NO_CONTENT_LOGO.SEARCH_EMPTY}
          action={{ text: 'Đặt lại bộ lọc' }}
          className={style.noContentPlaceholderMobile}
          onClick={() => onFilterReset?.()}
        />
      )}
    </div>
  );
};

export default View;
