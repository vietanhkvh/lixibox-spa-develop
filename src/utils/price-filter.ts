const anchors: Array<number> = [0, 100, 500, 1000, 2000, 5000];

export const generatePriceRange = ({
  minPrice = 0,
  maxPrice = 5000
}: {
  minPrice?: number;
  maxPrice?: number;
}): Array<any> => {
  const anchorsLen = anchors.length;

  const ranges = anchors.map((anchor, index) => {
    if (index < anchorsLen - 1) {
      const nextAnchor = anchors[index + 1];

      if (minPrice < nextAnchor && maxPrice > anchor) {
        return priceRange(anchor, nextAnchor);
      }
    } else if (maxPrice > anchor) {
      return priceRange(anchor);
    }

    return undefined;
  });

  return ranges.filter((item) => !!item);
};

const getRangeString = (value: number): string => (value < 1000 ? `${value}k` : `${value / 1000}tr`);

const priceRange = (from: number, to: number = 0) => {
  if (!!from && !!to) return { pl: from, ph: to, title: `${getRangeString(from)} - ${getRangeString(to)}` };
  if (!!from) return { pl: from, ph: 9999, title: `> ${getRangeString(from)}` };
  if (!!to) return { pl: 0, ph: to, title: `0 - ${getRangeString(to)}` };

  return {};
};
