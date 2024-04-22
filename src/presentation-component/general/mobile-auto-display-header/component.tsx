import { useState } from 'react';
import classnames from 'classnames';

import { isShowDownloadAppBar } from '../../../utils/generic';

import styles from './style.module.css';
import { IMobileAutoDisplayHeaderProps } from './model';

const MobileAutoDisplayHeader = (props: IMobileAutoDisplayHeaderProps) => {
  const {
    children,
    isDisableScroll = false,
    row = 1,
    fixHeight = 0,
    onSetDisplay = () => {},
    isRemoveTop = false,
    appStore
  } = props || {};

  const [isDisplay, setDisplay] = useState(true);
  const [isFreePosition, setFreePosition] = useState(true);

  let prev = window.scrollY;

  window.addEventListener(
    'scroll',
    (e) => {
      const autoDisplayHeader: any = document.getElementById('auto-display-header');
      if (!autoDisplayHeader) return;
      if ((isShowDownloadAppBar() ? 90 : 50) + window.scrollY >= autoDisplayHeader.offsetTop) {
        !!isFreePosition && setFreePosition(false);
      } else {
        !isFreePosition && setFreePosition(true);
      }

      if (prev > window.scrollY) {
        if (!isDisplay) {
          setDisplay(true);
          onSetDisplay(true);
        }
      } else if (
        prev < window.scrollY &&
        window.scrollY > autoDisplayHeader.offsetTop + (isShowDownloadAppBar() ? 190 : 150)
      ) {
        if (!!isDisplay) {
          setDisplay(false);
          onSetDisplay(false);
        }
      }
      prev = window.scrollY;
    },
    false
  );

  const isMobileAppWebview = (!!appStore && appStore?.mobileappWebviewStatus) || false;

  return (
    <div style={{ height: !!fixHeight ? fixHeight : row * 44 }} className={styles.container} id={'auto-display-header'}>
      <div
        className={classnames(
          styles.fixed,
          {
            [styles.isDisplay]: !!isDisplay || isDisableScroll,
            [styles.isFreePosition]: !!isFreePosition,
            [styles.withDownloadAppBar]: !isMobileAppWebview && !!isShowDownloadAppBar()
          },
          (isRemoveTop || isMobileAppWebview) && styles.removeTop
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileAutoDisplayHeader;
