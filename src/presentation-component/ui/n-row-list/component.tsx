import { ComponentType, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import style from './style.module.scss';
import { usePrevious } from '../../../utils/hook';

type Entries = Array<{ id?: string | number; [key: string]: any }>;
interface BeforeDisplayParams {
  entries: Entries;
  capacity: number;
  showMore: boolean;
  data: { [key: string]: any };
}
interface NRowListProps {
  columnWidth: number;
  maxRowCount: number;
  entries: Entries;
  data?: { [key: string]: any };
  contentTemplate: ComponentType<any>;
  moreButtonTemplate?: ComponentType<any>;
  onMoreClick?: () => any;
  beforeDisplay?: (param0: BeforeDisplayParams) => Entries;
  classes?: { container?: string; item?: string; moreButton?: string };
}
const NRowList = ({
  columnWidth,
  maxRowCount,
  entries,
  data,
  contentTemplate: ContentTemplate,
  moreButtonTemplate: MoreButtonTemplate,
  onMoreClick,
  beforeDisplay,
  classes
}: NRowListProps) => {
  const calculateCapacity = (containerWidth: number): { count: number; showMore: boolean } => {
    const maxItemPerRow = columnWidth ? Math.floor(containerWidth / columnWidth) : 0;

    const allRowCount = maxItemPerRow ? Math.ceil(entries.length / maxItemPerRow) : 0;

    const displayableRowCount = maxRowCount >= allRowCount ? allRowCount : maxRowCount;

    const showMore = allRowCount > displayableRowCount;
    const count = showMore ? maxItemPerRow * displayableRowCount - 1 : entries.length;

    return { count, showMore };
  };

  const containerRef = useRef<any>();
  const [displayList, setDisplayList] = useState<Array<any>>([]);
  const [displayCapacity, setDisplayCapacity] = useState<number>(0);
  const [shouldDisplayMore, setShouldDisplayMore] = useState<boolean>(false);
  const prevContainerRef = usePrevious(containerRef);

  const calculateAndUpdateDisplayParams = (containerDomElement) => {
    const containerWidth = Math.floor(containerDomElement.getBoundingClientRect().width);
    const { count, showMore } = calculateCapacity(containerWidth);
    setShouldDisplayMore(showMore);
    setDisplayCapacity(count);
  };

  useEffect(() => {
    // TODO: Check performance
    if (!(prevContainerRef && prevContainerRef.current) && containerRef && containerRef.current) {
      calculateAndUpdateDisplayParams(containerRef.current);
      if (window.ResizeObserver) {
        const observer = new ResizeObserver(() => {
          containerRef.current && calculateAndUpdateDisplayParams(containerRef.current);
        });
        observer.observe(containerRef.current);
      } else {
        console.warn(`ResizeObserver not supported`);
      }
    }
  }, [containerRef]);

  useEffect(() => {
    // TODO: Check performance
    setDisplayList(
      beforeDisplay
        ? beforeDisplay({
            entries,
            capacity: displayCapacity,
            showMore: shouldDisplayMore,
            data
          })
        : entries.slice(0, displayCapacity)
    );
  }, [displayCapacity, entries]);

  return (
    <>
      <div
        ref={containerRef}
        style={{ gridTemplateColumns: `repeat(auto-fill, ${columnWidth}px)` }}
        className={classNames(style.nRowList, classes && classes.container)}
      >
        {displayList.map((item, index) => (
          <div
            key={item.id || index}
            id={`item-${item.id || index}`}
            style={{ width: columnWidth }}
            className={classNames(style.item, classes && classes.item)}
          >
            <ContentTemplate item={item} {...data} />
          </div>
        ))}
        {shouldDisplayMore ? (
          MoreButtonTemplate ? (
            <div
              style={{ width: columnWidth }}
              className={classNames(style.item, classes && classes.item, classes && classes.moreButton)}
            >
              <MoreButtonTemplate />
            </div>
          ) : (
            <div
              className={classNames(style.moreButton, classes && classes.moreButton)}
              onClick={() => onMoreClick && onMoreClick()}
            >
              <div className={style.content}>⋯</div>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};
NRowList.defaultProps = {
  data: {}
};

export default NRowList;
