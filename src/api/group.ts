import { get } from '../config/restful-method';

export const fetchGroupsById = ({ id }) =>
  get({
    path: `/groups/${id}`,
    description: '[Group] Get groups /groups/:id',
    errorMesssage: `Can't fetch groups by id. Please try again`
  });
