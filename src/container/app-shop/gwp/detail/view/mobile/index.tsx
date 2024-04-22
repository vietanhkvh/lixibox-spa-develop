import classNames from 'classnames';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import SubmitButton from 'presentation-component/ui/submit-button';
import AdLink from 'presentation-component/ui/ad-link';
import GiftBoxPreview from 'container/app-shop/gwp/generic/gift-box-preview';
import Coupon from 'presentation-component/ui/coupon';
import ShowMoreInline from 'presentation-component/ui/show-more-inline';
import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';
import ItemCarousel from 'presentation-component/item-list-hoc/item-carousel/component';
import ItemWithAction from 'container/app-shop/cart/general/item-with-action';
import CountdownClock from 'components/countdown/clock';
import Loading from 'components/ui/loading';
import { getConditionalMessage, getSellableGiftBoxes, getTotalGiftValue } from 'utils/gwp';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { gatewayTrackViewAllItems, gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { ROUTING_HOT_DEAL } from 'routings/path';
import { formatCurrency } from 'utils/currency';
import * as VARIABLE from 'style/variable';
import { ViewProps } from '../../component';
import styles from './style.module.scss';

const View = ({
  descriptionText,
  countdown,
  shouldShowCountdown,
  countdownText,
  isExpired,
  scheme,
  scheme: { detail },
  shouldShowProductLists,
  hotDeals,
  isHotDealsLoading,
  isHotDealsLoaded,
  bestSellingBoxes,
  isBestSellingBoxesLoading,
  isBestSellingBoxesLoaded,
  bestSellingBoxesPath,
  isExclusiveBoxesLoading,
  isExclusiveBoxesLoaded,
  exclusiveBoxes,
  onBoxClick,
  onCopy
}: ViewProps) => {
  const giftBoxes = detail?.discount_code?.gift_boxes || [];
  const sellableGiftBoxes = getSellableGiftBoxes(giftBoxes);
  const linkedItems = detail?.linked_items?.length ? detail?.linked_items.filter((item) => item?.name) : [];
  const isLoading = scheme.fetching;
  const conditionalMessage = getConditionalMessage(detail);
  const primaryTitle = detail?.style === 'large' ? 'Ưu đãi HOT' : 'Quà tặng miễn phí cho đơn hàng';

  return (
    <div className={styles.gwpDetailContainer}>
      <div className={styles.primaryTitle}>{primaryTitle}</div>
      {isLoading ? (
        <Loading classes={{ container: styles.loader }} />
      ) : scheme.loaded && !!scheme.detail ? (
        <>
          <div className={styles.banner} style={{ backgroundImage: `url(${detail?.banner?.url || ''})` }} />
          <div className={styles.infoSection}>
            {!!detail?.name && <div className={classNames(styles.schemeTitle)}>{detail.name}</div>}
            <div className={styles.info}>{conditionalMessage}</div>
            {!isExpired && !!shouldShowCountdown && (
              <div className={styles.countdownSection}>
                <div className={styles.countdownTitle}>{countdownText}:</div>
                <CountdownClock size="normal" classes={{ container: styles.countdown }} {...countdown} />
              </div>
            )}
            <Coupon
              code={detail?.discount_code?.code || ''}
              color={VARIABLE.colorF5}
              classes={{ container: styles.coupon }}
              onCopy={onCopy}
            />
            {!!descriptionText && (
              <ShowMoreInline
                {...{
                  text: descriptionText,
                  lineCount: 5,
                  lineHeight: 20,
                  classes: { container: styles.description }
                }}
              />
            )}
            {!isExpired && giftBoxes.length && (
              <div className={styles.giftIndexSection}>
                <div className={styles.giftIndexTitle}>
                  {detail?.discount_code?.auto_add_gifts ? (
                    <>
                      Tặng miễn phí bộ quà trị giá{' '}
                      <span>{formatCurrency(getTotalGiftValue(giftBoxes), { suffix: true })}</span> gồm:
                    </>
                  ) : (
                    <>Bạn được chọn 1 trong những phần quà dưới đây khi áp dụng mã tại giỏ hàng</>
                  )}
                </div>
                <div className={classNames(styles.giftIndex, 'withVisibleScrollbar')}>
                  {giftBoxes.map((box, index) => (
                    <GiftBoxPreview key={index} box={box} onClick={onBoxClick} classes={{ container: styles.gift }} />
                  ))}
                </div>
              </div>
            )}
            {!!detail.terms && (
              <div className={styles.termsSection}>
                <div className={styles.termsHeader}>Lưu ý:</div>
                <SanitizedAndPreprocessedHTMLContent
                  content={detail.terms}
                  isSantitizeHtml={false}
                  className={classNames(styles.terms, 'sanitizedAndPreprocessedHTMLContentFormattedUnorderedList')}
                />
              </div>
            )}
            {isExpired && <div className={styles.warningMessage}>Chương trình này không tồn tại hoặc đã hết hạn.</div>}
            {!isExpired && !!linkedItems.length && (
              <div className={classNames(styles.suggestion, 'wordNoBreakOut')}>
                <span className={styles.suggestionTitle}>Gợi ý sản phẩm:</span>
                {linkedItems.map((item, index) => (
                  <AdLink
                    to={item.link_url || ''}
                    tag={'span'}
                    className={styles.suggestionContent}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {item.name}
                    {index + 1 === linkedItems.length ? '' : ','}
                  </AdLink>
                ))}
              </div>
            )}
          </div>
          {shouldShowProductLists && !!bestSellingBoxes?.length && (
            <>
              <div className={styles.sectionDivider} />
              <ItemCarousel
                viewMore={'Xem tất cả'}
                viewMoreLink={bestSellingBoxesPath}
                title={'Box Bán Chạy'}
                onViewMoreClick={() => {
                  gatewayTrackViewAllItems({ source: ViewedSource.GWP_SCHEME_BEST_SELLING, sourceId: detail?.slug });
                }}
              >
                {bestSellingBoxes.map((product, index) => (
                  <ItemWithAction
                    key={product.id || index}
                    product={product}
                    isFullPadding
                    isShowVariants
                    action={{ title: 'Thêm vào giỏ', icon: 'plus' }}
                    purchaseType={PURCHASE_TYPE.NORMAL}
                    isShowPricing
                    isShowRating
                    shouldDisplayCartSummary
                    onClickProductItem={() => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.GWP_SCHEME_BEST_SELLING,
                        sourceId: detail?.slug,
                        box: product,
                        index
                      });
                    }}
                    trackingSource={ViewedSource.GWP_SCHEME_BEST_SELLING}
                    trackingSourceId={detail?.slug}
                  />
                ))}
              </ItemCarousel>
            </>
          )}
          {shouldShowProductLists && !!hotDeals?.length && (
            <>
              <div className={styles.sectionDivider} />
              <ItemCarousel
                viewMore={'Xem tất cả'}
                viewMoreLink={ROUTING_HOT_DEAL}
                title={'Hot Deal'}
                onViewMoreClick={() => {
                  gatewayTrackViewAllItems({ source: ViewedSource.GWP_SCHEME_HOT_DEAL, sourceId: detail?.slug });
                }}
              >
                {hotDeals.map((product, index) => (
                  <ItemWithAction
                    key={product.id || index}
                    product={product}
                    isFullPadding
                    isShowVariants
                    action={{ title: 'Thêm vào giỏ', icon: 'plus' }}
                    purchaseType={PURCHASE_TYPE.NORMAL}
                    isShowPricing
                    isShowRating
                    shouldDisplayCartSummary
                    onClickProductItem={() => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.GWP_SCHEME_HOT_DEAL,
                        sourceId: detail?.slug,
                        box: product,
                        index
                      });
                    }}
                    trackingSource={ViewedSource.GWP_SCHEME_HOT_DEAL}
                    trackingSourceId={detail?.slug}
                  />
                ))}
              </ItemCarousel>
            </>
          )}
          {!!exclusiveBoxes?.length && (
            <>
              <div className={styles.sectionDivider} />
              <ItemCarousel title={'Sản phẩm chọn lọc'}>
                {exclusiveBoxes.map((product, index) => (
                  <ItemWithAction
                    key={product.id || index}
                    product={product}
                    isFullPadding
                    isShowVariants
                    action={{ title: 'Thêm vào giỏ', icon: 'plus' }}
                    purchaseType={PURCHASE_TYPE.NORMAL}
                    isShowPricing
                    isShowRating
                    shouldDisplayCartSummary
                    onClickProductItem={() => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.GWP_SCHEME_EXCLUSIVE_BOXES,
                        sourceId: detail?.slug,
                        box: product,
                        index
                      });
                    }}
                    trackingSource={ViewedSource.GWP_SCHEME_EXCLUSIVE_BOXES}
                    trackingSourceId={detail?.slug}
                  />
                ))}
              </ItemCarousel>
            </>
          )}
          {!!sellableGiftBoxes?.length && (
            <>
              <div className={styles.sectionDivider} />
              <ItemCarousel title={'Sản phẩm trong hộp quà tặng'}>
                {sellableGiftBoxes.map((product, index) => (
                  <ItemWithAction
                    key={product.id || index}
                    product={product}
                    isFullPadding
                    isShowVariants
                    action={{ title: 'Thêm vào giỏ', icon: 'plus' }}
                    purchaseType={PURCHASE_TYPE.NORMAL}
                    isShowPricing
                    isShowRating
                    shouldDisplayCartSummary
                    onClickProductItem={() => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.GWP_SCHEME_GIFT_ITEM,
                        sourceId: detail?.slug,
                        box: product,
                        index
                      });
                    }}
                    trackingSource={ViewedSource.GWP_SCHEME_GIFT_ITEM}
                    trackingSourceId={detail?.slug}
                  />
                ))}
              </ItemCarousel>
            </>
          )}
          <div className={styles.bottomSection} />
          <AdLink
            to={detail?.link_url || ''}
            className={styles.primaryButtonContainer}
            isDisabled={isExpired}
            onClick={(e) => {
              onCopy?.(detail?.discount_code?.code || '');
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <SubmitButton
              {...{
                title: 'Copy Code',
                icon: { name: 'copy', position: 'left' },
                color: isExpired ? 'black' : 'pink',
                disabled: isExpired,
                classes: { container: styles.button }
              }}
            />
          </AdLink>
        </>
      ) : (
        <>
          <NoContentPlaceholder
            title="Không có kế hoạch"
            info="Không tìm thấy sơ đồ nào. Vui lòng kiểm tra lại liên kết"
            logo={NO_CONTENT_LOGO.COUPONS}
            className={styles.noContentPlaceholder}
          />
        </>
      )}
    </div>
  );
};

export default View;
