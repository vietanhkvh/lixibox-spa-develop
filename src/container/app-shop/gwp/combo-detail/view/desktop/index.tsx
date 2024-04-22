import classNames from 'classnames';
import { generatePath } from 'react-router-dom';
import Image from 'presentation-component/ui/image';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import Loading from 'components/ui/loading';
import Icon from 'presentation-component/ui/icon';
import AdLink from 'presentation-component/ui/ad-link';
import { unixSecondsNow } from 'utils/time';
import { getBoxPrice } from 'utils/gwp';
import { formatCurrency } from 'utils/currency';
import { ROUTING_PRODUCT_DETAIL } from 'routings/path';
import { ViewProps } from '../../component';
import styles from './style.module.scss';

const View = ({ box, scheme, scheme: { detail }, bundledItems }: ViewProps) => {
  const discountCodeEndDate = detail?.discount_code?.end_date || 0;
  const isExpired = !!discountCodeEndDate && unixSecondsNow() > discountCodeEndDate;
  const isLoading = scheme.fetching;
  const bundledItemIndex = (bundledItems?.boxId === box.slug && bundledItems?.loaded && bundledItems?.index) || [];
  const boxPrice = getBoxPrice(box);
  const generatProductDetailPath = (item: any) =>
    generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: item?.individual_box?.slug || '' }) || '#';

  return (
    <div className={styles.gwpDetailContainer}>
      {isLoading || bundledItems?.loading ? (
        <Loading classes={{ container: styles.loader }} />
      ) : scheme.loaded && !!scheme.detail ? (
        <>
          <div className={styles.banner} style={{ backgroundImage: `url(${box?.primary_picture?.large_url || ''})` }}>
            {!box?.stock && <div className={styles.outOfStockLabel}>Hết quà</div>}
          </div>
          <div className={styles.bottomSection}>
            {!!box?.name && <div className={classNames(styles.schemeTitle, 'lineClamp2')}>{box.name}</div>}
            <div className={styles.valueInfo}>
              <Icon {...{ name: 'dollar', className: styles.valueIcon }} />
              <div className={styles.valueText}>trị giá {formatCurrency(boxPrice, { suffix: true })}</div>
            </div>
            {isExpired && <div className={styles.warningMessage}>Chương trình này không tồn tại hoặc đã hết hạn.</div>}
            {!!box?.stock && !isExpired && !!bundledItemIndex.length && (
              <div className={styles.giftBoxesSection}>
                <div className={styles.giftBoxesTitle}>Danh sách quà tặng</div>
                <div className={styles.giftBoxesIndex}>
                  {bundledItemIndex.map((item, index) => (
                    <AdLink
                      key={index}
                      to={generatProductDetailPath(item)}
                      className={styles.giftBox}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className={styles.giftBoxLeftSection}>
                        <Image alt="" src={item?.individual_box?.primary_picture?.medium_url} />
                      </div>
                      <div className={styles.giftBoxRightSection}>
                        <div className={styles.giftBoxTitle}>
                          <div className={styles.giftBoxTitleQuantity}>{item?.quantity || 0}x</div>
                          <div className={classNames(styles.giftBoxTitleName, 'lineClamp1')}>
                            {item?.individual_box?.name || ''}
                          </div>
                        </div>
                        <div className={styles.giftBoxPrice}>
                          {formatCurrency(getBoxPrice(item?.individual_box), { suffix: true })}
                        </div>
                      </div>
                    </AdLink>
                  ))}
                </div>
              </div>
            )}
          </div>
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
