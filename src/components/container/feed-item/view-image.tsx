import classNames from 'classnames';

import ImageSliderCommunity from '../image-slider-community';

import { isMobileVersion, getDeviceVersion } from '../../../utils/responsive';
import { isUndefined } from '../../../utils/validate';
import Image from 'presentation-component/ui/image';
import AdLink from 'presentation-component/ui/ad-link';
import Icon from '../../ui/icon';
import { MODAL_FEED_ITEM_COMMUNITY } from '../../../constants/application/modal';
import { ROUTING_COMMUNITY_PATH } from '../../../routings/path';

import STYLE from './style';
import styles from './style.module.scss';

const itemStyle = STYLE.headerWrap.item;

export const renderImageGroup = ({ item, openModal, isShowFullImage, isFixSizeCover }) => {
  let link = !isMobileVersion() ? '' : `${ROUTING_COMMUNITY_PATH}/${(item && item.id) || 0}`;
  let shouldShowPlayIcon = false;
  let shouldOpenModal = true;
  if (item?.feedable_type === 'Love' && item?.source?.name === 'tiktok' && item?.source?.original_url) {
    link = item.source.original_url;
    shouldShowPlayIcon = !!item?.video?.thumbnail;
    shouldOpenModal = false;
  }

  const pictureList =
    item && !isUndefined(item.pictures) && !!item.pictures.length
      ? item.pictures
      : item && !isUndefined(item.picture)
      ? [item.picture]
      : [];

  const imgUrl =
    item && !isUndefined(item.pictures) && Array.isArray(item.pictures) && item.pictures.length === 1
      ? item.pictures[0].original_url
      : 'Love' === item.feedable_type
      ? !!item.picture && item.picture.original_url
      : null;

  const pictureLength = (item && item.pictures && item.pictures.length) || 0;

  if (!!isShowFullImage) {
    return <ImageSliderCommunity data={pictureList} />;
  }

  if (!!isFixSizeCover) {
    let cover =
      item && !isUndefined(item.pictures) && Array.isArray(item.pictures) && item.pictures.length >= 1
        ? item.pictures[0].original_url
        : (item && item.picture && item.picture.original_url) || '';

    return (
      <AdLink to={link} className={styles.pictureCover}>
        {renderImage({
          imgUrl: cover,
          style: itemStyle.coverPicture,
          openModal,
          data: {
            data: Object.assign({}, item, {
              pictures: [{ original_url: imgUrl || '' }]
            }),
            posImg: 0
          }
        })}
      </AdLink>
    );
  }

  if (item && !isUndefined(item.pictures) && Array.isArray(item.pictures) && item.pictures.length > 1) {
    return (
      <AdLink to={link} className={classNames(styles.pictureList, 2 === pictureLength && styles.squareStyle)}>
        <div style={STYLE.pictureList.pictureWrap}>{renderImageList({ item, openModal })}</div>
      </AdLink>
    );
  }

  if (!imgUrl) {
    return null;
  }

  return (
    <AdLink to={link} className={styles.pictureSingle}>
      {renderImage({
        imgUrl,
        withPlayIcon: shouldShowPlayIcon,
        shouldOpenModal,
        style: itemStyle.onePicture,
        openModal,
        data: {
          data: Object.assign({}, item, {
            pictures: [{ original_url: imgUrl || '' }]
          }),
          posImg: 0
        }
      })}
    </AdLink>
  );
};

const renderImage = ({
  imgUrl,
  openModal,
  data,
  shouldOpenModal = true,
  withPlayIcon = false,
  key = '',
  style = {}
}) => {
  const iconProps = {
    name: 'play',
    style: STYLE.icon,
    innerStyle: STYLE.icon.inner
  };
  const handleClick = {
    MOBILE: () => {},
    DESKTOP: () => shouldOpenModal && openModal(MODAL_FEED_ITEM_COMMUNITY(data))
  };

  return (
    <div className={styles.imageContainerInner}>
      <Image
        onClick={() => handleClick[getDeviceVersion()]()}
        key={key}
        style={Object.assign({}, itemStyle.imageContent, style)}
        src={imgUrl}
        alt=""
      />
      {!!withPlayIcon && (
        <div className={styles.unboxingVideoIcon} style={STYLE.videoContainer.thumbnail('')}>
          <Icon {...iconProps} />
          <div style={STYLE.wrapIcon} />
        </div>
      )}
    </div>
  );
};

const renderTwoImages = (item, openModal) => {
  const { pictures } = item;
  const isPictureListNotEmpty = pictures && Array.isArray(pictures) && !!pictures.length;

  const isHorizontal = false;
  const imgStyle = STYLE.pictures.twoPicture.vertical;

  return (
    <div style={STYLE.pictures.twoPicture.container(isHorizontal)}>
      {isPictureListNotEmpty &&
        pictures.map((picture, index) => (
          <div style={imgStyle}>
            {renderImage({
              imgUrl: (picture && picture.original_url) || '',
              key: `two-img-${(picture && picture.id) || 0}`,
              style: itemStyle.fullHeight,
              openModal,
              data: { data: item, posImg: index }
            })}
          </div>
        ))}
    </div>
  );
};

