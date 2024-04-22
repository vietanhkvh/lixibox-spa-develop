import { useState, useEffect } from 'react';

import { navigateWithParams } from '../../../utils/navigate';
import SvgIcon from '../../../presentation-component/ui/icon';
import { defaultSortList } from '../../../constants/application/sorting';
import { setSelectedSortList } from '../../../utils/sorting-filter';
import { STOCK_FILTER_OPTIONS } from '../../../constants/application/filter';
import { HeadingItem } from './view/general/index';
import { SortPanel } from './view/sort/index';
import { PricePanel } from './view/price/index';
import { BrandPanel } from './view/brand/index';
import { StockPanel } from './view/stock';
import styles from './style.module.scss';

const getSortTitle = (sortList) => {
  const selected = sortList.find((item) => !!item.selected);
  if (!selected) return 'Sắp xếp';

  return selected.title;
};

const Right = ({ sort, history, onSubmit }) => {
  const [isOpenSort, setOpenSort] = useState(false);
  const [sortList, setSortList] = useState(setSelectedSortList(defaultSortList, sort));
  const [sortTitle, setSortTitle] = useState(getSortTitle(sortList));
  const [timerDisplaySort, setTimerDisplaySort] = useState(true);

  const headingItemProps = {
    title: 'Sắp xếp',
    value: sortTitle,
    onClick: () => {
      if (!!timerDisplaySort) {
        setTimerDisplaySort(false);
        setTimeout(() => setTimerDisplaySort(true), 400);

        setOpenSort(!isOpenSort);
      }
    }
  };

  const softPanelProps = {
    isOpenSort,
    sortList,
    onSelect: (selectedKey) => {
      setOpenSort(false);

      const newSortList = setSelectedSortList(sortList, selectedKey);
      setSortTitle(getSortTitle(newSortList));
      setSortList(newSortList);

      onSubmit({ sort: selectedKey });
      /** navigate to */
      navigateWithParams(history, { sort: selectedKey }, ['sort']);
    },
    onClickOverlay: () => setOpenSort(false)
  };

  const sortProps = {
    className: styles.sortContainer
  };

  window.addEventListener('scroll', () => !!isOpenSort && setOpenSort(false));

  return (
    <div {...sortProps}>
      <HeadingItem {...headingItemProps} />
      <SortPanel {...softPanelProps} />
    </div>
  );
};

const Left = ({ brandList, bids, history, minPrice, maxPrice, pl, ph, stockStatus, onSubmit }) => {
  const [isOpenPrice, setOpenPrice] = useState(false);
  const [inputMinPrice, setMinPrice] = useState(pl || 0);
  const [inputMaxPrice, setMaxPrice] = useState(ph || 0);
  const stockStatuses = stockStatus.split(',');
  const [stockOptions, setStockOptions] = useState(
    STOCK_FILTER_OPTIONS.map((option) => Object.assign({}, option, { selected: stockStatuses.includes(option.id) }))
  );
  useEffect(() => {
    setStockOptions((prevOptions) =>
      prevOptions.map((option) => Object.assign({}, option, { selected: stockStatuses.includes(option.id) }))
    );
  }, [stockStatus]);

  useEffect(() => {
    setMinPrice(pl || 0);
    setMaxPrice(ph || 0);
  }, [pl, ph]);

  const priceHeadingValue =
    !pl && !ph ? 'Tất cả' : `${priceFormat(parseInt(pl) || 0)} - ${priceFormat(parseInt(ph) || 0)}`;
  const priceHeadingItemProps = {
    title: 'Giá',
    value: priceHeadingValue,
    isLeftAlign: true,
    className: styles.priceFilterHeading,
    onClick: () => setOpenPrice(!isOpenPrice)
  };

  const isShowBrandsFilter = !!brandList && !!brandList.length;

  const pricePanelProps = {
    isShowBrandsFilter,
    isOpenPrice,
    onClickOverlay: () => setOpenPrice(false),
    minPrice,
    maxPrice,
    inputMinPrice,
    inputMaxPrice,
    onReset: () => {
      setMinPrice(0);
      setMaxPrice(0);
    },
    handleInputOnChange: (value, valid, target) => {
      switch (target) {
        case 'inputMin':
          setMinPrice(Math.abs(value * 1000));
          break;

        case 'inputMax':
          setMaxPrice(Math.abs(value * 1000));
          break;
      }
    },
    handleSelectPriceRange: (item) => {
      if (!item) return;

      setMinPrice(item.pl * 1);
      setMaxPrice(item.ph * 1);
    },
    onSubmit: (filterData) => {
      navigateWithParams(history, filterData, ['pl', 'ph', 'page']);
      setOpenPrice(false);
    }
  };

  return (
    <div className={styles.filterContainer}>
      {isShowBrandsFilter && <BrandFilter brandList={brandList} bids={bids} history={history} />}
      <HeadingItem {...priceHeadingItemProps} />
      <PricePanel {...pricePanelProps} />
      <StockFilter
        {...{
          options: stockOptions,
          onSubmit: (options) => {
            const selectedOptions = options.filter(({ selected }) => selected);
            onSubmit({ stock_status: selectedOptions.map(({ id }) => id).join(',') });
          }
        }}
      />
    </div>
  );
};

