import classNames from 'classnames';
import { getFormattedTime } from 'utils/time';
import { generateTestId } from 'utils/test-utils';
import { ReferralHistoryProps } from '../..';
import style from './style.module.scss';

const View = ({ referee, time, title, benefits, classes }: ReferralHistoryProps) => {
  return (
    <div
      className={classNames(style.referralHistory, classes && classes.container)}
      {...generateTestId({ name: 'referral-history', id: title })}
    >
      <div className={style.leftSection}>
        <div className={style.title}>Bạn bè</div>
        <div className={style.name}>{referee}</div>
        <div className={style.time}>{getFormattedTime(time)}</div>
        <div className={style.date}>{time.toLocaleDateString('vi-VN')}</div>
      </div>
      <div className={style.rightSection}>
        <div className={style.benefitSummary}>{title}</div>
        {!!benefits.length && <div className={style.benefitTitle}>Bạn được tặng:</div>}
        {benefits.map((benefit, index) => (
          <div key={index} className={style.benefit}>
            + {benefit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
