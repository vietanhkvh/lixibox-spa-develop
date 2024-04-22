import classnames from 'classnames';

import { TYPE_MESSAGE } from '../../utils/check-message-reminder';
import SvgIcon from '../../presentation-component/ui/icon';
import ButtonSubmit from '../ui/submit-button';

import styles from './style.module.scss';

const renderIcon = (icon: string) => (
  <div className={styles.iconWrap}>
    <div className={classnames(styles.round, styles.firstRound)}>
      <div className={classnames(styles.round, styles.secondRound)}>
        <div className={styles.thirdRound}>
          <SvgIcon name={icon} className={icon === 'color-birthday-gift' ? styles.iconGift : styles.iconPaper} />
        </div>
      </div>
    </div>
  </div>
);

const renderTitle = (title: Array<string>) => (
  <>
    {title?.length > 1 ? (
      <div className={styles.title}>
        {title?.map((item, index) => (
          <span key={index} className={classnames(index === 0 && styles.happyMessage)}>
            {item}{' '}
          </span>
        ))}
      </div>
    ) : (
      <div className={styles.title}>
        {title?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    )}
  </>
);

const renderButton = (message) => {
  const isMemberLevelMessage = !!message?.subDescription && message?.type === TYPE_MESSAGE.HAPPY_BIRTHDAY_MEMBER;
  return (
    <div className={styles.button}>
      {isMemberLevelMessage && (
        <div className={classnames(styles.subDescription, isMemberLevelMessage && styles.memberSubMessage)}>
          {message?.subDescription}
        </div>
      )}
      <ButtonSubmit
        color={'pink'}
        title={message?.buttonTitle}
        type={'force-link'}
        className={classnames(styles.submitBtn, isMemberLevelMessage && styles.memberBtn)}
        link={message?.buttonLink}
      />
      {!!message?.subDescription && message?.type === TYPE_MESSAGE.HAPPY_BIRTHDAY && (
        <div className={styles.subDescription}>{message?.subDescription}</div>
      )}
    </div>
  );
};

const renderView = (message) => {
  return (
    message?.type !== TYPE_MESSAGE.EMPTY_MESSAGE && (
      <div className={styles.boxMessage}>
        <div className={styles.panelColor}> {renderIcon(message?.icon)}</div>
        <div className={styles.message}>
          {renderTitle(message?.title)}
          <div className={styles.description}>{message?.description}</div>
        </div>
        {renderButton(message)}
      </div>
    )
  );
};

export default renderView;
