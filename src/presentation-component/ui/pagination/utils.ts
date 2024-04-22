import { generatePageUrl } from 'utils/page';
import { PaginationLink } from '.';

/**
 * NOTE: Legacy code. Needs to be refactored.
 */
interface GeneratePaginationLinkProps {
  currentPage: number;
  totalPages: number;
  pageableUrl: string;
}
export const generatePaginationLinks = ({ currentPage, totalPages, pageableUrl }: GeneratePaginationLinkProps) => {
  let list: Array<PaginationLink> = [],
    startInnerList,
    endInnerList;

  /** Generate head-list */
  if (currentPage >= 6) {
    list.push({
      number: 1,
      title: '1',
      link: generatePageUrl(pageableUrl, 1),
      active: false,
      disabled: false
    });

    list.push({
      number: null,
      title: '...',
      link: '#',
      active: false,
      disabled: true
    });
  }

  /**
   * Generate inner list
   *
   * startInnerList : min 0
   * endInnerList : max pagingInfo.totalPages
   *
   */
  startInnerList = currentPage - 2;
  startInnerList =
    startInnerList <= 0
      ? /** Min value : 1 */
        1
      : startInnerList === 2
      ? /** If start value === 2 -> force to 1 */
        1
      : startInnerList;

  endInnerList = startInnerList + 5;
  endInnerList =
    endInnerList > totalPages
      ? /** Max value totalPages */
        totalPages
      : /** If end value === totalPages - 1 -> force to totalPages */
      endInnerList === totalPages - 1
      ? totalPages
      : endInnerList;

  for (let i = startInnerList; i <= endInnerList; i++) {
    list.push({
      number: i,
      title: String(i),
      link: generatePageUrl(pageableUrl, i),
      active: i === currentPage,
      disabled: false
    });
  }

  /** Generate tail-list */
  if (totalPages > 6 && !list?.filter((item) => item.number === totalPages - 1).length) {
    list.push({
      number: -2,
      title: '...',
      link: '#',
      active: false,
      disabled: true
    });

    list.push({
      number: totalPages,
      title: String(totalPages),
      link: generatePageUrl(pageableUrl, totalPages),
      active: false,
      disabled: false
    });
  }

  return list;
};
