import { getUrlParameter } from '../format';

/**
 * Returns a new `brands` array with `selected` property injected to each object
 *
 * Operation modes:
 * 'set':     sets 'selected' property from the query string
 * 'select':  sets 'selected' property from the query string and then toggles the 'selected' property for
 *            'currentSelection'
 * 'reset':   resets all the 'selected' property to 'false'
 * @param {string} type - 'select' mode sets `selected: true` for currenly selected brands. `reset` clears all
 * selections  by setting `selected: false`
 * @param {array} brands - brand list
 * @param {object | null} currentSelection - The brand object for which `selected` status need to be toggled
 */
export const filterBrandsWithSelection = (type: 'set' | 'select' | 'reset', brands, currentSelection?) => {
  if (type === 'reset') return brands.map((brand) => Object.assign({}, brand, { selected: false }));

  const queryBrandsString = getUrlParameter(window.location.search, 'brands');
  const toggleSelection = (selection, brands) =>
    brands.includes(selection) ? brands.filter((brand) => brand !== selection) : brands.concat(selection);

  let queryBrands;
  switch (type) {
    case 'select':
      queryBrands = toggleSelection(currentSelection.brand_slug, queryBrandsString ? queryBrandsString.split(',') : []);
      break;
    case 'set':
      queryBrands = queryBrandsString.split(',');
      break;
  }

  return brands.map((brand) => Object.assign({}, brand, { selected: queryBrands.includes(brand.brand_slug) }));
};
