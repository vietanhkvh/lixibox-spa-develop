import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import ProductSlider from '../product-slider';
import SvgIcon from '../../../ui/icon';

import style from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

interface ProductSliderWithHeadingProps {
  title?: string;
  viewMoreTitle?: string;
  viewMoreLink?: string;
  onViewMoreLinkClick?: (link: string) => void;
  isShowViewMore?: boolean;
  column?: number;
  className?: string;
  classes?: { container?: string; heading?: string; titleSection?: string };
  [key: string]: any;
  dataTestId?: string;
}
const ProductSliderWithHeading = ({
  title = '',
  viewMoreTitle = 'Xem tất cả',
  viewMoreLink = '#',
  onViewMoreLinkClick,
  isShowViewMore = false,
  column = 5,
  className = '',
  classes = {},
  dataTestId = 'view-more',
  ...props
}: ProductSliderWithHeadingProps) => {
  return (
    <div className={classnames(style.container, className, classes && classes.container)}>
      <div className={classnames(style.heading, classes && classes.heading)}>
        {!!title && !!title.length && (
          <div className={classnames(style.titleSection, classes && classes.titleSection, 'headline-typo')}>
            {title}
          </div>
        )}
        {!!isShowViewMore && (
          <NavLink
            {...generateTestId({ name: dataTestId })}
            to={viewMoreLink}
            onClick={() => onViewMoreLinkClick?.(viewMoreLink)}
            className={style.viewMore}
          >
            {viewMoreTitle}
            <SvgIcon name={'angle-right'} className={style.icon} />
          </NavLink>
        )}
      </div>

      <ProductSlider {...(props as any)} column={column} />
    </div>
  );
};

export default ProductSliderWithHeading;
