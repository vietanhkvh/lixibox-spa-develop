import { NavLink } from 'react-router-dom';

import SvgIcon from 'presentation-component/ui/icon';
import styles from './style.module.scss';
import classnames from 'classnames';

export function renderComponent() {
  const { current, total, urlList, handleClick } = this.props;
  const { list } = this.state;

  if (!!isInCorrectData({ current, total, urlList, list })) return null;

  const handleOnClick = (val) => 'function' === typeof handleClick && handleClick(val);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {renderPrevLink({ urlList, current, handleOnClick })}
        {renderListLink({ list, handleOnClick, current })}
        {renderNextLink({ urlList, current, handleOnClick, total })}
      </div>
    </div>
  );
}

const isInCorrectData = ({ current, total, urlList, list }) => {
  const isInCorrectPage = current > total;
  const isHiddenPagination =
    !Array.isArray(urlList) || urlList.length <= 1 || total !== urlList.length || total <= 1 || !Array.isArray(list);

  return !!isHiddenPagination || !!isInCorrectPage;
};

const renderListLink = ({ list, handleOnClick, current }) => {
  return list.map(renderCenterLink, { handleOnClick, current });
};

function renderCenterLink(item) {
  const linkProps = {
    to: item.link,
    title: 'Trang ' + item.title,
    key: `pagi-item-${item.number}`,
    onClick: () => this.handleOnClick(item.title),
    className: classnames(styles.item, item.number === this.current && styles.active, item.disabled && styles.disabled)
  };

  return <NavLink {...linkProps}>{item.title}</NavLink>;
}

const renderPrevLink = ({ urlList, current, handleOnClick }) => {
  const prevLinkProps = {
    to: (urlList[current - 2] && urlList[current - 2].link) || '',
    title: 'Trang ' + (current - 1),
    className: classnames(styles.item, styles.icon),
    onClick: () => handleOnClick(current - 1)
  };

  const prevIconProps = {
    name: 'angle-left',
    className: styles.iconLink
  };

  const isShowPrevLink = current * 1 !== 1;

  if (!isShowPrevLink) return null;

  return (
    <NavLink {...prevLinkProps}>
      <SvgIcon {...prevIconProps} />
    </NavLink>
  );
};

const renderNextLink = ({ urlList, current, handleOnClick, total }) => {
  const nextLinkProps = {
    title: 'Trang ' + (current + 1),
    to: (urlList[current] && urlList[current].link) || '',
    className: classnames(styles.item, styles.icon),
    onClick: () => handleOnClick(current + 1)
  };

  const nextIconProps = {
    name: 'angle-right',
    className: classnames(styles.iconLink, styles.nextLink)
  };

  const isShowNextLink = current * 1 !== total * 1;
  if (!isShowNextLink) return null;

  return (
    <NavLink {...nextLinkProps}>
      <SvgIcon {...nextIconProps} />
    </NavLink>
  );
};
