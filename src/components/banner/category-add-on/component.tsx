import { memo } from 'react';
import classnames from 'classnames';

import Image from 'presentation-component/ui/image';
import AdLink from '../../../presentation-component/ui/ad-link';
import styles from './style.module.scss';

interface CategoryAddOnProps {
  banner: {
    links: Array<string>;
    cover_image: { original_url: string };
    name: string;
  };
}

const CategoryAddOn = ({ banner }: CategoryAddOnProps) => {
  if (!banner) return null;

  return (
    <div className={classnames(styles.container)}>
      <AdLink to={banner.links[0]}>
        <Image src={banner?.cover_image?.original_url} alt={banner.name} />
      </AdLink>
    </div>
  );
};

export default memo(CategoryAddOn);
