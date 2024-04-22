export const pathWithoutQuery = (path: string): string => {
  return path.split('?')[0];
};

export const getFilenameFromPath = (path: string): string => {
  const filenameWithoutQuery = pathWithoutQuery(path);
  return filenameWithoutQuery.replace(/^.*[\\/]/, '');
};

export const getExtensionFromPath = (path: string): string => {
  const filename = getFilenameFromPath(path);
  return (filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename).toLocaleLowerCase();
};

export const replacePathExtension = (path: string, newExtension: string): string => {
  const filename = getFilenameFromPath(path);
  const extension = getExtensionFromPath(path);

  let newFilename = filename.replace(new RegExp(`${extension}$`), newExtension);
  if (newFilename === newExtension) newFilename = '';

  const lastIndex = path.lastIndexOf(filename);
  const newPathname = path.slice(0, lastIndex) + newFilename + path.slice(lastIndex + filename.length);

  return newPathname;
};

export const getPathnameWithoutQuery = (path: string) => {
  const BASE_URL_TEMPLATE = 'https://template';
  const url = new URL(path, BASE_URL_TEMPLATE);

  return url.pathname.toLowerCase();
};
