import { memo } from 'react';
import classNames from 'classnames';

import AdLink from '../../../presentation-component/ui/ad-link';
import { decodeEntities } from '../../../utils/encode';
import { isMobileVersion } from '../../../utils/responsive';
import styles from './style.module.scss';

function renderItem(item, $index) {
  if (!item.links) return;
  const imageUrl = decodeEntities((item && item.cover_image && item.cover_image.medium_url) || '');

  const containerProps = {
    key: `item-banner-${$index}`,
    className: classNames(styles.link, isMobileVersion() ? styles.linkMobile : styles.linkDesktop),
    style: { backgroundImage: `url(${imageUrl})` }
  };

  return !!window.isInsightsBot && $index >= 2 ? null : (
    <div {...containerProps}>
      <div className={styles.innerLink}>
        {!!item &&
          Array.isArray(item.links) &&
          item.links.map((link, index) => <AdLink key={index} to={link} className={styles.navLink} />)}
      </div>
    </div>
  );
}

interface BannerFeatureProps {
  list: Array<any>;
}
const BannerFeature = ({ list }: BannerFeatureProps) => {
  if (!list || 0 === list.length) return null;

  return (
    <div
      className={classNames(
        styles.container,
        isMobileVersion() ? styles.containerMobile : styles.containerDesktop,
        isMobileVersion() && list.length !== 1 && styles.containerMulti
      )}
    >
      <div
        className={classNames(
          styles.panel,
          isMobileVersion() ? styles.panelMobile : styles.panelDesktop,
          isMobileVersion() && list.length !== 1 && styles.panelMulti
        )}
      >
        {Array.isArray(list) && list.map(renderItem)}
      </div>
    </div>
  );
};
BannerFeature.defaultProps = {
  list: []
};

const areEqual = ({ list }, { list: nextList }) => {
  const listLen = (list && list.length) || 0;
  const nextListLen = (nextList && nextList.length) || 0;
  return listLen === nextListLen;
};

export default memo(BannerFeature, areEqual);
