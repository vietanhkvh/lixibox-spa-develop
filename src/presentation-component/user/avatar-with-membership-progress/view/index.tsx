import { Fragment } from 'react';
import classNames from 'classnames';
import { MEMBERSHIP_LEVEL_TYPE } from 'constants/application/membership_level';
import { isMobileVersion } from 'utils/responsive';
import { IMAGE_SUPPORTED_MIME_TYPES } from 'constants/application/file';
import LoadingOverlay from 'presentation-component/ui/loading-overlay';
import SvgIcon from 'presentation-component/ui/icon';
import { ViewProps } from '../component';
import styles from './style.module.scss';

const items = [
  {
    percent: 1,
    itemStyle: { clipPath: 'polygon(50% 50%, 50% 0, 100% 0)' },
    innerStyle: { opacity: 1 }
  },
  {
    percent: 0.875,
    itemStyle: { clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' },
    innerStyle: { opacity: 0.9 }
  },
  {
    percent: 0.75,
    itemStyle: { clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%)' },
    innerStyle: { opacity: 0.8 }
  },
  {
    percent: 0.625,
    itemStyle: { clipPath: 'polygon(50% 50%, 100% 100%, 50% 100%)' },
    innerStyle: { opacity: 0.7 }
  },
  {
    percent: 0.5,
    itemStyle: { clipPath: 'polygon(50% 50%, 50% 100%, 0 100%)' },
    innerStyle: { opacity: 0.6 }
  },
  {
    percent: 0.375,
    itemStyle: { clipPath: 'polygon(50% 50%, 0 100%, 0 50%)' },
    innerStyle: { opacity: 0.5 }
  },
  {
    percent: 0.25,
    itemStyle: { clipPath: 'polygon(50% 50%, 0 50%, 0 0)' },
    innerStyle: { opacity: 0.4 }
  },
  {
    percent: 0,
    itemStyle: { clipPath: 'polygon(50% 50%, 0 0, 50% 0)' },
    innerStyle: { opacity: 0.3 }
  }
];

const LoyaltyProgress = ({ userInfo }) => {
  if (!userInfo) return null;
  const currentLevelBackground = MEMBERSHIP_LEVEL_TYPE[userInfo.membership_level === 3 ? 3 : 0].loyalyColor;

  return (
    <div className={styles.loyaltyProgress} style={{ background: currentLevelBackground }}>
      {items.map((item, index) => {
        const currentLevel = userInfo ? userInfo.membership_level : 0;
        if (currentLevel === 0 || currentLevel === 3) return null;

        const nextLevel = currentLevel + 1;
        if (!MEMBERSHIP_LEVEL_TYPE[nextLevel] || !MEMBERSHIP_LEVEL_TYPE[currentLevel]) return null;

        const background = MEMBERSHIP_LEVEL_TYPE[currentLevel].loyalyColor;
        const currentStepPoint = MEMBERSHIP_LEVEL_TYPE[currentLevel].point;
        const nextStepPoint = MEMBERSHIP_LEVEL_TYPE[nextLevel].point;
        const isDisplay =
          index === 7 ||
          (userInfo.earned_coins - currentStepPoint) / (nextStepPoint - currentStepPoint) >= item.percent;

        if (!isDisplay) return null;

        return (
          <div key={`lp-${index}`} className={styles.loyaltyProgressItem} style={item.itemStyle}>
            <div
              key={`lpi-${index}`}
              className={styles.loyaltyProgressItemInner}
              style={Object.assign({}, item.innerStyle, { background })}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

const View = ({ user, imagePreviewUrl, isChangingAvatar, onImageUpload, classes, isSmallView }: ViewProps) => {
  return (
    <Fragment>
      <div className={classNames(styles.avatarWrapper, classes?.container)}>
        <LoyaltyProgress userInfo={user} />
        <div className={styles.avatarSplitter} style={{ transform: 'rotate(0deg)' }} />
        <div className={styles.avatarSplitter} style={{ transform: 'rotate(45deg)' }} />
        <div className={styles.avatarSplitter} style={{ transform: 'rotate(90deg)' }} />
        <div className={styles.avatarSplitter} style={{ transform: 'rotate(135deg)' }} />
        <label
          {...{
            className: classNames(styles.avatar, isSmallView && styles.avatarSmallView),
            style: { backgroundImage: `url(${imagePreviewUrl})` },
            htmlFor: isChangingAvatar ? '' : 'user-avatar'
          }}
        ></label>
        {!isMobileVersion() && (
          <label className={styles.avatarOverlay} htmlFor={isChangingAvatar ? '' : 'user-avatar'}>
            <SvgIcon name="camera" className={styles.avatarEditIcon} />
          </label>
        )}
        {!!isChangingAvatar && <LoadingOverlay className={styles.avatarLoader} />}
      </div>
      <input
        {...{
          type: 'file',
          id: 'user-avatar',
          autoComplete: 'off',
          accept: IMAGE_SUPPORTED_MIME_TYPES.join(','),
          className: styles.displayNone,
          onChange: onImageUpload
        }}
      />
    </Fragment>
  );
};

export default View;
