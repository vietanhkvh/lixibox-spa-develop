import BreadCrumb from 'components/general/bread-crumb';
import { BoxCategory } from 'types/api/shop';
import { generateCategoryHirarchy } from '../../../utils';

interface BreadCrumbCompositeProps {
  categories: Array<BoxCategory>;
}
const BreadcrumbComposite = ({ categories }: BreadCrumbCompositeProps) => {
  const listMenu = generateCategoryHirarchy(categories);
  return <BreadCrumb listMenu={listMenu} isFinalList={true} selectedSlug={window.location.pathname} />;
};

export default BreadcrumbComposite;
