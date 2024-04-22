import React from 'react';
import classnames from 'classnames';
import BrandFilter from './brand';
import BrandScroll from './brand-scroll';
import StockStatus from './stock';
import PriceFilter from './price';
import { IFilterAside, IFilterItem } from './model';
import style from './style.module.scss';

const FilterItem: React.FC<IFilterItem> = (props) => {
  const { template: Template, propsTemplate } = props;
  return <Template {...propsTemplate} />;
};

const listDefault: IFilterItem[] = [
  {
    id: 'stockStatus',
    template: StockStatus,
    propsTemplate: {}
  },
  {
    id: 'pricefilter',
    template: PriceFilter,
    propsTemplate: {}
  },
  {
    id: 'brandfilter',
    template: BrandFilter,
    propsTemplate: {}
  },
  {
    id: 'brandscroll',
    template: BrandScroll,
    propsTemplate: {}
  }
];

const FilterAside: React.FC<IFilterAside> = (props) => {
  const { list = listDefault, classes = {} } = props;
  const { container, item } = classes;

  return (
    <div className={classnames(style.container, !!container && container)}>
      {list.map((i, index) => {
        const isDisplayDiveLine = i.isDisplayDiveLine !== undefined ? i.isDisplayDiveLine : true;
        return (
          <div key={`filter-aside-item-${index}`}>
            {index !== 0 && isDisplayDiveLine && (
              <div key={`filter-divide-${index}`} className={classnames(style.item, style.divide)} />
            )}
            <div
              key={`filter-item-${i?.id}-${index}`}
              className={classnames(style.item, !!item && item, index === list.length - 1 && style.lastest)}
            >
              <FilterItem key={index} {...i} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterAside;
