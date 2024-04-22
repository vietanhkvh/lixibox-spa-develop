import { get } from '../config/restful-method';

export const fetchUnboxingConfig = () => {
  return get({
    path: `/unboxing/configs`,
    description: '[Unboxing] Get unboxing config /love/configs',
    errorMesssage: `Can't get unboxing configs. Please try again`
  });
};
