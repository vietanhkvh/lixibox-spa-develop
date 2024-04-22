import { CDN_ASSETS_PREFIX } from 'utils/uri';
import Icon from '../../ui/icon';
import Image from 'presentation-component/ui/image';
import WrapLayout from '../../../container/layout/wrap';
import STYLE from './style';

const logo = CDN_ASSETS_PREFIX('/policy/logo.png');

const renderView = () => {
  const iconProps = {
    name: 'map-marker',
    style: STYLE.mapIcon,
    innerStyle: STYLE.mapIcon.inner
  };

  return (
    <div style={STYLE.container}>
      <WrapLayout style={STYLE.wrap}>
        <div style={STYLE.left}>
          <a target={'_blank'} rel="noreferrer" href={'http://online.gov.vn/Home/WebDetails/114032'} style={STYLE.link}>
            <Image alt={''} src={logo} className={'footer-policy-logo'} style={STYLE.logo} />
          </a>
          <div>
            <div style={STYLE.text}>Bản quyền của Công Ty TNHH One Click - www.lixibox.com</div>
            <div style={STYLE.text}>
              Giấy chứng nhận ĐKKD số 0317581963 do Sở Kế hoạch và Đầu tư TPHCM cấp ngày 24/11/2022
            </div>
          </div>
        </div>

        <div style={Object.assign({}, STYLE.text, STYLE.address)}>
          <Icon {...iconProps} />
          Số 16 Đường 34, Kp. 2<br /> P. An Khánh, Tp. Thủ Đức, HCM
        </div>
      </WrapLayout>
    </div>
  );
};
export default renderView;