const BrandFilter = ({ brandList, bids, history }) => {
  const [isOpenBrand, setOpenBrand] = useState(false);
  const [searchBrandValue, setSearchBrandValue] = useState('');
  const splittedDids = bids.split(',').filter((item) => !!item && !!item.length);
  const [selectedBrand, selectBrand]: [Array<string>, Function] = useState(!!bids.length ? splittedDids : []);

  const brandHeadingItemProps = {
    isLeftAlign: true,
    title: 'Thương hiệu',
    value: !splittedDids || !splittedDids.length ? 'Tất cả' : `Đã chọn ${splittedDids.length} thương hiệu`,
    onClick: () => setOpenBrand(true),
    className: styles.brandFilterHeading
  };

  const brandPanelProps = {
    brandList,
    isOpenBrand,
    selectedBrand,
    searchBrandValue,
    onClickOverlay: () => setOpenBrand(false),
    onSearchBrand: (brandName) => setSearchBrandValue(brandName),
    onReset: () => selectBrand([]),
    onSubmit: (filterData) => {
      navigateWithParams(history, filterData, ['brands', 'page']);
      setOpenBrand(false);
    },
    onSelectBrand: (item: any) => {
      if (!item || !item.slug) return;

      const findIndex = selectedBrand.indexOf(item.slug);
      if (findIndex < 0) {
        selectBrand([...selectedBrand, item.slug]);
      } else {
        const newSelectedBrand = selectedBrand.filter((brand) => brand !== item.slug);
        selectBrand(newSelectedBrand);
      }
    }
  };

  useEffect(() => {
    !!bids?.length ? selectBrand(bids.split(',').filter((item) => !!item && !!item.length)) : selectBrand([]);
  }, [bids]);

  return (
    <>
      <HeadingItem {...brandHeadingItemProps} />
      <BrandPanel {...brandPanelProps} />
    </>
  );
};

const StockFilter = ({ options, onSubmit }) => {
  const [isOpen, setOpen] = useState(false);
  const selectedOptions = options.filter((option) => option.selected);

  return (
    <>
      <HeadingItem
        {...{
          isLeftAlign: true,
          title: 'TRẠNG THÁI',
          value: selectedOptions.length === 1 ? selectedOptions[0].title : 'Tất cả',
          onClick: () => setOpen(true),
          className: styles.stockFilterHeading
        }}
      />
      <StockPanel
        {...{
          isOpen,
          options,
          onSubmit: (options) => {
            onSubmit(options);
            setOpen(false);
          },
          onClickOverlay: () => setOpen(false)
        }}
      />
    </>
  );
};

