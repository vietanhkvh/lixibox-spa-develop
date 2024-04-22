import { IMAGE_SUPPORTED_EXTENSIONS } from '../constants/application/file';

export const isSupportedImageExtension = (files) => {
  let check = true;

  Object.keys(files).forEach((key) => {
    const fileName = files[key].name;
    const fileExtension = fileName.split('.').pop();

    if (IMAGE_SUPPORTED_EXTENSIONS.indexOf(fileExtension.toLowerCase()) === -1) {
      check = false;
    }
  });

  return check;
};
