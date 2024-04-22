/**
 * Check nested data before using
 * - Detect attribute undefined
 * - Detect null
 * - Accep boolean data: false
 *
 * @param object is root object need to check
 * @param keys list of keys in array
 *
 * @return null if not safe or value
 *
 * eg: a.b.c.d => isSafeData(a, ['b', 'c', 'd'])
 *
 */
const isSafeObject = (object, keys: Array<string>) =>
  keys.reduce((nested, key) => (nested && 'undefined' !== typeof nested[key] ? nested[key] : null), object);

/**
 * Check safe data before using
 *
 * @return true / false
 */
export const isSafeData = (object, keys: Array<string>) => {
  const checkIsSafeObject = isSafeObject(object, keys);

  return null !== checkIsSafeObject && 'function' !== typeof checkIsSafeObject;
};

/**
 * Check safe function before using
 *
 * @return true / false
 */
export const isSafeFunction = (object, keys: Array<string>) => 'function' === typeof isSafeObject(object, keys);
