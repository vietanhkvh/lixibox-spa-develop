import { Suspense } from 'react';
import classNames from 'classnames';

import SubmitButton from '../../../../components/ui/submit-button';
import style from './style.module.scss';

interface NoContentPlaceholderProps {
  isShowBirthdayMessage?: boolean;
  userName?: string;
  logo?: any;
  title?: string;
  subtitle?: string | JSX.Element;
  info?: string | JSX.Element;
  action?: { text: string };
  className: string;
  classes?: { container?: string; logo?: string; title?: string; subtitle?: string; info?: string };
  onClick: () => any;
}

const NoContentPlaceholder = ({
  isShowBirthdayMessage,
  userName,
  logo: Logo,
  title,
  subtitle,
  info,
  action,
  className,
  classes,
  onClick
}: NoContentPlaceholderProps) => {
  return (
    <div className={classNames(style.noContentPlaceholder, className, classes && classes.container)}>
      {Logo && (
        <Suspense fallback="">
          <div className={classNames(style.logo, classes && classes.logo)}>
            <Logo />
          </div>
        </Suspense>
      )}
      {!isShowBirthdayMessage && title && (
        <div className={classNames(style.title, classes && classes.title)}>{title}</div>
      )}
      {isShowBirthdayMessage && title && userName && (
        <div className={classNames(style.titleBirthday)}>
          <span>{`${title},`}</span> <span className={style.userName}>{userName}</span>
        </div>
      )}
      {subtitle && <div className={classNames(style.subtitle, classes && classes.subtitle)}>{subtitle}</div>}
      {info && <div className={classNames(style.info, classes && classes.info)}>{info}</div>}
      {action && (
        <SubmitButton title={action.text || 'Tiếp tục mua sắm'} className={style.primaryAction} onSubmit={onClick} />
      )}
    </div>
  );
};

NoContentPlaceholder.defaultProps = {
  className: '',
  onClick: () => {}
};

export default NoContentPlaceholder;
