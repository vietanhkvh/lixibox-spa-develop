import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

type ActionType = 'applicable' | 'applied' | 'info';

const actionTypeToIconName = (actionType: ActionType) => {
  switch (actionType) {
    case 'applicable':
      return 'add';
    case 'applied':
      return 'tick';
    case 'info':
      return 'angle-right';
  }
};

interface PromoApplyIconButtonProps {
  currentAction: ActionType;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  classes?: { container?: string };
}
const PromoApplyIconButton = ({
  currentAction,
  isLoading,
  isDisabled,
  onClick,
  classes
}: PromoApplyIconButtonProps) => {
  return (
    <Icon
      name={isLoading ? 'loader' : actionTypeToIconName(currentAction)}
      className={classNames(
        styles.promoApplyIconButton,
        classes?.container,
        styles[currentAction],
        isLoading && styles.animate,
        isDisabled && !isLoading && styles.disabled
      )}
      onClick={(e) => {
        !isLoading && !isDisabled && onClick?.(e);
      }}
    />
  );
};

export default PromoApplyIconButton;
