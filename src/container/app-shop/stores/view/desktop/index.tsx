import Wrap from '../../../../../container/layout/wrap';
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
    <>
      <SearchHeader
        {...{
          value: searchKeyword,
          placeholder: searchPlaceholder,
          onChange: onSearchKeywordChange,
          classes: { container: style.searchHeader },
          isAddressSelected: isFilterAddressSelected,
          onLocationSelect: onFilterLocationSelect,
          onReset: onFilterReset
        }}
      />
      <Wrap>
        <div className={style.stores}>
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
              className={style.noContentPlaceholderDesktop}
              onClick={() => onFilterReset?.()}
            />
          )}
        </div>
      </Wrap>
    </>
  );
};

export default View;
