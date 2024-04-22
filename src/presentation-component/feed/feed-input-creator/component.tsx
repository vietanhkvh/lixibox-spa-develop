import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { isMobileVersion } from '../../../utils/responsive';
import { isEmptyObject } from '../../../utils/validate';
import { ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW } from '../../../routings/path';

import styles from './style.module.css';
const AVATAR = CDN_ASSETS_PREFIX('/user/avatar.png');

const FeedInputCreator = ({ userInfo }) => {
  const imgProps = {
    src: !!isEmptyObject(userInfo) ? AVATAR : (userInfo.avatar && userInfo.avatar.medium_url) || AVATAR,
    className: styles.img,
    alt: ''
  };

  const title = !!isEmptyObject(userInfo) ? 'Đăng nhập để chia sẻ link đập hộp' : 'Chia sẻ link đập hộp';

  return (
    <NavLink
      to={`${ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW}`}
      className={classnames(styles.container, { [styles.desktop]: !isMobileVersion() })}
    >
      <Image {...imgProps} />
      <div className={styles.title}>{title}</div>
    </NavLink>
  );
};

export default FeedInputCreator;
