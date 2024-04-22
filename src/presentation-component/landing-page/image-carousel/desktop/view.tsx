import Content from '../../content';
import Image from '../../image';
import SvgIcon from '../../../../presentation-component/ui/icon';
import styles from '../style.module.scss';
import classnames from 'classnames';
import { forwardRef } from 'react';

function Item(item, index) {
  const gapItem = 3 === this.numberOfItem ? 1 : 2;
  const itemProps = {
    className: classnames(styles.item, { [styles.selected]: this.selectedIndex + gapItem === index }),
    style: {
      minWidth:
        (this.selectedIndex + gapItem === index && `${100 / 5 + 15}%`) ||
        ((index === this.selectedIndex + gapItem + 1 || index === this.selectedIndex + gapItem - 1) &&
          `${100 / 5 + 5}%`) ||
        ((index === this.selectedIndex + gapItem + 2 || index === this.selectedIndex + gapItem - 2) && `${100 / 5}%`) ||
        (this.selectedIndex + gapItem - 2 < 0 && `${100 / 5}%`) ||
        (this.selectedIndex + gapItem + 2 > this.numberOfItem + 1 && `${100 / 5}%`),
      opacity:
        ((index === this.selectedIndex + gapItem + 1 || index === this.selectedIndex + gapItem - 1) && 1 - 0.35) ||
        ((index === this.selectedIndex + gapItem + 2 || index === this.selectedIndex + gapItem - 2) && 1 - 0.65)
    },
    key: `landing-page-image-carousel-item-${index}`
  };
  return (
    <div {...itemProps}>
      <Image {...item} />
    </div>
  );
}
interface IProps {
  containerProps: any;
  panelProps: any;
  displayList: any;
  isDisplayNavigationButton: boolean;
  navProps: any;
  selectedIndex: number;
  numberOfItem: number;
  focusedScaleValue: number;
  isDisplaySelectedContent: boolean;
  selectedContent: any;
}
const Nav = ({ navButtonType, onNav = (_) => {} }) => {
  const navContainerProps = {
    className: classnames(styles.navList, [styles.desktop], { [styles[`type-${navButtonType}`]]: true })
  };

  const leftProps = {
    onClick: () => !!onNav && onNav('left'),
    name: 'angle-right',
    className: styles.navItem
  };

  const rightProps = {
    onClick: () => !!onNav && onNav('right'),
    name: 'angle-right',
    className: styles.navItem
  };

  return (
    <div {...navContainerProps}>
      <SvgIcon {...leftProps} />
      <SvgIcon {...rightProps} />
    </div>
  );
};
const ImageCarouselDesk = forwardRef((props: IProps, ref: any) => {
  const {
    containerProps,
    panelProps,
    displayList,
    isDisplayNavigationButton,
    selectedIndex,
    numberOfItem,
    focusedScaleValue,
    navProps,
    selectedContent,
    isDisplaySelectedContent
  } = props;

  return (
    <>
      <div {...containerProps} ref={ref}>
        <div {...panelProps}>
          {!!displayList && displayList.map(Item, { selectedIndex, numberOfItem, focusedScaleValue })}
        </div>
        {isDisplayNavigationButton && <Nav {...navProps} />}
      </div>
      {!!isDisplaySelectedContent && !!selectedContent.length && (
        <div className={styles.selectedContent}>
          <Content text={selectedContent} />
        </div>
      )}
    </>
  );
});
export default ImageCarouselDesk;
