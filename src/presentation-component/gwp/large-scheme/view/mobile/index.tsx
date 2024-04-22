import classNames from 'classnames';
import { generatePath } from 'react-router-dom';
import SubmitButton from 'presentation-component/ui/submit-button';
import AdLink from 'presentation-component/ui/ad-link';
import ShowMoreInline from 'presentation-component/ui/show-more-inline';
import Coupon from 'presentation-component/ui/coupon';
import CountdownClock from 'components/countdown/clock';
import { getConditionalMessage } from 'utils/gwp';
import { ROUTING_GWP_DETAIL } from 'routings/path';
import * as VARIABLE from 'style/variable';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const View = ({
  scheme,
  descriptionText,
  countdown,
  shouldShowCountdown,
  countdownText,
  classes,
  themeColor,
  isExpired,
  onClick,
  onCopy
}: ViewProps) => {
  const conditionalMessage = getConditionalMessage(scheme);

  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${scheme.banner?.url})` }}
        onClick={() => onClick?.(scheme)}
      />
      {!!shouldShowCountdown && (
        <div className={styles.countdownSection} onClick={() => onClick?.(scheme)}>
          <div className={styles.countdownTitle}>{countdownText}</div>
          <CountdownClock
            size="normal"
            classes={{ container: styles.countdown, segment: styles.segment }}
            {...countdown}
          />
        </div>
      )}
      {!!scheme.name && (
        <div className={classNames(styles.title, 'lineClamp2')} onClick={() => onClick?.(scheme)}>
          {scheme.name}
        </div>
      )}
      <div className={styles.info}>{conditionalMessage}</div>
      {!!descriptionText && (
        <ShowMoreInline
          {...{
            text: descriptionText,
            lineCount: 3,
            lineHeight: 20,
            classes: { container: styles.description },
            backgroundColorHex: themeColor,
            onClick: () => onClick?.(scheme)
          }}
        />
      )}
      {!!scheme.discount_code?.code && (
        <Coupon
          code={scheme.discount_code.code}
          color={VARIABLE.colorF5}
          classes={{ container: styles.couponSection }}
          onCopy={onCopy}
        />
      )}
      <AdLink
        to={generatePath(ROUTING_GWP_DETAIL, { gwpSlug: scheme.slug })}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SubmitButton
          {...{
            title: scheme?.is_pre_order ? 'Mua ngay lấy quà' : 'Chọn deal lấy quà',
            icon: { name: 'cart', position: 'left' },
            color: 'pink',
            classes: { container: styles.button },
            disabled: isExpired
          }}
        />
      </AdLink>
    </div>
  );
};

export default View;
