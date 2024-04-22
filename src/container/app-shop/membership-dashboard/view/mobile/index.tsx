import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { TabState, ViewProps } from '../../component';
import UserInfo from 'components/user/user-info';
import { MemberBenefits } from 'constants/application/user';
import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from 'presentation-component/general/mobile-tab-header';
import AdLink from 'presentation-component/ui/ad-link';
import DashboardLink from 'presentation-component/ui/dashboard-link';
import Image from 'presentation-component/ui/image';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import MemberBenefit from 'presentation-component/user/member-benefit';
import { ROUTING_MEMBERSHIP_FAQ } from 'routings/path';

import styles from './style.module.scss';

const View = ({
  user,
  banners,
  isFetchingBanners,
  tabs,
  onTabSwitch,
  membershipInfo,
  isFetchingMembershipInfo,
  isAuthenticatedSession
}: ViewProps) => {
  const memberBenefitRef = useRef<HTMLDivElement>(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  useEffect(() => {
    if (isHighlighting) {
      setTimeout(() => setIsHighlighting(false), 2000);
    }
  }, [isHighlighting]);

  const userInfoProps = {
    userInfo: user,
    membershipInfo
  };

  return (
    <div className={styles.membershipDashboardContainer}>
      <MobileAutoDisplayHeader row={1}>
        <MobileTabHeader tabs={tabs} onSelect={(tab: TabState) => tab.id !== 'membership' && onTabSwitch?.(tab)} />
      </MobileAutoDisplayHeader>
      {isAuthenticatedSession && <UserInfo {...userInfoProps} />}
      <div className={styles.dashboardBody}>
        {isAuthenticatedSession && !user && (
          <>
            <LoadingPlaceholder className={styles.membershipInfoSkeleton} />
            <LoadingPlaceholder className={styles.membershipPreviewSkeleton} />
          </>
        )}
        <div className={classNames(styles.links, isAuthenticatedSession && styles.linksAuthenticatedView)}>
          <DashboardLink
            title="Hỏi đáp về Hạng thành viên"
            icon="message-multi"
            path={ROUTING_MEMBERSHIP_FAQ}
            classes={{ container: styles.link }}
          />
        </div>
        {!isFetchingMembershipInfo && !!membershipInfo ? (
          <div
            className={classNames(styles.benefitsSection, isHighlighting && styles.benefitsSectionHighlighted)}
            ref={memberBenefitRef}
          >
            <MemberBenefit membershipInfo={membershipInfo} benefitList={MemberBenefits} />
          </div>
        ) : (
          <LoadingPlaceholder className={styles.benefitsSectionSkeleton} />
        )}
        {isFetchingBanners ? (
          <LoadingPlaceholder className={styles.bannerSkeleton} />
        ) : !!banners?.length ? (
          banners.map(
            (banner) =>
              !!banner?.cover_image?.medium_url && (
                <AdLink to={banner?.links?.[0] || '#'}>
                  <Image src={banner.cover_image.medium_url} alt="lixicoin banner" className={styles.banner} />
                </AdLink>
              )
          )
        ) : null}
      </div>
    </div>
  );
};

export default View;
