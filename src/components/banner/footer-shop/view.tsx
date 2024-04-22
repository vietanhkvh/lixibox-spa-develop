import AdLink from '../../../presentation-component/ui/ad-link';
import Image from 'presentation-component/ui/image';
import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

import { getNavLink, isExternalLink } from '../../../utils/validate';
import STYLE from './style';

const generateImageProps = (item) => ({
  style: STYLE.banner.image,
  src: item.cover_image.original_url,
  alt: ''
});

const renderNavLink = (link, $index) => {
  const generalProps = {
    target: !!isExternalLink(link) ? '_blank' : '',
    rel: !!isExternalLink(link) ? 'nofollow' : 'dofollow',
    onClick: () => {
      gaEventTracking({
        category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
        action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.FOOTER_BANNER_IMAGES,
        label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.FOOTER_BANNER_IMAGES.CLICK_ON + link,
        value: 1
      });
    },
    style: STYLE.banner.link,
    key: `banner-footer-${$index}`
  };

  if (!!isExternalLink(link)) {
    const aProps = {
      href: getNavLink(link),
      ...generalProps
    };

    // TODO: Restrucutre this component. Anchor body should not be empty
    // Ref.: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/anchor-has-content.md
    return <a {...aProps}> </a>;
  }

  const navLinkProps = {
    to: getNavLink(link),
    ...generalProps
  };

  return <AdLink {...navLinkProps} />;
};

function renderItem(item, index) {
  const imageProps = generateImageProps(item);

  if (!item || !item.links || !item.links.length) return null;

  return (
    <div key={index} style={STYLE.banner.container}>
      <div style={STYLE.banner.linkList}>{item.links.map(renderNavLink)}</div>
      <div style={STYLE.banner.innerContainer}>
        <Image {...imageProps} />
      </div>
    </div>
  );
}

const renderView = ({ list }) => {
  return (
    <div style={STYLE}>
      <div style={STYLE.heading} className={'headline-typo'}>
        Chương trình nổi bật
      </div>
      <div style={STYLE.container}>{Array.isArray(list) && list.map(renderItem)}</div>
    </div>
  );
};

export default renderView;
