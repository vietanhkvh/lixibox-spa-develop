import Loading from '../../../../../components/ui/loading';
import MobileAutoDisplayHeader from '../../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../../presentation-component/general/mobile-screen-header';
import MobileTabHeader from '../../../../../presentation-component/general/mobile-tab-header';
import ReferralStatistics from '../../../../../presentation-component/referral/referral-statistics';
import ReferralHistory from '../../../../../presentation-component/referral/referral-history';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import { generateBenefitMessagesFromRewardItems } from '../../util';
import { generateTestId } from 'utils/test-utils';
import { ViewProps } from '../../component';
import style from './style.module.scss';

const View = ({ isLoaded, statistics, referrals, tabs, onTabSelect }: ViewProps) => {
  return isLoaded ? (
    <div
      className={style.referralStatisticsAndHistory}
      {...generateTestId({ name: 'referral-statistics-and-history-container' })}
    >
      <MobileAutoDisplayHeader row={1}>
        <MobileScreenHeader title={'Lịch sử giới thiệu bạn bè'} />
      </MobileAutoDisplayHeader>
      <ReferralStatistics
        lixicoin={statistics.total_rewarded_coins}
        balance={statistics.total_rewarded_balance}
        classes={{ container: style.referralStatistics }}
      />
      <MobileTabHeader tabs={tabs} onSelect={onTabSelect} />
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
  ) : (
    <Loading />
  );
};

export default View;
