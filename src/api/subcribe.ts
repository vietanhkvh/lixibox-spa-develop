import { getCsrfToken } from '../utils/auth';
import { post } from '../config/restful-method';

/**
 * Send subcribe email info
 *
 * @param {string} contact ex: email | phone number
 */
export const sendSubcribeInfo = ({ contact }) => {
  const data = {
    contact,
    csrf_token: getCsrfToken()
  };

  return post({
    path: '/recipients',
    data,
    description: '[Subcribe] Send subcribe info /recipients',
    errorMesssage: `Can't send info. Please try again`
  });
};
