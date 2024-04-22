import { sortKey } from '../constants/application/sorting';

export const setSelectedSortList = (sortList, sort) => {
  const selectedSort = !!sortKey.hasOwnProperty(sort) ? sort : sortKey['default'];
  const newSortList = sortList.map((item) => Object.assign({}, item, { selected: selectedSort === item.key }));

  return newSortList;
};
