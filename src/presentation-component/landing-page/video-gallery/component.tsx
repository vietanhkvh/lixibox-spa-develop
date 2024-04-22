/* eslint react-hooks/rules-of-hooks: 0 */
// TODO: Refactor component and enable eslint rule

import classnames from 'classnames';
import { useState } from 'react';

import Image from 'presentation-component/ui/image';
import Video from '../video';
import { isMobileVersion } from '../../../utils/responsive';

import { defaultDataList } from './initialize';
import styles from './style.module.scss';

const DEVICE_PREFIX = isMobileVersion() ? '' : 'desktop-';

function Item(item, index) {
  if (index >= 5) return null;

  const containerProps = {
    className: classnames(styles.item, {
      [styles[`${DEVICE_PREFIX}item`]]: true,
      [styles.selected]: this.selectedItem && this.selectedItem.index === index
    }),
    onClick: () => this.onSelect && this.onSelect(item, index)
  };

  return (
    <div {...containerProps} key={index}>
      <div className={styles.imageWrap}>
        <Image src={item.thumbnailImage} />
      </div>
      {!isMobileVersion() && <div className={styles.title}>{item.title}</div>}
    </div>
  );
}

interface IProps {
  size?: 'large' | 'medium' | 'small';
  list?: Array<any>;
}

const LandingPageVideoGallery = ({ size = 'medium', list = defaultDataList }: IProps) => {
  if (!list || !list.length) return null;

  const [selectedItem, setSelectedItem] = useState(Object.assign({}, list[0], { index: 0 }));

  return (
    <div className={styles.container}>
      <Video {...selectedItem} />
      {list && list.length > 1 && (
        <div
          className={classnames(styles.list, {
            [styles[`${DEVICE_PREFIX}item`]]: true
          })}
        >
          {list.map(Item, {
            onSelect: (item, index) => setSelectedItem(Object.assign({}, item, { index })),
            selectedItem
          })}
        </div>
      )}
    </div>
  );
};

export default LandingPageVideoGallery;
