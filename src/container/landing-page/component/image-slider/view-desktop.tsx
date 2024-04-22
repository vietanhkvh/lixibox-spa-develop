import classNames from 'classnames';
import Icon from '../../../../components/ui/icon';
import ImageSliderItem from '../image-slider-item';

import STYLE from './style';
import componentStyles from '../../../../style/component.module.scss';
import { IProps, IState } from './model';

const renderSlider = ({ column, imageSlideSelected, openModal }) => {
  return (
    <div className={'landing-page-image-slider'} style={STYLE.desktop.mainWrap}>
      <div style={STYLE.desktop.container}>
        {imageSlideSelected &&
          Array.isArray(imageSlideSelected.list) &&
          imageSlideSelected.list.map((item, index) => {
            const slideProps = {
              item,
              column,
              openModal
            };

            return <ImageSliderItem key={`slider-item-${index}`} {...slideProps} />;
          })}
      </div>
    </div>
  );
};

const renderNavigation = ({ imageSlide, navLeftSlide, navRightSlide }) => {
  const leftNavProps = {
    className: classNames('left-nav', componentStyles.slideNavigationLeft),
    onClick: navLeftSlide,
    style: Object.assign({}, STYLE.imageSlide.navigation, { top: `calc(50% - 65px)` })
  };

  const rightNavProps = {
    className: classNames('right-nav', componentStyles.slideNavigationRight),
    onClick: navRightSlide,
    style: Object.assign({}, STYLE.imageSlide.navigation, { top: `calc(50% - 65px)` })
  };

  return imageSlide.length <= 1 ? null : (
    <div>
      <div {...leftNavProps}>
        <Icon name={'angle-left'} className={componentStyles.slideNavigationIcon} />
      </div>
      <div {...rightNavProps}>
        <Icon name={'angle-right'} className={componentStyles.slideNavigationIcon} />
      </div>
    </div>
  );
};

export const renderDesktop = ({ props, state, handleMouseHover, navLeftSlide, navRightSlide }) => {
  const { imageSlide, imageSlideSelected } = state as IState;
  const { column, openModal } = props as IProps;

  const containerProps = {
    style: STYLE.imageSlide,
    onMouseEnter: handleMouseHover
  };

  return (
    <div {...containerProps} className={'image-slide-container'}>
      {renderSlider({ column, imageSlideSelected, openModal })}
      {renderNavigation({ imageSlide, navLeftSlide, navRightSlide })}
    </div>
  );
};
