/**
 * Storage data into localStorage
 * @param _key string : key data
 * @param _value any : value data
 *
 * Stringify JSON before store data
 *
 * @return void
 */
export const set = (_key: string, _value: any) => localStorage.setItem(_key, JSON.stringify(_value));

/**
 * Get data from localStorage by key data
 * @param _key string : key data
 *
 * If data not exist -> return null
 * Try catch for exception -> return null
 *
 * @return data after JSON parse or null
 */
export const get = (_key: string) => {
  const dataFromStorage = localStorage.getItem(_key);

  return !dataFromStorage
    ? ''
    : () => {
        try {
          return JSON.parse(dataFromStorage);
        } catch (e) {
          return '';
        }
      };
};

/**
 * Check data exist in localstorage
 * @param _key string : key data
 *
 * @return Boolean
 */
export const check = (_key: string) => !!localStorage.getItem(_key);

/**
 * Create cookie with time expire
 *
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
export const createCookie = (name, value, hour) => {
  let expires = '';
  if (hour) {
    let date = new Date();
    date.setTime(date.getTime() + hour * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
};

/**
 * Read cookie with name
 *
 * @param {string }name
 */
export const readCookie = (name) => {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (' ' === c.charAt(0)) {
      c = c.substring(1, c.length);
    }

    if (0 === c.indexOf(nameEQ)) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

/**
 * Erase cookie with name
 *
 * @param {string} name
 */
export const eraseCookie = (name) => {
  createCookie(name, '', -1);
};
