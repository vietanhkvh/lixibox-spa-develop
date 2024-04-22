import { get } from '../config/restful-method';

export const getGwpSchemesApi = () =>
  get({
    path: '/gwp/schemes',
    description: '[GWP] Get schemes /gwp/schemes',
    errorMesssage: `Can't get GWP schemes. Please try again`
  });

export const getGwpSchemeDetailApi = ({ slug }: { slug: string }) =>
  get({
    path: `/gwp/schemes/${slug}`,
    description: '[GWP] Get scheme detail /gwp/:slug',
    errorMesssage: `Can't get GWP scheme detail. Please try again`
  });
