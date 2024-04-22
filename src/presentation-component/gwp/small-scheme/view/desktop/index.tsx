import classNames from 'classnames';
import AdLink from 'presentation-component/ui/ad-link';
import SubmitButton from 'presentation-component/ui/submit-button';
import { NavLink } from 'react-router-dom';
import { getConditionalMessage } from 'utils/gwp';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const View = ({ scheme, isExpired, link, classes }: ViewProps) => {
  if (!scheme) return null;
  const conditionalMessage = getConditionalMessage(scheme);

  return (
    <div className={classNames(styles.container, classes?.container)}>
      <NavLink to={link} className={styles.banner} style={{ backgroundImage: `url(${scheme.banner?.url})` }} />
      <NavLink to={link} className={classNames(styles.title, 'lineClamp2')}>
        {scheme.name || ''}
      </NavLink>
      <NavLink to={link} className={classNames(styles.subtitle, 'lineClamp1')}>
        {conditionalMessage}
      </NavLink>
      <AdLink to={link}>
        <SubmitButton
          {...{
            title: scheme.is_pre_order ? 'Mua ngay lấy quà' : 'Chọn deal lấy quà',
            icon: { name: 'cart', position: 'left' },
            color: 'pink',
            classes: { container: styles.button },
            disabled: isExpired
          }}
        />
      </AdLink>
    </div>
  );
};

export default View;
