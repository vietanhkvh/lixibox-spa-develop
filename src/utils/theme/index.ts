import { THEME_DEFAULT_SORT_TYPE } from '../../config';

/**
 * Theme sort types
 */
export const themeSortTypes = () => {
  interface SortType {
    id: string;
    name: string;
  }

  const sortTypes: Array<SortType> = [
    Object.freeze({ id: 'default', name: 'Mặc định', icon: 'related' }),
    Object.freeze({ id: 'newest', name: 'Mới nhất', icon: 'time' }),
    Object.freeze({ id: 'price-asc', name: 'Giá tăng dần', icon: 'arrow-up' }),
    Object.freeze({ id: 'price-desc', name: 'Giá giảm dần', icon: 'arrow-down' })
    // NOTE: Sort by most discounted product option is disabled since web doesn't display discount by percentage
    // Object.freeze({ id: 'most-discount', name: 'Giảm giá nhiều nhất', icon: 'percent' })
  ];

  return sortTypes;
};

/**
 * Theme sort types with `selected` property
 * @param {string} selectedType
 */
export const themeSortTypesWithSelection = (selectedType: string) => {
  const selected = selectedType ? selectedType : THEME_DEFAULT_SORT_TYPE;
  return themeSortTypes().map((sortType) => Object.assign({}, sortType, { selected: selected === sortType.id }));
};
