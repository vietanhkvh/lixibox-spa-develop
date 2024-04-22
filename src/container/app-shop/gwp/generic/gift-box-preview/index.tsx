import { generatePath } from 'react-router-dom';
import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import { GiftBox } from 'types/api/gwp';
import Image from 'presentation-component/ui/image';
import { ROUTING_PRODUCT_DETAIL } from 'routings/path';
import AdLink from 'presentation-component/ui/ad-link';
import { formatCurrency } from 'utils/currency';
import Icon from 'presentation-component/ui/icon';
import { getBoxPrice } from 'utils/gwp';
import styles from './style.module.scss';

interface GiftBoxPreviewProps {
  box: GiftBox;
  onClick?: ({ box }: { box: GiftBox }) => void;
  classes?: { container?: string };
}
const GiftBoxPreview: React.FC<GiftBoxPreviewProps> = ({ box, onClick, classes }) => {
  const generatProductDetailPath = (box: GiftBox) =>
    generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: box?.slug || '' }) || '#';

  return (
    <AdLink
      to={generatProductDetailPath(box)}
      className={classNames(styles.container, !isMobileVersion() && styles.desktopLayout, classes?.container)}
      onClick={(e) => {
        onClick?.({ box });
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className={styles.giftBoxLeftSection}>
        <Image alt="" src={box?.primary_picture?.medium_url} />
        {!box?.stock && (
          <div className={styles.outOfStockContainer}>
            <div className={styles.label}>Hết quà</div>
          </div>
        )}
      </div>
      <div className={styles.giftBoxRightSection}>
        <div className={styles.giftBoxTitle}>
          <div className={styles.giftBoxTitleQuantity}>1x</div>
          <div className={classNames(styles.giftBoxTitleName, 'lineClamp2')}>{box?.name || ''}</div>
        </div>
        <div className={styles.giftBoxRightBottomSection}>
          <div className={styles.giftBoxPrice}>
            <Icon name="dollar" className={styles.priceIcon} />
            <span className={styles.priceValue}>trị giá {formatCurrency(getBoxPrice(box), { suffix: true })}</span>
          </div>
          {!!box?.is_bundle && (
            <div className={classNames(styles.comboBadge, !box?.stock && styles.disabled)}>
              <Icon {...{ name: 'gift', className: styles.buttonIcon }} />
              <div className={styles.buttonText}>Combo</div>
            </div>
          )}
        </div>
      </div>
    </AdLink>
  );
};

export default GiftBoxPreview;
