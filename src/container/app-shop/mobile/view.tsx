import Image from 'presentation-component/ui/image';
import { DOWNLOAD_APP_URL } from '../../../constants/application/social';
import WrapLayout from '../../layout/wrap';
import Icon from '../../../components/ui/icon';
import { isMobileVersion } from '../../../utils/responsive';

import STYLE from './style';
import styles from './style.module.scss';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

const iosDownload = CDN_ASSETS_PREFIX('/app-icon/ios-app.png');
const androidDownload = CDN_ASSETS_PREFIX('/app-icon/android-app.png');
const ipImg = CDN_ASSETS_PREFIX('/mobile/ip.png');

const renderHeader = () => {
  const iconProps = {
    style: STYLE.header.logo.icon,
    innerStyle: STYLE.header.logo.iconInner,
    name: 'logo-line'
  };

  const lineProps = {
    style: STYLE.header.logo.line,
    innerStyle: STYLE.header.logo.lineInner,
    name: 'logo-text'
  };

  return (
    <div style={STYLE.header}>
      <a href={'/'} className={styles.headerLogo} style={STYLE.header.logo}>
        <Icon {...iconProps} />
        <Icon {...lineProps} />
      </a>

      <div className={styles.headerContent} style={STYLE.header.content}>
        <div style={STYLE.header.content.title}>Lixibox in your pocket</div>
        <div style={STYLE.header.content.description}>TẢI ỨNG DỤNG LIXIBOX ĐỂ LUÔN ĐẸP MỌI LÚC, MỌI NƠI!</div>
        <div style={STYLE.header.content.link}>
          <a style={STYLE.header.content.link.item} href={DOWNLOAD_APP_URL.shopping.ios}>
            <Image alt="" src={iosDownload} style={STYLE.header.content.link.item.image} />
          </a>
          <a style={STYLE.header.content.link.item} href={DOWNLOAD_APP_URL.shopping.android}>
            <Image alt={''} src={androidDownload} style={STYLE.header.content.link.item.image} />
          </a>
        </div>
      </div>
    </div>
  );
};

const renderTextBlock = (title, description) => (
  <div style={STYLE.content.textBlock}>
    <div style={STYLE.content.textBlock.header}>{title}</div>
    <div style={STYLE.content.textBlock.description}>{description}</div>
  </div>
);

const renderQuoteBlock = () => (
  <div style={STYLE.content.quoteBlock}>
    Còn chờ gì nữa, tải ứng dụng Lixibox và ngay lập tức khám phá điều thú vị đang chờ bạn.
  </div>
);

const renderContent = () => (
  <div style={STYLE.content} className={styles.content}>
    <div style={STYLE.content.left} className={styles.contentLeft}>
      {renderTextBlock('Mua nhanh', 'Mua sắm tất cả sản phẩm lẻ, box có sẵn tại Lixibox nhanh chóng và tiện lợi.')}
      {renderTextBlock(
        'Quản lý gọn',
        'Quản lý thông tin profile làm đẹp cá nhân, thông tin đơn hàng, thanh toán, giao hàng... Lixibox sẽ gởi thông báo chi tiết trong ứng dụng để bạn an tâm với dịch vụ và chỉ cần quan tâm đến việc làm đẹp mà thôi!'
      )}
      {renderTextBlock(
        'Giới thiệu bạn bè',
        'Nhận ngay 50,000đ và 200 Lixicoin cho mỗi đơn hàng giới thiệu thành công trên mobile app.'
      )}
    </div>
    <div style={STYLE.content.right} className={styles.contentRight}>
      {renderTextBlock(
        'Dẫn đầu xu hướng',
        'Sẵn sàng khám phá sản phẩm mới, mẹo làm đẹp, xu hướng làm đẹp mới nhất mỗi ngày từ các chuyên gia, beauty bloggers và cộng đồng.'
      )}
      {renderTextBlock(
        'Đặc quyền ưu tiên',
        'Nhận thông báo mã giảm giá, chương trình khuyến mãi/ưu đãi  mới nhất và đặc biệt là ưu đãi giới hạn chỉ dành riêng cho ứng dụng Lixibox.'
      )}
      {renderQuoteBlock()}
    </div>
    <Image alt={''} src={ipImg} style={STYLE.content.phone} className={styles.contentPhone} />
  </div>
);

const renderBackground = () => (
  <div>
    <div style={STYLE.bg.left} />
    <div style={STYLE.bg.right} />
    <div style={STYLE.bg.bottom} />
  </div>
);

const renderView = () => {
  return (
    <div style={STYLE.container} className={'mobile-deeplink-gradient'}>
      <WrapLayout style={STYLE.wrap}>
        {renderHeader()}
        {renderContent()}
        {!isMobileVersion() && renderBackground()}
      </WrapLayout>
    </div>
  );
};

export default renderView;
