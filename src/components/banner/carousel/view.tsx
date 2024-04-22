import classNames from 'classnames';

import AdLink from '../../../presentation-component/ui/ad-link';
import { getNavLink } from '../../../utils/validate';
import { decodeEntities } from '../../../utils/encode';
import { isMobileVersion } from '../../../utils';
import styles from './style.module.scss';

const renderNavLink = (link) => <AdLink to={link} className={styles.navLink} />;
const placeholder = ({ isShowIndicator }) => (
  <div className={classNames(styles.placeholder, isShowIndicator && styles.placeholderWithIndicator)}>
    <div className={styles.innerPlaceholder} />
    {!!isShowIndicator && <div className={styles.indicatorPlaceholder} />}
  </div>
);

function renderItem(item, $index) {
  if (!!item.links && 2 === item.links.length) {
    const bannerProps = {
      key: `item-banner-${$index}`,
      className: classNames(
        styles.link,
        isMobileVersion() ? styles.linkMobile : styles.linkDesktop,
        $index === this.total - 1 && styles.lastLink
      ),
      style: {
        backgroundImage:
          $index <= this.selectedIndex + 1
            ? `url(${decodeEntities((item && item.cover_image && item.cover_image.medium_url) || '')})`
            : ''
      }
    };

    const isShowNav = !!item && Array.isArray(item.links);

    return (
      <div {...bannerProps}>
        <div className={styles.innerLink}>
          {!!isShowNav && item.links.map((link) => renderNavLink(getNavLink(link)))}
          {''}
        </div>
      </div>
    );
  }

  const itemProps = generateLinkProps(item, $index, this.total, this.selectedIndex);
  return <AdLink {...itemProps} />;
}

function IndicatorItem(item, index) {
  const props = {
    key: index,
    className: classNames(styles.indicatorItem, index === this.selectedIndex && styles.indicatorItemSelected)
  };

  return <div {...props} />;
}

function Indicator({ selectedIndex, list }) {
  if (!list || list.length <= 1) return null;

  return (
    <div className={styles.indicator}>
      {list.map(IndicatorItem, { selectedIndex })}
      {''}
    </div>
  );
}

const generateLinkProps = (item, $index, total, selectedIndex) => ({
  className: classNames(
    styles.link,
    isMobileVersion() ? styles.linkMobile : styles.linkDesktop,
    $index === total - 1 && styles.lastLink
  ),
  style: {
    backgroundImage:
      $index <= selectedIndex + 1
        ? `url(${decodeEntities((item && item.cover_image && item.cover_image.medium_url) || '')})`
        : ''
  },
  to: getNavLink((item && item.links[0]) || ''),
  key: `banner-main-home-${(item && item.id) || 0}`
});

const renderView = ({
  selectedIndex,
  list,
  handleTouchStart,
  handleTouchMove,
  isShowIndicator,
  isGreyBg,
  handlStopAutoSlide
}) => {
  const isLoading = !list || 0 === list.length;
  if (!!isLoading) return placeholder({ isShowIndicator });

  const conttainerProps = {
    className: classNames(
      styles.container,
      isMobileVersion() ? styles.containerMobile : styles.containerDesktop,
      isMobileVersion() && !!isShowIndicator && styles.containerMobileIndicator,
      !!isGreyBg && styles.containerGreyBg
    ),
    onMouseEnter: handlStopAutoSlide,
    onTouchStart: handlStopAutoSlide
  };

  const panelProps = {
    className: classNames(styles.panel, isMobileVersion() ? styles.panelMobile : styles.panelDesktop),
    style: { transform: `translateX(calc(${selectedIndex * -100}% + ${selectedIndex * 16}px))` },
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove
  };

  return (
    <div {...conttainerProps}>
      <div {...panelProps}>{Array.isArray(list) && list.map(renderItem, { total: list.length, selectedIndex })}</div>
      {!!isShowIndicator && <Indicator selectedIndex={selectedIndex} list={list} />}
    </div>
  );
};
export default renderView;
