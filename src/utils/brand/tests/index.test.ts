jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { filterBrandsWithSelection } from '../index';

const searchMock = jest.fn();
Object.defineProperty(window, 'location', { value: {}, writable: true, configurable: true });
Object.defineProperty(window.location, 'search', {
  get: searchMock
});

describe('filterBrandsWithSelection', () => {
  describe(`when 'type' is 'set'`, () => {
    describe(`when query string is empty`, () => {
      test(`'brands' items are injected with 'selected: false'`, () => {
        const brands = [
          { id: '1', brand_slug: 'brand_1' },
          { id: '2', brand_slug: 'brand_2' }
        ];
        expect(filterBrandsWithSelection('set', brands)).toEqual([
          { id: '1', brand_slug: 'brand_1', selected: false },
          { id: '2', brand_slug: 'brand_2', selected: false }
        ]);
      });
    });

    describe(`when query string contains matching brands`, () => {
      test(`maching 'brands' items are injected with 'selected: true' and 'selected: false' for the rest`, () => {
        searchMock.mockReturnValueOnce('?pl=500&ph=1000&brands=brand_2,brand_3,brand_4');
        const brands = [
          { id: '1', brand_slug: 'brand_1' },
          { id: '2', brand_slug: 'brand_2' },
          { id: '3', brand_slug: 'brand_3' }
        ];
        expect(filterBrandsWithSelection('set', brands)).toEqual([
          { id: '1', brand_slug: 'brand_1', selected: false },
          { id: '2', brand_slug: 'brand_2', selected: true },
          { id: '3', brand_slug: 'brand_3', selected: true }
        ]);
      });
    });

    describe(`when query string contains non-matching brands`, () => {
      test(`all 'brands' items are injected with 'selected: false'`, () => {
        searchMock.mockReturnValueOnce('?pl=500&ph=1000&brands=brand_4,brand_5');
        const brands = [
          { id: '1', brand_slug: 'brand_1' },
          { id: '2', brand_slug: 'brand_2' }
        ];
        expect(filterBrandsWithSelection('set', brands)).toEqual([
          { id: '1', brand_slug: 'brand_1', selected: false },
          { id: '2', brand_slug: 'brand_2', selected: false }
        ]);
      });
    });
  });

  describe(`when 'type' is 'select'`, () => {
    describe(`and 'currentSelection' is provided`, () => {
      describe(`when query string is empty`, () => {
        test(`status of the 'brands' item matching 'currentSelection' is set, and rest is set to 'false'`, () => {
          const brands = [
            { id: '1', brand_slug: 'brand_1' },
            { id: '2', brand_slug: 'brand_2' }
          ];
          expect(filterBrandsWithSelection('select', brands, { id: '2', brand_slug: 'brand_2' })).toEqual([
            { id: '1', brand_slug: 'brand_1', selected: false },
            { id: '2', brand_slug: 'brand_2', selected: true }
          ]);
        });
      });

      describe(`when query string contains brands that matches 'currentSelection'`, () => {
        test(`a 'queryString || currentSelection' operation is performed, and statuses are set accordingly`, () => {
          searchMock.mockReturnValueOnce('?pl=500&ph=1000&brands=brand_4,brand_2');
          const brands = [
            { id: '1', brand_slug: 'brand_1' },
            { id: '2', brand_slug: 'brand_2' }
          ];
          expect(filterBrandsWithSelection('select', brands, { brand_slug: 'brand_2' })).toEqual([
            { id: '1', brand_slug: 'brand_1', selected: false },
            { id: '2', brand_slug: 'brand_2', selected: false }
          ]);
        });
      });

      describe(`when query string contains brands that does not match 'currentSelection'`, () => {
        test(`a 'queryString || currentSelection' operation is performed, and statuses are set accordingly`, () => {
          searchMock.mockReturnValueOnce('?pl=500&ph=1000&brands=brand_4,brand_2');
          const brands = [
            { id: '1', brand_slug: 'brand_1' },
            { id: '2', brand_slug: 'brand_2' }
          ];
          expect(filterBrandsWithSelection('select', brands, { brand_slug: 'brand_1' })).toEqual([
            { id: '1', brand_slug: 'brand_1', selected: true },
            { id: '2', brand_slug: 'brand_2', selected: true }
          ]);
        });
      });
    });

    describe(`and 'currentSelection' is not provided`, () => {
      test(`error is thrown`, () => {
        const brands = [
          { id: '1', brand_slug: 'brand_1' },
          { id: '2', brand_slug: 'brand_2' }
        ];
        expect(() => filterBrandsWithSelection('select', brands)).toThrow();
      });
    });
  });

  describe(`when 'type' is 'reset'`, () => {
    test(`'brands' items are injected with 'selected: false'`, () => {
      const brands = [
        { id: '1', brand_slug: 'brand_1' },
        { id: '2', brand_slug: 'brand_2' }
      ];
      expect(filterBrandsWithSelection('reset', brands)).toEqual([
        { id: '1', brand_slug: 'brand_1', selected: false },
        { id: '2', brand_slug: 'brand_2', selected: false }
      ]);
    });
  });
});
