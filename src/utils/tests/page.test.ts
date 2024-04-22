import {
  initialPageable,
  readPage,
  upsertPage,
  mergeKeyArray,
  pageExists,
  generatePageUrl,
  getItemIndexAcrossPages
} from '../page';

describe('readPage', () => {
  describe('when page size does not exist', () => {
    test('should return empty array', () => {
      const pageable = initialPageable();
      const entries = readPage({ pageable, page: 1, perPage: 5 });
      expect(entries).toEqual([]);
    });
  });

  describe('when page size exists', () => {
    describe(`when page doesn't exist`, () => {
      test(`should return empty array`, () => {
        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' }
          },
          pageSizes: [5],
          pagingByPageSize: {
            5: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'] },
              totalPages: 3
            }
          }
        };
        const entries = readPage({ pageable, page: 1, perPage: 10 });
        expect(entries).toEqual([]);
      });
    });

    describe(`when page exists`, () => {
      test(`[First page] should return associated entities`, () => {
        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal3' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'], 2: ['e3'] },
              totalPages: 3
            }
          }
        };
        const entries = readPage({ pageable, page: 1, perPage: 2 });
        expect(entries).toEqual([
          { id: 'e1', data: 'testVal' },
          { id: 'e2', data: 'testVal2' }
        ]);
      });

      test(`[Other pages] should return associated entities`, () => {
        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal3' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1, 2],
              pageById: { 1: ['e1', 'e2'], 2: ['e3'] },
              totalPages: 3
            }
          }
        };
        const entries = readPage({ pageable, page: 2, perPage: 2 });
        expect(entries).toEqual([{ id: 'e3', data: 'testVal3' }]);
      });
    });
  });
});

describe('upsertPage', () => {
  describe('when pageSize does not exist', () => {
    describe('and no other pageSize exists', () => {
      test('should create pageSize, page and entries', () => {
        const expected = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' }
          },
          pageSizes: [5],
          pagingByPageSize: {
            5: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'] },
              totalPages: 3
            }
          }
        };

        const pageable = initialPageable();
        const entries = [
          { id: 'e1', data: 'testVal' },
          { id: 'e2', data: 'testVal2' }
        ];
        const updatedPageable = upsertPage({ pageable, entries, page: 1, perPage: 5, totalPages: 3 });
        expect(updatedPageable).toEqual(expected);
      });
    });

    describe(`ad some other pageSize exists`, () => {
      test(`should create new pageSize, add page to it, and retains other pageSizes`, () => {
        const expected = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal3' }
          },
          pageSizes: [2, 3],
          pagingByPageSize: {
            2: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'] },
              totalPages: 3
            },
            3: {
              pageIds: [1],
              pageById: { 1: ['e3'] },
              totalPages: 2
            }
          }
        };

        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'] },
              totalPages: 3
            }
          }
        };
        const entries = [{ id: 'e3', data: 'testVal3' }];
        const updatedPageable = upsertPage({ pageable, entries, page: 1, perPage: 3, totalPages: 2 });
        expect(updatedPageable).toEqual(expected);
      });
    });
  });

  describe('when pageSize exists', () => {
    describe(`when page doesn't exist`, () => {
      test(`should add page to the existing pageSize`, () => {
        const expected = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal3' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1, 2],
              pageById: { 1: ['e1', 'e2'], 2: ['e3'] },
              totalPages: 3
            }
          }
        };

        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'] },
              totalPages: 3
            }
          }
        };
        const entries = [{ id: 'e3', data: 'testVal3' }];
        const updatedPageable = upsertPage({ pageable, entries, page: 2, perPage: 2, totalPages: 3 });
        expect(updatedPageable).toEqual(expected);
      });
    });

    describe(`when page exists`, () => {
      test(`updates page`, () => {
        const expected = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal55' },
            e4: { id: 'e4', data: 'testVal4', data2: 'testValX' },
            e5: { id: 'e5', data: 'testVal5' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1, 2, 3],
              pageById: { 1: ['e1', 'e2'], 2: ['e3', 'e4'], 3: ['e5'] },
              totalPages: 3
            }
          }
        };

        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal3' },
            e4: { id: 'e4', data: 'testVal4' },
            e5: { id: 'e5', data: 'testVal5' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1, 2, 3],
              pageById: { 1: ['e1', 'e2'], 2: ['e3', 'e4'], 3: ['e5'] },
              totalPages: 3
            }
          }
        };
        const entries = [
          { id: 'e3', data: 'testVal55' },
          { id: 'e4', data: 'testVal4', data2: 'testValX' }
        ];
        const updatedPageable = upsertPage({ pageable, entries, page: 2, perPage: 2, totalPages: 3 });
        expect(updatedPageable).toEqual(expected);
      });

      test(`[Other pages] should return associated entities`, () => {
        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal3' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1, 2],
              pageById: { 1: ['e1', 'e2'], 2: ['e3'] },
              totalPages: 3
            }
          }
        };
        const entries = readPage({ pageable, page: 2, perPage: 2 });
        expect(entries).toEqual([{ id: 'e3', data: 'testVal3' }]);
      });
    });
  });
});

