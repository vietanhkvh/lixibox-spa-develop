import { TabState, ViewProps } from '../../component';
import LixicoinPreview from '../../sub-components/lixicoin-preview';
import UserInfo from 'components/user/user-info';
import RedeemableItemWithAction from 'container/app-shop/cart/general/product/redeemable-item-with-action';
import SplitLayout from 'container/layout/split/container';
import WrapLayout from 'container/layout/wrap/container';
import MobileTabHeader from 'presentation-component/general/mobile-tab-header/component';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import ItemVerticalList from 'presentation-component/item-list-hoc/item-vertical-list/component';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import Pagination from 'presentation-component/ui/pagination';
import SubmitButton from 'presentation-component/ui/submit-button';
import FaqLink from 'presentation-component/user/faq-link';
import LixicoinEarningInstruction from 'presentation-component/user/lixicoin-earning-instruction';

import styles from './style.module.scss';

const View = ({
  user,
  tabs,
  onTabSwitch,
  boxes,
  isBoxesLoading,
  isBoxesLoadingFailed,
  pagination,
  isAuthenticatedSession,
  coinsExpireAt,
  constants,
  earnRate,
  isEarningInstructionLoading,
  onRedeemClick,
  onTransactionsLinkClick,
  membershipLevels
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
                    {isAuthenticatedSession && <UserInfo {...userInfoProps} />}
                    <LixicoinPreview
                      user={user}
                      coinsExpireAt={coinsExpireAt}
                      onTransactionsLinkClick={onTransactionsLinkClick}
                      classes={{ container: styles.lixicoinPreview }}
                    />
                  </>
                ) : (
                  <>
                    <LoadingPlaceholder className={styles.membershipInfoSkeleton} />
                    <LoadingPlaceholder className={styles.lixicoinPreviewSkeleton} />
                  </>
                ))}
              <div>
                <SubmitButton
                  title="Đổi quà ngay"
                  icon={{ position: 'left', name: 'gift' }}
                  classes={{ container: styles.redeemButton }}
                  color="white"
                  onSubmit={() => onRedeemClick?.()}
                />
              </div>
              {!isEarningInstructionLoading && !!constants ? (
                <div className={styles.lixicoinEarningInstruction}>
                  <LixicoinEarningInstruction
                    isUnboxingEnabled={constants.unboxing_enabled}
                    unboxingReward={constants.unboxing_reward}
                    referrerReward={constants.referrer_reward}
                    earnRate={earnRate}
                  />
                </div>
              ) : (
                <LoadingPlaceholder className={styles.lixicoinEarningInstructionSkeleton} />
              )}
            </div>
          }
          mainContainer={
            <div className={styles.mainBlockSection}>
              <MobileTabHeader tabs={tabs} onSelect={(tab: TabState) => tab.id !== 'lixicoin' && onTabSwitch?.(tab)} />
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
                    <ItemVerticalList title="Danh sách quà tặng" column={4} className={styles.boxesSection}>
                      {boxes.map((box) => (
                        <RedeemableItemWithAction key={box.id} product={box} />
                      ))}
                    </ItemVerticalList>
                    {pagination?.totalPages && pagination?.totalPages > 1 && (
                      <Pagination {...pagination} classes={{ container: styles.paginationSection }} />
                    )}
                  </>
                )}
              </div>
              <div className={styles.faqSection}>
                <FaqLink />
              </div>
            </div>
          }
        />
      </WrapLayout>
    </div>
  );
};

export default View;
