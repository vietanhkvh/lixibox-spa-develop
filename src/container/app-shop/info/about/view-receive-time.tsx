const renderDesktop = () => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <div className={'sub-title'}>1. Đối với đơn hàng tiêu chuẩn:</div>
        <p>
          Đơn hàng ở Hồ Chí Minh, Hà Nội: 1 - 2 ngày làm việc.
          <br />
          Đơn hàng ở các tỉnh thành khác: 2 - 5 ngày làm việc.
        </p>
        <div className={'sub-title'}>2. Đối với đơn hàng đặt trước (Pre-order):</div>
        <p>
          Thời gian nhận hàng dự kiến sẽ hiển thị trên website, phía bên dưới giá của sản phẩm tại giao diện đặt hàng
          của quý khách. Quý khách có thể kiểm tra thông tin ngày nhận hàng dự kiến trong email xác nhận đơn hàng do hệ
          thống tự động gửi về.
        </p>
        <p>
          Mọi thay đổi liên quan tới thời gian nhận hàng bộ phận Chăm sóc khách hàng của Lixibox sẽ liên lạc trực tiếp
          với quý khách.
        </p>
      </div>
    </div>
  );
};

export default renderDesktop;
