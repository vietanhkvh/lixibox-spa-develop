import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import AdLink from 'presentation-component/ui/ad-link';
import SubmitButton from 'presentation-component/ui/submit-button';
import { getConditionalMessage } from 'utils/gwp';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const View = ({ scheme, isExpired, link, classes }: ViewProps) => {
  if (!scheme) return null;
  const conditionalMessage = getConditionalMessage(scheme);

  return (
    <NavLink to={link} className={classNames(styles.container, classes?.container)}>
      <div className={styles.banner} style={{ backgroundImage: `url(${scheme.banner?.url})` }} />
      <div className={styles.bottomSection}>
        <div className={classNames(styles.title, 'lineClamp2')}>{scheme.name || ''}</div>
        <div className={classNames(styles.subtitle, 'lineClamp1')}>{conditionalMessage}</div>
        <AdLink to={link}>
          <SubmitButton
            {...{
              title: scheme.is_pre_order ? 'Mua ngay lấy quà' : 'Chọn deal lấy quà',
              color: 'pink',
              size: 'small',
              classes: { container: styles.button },
              disabled: isExpired
            }}
          />
        </AdLink>
      </div>
    </NavLink>
  );
};

export default View;