const renderThreeImages = (item, openModal) => {
  const { pictures } = item;
  const isPictureListNotEmpty = pictures && Array.isArray(pictures) && !!pictures.length;

  const firstPicture = (isPictureListNotEmpty && pictures[0]) || {
    width: 0,
    height: 0
  };
  const isHorizontal = firstPicture.width > firstPicture.height;
  const imgStyle = isHorizontal ? STYLE.pictures.threePicture.horizontal : STYLE.pictures.threePicture.vertical;
  const imgItemGroupStyle = isHorizontal
    ? STYLE.pictures.threePicture.pictureGroup.horizontal
    : STYLE.pictures.threePicture.pictureGroup.vertical;

  return !isPictureListNotEmpty ? null : (
    <div style={STYLE.pictures.threePicture.container(isHorizontal)}>
      <div style={imgStyle}>
        {renderImage({
          imgUrl: pictures[0].original_url,
          key: `three-img-${pictures[0].id}`,
          style: itemStyle.fullHeight,
          openModal,
          data: { data: item, posImg: 0 }
        })}
      </div>
      <div style={STYLE.pictures.threePicture.pictureGroup.container(isHorizontal)}>
        {[1, 2].map((index) => (
          <div style={imgItemGroupStyle}>
            {renderImage({
              imgUrl: pictures[index].original_url,
              key: `three-img-${pictures[index].id}`,
              openModal,
              data: { data: item, posImg: index }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderFourImages = (item, openModal, viewMoreNum = 0) => {
  const { pictures } = item;
  const isPictureListNotEmpty = pictures && Array.isArray(pictures) && !!pictures.length;

  const firstPicture = (isPictureListNotEmpty && pictures[0]) || {
    width: 0,
    height: 0
  };
  const isHorizontal = firstPicture.width > firstPicture.height;
  const imgStyle = isHorizontal ? STYLE.pictures.fourPicture.horizontal : STYLE.pictures.fourPicture.vertical;
  const imgItemGroupStyle = isHorizontal
    ? STYLE.pictures.fourPicture.pictureGroup.horizontal
    : STYLE.pictures.fourPicture.pictureGroup.vertical;

  return !isPictureListNotEmpty ? null : (
    <div style={STYLE.pictures.fourPicture.container(isHorizontal)}>
      <div style={imgStyle}>
        {renderImage({
          imgUrl: pictures[0].original_url,
          key: `four-img-${pictures[0].id}`,
          openModal,
          data: { data: item, posImg: 0 }
        })}
      </div>
      <div style={STYLE.pictures.fourPicture.pictureGroup.container(isHorizontal)}>
        {[1, 2].map((index) => (
          <div style={imgItemGroupStyle}>
            {renderImage({
              imgUrl: pictures[index].original_url,
              key: `four-img-${pictures[index].id}`,
              openModal,
              data: { data: item, posImg: index }
            })}
          </div>
        ))}
        {viewMoreNum > 0 ? (
          <div
            style={STYLE.pictures.viewMore.container(isHorizontal)}
            onClick={() => (!isMobileVersion() ? openModal(MODAL_FEED_ITEM_COMMUNITY({ data: item, posImg: 3 })) : {})}
          >
            <div style={Object.assign({}, imgItemGroupStyle, STYLE.pictures.viewMore.imgViewMore(isHorizontal))}>
              {renderImage({
                imgUrl: pictures[3].original_url,
                key: `four-img-${pictures[3].id}`,
                openModal,
                data: { data: item, posImg: 3 }
              })}
            </div>
            <span style={STYLE.pictures.viewMore.num}>+{viewMoreNum}</span>
            <div style={STYLE.pictures.viewMore.bg} />
          </div>
        ) : (
          <div style={imgItemGroupStyle}>
            {renderImage({
              imgUrl: pictures[3].original_url,
              key: `four-img-${pictures[3].id}`,
              openModal,
              data: { data: item, posImg: 3 }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const renderImageList = ({ item, openModal }) => {
  const pictureLength = (item && item.pictures && item.pictures.length) || 0;
  if (pictureLength > 0) {
    switch (pictureLength) {
      case 1:
        return renderImage({
          imgUrl: item.pictures[0].original_url,
          style: STYLE.pictures.onePicture,
          openModal,
          data: { data: item, posImg: 0 }
        });
      case 2:
        return renderTwoImages(item, openModal);
      case 3:
        return renderThreeImages(item, openModal);
      case 4:
        return renderFourImages(item, openModal);
      default:
        return renderFourImages(item, openModal, pictureLength - 4);
    }
  }

  return null;
};
