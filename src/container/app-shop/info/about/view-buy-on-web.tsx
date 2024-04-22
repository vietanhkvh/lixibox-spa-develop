import { NavLink } from 'react-router-dom';

import { ROUTING_USER_ORDER } from '../../../../routings/path';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

const renderDesktop = ({ phone = '' }) => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <h2>Bước 1 - Đăng ký tài khoản:</h2>
        <p>
          Để bắt đầu mua hàng trên Lixibox và được hưởng những ưu đãi hấp dẫn nhất, hãy dành 1 phút để tạo tài khoản
          Lixibox bằng Email cá nhân hoặc Tài khoản Facebook. Ở những lần mua hàng sau, bạn chỉ cần truy cập Website
          Lixibox, đăng nhập và tiến hành mua sắm mà không cần tạo tài khoản mới
        </p>
        <div className={'iframe'}>
          <video controls poster={CDN_ASSETS_PREFIX('/info/buy-on-web-cover-1.png')}>
            <source src={CDN_ASSETS_PREFIX('/info/buy-on-web-5.mp4')} type="video/mp4"></source>
          </video>
        </div>
        <h2>Bước 2 - Tìm kiếm và tìm hiểu thông tin sản phẩm:</h2>
        <p>Để tìm kiếm sản phẩm phù hợp với nhu cầu bản thân, bạn có thể tham khảo 2 cách sau:</p>
        <ul>
          <li>Cách 1:Tham khảo theo từng hạng mục phù hợp với nhu cầu của anh bạn trong Menu của Lixibox</li>
          <li>Cách 2: Nhập tên sản phẩm hoặc tên thương hiệu cần tìm vào thanh "Tìm kiếm"</li>
        </ul>
        <div className={'iframe'}>
          <video controls poster={CDN_ASSETS_PREFIX('/info/buy-on-app-cover-2.png')}>
            <source src={CDN_ASSETS_PREFIX('/info/buy-on-web-2.mp4')} type="video/mp4"></source>
          </video>
        </div>
        <p>
          Sau khi tìm được sản phẩm ưng ý, bạn có thể tìm hiểu thông tin chi tiết về sản phẩm tại mục THÔNG TIN. Ngoài
          ra, bạn cũng có thể tham khảo thêm Feedback của các khách hàng khác đã mua và trải nghiệm sản phẩm tại mục
          ĐÁNH GIÁ.
        </p>
        <h2>Bước 3 - Tiến hành đặt hàng:</h2>
        <p>
          Bạn vui lòng kiểm tra thật kỹ sản phẩm trong giỏ hàng của mình và chọn mã khuyến mãi tại ô “Mã giảm giá” theo
          nhu cầu của bản thân.
        </p>
        <div className={'iframe'}>
          <video controls poster={CDN_ASSETS_PREFIX('/info/buy-on-app-cover-3.png')}>
            <source src={CDN_ASSETS_PREFIX('/info/buy-on-web-3.mp4')} type="video/mp4"></source>
          </video>
        </div>
        <p>
          Khi cần kiểm tra đơn hàng, bạn vui lòng liên hệ trực tiếp với Lixibox qua Fanpage{' '}
          {phone ? ` hoặc hotline ${phone}` : ''}
        </p>
        <div className={'sub-title'}>LƯU Ý VỀ MÃ KHUYẾN MÃI</div>
        <ul>
          <li>Mỗi đơn hàng chỉ áp dụng duy nhất 1 mã khuyến mãi.</li>
          <li>
            Khi có quà đi kèm với đơn hàng, món quà đó cũng phải thể hiện trong giỏ hàng của bạn trước khi đặt hàng. Vì
            vậy việc chọn mã khuyến mãi đúng ý bạn là cần thiết để tránh trường hợp thất vọng vì chọn mã sai. Bạn vui
            lòng liên hệ trực tiếp với fanpage Lixibox khi cần hỗ trợ về mã khuyến mãi
          </li>
          <li>
            Sau khi mua hàng, Lixibox sẽ gửi riêng các mã khuyến mãi áp dụng cho những lần mua sau của bạn. Những mã
            khuyến mãi này chỉ áp dụng khi đơn hàng được thực hiện bởi tài khoản của bạn. - Lixibox sẽ KHÔNG hỗ trợ
            đổi/trả phần quà nếu như bạn nhập nhầm MÃ KHUYẾN MÃI. Vậy nên, vui lòng kiểm tra thật kỹ phần quà nhận được
            sau khi áp dụng Mã khuyến mãi trước khi tiến hành đặt mua sản phẩm
          </li>
        </ul>
        <h2>Bước 4 - Phương thức thanh toán & Cách thức nhận hàng:</h2>
        <p>
          Nhập địa chỉ giao hàng, đồng thời lựa chọn phương thức nhận hàng, thanh toán một cách chính xác và chọn các
          dịch vụ kèm theo nếu có nhu cầu. Sau khi xác nhận đặt hàng, bạn sẽ nhận được mã đơn hàng và tin nhắn/email từ
          Lixibox. Hãy lưu lại mã đơn hàng để bộ phận CSKH của chúng tôi có thể giải quyết các thắc mắc cho bạn trong
          trường hợp cần thiết.
        </p>
        <div className={'iframe'}>
          <video controls poster={CDN_ASSETS_PREFIX('/info/buy-on-app-cover-4.png')}>
            <source src={CDN_ASSETS_PREFIX('/info/buy-on-web-4.mp4')} type="video/mp4"></source>
          </video>
        </div>
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
