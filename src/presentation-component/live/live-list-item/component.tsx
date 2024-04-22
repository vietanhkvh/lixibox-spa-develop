import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import SvgIcon from '../../../presentation-component/ui/icon';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import { ROUTING_COMMUNITY_LIVE } from '../../../routings/path';

import styles from './style.module.scss';

const Cover = ({ coverImage }) => {
  return (
    <div className={styles.cover}>
      <div className={styles.imgOuter}>
        <Image src={coverImage} />
      </div>
    </div>
  );
};

const Content = ({ name, createdAt, isShowLiveTag, isShowComingSoonTag }) => {
  return (
    <div className={styles.content}>
      <div className={styles.name}>
        {!!isShowLiveTag && <div className={styles.redTag}>Trực tiếp</div>}
        {!!isShowComingSoonTag && <div className={styles.greenTag}>Sắp tới</div>}
        {name}
      </div>
      <div className={styles.info}>
        <SvgIcon name={'history'} className={styles.icon} />
        <div className={styles.time} title={formatDateTime(createdAt, DATETIME_FORMAT_TYPE.FULL_INFO)}>
          {formatDateTime(createdAt, DATETIME_FORMAT_TYPE.DD_MM_YYYY_HH_MM)}
        </div>
      </div>
    </div>
  );
};

interface IProps {
  data: any;
  size?: 'large' | 'general' | 'small';
}

const LiveListItem = ({ data, size = 'general' }: IProps) => {
  const { coverImage, name, slug, createdAt, endAt } = data;
  const containerProps = {
    to: `${ROUTING_COMMUNITY_LIVE}/${slug}`,
    className: classnames(styles.container, { [styles[`size-${size}`]]: !!size })
  };

  const nowTime = Math.floor(new Date().getTime() / 1000);
  const isShowLiveTag = createdAt < nowTime && nowTime < endAt;
  const isShowComingSoonTag = nowTime < createdAt;

  return (
    <NavLink {...containerProps}>
      <Cover {...{ coverImage }} />
      <Content {...{ name, createdAt, isShowLiveTag, isShowComingSoonTag }} />
    </NavLink>
  );
};

export default LiveListItem;
