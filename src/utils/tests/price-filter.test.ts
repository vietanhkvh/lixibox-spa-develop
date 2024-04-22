import { generatePriceRange } from '../price-filter';

describe('generatePriceRange', () => {
  describe('when no argument is provided', () => {
    test('generates price range for default range 0 - 5000', () => {
      expect(generatePriceRange({})).toEqual([
        { ph: 100, pl: 0, title: '0 - 100k' },
        { ph: 500, pl: 100, title: '100k - 500k' },
        { ph: 1000, pl: 500, title: '500k - 1tr' },
        { ph: 2000, pl: 1000, title: '1tr - 2tr' },
        { ph: 5000, pl: 2000, title: '2tr - 5tr' }
      ]);
    });
  });

  describe('when only minPrice is provided', () => {
    test('generates price range for default maxPrice 5000', () => {
      expect(generatePriceRange({ minPrice: 0 })).toEqual([
        { ph: 100, pl: 0, title: '0 - 100k' },
        { ph: 500, pl: 100, title: '100k - 500k' },
        { ph: 1000, pl: 500, title: '500k - 1tr' },
        { ph: 2000, pl: 1000, title: '1tr - 2tr' },
        { ph: 5000, pl: 2000, title: '2tr - 5tr' }
      ]);
    });
  });

  describe('when only maxPrice is provided', () => {
    test('generates price range for default minPrice 0', () => {
      expect(generatePriceRange({ maxPrice: 5000 })).toEqual([
        { ph: 100, pl: 0, title: '0 - 100k' },
        { ph: 500, pl: 100, title: '100k - 500k' },
        { ph: 1000, pl: 500, title: '500k - 1tr' },
        { ph: 2000, pl: 1000, title: '1tr - 2tr' },
        { ph: 5000, pl: 2000, title: '2tr - 5tr' }
      ]);
    });
  });

  describe('when both minPrice and maxPrice is provided', () => {
    test('generates expected range', () => {
      expect(generatePriceRange({ minPrice: 0, maxPrice: 7000 })).toEqual([
        { ph: 100, pl: 0, title: '0 - 100k' },
        { ph: 500, pl: 100, title: '100k - 500k' },
        { ph: 1000, pl: 500, title: '500k - 1tr' },
        { ph: 2000, pl: 1000, title: '1tr - 2tr' },
        { ph: 5000, pl: 2000, title: '2tr - 5tr' },
        { ph: 9999, pl: 5000, title: '> 5tr' }
      ]);
    });

    test('generates expected range', () => {
      expect(generatePriceRange({ minPrice: 0, maxPrice: 50 })).toEqual([{ ph: 100, pl: 0, title: '0 - 100k' }]);
    });
  });

  describe('when minPrice is lower than minPrice', () => {
    test('generates price range for default minPrice 0', () => {
      expect(generatePriceRange({ minPrice: 5000, maxPrice: 0 })).toEqual([]);
    });
  });
});
