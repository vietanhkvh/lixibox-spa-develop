import classNames from 'classnames';

import { formatCurrency } from '../../../../../utils/currency';
import SvgIcon from '../../../../../presentation-component/ui/icon';
import { generateTestId } from 'utils/test-utils';
import { ReferralStatisticsProps } from '../..';
import style from './style.module.scss';

interface MetricProps {
  name: string;
  value: string | number;
  icon: string;
  classes?: { container?: string };
}
const Metric = ({ name, value, icon, classes }: MetricProps) => (
  <div className={classNames(style.metric, classes && classes.container)}>
    <div className={style.iconWrapper}>
      <SvgIcon name={icon} className={style.icon} />
    </div>
    <div className={style.info}>
      <div className={style.value}>{value}</div>
      <div className={style.name}>{name}</div>
    </div>
  </div>
);

const View = ({ lixicoin, balance, classes }: ReferralStatisticsProps) => {
  return (
    <div
      className={classNames(style.referralStatistics, classes && classes.container)}
      {...generateTestId({ name: 'referral-statistics' })}
    >
      <div className={style.header}>Bạn nhận được tổng cộng</div>
      <div className={style.statistics}>
        <Metric name={'Lixicoin'} value={formatCurrency(lixicoin)} icon={'dollar'} />
        <div className={style.divider} />
        <Metric name={'Số dư'} value={formatCurrency(balance, { suffix: true })} icon={'wallet'} />
      </div>
    </div>
  );
};

export default View;
