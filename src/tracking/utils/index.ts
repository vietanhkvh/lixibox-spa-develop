import { generateCategoryHirarchy } from 'container/app-shop/product/detail/utils';
import { BoxCategory, ProductBox } from 'types/api/shop';

interface GetTrackableBoxCategoryNameProps {
  box: ProductBox;
  categories?: Array<BoxCategory>;
}
export const getTrackableBoxCategoryName = ({ box, categories }: GetTrackableBoxCategoryNameProps) => {
  const categoryTrackingKey = box.tracking?.category_key || '';

  if (categoryTrackingKey) {
    return categoryTrackingKey;
  }

  if (!categories || !categories.length) {
    return 'beauty';
  }

  const categoryHierarchy = generateCategoryHirarchy(categories);
  const rootCategory = categoryHierarchy.filter((category) => category.depth === 0);
  const categoryName = rootCategory.length ? rootCategory[0].name || '' : 'beauty';

  return categoryName;
};
