import { useState } from 'react';
import classNames from 'classnames';

import { TabState, ViewProps } from '../../component';
import LixicoinPreview from '../../sub-components/lixicoin-preview';
import UserInfo from 'components/user/user-info';
import RedeemableItemWithAction from 'container/app-shop/cart/general/product/redeemable-item-with-action';
import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from 'presentation-component/general/mobile-tab-header';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import ItemVerticalList from 'presentation-component/item-list-hoc/item-vertical-list/component';
import GeneralModal from 'presentation-component/modal/general-modal/component';
import DashboardLink from 'presentation-component/ui/dashboard-link';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import Pagination from 'presentation-component/ui/pagination';
import SubmitButton from 'presentation-component/ui/submit-button';
import LixicoinEarningInstruction from 'presentation-component/user/lixicoin-earning-instruction';
import { ROUTING_LIXI_COIN_FAQ } from 'routings/path';

import styles from './style.module.scss';

const View = ({
  user,
  coinsExpireAt,
  tabs,
  onTabSwitch,
  boxes,
  isBoxesLoading,
  isBoxesLoadingFailed,
  pagination,
  isAuthenticatedSession,
  earnRate,
  isEarningInstructionLoading,
  constants,
  onRedeemClick,
  onTransactionsLinkClick,
  membershipLevels
}: ViewProps) => {
  const [infoModalVisibility, setInfoModalVisibility] = useState(false);

  const userInfoProps = {
    userInfo: user,
    membershipInfo: membershipLevels,
    isDisplayStatSection: false
  };

  return (
    <div className={styles.lixicoinDashboardContainer}>
      <MobileAutoDisplayHeader row={1}>
        <MobileTabHeader tabs={tabs} onSelect={(tab: TabState) => tab.id !== 'lixicoin' && onTabSwitch?.(tab)} />
      </MobileAutoDisplayHeader>
      {isAuthenticatedSession && <UserInfo {...userInfoProps} />}
      <div className={styles.dashboardBody}>
        {isAuthenticatedSession &&
          (user ? (
            <>
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
        <SubmitButton
          title="Đổi quà ngay"
          icon={{ position: 'left', name: 'gift' }}
          classes={{
            container: classNames(styles.redeemButton, isAuthenticatedSession && styles.redeemButtonAuthenticatedView)
          }}
          color="borderWhite"
          onSubmit={() => onRedeemClick?.()}
        />
        <div className={classNames(styles.links)}>
          <DashboardLink
            title="Hướng dẫn tích lũy Lixicoin"
            icon="dollar"
            onClick={() => setInfoModalVisibility(true)}
            classes={{ container: styles.link }}
          />
          <DashboardLink
            title="Hỏi đáp về Lixicoin"
            icon="message-multi"
            path={ROUTING_LIXI_COIN_FAQ}
            classes={{ container: styles.link }}
          />
        </div>
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
            <ItemVerticalList title="Danh sách quà tặng" column={2} className={styles.boxesSection}>
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
      <GeneralModal
        isOpen={infoModalVisibility}
        title={'Hướng dẫn tích lũy Lixicoin'}
        leftTitle=""
        rightIcon={'close'}
        className={styles.infoModal}
        onRightActionClick={() => setInfoModalVisibility(false)}
        onRequestClose={() => setInfoModalVisibility(false)}
      >
        <div className={styles.infoModalBody}>
          {!isEarningInstructionLoading && !!constants ? (
            <LixicoinEarningInstruction
              isUnboxingEnabled={constants.unboxing_enabled}
              unboxingReward={constants.unboxing_reward}
              referrerReward={constants.referrer_reward}
              earnRate={earnRate}
            />
          ) : (
            <LoadingPlaceholder className={styles.lixicoinEarningInstructionSkeleton} />
          )}
        </div>
      </GeneralModal>
    </div>
  );
};

export default View;
