import { useState } from 'react';
import classnames from 'classnames';

import SvgIcon from '../../ui/icon';
import styles from './style.module.scss';

const generateMessageStyle = ({ isCollaped, numberOfItem }) => {
  const discountCodeAndProductNumberOfItem = numberOfItem.discountCode + numberOfItem.product;

  return !isCollaped
    ? {
        maxHeight: `calc(100%${!!numberOfItem.discountCode ? ' - 150px' : ''}${
          !!numberOfItem.product ? ' - 150px' : ''
        })`
      }
    : !!discountCodeAndProductNumberOfItem
    ? { maxHeight: `calc(100% - 50px)` }
    : {};
};

const generateInfoStyle = ({ isCollaped, numberOfItem }) => {
  return !isCollaped
    ? {
        minHeight: `calc(0${!!numberOfItem.discountCode ? ' + 150px' : ''}${!!numberOfItem.product ? ' + 150px' : ''})`,
        maxHeight: `calc(0${!!numberOfItem.discountCode ? ' + 150px' : ''}${!!numberOfItem.product ? ' + 150px' : ''})`
      }
    : {
        minHeight: 50,
        maxHeight: 50
      };
};

const CollapseAction = ({ numberOfItem, onClick, isCollaped }) => {
  const discountCodeAndProductNumberOfItem = numberOfItem.discountCode + numberOfItem.product;
  if (0 === discountCodeAndProductNumberOfItem) return null;

  const collapseIconProps = {
    name: 'angle-down',
    className: styles.collapseIcon,
    onClick: () => onClick(!isCollaped)
  };

  const title = `
    ${!!numberOfItem.discountCode ? 'Mã giảm giá' : ''}
    ${!!numberOfItem.discountCode && !!numberOfItem.product ? ' - ' : ''}
    ${!!numberOfItem.product ? 'Sản phẩm khuyến mãi' : ''}
  `;

  return (
    <>
      <SvgIcon {...collapseIconProps} />
      <div className={styles.collapseText} onClick={() => onClick(false)}>
        {title}
      </div>
    </>
  );
};

const VideoPanel = ({ video }) => <div className={styles.videoPanel}>{video}</div>;

const ContentPanel = ({ message, discountCode, product, numberOfItem }) => {
  const [isCollaped, setCollapse] = useState(true);

  const contentPanelProps = {
    className: classnames(styles.contentPanel, {
      [styles.isCollapsed]: !!isCollaped
    })
  };

  const messageProps = {
    className: styles.message,
    style: generateMessageStyle({ isCollaped, numberOfItem })
  };

  const infoProps = {
    className: styles.info,
    style: generateInfoStyle({ isCollaped, numberOfItem })
  };

  const isShowInfoActionGroup = !!numberOfItem.discountCode || !!numberOfItem.product;

  return (
    <div {...contentPanelProps}>
      <div {...messageProps}>{message}</div>
      {!!isShowInfoActionGroup && (
        <div {...infoProps}>
          <CollapseAction {...{ numberOfItem, isCollaped }} onClick={setCollapse} />

          {!!numberOfItem.discountCode && <div className={styles.discountCode}>{discountCode}</div>}
          {!!numberOfItem.product && <div className={styles.product}>{product}</div>}
        </div>
      )}
    </div>
  );
};

const FullScreenButton = ({ isFullScreen, onClick }) => {
  const name = isFullScreen ? 'minimize' : 'maximize';
  const body = document.body;
  const handleOnClick = () => {
    !!body && body.classList[!!isFullScreen ? 'remove' : 'add']('full-body');
    onClick();
  };

  return <SvgIcon name={name} onClick={handleOnClick} className={styles.fullScreenButton} />;
};

const LiveDesktopDetailPanel = ({ video, message, discountCode, product, numberOfItem }) => {
  const [isFullScreen, setFullScreen] = useState(false);

  const containerProps = {
    className: classnames(styles.container, {
      [styles.isFullScreen]: !!isFullScreen
    })
  };

  return (
    <div {...containerProps}>
      <FullScreenButton {...{ isFullScreen }} onClick={() => setFullScreen(!isFullScreen)} />
      <VideoPanel {...{ video }} />
      <ContentPanel {...{ message, discountCode, product, numberOfItem }} />
    </div>
  );
};

export default LiveDesktopDetailPanel;
