import { get } from '../config/restful-method';

export const getLixicoinMembership = () =>
  get({
    path: `/memberships`,
    description: '[Lixicoin] Get membership infomation',
    errorMesssage: `Can't get data. Please try again`
  });
