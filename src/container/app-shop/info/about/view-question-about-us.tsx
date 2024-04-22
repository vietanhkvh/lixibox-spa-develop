interface RenderDesktop {
  lixicoinPerFeedback: number;
}
const renderDesktop = ({ lixicoinPerFeedback }: RenderDesktop) => {
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <h2>Lixicoin là gì?</h2>
        <div>
          <p>
            Lixicoin là số điểm tích lũy từ mỗi lần mua hàng trên website của Lixibox. Giá trị của Lixicoin: 1 Lixicoin
            = 1.000 VND. Số Lixicoin sẽ được cộng vào tài khoản Lixibox của bạn mỗi khi đơn hàng của bạn được giao thành
            công.
          </p>
        </div>
        <h2>Làm sao để có Lixicoin?</h2>
        <div>
          <p>
            Cách 1: Mua hàng từ Lixibox.
            <br />
            Cách 2: Giới thiệu bạn bè để được nhận 200 Lixicoin.
            <br />
            Cách 3: Chụp hình và chia sẻ cảm nhận về trải nghiệm của bạn với Lixibox lên Facebook, Instagram để nhận 100
            Lixicoin, lưu ý: mỗi order chỉ chia sẻ được 1 lần.
            <br />
            {!!lixicoinPerFeedback && (
              <div>
                Cách 4: Viết feedback về sản phẩm đã mua để nhận {lixicoinPerFeedback} Lixicoin cho mỗi feedback trên
                web.
              </div>
            )}
          </p>
        </div>
        <h2>Lixicoin dùng để làm gì?</h2>
        <div>
          <p>
            Lixicoin được sử dụng để đổi miễn phí các sản phẩm trong chương trình Đổi Lixicoin của Lixibox, và trong các
            chương trình ưu đãi sắp tới của Lixibox.
          </p>
        </div>
        <h2>Chương trình Đổi Lixicoin là gì? (Khi nào thì được đổi?)</h2>
        <div>
          <p>
            Đây là chương trình đổi Lixicoin đã tích lũy lấy sản phẩm với giá trị tương ứng (giá trị quy đổi do Lixibox
            quy định). Chương trình diễn ra suốt năm nên bạn có thể đổi quà bắt cứ lúc nào.
          </p>
        </div>
        <h2>Bao nhiêu Lixicoin thì có thể tham gia chương trình?</h2>
        <div>
          <p>
            Ngay sau khi hoàn thành đơn hàng đầu tiên, Lixicoin sẽ được cộng vào tài khoản của bạn để bạn có thể đổi
            quà. Lixibox không giới hạn số Lixicoin tối thiểu.
          </p>
        </div>
        <h2>Làm thế nào để có thể đổi Lixicoin?</h2>
        <div>
          <p>
            Bước 1: Tích lũy đủ số Lixicoin tối thiểu để tham gia chương trình. Bước 2: Chọn các sản phẩm tương ứng với
            số Lixicoin có được. Bước 3: Làm các thao tác như khi mua sản phẩm (bỏ vào giỏ hàng, thanh toán sử dụng
            Lixicoin) Sau khi đổi, số lượng Lixicoin của bạn sẽ giảm đi theo số lượng Lixicoin tương ứng với sản phẩm.
            Cấp độ thành viên vẫn được giữ nguyên như trước khi đổi sản phẩm.
          </p>
        </div>
        <h2>Sản phẩm đổi Lixicoin là gì?</h2>
        <div>
          <p>
            Sản phẩm để đổi Lixicoin là sản phẩm dưỡng da, makeup full size và mini size mới, thuộc các nhãn hàng cao
            cấp được Lixibox tuyển chọn.
          </p>
        </div>
        <h2>Số lượng sản phẩm có thể đổi là bao nhiêu?</h2>
        <div>
          <p>
            Mỗi tài khoản có thể đổi được nhiều món sản phẩm khác nhau tuỳ vào số Lixicoin tích luỹ được. Tuy nhiên một
            sản phẩm chỉ đổi được một lần do số lượng có hạn. Số lượng sản phẩm có giới hạn, nên hệ thống sẽ ưu tiên cho
            các khách hàng đổi sản phẩm sớm.
          </p>
        </div>
        <h2>Mình có thể chuyển Lixicoin giữa các tài khoản cùng chủ thể với nhau không?</h2>
        <div>
          <p>Hiện tại Lixibox chưa cung cấp tính năng trao đổi Lixicoin giữa các tài khoản.</p>
        </div>
        <h2>Sau khi đổi Lixicoin thì cấp độ thành viên còn được giữ nguyên không?</h2>
        <div>
          <p>Sau khi đổi thì cấp độ thành viên của bạn sẽ vẫn được giữ nguyên.</p>
        </div>
        <h2>Sản phẩm sau khi đổi từ Lixicoin có thể trả lại không?</h2>
        <div>
          <p>Sản phẩm sau khi đổi sẽ không thể hoàn trả.</p>
        </div>
      </div>
    </div>
  );
};

export default renderDesktop;
