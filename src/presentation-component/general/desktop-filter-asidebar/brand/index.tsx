import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { changeAlias } from 'utils/format';
import InputField from 'presentation-component/ui/input-field';
import SvgIcon from 'presentation-component/ui/icon';
import styles from './style.module.scss';
import { navigateWithParams } from 'utils/navigate';
import { IBrandFilter } from '../model';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';

export const SearchBrand = ({ onChange, searchBrandValue }) => {
  const inputProps = {
    title: '',
    isRoundedStyle: true,
    placeholder: 'Tìm kiếm theo thương hiệu',
    onChange: (e) => onChange(e.target.value),
    name: 'searchBrand',
    classes: { container: styles.searchInput, input: styles.innerInput },
    value: searchBrandValue
  };

  const iconProps = {
    name: 'search',
    className: styles.searchBrandIcon
  };

  return (
    <div className={styles.searchBrand}>
      <SvgIcon {...iconProps} />
      <InputField {...inputProps} />
    </div>
  );
};

export const SelectList = ({ list, type = 'row', onClick = () => {} }) => {
  if (!list || !list.length) return null;

  return (
    <div className={classnames(styles.selectList, { [styles.column]: 'column' === type })}>
      <div className={styles.list}>{list.map(SelectListItem, { type, onClick })}</div>
    </div>
  );
};

export function SelectListItem(item, index) {
  const { selected } = item;
  const checkIconProps = {
    name: !!selected ? 'checkbox-checked' : 'checkbox-empty',
    className: classnames(styles.icon, !!selected && styles.selected)
  };

  return (
    <div
      onClick={() => {
        'function' === typeof this.onClick && this.onClick(item);
      }}
      className={styles.selectListItem}
      key={item.id || index}
    >
      <SvgIcon {...checkIconProps} />
      <span className={classnames(styles.title, !!selected && styles.selected)}>{item.title}</span>
      {item.count && <span className={classnames(styles.count, selected && styles.selected)}>{`(${item.count})`}</span>}
    </div>
  );
}

export const BrandPanel = ({ brandList, onSelectBrand, searchBrandValue, selectedBrand, onSearchBrand, onReset }) => {
  if (!brandList.length) return null;

  const combinedBrandList = brandList
    .filter((item) => {
      if (!searchBrandValue && !searchBrandValue?.length) return true;

      return changeAlias(item.brand_name).indexOf(changeAlias(searchBrandValue)) >= 0;
    })
    .map((item) => ({
      id: item.brand_id,
      title: item.brand_name,
      selected: selectedBrand.indexOf(item.brand_slug) >= 0,
      count: item.count,
      slug: item.brand_slug
    }));

  const selectedList = combinedBrandList.filter((item) => true === item.selected);
  const deselectedList = combinedBrandList.filter((item) => false === item.selected);
  const resultBrandList = [...selectedList, ...deselectedList];

  return (
    <div className={styles.brandPanel}>
      <div className={styles.brandList}>
        <SearchBrand onChange={onSearchBrand} searchBrandValue={searchBrandValue} />
        <SelectList list={resultBrandList} type={'column'} onClick={onSelectBrand} />
      </div>
    </div>
  );
};
export const brands = [
  {
    brand_id: 824,
    brand_slug: 'le-coon',
    brand_name: 'LE COON',
    brand_logo: 'https://upload.lixibox.com/system/brands/brand_images/000/000/824/original/download.png',
    count: 22
  },
  {
    brand_id: 816,
    brand_slug: 'lullaby',
    brand_name: 'Lullaby',
    brand_logo: 'https://upload.lixibox.com/system/brands/brand_images/000/000/816/original/logo.png',
    count: 11
  },
  {
    brand_id: 808,
    brand_slug: 'lion-bear',
    brand_name: 'Lion Bear',
    brand_logo: '/images/original/missing.png',
    count: 1
  }
];

const BrandFilter: React.FC<IBrandFilter> = (props) => {
  const { brandList = brands, bids = [], history, pl = 0, ph = 0, sort, page = 1, isLoading = false } = props;
  const [searchBrandValue, setSearchBrandValue] = useState('');
  const [selectedBrand, selectBrand] = useState<Array<string>>([]);

  useEffect(() => {
    const list = typeof bids === 'string' && bids.split(',').filter((item) => !!item && !!item.length);
    selectBrand(list);
  }, [bids]);

  const handleSearchSelectItem = (filterData) => {
    const newFilterData = Object.assign({}, filterData, { pl: pl, ph: ph, sort: sort, page: page });
    navigateWithParams(history, newFilterData, ['pl', 'ph', 'brands', 'page', 'sort']);
  };

  const brandPanelProps = {
    brandList,
    selectedBrand,
    searchBrandValue,
    onSearchBrand: (brandName) => setSearchBrandValue(brandName),
    onReset: () => selectBrand([]),
    onSelectBrand: (item: any) => {
      if (!item || !item.slug) return;
      let brandSelected = [];
      const findIndex = selectedBrand.indexOf(item.slug);
      if (findIndex < 0) {
        selectBrand([...selectedBrand, item.slug]);
        brandSelected = [[...selectedBrand, item.slug]];
      } else {
        const newSelectedBrand = selectedBrand.filter((brand) => brand !== item.slug);
        selectBrand(newSelectedBrand);
        brandSelected = newSelectedBrand;
      }
      handleSearchSelectItem({ brands: brandSelected });
    }
  };

  return isLoading ? <LoadingPlaceholder /> : <BrandPanel {...brandPanelProps} />;
};
export default BrandFilter;
