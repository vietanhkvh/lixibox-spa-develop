import { TabState, ViewProps } from '../../component';
import BalancePreviewItem, { BalancePreviewViewType } from '../../sub-components/balance-preview-item';
import UserInfo from 'components/user/user-info';
import { CollapsibleTemplateCashbackFaq } from 'constants/application/faq';
import SplitLayout from 'container/layout/split/container';
import WrapLayout from 'container/layout/wrap/container';
import MobileTabHeader from 'presentation-component/general/mobile-tab-header/component';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import ItemVerticalList from 'presentation-component/item-list-hoc/item-vertical-list/component';
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
  tabs,
  onTabSwitch,
  boxes,
  isBoxesLoading,
  isBoxesLoadingFailed,
  mainBanner,
  isBannerFetching,
  pagination,
  membershipLevels,
  isAuthenticatedSession
}: ViewProps) => {
  const userInfoProps = {
    userInfo: user,
    membershipInfo: membershipLevels,
    isDisplayStatSection: false
  };

  return (
    <div className={styles.container}>
      <WrapLayout>
        <SplitLayout
          size="larger"
          subContainer={
            <div className={styles.sidebarSection}>
              {isAuthenticatedSession &&
                (user ? (
                  <>
                    <UserInfo {...userInfoProps} />
                    <div className={styles.balancesPreview}>
                      <BalancePreviewItem
                        type={BalancePreviewViewType.CONFIRMED}
                        value={user.balance || 0}
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
              <div className={styles.links}>
                <DashboardLink
                  title="Lịch sử hoàn tiền"
                  icon="history"
                  path={ROUTING_USER_TRANSACTIONS_BALANCE}
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
              <CashbackInstruction classes={{ container: styles.cashbackInstruction }} />
            </div>
          }
          mainContainer={
            <div className={styles.mainBlockSection}>
              <MobileTabHeader tabs={tabs} onSelect={(tab: TabState) => tab.id !== 'balance' && onTabSwitch?.(tab)} />
              <div className={styles.bodySection}>
                {isBoxesLoading ? (
                  <div className={styles.skeletons}>
                    {Array.from({ length: 20 }).map((_, index) => (
                      <LoadingPlaceholder key={index} className={styles.skeleton} />
                    ))}
                  </div>
                ) : isBoxesLoadingFailed ? (
                  <NoContentPlaceholder
                    title="Đã có lỗi xảy ra"
                    info="Mã giới thiệu bị lỗi"
                    logo={NO_CONTENT_LOGO.ROBOT}
                    classes={{ container: styles.placeholder, logo: styles.logo }}
                  />
                ) : !boxes?.length ? null : (
                  <>
                    <ItemVerticalList
                      title="Sản phẩm nhiều ưu đãi hoàn tiền"
                      column={4}
                      className={styles.boxesSection}
                    >
                      {boxes.map((box) => (
                        <ProductItem key={box.id} product={box} isFullPadding />
                      ))}
                    </ItemVerticalList>
                    {pagination?.totalPages && pagination?.totalPages > 1 && (
                      <Pagination {...pagination} classes={{ container: styles.paginationSection }} />
                    )}
                  </>
                )}
                <CollapsibleList<{ membershipLevels: typeof membershipLevels }>
                  list={CollapsibleTemplateCashbackFaq}
                  additionalAttributes={{ membershipLevels }}
                  classes={{ container: styles.collapsibleList }}
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
