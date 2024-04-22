import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';
import LoadingPlaceholder from '../../ui/loading-placeholder';
import SvgIcon from '../../../presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import ImageMagnifier from 'presentation-component/vendor/image-magnifier';
import { isMobileVersion } from '../../../utils/responsive';
import { generateTestId } from 'utils/test-utils';
import { gatewayTrackShare } from 'tracking/gateway';

import BadgesImage from '../badges-image';
import { IProductImageState, IProductImageProps } from './model';
import { ID_VIDEO_ITEM } from './initialize';
import styles from './style.module.scss';
import STYLE from './style';

const CONTENT_TRANSITION_DURATION_MS = 600;

const renderPlaceholder = () => (
  <div style={STYLE.placeholder}>
    <LoadingPlaceholder style={STYLE.placeholder.main} />
  </div>
);

const View = ({ props, state, videoRef, viewImage, startVideo, selectImage, stopVideos, selectVideo, viewVideo }) => {
  const { video, badges, box } = props as IProductImageProps;
  const { imageList, selectedIndex, videoSelected } = state as IProductImageState;

  const indexSetterRef = useRef<NodeJS.Timeout>(null);
  const [visibleIndex, setVisibleIndex] = useState(selectedIndex);
  useEffect(() => {
    indexSetterRef.current = setTimeout(() => {
      setVisibleIndex(selectedIndex);
    }, CONTENT_TRANSITION_DURATION_MS);

    return () => {
      clearTimeout(indexSetterRef.current);
    };
  }, [selectedIndex]);

  const isVideo = !!video && !!video.length;
  const isShow = imageList.length > 1 || (imageList.length > 0 && isVideo);

  const mainImageStyle = imageList.length === 0 ? {} : STYLE.main.image;

  const thumbnailListContainerStyle = imageList.length === 0 ? {} : STYLE.list.container;
  const browserNavigator: any = navigator;

  const isShowMore = imageList.length >= 5;

  return (
    <div style={STYLE}>
      {/** 1. Main Image */}
      {imageList.length === 0 ? (
        renderPlaceholder()
      ) : (
        <div style={STYLE.main.container}>
          <div style={mainImageStyle}>
            <div style={STYLE.productImageSlider}>
              <div style={STYLE.productImageSlider.sliderPanel} id={'product-picture-slider-panel'}>
                {!!video && !!video.length && (
                  <>
                    <video
                      ref={videoRef}
                      id={`${ID_VIDEO_ITEM}-${0}`}
                      style={STYLE.productImageSlider.sliderItem}
                      autoPlay={true}
                      src={video[0].url}
                      controls
                      muted
                      loop
                    />
                  </>
                )}
                {Array.isArray(imageList) &&
                  imageList.map((image, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <div key={index} style={STYLE.productImageSlider.sliderItem}>
                      <ImageMagnifier
                        imageElement={Image}
                        magnifiedViewRegion={({ baseImageBox, windowSize, scrollY }) => {
                          const topHeadersTotalHeight = 100;
                          const margin = 10;
                          const imageVisibleForUptoNPixelsScrollY = 30;
                          const y =
                            baseImageBox.top > topHeadersTotalHeight + margin
                              ? baseImageBox.top + scrollY
                              : baseImageBox.top + scrollY + (scrollY - imageVisibleForUptoNPixelsScrollY);
                          return {
                            x: baseImageBox.right + margin,
                            y,
                            width: windowSize.width - baseImageBox.right - margin * 2 - 15,
                            height: window.innerHeight - (baseImageBox.top + scrollY) - margin
                          };
                        }}
                        isHidden={!!video.length ? visibleIndex - 1 !== index : visibleIndex !== index}
                        {...generateTestId({ name: 'img-item-product-detail' })}
                        onMouseEnter={() => {
                          const hoverMainImageGaTracking = {
                            category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                            action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER,
                            label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER.HOVER.MAIN_IMAGE,
                            value: 1
                          };

                          !!gaEventTracking && gaEventTracking(hoverMainImageGaTracking);
                        }}
                        onClick={() => {
                          viewImage(image);
                          const clickMainImageGaTracking = {
                            category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                            action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER,
                            label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER.CLICK.MAIN_IMAGE,
                            value: 1
                          };

                          !!gaEventTracking && gaEventTracking(clickMainImageGaTracking);
                        }}
                        alt="product image slider item"
                        key={`product-image-slider-${index}`}
                        src={image.image}
                        style={STYLE.productImageSlider.sliderItem}
                      />
                      {!!badges && 0 === index && <BadgesImage badges={badges} showTextBadge={false} />}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div style={STYLE.statusNumber}>{`${selectedIndex + 1} / ${
            imageList.length + (!!video ? video.length : 0)
          }`}</div>
        </div>
      )}
      {/** 2. List image : only show when have from 2 images */}
      {!isMobileVersion() && true === isShow && (
        <div>
          <div style={thumbnailListContainerStyle}>
            {!!video && !!video.length && (
              <div
                key={`${ID_VIDEO_ITEM}-0`}
                className={classNames(styles.listItem, videoSelected === 0 && styles.listItemSelected)}
                style={Object.assign(
                  {},
                  {
                    backgroundImage: `url('${video[0].thumb}')`
                  },
                  STYLE.list.viewmoreItem
                )}
                onMouseEnter={() => {
                  startVideo(`${ID_VIDEO_ITEM}-0`);
                  selectImage(null, -1);
                }}
                onClick={() => {
                  stopVideos();
                  selectVideo();
                  viewVideo();
                }}
              >
                <div key={`product-${ID_VIDEO_ITEM}`} style={STYLE.list.innerViewmoreItem} />
                <div style={STYLE.list.videoIcon}></div>
              </div>
            )}
            {Array.isArray(imageList) &&
              imageList
                .filter((image, index) => index <= (isShowMore ? 2 : 3))
                .map((image, index) => (
                  <Image
                    key={`product-image-${index}`}
                    src={image.thumbnail}
                    onMouseEnter={() => {
                      stopVideos();
                      selectImage(image, index);
                      const hoverItemImageGaTracking = {
                        category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                        action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER,
                        label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER.HOVER.MAIN_IMAGE,
                        value: 1
                      };

                      !!gaEventTracking && gaEventTracking(hoverItemImageGaTracking);
                    }}
                    onClick={() => {
                      stopVideos();
                      viewImage(image);
                      selectImage(image, index);
                      const clickItemImageGaTracking = {
                        category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                        action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER,
                        label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER.CLICK.ITEM_IMAGE,
                        value: 1
                      };

                      !!gaEventTracking && gaEventTracking(clickItemImageGaTracking);
                    }}
                    className={classNames(styles.listItem, image.selected && styles.listItemSelected)}
                  />
                ))}
            {isShowMore && (
              <div
                className={styles.listItem}
                style={Object.assign(
                  {},
                  { backgroundImage: `url('${imageList[3].thumbnail}')` },
                  STYLE.list.viewmoreItem
                )}
              >
                <div key={`product-image-${3}`} style={STYLE.list.innerViewmoreItem} />
                <div
                  style={STYLE.list.textViewmoreItem}
                  onClick={() => {
                    stopVideos();
                    viewImage(imageList[3]);

                    const clickViewMoreGaTracking = {
                      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER,
                      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.BOX_DETAIL_PICTURE_VIEWER.CLICK.VIEW_MORE_IMAGE,
                      value: 1
                    };

                    !!gaEventTracking && gaEventTracking(clickViewMoreGaTracking);
                  }}
                >
                  {`Xem thêm`}
                  <br />
                  {`${imageList.length - 4} hình ảnh`}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!!isMobileVersion() && !!browserNavigator && !!browserNavigator.share && (
        <SvgIcon
          className={styles.mobileShare}
          name={'share'}
          onClick={() => {
            browserNavigator
              .share({
                title: document.title,
                text: 'Lixibox',
                url: window.location.href
              })
              .then(() => console.log('Chia sẻ thành công'))
              .catch((error) => console.log('Cancelled: Chia sẻ không thành công', error));
            box &&
              gatewayTrackShare({
                id: box.id,
                name: box.name,
                type: 'magazine' as const
              });
          }}
        />
      )}
    </div>
  );
};

export default View;
