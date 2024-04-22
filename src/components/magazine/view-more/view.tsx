import { NavLink } from 'react-router-dom';

import Icon from '../../ui/icon';

import STYLE from './style';
import { IProps } from './model';

const renderView = (props: IProps) => {
  const { url } = props as IProps;
  const iconProps = {
    name: 'angle-right',
    style: STYLE.boxViewMore.iconAngleRight.container,
    innerStyle: STYLE.boxViewMore.iconAngleRight.inner
  };

  return (
    <div style={STYLE.boxViewMore.container}>
      <NavLink to={url} style={STYLE.boxViewMore.btnViewMore}>
        Xem thêm
        <Icon {...iconProps} />
      </NavLink>
    </div>
  );
};

export default renderView;