describe('mergeKeyArray', () => {
  test('should merge distinct arrays', () => {
    expect(mergeKeyArray([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(mergeKeyArray([1, '2', 3], [4, 5, '6'])).toEqual([1, '2', 3, 4, 5, '6']);
  });

  test('should merge arrays with common elements by eliminating duplicates', () => {
    expect(mergeKeyArray([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(mergeKeyArray([1, 2, '3'], [2, '3', 4])).toEqual([1, 2, '3', 4]);
  });
});

describe('pageExists', () => {
  describe('when page size does not exist', () => {
    test('should return false', () => {
      const pageable = initialPageable();
      expect(pageExists({ pageable, page: 1, perPage: 5 })).toBe(false);
    });
  });

  describe('when page size exists', () => {
    describe(`when page doesn't exist`, () => {
      test(`should return false`, () => {
        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' }
          },
          pageSizes: [5],
          pagingByPageSize: {
            5: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'] },
              totalPages: 3
            }
          }
        };
        expect(pageExists({ pageable, page: 1, perPage: 10 })).toBe(false);
      });
    });

    describe(`when page exists`, () => {
      test(`should return true`, () => {
        const pageable = {
          entities: {
            e1: { id: 'e1', data: 'testVal' },
            e2: { id: 'e2', data: 'testVal2' },
            e3: { id: 'e3', data: 'testVal3' }
          },
          pageSizes: [2],
          pagingByPageSize: {
            2: {
              pageIds: [1],
              pageById: { 1: ['e1', 'e2'], 2: ['e3'] },
              totalPages: 3
            }
          }
        };
        expect(pageExists({ pageable, page: 1, perPage: 2 })).toBe(true);
      });
    });
  });
});

describe('generatePageUrl', () => {
  it('should add the page number as a query parameter to a path', () => {
    const path = '/example';
    const page = 2;
    const result = generatePageUrl(path, page);
    expect(result).toBe('/example?page=2');
  });

  it('should add the page number as a query parameter to an URL with protocol', () => {
    const url = 'https://example.com';
    const page = 3;
    const result = generatePageUrl(url, page);
    expect(result).toBe('/?page=3');
  });

  it('should overwrite an existing page query parameter', () => {
    const url = 'https://example.com?page=1';
    const page = 4;
    const result = generatePageUrl(url, page);
    expect(result).toBe('/?page=4');
  });
});

describe('getItemIndexAcrossPages', () => {
  it('should return the correct index when currentPage is 1', () => {
    const result = getItemIndexAcrossPages({ itemIndexInPage: 2, perPage: 10, currentPage: 1 });
    expect(result).toEqual(2);
  });

  it('should return the correct index when currentPage is greater than 1', () => {
    const result = getItemIndexAcrossPages({ itemIndexInPage: 2, perPage: 10, currentPage: 3 });
    expect(result).toEqual(22);
  });

  it('should return the correct index when itemIndexInPage is 0', () => {
    const result = getItemIndexAcrossPages({ itemIndexInPage: 0, perPage: 10, currentPage: 3 });
    expect(result).toEqual(20);
  });

  it('should return the correct index when perPage is 1', () => {
    const result = getItemIndexAcrossPages({ itemIndexInPage: 2, perPage: 1, currentPage: 3 });
    expect(result).toEqual(4);
  });
});
