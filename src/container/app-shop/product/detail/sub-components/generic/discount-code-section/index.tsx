import { MouseEventHandler } from 'react';
import { useState } from 'react';
import classNames from 'classnames';

import DiscountBlock from 'components/ui/discount-block';
import { isMobileVersion } from 'utils/responsive';

import STYLE from './style';
import styles from './style.module.scss';

const DiscountCodeItem = ({ item, onClick }: { item: any; onClick: any }) => (
  <DiscountBlock
    {...{
      onClick: () => onClick(item),
      style: STYLE.discountCountCodeList.item,
      innerStyle: STYLE.discountCountCodeList.innerItem
    }}
  >
    <div style={STYLE.discountCountCodeList.code}>{item.code}</div>
    <div className={styles.disountCodeItemDescription} style={STYLE.discountCountCodeList.description}>
      {item.description}
    </div>
  </DiscountBlock>
);

interface DiscountCodeSectionProps {
  list: Array<any>;
  classes?: { container?: string };
  onDiscountCodeClick: MouseEventHandler<HTMLElement>;
}
const DiscountCodeSection = ({ list, classes, onDiscountCodeClick }: DiscountCodeSectionProps) => {
  const [position, setPosition] = useState(0);
  setTimeout(() => {
    if (position < list.length - 1) {
      setPosition(position + 1);
    } else {
      setPosition(0);
    }
  }, 5000);

  return (
    <div className={classNames(styles.container, isMobileVersion() && styles.containerMobile, classes?.container)}>
      <div
        {...{
          className: styles.list,
          style: { transform: `translate3D(0, ${position * -78}px, 0)` }
        }}
      >
        {Array.isArray(list) &&
          list.map((item, index) => <DiscountCodeItem {...{ key: index, item, onClick: onDiscountCodeClick }} />)}
      </div>
    </div>
  );
};

export default DiscountCodeSection;
