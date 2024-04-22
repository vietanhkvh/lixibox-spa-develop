import { useState } from 'react';

import DiscountBlock from '../../../components/ui/discount-block';
import { isMobileVersion } from '../../../utils/responsive';

import STYLE from './style';
import styles from './style.module.scss';

function renderDiscountCodeItem(item, $index) {
  const discountBlockProps = {
    key: $index,
    onClick: () => this.onClick(item),
    style: STYLE.discountCountCodeList.item,
    innerStyle: STYLE.discountCountCodeList.innerItem
  };

  return (
    <DiscountBlock {...discountBlockProps}>
      <div style={STYLE.discountCountCodeList.code}>{item.code}</div>
      <div className={styles.disountCodeItemDescription} style={STYLE.discountCountCodeList.description}>
        {item.description}
      </div>
    </DiscountBlock>
  );
}

const ViewDiscountCode = ({ list, bannerImage, color, handleClickDiscountCode }) => {
  const [position, setPosition] = useState(0);

  if (!list || !list.length) return null;

  isMobileVersion() &&
    setTimeout(() => {
      if (position < list.length - 1) {
        setPosition(position + 1);
      } else {
        setPosition(0);
      }
    }, 5000);

  const containerProps = {
    style: Object.assign({}, STYLE.discountCountCodeList.list, {
      transform: `translate3D(0, ${position * -78}px, 0)`
    })
  };

  const panelProps = { style: STYLE.discountCountCodeList.panel };

  return (
    <div {...panelProps}>
      <div {...containerProps}>
        {!!list &&
          Array.isArray(list) &&
          list.map(renderDiscountCodeItem, { bannerImage, color, onClick: handleClickDiscountCode })}
      </div>
    </div>
  );
};

export default ViewDiscountCode;
