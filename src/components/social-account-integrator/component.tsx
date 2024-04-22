import classNames from 'classnames';

import SvgIcon from '../../presentation-component/ui/icon';
import Loading from '../ui/loading';
import { isMobileVersion } from '../../utils/responsive';
import style from './style.module.scss';

interface SocialAccountIntegratorProps {
  icon: string;
  name: string;
  isIntegrated: boolean;
  isLoading?: boolean;
  email: string;
  classes?: { container?: string };
  onClick?: (details?: { type: 'link' | 'unlink' }) => any;
}
const SocialAccountIntegrator = (props: SocialAccountIntegratorProps) => {
  const { icon, name, isIntegrated, isLoading, email, classes, onClick } = props;

  return (
    <div
      className={classNames(style.socialAccountIntegrator, classes && classes.container)}
      onClick={(e) => onClick && !isIntegrated && onClick({ type: 'link' })}
    >
      <div className={style.container}>
        <SvgIcon
          name={icon}
          className={classNames(style.socialIcon, icon === 'brand-apple' && style.socialIconAppleVisualAdjustment)}
        />
        <div className={style.title}>{name}</div>
        <div className={style.value}>
          <div className={classNames(style.text, isIntegrated || style.textDisabled)}>
            {isIntegrated ? email || 'Đã kết nối' : 'Kết nối'}
          </div>
          <SvgIcon
            name={isIntegrated ? 'close' : 'angle-right'}
            className={isIntegrated ? style.iconClose : style.iconArrow}
            onClick={() => onClick && isIntegrated && onClick({ type: 'unlink' })}
          />
        </div>
      </div>
      {isLoading && (
        <div className={classNames(style.linkerLoader, isMobileVersion() || style.linkerLoaderDesktop)}>
          <Loading style={{ height: 'initial' }} />
        </div>
      )}
    </div>
  );
};
SocialAccountIntegrator.defaultProps = {
  isLoading: false
};

export default SocialAccountIntegrator;
