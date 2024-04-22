import { generatePath } from 'react-router-dom';
import classNames from 'classnames';
import { SearchBarSectionTopBrandResponse } from 'flows/search/reducer.type';
import { ROUTING_BRAND_DETAIL } from 'routings/path';
import { isMobileVersion } from 'utils';
import BrandPill from '../brand-pill';
import styles from './style.module.scss';
import SectionHeader from '../section-header';

interface BrandPillsProps {
  brands: SearchBarSectionTopBrandResponse[];
  /**
   * ID for tracing the origin of the click. Passed to the onClick callback.
   */
  id?: string;
  title?: { label: string; viewMoreLink?: { link: string; title: string } };
  onClick?: (params: {
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    brand: SearchBarSectionTopBrandResponse;
    id?: string;
  }) => void;
  classes?: { container?: string; title?: string; pills?: string; item?: string };
}
const BrandPills = ({ brands, title, id, classes, onClick }: BrandPillsProps) => {
  return (
    <div className={classNames(styles.brandPills, !isMobileVersion() && styles.desktop, classes?.container)}>
      {!!title && <SectionHeader title={title?.label} classes={{ container: classes?.title }} />}
      <div className={classNames(styles.pills, classes?.pills)}>
        {brands.map((brand, index) => (
          <BrandPill
            {...{
              key: index,
              name: brand.name,
              imageUrl: brand.image_url,
              link: brand.slug && generatePath(ROUTING_BRAND_DETAIL, { idBrand: brand.slug }),
              classes: { container: classNames(styles.pill, classes?.item) },
              onClick: (e) => onClick?.({ e, brand, id })
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandPills;
