import { themeSortTypes, themeSortTypesWithSelection } from '../index';

describe('themeSortTypes', () => {
  test(`contains four sorting types`, () => {
    expect(themeSortTypes()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'default' }),
        expect.objectContaining({ id: 'newest' }),
        expect.objectContaining({ id: 'price-asc' }),
        expect.objectContaining({ id: 'price-desc' })
      ])
    );
  });
});

describe('themeSortTypesWithSelection', () => {
  describe(`when 'selectedType' is a valid sort type`, () => {
    test(`a list of sort type is returned with 'selected' property injected ('true' for selected, 'false' for the rest)`, () => {
      expect(themeSortTypesWithSelection('newest').find((item) => item.id === 'newest')).toEqual(
        expect.objectContaining({
          id: 'newest',
          selected: true
        })
      );
    });
  });

  describe(`when 'selectedType' is invalid`, () => {
    describe(`when empty string`, () => {
      test(`a list of sort type is returned with 'selected' property injected ('false' for all)`, () => {
        expect(themeSortTypesWithSelection('').find((item) => item.selected)).toEqual(
          expect.objectContaining({
            id: 'default',
            selected: true
          })
        );
      });
    });

    describe(`when an invalid type`, () => {
      test(`a list of sort type is returned with 'selected' property injected ('false' for all)`, () => {
        expect(themeSortTypesWithSelection('newest1').find((item) => item.selected)).toBeUndefined();
      });
    });
  });
});
