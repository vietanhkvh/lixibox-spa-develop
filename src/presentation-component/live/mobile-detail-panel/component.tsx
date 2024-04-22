import { useState } from 'react';
import classnames from 'classnames';

import SvgIcon from '../../ui/icon';
import MobileTabHeader from '../../../presentation-component/general/mobile-tab-header';
import GeneralModal from '../../modal/general-modal';
import styles from './style.module.scss';

const VideoPanel = ({ video }) => {
  return <div className={styles.videoPanel}>{video}</div>;
};

const HighlightPanel = ({ highLightInfo, videoRatioType }) => {
  const [position, setPosition] = useState(0);

  let xDown: any = null;
  let yDown: any = null;

  const handleTouchStart = (e) => {
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!xDown || !yDown) return;

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) {
      handleswipeLeft();
    }

    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) {
      handleswipeRight();
    }

    xDown = null;
    yDown = null;

    if (Math.abs(xDiff) > 5) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  };

  const handleswipeLeft = () => {
    if (-1 === position) setPosition(0);
    if (0 === position) setPosition(1);
  };

  const handleswipeRight = () => {
    if (0 === position) setPosition(-1);
    if (1 === position) setPosition(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className={classnames(styles.highlightPanel, {
        [styles.isFloatPosition]: 'vertical' === videoRatioType,
        [styles.isGradientBackground]: 0 === position
      })}
      style={{ transform: `translate3d(${position * -100}%, 0, 0)` }}
    >
      <div className={styles.leftOffset}>
        {-1 === position && <SvgIcon name={'message-multi'} className={styles.offsetIcon} onClick={handleswipeLeft} />}
      </div>
      {highLightInfo}
      <div className={styles.rightOffset}>
        {1 === position && <SvgIcon name={'message-multi'} className={styles.offsetIcon} onClick={handleswipeRight} />}
      </div>
    </div>
  );
};

const TabPanel = ({ message, discountCode, product, isShowMobileTabModal, numberOfItem, handleSelectTabs }) => {
  const tabProps = {
    className: styles.mobileTabHeader,
    iconClassName: styles.iconMobileTabHeader,
    isEqually: false,
    tabs: [
      {
        id: 1,
        icon: 'message-multi',
        selected: 1 === isShowMobileTabModal * 1
      },
      numberOfItem.product > 0
        ? {
            id: 3,
            icon: 'cosmetics',
            selected: 3 === isShowMobileTabModal * 1
          }
        : undefined,
      numberOfItem.discountCode > 0
        ? {
            id: 2,
            icon: 'discount-code',
            selected: 2 === isShowMobileTabModal * 1
          }
        : undefined
    ],
    onSelect: handleSelectTabs
  };

  const closeIconProps = {
    name: 'close',
    className: styles.closeIcon,
    onClick: () => handleSelectTabs({ id: 0 })
  };

  return (
    <div className={styles.tabPanel}>
      <MobileTabHeader {...tabProps} />
      <SvgIcon {...closeIconProps} />
      {1 === isShowMobileTabModal * 1 ? message : null}
      {2 === isShowMobileTabModal * 1 ? discountCode : null}
      {3 === isShowMobileTabModal * 1 ? product : null}
    </div>
  );
};

const LiveMobileDetailPanel = ({
  video,
  videoRatioType,
  message,
  discountCode,
  product,
  highLightInfo,
  isShowMobileTabModal,
  onChangeMobileTabModal,
  numberOfItem
}) => {
  const modalProps = {
    isOpen: 0 !== isShowMobileTabModal,
    leftTitle: '',
    leftIcon: 'angle-left',
    rightIcon: 'close',
    fullHeight: true,
    className: styles.regionSelectorModal,
    isShowHeading: false,
    onRequestClose: () => {
      onChangeMobileTabModal(0);
    }
  };

  const tabPanelProps = {
    isShowMobileTabModal,
    discountCode,
    message,
    product,
    numberOfItem,
    handleSelectTabs: (tab) => onChangeMobileTabModal(tab.id)
  };

  return (
    <div className={classnames(styles.container)}>
      <VideoPanel {...{ video }} />
      <HighlightPanel {...{ highLightInfo, videoRatioType }} />
      <GeneralModal {...modalProps}>
        <TabPanel {...tabPanelProps} />
      </GeneralModal>
    </div>
  );
};

export default LiveMobileDetailPanel;
