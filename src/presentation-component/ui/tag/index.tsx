import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface TagProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  classes?: { container?: string; icon?: string; text?: string };
}
const Tag = ({ label, icon, onClick, classes }: TagProps) => {
  return (
    <div className={classNames(styles.tag, !!onClick && styles.tagClickable, classes?.container)} onClick={onClick}>
      {!!icon && <Icon name={icon} className={classNames(styles.tagIcon, classes?.icon)} />}
      <div className={classNames(styles.tagText, !!icon && styles.tagTextWithIcon, classes?.text)}>{label}</div>
    </div>
  );
};

export default Tag;
