import { useEffect, useState } from 'react';
import { Pagination } from 'types/paging';
import { useQuery } from '.';

export const usePaginationState = (initialState?: Partial<Pagination>) => {
  const query = useQuery();
  const _currentPage = parseInt(query.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(initialState?.currentPage || _currentPage || 1);
  const [perPage, setPerPage] = useState(initialState?.perPage || 1);
  const [totalPages, setTotalPages] = useState(initialState?.totalPages || 1);

  useEffect(() => {
    if (initialState?.currentPage) {
      currentPage !== initialState?.currentPage && setCurrentPage(initialState?.currentPage);
    } else {
      currentPage !== _currentPage && setCurrentPage(_currentPage);
    }
    initialState?.perPage && perPage !== initialState?.perPage && setPerPage(initialState?.perPage);
    initialState?.totalPages && totalPages !== initialState?.totalPages && setTotalPages(initialState?.totalPages);
  }, [
    initialState?.currentPage,
    initialState?.perPage,
    initialState?.totalPages,
    currentPage,
    perPage,
    totalPages,
    _currentPage
  ]);

  return [
    {
      currentPage,
      perPage,
      totalPages
    } as Pagination,
    {
      setCurrentPage,
      setPerPage,
      setTotalPages
    }
  ] as const;
};

const PER_PAGE_DEFAULT = 10;
export interface UsePaginationPage {
  number: number;
  isCurrent: boolean;
  url: string;
}
export interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  perPage: number;
  pages: UsePaginationPage[];
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (currentPage: number) => void;
}
export const usePagination = ({
  perPage = PER_PAGE_DEFAULT,
  currentPage: _currentPageFromParam = 1,
  totalPages: _totalPages = 0
}: Partial<Pagination> = {}): UsePaginationReturn => {
  const query = useQuery();
  const _currentPage = parseInt(query.get('page') || (_currentPageFromParam && String(_currentPageFromParam)) || '1');
  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [totalPages, setTotalPages] = useState(_totalPages);
  const [pages, setPages] = useState<UsePaginationPage[]>([]);

  useEffect(() => {
    currentPage && setCurrentPage(currentPage);
  }, [currentPage]);
  useEffect(() => {
    if (perPage && totalPages) {
      const pages = Array.from({ length: totalPages }, (_, i) => ({
        number: i + 1,
        isCurrent: i + 1 === _currentPage,
        url: `?page=${i + 1}`
      }));
      setPages(pages);
    }
  }, [perPage, _currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    perPage,
    pages,
    setTotalPages,
    setCurrentPage
  };
};

export const usePageChange = (callback: (page: number) => void) => {
  const query = useQuery();
  const page = parseInt(query.get('page') || '1');

  useEffect(() => {
    callback(page);
  }, [page]);
};
