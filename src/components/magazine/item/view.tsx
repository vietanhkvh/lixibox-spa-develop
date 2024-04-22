import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import SvgIcon from '../../../presentation-component/ui/icon';

import { isMobileVersion } from '../../../utils/responsive';
import { decodeEntities } from '../../../utils/encode';
import { ROUTING_MAGAZINE_DETAIL_PATH, ROUTING_MAGAZINE_CATEGORY_PATH } from '../../../routings/path';

import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const renderExtraInfo = (item) => {
  return (
    <div className={classnames(styles.magazineItemInfo, styles.white)}>
      {!!item.category && (
        <NavLink to={`${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.category.slug}`} className={styles.link}>
          <SvgIcon name={'menu'} className={styles.menuIcon} />
          {item.category.name}
        </NavLink>
      )}
      {!!item.author && (
        <div className={styles.link}>
          <SvgIcon name={'user'} className={styles.userIcon} />
          {item.author.name}
        </div>
      )}
    </div>
  );
};

const renderView = (props) => {
  const { item, style, size = 'medium', mobileSize = 'normal', isShowCategory, onClick } = props as IProps;
  if (!item || !item.cover_image) return null;

  let tags = 0 === item.tags.length ? [item.description] : item.tags;

  tags
    .map((item, index) => {
      if ('#' === item.charAt(0)) {
        item = item.slice(1).toLowerCase();
      }
      return item;
    })
    .filter((item, index) => index < 5);

  const itemStyle = !!isMobileVersion()
    ? Object.assign({}, STYLE.mobile.itemSlider, 'small' === mobileSize && STYLE.mobile.itemSliderMini, style)
    : Object.assign(
        {},
        'large' === size && STYLE.mobile.itemSlider,
        'large' === size && {
          backgroundImage: `url("${decodeEntities(item.cover_image.original_url)}")`,
          borderRadius: 8,
          overflow: 'hidden'
        },
        'medium' === size && STYLE.mobile.mediumItemSlider,
        'small' === size && STYLE.mobile.smallItemSlider,
        style
      );

  const linkProps = {
    key: `item-${item.id}`,
    onClick: (e) => onClick?.(e, item),
    to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${item.slug}`,
    style: itemStyle
  };

  const switchView = {
    large: () => renderHighlighItem({ linkProps, item }),
    medium: () => renderNormalItem({ linkProps, item, isShowCategory }),
    small: () => renderNormalItem({ linkProps, item, isShowCategory })
  };

  if (!!isMobileVersion()) {
    return renderNormalItem({ linkProps, item, isShowCategory, mobileSize });
  }

  return switchView[size]();
};

const renderHighlighItem = ({ linkProps, item }) => {
  return (
    <NavLink {...linkProps}>
      <div style={STYLE.mobile.itemSliderPanel}>
        <div style={STYLE.mobile.info}>
          <div style={STYLE.mobile.info.title}>{item.title}</div>
          {renderExtraInfo(item)}
        </div>
      </div>
    </NavLink>
  );
};

const renderNormalItem = ({ linkProps, item, isShowCategory, mobileSize = 'normal' }) => {
  const coverImageProps = {
    style: Object.assign(
      {},
      STYLE.mobile.smallItemSliderPanel,
      !!isMobileVersion() && STYLE.mobile.smallItemSliderPanelMobile
    )
  };

  const titleProps = {
    style: Object.assign({}, STYLE.mobile.smallInfo.title, 'small' === mobileSize && STYLE.mobile.smallInfo.title.mini)
  };

  return (
    <NavLink {...linkProps}>
      <div
        style={Object.assign(
          {},
          STYLE.mobile.smallItemSliderPanelOuter,
          'small' === mobileSize && STYLE.mobile.smallItemSliderPanelOuter.mini
        )}
      >
        <div {...coverImageProps}>
          <Image
            alt=""
            src={decodeEntities(item.cover_image.original_url)}
            style={STYLE.mobile.smallItemSliderPanelImg}
          />
        </div>
      </div>
      <div style={Object.assign({}, STYLE.mobile.smallInfo, 'small' === mobileSize && STYLE.mobile.smallInfo.mini)}>
        <div {...titleProps}>{item.title}</div>
        <div className={styles.magazineItemInfo}>
          {!!item.category && (
            <NavLink to={`${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.category.slug}`} className={styles.link}>
              <SvgIcon name={'menu'} className={styles.menuIcon} />
              {item.category.name}
            </NavLink>
          )}
          {!!item.author && (
            <div className={styles.link}>
              <SvgIcon name={'user'} className={styles.userIcon} />
              {item.author.name}
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default renderView;
