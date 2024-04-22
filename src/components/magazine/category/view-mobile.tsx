import { NavLink } from 'react-router-dom';

import { ROUTING_MAGAZINE_DETAIL_PATH, ROUTING_MAGAZINE_CATEGORY_PATH } from '../../../routings/path';
import SvgIcon from '../../../presentation-component/ui/icon';
import SeparateLine from '../../../presentation-component/ui/separate-line';
import Image from 'presentation-component/ui/image';

import STYLE from './style';
import styles from './style.module.css';

const renderView = ({ title, url, list, type = 'normal', onItemClick }) => {
  const route = ROUTING_MAGAZINE_DETAIL_PATH;

  if (!list || !list.length) return null;

  return (
    <>
      <div className={'magazine-category'} style={STYLE.mobile.mainWrap}>
        <div style={STYLE.mobile.heading}>{title}</div>
        <div style={STYLE.mobile}>
          <div style={STYLE.mobile.container}>
            {Array.isArray(list) &&
              list.map((item, index) => {
                const linkProps = {
                  key: `img-${index}`,
                  onClick: () => onItemClick?.(item, index),
                  to: `${route}/${item.slug}`,
                  style: STYLE.mobile.container.itemSlider
                };

                let tags = 0 === item.tags.length ? [item.description] : item.tags;

                tags
                  .map((item) => {
                    if ('#' === item.charAt(0)) {
                      item = item.slice(1).toLowerCase();
                    }
                    return item;
                  })
                  .filter((index) => index < 10);

                return (
                  <div {...linkProps}>
                    <NavLink to={`${route}/${item.slug}`} style={STYLE.mobile.container.itemSliderPanel}>
                      <Image
                        alt={''}
                        src={item.cover_image.original_url}
                        style={STYLE.mobile.container.itemSliderPanelImg}
                      />
                      {'video' === type && <div style={STYLE.mobile.container.videoIcon} />}
                    </NavLink>
                    <div style={STYLE.mobile.container.info}>
                      <NavLink to={`${route}/${item.slug}`} style={STYLE.mobile.container.info.title}>
                        {item.title}
                      </NavLink>
                      <div className={styles.magazineItemInfo}>
                        {!!item.category && (
                          <NavLink
                            to={`${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.category.slug}`}
                            className={styles.link}
                          >
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
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <SeparateLine />
    </>
  );
};

export default renderView;
