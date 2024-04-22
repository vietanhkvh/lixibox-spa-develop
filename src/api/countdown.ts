import { get } from '../config/restful-method';

export const fetchCountdowndList = () =>
  get({
    path: `/countdowns`,
    description: '[Countdowns]Get countdown list /countdowns',
    errorMesssage: `Can't get list countdown. Please try again`
  });
