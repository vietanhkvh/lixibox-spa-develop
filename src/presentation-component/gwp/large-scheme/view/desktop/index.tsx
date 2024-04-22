import { NavLink, generatePath } from 'react-router-dom';
import classNames from 'classnames';
import SubmitButton from 'presentation-component/ui/submit-button';
import AdLink from 'presentation-component/ui/ad-link';
import ShowMoreInline from 'presentation-component/ui/show-more-inline';
import CountdownClock from 'components/countdown/clock';
import Coupon from 'presentation-component/ui/coupon';
import { getConditionalMessage } from 'utils/gwp';
import { ROUTING_GWP_DETAIL } from 'routings/path';
import * as VARIABLE from 'style/variable';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const View = ({
  scheme,
  link,
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
      <div className={styles.topSection}>
        <div className={styles.topLeftSection}>
          <div
            className={styles.banner}
            onClick={() => onClick?.(scheme)}
            style={{ backgroundImage: `url(${scheme.banner?.url})` }}
          />
        </div>
        <div className={styles.topRightSection}>
          {!!scheme.name && (
            <NavLink to={link} className={classNames(styles.title, 'lineClamp2')}>
              {scheme.name}
            </NavLink>
          )}
          <NavLink to={link} className={styles.info}>
            {conditionalMessage}
          </NavLink>
          {!!descriptionText && (
            <ShowMoreInline
              {...{
                text: descriptionText,
                lineCount: 4,
                lineHeight: 23,
                classes: { container: styles.description },
                backgroundColorHex: themeColor,
                onClick: () => onClick?.(scheme)
              }}
            />
          )}
          {!!shouldShowCountdown && (
            <NavLink to={link} className={styles.countdownSection}>
              <div className={styles.countdownTitle}>{countdownText}:</div>
              <CountdownClock
                size="normal"
                classes={{
                  container: styles.countdown,
                  segment: styles.segment,
                  segmentValue: styles.segmentValue,
                  segmentName: styles.segmentName
                }}
                {...countdown}
              />
            </NavLink>
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
      </div>
    </div>
  );
};

export default View;
