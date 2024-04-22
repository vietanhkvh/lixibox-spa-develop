import { mockProductItem } from './constants';
import { BrowseNode, IMockProduct } from './model';

export const mappingImageData = (data: BrowseNode[]) => {
  return data?.map((item: BrowseNode) => {
    const foundItem = mockProductItem?.find((product: IMockProduct) => product?.slug === item?.slug);
    if (foundItem) {
      return { ...item, cover_image: { medium_url: foundItem.image } };
    }

    return null;
  });
};

export function sortEmptyItemToTop(array: BrowseNode[]) {
  const emptyArrays = [];
  const nonEmptyArrays = [];

  array.forEach((item) => {
    if (Array.isArray(item.sub_nodes) && item.sub_nodes.length === 0) {
      emptyArrays.push(item);
    } else {
      nonEmptyArrays.push(item);
    }
  });

  const sortedArray = emptyArrays.concat(nonEmptyArrays);

  return sortedArray;
}
