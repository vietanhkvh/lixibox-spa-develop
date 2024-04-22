import { get } from '../config/restful-method';

export const getExpertInfo = (idExpert: string) =>
  get({
    path: `/experts/${idExpert}`,
    description: '[Experts] Get Expert info /experts/:id',
    errorMesssage: `Can't get Expert Information. Please try again`
  });

/**
 * Fetch product list by expert
 *
 * @param {string} idExpert
 * @param {string} query api query string
 */
export const fetchProductByExpert = (idExpert: string) => {
  const query = '';

  return get({
    path: `/experts/${idExpert}/boxes${query}`,
    description: '[Experts] Fetch product list  by expert id /experts/:id/boxes',
    errorMesssage: `Can't get list product by Expert. Please try again`
  });
};
