import { useState, useEffect } from 'react';
import classnames from 'classnames';

import { Heading } from '../../modal/general-modal/component';
import { STOCK_FILTER_OPTIONS } from '../../../constants/application/filter';
import { Price } from './view-price';
import { Brand } from './view-brand';
import { StockFilter } from './view-stock';
import { BottomAction } from './view-general';
import { changeAlias } from '../../../utils/format';

import styles from './style.module.css';

const MobileFilterPanel = ({
  brandList,
  onSelect = (data) => {},
  bids,
  minPrice,
  maxPrice,
  pl,
  ph,
  stockStatus,
  onRequestClose = () => {}
}) => {
  const [inputMinPrice, setMinPrice] = useState(pl || 0);
  const [inputMaxPrice, setMaxPrice] = useState(ph || 0);
  const [selectedBrand, selectBrand]: [Array<string>, Function] = useState(!!bids.length ? bids.split(',') : []);
  const stockStatuses = stockStatus.split(',');
  const [stockOptions, setStockOptions] = useState(
    STOCK_FILTER_OPTIONS.map((option) => Object.assign({}, option, { selected: stockStatuses.includes(option.id) }))
  );
  const [stepState, setStepState] = useState('full');
  const [searchBrandValue, setSearchBrandValue] = useState('');
  const [needToggleUpBrands, setNeedToggleUpBrands] = useState<boolean>(false);
  const formatedBrands = (brandList, isSearching = false) => {
    let result = brandList;
    if (isSearching) {
      result = brandList.filter((item, index) => {
        if (!searchBrandValue && !searchBrandValue.length) return true;

        return changeAlias(item.brand_name).indexOf(changeAlias(searchBrandValue)) >= 0;
      });
    }
    return result.map((item) => ({
      id: item.brand_id,
      title: item.brand_name,
      selected: selectedBrand.indexOf(item.brand_slug) >= 0,
      count: item.count,
      slug: item.brand_slug
    }));
  };
  const brandsNewFormated = formatedBrands(brandList);
  const [combinedBrandList, setCombinedBrandList] = useState<any>(brandsNewFormated);
  const priceProps = {
    minPrice,
    maxPrice,
    inputMinPrice,
    inputMaxPrice,
    handleInputOnChange: (value, valid, target) => {
      switch (target) {
        case 'inputMin':
          setMinPrice(value * 1);
          break;

        case 'inputMax':
          setMaxPrice(value * 1);
          break;
      }
    },
    handleSelectPriceRange: (item) => {
      if (!item) return;

      setMinPrice(!!item.selected ? 0 : item.pl * 1);
      setMaxPrice(!!item.selected ? 0 : item.ph * 1);
    }
  };
  useEffect(() => {
    if (selectedBrand && selectedBrand.length) {
      setNeedToggleUpBrands(true);
    }
  }, []);
  useEffect(() => {
    setCombinedBrandList(formatedBrands(brandList, searchBrandValue.length > 0));
  }, [searchBrandValue]);
  useEffect(() => {
    if ('full' === stepState && needToggleUpBrands) {
      const selectedList = combinedBrandList.filter((item) => !!selectedBrand.includes(item.slug));
      const noSelectedList = combinedBrandList.filter((item) => !selectedBrand.includes(item.slug));
      setCombinedBrandList([...selectedList, ...noSelectedList]);
    } else if ('brand' === stepState && searchBrandValue.length === 0) {
      setCombinedBrandList(brandsNewFormated);
    }
  }, [needToggleUpBrands, stepState, searchBrandValue]);

  const brandProps = {
    searchBrandValue,
    brandList: combinedBrandList,
    brandsLength: combinedBrandList.length,
    stepState,
    selectedBrand,
    onSearchBrand: (brandName) => {
      setSearchBrandValue(brandName);
    },
    onViewMoreClick: () => setStepState('brand'),
    onSelectBrand: (item: any) => {
      setNeedToggleUpBrands(false);
      if (!item || !item.slug) return;
      const findIndex = selectedBrand.indexOf(item.slug);
      const indexSelected = combinedBrandList.findIndex((c) => c.slug === item.slug);
      let newCombinedBrands = combinedBrandList;
      if (findIndex < 0) {
        selectBrand([...selectedBrand, item.slug]);
        newCombinedBrands[indexSelected].selected = true;
      } else {
        const newSelectedBrand = selectedBrand.filter((brand) => brand !== item.slug);
        selectBrand(newSelectedBrand);
        newCombinedBrands[indexSelected].selected = false;
      }
      setCombinedBrandList(newCombinedBrands);
    }
  };

  const headingProps =
    'full' === stepState
      ? {
          title: 'Lọc sản phẩm',
          leftIcon: '',
          rightIcon: 'close',
          onLeftActionClick: () => {},
          onRightActionClick: onRequestClose
        }
      : {
          title: 'Thương hiệu',
          leftIcon: 'angle-left',
          rightIcon: 'close',
          onLeftActionClick: () => {
            setStepState('full');
            setNeedToggleUpBrands(true);
            setSearchBrandValue('');
            setCombinedBrandList(brandsNewFormated);
          },
          onRightActionClick: onRequestClose
        };

  const bottomActionProps =
    'full' === stepState
      ? {
          title: 'Áp dụng',
          cancelTitle: 'Thiết lập lại',
          isShowCancelButton: true,
          onSubmit: () => {
            const selectedOptions = stockOptions.filter((option) => option.selected);

            const filterData = Object.assign(
              {},
              {
                pl: 0 === inputMinPrice ? '' : inputMinPrice + '',
                ph: 0 === inputMaxPrice ? '' : inputMaxPrice + ''
              },
              {
                brands: selectedBrand.join(',')
              },
              {
                stock_status: selectedOptions.map(({ id }) => id).join(',')
              }
            );
            setNeedToggleUpBrands(true);
            onSelect(filterData);
            onRequestClose();
          },
          onCancel: () => {
            setMinPrice(0);
            setMaxPrice(0);
            setStockOptions(STOCK_FILTER_OPTIONS);
            selectBrand([]);
            const newCombinedBrands = combinedBrandList.map((c) => {
              if (c.selected) c.selected = false;
              return c;
            });
            setCombinedBrandList(newCombinedBrands);
          }
        }
      : {
          title: 'Chọn',
          onSubmit: () => {
            setStepState('full');
            setSearchBrandValue('');
            setNeedToggleUpBrands(true);
            setCombinedBrandList(brandsNewFormated);
          }
        };

  return (
    <div className={styles.container}>
      <Heading {...headingProps} />
      <div
        className={classnames(styles.scrollViewContent, { [styles.scrollViewContentFixHeight]: 'full' !== stepState })}
      >
        {'full' === stepState && <Price {...priceProps} />}
        {!!brandList.length && <Brand {...brandProps} />}
        <StockFilter
          options={stockOptions}
          onSelect={(option) => {
            setStockOptions((prevOptions) =>
              prevOptions.map((prevOption) =>
                Object.assign({}, prevOption, option.id === prevOption.id && { selected: !option.selected })
              )
            );
          }}
        />
      </div>
      <BottomAction {...bottomActionProps} />
    </div>
  );
};

export default MobileFilterPanel;
