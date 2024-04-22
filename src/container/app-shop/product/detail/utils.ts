import { BoxCategory } from 'types/api/shop';

export const generateCategoryHirarchy = (categories: Array<BoxCategory>) => {
  let parentId = 0;

  const categoryHierarchy =
    !!categories && !!categories.length
      ? categories
          .slice()
          .reverse()
          .map((item) => {
            if (0 === parentId || parentId === item.id) {
              parentId = item.parent_id;
              return item;
            }

            return null;
          })
          .filter((item) => null !== item)
          .slice()
          .reverse()
      : [];

  return categoryHierarchy;
};
