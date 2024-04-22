import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import PromoApplyIconButton from 'presentation-component/ui/promo-apply-icon-button';
import styles from './style.module.scss';

interface PromotionItemSvgIcon {
  type: 'svg';
  name: string;
}
interface PromotionItemImageIcon {
  type: 'image';
  url: string;
  alt?: string;
}
type PromotionItemActionType = 'applicable' | 'applied' | 'info';
interface PromotionItemAction {
  type: PromotionItemActionType;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
interface PromotionItemProps {
  icon: PromotionItemSvgIcon | PromotionItemImageIcon;
  title: string;
  description?: string;
  action: PromotionItemAction;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  classes?: { container?: string };
  dontMarkNonApplicableAsInactive?: boolean;
}
const PromotionItem = ({
  icon,
  title,
  description,
  action,
  onClick,
  classes,
  dontMarkNonApplicableAsInactive
}: PromotionItemProps) => {
  return (
    <div
      className={classNames(
        styles.promotionItem,
        action.type === 'info' && !dontMarkNonApplicableAsInactive && styles.inactive,
        classes?.container
      )}
      onClick={onClick}
    >
      {icon.type === 'svg' ? (
        <Icon name={icon.name} className={classNames(styles.iconSection, styles.svgIcon)} />
      ) : (
        <Image src={icon.url} alt={icon.alt || 'icon'} className={classNames(styles.iconSection, styles.imageIcon)} />
      )}
      <div className={styles.contentSection}>
        <div className={classNames(styles.title, 'lineClamp1')}>{title}</div>
        {!!description && <div className={classNames(styles.description, 'lineClamp1')}>{description}</div>}
      </div>
      <PromoApplyIconButton
        {...{
          currentAction: action.type,
          isLoading: action.isLoading,
          isDisabled: action.isDisabled,
          onClick: action.onClick,
          classes: { container: styles.actionSection }
        }}
      />
    </div>
  );
};

export type { PromotionItemActionType, PromotionItemAction, PromotionItemProps };
export default PromotionItem;
