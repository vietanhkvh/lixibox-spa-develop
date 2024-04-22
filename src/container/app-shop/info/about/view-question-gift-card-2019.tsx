const renderDesktop = ({ phone }) => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <h2>THỂ LỆ CHƯƠNG TRÌNH TẶNG GIFTCARD CHÀO XUÂN 2019 </h2>
        <h2>1/ Nội dung: </h2>
        <div className={'answer'}>
          <p>
            - Với đơn hàng từ 500.000Đ trở lên, quý khách nhập mã LIXITET100 để được tặng 01 Giftcard trị giá 100.000Đ
            vào giỏ hàng.{' '}
          </p>
          <p>
            - Với đơn hàng từ 1.000.000Đ trở lên, quý khách nhập mã LIXITET250 để được tặng 01 Giftcard trị giá 250.000Đ
            vào giỏ hàng{' '}
          </p>
          <p>
            - Với đơn hàng từ 1.500.000Đ trở lên, quý khách nhập mã LIXITET400 để được tặng 01 Giftcard trị giá 400.000Đ
            vào giỏ hàng{' '}
          </p>
          <p>
            Mã tặng Giftcard áp dụng cho cả các sản phẩm đang có giá khuyến mãi nhưng không áp dụng cho các combo set
            sản phẩm giá ưu đãi.{' '}
          </p>
        </div>
      </div>
      <div className={'info-content'}>
        <h2>2/ Thời gian tặng gift card:</h2>
        <div className={'answer'}>
          <p>
            Từ ngày 17/01/2019 đến ngày 27/01/2018. Số lượng giftcard có hạn. Chương trình có thể kết thúc trước thời
            hạn mà không cần báo trước.{' '}
          </p>
        </div>
      </div>
      <div className={'info-content'}>
        <h2>3/ Cách sử dụng giftcard: </h2>
        <div className={'answer'}>
          <p>- Thời gian sử dụng giftcard: từ ngày 2/2/2019 - 10/2/2019 </p>
          <p>- Mã giftcard áp dụng cho toàn bộ sản phẩm của các brand Halio, Okame, Lustre và Lixibox. </p>
          <p>
            - Quý khách nhập mã được in trên mỗi giftcard tại bước thanh toán để được giảm tiền cho đơn hàng kế tiếp.{' '}
          </p>
          <p>- Áp dụng được cho các sản phẩm đang sale. Không áp dụng cho beauty box.</p>
          <p>
            - Mỗi một giftcard chỉ được sử dụng 1 lần duy nhất và không được cộng dồn nhiều giftcard trong một đơn hàng.{' '}
          </p>
          <p>
            - Giftcard không có giá trị quy đổi thành tiền mặt và không hoàn trả tiền dư khi mua hàng hoặc để lại tiền
            dư cho đơn hàng kế tiếp.{' '}
          </p>
          <p>Mọi vấn đề liên quan, mời Quý khách chat với Tư vấn viên / hoặc Hotline {phone} </p>
          <p />
        </div>
      </div>
    </div>
  );
};

export default renderDesktop;
