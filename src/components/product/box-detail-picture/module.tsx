import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';

/**
 * Find selected color
 *
 * @param colorList : Array<any> list product color
 * @param idProduct : product id <slug>
 *
 * @return ip selected color <number id>
 */
export const findSelectedColor = (colorList: Array<any>, idProduct: string): number => {
  /** List color inlavid */
  if (colorList.length <= 1) {
    return 0;
  }

  const filteredList = colorList.filter((colorItem) => colorItem.box_slug === idProduct);
  /** List color inlavid */
  if (filteredList.length === 0) {
    return 0;
  }

  return filteredList[0].box_id;
};

/**
 * handle event choose product color
 * 1. Filter list color
 * 2. Get product slug
 *
 * @param colorList : Array<any> list product color
 * @param selectColor : any selected color from event
 *
 * @return new slug string
 */
export const handleChooseProductColor = (colorList: Array<any>, selectedColor: any, history: any): void => {
  const filteredList = colorList.filter((colorItem) => colorItem.box_id === selectedColor.box_id);
  if (filteredList.length <= 0) {
    return;
  }

  history.push(`${ROUTING_PRODUCT_DETAIL_PATH}/${filteredList[0].box_slug}`);
};
