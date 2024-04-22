import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import style from './style.module.scss';
import SvgIcon from 'presentation-component/ui/icon';
import { setSelectedSortList } from 'utils/sorting-filter';
// import { navigateWithParams } from 'utils/navigate';
import { getAllFilterParametes } from 'utils/format'; //getUrlParameter
import { useHistory } from 'react-router-dom';

interface ISortFilter {
  /**
   * list of sort
   */
  sortList;
  /**
   * handler select
   */
  onSelect;
}

function SortItem(item, index) {
  const tickIconProps = {
    name: 'tick',
    className: style.tickIcon
  };

  const itemProps = {
    className: style.sortItem,
    key: item.id || index,
    onClick: () => this.onSelect(item.key)
  };

  return (
    <div {...itemProps}>
      {item.selected && <SvgIcon {...tickIconProps} />}
      <div className={style.sortItemTitle}>{item.title}</div>
    </div>
  );
}

const Title = ({ className = '', title, value, isLeftAlign = false }) => {
  const angleIconProps = {
    name: 'angle-left',
    className: style.angleIcon
  };

  return (
    <div className={classnames(style.headingPanel, { [style.left]: !!isLeftAlign }, className)}>
      <div className={style.heading}>
        {title}:{` `} <span className={style.value}> {value}</span>
      </div>
      <SvgIcon {...angleIconProps} />
    </div>
  );
};

const SortFilter: React.FC<ISortFilter> = (props) => {
  const { sortList, onSelect } = props;
  return (
    <div className={classnames(style.sortFilter)}>
      <div className={style.sortList}>{sortList.map(SortItem, { onSelect })}</div>
    </div>
  );
};

const getSortTitle = (sortList) => {
  const selected = sortList.find((item) => !!item.selected);
  if (!selected) return 'Sắp xếp';

  return selected.title;
};

interface ISortPanel {
  /**
   * number of item per page
   */
  perPage?: number;

  /**
   * array for sort component
   */
  sortList?: Array<any>;

  defaultList;
}

const SortPanel: React.FC<ISortPanel> = (props) => {
  const { perPage = 24, defaultList } = props;
  const allFilter = getAllFilterParametes(window.location.search);
  const { sort, page, pl, ph, bids } = allFilter;
  const history = useHistory();
  const [isOpenSort, setOpenSort] = useState(false);
  const [sortList, setSortList] = useState(setSelectedSortList(defaultList, sort));
  const [sortTitle, setSortTitle] = useState(getSortTitle(sortList));

  useEffect(() => {
    const sortListDefault = setSelectedSortList(defaultList, sort);
    setSortList(sortListDefault);
  }, [defaultList, sort]);
  useEffect(() => {
    setSortTitle(getSortTitle(sortList));
  }, [sortList]);

  const onSubmit = (sort, page, pl, ph, bids) => {
    let searchQuery = '?';
    searchQuery = !!sort ? `${searchQuery}&sort=${sort}` : searchQuery;
    searchQuery = !!page ? `${searchQuery}&page=${page}` : searchQuery;
    searchQuery = !!perPage ? `${searchQuery}&per_page=${perPage}` : searchQuery;
    searchQuery = !!pl ? `${searchQuery}&pl=${pl}` : searchQuery;
    searchQuery = !!ph ? `${searchQuery}&ph=${ph}` : searchQuery;
    searchQuery = !!bids ? `${searchQuery}&brands=${bids}` : searchQuery;
    const query = new URLSearchParams(searchQuery);
    searchQuery = `?${query.toString()}`;
    history.push(`${window.location.pathname}?${query.toString()}`);
  };

  const titleProps = {
    title: 'Sắp xếp',
    value: sortTitle
  };

  const softPanelProps = {
    sortList,
    onSelect: (selectedKey) => {
      setOpenSort(false);

      const newSortList = setSelectedSortList(sortList, selectedKey);
      setSortTitle(getSortTitle(newSortList));
      setSortList(newSortList);

      onSubmit(selectedKey, page, pl, ph, bids);
    }
  };

  window.addEventListener('scroll', () => !!isOpenSort && setOpenSort(false));

  return (
    <div className={style.container}>
      <Title {...titleProps} />
      <SortFilter {...softPanelProps} />
    </div>
  );
};

export default SortPanel;
