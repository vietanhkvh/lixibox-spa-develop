import { SOCIAL_URL } from '../../../../constants/application/social';

const renderDesktop = ({ phone }) => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <p>
          Lixibox thực hiện quản lý tự động trên hệ thống bảo hành và đổi trả sản phẩm với các sản phẩm có chính sách
          bảo hành. Chúng tôi không phát hành bất kỳ loại giấy tờ bảo hành nào. Quý khách cần thực hiện bảo hành sản
          phẩm, vui lòng thao tác theo hướng dẫn:
        </p>
        <div className={'sub-title'}>
          1. Quý khách liên lạc trực tiếp với Lixibox qua hotline {phone} hoặc fanpage{' '}
          <a href={SOCIAL_URL.facebook} target={'_blank'} rel="noreferrer">
            {SOCIAL_URL.facebook}
          </a>
        </div>
        <div className={'sub-title'}>
          2. Quý khách cung cấp mã đơn hàng hoặc số điện thoại đặt hàng để nhân viên chăm sóc khách hàng kiểm tra trên
          hệ thống quản lý.
        </div>
        <div className={'sub-title'}>
          3. Quý khách gửi hàng theo hướng dẫn của nhân viên chăm sóc khách hàng. Quý khách lưu ý, quý khách sẽ nhận
          được hỗ trợ 50% chi phí giao hàng phát sinh trong quá trình bảo hành.
        </div>
        <p>
          Lưu ý: khi gửi hành về bảo hành quý khách vui lòng gửi kèm tất cả phụ kiện (nếu có), nếu sản phẩm bị thiếu phụ
          kiện Lixibox sẽ không nhận bảo hành.
        </p>
        <p>Lixibox xin chân thành cảm ơn!</p>
      </div>
    </div>
  );
};

export default renderDesktop;
