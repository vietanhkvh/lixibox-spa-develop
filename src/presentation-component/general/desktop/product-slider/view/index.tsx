import classNames from 'classnames';

import Placeholder from './placeholder';
import Icon from '../../../../../components/ui/icon';
import STYLE from './style';
import style from './style.module.scss';

const Slider = ({
  generatedId,
  productList,
  column,
  template: Template,
  classes,
  sliderClassName,
  sliderItemClassName,
  onItemClick
}) => {
  const colWidth = (count) =>
    ({
      1: { minWidth: '100%', maxWidth: '100%' },
      2: { minWidth: 'calc(50% - 10px)', maxWidth: 'calc(50% - 10px)' },
      3: { minWidth: '33.33%', maxWidth: '33.33%' },
      4: { minWidth: '25%', maxWidth: '25%' },
      5: { minWidth: '20%', maxWidth: '20%' },
      6: { minWidth: '16.66%', maxWidth: '16.66%' }
    }[count]);

  return (
    <div id={`product-slider-${generatedId}`} className={classNames(style.body, classes?.slider, sliderClassName)}>
      {Array.isArray(productList) &&
        productList.map((product, index) => {
          return (
            <div
              key={index}
              className={classNames(style.productContainer, classes?.sliderItem, sliderItemClassName)}
              style={colWidth(column)}
              onClick={() => onItemClick?.(product?.product, index)}
            >
              <Template {...product} />
            </div>
          );
        })}
    </div>
  );
};

const ProductNavigation = ({ productSlide, onNavLeftSlide, onNavRightSlide, classes }) => {
  return productSlide.length <= 1 ? null : (
    <div className={classNames(style.sliderNavigation, classes?.navigation)}>
      <div className={classNames(style.leftNav, style.navSegment, style.navSegmentLeft)} onClick={onNavLeftSlide}>
        <Icon name={'angle-left'} style={STYLE.navigation.icon} />
      </div>
      <div className={classNames(style.rightNav, style.navSegment, style.navSegmentRight)} onClick={onNavRightSlide}>
        <Icon name={'angle-right'} style={STYLE.navigation.icon} />
      </div>
    </div>
  );
};

const SliderPagination = ({ productSlide, selectSlide, selectedIndex, classes }) => {
  return productSlide.length <= 1 ? null : (
    <div
      className={classNames(
        style.pagination,
        style.sliderPagination,
        style.sliderPaginationVisible,
        classes?.pagination
      )}
    >
      {Array.isArray(productSlide) &&
        productSlide.map((item, index) => (
          <div
            key={`product-slider-${item.id}`}
            onClick={() => 'function' === typeof selectSlide && selectSlide(index)}
            className={classNames(style.item, index === selectedIndex && style.itemActive)}
          />
        ))}
    </div>
  );
};

const renderView = ({ props, state, selectSlide, onNavLeftSlide, onNavRightSlide, onItemClick }) => {
  const { productList, productSlide, selectedIndex, generatedId } = state;
  const { column, template, classes, className, sliderClassName, sliderItemClassName } = props;

  return 0 === productList.length ? (
    <Placeholder column={column} />
  ) : (
    <div className={classNames(style.productSlideContainer, style.slider, classes?.container, className)}>
      <Slider
        {...{ generatedId, productList, column, template, classes, sliderClassName, sliderItemClassName, onItemClick }}
      />
      <SliderPagination
        {...{
          productSlide,
          selectSlide,
          selectedIndex,
          classes
        }}
      />
      <ProductNavigation
        productSlide={productSlide}
        onNavLeftSlide={onNavLeftSlide}
        onNavRightSlide={onNavRightSlide}
        classes={classes}
      />
    </div>
  );
};

export default renderView;