const priceFormat = (number) => {
  const pre = number < 1000 ? number : number / 1000;
  const post = number < 1000 ? 'k' : 'tr';
  return pre + post;
};

const ResultPanel = ({ brandList, bids, pl, ph, stockStatus, history }) => {
  const splitedBids = bids.split(',').filter((item) => !!item && !!item.length);
  const brandResult = brandList
    .filter((item) => splitedBids.includes(item.brand_slug))
    .map((item, index) => ({
      type: 'brands',
      id: index,
      slug: item.brand_slug,
      name: item.brand_name
    }));

  const priceResult =
    pl >= 0 && ph > 0
      ? [
          {
            type: 'price',
            id: -1,
            value: { pl, ph },
            name: `${priceFormat(pl || 0)} - ${priceFormat(ph)}`
          }
        ]
      : [];

  const stockStatuses = stockStatus.split(',');
  const currentStockStatuses = STOCK_FILTER_OPTIONS.filter((option) => stockStatuses.includes(option.id));

  const stockResult = currentStockStatuses
    ? currentStockStatuses.map((status, index) => ({
        id: -(index + 2),
        type: 'stock_status',
        name: status.title,
        value: status.id
      }))
    : [];

  if (![...brandResult, ...priceResult, ...stockResult].length) return null;

  return (
    <div className={styles.searchResult}>
      <div className={styles.heading}>Tìm kiếm sản phẩm</div>
      {[...brandResult.filter((_, index) => index <= 2), ...priceResult, ...stockResult].map(ResultItem, {
        filterList: [...brandResult, ...priceResult, ...stockResult],
        history
      })}
      <div
        className={styles.reset}
        onClick={() => {
          navigateWithParams(history, {}, ['pl', 'ph', 'brands', 'sort', 'stock_status']);
        }}
      >
        Xóa tất cả bộ lọc
      </div>
    </div>
  );
};

function ResultItem(item, index) {
  if (!item) return null;

  const iconProps = {
    name: 'close',
    className: styles.icon,
    onClick: () => {
      const filterDataObj = this.filterList.filter((filterItem) => filterItem.id !== item.id);
      const brands = filterDataObj
        .filter((filterItem) => filterItem.type === 'brands')
        .map((filterItem) => filterItem.slug)
        .join(',');

      const price = filterDataObj.find((filterItem) => filterItem.type === 'price');
      const stock = filterDataObj.filter((filterItem) => filterItem.type === 'stock_status');
      const filterData = Object.assign(
        { brands },
        !!price
          ? {
              pl: 0 === price.value.pl ? '' : price.value.pl + '',
              ph: 0 === price.value.ph ? '' : price.value.ph + ''
            }
          : {},
        stock.length ? { stock_status: stock.map(({ value }) => value).join(',') } : {}
      );

      navigateWithParams(this.history, filterData, ['pl', 'ph', 'brands', 'stock_status']);
    }
  };

  return (
    <div className={styles.resultItem} key={item.id}>
      {item.name} <SvgIcon {...iconProps} />
    </div>
  );
}

const DesktopFilterToolbar = ({
  sort = '',
  history,
  brandList,
  bids,
  minPrice,
  maxPrice,
  pl,
  ph,
  stockStatus = '',
  onSubmit = (data) => {},
  hiddenToolBar = false
}) => {
  const rightProps = { sort, history, onSubmit };
  const leftProps = { history, bids, brandList, minPrice, maxPrice, pl, ph, stockStatus, onSubmit };
  const resultProps = { brandList, bids, pl, ph, stockStatus, history };
  const isExistResult = bids !== '' || pl !== '' || ph !== '' || stockStatus !== '';
  return (
    <>
      {!hiddenToolBar && (
        <div className={styles.container}>
          <Left {...leftProps} />
          <Right {...rightProps} />
        </div>
      )}

      {isExistResult && (
        <div className={styles.wrapper}>
          <ResultPanel {...resultProps} />
        </div>
      )}
    </>
  );
};

export default DesktopFilterToolbar;
