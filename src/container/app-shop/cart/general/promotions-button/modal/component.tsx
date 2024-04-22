import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

import EntryButton from 'presentation-component/ui/entry-button';
import GeneralModal from 'presentation-component/modal/general-modal';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import SubmitButton from 'presentation-component/ui/submit-button';
import PromotionItem from 'presentation-component/promotions/promotion-item';
import CashbackInfoModal from 'presentation-component/checkout/generic/cashback-info-modal';
import ItemCarousel from 'presentation-component/item-list-hoc/item-carousel/component';
import Icon from 'presentation-component/ui/icon';
import ProductSlider from 'presentation-component/general/desktop/product-slider';
import RedeemableItemWithActionMinimal from 'container/app-shop/cart/general/product/redeemable-item-with-action-minimal';
import { usePrevious } from 'utils/hook';
import { getGlobalErrorMessage } from 'utils/exception';
import { isMobileVersion } from 'utils';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { readPage } from 'utils/page';
import { auth } from 'utils/auth';
import { ADD_DISCOUNT_CODE } from 'flows/cart/type';
import { Cart, DiscountCode } from 'types/api/cart';
import { SHARED_MODAL_ID } from 'constants/application/shared-modal';
import { REFEREE_SCHEMES_MODAL_INVOCATION_MODE } from 'constants/application/referral';
import Loading from 'components/ui/loading';
import { ViewedSource } from 'tracking/constants';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { calculateRepresentablePromotions, getBirthdayGift, getMembershipGift } from 'utils/cart';
import { ProductBox } from 'types/api/shop';
import { PropsFromRedux } from './store';
import styles from './style.module.scss';

const getFreeshipBenefit = (cart: Cart): { name: string; description?: string } | null => {
  const originalShippingPrice = cart?.original_shipping_price || 0;
  const shippingPrice = cart?.shipping_price || 0;
  const shippingDiscount = originalShippingPrice - shippingPrice;

  if (!shippingDiscount) return null;

  return {
    name: `Giảm ${formatCurrency(shippingDiscount, { suffix: true })} phí ship`,
    description: `Áp dụng cho đơn trên 500K`
  };
};

const getDiscountCodesSegment1 = (discountCodes: DiscountCode[]): DiscountCode[] => {
  return discountCodes.filter((discountCode) => discountCode.is_applicable).slice(0, 10);
};

const getDiscountCodesSegment2 = (discountCodes: DiscountCode[]): DiscountCode[] => {
  return [
    ...discountCodes.filter((discountCode) => discountCode.is_applicable).slice(10),
    ...discountCodes.filter((discountCode) => !discountCode.is_applicable)
  ];
};

