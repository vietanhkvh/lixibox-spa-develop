import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import AdLink from 'presentation-component/ui/ad-link';
import Image from 'presentation-component/ui/image';
import styles from './style.module.scss';

interface BrandPillProps {
  name: string;
  imageUrl: string;
  link?: string;
  classes?: { container?: string };
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
const BrandPill = ({ name, imageUrl, link, classes, onClick }: BrandPillProps) => {
  return (
    <AdLink
      {...{
        className: classNames(styles.brandPill, !isMobileVersion() && styles.desktop, classes?.container),
        to: link || '#',
        onClick
      }}
    >
      <Image src={imageUrl} alt={name} className={styles.image} />
    </AdLink>
  );
};

export default BrandPill;
