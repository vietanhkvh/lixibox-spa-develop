import { NavLink } from 'react-router-dom';

import { ROUTING_USER_ORDER } from '../../../../routings/path';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

const renderDesktop = () => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <div className={'sub-title'}>Mời bạn xem video hướng dẫn sau và tiến hành đặt hàng qua App Lixibox nhé!</div>
        <div className={'iframe'} style={{ paddingTop: '100%' }}>
          <video controls poster={CDN_ASSETS_PREFIX('/info/buy-on-app-cover-5.png')}>
            <source src={CDN_ASSETS_PREFIX('/info/buy-on-app-1.mp4')} type="video/mp4"></source>
          </video>
        </div>
        <h2>LƯU Ý VỀ MÃ KHUYẾN MÃI</h2>
        <ul>
          <li>Mỗi đơn hàng chỉ áp dụng duy nhất 1 mã khuyến mãi.</li>
          <li>
            Bạn vui lòng liên hệ trực tiếp với Lixibox khi cần kiểm tra đơn hàng. Khi có quà đi kèm với box, món quà đó
            cũng sẽ phải thể hiện trong giỏ của bạn trước khi đặt hàng. Vì vậy việc chọn mã giảm giá đúng ý bạn là cần
            thiết để tránh trường hợp thất vọng vì chọn mã sai.
          </li>
          <li>
            Sau khi mua hàng, Lixibox sẽ gửi riêng các mã khuyến mãi áp dụng cho những lần mua sau của bạn. Những mã
            khuyến mãi này chỉ áp dụng khi đơn hàng được thực hiện bởi tài khoản của bạn - Lixibox sẽ KHÔNG hỗ trợ
            đổi/trả phần quà nếu như bạn nhập nhầm MÃ KHUYẾN MÃI. Vậy nên, vui lòng kiểm tra thật kỹ phần quà nhận được
            sau khi áp dụng Mã khuyến mãi trước khi tiến hành đặt mua sản phẩm
          </li>
        </ul>
        <p>
          Khi có nhu cầu cần kiểm tra trạng thái đơn hàng, vui lòng Kiểm tra Email đơn hàng của Lixibox và click vào{' '}
          <NavLink to={ROUTING_USER_ORDER}>ĐÂY</NavLink> để theo dõi.
        </p>
        <div className={'sub-title'}>Lixibox xin chân thành cảm ơn và chúc bạn có một trải nghiệm mua sắm tốt đẹp!</div>
      </div>
    </div>
  );
};

export default renderDesktop;
