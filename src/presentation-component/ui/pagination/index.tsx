import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';
import { generatePaginationLinks } from './utils';
import styles from './style.module.scss';
import { usePrevious } from 'utils/hook';

interface PaginationLink {
  number: number;
  title: string;
  link: string;
  active: boolean;
  disabled: boolean;
}
interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalPages: number;
  /**
   * The URL / path on which the pagination is displayed.
   *
   * Paginator will replace the page number in the URL with the clicked page
   * number when a page link is clicked.
   *
   * Example: `/products?page=1`  will be replaced with `/products?page=2` when
   * the second page link is clicked.
   *
   * **WARNING**: If an URL is passed, the protocol must be included, otherwise
   * the URL will be considered as a path.
   *
   * @default 'window.location.pathname + window.location.search'
   */
  pageableUrl?: string;
  noScrollToTop?: boolean;
  onPageClick?: (page: number) => void;
  classes?: { container?: string };
}
const Pagination = ({
  currentPage,
  perPage,
  totalPages,
  pageableUrl: _pageableUrl,
  onPageClick,
  classes,
  noScrollToTop
}: PaginationProps) => {
  const location = useLocation();
  const currentPathWithQuery = `${location.pathname}${location.search}`;
  const prevPathWithQuery = usePrevious(currentPathWithQuery);
  const [pageableUrl, setPageableUrl] = useState<string>(_pageableUrl || currentPathWithQuery);
  const _prevPageableUrl = usePrevious(_pageableUrl);
  useEffect(() => {
    if (_pageableUrl === _prevPageableUrl) return;
    setPageableUrl(_pageableUrl);
  }, [_pageableUrl, _prevPageableUrl]);
  useEffect(() => {
    if (currentPathWithQuery === prevPathWithQuery) return;
    setPageableUrl(currentPathWithQuery);
  }, [currentPathWithQuery, prevPathWithQuery]);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLink[]>([]);
  useEffect(() => {
    setPaginationLinks(generatePaginationLinks({ currentPage, totalPages, pageableUrl }));
  }, [currentPage, totalPages, perPage, pageableUrl]);

  const shouldShowPagination = !(currentPage > totalPages || totalPages <= 1);

  return (
    shouldShowPagination && (
      <div className={classnames(styles.wrapper, classes?.container)}>
        <div className={styles.container}>
          {/* Previous page link */}
          {currentPage * 1 !== 1 && (
            <NavLink
              {...{
                to: paginationLinks[paginationLinks.findIndex((link) => link?.number === currentPage) - 1]?.link || '',
                className: classnames(styles.item, styles.icon),
                onClick: () => {
                  noScrollToTop || window.scrollTo({ top: 0, behavior: 'smooth' });
                  onPageClick?.(currentPage - 1);
                }
              }}
            >
              <SvgIcon name={'angle-left'} className={styles.iconLink} />
            </NavLink>
          )}
          {/* Pages link */}
          {paginationLinks.map((item) => (
            <NavLink
              {...{
                to: item.link,
                key: `pagi-item-${item.number}`,
                onClick: () => {
                  noScrollToTop || window.scrollTo({ top: 0, behavior: 'smooth' });
                  onPageClick?.(item.number);
                },
                className: classnames(
                  styles.item,
                  item.number === currentPage && styles.active,
                  item.disabled && styles.disabled
                )
              }}
            >
              {item.title}
            </NavLink>
          ))}
          {/* Next page link */}
          {currentPage * 1 !== totalPages * 1 && (
            <NavLink
              {...{
                to: paginationLinks[paginationLinks.findIndex((link) => link?.number === currentPage) + 1]?.link || '',
                className: classnames(styles.item, styles.icon),
                onClick: () => {
                  noScrollToTop || window.scrollTo({ top: 0, behavior: 'smooth' });
                  onPageClick?.(currentPage + 1);
                }
              }}
            >
              <SvgIcon name={'angle-right'} className={classnames(styles.iconLink, styles.nextLink)} />
            </NavLink>
          )}
        </div>
      </div>
    )
  );
};

export type { PaginationProps, PaginationLink };
export default Pagination;
