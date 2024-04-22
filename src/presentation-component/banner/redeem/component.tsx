import Image from 'presentation-component/ui/image';
import AdLink from '../../ui/ad-link';
import { getNavLink, isExternalLink } from '../../../utils/validate';

import styles from './style.module.scss';

const Link = ({ link, children }) => {
  const generalProps = {
    target: !!isExternalLink(link) ? '_blank' : '',
    rel: !!isExternalLink(link) ? 'nofollow' : 'dofollow',
    className: styles.link
  };

  if (!!isExternalLink(link)) {
    const aProps = {
      href: getNavLink(link),
      ...generalProps
    };

    return <a {...aProps}>{children}</a>;
  }

  const navLinkProps = {
    to: getNavLink(link),
    ...generalProps
  };

  return <AdLink {...navLinkProps}>{children}</AdLink>;
};

const BannerItem = (item, index) => {
  if (!item) return null;

  return (
    <div className={styles.item}>
      <Link link={item.links[0]}>
        <Image src={item.cover_image?.original_url} />
      </Link>
    </div>
  );
};

const Component = ({ banners = [] }) => {
  if (!banners || !banners.length) return null;

  return <div className={styles.container}>{banners.map(BannerItem)}</div>;
};

export default Component;
