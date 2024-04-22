import { IProductImageState, IImageItem } from './model';

/**
 * Generate formated image list from stock list (props)
 *
 * @param listImage List stock image (from props)
 *
 * @return List image formated with 3 fiels: image, id, selected
 */
export const generateImageList = ({ list, boxFeedbackPicture, isHaveVideo }): Array<IImageItem> => {
  const boxList =
    !!list && Array.isArray(list)
      ? list.map((item, _index) => {
          item = Object.assign(
            {},
            {
              thumbnail: item.medium_url,
              image: item.large_url,
              original: item.original_url,
              index: parseInt('101' + _index),
              selected: isHaveVideo ? false : _index === 0
            }
          );

          return item;
        })
      : [];

  const feedbackList =
    !!boxFeedbackPicture && Array.isArray(boxFeedbackPicture)
      ? boxFeedbackPicture.map((item, _index) => {
          item = Object.assign(
            {},
            {
              thumbnail: item.url,
              image: item.url,
              original: item.url,
              index: parseInt('201' + _index),
              selected: false
            }
          );

          return item;
        })
      : [];

  return [...boxList, ...feedbackList];
};

/**
 * Select image in list
 * Replace selected image into main image
 *
 * @param imageList list image from state
 * @param selectedImage selected image from interaction's user
 *
 * @return new state
 */
export const selectImageModule = (
  imageList: Array<IImageItem>,
  selectedImage: IImageItem,
  index: number
): IProductImageState => {
  /** Upadate layout: translate list image */
  const offsetWidth = imageList.length * 90 + 30 - window.innerWidth;
  let maxIndex = Math.floor(offsetWidth / 90) + 2;

  maxIndex = maxIndex < 1 ? 1 : maxIndex;

  const stepTranslate = index === 0 ? 1 : index >= maxIndex ? maxIndex : index;

  /** Update image list with new selected item */
  const newImageList = Array.isArray(imageList)
    ? imageList.map((image) => {
        image.selected = image.index === selectedImage?.index;
        return image;
      })
    : [];

  /** Return new state */
  return {
    translateListImage: (stepTranslate - 1) * 90 * -1,
    imageList: newImageList
  } as IProductImageState;
};
