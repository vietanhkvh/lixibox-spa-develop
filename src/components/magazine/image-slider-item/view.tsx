import { NavLink } from 'react-router-dom';
import TrackVisibility from 'lixibox-react-on-screen';

import { ROUTING_MAGAZINE_DETAIL_PATH, ROUTING_MAGAZINE_CATEGORY_PATH } from '../../../routings/path';
import SvgIcon from '../../../presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.css';

export function renderComponent({ state, props, handleLoadImage }) {
  const { item, type, column, onClick } = props as IProps;
  const { isLoadedImage } = state;

  const linkProps = {
    onClick: (e) => onClick?.(e, item),
    to: `${ROUTING_MAGAZINE_DETAIL_PATH}/${(item && item.slug) || ''}`,
    style: STYLE.container.itemSlider
  };

  return (
    <TrackVisibility style={Object.assign({}, STYLE.column[column || 4], STYLE.mainWrap)} offset={200}>
      {({ isVisible }) => {
        if (!!isVisible) {
          handleLoadImage();
        }

        return (
          <NavLink {...linkProps}>
            <div style={Object.assign({}, STYLE.container.itemSliderPanel, { opacity: isLoadedImage ? 1 : 0 })}>
              {isLoadedImage && item && item.cover_image && (
                <Image
                  style={STYLE.container.imageSlider}
                  alt={(item && item.title) || ''}
                  src={item.cover_image.medium_url}
                />
              )}
              {'video' === type && <div style={STYLE.container.videoIcon} />}
            </div>
            <div style={STYLE.container.info}>
              <div style={STYLE.container.info.title}>{(item && item.title) || ''}</div>
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
      }}
    </TrackVisibility>
  );
}
