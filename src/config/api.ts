export const SERVER_API = process.env.REACT_APP_API_FQDN;

export const VERSION_API = { VERSION_1: '', VERSION_2: 'v2' };
export const VERSION_API_1 = `${SERVER_API}${VERSION_API.VERSION_1}`;
export const VERSION_API_2 = `${SERVER_API}${VERSION_API.VERSION_2}`;
export const STORAGE_DATA_LOCAL: Boolean = true;
export const PREFIX_IMAGE_URL = '';
