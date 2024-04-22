import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';
import InputField from 'presentation-component/ui/input-field';
import { createParamsSearch } from 'utils/navigate';
import LoadingPlaceholder from '../loading-placeholder';
import style from './style.module.scss';

interface HeaderPaginatorProps {
  currentPage?: number;
  totalPage?: number;
  perPage?: number;
  /**
   *  pagination url list, eg: ?page=2
   */
  urlList?: Array<any>;
  onPreviousPageClick?: (page: number) => void;
  onNextPageClick?: (page: number) => void;
  classes?: { container?: string };
}
const HeaderPaginator: React.FC<HeaderPaginatorProps> = (props) => {
  const {
    currentPage,
    totalPage,
    perPage,
    onPreviousPageClick = () => {},
    onNextPageClick = () => {},
    classes,
    urlList = []
  } = props;
  const [isOpenInput, openInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (currentPage !== 0 && totalPage !== 0) setIsLoading(false);
  }, [currentPage, totalPage]);

  const handleClickPanigation = () => {
    openInput(true);
  };

  const history = useHistory();

  const handleInputPage = (toPage: string): boolean => {
    const goto = parseInt(toPage);
    if (1 <= goto && goto <= totalPage) {
      const paramsChange = {
        pageNew: goto
      };
      let searchQuery = createParamsSearch(perPage, window.location, paramsChange);

      const query = new URLSearchParams(searchQuery);
      history.push(`${window.location.pathname}?${query.toString()}`);
      return true;
    }
    return false;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      openInput(false);
      handleInputPage(event.currentTarget.value) && window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const inputProps = {
    classes: { container: style.ipPagination, input: style.input },
    id: 'ip-pagination',
    name: 'input-pagination',
    isRoundedStyle: true,
    autoFocus: true,
    onKeyDown: handleKeyDown
  };

  const prevLinkProps = {
    to: (urlList[currentPage - 2] && urlList[currentPage - 2].link) || '',
    title: currentPage - 1 !== 0 && 'Trang ' + (currentPage - 1),
    onClick: (e) => {
      onPreviousPageClick && onPreviousPageClick(currentPage - 1);
      1 === currentPage && e.preventDefault();
      setIsLoading(false);
      handleScrollToTop();
    }
  };

  const nextLinkProps = {
    title: 'Trang ' + (currentPage + 1),
    to: (urlList[currentPage] && urlList[currentPage].link) || '',
    onClick: (e) => {
      onNextPageClick && onNextPageClick(currentPage + 1);
      totalPage === currentPage && e.preventDefault();
      setIsLoading(false);
      handleScrollToTop();
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (totalPage === 0) return;
  return (
    <div className={classnames(style.container, classes?.container)}>
      {isLoading ? (
        <LoadingPlaceholder className={style.loading} />
      ) : (
        <div
          className={classnames(style.number, isOpenInput && style.inputOn)}
          onClick={handleClickPanigation}
          onBlur={() => openInput(false)}
        >
          Trang{' '}
          {isOpenInput ? <InputField {...inputProps} /> : <span className={style.currentPage}>{`${currentPage}`}</span>}
          {` / ${totalPage}`}
        </div>
      )}
      <div className={style.btn}>
        <NavLink {...prevLinkProps}>
          <SvgIcon name={'angle-left'} className={classnames(style.btnWrapper, 1 === currentPage && style.disable)} />
        </NavLink>
        <NavLink {...nextLinkProps}>
          <SvgIcon
            name={'angle-right'}
            className={classnames(style.btnWrapper, style.right, totalPage === currentPage && style.disable)}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderPaginator;
