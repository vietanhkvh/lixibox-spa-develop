import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';
import style from './style.module.scss';
import { IPriceFilter, IPriceItem } from '../model'; //Price
import InputField from 'presentation-component/ui/input-field';
import SubmitButton from 'presentation-component/ui/submit-button';
import { navigateWithParams } from 'utils/navigate';
import { generatePriceRange } from 'utils/price-filter';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import { scrollElement } from 'utils/scroll';
export const PriceItem: React.FC<IPriceItem> = (props) => {
  const { item, onClick, handleClickPrice } = props; //icon
  const { isActive = false, id, title, pl, ph } = item;
  const iconProps = {
    name: isActive ? 'checkbox-checked' : 'checkbox-empty',
    className: classnames(style.icon, isActive && style.selected)
  };

  const handleClick = () => {
    let filterData;
    let initFilterData = (pl, ph) =>
      Object.assign(
        {},
        {
          pl: 0 === pl ? '0' : pl + '',
          ph: 0 === ph ? '0' : ph + ''
        }
      );
    if (isActive) {
      //diselect item
      const pl = 0,
        ph = 0;
      filterData = initFilterData(pl, ph);
      onClick(-1, { min: pl, max: ph });
      handleClickPrice(filterData);
    } else {
      filterData = initFilterData(pl, ph);
      onClick(id, { min: pl, max: ph });
      handleClickPrice(filterData);
    }
  };

  return (
    <div key={`price-list-${id}`} className={style.selectionItem} onClick={handleClick}>
      <SvgIcon {...iconProps} />
      <div className={classnames(style.value, isActive && style.selected)}>{title}</div>
    </div>
  );
};

const renderInput = (props) => {
  const { title, subfix = '' } = props;
  return (
    <>
      <div className={style.ipWrapper}>
        <div className={style.header}>{title}</div>
        <InputField {...props} />
      </div>
      {subfix !== '' && <div className={style.subfix}>{subfix}</div>}
    </>
  );
};

export const priceDefault = (minLimit, maxLimit, minPrice, maxPrice) => {
  return generatePriceRange({ minPrice: minLimit, maxPrice: maxLimit }).map((item) =>
    Object.assign({}, item, { isActive: item.pl === minPrice * 1 && item.ph === maxPrice * 1 })
  );
};

export const PriceFilter: React.FC<IPriceFilter> = (props) => {
  const {
    onSubmit = () => {},
    history,
    pl = '',
    ph = '',
    bids = '',
    sort = '',
    page = 1,
    minLimit,
    maxLimit,
    prices = priceDefault(minLimit, maxLimit, pl, ph),
    isLoading = false
  } = props;
  const [idActive, setIdActive] = useState(-1);
  const [minPrice, setMinPrice] = useState<number | string>(pl);
  const [maxPrice, setMaxPrice] = useState<number | string>(ph);
  const [isDisableBtn, setDisableBtn] = useState(true);

  const handleClickPrice = (filterData) => {
    const newFilterData = Object.assign({}, filterData, { brands: bids, sort: sort, page: page });
    navigateWithParams(history, newFilterData, ['pl', 'ph', 'brands', 'page', 'sort']);
  };

  const findIdActive = useCallback((priceList, minPrice, maxPrice) => {
    const index = priceList.findIndex((p) => p.pl === minPrice * 1 && p.ph === maxPrice * 1);
    return index;
  }, []);

  useEffect(() => {
    const priceLowest = '' === pl ? 0 : pl;
    const priceHighest = '' === ph ? 0 : ph;
    const idItemActive = findIdActive(prices, priceLowest, priceHighest);
    setIdActive(idItemActive);
  }, [findIdActive, ph, pl, prices]);

  const onClick = (id, range) => {
    setIdActive(id);
    setMinPrice(range.min);
    setMaxPrice(range.max);
    scrollToTop();
  };

  const renderPriceItem = (prices, idActive, onClick) => {
    return (
      <div className={classnames(style.selection, style.item)}>
        {Array.isArray(prices) &&
          prices.length > 0 &&
          prices.map((p, index) => {
            const props = {
              item: Object.assign({}, p, { isActive: index === idActive, id: index }),
              onClick,
              handleClickPrice
            };
            return <PriceItem key={`price-item-${index}`} {...props} />;
          })}
      </div>
    );
  };

  const ipCommon = {
    isRoundedStyle: true,
    isBigRoundedStyle: true,
    textAlign: 'center',
    classes: {
      container: style.ipFieldContainer,
      input: style.input
    }
  };

  const minInput = {
    ...ipCommon,
    name: 'min-input',
    placeholder: '0',
    title: 'Giá tối thiểu (k)',
    onChange: (e) => {
      setMinPrice(e.target.value);
    },
    value: minPrice
  };

  const maxInput = {
    ...ipCommon,
    name: 'max-input',
    placeholder: '9.999',
    title: 'Giá tối đa (k)',
    onChange: (e) => setMaxPrice(e.target.value),
    value: maxPrice
  };

  const scrollToTop = () => {
    scrollElement({ x: 0, y: 0, element: document.documentElement });
  };

  const handlerOnSubmit = () => {
    onSubmit(minPrice, maxPrice);
    scrollToTop();
    const filterData = Object.assign(
      {},
      {
        pl: 0 === minPrice || '' === minPrice ? '0' : parseInt(minPrice.toString()) + '',
        ph: 0 === maxPrice || '' === maxPrice ? '0' : parseInt(maxPrice.toString()) + '',
        bids
      }
    );

    handleClickPrice(filterData);
  };

  useEffect(() => {
    if (minPrice !== '' && maxPrice !== '') {
      setDisableBtn(false);
    }
  }, [maxPrice, minPrice]);

  const btnProp = {
    color: 'black',
    title: 'Áp dụng',
    classes: {
      container: style.btnWrapper
    },
    onSubmit: handlerOnSubmit,
    disabled: isDisableBtn
  };
  if (!isLoading && minLimit === 0 && maxLimit === 0) return null;
  return isLoading ? (
    <LoadingPlaceholder />
  ) : (
    <div className={style.container}>
      <div className={style.title}>{`Tìm kiếm theo giá`}</div>
      {renderPriceItem(prices, idActive, onClick)}
      <div className={classnames(style.ipContainer, style.item)}>
        {renderInput(minInput)}
        <SvgIcon className={style.divide} name="minus" />
        {renderInput(maxInput)}
      </div>
      <div className={classnames(style.btnSubmit, style.item)}>
        <SubmitButton {...btnProp} />
      </div>
    </div>
  );
};

export default PriceFilter;
