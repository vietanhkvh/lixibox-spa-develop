import classNames from 'classnames';
import Icon from '../../ui/icon';
import TestimonialItem from '../../../components/item/feedback-testimonial';

import STYLE from './style';
import componentStyles from '../../../style/component.module.scss';
import { IProps, IState } from './model';

const renderSlider = ({ openModal, column, testimonialSlideSelected, style, onItemClick }) => {
  return (
    <div className={'testimonial-category'} style={STYLE.desktop.mainWrap}>
      <div style={Object.assign({}, STYLE.desktop.container, style)}>
        {testimonialSlideSelected &&
          Array.isArray(testimonialSlideSelected.list) &&
          testimonialSlideSelected.list.map((item, index) => {
            const wrapProps = {
              key: `testimonial-item-${item.id}`,
              style: Object.assign({}, STYLE.itemWrap, STYLE.column[column || 4])
            };

            return (
              <div {...wrapProps}>
                <TestimonialItem data={item} openModal={openModal} onClick={() => onItemClick?.(item, index)} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const renderNavigation = ({ testimonialSlide, navLeftSlide, navRightSlide }) => {
  const leftNavProps = {
    className: classNames('left-nav', componentStyles.slideNavigationLeft),
    onClick: navLeftSlide,
    style: Object.assign({}, STYLE.testimonialSlide.navigation, { top: `calc(50% - 85px)` })
  };

  const rightNavProps = {
    className: classNames('right-nav', componentStyles.slideNavigationRight),
    onClick: navRightSlide,
    style: Object.assign({}, STYLE.testimonialSlide.navigation, { top: `calc(50% - 85px)` })
  };

  return testimonialSlide.length <= 1 ? null : (
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

const renderPagination = ({ testimonialSlide, selectSlide, countChangeSlide }) => {
  const generateItemProps = (item, index) => ({
    key: `product-slider-${item.id}`,
    onClick: () => 'function' === typeof selectSlide && selectSlide(index),
    className: classNames(
      componentStyles.slidePaginationItem,
      index === countChangeSlide && componentStyles.slidePaginationItemActive
    )
  });

  return testimonialSlide.length <= 1 ? null : (
    <div style={STYLE.testimonialSlide.pagination} className={'pagination'}>
      {Array.isArray(testimonialSlide) &&
        testimonialSlide.map((item, $index) => {
          const itemProps = generateItemProps(item, $index);
          return <div {...itemProps}></div>;
        })}
    </div>
  );
};

export const renderDesktop = ({ props, state, handleMouseHover, selectSlide, navLeftSlide, navRightSlide }) => {
  const { testimonialSlide, testimonialSlideSelected, countChangeSlide } = state as IState;
  const { column, style, openModal, onItemClick } = props as IProps;

  const containerProps = {
    style: STYLE.testimonialSlide,
    onMouseEnter: handleMouseHover
  };

  return (
    <div {...containerProps} className={'testimonial-slide-container'}>
      {renderSlider({ openModal, column, testimonialSlideSelected, style, onItemClick })}
      {renderPagination({ testimonialSlide, selectSlide, countChangeSlide })}
      {renderNavigation({ testimonialSlide, navLeftSlide, navRightSlide })}
    </div>
  );
};
