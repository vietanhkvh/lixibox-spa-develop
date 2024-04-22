// TODO: Deduplicate
import classNames from 'classnames';
import WrapLayout from 'container/layout/wrap';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import SubmitButton from 'presentation-component/ui/submit-button';
import AdLink from 'presentation-component/ui/ad-link';
import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';
import ProductSlider from 'presentation-component/general/desktop/product-slider-with-heading';
import Coupon from 'presentation-component/ui/coupon';
import ShowMoreInline from 'presentation-component/ui/show-more-inline';
import CountdownClock from 'components/countdown/clock';
import Loading from 'components/ui/loading';
import GiftBoxPreview from 'container/app-shop/gwp/generic/gift-box-preview';
import ItemWithAction from 'container/app-shop/cart/general/item-with-action';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { getTotalGiftValue, getConditionalMessage, getSellableGiftBoxes } from 'utils/gwp';
import { ROUTING_HOT_DEAL } from 'routings/path';
import { formatCurrency } from 'utils/currency';
import { gatewayTrackViewAllItems, gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import * as VARIABLE from 'style/variable';
import { ViewProps } from '../../component';
import styles from './style.module.scss';

const CombinedProductSlider = ({
  isShowVariants = true,
  dataList,
  trackingSource,
  trackingSourceId,
  ...props
}: any) => {
  const dataProps = dataList.map((product) => ({
    key: product.id,
    product,
    isShowVariants,
    action: { title: 'Thêm vào giỏ', icon: 'plus' },
    purchaseType: PURCHASE_TYPE.NORMAL,
    isShowPricing: true,
    isShowRating: true,
    shouldDisplayCartSummary: true,
    trackingSource,
    trackingSourceId
  }));

  return <ProductSlider data={dataProps} template={ItemWithAction} {...props} />;
};

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

  return (
    <div className={styles.gwpDetailContainer}>
      {isLoading ? (
        <Loading classes={{ container: styles.loader }} />
      ) : scheme.loaded && !!scheme.detail ? (
        <>
          <WrapLayout>
            <div className={styles.topSection}>
              <div className={styles.topLeftSection}>
                <div className={styles.banner} style={{ backgroundImage: `url(${detail?.banner?.url})` }} />
              </div>
              <div className={styles.topRightSection}>
                {!!detail?.name && <div className={classNames(styles.schemeTitle, 'lineClamp2')}>{detail.name}</div>}
                <div className={styles.info}>{conditionalMessage}</div>
                {!!descriptionText && (
                  <ShowMoreInline
                    {...{
                      text: descriptionText,
                      lineCount: 5,
                      lineHeight: 22,
                      classes: { container: styles.description }
                    }}
                  />
                )}
                {!!shouldShowCountdown && (
                  <div className={styles.countdownSection}>
                    <div className={styles.countdownTitle}>{countdownText}:</div>
                    <CountdownClock
                      size="normal"
                      classes={{
                        container: styles.countdown,
                        segment: styles.segment,
                        segmentValue: styles.segmentValue,
                        segmentName: styles.segmentName
                      }}
                      {...countdown}
                    />
                  </div>
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
                        <GiftBoxPreview
                          key={index}
                          box={box}
                          onClick={onBoxClick}
                          classes={{ container: styles.gift }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {isExpired && (
                  <div className={styles.warningMessage}>Chương trình này không tồn tại hoặc đã hết hạn.</div>
                )}
                {!isExpired && !!linkedItems.length && (
                  <div className={classNames(styles.suggestion, 'wordNoBreakOut')}>
                    <span className={styles.suggestionTitle}>Gợi ý sản phẩm:</span>
                    {linkedItems.map((item, index) => (
                      <AdLink
                        to={item.link_url || ''}
                        className={styles.suggestionContent}
                        tag={'span'}
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
                {!isExpired && (
                  <Coupon
                    code={detail?.discount_code?.code || ''}
                    classes={{ container: styles.coupon }}
                    color={VARIABLE.colorF5}
                    onCopy={onCopy}
                    isCentered
                  />
                )}
                {!isExpired && (
                  <AdLink
                    to={'#'}
                    className={styles.buttonContainer}
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
                        color: 'pink',
                        classes: { container: styles.button }
                      }}
                    />
                  </AdLink>
                )}
              </div>
            </div>
          </WrapLayout>
          <WrapLayout>
            {(!!detail.terms || !isExpired) && (
              <div className={styles.bottomSection}>
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
                {shouldShowProductLists && bestSellingBoxes.length ? (
                  <CombinedProductSlider
                    dataList={bestSellingBoxes}
                    title={'Box Bán Chạy'}
                    viewMoreLink={bestSellingBoxesPath}
                    isShowViewMore
                    classes={{ container: styles.bestSellingBoxesSection, heading: styles.productListHeading }}
                    trackingSource={ViewedSource.GWP_SCHEME_BEST_SELLING}
                    trackingSourceId={detail?.slug}
                    onItemClick={(box, index) => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.GWP_SCHEME_BEST_SELLING,
                        sourceId: detail?.slug,
                        box,
                        index
                      });
                    }}
                    onViewMoreLinkClick={() => {
                      gatewayTrackViewAllItems({
                        source: ViewedSource.GWP_SCHEME_BEST_SELLING,
                        sourceId: detail?.slug
                      });
                    }}
                  />
                ) : null}
                {shouldShowProductLists && hotDeals.length ? (
                  <div>
                    <CombinedProductSlider
                      dataList={hotDeals}
                      title={'Hot Deal'}
                      viewMoreLink={`${ROUTING_HOT_DEAL}`}
                      isShowViewMore
                      classes={{ container: styles.hotDealsSection, heading: styles.productListHeading }}
                      trackingSource={ViewedSource.GWP_SCHEME_HOT_DEAL}
                      trackingSourceId={detail?.slug}
                      onItemClick={(box, index) => {
                        gatewayTrackViewContentFromList({
                          source: ViewedSource.GWP_SCHEME_HOT_DEAL,
                          sourceId: detail?.slug,
                          box,
                          index
                        });
                      }}
                      onViewMoreLinkClick={() => {
                        gatewayTrackViewAllItems({ source: ViewedSource.GWP_SCHEME_HOT_DEAL, sourceId: detail?.slug });
                      }}
                    />
                  </div>
                ) : null}
                {exclusiveBoxes.length ? (
                  <CombinedProductSlider
                    dataList={exclusiveBoxes}
                    title={'Sản phẩm chọn lọc'}
                    classes={{ container: styles.exclusiveBoxesSection, heading: styles.productListHeading }}
                    trackingSource={ViewedSource.GWP_SCHEME_EXCLUSIVE_BOXES}
                    trackingSourceId={detail?.slug}
                    onItemClick={(box, index) => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.GWP_SCHEME_EXCLUSIVE_BOXES,
                        sourceId: detail?.slug,
                        box,
                        index
                      });
                    }}
                  />
                ) : null}
                {sellableGiftBoxes.length ? (
                  <CombinedProductSlider
                    dataList={sellableGiftBoxes}
                    title={'Sản phẩm trong hộp quà tặng'}
                    classes={{ container: styles.giftBoxesSection, heading: styles.productListHeading }}
                    trackingSource={ViewedSource.GWP_SCHEME_GIFT_ITEM}
                    trackingSourceId={detail?.slug}
                    onItemClick={(box, index) => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.GWP_SCHEME_GIFT_ITEM,
                        sourceId: detail?.slug,
                        box,
                        index
                      });
                    }}
                  />
                ) : null}
              </div>
            )}
          </WrapLayout>
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
