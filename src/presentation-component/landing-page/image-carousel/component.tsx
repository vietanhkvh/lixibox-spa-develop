import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';

import styles from './style.module.scss';
import ImageCarouselMob from './mobile/view';
import ImageCarouselDesk from './desktop/view';

export const ImageCarouselMode = Object.freeze({
  THREE_ITEM: 'THREE_ITEM' as const,
  FIVE_ITEM_AND_MORE: 'FIVE_ITEM_AND_MORE' as const
});
type ImageCarouselModeType = keyof typeof ImageCarouselMode;

interface IProps {
  mode: ImageCarouselModeType;
  autoSlideTimer?: number;
  isDisplaySelectedContent;
  focusedScaleValue?: number;
  isDisplayNavigationButton?: boolean;
  list?: Array<any> | { mobile?: Array<any>; desktop?: Array<any> };
  navButtonType?: 'dark' | 'light';
  /**
  id for each container on mobile ver
  */
  idContainerCarousel?: string;
  /**
  which child node you want to show first in parent component
  */
  idCenterChild?: number;
}

const initSelectedIndex = (numberOfItem) => (3 === numberOfItem ? 1 : 2);
const initSelectedContent = ({ selectedIndex, list }) => list?.[selectedIndex]?.content;
const calcSelectedContent = ({ direction, selectedIndex, list }) => {
  const total = list.length;

  const condition = {
    left: () => (0 === selectedIndex ? total - 1 : selectedIndex - 1),
    right: () => (total - 1 === selectedIndex ? 0 : selectedIndex + 1)
  };

  const index = condition[direction]();

  if (!list[index]) return '';

  return list[index].content;
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

const calcPanelTranslation = ({ selectedIndex, initialTransitionNumber, indexDistance, extra }) => {
  const MINIMAL_WIDTH_PERCENT = 20;
  return extra + initialTransitionNumber * -100 + (selectedIndex - indexDistance) * MINIMAL_WIDTH_PERCENT * -1;
};

const initDisplayList = ({ numberOfItem, list }) => {
  const total = list.length;

  switch (numberOfItem) {
    case 3:
      return [list[total - 1], ...list, list[0]];

    case 5:
      return [list[total - 2], list[total - 1], ...list, list[0], list[1]];
  }
};

const LandingPageImageCarousel = ({
  autoSlideTimer = 3,
  focusedScaleValue = isMobileVersion() ? 1.4 : 1.1,
  isDisplayNavigationButton = true,
  isDisplaySelectedContent = false,
  list: _list = [],
  navButtonType = 'light',
  idContainerCarousel = '',
  idCenterChild = 2
}: IProps) => {
  const imgsRef = useRef<any>([]);
  const imgDeskRefContainer = useRef<HTMLDivElement>(null);
  const panelContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout>(null);

  const [isAllowNavAction, setAllowNavAction] = useState(true);
  const timerAutoSlideRef = useRef<NodeJS.Timeout>(null);
  let list = (Array.isArray(_list) ? _list : isMobileVersion() ? _list.mobile : _list.desktop) || [];
  if (list.length < 3) list = [];
  if (!(list.length % 2)) list = list.slice(0, list.length - 1);

  const totalItem = list.length;

  const numberOfItem = isMobileVersion() ? 3 : totalItem <= 4 ? 3 : 5;
  const extra = totalItem - numberOfItem === 0 ? 0 : 10 * (totalItem - numberOfItem);

  const [displayList] = useState(initDisplayList({ numberOfItem, list }));
  const [selectedIndex, setSelectedIndex] = useState(initSelectedIndex(numberOfItem));
  const [selectedContent, setSelectedContent] = useState(
    initSelectedContent({ selectedIndex: isMobileVersion() ? 0 : selectedIndex, list })
  );

  const panelContainerWidth = panelContainerRef.current?.scrollWidth || 1;
  const imgDeskContainerWidth = imgDeskRefContainer.current?.clientWidth || 1;
  const initialTransitionNumber = (panelContainerWidth - imgDeskContainerWidth) / (2 * imgDeskContainerWidth) || 0;

  const indexDistance = 3 === numberOfItem ? 1 : 2;
  const [panelTransition, setPanelTransition] = useState(
    calcPanelTranslation({
      selectedIndex,
      initialTransitionNumber,
      indexDistance,
      extra
    })
  );

  useEffect(() => {
    timerAutoSlideRef.current = setInterval(() => {}, autoSlideTimer * 1000);
  });

  useEffect(() => {
    setPanelTransition(calcPanelTranslation({ selectedIndex, initialTransitionNumber, indexDistance, extra }));
  }, [selectedIndex, initialTransitionNumber]);

  let xDown = null;
  let yDown = null;

  const onNav = (direction) => {
    if (!isAllowNavAction) return;
    setAllowNavAction(false);

    const newIndex = calcSelectedIndex({ direction, selectedIndex, total: totalItem });
    setSelectedIndex(newIndex);

    setPanelTransition(
      calcPanelTranslation({ selectedIndex: newIndex, initialTransitionNumber, indexDistance, extra })
    );
    setSelectedContent(calcSelectedContent({ direction, selectedIndex, list }));

    setTimeout(() => setAllowNavAction(true), 400);
  };

  return list.length < 3 ? null : isMobileVersion() ? (
    <ImageCarouselMob
      {...{
        container: styles.container,
        displaylist: list,
        handleOnScroll: (e) => {
          const haflScreenWidth = Math.ceil(e.currentTarget.offsetWidth / 2);
          const left = e.currentTarget.scrollLeft;
          scrollTimerRef.current && clearTimeout(scrollTimerRef.current);
          const callBack = () => {
            //Moblie: hanlde scroll img with its content
            (imgsRef.current?.map((i) => i.offsetLeft) || []).forEach((o: number, i) => {
              const rangeScroll = o - left;

              if (0 <= rangeScroll && rangeScroll <= haflScreenWidth) {
                if (i !== selectedIndex) {
                  setSelectedIndex(i);
                  setSelectedContent(list[i]?.content);
                }
                return;
              }
            });
          };
          scrollTimerRef.current = setTimeout(() => callBack(), 150);
        },
        isDisplaySelectedContent,
        selectedContent,
        ref: imgsRef,
        idCenterChild,
        idContainerCarousel
      }}
    />
  ) : (
    <ImageCarouselDesk
      {...{
        containerProps: {
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
          },
          style: {
            minHeight: imgDeskRefContainer?.current?.clientHeight
          }
        },
        panelProps: {
          className: classnames(styles.panel, { [styles[`number-item-${numberOfItem}`]]: !!numberOfItem }),
          style: {
            transform: `translate3D( ${panelTransition}%, 0, 0)`
          },
          ref: panelContainerRef
        },
        displayList,
        isDisplayNavigationButton,
        selectedIndex,
        numberOfItem,
        focusedScaleValue,
        navProps: {
          navButtonType,
          onNav: (direction) => {
            clearInterval(timerAutoSlideRef.current);
            onNav(direction);
          }
        },
        selectedContent,
        isDisplaySelectedContent,
        ref: imgDeskRefContainer
      }}
    />
  );
};

export default LandingPageImageCarousel;
