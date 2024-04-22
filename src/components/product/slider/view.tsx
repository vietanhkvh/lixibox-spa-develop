import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { mergeStyle } from '../../../utils/responsive';

import Icon from '../../ui/icon';
import MainBlock from '../../../container/layout/main-block';
import LoadingPlaceholder from '../../ui/loading-placeholder';
import { isMobileVersion, getDeviceVersion } from '../../../utils/responsive';

import { renderDesktop } from './view-desktop';
import { renderMobile } from './view-mobile';
import { IProps, IState } from './model';
import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';

const renderItemPlaceholder = (item) => (
  <div style={STYLE.placeholder.item} key={item}>
    <LoadingPlaceholder style={STYLE.placeholder.image} />
    <LoadingPlaceholder style={STYLE.placeholder.text} />
    <LoadingPlaceholder style={STYLE.placeholder.text} />
    <LoadingPlaceholder style={STYLE.placeholder.lastText} />
  </div>
);

const renderLoadingPlaceholder = ({ column }) => {
  column = isMobileVersion() ? 2 : column || 4;

  let list: Array<number> = [];
  for (let i = 0; i < column; i++) {
    list.push(i);
  }

  return <div style={STYLE.placeholder}>{list.map(renderItemPlaceholder)}</div>;
};

export const renderHeadingComponent = (props) => {
  const { viewMore, viewMoreLink, showViewMore } = props;
  const linkProps = {
    to: viewMoreLink
  };

  const iconProps = {
    name: 'angle-right',
    className: componentStyles.blockHeadingViewMoreIcon
  };

  return (
    <div className={classNames(componentStyles.blockHeading, componentStyles.blockHeadingAutoAlign)}>
      <div className={componentStyles.blockHeadingLine} />
      <div className={componentStyles.blockHeadingTitle}>{}</div>
      {true === showViewMore && (
        <NavLink {...linkProps}>
          <span
            className={classNames(componentStyles.blockHeadingViewMore, componentStyles.blockHeadingViewMoreAutoAlign)}
          >
            {viewMore}
            <Icon {...iconProps} />
          </span>
        </NavLink>
      )}
    </div>
  );
};

const renderCustomTitle = ({ title, description, titleStyle = {} }) => {
  const desktopHeader = () => (
    <div style={STYLE.title.container}>
      {title}
      <span style={STYLE.title.borderLine} />
      <span style={STYLE.title.line} />
    </div>
  );

  const mobileHeader = () => (
    <div>
      <div
        className={classNames(componentStyles.blockHeading, componentStyles.blockHeadingMultiLine)}
        style={mergeStyle(STYLE.desktopTitle, titleStyle)}
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
      {description && (
        <div
          className={
            isMobileVersion()
              ? componentStyles.blockHeadingDescriptionMobile
              : componentStyles.blockHeadingDescriptionDesktop
          }
        >
          {description}
        </div>
      )}
    </div>
  );

  const switchHeader = {
    MOBILE: () => mobileHeader(),
    DESKTOP: () => desktopHeader()
  };

  return switchHeader[getDeviceVersion()]();
};

const renderView = ({ props, state, handleMouseHover, selectSlide, navLeftSlide, navRightSlide }) => {
  const { productList } = state as IState;
  const {
    type,
    title,
    style,
    column,
    isShowLike,
    isShowImage,
    isShowHeader,
    titleStyle,
    isShowRating,
    description,
    viewMoreText,
    isShowViewMore,
    isShowQuickBuy,
    viewMoreLink,
    purchaseType,
    isCustomTitle,
    isShowQuickView,
    lineTextNumber,
    isShowHorizontal,
    isShowPagination,
    isShowCurrentPrice,
    displayCartSumaryOption
  } = props as IProps;

  const renderMobileProps = {
    props,
    type,
    isShowLike,
    isShowImage,
    isShowRating,
    productList,
    isShowViewMore,
    isShowQuickBuy,
    purchaseType,
    isShowQuickView,
    lineTextNumber,
    isShowHorizontal,
    isShowCurrentPrice
  };

  const renderDesktopProps = {
    props,
    state,
    selectSlide,
    navLeftSlide,
    navRightSlide,
    isShowPagination,
    handleMouseHover,
    displayCartSumaryOption
  };

  const switchStyle = {
    MOBILE: () => renderMobile(renderMobileProps),
    DESKTOP: () => renderDesktop(renderDesktopProps)
  };

  const mainBlockProps = {
    viewMoreText,
    viewMoreLink,
    style: {},
    showHeader: isShowHeader,
    showViewMore: isShowViewMore,
    title: isCustomTitle ? '' : title,
    content: 0 === productList.length ? renderLoadingPlaceholder({ column }) : switchStyle[getDeviceVersion()]()
  };

  return (
    <div style={mergeStyle(STYLE, style)}>
      {isCustomTitle && renderCustomTitle({ title, description, titleStyle })}
      <MainBlock {...mainBlockProps} />
    </div>
  );
};

export default renderView;
