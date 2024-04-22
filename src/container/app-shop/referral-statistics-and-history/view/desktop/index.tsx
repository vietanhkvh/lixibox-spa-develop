import Loading from '../../../../../components/ui/loading';
import MobileTabHeader from '../../../../../presentation-component/general/mobile-tab-header';
import ReferralStatistics from '../../../../../presentation-component/referral/referral-statistics';
import ReferralHistory from '../../../../../presentation-component/referral/referral-history';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import { ViewProps } from '../../component';
import { generateBenefitMessagesFromRewardItems } from '../../util';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

const View = ({ isLoaded, statistics, referrals, tabs, onTabSelect }: ViewProps) => {
  return isLoaded ? (
    <div
      className={style.referralStatisticsAndHistory}
      {...generateTestId({ name: 'referral-statistics-and-history-container' })}
    >
      <div className={style.statisticsSection}>
        <div className={style.title}>Lịch sử giới thiệu bạn bè</div>
        <ReferralStatistics
          lixicoin={statistics.total_rewarded_coins}
          balance={statistics.total_rewarded_balance}
          classes={{ container: style.referralStatistics }}
        />
      </div>
      <div className={style.historySection}>
        <MobileTabHeader tabs={tabs} onSelect={onTabSelect} className={style.tabSection} />
        {!!referrals.length ? (
          <div className={style.referralHistories}>
            {referrals.map((referral, index) => (
              <ReferralHistory
                {...{
                  key: index,
                  title: referral.scheme && referral.scheme.name,
                  referee: referral.referee && referral.referee.name,
                  time: new Date(referral.created_at * 1000),
                  benefits:
                    (referral.reward_items && generateBenefitMessagesFromRewardItems(referral.reward_items)) || [],
                  classes: { container: style.referralHistory }
                }}
              />
            ))}
          </div>
        ) : (
          <NoContentPlaceholder
            title="Bạn chưa giới thiệu bạn bè nào"
            info="Hãy giới thiệu bạn bè ngay để nhận ngay ưu đãi"
            logo={NO_CONTENT_LOGO.SHIPMENT}
            className={style.placeholder}
          />
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default View;
