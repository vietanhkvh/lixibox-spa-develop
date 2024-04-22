import { Fragment } from 'react';
import { NavLink, generatePath } from 'react-router-dom';

import { ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT, ROUTING_COMMUNITY_NEW_FEEDBACK } from '../../../routings/path';
import Image from 'presentation-component/ui/image';
import SvgIcon from '../../../presentation-component/ui/icon';
import { storageKey } from '../../../constants/application/client-storage';
import { setReferrer } from '../../../utils/navigate';
import { gatewayTrackViewAllItems } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import styles from './style.module.css';

const Heading = () => {
  const linkProps = {
    className: styles.viewAll,
    to: ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT,
    onClick: () => {
      gatewayTrackViewAllItems({ source: ViewedSource.MY_FEEDBACK });
    }
  };

  const iconProps = {
    name: 'angle-left',
    className: styles.viewAllIcon
  };

  return (
    <div className={styles.heading}>
      <div className={styles.headingTitle}>Đánh giá box - Nhận ngay Lixicoin</div>
      <NavLink {...linkProps}>
        Xem tất cả
        <SvgIcon {...iconProps} />
      </NavLink>
    </div>
  );
};

function Item(item, index) {
  const newItemPath = generatePath(ROUTING_COMMUNITY_NEW_FEEDBACK, { productId: item.id });
  const linkProps = {
    className: styles.item,
    to: newItemPath,
    onClick: () => setReferrer(storageKey.FEEDBACK_REDIRECT)
  };

  const imgProps = {
    className: styles.itemImage,
    alt: item.name,
    src: (item.primary_picture && item.primary_picture.medium_url) || ''
  };

  return (
    <Fragment key={item.id || index}>
      <NavLink {...linkProps}>
        <Image {...imgProps} />
        <div className={styles.itemName}>{item.name}</div>
      </NavLink>
      {!!item.isLastItem && <div className={styles.isLastItem} />}
    </Fragment>
  );
}

const Content = ({ list }) => {
  return (
    <div className={styles.content}>
      <div className={styles.panel}>
        {list.map((item, index) => Object.assign({}, item, { isLastItem: index === list.length - 1 })).map(Item)}
        {''}
      </div>
    </div>
  );
};

const BoxToFeedback = ({ list }) => {
  if (!list || !list.length) return null;

  return (
    <div className={styles.container}>
      <Heading />
      <Content list={list} />
    </div>
  );
};

export default BoxToFeedback;
