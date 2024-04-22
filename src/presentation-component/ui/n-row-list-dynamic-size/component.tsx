import { ComponentType, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import style from './style.module.scss';

const Item = ({ item, data, id, template: Template, className, onDimentionSet }) => {
  const itemRef = useRef<any>();
  useEffect(() => {
    if (itemRef && itemRef.current) {
      onDimentionSet({
        id,
        width: itemRef.current.offsetWidth,
        height: itemRef.current.offsetHeight
      });
    }
  }, []);

  return (
    <div ref={itemRef} id={`item-${id}`} className={classNames(style.item, className)}>
      <Template item={item} {...data} />
    </div>
  );
};

const calculateRowCapacities = ({ widthList, containerWidth }) => {
  let rowCapacities = [];
  const insertInANewRow = ({ id, width }) => {
    const isFilled = width >= containerWidth;

    rowCapacities.push({
      count: 1,
      occupied: width,
      filled: isFilled
    });
  };

  const insertInTheLastRow = ({ id, width }) => {
    let lastRow = rowCapacities.slice(-1)[0];
    const isFilled = lastRow.occupied + width >= containerWidth;

    rowCapacities = rowCapacities.slice(0, -1).concat({
      count: lastRow.count + 1,
      occupied: lastRow.occupied + width,
      filled: isFilled
    });
  };

  widthList.forEach((item) => {
    const { width } = item;
    if (!rowCapacities.length) {
      insertInANewRow(item);
      return;
    }
    const lastRow = rowCapacities.slice(-1)[0];
    const isOversized = lastRow.occupied + width > containerWidth;
    if (isOversized) {
      insertInANewRow(item);
    } else {
      insertInTheLastRow(item);
    }
  });

  return rowCapacities;
};

const calculateDisplayCapacity = ({
  widthList,
  containerWidth,
  maxRowCount,
  moreWidth
}): { count: number; showMore: boolean } => {
  const rowCapacities = calculateRowCapacities({ containerWidth, widthList });
  const showMore = rowCapacities.length > maxRowCount;
  const displayableEntries = rowCapacities.slice(0, maxRowCount).reduce((acc, nth) => acc + nth.count, 0);
  let count = displayableEntries;

  if (showMore) {
    const lastDisplayableRow = rowCapacities.slice(0, maxRowCount).slice(-1)[0];
    const lastRowRemainingSpace = containerWidth - lastDisplayableRow.occupied;
    const showMoreFitsInLastRow = moreWidth <= lastRowRemainingSpace;
    if (!showMoreFitsInLastRow && lastDisplayableRow.count > 1) {
      count -= 1;
    }
  }

  return { count, showMore };
};

type Entries = Array<{ id?: string | number; [key: string]: any }>;
interface BeforeDisplayParams {
  entries: Entries;
  capacity: number;
  showMore: boolean;
  data: { [key: string]: any };
}
interface NRowListDynamicSizeProps {
  maxRowCount: number;
  entries: Array<{ id?: string | number; [key: string]: any }>;
  data?: { [key: string]: any };
  contentTemplate: ComponentType<any>;
  moreTemplate?: ComponentType<any>;
  moreWidth?: number;
  beforeDisplay?: (param0: BeforeDisplayParams) => Entries;
  onMoreClick?: () => any;
  classes?: { container?: string; item?: string; moreButton?: string };
}
/**
 * TODO: Optimize
 * Scenario:
 * - `beforeDisplay` callback has the potential to rearrange entry list.
 * - But, when list is rearranged, the capacity calculation becomes stale.
 * - This may result in inconsistent UI
 */
const NRowListDynamicSize = ({
  maxRowCount,
  entries,
  data,
  contentTemplate: ContentTemplate,
  moreTemplate: MoreTemplate,
  moreWidth,
  beforeDisplay,
  onMoreClick,
  classes
}: NRowListDynamicSizeProps) => {
  const containerRef = useRef<any>();
  const [displayList, setDisplayList] = useState<Array<any>>(entries);
  const [widthList, setWidthList] = useState<Array<{ id: number | string; width: number }>>([]);
  const [shouldDisplayMore, setShouldDisplayMore] = useState<boolean>(false);

  const calculateAndUpdateDisplayParams = ({ widthList, containerDomElement, moreWidth }) => {
    const containerWidth = Math.floor(containerDomElement.getBoundingClientRect().width);
    const { count, showMore } = calculateDisplayCapacity({ widthList, maxRowCount, containerWidth, moreWidth });

    setDisplayList(
      beforeDisplay
        ? beforeDisplay({
            entries,
            capacity: count,
            showMore: shouldDisplayMore,
            data
          })
        : entries.slice(0, count)
    );
    setShouldDisplayMore(showMore);
  };

  useEffect(() => {
    const containerDomElement = containerRef && containerRef.current;
    if (widthList.length && containerDomElement) {
      calculateAndUpdateDisplayParams({ widthList, containerDomElement, moreWidth });
    }
  }, [widthList, entries]);

  return (
    <>
      <div ref={containerRef} className={classNames(style.nRowListDynamicSize, classes && classes.container)}>
        {displayList.map((item, index) => (
          <Item
            key={item.id || index}
            id={`item-${item.id || index}`}
            item={item}
            data={data}
            template={ContentTemplate}
            className={classes && classes.item}
            onDimentionSet={(data) => setWidthList((prevList) => prevList.concat(data))}
          />
        ))}
        {MoreTemplate ? (
          <MoreTemplate />
        ) : (
          <div
            className={classNames(
              style.moreButton,
              style.moreSize,
              classes && classes.moreButton,
              shouldDisplayMore || style.noDisplay
            )}
            onClick={() => onMoreClick && onMoreClick()}
          >
            <div className={style.content}>⋯</div>
          </div>
        )}
      </div>
    </>
  );
};
NRowListDynamicSize.defaultProps = {
  data: {},
  moreWidth: 40
};

export default NRowListDynamicSize;
