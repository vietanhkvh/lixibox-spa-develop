import { BANNER_LIMIT_DEFAULT } from '../constants/application/default';
import { get } from '../config/restful-method';

export interface IFetchBannerParam {
  idBanner: string;
  limit: number;
}

export const fetchBanner = ({ idBanner, limit = BANNER_LIMIT_DEFAULT }: IFetchBannerParam) => {
  const query = `?limit_numer=${limit}`;

  return get({
    path: `/banners/${idBanner}${query}`,
    description: '[Banner] Get banner list /banners/:id',
    errorMesssage: `Can't fetch list banner. Please try again`
  });
};

export const fetchTheme = () =>
  get({
    path: `/themes`,
    description: '[Theme] Fetch list themes /themes',
    errorMesssage: `Can't fetch list all themes. Please try again`
  });
