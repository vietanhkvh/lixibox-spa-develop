import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import * as VARIABLE from '../../../style/variable';
import Icon from '../../../components/ui/icon';

import './style.css';

const GeneralItemHeading = ({
  title,
  titleIcon = null,
  viewMoreLink,
  viewMore,
  classes = {},
  onViewMoreClick = () => {}
}: any) => {
  if (!title || !title.length) return null;

  const iconProps = {
    name: 'angle-right',
    style: { width: 12, heght: 20, color: VARIABLE.color8A },
    innerStyle: { width: 5 }
  };

  return (
    <div className={classNames('general-item-heading', classes?.container)}>
      <div className={classNames('title', classes?.title)}>
        {title}
        {titleIcon && titleIcon}
      </div>

      {!!viewMore.length && (
        <NavLink to={viewMoreLink} onClick={onViewMoreClick} className={'viewmore'}>
          {viewMore}
          <Icon {...iconProps} />
        </NavLink>
      )}
    </div>
  );
};

export default GeneralItemHeading;
