import classNames from 'classnames';
import Icon from '../../ui/icon';

import ImageSliderItem from '../image-slider-item';

import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';
import { IProps, IState } from './model';

const renderSlider = ({ column, type, magazineSlideSelected, style, onItemClick }) => (
  <div className={'magazine-category'} style={STYLE.desktop.mainWrap}>
    <div style={Object.assign({}, STYLE.desktop.container, style)}>
      {magazineSlideSelected &&
        Array.isArray(magazineSlideSelected.list) &&
        magazineSlideSelected.list.map((item, index) => {
          const slideProps = {
            item,
            type,
            column,
            onClick: (_, magazine) => onItemClick?.(magazine, index)
          };

          return <ImageSliderItem key={`slider-item-${item.id}`} {...slideProps} />;
        })}
    </div>
  </div>
);

const renderNavigation = ({ magazineSlide, navLeftSlide, navRightSlide }) => {
  const leftNavProps = {
    className: classNames('left-nav', componentStyles.slideNavigationLeft),
    onClick: navLeftSlide,
    style: Object.assign({}, STYLE.magazineSlide.navigation, { top: `calc(50% - 65px)` })
  };

  const rightNavProps = {
    className: classNames('right-nav', componentStyles.slideNavigationRight),
    onClick: navRightSlide,
    style: Object.assign({}, STYLE.magazineSlide.navigation, { top: `calc(50% - 65px)` })
  };

  return magazineSlide.length <= 1 ? null : (
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

const renderPagination = ({ magazineSlide, selectSlide, countChangeSlide }) => {
  const generateItemProps = (item, index) => ({
    key: `product-slider-${item.id}`,
    onClick: () => 'function' === typeof selectSlide && selectSlide(index),
    className: classNames(
      componentStyles.slidePaginationItem,
      index === countChangeSlide && componentStyles.slidePaginationItemActive
    )
  });

  return magazineSlide.length <= 1 ? null : (
    <div style={STYLE.magazineSlide.pagination} className={'pagination'}>
      {Array.isArray(magazineSlide) &&
        magazineSlide.map((item, $index) => {
          const itemProps = generateItemProps(item, $index);
          return <div {...itemProps}></div>;
        })}
    </div>
  );
};

export const renderDesktop = ({ props, state, handleMouseHover, selectSlide, navLeftSlide, navRightSlide }) => {
  const { magazineSlide, magazineSlideSelected, countChangeSlide } = state as IState;
  const { column, type, style, onItemClick } = props as IProps;

  const containerProps = {
    style: STYLE.magazineSlide,
    onMouseEnter: handleMouseHover
  };

  return (
    <div {...containerProps} className={'magazine-slide-container'}>
      {renderSlider({ column, type, magazineSlideSelected, style, onItemClick })}
      {renderPagination({ magazineSlide, selectSlide, countChangeSlide })}
      {renderNavigation({ magazineSlide, navLeftSlide, navRightSlide })}
    </div>
  );
};
