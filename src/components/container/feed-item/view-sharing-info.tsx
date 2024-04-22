import { NavLink } from 'react-router-dom';
import RatingStar from '../../ui/rating-star';

import Image from 'presentation-component/ui/image';
import { FEEDABLE_TYPE } from '../../../constants/application/feedable';
import {
  ROUTING_THEME_DETAIL_PATH,
  ROUTING_PRODUCT_DETAIL_PATH,
  ROUTING_MAGAZINE_DETAIL_PATH
} from '../../../routings/path';

import STYLE from './style';

export const renderSharingInfo = ({ item, isShowImage, isShowContent }) => {
  const info: any = {
    link: '#'
  };

  if (FEEDABLE_TYPE.BLOG === item.feedable_type) {
    if (!!item.feedable && !!item.feedable.blog_feedable) {
      info.link = `${ROUTING_MAGAZINE_DETAIL_PATH}/${item.feedable.blog_feedable.slug}`;
      info.category = 'CHIA SẺ BÀI VIẾT';
      info.title = item.feedable.blog_feedable.name;
      info.description = item.feedable.blog_feedable.description;
    }
  }

  if (FEEDABLE_TYPE.THEME === item.feedable_type) {
    if (!!item.feedable && !!item.feedable.theme_feedable) {
      info.link = `${ROUTING_THEME_DETAIL_PATH}/${item.feedable.theme_feedable.slug}`;
      info.category = 'CHƯƠNG TRÌNH KHUYẾN MÃI';
      info.title = item.feedable.theme_feedable.name;
    }
  }

  if (FEEDABLE_TYPE.FEEDBACK === item.feedable_type) {
    if (!!item.box) {
      info.link = `${ROUTING_PRODUCT_DETAIL_PATH}/${item.box.slug}`;
      info.category = 'ĐÁNH GIÁ SẢN PHẨM';
      info.title = item.box.name;
      info.image =
        (!!item.boxes &&
          !!item.boxes.length &&
          item.boxes[0].primary_picture &&
          item.boxes[0].primary_picture.medium_url) ||
        null;
    }
  }

  if (FEEDABLE_TYPE.LOVE === item.feedable_type) {
    info.category = '';
    info.title = !!item.video ? 'Video đập hộp sản phẩm' : 'Hình ảnh đập hộp sản phẩm';
  }

  if (!info.title) {
    return null;
  }

  const navLinkProps = {
    to: `${info.link}?referrer_object_type=ActivityFeed&referrer_object_id=${item.id}`,
    style: STYLE.feedSharingInfo.link
  };

  const ratingStarProps = {
    style: STYLE.headerWrap.item.info.detail.ratingGroup.rating,
    value: item.rating
  };

  const titleProps = {
    style: Object.assign({}, STYLE.feedSharingInfo.title, !!info.image && STYLE.feedSharingInfo.titleWithImage)
  };
  return (
    <NavLink {...navLinkProps}>
      {!!info.category && <div style={STYLE.feedSharingInfo.category}>{info.category}</div>}
      {item && item.rating && <RatingStar {...ratingStarProps} />}
      {!!info.title && <div {...titleProps}>{info.title}</div>}
      {!!isShowContent && !!info.description && <div style={STYLE.feedSharingInfo.description}>{info.description}</div>}
      {!!info.image && <Image src={info.image} style={STYLE.feedSharingInfo.image} alt={''} />}
    </NavLink>
  );
};
