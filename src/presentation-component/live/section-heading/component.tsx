import classnames from 'classnames';

import styles from './style.module.scss';
import SvgIcon from '../../ui/icon';

const Icon = ({ iconName, onClickIcon }) => {
  if (!iconName || !iconName.length) return null;

  return <SvgIcon name={iconName} className={styles.icon} onClick={onClickIcon} />;
};

const ActionTitle = ({ actionTitle, onClickActionTitle }) => {
  if (!actionTitle || !actionTitle.length) return null;

  return (
    <div className={styles.action} onClick={onClickActionTitle}>
      {actionTitle}
      <SvgIcon name={'angle-right'} className={styles.actionIcon} />
    </div>
  );
};

interface IProps {
  title: string;
  actionTitle?: string;
  onClickActionTitle?: () => void;
  iconName?: string;
  onClickIcon?: () => void;
}

const LiveSectionHeading = ({
  title = 'Section Heading',
  actionTitle = '',
  onClickActionTitle = () => {},
  iconName = '',
  onClickIcon = () => {}
}: IProps) => {
  const containerProps = {
    className: classnames(styles.container, {
      [styles.isWithIcon]: !!iconName.length
    })
  };

  return (
    <div {...containerProps}>
      <Icon {...{ iconName, onClickIcon }} />
      <div onClick={onClickIcon} className={styles.title}>
        {title}
      </div>
      <ActionTitle {...{ onClickActionTitle, actionTitle }} />
    </div>
  );
};

export default LiveSectionHeading;
