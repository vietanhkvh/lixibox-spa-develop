import Image from 'presentation-component/ui/image';
import Icon from '../../../components/ui/icon';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { storageKey } from '../../../constants/application/client-storage';
import STYLE from './style';
import styles from './style.module.scss';

const background = CDN_ASSETS_PREFIX('/404/404.png');

const renderView = ({ handleBackToHome, handleReload }) => {
  var uuid = localStorage.getItem(storageKey.UUID);
  const t = new Date();
  const ft = [
    t.getHours(),
    ':',
    t.getMinutes(),
    ':',
    t.getSeconds(),
    ' ',
    t.getDate(),
    '/',
    t.getMonth() + 1,
    '/',
    t.getFullYear()
  ].join('');
  return (
    <div id="genericError">
      <div style={STYLE.overlay} />
      <div style={STYLE.wrap}>
        <Image alt={''} src={background} style={STYLE.image} />
        <div style={STYLE.emptyContent}>
          <div style={STYLE.emptyContent.title}>ĐÃ CÓ LỖI XẢY RA</div>
          <div style={STYLE.emptyContent.description}>Có vẻ như bạn đã vào địa chỉ không đúng</div>
          <div style={STYLE.emptyContent.description}>hoặc sản phẩm không còn bán trên LIXIBOX</div>
          <br />
          <div style={STYLE.emptyContent.description}>{`${uuid} - ${ft}`}</div>
        </div>

        <div style={STYLE.linkNav}>
          <div className={styles.linkShop} onClick={() => handleBackToHome()}>
            <Icon name={'cart-line'} style={STYLE.iconShop} innerStyle={STYLE.iconInner} />
            <span style={STYLE.textShop}>Về Trang chủ</span>
          </div>
          <div className={styles.linkMagazine} onClick={() => handleReload()}>
            <Icon name={'refresh'} style={STYLE.iconMagazine} innerStyle={STYLE.iconInner} />
            <span style={STYLE.textMagazine}>Tải lại trang</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default renderView;
