import { useState, useEffect } from 'react';
import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';
import SvgIcon from '../../../presentation-component/ui/icon';

import Image from '../image';

import { defaultDataList } from './initialize';
import styles from './style.module.scss';

interface IProps {
  autoSlide?: boolean;
  autoSlideTimer?: number;
  isDisplayNavigationButton?: boolean;
  list?: Array<any>;
  navButtonType?: 'dark' | 'light';
}

function Item(item, index) {
  const gapItem = 3 === this.numberOfItem ? 1 : 2;
  const itemProps = {
    className: classnames(styles.item, { [styles.selected]: this.selectedIndex + gapItem === index })
  };

  return (
    <div {...itemProps}>
      <Image {...item} />
    </div>
  );
}

const initSelectedIndex = (numberOfItem) => (3 === numberOfItem ? 1 : 2);

const Nav = ({ navButtonType, onNav = (_) => {} }) => {
  const navContainerProps = {
    className: classnames(
      styles.navList,
      { [styles.desktop]: !isMobileVersion() },
      { [styles[`type-${navButtonType}`]]: true }
    )
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

const calcSelectedIndex = ({ direction, selectedIndex, total }) => {
  switch (direction) {
    case 'left':
      if (0 === selectedIndex) return total - 1;
      return selectedIndex - 1;

    case 'right':
      if (total - 1 === selectedIndex) return 0;
      return selectedIndex + 1;
  }
};

const calcPanelTranslation = ({ selectedIndex, numberOfItem }) => (100 / numberOfItem) * selectedIndex * -1;

const initDisplayList = ({ numberOfItem, list }) => {
  const total = list.length;

  switch (numberOfItem) {
    case 3:
      return [list[total - 1], ...list, list[0]];

    case 5:
      return [list[total - 2], list[total - 1], ...list, list[0], list[1]];
  }
};

const LandingPageGeneralComponents = ({
  autoSlide = true,
  autoSlideTimer = 3,
  isDisplayNavigationButton = true,
  list = defaultDataList,
  navButtonType = 'light'
}: IProps) => {
  const totalItem = Array.isArray(list) ? list.length : 0;

  const numberOfItem = isMobileVersion() ? 3 : totalItem <= 4 ? 3 : 5;

  const [isAllowNavAction, setAllowNavAction] = useState(true);
  const [displayList] = useState(initDisplayList({ list: list || [], numberOfItem }));
  const [selectedIndex, setSelectedIndex] = useState(initSelectedIndex(numberOfItem));
  const [panelTransition, setPanelTransition] = useState(calcPanelTranslation({ selectedIndex, numberOfItem }));

  let xDown = null;
  let yDown = null;

  const onNav = (direction) => {
    if (!isAllowNavAction) return;
    setAllowNavAction(false);

    const newIndex = calcSelectedIndex({ direction, selectedIndex, total: totalItem });
    setSelectedIndex(newIndex);
    setPanelTransition(calcPanelTranslation({ selectedIndex: newIndex, numberOfItem }));

    setTimeout(() => setAllowNavAction(true), 400);
  };

  let timerAutoSlide: any = null;
  useEffect(() => {
    timerAutoSlide = setInterval(() => {}, autoSlideTimer * 1000);
  });

  const containerProps = {
    className: styles.container,
    onTouchStart: (e) => {
      xDown = e.touches[0].clientX;
      yDown = e.touches[0].clientY;
    },
    onTouchMove: (e) => {
      if (!xDown || !yDown) return;

      const xUp = e.touches[0].clientX;
      const yUp = e.touches[0].clientY;

      // @ts-ignore: Object is possibly 'null'.
      const xDiff = xDown - xUp;
      // @ts-ignore: Object is possibly 'null'.
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) onNav('right');
      if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) onNav('left');

      xDown = null;
      yDown = null;

      if (Math.abs(xDiff) > 5) {
        e.preventDefault();
        e.returnValue = false;
        return false;
      }
    }
  };

  const panelProps = {
    className: classnames(styles.panel, { [styles[`number-item-${numberOfItem}`]]: !!numberOfItem }),
    style: {
      transform: `translate3D( ${panelTransition}%, 0, 0)`
    }
  };

  const navProps = {
    navButtonType,
    onNav: (direction) => {
      clearInterval(timerAutoSlide);
      onNav(direction);
    }
  };

  return !list || list.length < 3 ? null : (
    <div {...containerProps}>
      <div {...panelProps}>
        {!!displayList && displayList.map(Item, { selectedIndex, numberOfItem })}
        {''}
      </div>

      {isDisplayNavigationButton && <Nav {...navProps} />}
    </div>
  );
};

export default LandingPageGeneralComponents;
