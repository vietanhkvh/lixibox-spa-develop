const renderDesktop = ({ phone }) => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <h2>Nội dung</h2>
        <p>
          Với đơn hàng từ 400.000Đ trở lên, quý khách nhập mã Lixi100 để được tặng 01 Giftcard trị giá 100.000Đ vào giỏ
          hàng.
        </p>
        <p>
          Với đơn hàng từ 700.000Đ trở lên, quý khách nhập mã Lixi200 để được tặng 01 Giftcard trị giá 200.000Đ vào giỏ
          hàng.
        </p>
        <p>
          Với đơn hàng từ 1.000.000Đ trở lên, quý khách nhập mã Lixi400 để được tặng 01 Giftcard trị giá 400.000Đ vào
          giỏ hàng.
        </p>
        <h2>Thời gian tặng gift card</h2>
        <p>
          Từ ngày 25/12/2017 đến ngày 31/01/2018. Số lượng giftcard có hạn. Chương trình có thể kết thúc trước thời hạn
          mà không cần báo trước.
        </p>
        <h2>Cách sử dụng giftcard</h2>
        <p>Thời gian sử dụng giftcard: từ ngày 10/02/2018 cho đến ngày 20/02/2018.</p>
        <p>Quý khách nhập mã được in trên mỗi giftcard vào bước thanh toán để được giảm tiền cho đơn hàng kế tiếp.</p>
        <p>Mỗi một giftcard chỉ được sử dụng 1 lần duy nhất.</p>
        <p>
          Giftcard không có giá trị quy đổi thành tiền mặt và không hoàn trả tiền dư khi mua hàng hoặc để lại tiền dư
          cho đơn hàng kế tiếp.
        </p>
        <p>Mọi vấn đề liên quan, mời Quý khách chat với Tư vấn viên / hoặc hotline {phone}</p>
      </div>
    </div>
  );
};

export default renderDesktop;
