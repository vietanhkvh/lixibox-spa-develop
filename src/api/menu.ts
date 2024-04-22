import { get } from '../config/restful-method';

/** Get Main menu - Browsers node */
export const fetchListMenu = () =>
  get({
    path: '/browse_nodes',
    description: '[Browse Nodes] Get browse_nodes /browse_nodes',
    errorMesssage: `Can't get list Menu. Please try again`
  });

/** Get Mobile homepage menu - Browsers node */
export const fetchMobileHomeMenu = () =>
  get({
    path: '/shortcuts',
    description: '[Browse Nodes] Get mobile homepage menu /browse_nodes/categories',
    errorMesssage: `Can't get list Menu. Please try again`
  });
