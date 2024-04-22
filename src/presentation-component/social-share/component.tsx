// NOTE: Component is currently bound to product / magazine detail routes
import { useState } from 'react';
import classNames from 'classnames';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../tracking/google-analytic/type';
import { gaEventTracking } from '../../tracking/google-analytic/ga-event-tracking';
import { gatewayTrackShare } from 'tracking/gateway';
import { stringToHash, objectToHash } from '../../utils';
import SvgIcon from '../ui/icon';
import style from './style.module.scss';

interface FacebookShareButtonProps {
  metaInfo: {
    url?: string;
    type?: string;
    title?: string;
    description?: string;
    keyword?: string;
    image?: string;
  };
  onClick?: ({ type }: { type: string }) => any;
  classes?: { container?: string };
}
const FacebookShareButton = ({ metaInfo, onClick, classes }: FacebookShareButtonProps) => {
  return (
    <div className={classNames(style.facebookShareButton, classes && classes.container)}>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          metaInfo.url || ''
        )}&amp;src=sdkpreparse`}
        onClick={() => onClick && onClick({ type: 'facebook' })}
        className="fb-xfbml-parse-ignore"
      >
        <SvgIcon name="brand-facebook-solid" className={style.iconFacebook} />
      </a>
    </div>
  );
};

interface PinterestShareButtonProps {
  metaInfo: {
    url?: string;
    type?: string;
    title?: string;
    description?: string;
    keyword?: string;
    image?: string;
  };
  onClick?: ({ type }: { type: string }) => any;
  classes?: { container?: string };
}
const PinterestShareButton = ({ metaInfo, onClick, classes }: PinterestShareButtonProps) => {
  return (
    <div className={classNames(style.pinterestShareButton, classes && classes.container)}>
      <a
        target="_blank"
        rel="noreferrer"
        data-pin-do="buttonPin"
        data-pin-description={metaInfo.title || ''}
        data-pin-media={metaInfo.image || ''}
        data-pin-url={metaInfo.url || ''}
        data-pin-custom="true"
        href="https://www.pinterest.com/pin/create/button/"
        onClick={(event) => {
          const PinUtils = (window as any).PinUtils;
          PinUtils &&
            PinUtils.pinOne({
              url: metaInfo.url,
              media: metaInfo.image,
              description: metaInfo.title
            });
          onClick && onClick({ type: 'pinterest' });
        }}
      >
        <SvgIcon name="brand-pinterest" className={style.iconPinterest} />
      </a>
    </div>
  );
};

interface TwitterShareButtonProps {
  metaInfo: {
    url?: string;
    type?: string;
    title?: string;
    description?: string;
    keyword?: string;
    image?: string;
  };
  onClick?: ({ type }: { type: string }) => any;
  classes?: { container?: string };
}
const TwitterShareButton = ({ metaInfo, onClick, classes }: TwitterShareButtonProps) => {
  const queryParams = new URLSearchParams();
  queryParams.append('text', metaInfo.title || '');
  queryParams.append('url', metaInfo.url || '');
  queryParams.append('hashtags', 'lixibox');

  return (
    <div className={classNames(style.twitterShareButton, classes && classes.container)}>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?${queryParams.toString()}`}
        onClick={() => onClick && onClick({ type: 'twitter' })}
      >
        <SvgIcon name="brand-twitter" className={style.iconPinterest} />
      </a>
    </div>
  );
};

interface SocialShareProps {
  metaStore: any;
  magazineStore: any;
  shopStore: any;
  match: any;
  classes?: { container?: string };
}
const SocialShareDesktop = ({ match: { params }, metaStore, magazineStore, shopStore, classes }: SocialShareProps) => {
  const [isVisible, setVisibility] = useState(true);
  const isOnMagazinePage = !!window.location.pathname.match(/^\/magazine\//);
  const excludeImagePathPattern = '/meta/cover.png';
  const shouldRender =
    metaStore.info &&
    metaStore.info.url &&
    metaStore.info.title &&
    typeof metaStore.info.image === 'string' &&
    !metaStore.info.image.includes(excludeImagePathPattern);
  let entityType = '',
    entityTitle = '',
    entityHash = null,
    entity = null;
  try {
    entityType = (metaStore.info && metaStore.info.type) || '';
    entityTitle = (metaStore.info && metaStore.info.title) || '';
    entityHash = entityType === 'article' ? objectToHash({ slug: params.idPost }) : stringToHash(params.idProduct);
    entity =
      entityType === 'article'
        ? magazineStore.magazineBySlug[entityHash] && magazineStore.magazineBySlug[entityHash].magazine
        : shopStore.productDetail[entityHash] && shopStore.productDetail[entityHash].box;
  } catch (e) {}
  if (!shouldRender) return null;

  const handleOnClick = ({ type }) => {
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action:
        GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE[
          isOnMagazinePage ? 'DESKTOP_SHARE_BUTTON_MAGAZINE_DETAIL' : 'DESKTOP_SHARE_BUTTON_BOX_DETAIL'
        ],
      label: `${
        GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_SHARE_BUTTON[
          isOnMagazinePage ? 'MAGAZINE_DETAIL_CLICK_ON' : 'PRODUCT_DETAIL_CLICK_ON'
        ]
      }${type}`,
      value: 1
    });
    gatewayTrackShare({
      id: entity && entity.id,
      type: entityType === 'article' ? 'magazine' : 'product',
      name: entityTitle,
      provider: type
    });
  };

  return (
    <div className={classNames(style.container, classes && classes.container)}>
      <div
        className={classNames(style.visibilitySwitch, isVisible && style.isVisible)}
        onClick={(e) => setVisibility((visibility) => !visibility)}
      >
        <SvgIcon name={isVisible ? 'close' : 'add'} className={style.iconSwitch} />
      </div>
      <div className={classNames(style.socialShareDesktop, isVisible || style.hidden)}>
        <FacebookShareButton
          metaInfo={metaStore.info}
          classes={{ container: style.shareButton }}
          onClick={handleOnClick}
        />
        <PinterestShareButton
          metaInfo={metaStore.info}
          classes={{ container: style.shareButton }}
          onClick={handleOnClick}
        />
        <TwitterShareButton
          metaInfo={metaStore.info}
          classes={{ container: style.shareButton }}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default SocialShareDesktop;
