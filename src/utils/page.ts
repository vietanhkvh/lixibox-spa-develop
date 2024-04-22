/**
 * Normalized paginatable data management utility with support for different page sizes
 */

interface Entity {
  id: string | number;
  [id: string]: any;
}

interface Entities {
  [id: string]: Entity;
}

interface Paging {
  pageIds: Array<number>;
  pageById: { [id: number]: Array<number | string> };
  totalPages: number;
}

interface PagingByPageSize {
  [id: number]: Paging;
}

export interface Pageable {
  entities: Entities;
  pageSizes: Array<number>;
  pagingByPageSize: PagingByPageSize;
}

export const mergeKeyArray = (arrayA: Array<number | string>, arrayB: Array<number | string>): Array<number | string> =>
  arrayA.concat(arrayB.filter((nth) => !arrayA.includes(nth)));

export const initialPageable = (): Pageable => ({
  entities: {},
  pageSizes: [],
  pagingByPageSize: {}
});

export const upsertPage = ({
  entries,
  pageable,
  page,
  perPage,
  totalPages
}: {
  entries: Array<Entity>;
  pageable: Pageable;
  page: number;
  perPage: number;
  totalPages: number;
}) => {
  const { entities, pageSizes, pagingByPageSize } = pageable;
  const entryIds = entries.map((entry) => entry.id);
  let _pagingByPageSizeUpdate = {};

  if (pageSizes.includes(perPage) && pagingByPageSize[perPage]) {
    const { pageIds, pageById } = pagingByPageSize[perPage];
    const pageEntities = pageById[page];

    _pagingByPageSizeUpdate = {
      [perPage]: {
        pageIds: pageIds.includes(page) ? pageIds : [...pageIds, page],
        pageById: Object.assign({}, pageById, {
          [page]: pageIds.includes(page) ? mergeKeyArray(pageEntities, entryIds) : entryIds
        }),
        totalPages
      }
    };
  } else {
    _pagingByPageSizeUpdate = {
      [perPage]: {
        pageIds: [page],
        pageById: { [page]: entryIds },
        totalPages
      }
    };
  }

  return {
    entities: Object.assign(
      {},
      entities,
      entries.reduce((acc, entity) => Object.assign(acc, { [entity.id]: entity }), {})
    ),
    pageSizes: pageSizes.includes(perPage) ? pageSizes : [...pageSizes, perPage],

    pagingByPageSize: Object.assign({}, pagingByPageSize, _pagingByPageSizeUpdate)
  };
};

export const readPage = ({
  pageable,
  page,
  perPage
}: {
  pageable: Pageable;
  page: number;
  perPage: number;
}): Array<Entity> => {
  const { entities, pageSizes, pagingByPageSize } = pageable;

  if (!pageSizes.includes(perPage) || !pagingByPageSize[perPage]) return [];

  const { pageIds, pageById } = pagingByPageSize[perPage];

  if (!pageIds.includes(page)) return [];

  return pageById[page].map((id) => entities[id]);
};

export const getTotalPages = ({ pageable, perPage }: { pageable: Pageable; perPage: number }): number | undefined => {
  const { pageSizes, pagingByPageSize } = pageable;

  if (!pageSizes.includes(perPage) || !pagingByPageSize[perPage]) return undefined;

  return pagingByPageSize[perPage].totalPages;
};

export const pageExists = ({
  pageable,
  page,
  perPage
}: {
  pageable: Pageable;
  page: number;
  perPage: number;
}): boolean => {
  const { pageSizes, pagingByPageSize } = pageable;

  if (!pageSizes.includes(perPage) || !pagingByPageSize[perPage]) return false;

  const { pageIds } = pagingByPageSize[perPage];

  if (!pageIds.includes(page)) return false;

  return true;
};

export const totalPages = ({ pageable, perPage }: { pageable: Pageable; perPage: number }): number => {
  const { pageSizes, pagingByPageSize } = pageable;

  if (!pageSizes.includes(perPage) || !pagingByPageSize[perPage]) return 0;

  return pagingByPageSize[perPage].totalPages;
};

// NOTE: Temporary
export const pageLinks = ({ totalPages, baseUrl }: { totalPages: number; baseUrl: string }): Array<any> => {
  const pageNumbers = (Array(totalPages) as any).fill().map((_, n) => n + 1);
  const links = pageNumbers.map((pageNumber) => ({
    number: pageNumber,
    title: pageNumber,
    link: `${baseUrl}?page=${pageNumber}`
  }));
  return links;
};

/**
 *
 * @param urlOrPath - An URL with protocol or a path
 * @param page - The page number
 * @returns A path with the page number set as a query parameter
 *
 * **WARNING**: If an URL is passed, the protocol must be included, otherwise
 * the URL will be considered as a path.
 */
export const generatePageUrl = (urlOrPath: string, page: number) => {
  const urlObj = new URL(urlOrPath, window.location.origin);
  urlObj.searchParams.set('page', String(page));
  return urlObj.pathname + urlObj.search;
};

export interface GetItemIndexAcrossPages {
  itemIndexInPage: number;
  perPage: number;
  currentPage: number;
}
export const getItemIndexAcrossPages = ({ itemIndexInPage, perPage, currentPage }) => {
  const _itemIndexInPage = itemIndexInPage || 0;
  const _perPage = perPage || 1;
  const _currentPage = currentPage || 1;

  try {
    if (_currentPage <= 1) {
      return _itemIndexInPage;
    } else {
      return (_currentPage - 1) * _perPage + _itemIndexInPage;
    }
  } catch (e) {
    return itemIndexInPage;
  }
};
