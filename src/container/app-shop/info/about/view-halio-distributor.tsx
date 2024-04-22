import Image from 'presentation-component/ui/image';
import { isMobileVersion } from 'utils/responsive';
import { CDN_ASSETS_PREFIX } from 'utils/uri';

const HalioDistributorInfo = () => {
  const bannerUrl = isMobileVersion()
    ? CDN_ASSETS_PREFIX('/info/distributor/240306_mobile.png')
    : CDN_ASSETS_PREFIX('/info/distributor/240306_desktop.png');
  return (
    <div className={'<info-detail-container'}>
      <div className={'info-content'}>
        <Image src={bannerUrl} alt="Tuyển Đại Lý, Nhà Phân Phối Cho Nhãn Hàng Halio" />
        <h2>Tuyển Đại Lý, Nhà Phân Phối Cho Nhãn Hàng Halio </h2>
        <div className={'sub-title'}>Cơ hội kinh doanh hấp dẫn cùng thương hiệu Halio:</div>
        <p>
          <span className={'bolded'}>Halio</span> là thương hiệu uy tín trong lĩnh vực chăm sóc da và sức khỏe cá nhân,
          được thành lập vào năm 2017 tại Mỹ.
        </p>
        <br />
        <div className={'sub-title'}>Sứ mệnh của Halio:</div>
        <p>- Mang đến những sản phẩm chất lượng cao, an toàn và hiệu quả cho người tiêu dùng.</p>
        <p>- Giúp mọi người tự tin và yêu thương bản thân hơn.</p>
        <p>
          Chúng tôi cung cấp các sản phẩm/dịch vụ chất lượng cao với giá cả cạnh tranh, đáp ứng nhu cầu đa dạng của
          khách hàng.
        </p>
        <br />
        <div className={'sub-title'}> Giá trị cốt lõi của Halio: </div>
        <p>
          - Chất lượng: Halio luôn cam kết về chất lượng sản phẩm. Tất cả các sản phẩm của Halio đều được sản xuất từ
          nguyên liệu cao cấp, an toàn cho da và sức khỏe.
        </p>
        <p>- Hiệu quả: Halio luôn nghiên cứu và phát triển các sản phẩm mang lại hiệu quả cao cho người sử dụng. </p>
        <p>- Uy tín: Halio là thương hiệu uy tín được tin dùng bởi hàng triệu người tiêu dùng tại VN và Mỹ</p>
        <p>
          - Chăm sóc khách hàng: Halio luôn đề cao việc chăm sóc khách hàng. Halio luôn lắng nghe ý kiến phản hồi của
          khách hàng để cải thiện chất lượng sản phẩm và dịch vụ.
        </p>
        <br />
        <div className={'sub-title'}>Halio cung cấp đa dạng các sản phẩm chăm sóc da và sức khỏe cá nhân, bao gồm:</div>
        <p>- Máy rửa mặt</p>
        <p>- Máy triệt lông</p>
        <p>- Máy massage mặt</p>
        <p>- Bàn chải điện</p>
        <p>- Máy tăm nước</p>
        <p>- Máy sấy tóc</p>
        <p>- Máy uốn tóc</p>
        <p>- Máy duỗi tóc</p>
        <p>- Và nhiều sản phẩm khác ...</p>
        <br />
        <div className={'sub-title'}>
          Hiện nay, Halio đang mở rộng thị trường và tìm kiếm đại lý, nhà phân phối trên toàn quốc.
        </div>
        <div className={'sub-title'}>Lợi ích khi hợp tác với Halio:</div>
        <p>- Hưởng mức chiết khấu hấp dẫn </p>
        <p>- Được hỗ trợ về marketing, bán hàng và đào tạo</p>
        <p>- Cơ hội tham gia các chương trình khuyến mãi, ưu đãi</p>
        <p>- Cùng phát triển với thương hiệu uy tín và tiềm năng</p>
        <br />
        <div className={'sub-title'}>Quyền lợi:</div>
        <p>- Được cung cấp sản phẩm/dịch vụ chất lượng cao với giá cả cạnh tranh </p>
        <p>- Được hỗ trợ về marketing, bán hàng và đào tạo</p>
        <p>- Cơ hội tham gia các chương trình khuyến mãi, ưu đãi </p>
        <p>- Cùng phát triển với thương hiệu uy tín và tiềm năng</p>
        <br />
        <div className={'sub-title'}>Hãy liên hệ ngay với Halio để biết thêm thông tin chi tiết:</div>
        <p>
          - Hotline: <a href="tel:0932071190"> 0932071190</a>
        </p>
        <p>
          - Email: <a href="mailto:tania.nguyen@lixibox.com">tania.nguyen@lixibox.com</a>
        </p>
      </div>
    </div>
  );
};

export default HalioDistributorInfo;
