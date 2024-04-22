import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import { navigateNewTab } from '../../../utils/navigate';
import WrapLayout from '../../../container/layout/wrap';
import { ROUTING_SHOP_INDEX } from '../../../routings/path';
import { SOCIAL_URL, DOWNLOAD_APP_URL } from '../../../constants/application/social';
import TrackVisibility from 'lixibox-react-on-screen';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

import * as LAYOUT from '../../../style/layout';
import Icon from '../../ui/icon';
import STYLE from './style';

const iosDownload = CDN_ASSETS_PREFIX('/app-icon/ios-app.png');
const androidDownload = CDN_ASSETS_PREFIX('/app-icon/android-app.png');
const QR_CODE = CDN_ASSETS_PREFIX('/footer/lixibox-app-qr.png');

export const renderPayment = ({ paymentList }) => {
  const generateItemProps = (item) => ({
    key: `payment-footer-${item.id}`,
    src: item.image,
    alt: '',
    style: STYLE.payment.list.item
  });

  return (
    <div style={Object.assign({}, STYLE.payment, STYLE.col)}>
      <div style={STYLE.title}>Phương thức thanh toán</div>
      <div style={STYLE.payment.description}>Chuyển khoản hoặc Thẻ tín dụng được bảo mật bởi Comodo</div>

      <div style={STYLE.payment.list}>
        {Array.isArray(paymentList) &&
          paymentList.map((item) => {
            const itemProps = generateItemProps(item);
            return <Image {...itemProps} />;
          })}
      </div>

      <a href={'//mixpanel.com/f/partner'} style={STYLE.payment.mixpanel}>
        <Image
          {...{
            src: '//cdn.mxpnl.com/site_media/images/partner/badge_light.png',
            style: STYLE.payment.mixpanel.logo,
            alt: ''
          }}
        />
      </a>
    </div>
  );
};

const renderLogo = () => {
  const linkProps = {
    to: ROUTING_SHOP_INDEX,
    style: Object.assign({}, LAYOUT.flexContainer.left, LAYOUT.flexContainer.verticalCenter, STYLE.logo)
  };

  return (
    <NavLink {...linkProps}>
      <Icon name={'logo-text'} style={STYLE.logo.text} />
    </NavLink>
  );
};

const renderInfo = ({ referalCode, isVisible, phone }) => {
  return (
    <div style={Object.assign({}, STYLE.col, STYLE.bigCol)}>
      {renderLogo()}

      <div style={Object.assign({}, STYLE.text, { marginBottom: 20 })}>
        Lixibox - Bringing affordable luxury to the urban population
      </div>

      {/* social */}

      <div style={STYLE.download}>
        <div style={STYLE.download.left}>
          <Image
            src={!!isVisible ? QR_CODE : ''}
            style={Object.assign({}, STYLE.download.qr, { opacity: !!isVisible ? 1 : 0 })}
            alt={''}
          />
        </div>
        <div style={STYLE.download.right}>
          <a style={STYLE.download.right.item} target={'_blank'} rel="noreferrer" href={DOWNLOAD_APP_URL.shopping.ios}>
            <Image
              alt={''}
              src={!!isVisible ? iosDownload : ''}
              style={Object.assign({}, STYLE.download.image, { opacity: !!isVisible ? 1 : 0 })}
            />
          </a>
          <a
            style={STYLE.download.right.item}
            target={'_blank'}
            rel="noreferrer"
            href={DOWNLOAD_APP_URL.shopping.android}
          >
            <Image
              src={!!isVisible ? androidDownload : ''}
              style={Object.assign({}, STYLE.download.image, { opacity: !!isVisible ? 1 : 0 })}
              alt={''}
            />
          </a>
        </div>
      </div>
      <a href={`tel:${phone}`} style={STYLE.hotline}>
        Hotline:
        <span style={STYLE.hotline.phone}>{phone}</span>
      </a>
      {renderSocialList()}
    </div>
  );
};

const renderNavigationList = ({ data, openModal }) => (
  <div style={Object.assign({}, STYLE.col, STYLE.smallCol)}>
    <div style={STYLE.title} className={'headline-typo'}>
      {data.title}
    </div>
    <nav style={STYLE.nav}>
      {data &&
        Array.isArray(data.list) &&
        data.list.map((item, index) => {
          const parentProps = {
            style: STYLE.nav.link,
            key: `link-${item.id}-${index}`,
            target: item.target
          };

          if ('external' === item.type) {
            return (
              <a {...parentProps} href={item.link}>
                {item.title}
              </a>
            );
          }

          return (
            <NavLink {...parentProps} to={item.link}>
              {item.title}
            </NavLink>
          );
        })}
    </nav>
  </div>
);

const renderSocialList = () => {
  const generateIconProps = (type, link) => ({
    name: type,
    style: Object.assign({}, STYLE.iconList.icon, STYLE.iconList.icon[type]),
    innerStyle: STYLE.iconList.icon[type].inner,
    onClick: () => navigateNewTab(link)
  });

  const facebookIconProps = generateIconProps('facebook', SOCIAL_URL.facebook);
  const instagramIconProps = generateIconProps('instagram', SOCIAL_URL.instagram);
  const messagerIconProps = generateIconProps('messager', SOCIAL_URL.messager);
  const pinterestIconProps = generateIconProps('pinterest', SOCIAL_URL.pinterest);
  const zaloIconProps = generateIconProps('zalo', SOCIAL_URL.zalo);

  return (
    <div style={STYLE.iconList}>
      <Icon {...facebookIconProps} />
      <Icon {...instagramIconProps} />
      <Icon {...messagerIconProps} />
      <Icon {...pinterestIconProps} />
      <Icon {...zaloIconProps} />
    </div>
  );
};

const renderView = ({ categoryNavigation, infoLinkNavigation, guideLinkNavigation, referalCode, openModal, phone }) => (
  <TrackVisibility style={STYLE} offset={500}>
    {({ isVisible }) => (
      <WrapLayout style={STYLE.container}>
        {renderInfo({ referalCode, isVisible, phone })}
        {renderNavigationList({ data: categoryNavigation, openModal })}
        {renderNavigationList({ data: guideLinkNavigation, openModal })}
        {renderNavigationList({ data: infoLinkNavigation, openModal })}
      </WrapLayout>
    )}
  </TrackVisibility>
);

export default renderView;
