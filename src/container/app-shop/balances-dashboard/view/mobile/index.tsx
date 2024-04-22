import { useState } from 'react';
import classNames from 'classnames';

import { TabState, ViewProps } from '../../component';
import BalancePreviewItem, { BalancePreviewViewType } from '../../sub-components/balance-preview-item';
import UserInfo from 'components/user/user-info';
import { CollapsibleTemplateCashbackFaq } from 'constants/application/faq';
import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from 'presentation-component/general/mobile-tab-header';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import ItemVerticalList from 'presentation-component/item-list-hoc/item-vertical-list/component';
import GeneralModal from 'presentation-component/modal/general-modal/component';
import ProductItem from 'presentation-component/product/product-item';
import AdLink from 'presentation-component/ui/ad-link';
import CollapsibleList from 'presentation-component/ui/collapsible-list';
import DashboardLink from 'presentation-component/ui/dashboard-link';
import Image from 'presentation-component/ui/image';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import Pagination from 'presentation-component/ui/pagination';
import CashbackInstruction from 'presentation-component/user/cashback-instruction';
import { ROUTING_BALANCE, ROUTING_USER_TRANSACTIONS_BALANCE } from 'routings/path';

import styles from './style.module.scss';

const View = ({
  user,
  mainBanner,
  tabs,
  onTabSwitch,
  boxes,
  isBoxesLoading,
  isBoxesLoadingFailed,
  isBannerFetching,
  pagination,
  membershipLevels,
  isAuthenticatedSession
}: ViewProps) => {
  const [infoModalVisibility, setInfoModalVisibility] = useState(false);
  const [faqModalVisibility, setFaqModalVisibility] = useState(false);

  const userInfoProps = {
    userInfo: user,
    isDisplayStatSection: false,
    membershipInfo: membershipLevels
  };

  return (
    <div className={styles.balancesDashboardContainer}>
      <MobileAutoDisplayHeader row={1}>
        <MobileTabHeader tabs={tabs} onSelect={(tab: TabState) => tab.id !== 'balance' && onTabSwitch?.(tab)} />
      </MobileAutoDisplayHeader>
      {isAuthenticatedSession && <UserInfo {...userInfoProps} />}
      <div className={styles.dashboardBody}>
        {isAuthenticatedSession &&
          (user ? (
            <>
              <div className={styles.balancesPreview}>
                <BalancePreviewItem
                  type={BalancePreviewViewType.CONFIRMED}
                  value={user?.balance || 0}
                  expirableValue={user?.cashback?.balance_confirmed || 0}
                  expiryDate={user?.cashback?.balance_expiry || 0}
                  classes={{ container: styles.balancePreviewItem }}
                />
                <hr className={styles.separator} />
                <BalancePreviewItem
                  type={BalancePreviewViewType.PENDING}
                  value={user?.cashback?.balance_pending || 0}
                  classes={{ container: styles.balancePreviewItem }}
                />
              </div>
            </>
          ) : (
            <>
              <LoadingPlaceholder className={styles.membershipInfoSkeleton} />
              <LoadingPlaceholder className={styles.balancesPreviewSkeleton} />
            </>
          ))}
        <div className={classNames(styles.links, isAuthenticatedSession && styles.linksAuthenticatedView)}>
          <DashboardLink
            title="Lịch sử hoàn tiền"
            icon="history"
            path={ROUTING_USER_TRANSACTIONS_BALANCE}
            classes={{ container: styles.link }}
          />
          <DashboardLink
            title="Hướng dẫn tích lũy hoàn tiền"
            icon="dollar-time"
            onClick={() => setInfoModalVisibility(true)}
            classes={{ container: styles.link }}
          />
          <DashboardLink
            title="Hỏi đáp về chương trình hoàn tiền"
            icon="message-multi"
            onClick={() => setFaqModalVisibility(true)}
            classes={{ container: styles.link }}
          />
        </div>
        {isBannerFetching ? (
          <LoadingPlaceholder className={styles.bannerSkeleton} />
        ) : !!mainBanner?.cover_image?.medium_url ? (
          <AdLink to={mainBanner?.links?.[0] || ROUTING_BALANCE}>
            <Image src={mainBanner.cover_image.medium_url} alt="cashback main banner" className={styles.banner} />
          </AdLink>
        ) : null}
        {!!isBoxesLoading ? (
          <div className={styles.skeletons}>
            {Array.from({ length: 10 }).map((_, index) => (
              <LoadingPlaceholder key={index} className={styles.skeleton} />
            ))}
          </div>
        ) : !!isBoxesLoadingFailed ? (
          <NoContentPlaceholder
            title="Đã có lỗi xảy ra"
            info="Mã giới thiệu bị lỗi"
            logo={NO_CONTENT_LOGO.ROBOT}
            classes={{ container: styles.placeholder, logo: styles.logo }}
          />
        ) : !boxes?.length ? null : (
          <>
            <ItemVerticalList title="Sản phẩm nhiều ưu đãi hoàn tiền" column={2} className={styles.boxesSection}>
              {boxes.map((box) => (
                <ProductItem key={box.id} product={box} isFullPadding />
              ))}
            </ItemVerticalList>
            {pagination?.totalPages && pagination?.totalPages > 1 && (
              <Pagination {...pagination} classes={{ container: styles.paginationSection }} />
            )}
          </>
        )}
      </div>
      <GeneralModal
        isOpen={infoModalVisibility}
        title={'Hướng dẫn tích lũy hoàn tiền'}
        leftTitle=""
        rightIcon={'close'}
        className={styles.infoModal}
        onRightActionClick={() => setInfoModalVisibility(false)}
        onRequestClose={() => setInfoModalVisibility(false)}
      >
        <div className={styles.infoModalBody}>
          <CashbackInstruction classes={{ container: styles.cashbackInstruction }} />
        </div>
      </GeneralModal>
      <GeneralModal
        isOpen={faqModalVisibility}
        title={'Hỏi đáp về chương trình hoàn tiền'}
        leftTitle=""
        rightIcon={'close'}
        className={styles.infoModal}
        onRightActionClick={() => setFaqModalVisibility(false)}
        onRequestClose={() => setFaqModalVisibility(false)}
      >
        <div className={styles.faqModalBody}>
          <CollapsibleList<{ membershipLevels: typeof membershipLevels }>
            list={CollapsibleTemplateCashbackFaq}
            additionalAttributes={{ membershipLevels }}
            classes={{ container: styles.collapsibleList }}
          />
        </div>
      </GeneralModal>
    </div>
  );
};

export default View;
