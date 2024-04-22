import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { TabState, ViewProps } from '../../component';
import UserInfo from 'components/user/user-info';
import { MemberBenefits } from 'constants/application/user';
import SplitLayout from 'container/layout/split/container';
import WrapLayout from 'container/layout/wrap/container';
import MobileTabHeader from 'presentation-component/general/mobile-tab-header/component';
import AdLink from 'presentation-component/ui/ad-link';
import Image from 'presentation-component/ui/image';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import FaqLink from 'presentation-component/user/faq-link';
import MemberBenefit from 'presentation-component/user/member-benefit';
import UserMembershipGuest from 'presentation-component/user/user-membership-guest';
import { ROUTING_MEMBERSHIP_FAQ } from 'routings/path';

import styles from './style.module.scss';

const View = ({
  user,
  tabs,
  onTabSwitch,
  banners,
  isFetchingBanners,
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
    <div className={styles.container}>
      <WrapLayout>
        <SplitLayout
          size="larger"
          subContainer={
            <div className={styles.sidebarSection}>
              {isAuthenticatedSession && <UserInfo {...userInfoProps} />}

              {!isAuthenticatedSession ? (
                <UserMembershipGuest
                  info="Đăng ký tài khoản để tham gia chương trình thành viên với nhiều quyền lợi và ưu đãi"
                  classes={{ container: styles.membershipInfo }}
                />
              ) : (
                !user && (
                  <>
                    <LoadingPlaceholder className={styles.membershipInfoSkeleton} />
                    <LoadingPlaceholder className={styles.lixicoinPreviewSkeleton} />
                  </>
                )
              )}
            </div>
          }
          mainContainer={
            <div className={styles.mainBlockSection}>
              <MobileTabHeader
                tabs={tabs}
                onSelect={(tab: TabState) => tab.id !== 'membership' && onTabSwitch?.(tab)}
              />
              <div className={styles.bodySection}>
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
                      !!banner?.cover_image?.large_url && (
                        <AdLink to={banner?.links?.[0] || '#'}>
                          <Image src={banner.cover_image.large_url} alt="lixicoin banner" className={styles.banner} />
                        </AdLink>
                      )
                  )
                ) : null}
              </div>
              <div className={styles.faqSection}>
                <FaqLink
                  title="Hỏi đáp về Hạng thành viên"
                  info="Hãy tìm hiểu thêm thông tin về hạng thành viên tại mục hỏi đáp"
                  to={ROUTING_MEMBERSHIP_FAQ}
                />
              </div>
            </div>
          }
        />
      </WrapLayout>
    </div>
  );
};

export default View;
