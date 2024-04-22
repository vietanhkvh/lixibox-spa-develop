import classNames from 'classnames';
import Icon from '../../ui/icon';
import Image from 'presentation-component/ui/image';
import AdLink from '../../../presentation-component/ui/ad-link';
import Loading from '../../ui/loading';
import * as tracking from './tracking';
import { getNavLink, isExternalLink } from '../../../utils/validate';
import { capitalize } from 'utils/string';

import * as VARIABLE from '../../../style/variable';
import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';

const renderNavLink = (link, name, index, selectedIndex) => {
  const generalProps = {
    onClick: () => tracking.onClickTracking(selectedIndex + 1),
    target: !!isExternalLink(link) ? '_blank' : '',
    rel: !!isExternalLink(link) ? 'nofollow' : 'dofollow',
    style: STYLE.link,
    title: name,
    key: index
  };

  if (!!isExternalLink(link)) {
    const aProps = {
      href: getNavLink(link),
      ...generalProps
    };

    // TODO: Restrucutre this component. Anchor body should not be empty
    // Ref.: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/anchor-has-content.md
    return <a {...aProps}> </a>;
  }

  const navLinkProps = {
    to: getNavLink(link),
    ...generalProps
  };

  return <AdLink {...navLinkProps} />;
};

const renderImage = ({ selected, index, selectedIndex, isWaitingLoadImage }) => {
  if (!!selected.links && selected.links.length >= 1) {
    const containerProps = {
      key: `item-${index}`,
      style: Object.assign({}, STYLE.item, {
        backgroundColor: selected.dominant_color || VARIABLE.colorF7
      })
    };

    const isShowImage = 0 === index || !isWaitingLoadImage;

    const imageProps = {
      alt: selected.name || 'Hình ảnh sản phẩm nổi bật lixibox',
      style: STYLE.imageBanner,
      src: (selected.cover_image && selected.cover_image.original_url) || ''
    };

    return (
      <div {...containerProps}>
        {!!isShowImage ? <Image {...imageProps} /> : <Loading style={STYLE.loading} />}

        <div style={STYLE.linkWrap}>
          {!!selected &&
            Array.isArray(selected.links) &&
            selected.links.map((link, $index) => renderNavLink(link, selected.name, $index, selectedIndex))}
        </div>
      </div>
    );
  }

  const props = {
    href: getNavLink(selected.links[0]),
    style: Object.assign(
      {},
      STYLE.item,
      selected.cover_image && {
        backgroundImage: `url(${selected.cover_image.original_url || ''})`
      },
      { backgroundColor: selected.dominant_color || VARIABLE.colorF7 }
    )
  };

  // TODO: Restrucutre this component. Anchor body should not be empty
  // Ref.: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/anchor-has-content.md
  return <a {...props}> </a>;
};

const renderListImage = ({
  list,
  selectedIndex,
  isWaitingLoadImage,
  onScroll,
  onMouseMove,
  onMouseUp,
  onMouseDown,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      {...{ onMouseMove, onMouseUp, onMouseDown, onScroll, onMouseEnter, onMouseLeave }}
      style={STYLE.list}
      id={'home-main-banner'}
    >
      {list.map((selected, index) => renderImage({ selected, index, selectedIndex, isWaitingLoadImage }))}
    </div>
  );
};

const calcSelectedPagaginationPosition = (selectedIndex, len) => {
  const totalWidth = len * 22;
  const left = selectedIndex * 22 - totalWidth / 2 + 11;

  return {
    transform: `translate3D(${left}px, 0, 0)`
  };
};

const renderPagination = ({ list, selectSlide, selectedIndex }) => {
  if (list.length <= 1) return null;

  const generateItemProps = (item, $index) => ({
    key: `banner-main-home-${item.id}`,
    onClick: () => selectSlide(list, $index),
    className: componentStyles.slidePaginationItem
  });

  return (
    <div style={STYLE.paginationStyle} className={'pagination'}>
      {Array.isArray(list) &&
        list.map((item, $index) => {
          const itemProps = generateItemProps(item, $index);
          return <div {...itemProps} />;
        })}
      <div
        key={`banner-main-home--1}`}
        className={componentStyles.slidePaginationItem}
        style={Object.assign(
          {},
          STYLE.slidePagination.isActive,
          calcSelectedPagaginationPosition(selectedIndex, list.length)
        )}
      />
    </div>
  );
};

const renderNavigation = ({ list, navSlide }) => {
  if (list.length <= 1) return null;

  const generateItemProps = (type: 'left' | 'right') => ({
    className: classNames(`${type}-nav`, componentStyles[`slideNavigation${capitalize(type)}`]), // TODO: VERIFY 2303

    onClick: () => navSlide(type),
    style: Object.assign({}, STYLE.navigationStyle)
  });

  const leftItemProps = generateItemProps('left');
  const rightItemProps = generateItemProps('right');

  const generateIconProps = (type: 'left' | 'right') => ({
    name: `angle-${type}`,
    style: { color: VARIABLE.colorWhite },
    className: componentStyles.slideNavigationIcon
  });

  const leftIconProps = generateIconProps('left');
  const rightIconProps = generateIconProps('right');

  return (
    <div>
      <div {...leftItemProps}>
        <Icon {...leftIconProps} />
      </div>
      <div {...rightItemProps}>
        <Icon {...rightIconProps} />
      </div>
    </div>
  );
};

export const renderView = ({
  props,
  state,
  handleMouseMove,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  handleMouseLeave,
  handleSelectSlide,
  handleNavSlide,
  handeScrollBanner
}) => {
  const { list = [], style } = props;
  const { selectedIndex, isWaitingLoadImage } = state;

  const containerProps = {
    style: Object.assign({}, STYLE.container, style),
    className: 'banner-main-container'
  };

  return 0 === list.length ? null : (
    <div {...containerProps}>
      {renderListImage({
        list,
        selectedIndex,
        isWaitingLoadImage,
        onScroll: handeScrollBanner,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseDown: handleMouseDown,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      })}
      {renderPagination({ list, selectSlide: handleSelectSlide, selectedIndex })}
      {renderNavigation({ list, navSlide: handleNavSlide })}
    </div>
  );
};
