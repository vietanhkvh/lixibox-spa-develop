import { get } from '../config/restful-method';

export const fetchTheme = () =>
  get({
    path: `/themes`,
    description: '[Themes] Fetch list all themes /themes',
    errorMesssage: `Can't fetch list all themes. Please try again`
  });

export const fetchPromotions = () =>
  get({
    path: `/promotions`,
    description: '[Themes] Fetch list all promotions /promotions',
    errorMesssage: `Can't fetch list all promotions. Please try again`
  });

export const fetchProductByThemeId = ({ id }) => {
  return get({
    path: `/themes/${id}`,
    description: '[Themes] Fetch product by theme id /themes/:id',
    errorMesssage: `Can't fetch product by theme id. Please try again`
  });
};

export interface FetchGwpSchemeExclusiveBoxesApiParams {
  schemeSlug: string;
  page?: number;
  perPage?: number;
}
export const fetchGwpSchemeExclusiveBoxesApi = ({
  schemeSlug,
  page = 1,
  perPage = 15
}: FetchGwpSchemeExclusiveBoxesApiParams) =>
  get({
    path: `/gwp/schemes/${schemeSlug}/exclusive_products?page=${page}&per_page=${perPage}`,
    description: '[GWP] Fetch gwp scheme exclusive boxes /gwp/schemes/:schemeSlug/exclusive_products',
    errorMesssage: `Can't fetch gwp scheme exclusive boxes. Please try again`
  });

export interface FetchThemeBoxesApiParams {
  id: string | number;
  brands?: string;
  bids?: string;
  cids?: string;
  pl?: string;
  ph?: string;
  sort?: string;
  stockStatus?: 'in_stock' | 'out_of_stock';
  page?: number;
  perPage?: number;
}
export const fetchThemeBoxes = ({
  id,
  brands,
  bids,
  cids,
  pl,
  ph,
  sort,
  stockStatus,
  page = 1,
  perPage = 20
}: FetchThemeBoxesApiParams) => {
  const query = new URLSearchParams();
  page && query.set('page', String(page));
  perPage && query.set('per_page', String(perPage));
  brands && query.set('brands', String(brands));
  bids && query.set('bids', String(bids));
  cids && query.set('cids', String(cids));
  pl && query.set('pl', String(pl));
  ph && query.set('ph', String(ph));
  sort && query.set('sort', String(sort));
  stockStatus?.split(',').length === 1 && query.set('stock_status', String(stockStatus));

  const queryString = query.toString();

  return get({
    path: `/themes/${id}/boxes${queryString ? `?${queryString}` : ''}`,
    description: `[Themes] Fetch theme boxes /themes/:id/boxes`,
    errorMesssage: `Can't fetch theme boxes. Please try again`
  });
};

export const fetchThemeSection = ({ id, sectionId }) => {
  return get({
    path: `/themes/${id}/sections/${sectionId}`,
    description: `[Themes] Fetch theme section /themes/:id/sections/:sectionId`,
    errorMesssage: `Can't fetch theme section. Please try again`
  });
};
