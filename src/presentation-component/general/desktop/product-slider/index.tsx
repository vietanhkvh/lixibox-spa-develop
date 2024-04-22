// TODO: Refactor. Ported for basic functionality, but not yet refactored
import { scrollElement } from '../../../../utils/scroll';
import { useState, useEffect } from 'react';

import renderView from './view';
import { ProductBox } from 'types/api/shop';

interface Slide {
  id: number;
  products: Array<any>;
}
/**
 * column: Number of products in each slide
 * template: Template component for each product
 * data: Array of props to feed to each product's template component
 */
interface IProps {
  column: number;
  data: Array<any>;
  template: any;
  classes?: { container?: string; slider?: string; sliderItem?: string; pagination?: string; navigation?: string };
  className: string;
  sliderClassName?: string;
  sliderItemClassName?: string;
  onNavLeft?: any;
  onNavRight?: any;
  onItemClick?: (item: ProductBox, index: number) => void;
}
const ProductSlider = ({
  column,
  data,
  template,
  classes,
  className,
  sliderClassName = '',
  sliderItemClassName = '',
  onNavLeft,
  onNavRight,
  onItemClick
}: IProps) => {
  const [generatedId] = useState(Math.floor(Math.random() * 1000000));
  const [productList, setProductList] = useState(data);
  const [productSlide, setProductSlide] = useState<Array<Slide>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const populateDataSlide = (products: Array<any>, slideSize) => {
    if (!products.length) return;
    const groupCount = Math.ceil(products.length / slideSize);
    const slides: Array<Slide> = Array(groupCount)
      .fill(undefined)
      .map((_, index) => ({ id: index, products: products.slice(slideSize * index, slideSize * (index + 1)) }));

    setProductList(products);
    setProductSlide(slides);
  };

  useEffect(() => {
    populateDataSlide(data, column);
  }, [data]);

  if (!data.length) return null;

  const navSlide = (direction) => {
    let newIndexValue = 'left' === direction ? -1 : 1;
    newIndexValue += selectedIndex;

    newIndexValue =
      newIndexValue === productSlide.length ? 0 : newIndexValue === -1 ? productSlide.length - 1 : newIndexValue;

    selectSlide(newIndexValue);
  };

  const selectSlide = (index) => {
    setTimeout(() => {
      setSelectedIndex(index);
      scrollSlider(index);
    }, 10);
  };

  const scrollSlider = (newPosition) => {
    const element = document.getElementById(`product-slider-${generatedId}`);
    if (!element) return;

    const { clientWidth } = element;
    scrollElement({
      x: clientWidth * newPosition,
      y: 0,
      element,
      isAnimation: true
    });
  };

  const renderViewProps = {
    props: { data, column, template, classes, className, sliderClassName, sliderItemClassName },
    state: { productList, productSlide, selectedIndex, generatedId },
    selectSlide: (index) => selectSlide(index),
    onNavLeftSlide: () => navSlide('left'),
    onNavRightSlide: () => {
      navSlide('right');
      onNavRight && onNavRight(selectedIndex, productList.length / column);
    },
    onItemClick
  };

  return renderView(renderViewProps);
};
ProductSlider.defaultProps = { data: [], column: 4, className: '' };

export default ProductSlider;
