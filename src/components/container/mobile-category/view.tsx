import AdLink from '../../../presentation-component/ui/ad-link';
import { getNavLink, isExternalLink } from '../../../utils/validate';
import Image from 'presentation-component/ui/image';
import { decodeEntities } from '../../../utils/encode';
import styles from './styles.module.scss';
import classNames from 'classnames';

const RenderNavLink = ({ link, name, index, children }) => {
  const generalProps = {
    target: !!isExternalLink(link) ? '_blank' : '',
    rel: !!isExternalLink(link) ? 'nofollow' : 'dofollow',
    className: styles.category,
    title: name,
    key: index
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

function renderItem(item, index) {
  if (!item) return null;

  const titleProps = {
    className: classNames(styles.categoryName, !!this.isSmallSize && styles.nameSmall)
  };

  return (
    <RenderNavLink link={item.link} name={item.name} index={index}>
      <Image
        {...{
          className: classNames('icon-category-logo', styles.img, !!this.isSmallSize && styles.imgSmall),
          src: item.icon && item.icon.original_url,
          alt: ''
        }}
      />
      <div {...titleProps}>{decodeEntities(item.vn_name || item.name)}</div>
    </RenderNavLink>
  );
}

const PlaceholderItem = () => (
  <div className={styles.placeholderItem}>
    <div className={styles.placeholderImg} />
  </div>
);

const placeholder = () => {
  return (
    <div className={styles.placeholderContainer}>
      <PlaceholderItem />
      <PlaceholderItem />
      <PlaceholderItem />
      <PlaceholderItem />
    </div>
  );
};

export function renderComponent({ isSmallSize, list }) {
  if (!list || !list.length) return placeholder();

  const listProps = {
    className: classNames(styles.default, !!isSmallSize && styles.defaultSmall)
  };

  return (
    <div className={classNames('mobile-category', styles.placeholderContainer)}>
      <div {...listProps}>{Array.isArray(list) && list.map(renderItem, { isSmallSize })}</div>
    </div>
  );
}
