import { SOCIAL_URL } from '../../../../constants/application/social';

const renderDesktop = ({ phone, bankAccount }) => (
  <div className={'<info-detail-container'}>
    <div className={'info-content'}>
      <h2>I. Chính sách giao hàng</h2>
      <div className={'sub-title'}>1. Hình thức và thời gian giao hàng</div>
      <p>- Phạm vi giao hàng: toàn quốc</p>
      <p>
        - Phí giao hàng: phí giao hàng sẽ được tính dựa trên đơn hàng và khoảng cách địa lý của khách hàng. Phí giao
        hàng sẽ được thông báo tại bước đặt hàng.
      </p>
      <p>- Thời gian giao hàng:</p>
      <p>
        + Sau khi quý khách hoàn tất đặt hàng, bộ phận Chăm sóc khách hàng của Lixibox sẽ gọi điện cho quý khách để xác
        nhận. Sau khi xác nhận thành công, đơn hàng sẽ được xử lý và ship đi trong vòng 48h (không tính chủ nhật và ngày
        lễ).
      </p>
      <p>
        + Thời gian vận chuyển hàng dự kiến từ 2 - 5 ngày làm việc tuỳ vào khoảng cách từ kho hàng đến địa chỉ nhận hàng
        của khách hàng (không tính thứ bảy, chủ nhật hay các ngày lễ tết).
      </p>
      <div className={'sub-title'}>2. Chính sách kiểm hàng</div>
      <p>
        Khách hàng được quyền kiểm tra hàng trước khi nhận. Việc kiểm tra được thực hiện ngay tại thời điểm nhận trước
        mặt đơn vị giao hàng. Lưu ý kiểm tra hàng là kiểm tra ngoại quan, không bao gồm việc bóc xé tem, mác sản phẩm,
        dùng thử.
      </p>
      <div>
        <p className={'bolded'}>Quy trình nhận hàng</p>
        <i>
          * Nhằm hỗ trợ tối đa Khách Hàng trong suốt quá trình mua sắm và trải nghiệm sản phẩm dịch vụ tại Lixibox,
          Khách Hàng vui lòng nhận hàng với đầy đủ quy trình sau theo quy định của Lixibox để được hỗ trợ tốt nhất nếu
          xảy ra vấn đề phát sinh
        </i>
        <p>
          Bước 1: Khi nhận hàng, Khách Hàng vui lòng mở hộp và kiểm tra kĩ tất cả các sản phẩm trước mặt đơn vị giao
          hàng
        </p>
        <p>
          Bước 2: Khách Hàng kiểm tra tình trạng và số lượng của sản phẩm đã đúng với đơn hàng đã đặt chưa. Nếu đúng thì
          Khách Hàng tiến hành thanh toán và nhận hàng, Trong các trường hợp:
        </p>
        <p>- Thiếu sản phẩm</p>
        <p>- Sản phẩm không đúng với mẫu mã đặt hàng</p>
        <p>- Sảm phẩm bị hư hỏng</p>
        <p>
          Khách Hàng vui lòng từ chối nhận hàng
          {phone &&
            ` và gọi đến
       số Hotline ${phone} để được hỗ trợ sớm nhất`}
          .
        </p>
        <p className={'bolded'}>Lưu ý:</p>
        <p>
          Khi nhận hàng từ shipper, anh/chị vui lòng kiểm tra tem niêm phong và mở hộp kiểm tra kỹ tất cả các sản phẩm
          trước mặt đơn vị vận chuyển. Nết thấy hàng đầy đủ, đúng sản phẩm và nguyên vẹn thì anh/chị mới ký nhận hàng.
          Nếu hàng hóa bị thiếu, không đúng, hoặc hư hỏng, anh/chị vui lòng từ chối nhận hàng và nhắn tin đến Messenger
          Lixibox
          {phone &&
            ` hoặc gọi đến
              số Hotline ${phone} để được hỗ trợ nhanh nhất`}
        </p>
        <p>
          Trường hợp anh/chị không tiện đồng kiểm hoặc nhờ người nhà nhận hàng giùm, anh/chị vui lònng quay lại đoạn
          clip ngắn kể từ lúc mở hàng còn tem niêm phong cho đến lúc kiểm tra sản phẩm bên trong. Nếu có vấn đề phát
          sinh, anh/chị hãy gửi clip đến fanpage của Lixibox để được hỗ trợ nhanh nhất. Lixibox sẽ không chịu trách
          nhiệm trong trường hợp anh/chị báo mất mát, hư hỏng sau khi đã ký biên bản nhận hàng và đơn vị vận chuyển đã
          rời đi hoặc không có clip chứng minh kiện hàng gặp vấn đề.
        </p>

        <i>
          * Việc kiểm tra hàng chỉ là ngoại quan(bên ngoài), số lượng, tên, ... của sản phẩm, KHÔNG bao gồm mở seal(niêm
          phong) riêng của sản phẩm(gây ảnh hưởng đến tem dán niêm phong, bao bì sản phẩm, ...) hay kiểm tra sâu(cắm
          điện, sử dụng thử, ...)
        </i>
        <p className={'bolded'}>- Lixibox chỉ hỗ trợ Khách Hàng đổi trả sản phẩm 1 lần duy nhất</p>
        <p>
          - Sau 3 ngày kể từ khi Khách Hàng đã nhận được hàng nhưng không có thông báo khiếu nại đổi trả hàng, Lixibox
          có quyền từ chối yêu cầu đổi trả hàng từ phiá Khách Hàng (Trừ các truờng hợp bảo hành)
        </p>
        <p>
          - Trong trường hợp Lixibox không liên hệ được với Khách Hàng từ thông tin mà Khách Hàng cung cấp, Lixibox sẽ
          không chịu bất kỳ trách nhiệm, mất mát liên quan nào của Khách Hàng
        </p>
        <p>
          - Trong tất cả các trường hợp lỗi từ Khách Hàng, Lixibox có quyền từ chối yêu cầu khiếu nại và miễn trách
          nhiệm liên quan
        </p>
        <p className={'bolded'}>
          - Lixibox không nhận đổi trả hàng trong ngày - Khi nhận hàng đổi trả từ Khách Hàng bộ phận CSKH cần kiểm tra
          và xử lý vấn đề của Khách Hàng theo trình tự và quy định của công ty nhằm bảo vệ quyền lợi của Khách Hàng theo
          cách tốt nhất. Vì vậy Lixibox không thể nhận đổi trả hàng trong ngày. Kính mong Quý Khách Hàng thông cảm về sự
          bất tiện này
        </p>
      </div>
      <div className={'sub-title'}>3. Trách nhiệm các bên trong quá trình cung cấp dịch vụ giao nhận</div>
      <p>
        - Đối tác vận chuyển có trách nhiệm cung cấp dịch vụ vận chuyển theo đúng yêu cầu, tiêu chuẩn dịch vụ đã đề ra
        và đã được thỏa thuận trong hợp đồng hợp tác; cam kết thực hiện chính sách giao hàng và chính sách bồi thường
        thiệt hại nếu lỗi do đối tác vận chuyển gây ra thiệt hại trong quá trình cung cấp dịch vụ.
      </p>
      <p>
        - Lixibox sẽ cung cấp đầy đủ phiếu mua hàng, hoá đơn, chứng từ liên quan tới sản phẩm khi giao hàng cho đơn vị
        giao nhận
      </p>
      <p>
        - Đơn vị vận chuyển có trách nhiệm cung cấp các chứng từ liên quan tới hàng hóa khi được yêu cầu bởi cơ quan
        quản lý nhà nước có thẩm quyền trong quá trình thực hiện dịch vụ giao nhận.
      </p>
      <h2>II. Chính sách thanh toán</h2>
      <div className={'sub-title'}>HIỆN LIXIBOX CÓ 4 HÌNH THỨC THANH TOÁN CHO KHÁCH HÀNG LỰA CHỌN:</div>
      <div className={'sub-title'}>
        1. Thanh toán bằng Thẻ quốc tế Visa, Master, JCB qua Cổng thanh toán Onepay (áp dụng cho mọi đơn hàng):
      </div>
      <p>
        Sau khi khách hàng thanh toán qua cổng Onepay, hệ thống sẽ tự động gởi SMS xác nhận cho khách, đơn hàng sẽ được
        xử lý và ship đi trong vòng 24h.
      </p>
      <div className={'sub-title'}>
        2. Thanh toán Chuyển khoản qua Thẻ ATM nội địa/ Internet Banking (áp dụng cho mọi đơn hàng):
      </div>
      <p>
        Sau khi khách hàng đặt hàng thành công, hệ thống sẽ gửi SMS và email xác nhận đặt hàng gồm có mã đơn hàng và
        thông tin chuyển khoản. Khách hàng có thể chuyển qua iBanking, chuyển tiền mặt ở ngân hàng, chuyển qua ATM...
        Khi chuyển quý khách lưu ý ghi rõ mã đơn hàng để tiện trong việc kiểm tra và cập nhập thanh toán.
      </p>
      {/* TODO: after 11/3/24, use the bankAccount var instead of hard code */}
      {/* {bankAccount && (
        <p>
          Thông tin chuyển khoản của Lixibox như sau:
          <br />- Tên người nhận: {bankAccount.owner}
          <br />- Số tài khoản: {bankAccount.number}
          <br />- Ngân hàng: {bankAccount.bank}
          <br />- Nội dung chuyển khoản: Mã đơn hàng & Số điện thoại mua hàng
        </p>
      )} */}
      <p>
        Thông tin chuyển khoản của Lixibox như sau:
        <br />- Tên người nhận: Công ty TNHH One Click
        <br />- Số tài khoản: 38061827
        <br />- Ngân hàng: ACB
        <br />- Nội dung chuyển khoản: Mã đơn hàng & Số điện thoại mua hàng
      </p>
      <p>
        Trường hợp quý khách chuyển khoản qua cây ATM không ghi được nội dung, vui lòng giữ lại biên nhận và{' '}
        {phone
          ? ` gọi vào
        hotline  ${phone} hoặc `
          : ''}{' '}
        gửi tin nhắn vào fanpage:{' '}
        <a target="_blank" rel="noreferrer" href={SOCIAL_URL.facebook}>
          {SOCIAL_URL.facebook}
        </a>{' '}
        để được hỗ trợ xác nhận thanh toán. Sau khi đơn hàng được cập nhật thanh toán thành công sẽ được xử lý và ship
        đi trong vòng 24h.
      </p>
      <div className={'sub-title'}>3. Thanh toán qua ví MoMo:</div>
      <p>
        Quý khách cần tải ứng dụng MoMo về điện thoại, liên kết với ngân hàng và nạp tiền vào ví MoMo sau đó đặt hàng
        trên Lixibox và chọn vào phương thức thanh toán bằng Ví MoMo.
      </p>
      <div className={'sub-title'}>
        4. Thanh Toán Tiền Mặt Khi Nhận Hàng - COD (áp dụng cho mọi đơn hàng có địa chỉ nhận hàng tại thành phố Hồ Chí
        Minh, Hà Nội và các đơn hàng từ 400,000đ trở lên có địa chỉ nhận hàng tại các tỉnh thành khác):
      </div>
      <p>
        Sau khi quý khách hoàn tất đặt hàng, bộ phận Chăm sóc khách hàng của Lixibox sẽ gọi điện cho quý khách để xác
        nhận. Sau khi xác nhận thành công, đơn hàng sẽ được xử lý và ship đi trong vòng 24h.
      </p>
    </div>
  </div>
);

export default renderDesktop;