interface PromotionsModalProps extends PropsFromRedux {
  isOpen: boolean;
  paging: { page: number; perPage: number };
  toggleVisibility: (isVisible: boolean) => any;
  onCouponBodyClick?: (coupon: any) => any;
}
const PromotionsModal = ({
  toggleVisibility,
  isOpen,
  onCouponBodyClick,
  authStore: { profile },
  cartStore: {
    cartDetail,
    addDiscountCode,
    removeDiscountCode,
    cartDiscountCodes,
    constants,
    toggleApplyBalanceStatus,
    representablePromotions,
    promotionsViewCountSinceCheckoutMounted
  },
  errorStore: { index: errorIndex },
  shopStore: {
    redeemable: { user: userRedeemable }
  },
  fetchCartDiscountCodesAction,
  fetchRedeemUserBoxesAction,
  addDiscountCodeAction,
  removeDiscountCodeAction,
  updateRepresentablePromotionsAction,
  popErrorAction,
  openSharedModalAction,
  toggleApplyBalanceStatusAction,
  updatePromotionsViewCountSinceCheckoutMountedAction
}: PromotionsModalProps) => {
  let asyncEventId: any = null;
  const inputElement = useRef<HTMLInputElement | null>(null);
  const errorMessage = getGlobalErrorMessage(errorIndex, ADD_DISCOUNT_CODE);
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);
  const [isCashbackInfoModalOpen, setIsCashbackInfoModalOpen] = useState(false);
  const isAdding = addDiscountCode.loading;
  const wasAdding = usePrevious(isAdding);
  const isRemoving = removeDiscountCode.loading;
  const wasRemoving = usePrevious(isRemoving);
  const wasOpen = usePrevious(isOpen);
  const [isRemovingReferral, setIsRemovingReferral] = useState(false);
  const appliedDiscountCode =
    cartDetail?.discount_code || cartDetail?.referral_code || cartDetail?.mobile_referral_code || '';

  const redeemablePage = 1;
  const redeemablePerPage = 10;

  useEffect(() => {
    setCode(appliedDiscountCode || '');
  }, [appliedDiscountCode, isOpen]);

  useEffect(() => {
    if (wasAdding && !addDiscountCode.loading && addDiscountCode.status) {
      if (cartDetail.referral_code) {
        toggleVisibility(false);
        openSharedModalAction({
          id: SHARED_MODAL_ID.RefereeSchemesModal,
          data: { code: cartDetail.referral_code, mode: REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITHOUT_BUTTON }
        });
      }
    }
  }, [addDiscountCode.loading, wasAdding, addDiscountCode.status, cartDetail.referral_code, code]);
  useEffect(() => {
    wasOpen && !isOpen && popErrorAction(ADD_DISCOUNT_CODE);
  }, [isOpen, wasOpen]);

  // Fetch cart discount code on mount to calculate promotions applicability status
  useEffect(() => {
    fetchCartDiscountCodesAction({});
  }, []);

  useEffect(() => {
    if (isOpen) {
      asyncEventId = setTimeout(() => {
        inputElement.current && inputElement.current.focus();
      }, 350);

      // Fetch applicable discount codes, every time the modal is opened
      fetchCartDiscountCodesAction({});

      // Fetch redeemable user boxes
      auth.loggedIn() && fetchRedeemUserBoxesAction({ page: redeemablePage, perPage: redeemablePerPage });
    }

    return () => clearInterval(asyncEventId);
  }, [isOpen]);

  // reset referral removal loading state
  const wasRemovingDiscountCode = usePrevious(removeDiscountCode.loading);
  useEffect(() => {
    if (isRemovingReferral && wasRemovingDiscountCode && !removeDiscountCode.loading) {
      setIsRemovingReferral(false);
    }
  }, [removeDiscountCode.loading, isRemovingReferral, wasRemovingDiscountCode]);

  // Increment promotions view count since checkout mounted
  useEffect(() => {
    if (wasOpen !== isOpen && isOpen) {
      updatePromotionsViewCountSinceCheckoutMountedAction({ count: promotionsViewCountSinceCheckoutMounted + 1 });
    }
  }, [isOpen, wasOpen, promotionsViewCountSinceCheckoutMounted]);

  const redeemableBoxes = (readPage({ pageable: userRedeemable, page: redeemablePage, perPage: redeemablePerPage }) ||
    []) as ProductBox[];
  const canUserRedeem = redeemableBoxes.some((box) => box.coins_price <= (profile?.coins || 0));
  useEffect(() => {
    const _representablePromotions = calculateRepresentablePromotions({
      cart: cartDetail,
      cartDiscountCodes,
      isRedeemableLoaded: userRedeemable?.loaded,
      canUserRedeem
    });

    updateRepresentablePromotionsAction({ representablePromotions: _representablePromotions });
  }, [cartDetail, userRedeemable?.loaded, cartDiscountCodes, canUserRedeem]);

  useEffect(() => {
    !!errorMessage && !!errorMessage.length && 'null' !== errorMessage && setShowError(true);
  }, [errorMessage]);

  const [loading, setLoading] = useState(false);
  if (loading && ((wasAdding && !isAdding) || (wasRemoving && !isRemoving))) setLoading(false);
  const onCodeSubmit = (code) =>
    addDiscountCodeAction({ discountCode: code, isOpenCartSummary: false, whereAdded: 'Discount code modal' });
  const onCodeRemove = () => removeDiscountCodeAction();

  const membershipGift = getMembershipGift(cartDetail?.cart_items || []);
  const birthdayGift = getBirthdayGift(cartDetail?.cart_items || []);
  const freeshipBenefit = getFreeshipBenefit(cartDetail);
  const cashbackRedeemPercentage = constants?.cashback_redeem_percentage || 30;

  // const isAnyPromotionActionAvailable = representablePromotions.some((promotion) => promotion.isAnyActionAvailable);
  const appliedPromotionsCount = representablePromotions.reduce((acc, promotion) => acc + promotion.appliedCount, 0);
  // const isAnyPromotionActionAvailableOrApplied = isAnyPromotionActionAvailable || appliedPromotionsCount > 0;

  /* segment 0: referral */
  const isSegment0Available = !!cartDetail?.referral_code || !!cartDetail?.mobile_referral_code;
  /* segment 1: membership */
  const isSegment1Available = !!membershipGift && !!membershipGift.box_type?.name;
  /* segment 2: birthday */
  const isSegment2Available = !!birthdayGift && !!birthdayGift.box_type?.name;
  /* segment 3: first 10 of discountCode.is_applicable === true */
  const isSegment3Available = getDiscountCodesSegment1(cartDiscountCodes.index).length > 0;
  /* segment 4: cashback */
  const isSegment4Available = !!cartDetail?.applicable_balance;
  /* segment 5: freeship */
  const isSegment5Available = !!freeshipBenefit;
  /* segment 6: redeemables */
  const isSegment6Available = !!profile?.coins && !!redeemableBoxes.length;
  /* section 7: remaining of discountCode.is_applicable === true + all of discountCode.is_applicable === false */
  const isSegment7Available = getDiscountCodesSegment2(cartDiscountCodes.index).length > 0;

  const isAnyOfferAvailable =
    isSegment0Available ||
    isSegment1Available ||
    isSegment2Available ||
    isSegment3Available ||
    isSegment4Available ||
    isSegment5Available ||
    isSegment6Available ||
    isSegment7Available;

  return (
    <>
      <GeneralModal
        isOpen={isOpen}
        title="Ưu đãi"
        leftTitle=""
        rightIcon={'close'}
        fullHeight
        classes={{
          overlay: styles.redeemDiscountCodeModalOverlay,
          header: styles.header,
          clientArea: styles.clientArea
        }}
        className={classNames(isMobileVersion() ? styles.modalContainerMobile : styles.modalContainerDesktop)}
        testId={{ name: 'discount-code-modal' }}
        onRightActionClick={() => toggleVisibility(false)}
        onRequestClose={() => toggleVisibility(false)}
      >
        <div className={styles.redeemDiscountCodeModal}>
          <div className={styles.entrySection}>
            <EntryButton
              title={appliedDiscountCode ? 'Đổi mã' : 'Áp dụng'}
              value={code}
              entryDisabled={!!appliedDiscountCode}
              placeholder={'Nhập mã khuyến mãi / giới thiệu / quà tặng'}
              loading={loading}
              // Prevent user from performing an action while some other discount code is being added / removed
              disabled={(addDiscountCode.loading && !loading) || (removeDiscountCode.loading && !loading)}
              ref={inputElement}
              onChange={(value) => popErrorAction(ADD_DISCOUNT_CODE)}
              onSubmit={(value) => {
                if (!!appliedDiscountCode) {
                  onCodeRemove();
                } else {
                  if (!value) return;
                  onCodeSubmit(value.toLocaleUpperCase());
                }
                setLoading(true);
              }}
              onFocus={() => setShowError(false)}
              classes={{ input: classNames(!!appliedDiscountCode && styles.entryHighlighted) }}
            />
          </div>
          {showError && <div className={styles.notificationSection}>{errorMessage}</div>}
          <div className={styles.listSection}>
            {cartDiscountCodes.fetching ? (
              <Loading classes={{ container: styles.listLoader }} />
            ) : isAnyOfferAvailable ? (
              <>
                {/* segment 0: referral */}
                {isSegment0Available && (
                  <PromotionItem
                    {...{
                      icon: constants?.referral_program_icon
                        ? { type: 'image', url: constants.referral_program_icon }
                        : { type: 'svg', name: 'gift' },
                      title: 'Quà tặng từ người giới thiệu',
                      description: cartDetail?.referral?.applied_scheme
                        ? cartDetail.referral.applied_scheme.referee_scheme_name || ''
                        : 'Chọn ưu đãi từ người giới thiệu',
                      action: {
                        type: cartDetail?.referral?.applied_scheme ? 'applied' : 'info',
                        isLoading: isRemovingReferral,
                        onClick: (e) => {
                          if (cartDetail?.referral?.applied_scheme) {
                            e.stopPropagation();
                            setIsRemovingReferral(true);
                            removeDiscountCodeAction();
                            return;
                          }
                        }
                      },
                      onClick: () => {
                        const referralCode = cartDetail.referral?.referrer?.referral_code;

                        if (referralCode) {
                          toggleVisibility(false);
                          openSharedModalAction?.({
                            id: SHARED_MODAL_ID.RefereeSchemesModal,
                            data: { code: referralCode, mode: REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITHOUT_BUTTON }
                          });
                        }
                      },
                      classes: { container: styles.promotionItem }
                    }}
                  />
                )}
                {/* segment 1: membership */}
                {isSegment1Available && (
                  <PromotionItem
                    {...{
                      icon: constants?.membership_program_icon
                        ? { type: 'image', url: constants.membership_program_icon }
                        : { type: 'svg', name: 'gift' },
                      title: membershipGift.box_type?.name,
                      description: membershipGift.box_type?.description || '',
                      action: { type: 'applied' },
                      classes: { container: styles.promotionItem }
                    }}
                  />
                )}
                {/* segment 2: birthday */}
                {isSegment2Available && (
                  <PromotionItem
                    {...{
                      icon: constants?.birthday_program_icon
                        ? { type: 'image', url: constants.birthday_program_icon }
                        : { type: 'svg', name: 'gift' },
                      title: birthdayGift.box_type?.name,
                      description: birthdayGift.box_type?.description || '',
                      action: { type: 'applied' },
                      classes: { container: styles.promotionItem }
                    }}
                  />
                )}
                {/* segment 3: first 10 of discountCode.is_applicable === true */}
                {isSegment3Available &&
                  getDiscountCodesSegment1(cartDiscountCodes.index).map((discountCode, index) => (
                    <PromotionItem
                      {...{
                        key: index,
                        icon: constants?.discount_code_program_icon
                          ? { type: 'image', url: constants.discount_code_program_icon }
                          : { type: 'svg', name: 'discount-code' },
                        title: discountCode.title || `Mã giảm giá: ${discountCode.code}`,
                        description: discountCode.description,
                        action: {
                          type:
                            cartDetail.discount_code === discountCode.code
                              ? 'applied'
                              : discountCode.is_applicable
                              ? 'applicable'
                              : 'info',
                          isLoading:
                            (addDiscountCode.code === discountCode.code && addDiscountCode.loading) ||
                            (appliedDiscountCode === discountCode.code && removeDiscountCode.loading),
                          // Prevent user from performing an action while some other discount code is being added / removed
                          isDisabled:
                            (addDiscountCode.code !== discountCode.code && addDiscountCode.loading) ||
                            (appliedDiscountCode !== discountCode.code && removeDiscountCode.loading),
                          onClick: (e) => {
                            if (appliedDiscountCode === discountCode.code) {
                              e.stopPropagation();
                              onCodeRemove();
                              return;
                            }

                            if (discountCode.is_applicable) {
                              e.stopPropagation();
                              onCodeSubmit(discountCode.code);
                            }
                          }
                        },
                        onClick: () => {
                          onCouponBodyClick(discountCode);
                        },
                        classes: { container: styles.promotionItem }
                      }}
                    />
                  ))}
                {/* segment 4: cashback */}
                {isSegment4Available && (
                  <PromotionItem
                    {...{
                      icon: constants?.cashback_program_icon
                        ? { type: 'image', url: constants.cashback_program_icon }
                        : { type: 'svg', name: 'dollar-time' },
                      title: `Dùng số dư ${formatCurrency(cartDetail.applicable_balance, { suffix: true })}`,
                      description: `Giảm trực tiếp tối đa ${cashbackRedeemPercentage}% trên giá trị đơn hàng`,
                      action: {
                        type: cartDetail?.applied_applicable_balances ? 'applied' : 'applicable',
                        isLoading: toggleApplyBalanceStatus.processing,
                        onClick: (e) => {
                          e.stopPropagation();
                          toggleApplyBalanceStatusAction({ enabled: !cartDetail?.applied_applicable_balances });
                        }
                      },
                      onClick: () => setIsCashbackInfoModalOpen(true),
                      classes: { container: styles.promotionItem }
                    }}
                  />
                )}
                {/* segment 5: freeship */}
                {isSegment5Available && (
                  <PromotionItem
                    {...{
                      icon: constants?.freeship_program_icon
                        ? { type: 'image', url: constants.freeship_program_icon }
                        : { type: 'svg', name: 'delivery' },
                      title: freeshipBenefit.name,
                      description: freeshipBenefit.description,
                      action: { type: 'applied' },
                      classes: { container: styles.promotionItem }
                    }}
                  />
                )}
                {/* segment 6: redeemables */}
                {isSegment6Available && (
                  <div className={styles.redeemableSection}>
                    <div className={styles.redeemableTitle}>
                      <Icon name="dollar" className={styles.redeemableTitleIcon} />
                      <div className={styles.redeemableTitleText}>
                        Đổi quà từ Lixicoin (Bạn có{' '}
                        {formatCurrency(profile?.coins || 0, { suffix: CustomCurrencyType.LIXICOIN })})
                      </div>
                    </div>
                    {isMobileVersion() ? (
                      <ItemCarousel classes={{ list: styles.redeemableContent, child: styles.redeemableContentChild }}>
                        {redeemableBoxes.map((box, index) => (
                          <RedeemableItemWithActionMinimal
                            key={box.id}
                            product={box}
                            onClickProductItem={() => {
                              gatewayTrackViewContentFromList({
                                source: ViewedSource.REDEEM,
                                box,
                                index
                              });
                            }}
                          />
                        ))}
                      </ItemCarousel>
                    ) : (
                      <ProductSlider
                        {...{
                          column: 3,
                          classes: {
                            container: styles.redeemableContentDesktop,
                            slider: styles.redeemableContentDesktopSlider,
                            pagination: styles.redeemableContentDesktopPagination
                          },
                          data: redeemableBoxes || [],
                          template: ({ ...box }) => (
                            <RedeemableItemWithActionMinimal
                              key={box.id}
                              product={box}
                              onClickProductItem={() => {
                                gatewayTrackViewContentFromList({
                                  source: ViewedSource.REDEEM,
                                  box,
                                  index: box.id
                                });
                              }}
                            />
                          )
                        }}
                      />
                    )}
                  </div>
                )}
                {/* section 7: remaining of discountCode.is_applicable === true + all of discountCode.is_applicable === false */}
                {isSegment7Available &&
                  getDiscountCodesSegment2(cartDiscountCodes.index).map((discountCode, index) => (
                    <PromotionItem
                      {...{
                        key: index,
                        icon: constants?.discount_code_program_icon
                          ? { type: 'image', url: constants.discount_code_program_icon }
                          : { type: 'svg', name: 'discount-code' },
                        title: discountCode.title || `Mã giảm giá: ${discountCode.code}`,
                        description: discountCode.description,
                        action: {
                          type:
                            cartDetail.discount_code === discountCode.code
                              ? 'applied'
                              : discountCode.is_applicable
                              ? 'applicable'
                              : 'info',
                          isLoading:
                            (addDiscountCode.code === discountCode.code && addDiscountCode.loading) ||
                            (appliedDiscountCode === discountCode.code && removeDiscountCode.loading),
                          onClick: (e) => {
                            if (appliedDiscountCode === discountCode.code) {
                              e.stopPropagation();
                              onCodeRemove();
                              return;
                            }

                            if (discountCode.is_applicable) {
                              e.stopPropagation();
                              onCodeSubmit(discountCode.code);
                            }
                          }
                        },
                        onClick: () => {
                          onCouponBodyClick(discountCode);
                        },
                        classes: { container: styles.promotionItem }
                      }}
                    />
                  ))}
              </>
            ) : (
              <NoContentPlaceholder
                title="Không có ưu đãi nào"
                info="Hãy tiếp tục mua sắm để nhận thêm ưu đãi nhé!"
                logo={NO_CONTENT_LOGO.COUPONS}
                className={styles.noPromoPlaceholder}
              />
            )}
          </div>
          <div className={styles.filler} />
          <div className={styles.actionButtonGroup}>
            {appliedPromotionsCount > 0 && (
              <div className={styles.infoSection}>
                <div className={styles.topSection}>Đã áp dụng {appliedPromotionsCount} ưu đãi</div>
                <div className={styles.bottomSection}>
                  Tổng tiền: {formatCurrency(cartDetail?.total_price || 0, { suffix: true })}
                </div>
              </div>
            )}
            <SubmitButton
              {...{
                title: appliedPromotionsCount > 0 ? 'Đồng ý' : 'Bỏ qua ưu đãi và tiếp tục',
                color: appliedPromotionsCount > 0 ? 'pink' : 'borderWhite',
                classes: { container: styles.primaryActionButton },
                onSubmit() {
                  toggleVisibility(false);
                }
              }}
            />
          </div>
        </div>
      </GeneralModal>
      <CashbackInfoModal
        isOpen={isCashbackInfoModalOpen}
        totalBalance={cartDetail?.balance_used || 0}
        /**
         * FIXME: 30% hardcoded fallback was added since the constants API was not available at the time of release.
         * TODO: Replace hardcoded fallback with 0 once constants API is available.
         */
        cashbackRedeemPercentage={constants?.cashback_redeem_percentage || 30}
        onRequestClose={() => setIsCashbackInfoModalOpen(false)}
      />
    </>
  );
};

export default PromotionsModal;
