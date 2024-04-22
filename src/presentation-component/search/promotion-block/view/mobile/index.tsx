import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import AdLink from 'presentation-component/ui/ad-link';
import { isMobileVersion } from 'utils';
import { ViewProps } from '../..';
import styles from './style.module.scss';

// TODO: Verify with full url and path
const View = ({ message, id, link, classes, onClick }: ViewProps) => {
  return (
    <AdLink
      {...{
        className: classNames(styles.promotionBlock, classes?.container),
        to: link || '#',
        onClick: (e) => onClick?.({ e, message, id, link })
      }}
    >
      <Icon name="gift" className={styles.giftIcon} />
      <span className={classNames(styles.message, isMobileVersion() ? styles.mobile : styles.desktop)}>{message}</span>
      <Icon name="angle-right" className={styles.navIcon} />
    </AdLink>
  );
};

export default View;
