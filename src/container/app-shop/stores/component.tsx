import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import GeneralModal from 'presentation-component/modal/general-modal';
import AddressModal from 'components/address/modal';
import { convertVietnamese } from '../../../utils/format';
import { ROUTING_STORE_MAP } from '../../../routings/path';
import { isMobileVersion } from '../../../utils/responsive';
import { getInitial } from 'utils/string';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

export interface ViewProps {
  stores: Array<any>;
  searchKeyword: string;
  searchPlaceholder: string;
  isFilterAddressSelected: boolean;
  onSearchKeywordChange: (keyword: string) => void;
  onClickAddress: (store: any) => void;
  onFilterLocationSelect: () => void;
  onFilterReset: () => void;
}

export interface StoresProps {
  cartStore: any;
  fetchStoresAction: () => any;
}

// TODO: Improve search
const filterStoreByKeyword = (stores, keyword) => {
  return stores.filter((store) => {
    if (!store) return false;

    const _keyword = convertVietnamese(keyword);
    const storeName = convertVietnamese(store.name || '');
    const storeAddress = convertVietnamese(store.full_address || '');

    return storeName.includes(_keyword) || storeAddress.includes(_keyword);
  });
};

const filterStoreByLocation = (stores, location) => {
  if (!location) return stores;

  return stores.filter(
    (store) => location.provinceId === store.province_id && location.districtId === store.district_id
  );
};

const filterStoreByKeywordAndLocation = ({ stores, location, keyword }) => {
  let _stores = filterStoreByLocation(stores, location);
  _stores = filterStoreByKeyword(_stores, keyword);
  return _stores;
};

const Stores = ({ cartStore: { stores: _stores }, fetchStoresAction }: StoresProps) => {
  const getDefaultPlaceholder = () =>
    isMobileVersion() ? 'Tìm kiếm cửa hàng' : 'Tìm kiếm theo địa chỉ hoặc tên cửa hàng (ví dụ: Estella)';

  const history = useHistory();
  const [stores, setStores] = useState<any>(_stores || []);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchPlaceholder, setSearchPlaceholder] = useState(getDefaultPlaceholder());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterAddress, setFilterAddress] = useState<{ [key: string]: any } | null>();
  useEffect(() => {
    fetchStoresAction();
  }, []);
  useEffect(() => {
    setStores(filterStoreByKeywordAndLocation({ stores: _stores, location: filterAddress, keyword: searchKeyword }));
  }, [_stores, searchKeyword]);

  const onClickAddress = (store) => {
    let path = ROUTING_STORE_MAP;
    if (store?.embed_map_url) {
      path = `${path}?storeUrl=${encodeURIComponent(store?.embed_map_url)}`;
    }

    history.push(path);
  };
  const onSearchKeywordChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <>
      <View
        {...{
          stores,
          searchKeyword,
          searchPlaceholder,
          isFilterAddressSelected: !!filterAddress,
          onSearchKeywordChange,
          onClickAddress,
          onFilterLocationSelect: () => setIsModalOpen(true),
          onFilterReset: () => {
            setSearchPlaceholder(getDefaultPlaceholder());
            setFilterAddress(null);
            setSearchKeyword('');
            setStores(_stores);
          }
        }}
      />
      <GeneralModal
        isOpen={isModalOpen}
        fullHeight={true}
        className={classNames('')}
        isShowHeading={false}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <AddressModal
          getFromDistrict
          onRequestClose={() => setIsModalOpen(false)}
          onSaveAddressSelected={(data) => {
            setFilterAddress(data);
            setSearchPlaceholder(
              data?.districtName && data?.provinceName
                ? `${data?.districtName}, ${getInitial(data?.provinceName)}`
                : getDefaultPlaceholder()
            );
            setIsModalOpen(false);
            setStores(filterStoreByKeywordAndLocation({ stores: _stores, location: data, keyword: searchKeyword }));
          }}
          filterProvince={(provinces) => {
            const availableProvinceIds: Array<number> = [
              ...(new Set(_stores.map(({ province_id }) => province_id)) as any)
            ];
            const availableDistrictIds: Array<number> = [
              ...(new Set(_stores.map(({ district_id }) => district_id)) as any)
            ];
            const _provinces = provinces
              .filter(({ id }) => availableProvinceIds.includes(id))
              .map((province) => {
                let districts = province?.districts || [];
                districts = districts.filter(({ id }) => availableDistrictIds.includes(id));
                return Object.assign({}, province, { districts });
              });

            return _provinces;
          }}
        />
      </GeneralModal>
    </>
  );
};

export default Stores;
