import classNames from 'classnames';
import { getDeviceVersion } from '../../../utils/responsive';
import MainBlock from '../../../container/layout/main-block';
import LoadingPlaceholder from '../../ui/loading-placeholder';

import { renderDesktop } from './view-desktop';
import { renderMobile } from './view-mobile';
import { IProps, IState } from './model';
import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';

const renderItemPlaceholder = (item) => (
  <div style={STYLE.placeholder.item} key={item}>
    <LoadingPlaceholder style={STYLE.placeholder.image} />
  </div>
);

const renderLoadingPlaceholder = () => <div style={STYLE.placeholder}>{[1, 2, 3, 4].map(renderItemPlaceholder)}</div>;

const renderCustomTitle = ({ title, isCustomTitle, titleStyle = {} }) =>
  false === isCustomTitle ? null : (
    <div>
      <div
        className={classNames(componentStyles.blockHeading, componentStyles.blockHeadingMultiLine)}
        style={Object.assign({}, STYLE.desktopTitle, titleStyle)}
      >
        <div className={componentStyles.blockHeadingTitleMultiLine}>
          <span
            className={classNames(
              componentStyles.blockHeadingTitleText,
              componentStyles.blockHeadingTitleTextMultiLine
            )}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );

const renderView = ({ props, state, handleMouseHover, selectSlide, navLeftSlide, navRightSlide }) => {
  const { testimonialList } = state as IState;
  const { title, showViewMore, column, showHeader, isCustomTitle, titleStyle, openModal } = props as IProps;

  const renderMobileProps = { props, testimonialList, column, openModal };
  const renderDesktopProps = {
    props,
    state,
    navLeftSlide,
    navRightSlide,
    selectSlide,
    handleMouseHover
  };

  const switchStyle = {
    MOBILE: () => renderMobile(renderMobileProps),
    DESKTOP: () => renderDesktop(renderDesktopProps)
  };

  const mainBlockProps = {
    title: isCustomTitle ? '' : title,
    showHeader,
    showViewMore,
    content: 0 === testimonialList.length ? renderLoadingPlaceholder() : switchStyle[getDeviceVersion()](),
    style: {}
  };

  return (
    <div style={STYLE.container}>
      {isCustomTitle && renderCustomTitle({ title, isCustomTitle, titleStyle })}
      <MainBlock {...mainBlockProps} />
    </div>
  );
};

export default renderView;
