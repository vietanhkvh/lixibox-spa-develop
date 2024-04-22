import { getDeviceVersion } from '../../../utils/responsive';

import { renderDesktop } from './view-desktop';
import { renderMobile } from './view-mobile';
import { IProps, IState } from './model';
import STYLE from './style';

const renderView = ({ props, state, handleMouseHover, selectSlide, navLeftSlide, navRightSlide }) => {
  const { imageList } = state as IState;
  const { column, handleOmitImgHeight } = props as IProps;

  const renderMobileProps = { imageList, column, handleOmitImgHeight };
  const renderDesktopProps = {
    props,
    state,
    selectSlide,
    navLeftSlide,
    navRightSlide,
    handleMouseHover
  };

  const switchStyle = {
    MOBILE: () => renderMobile(renderMobileProps),
    DESKTOP: () => renderDesktop(renderDesktopProps)
  };

  return <div style={STYLE.container}>{switchStyle[getDeviceVersion()]()}</div>;
};

export default renderView;
