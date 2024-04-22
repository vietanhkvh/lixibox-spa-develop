import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import MetaInfo from '../../../container/app/meta-info';
import Icon from '../../../components/ui/icon';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import STYLE from './style';
import styles from './style.module.scss';
const background = CDN_ASSETS_PREFIX('/404/404.png');

const renderView = ({
  icon,
  title,
  description,
  isShowNavigation,
  isShowMetaInfor = true
}: {
  icon?: string;
  title: string;
  description: Array<string>;
  isShowNavigation: boolean;
  isShowMetaInfor?: boolean;
}) => {
  const imageProps = {
    alt: '',
    src: background,
    style: STYLE.image
  };
  const iconProps = {
    name: icon,
    style: STYLE.icon,
    innerStyle: STYLE.icon.inner
  };
  return (
    <div style={STYLE.wrap}>
      <MetaInfo
        url={window.location.href}
        info={{
          url: '404',
          title: title
        }}
      />
      {icon ? <Icon {...iconProps} /> : <Image {...imageProps} />}
      <div style={STYLE.emptyContent}>
        <div style={STYLE.emptyContent.title}>{title}</div>
        {description.map((line, index) => (
          <div key={index} style={STYLE.emptyContent.description}>
            {line}
          </div>
        ))}
      </div>
      {!!isShowNavigation && renderNavigation()}
    </div>
  );
};

renderView.defaultProps = {
  icon: null,
  isShowNavigation: true,
  title: 'Nội dung không tồn tại',
  description: ['Có vẻ như bạn đã vào địa chỉ không đúng', 'hoặc sản phẩm không còn bán trên LIXIBOX']
};

const renderNavigation = () => {
  const shopIconProps = {
    name: 'cart-line',
    style: STYLE.iconShop,
    innerStyle: STYLE.iconInner
  };

  const magazineIconProps = {
    name: 'magazine',
    style: STYLE.iconMagazine,
    innerStyle: STYLE.iconInner
  };

  const shopNavProps = {
    className: styles.linkShop,
    to: '/'
  };

  const magazineNavProps = {
    className: styles.linkMagazine,
    to: '/magazine/'
  };

  return (
    <div style={STYLE.linkNav}>
      <MetaInfo
        url={window.location.href}
        info={{
          url: '404',
          title: 'Trang không tồn tại'
        }}
      />
      <NavLink {...shopNavProps}>
        <Icon {...shopIconProps} />
        <span style={STYLE.textShop}>Lixi Shopping</span>
      </NavLink>

      <NavLink {...magazineNavProps}>
        <Icon {...magazineIconProps} />
        <span style={STYLE.textMagazine}>Lixi Magazine</span>
      </NavLink>
    </div>
  );
};

export default renderView;
