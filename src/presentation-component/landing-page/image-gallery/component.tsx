import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';

import ImageWithContent from '../image-with-content';

import { defaultDataList } from './initialize';
import styles from './style.module.scss';

const DEVICE_PREFIX = isMobileVersion() ? '' : 'desktop-';

function Item(item, index) {
  const itemProps = {
    key: item.id || index,
    className: classnames(styles.item, {
      [styles[`itemPadding-${this.itemPadding}`]]: !!this.itemPadding,
      [styles[`column-${this.column}`]]: !!this.column,
      [styles[`mobile-column-${this.mobileColumn}`]]: !!isMobileVersion()
    })
  };

  return (
    <div {...itemProps}>
      <ImageWithContent {...item} isNoPadding={true} />
    </div>
  );
}

interface IProps {
  size?: 'large' | 'medium' | 'small';
  list?: Array<any>;
  column?: number;
  mobileColumn?: number;
  itemPadding?: 'large' | 'medium' | 'small';
}

const LandingPageImageGallery = ({
  size = 'medium',
  column = 4,
  mobileColumn = 2,
  list = defaultDataList,
  itemPadding = 'medium'
}: IProps) => {
  const containerProps = {
    className: classnames(
      styles.container,
      { [styles[`size-${size}`]]: !!size },
      { [styles[`container-${DEVICE_PREFIX}`]]: !!true }
    )
  };

  return (
    <div {...containerProps}>
      {!!list && list.map(Item, { column, mobileColumn, itemPadding })}
      {''}
    </div>
  );
};

export default LandingPageImageGallery;
