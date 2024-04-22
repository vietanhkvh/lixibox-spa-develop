import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductSummary from '..';

const productBox = {
  id: 7048,
  brand_name: 'LUSTRE MAKEUP',
  is_individual: true,
  is_saleable: true,
  name: 'Bộ cọ trang điểm chuyên nghiệp Lustre Pro Makeup Brush Set 10 pcs - Gold Edition',
  original_price: 2000000,
  price: 999000,
  primary_picture: {
    facebook_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/facebook/1588589103.png?t=1612593923',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/large/1588589103.png?t=1612593923',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/medium/1588589103.png?t=1612593923',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/original/1588589103.png?t=1612593923',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/thumb/1588589103.png?t=1612593923'
  },
  short_description:
    "Những sản phẩm cọ Lustre đã mang lại định nghĩa hoàn toàn mới về thương hiệu trang điểm chuyên nghiệp đến từ Mỹ, với thiết kế tinh tế, cùng màu vàng ánh kim sang trọng, từng chiếc cọ của Lustre đều chất lượng tuyệt vời. Lông cọ mềm và mượt, cầm chắc tay, phủ phấn đều màu. Dù bạn mới tập tành trang điểm, với cọ Lustre, trở thành “phù thủy” makeup là chuyện nhỏ! Bộ cọ gồm 10 cây giúp bạn hoàn thiện từ lớp nền căng bóng, phấn mắt cuốn hút đến đôi môi quyến rũ: - Cọ Tán Phấn Bắt Sáng Lustre Pro Makeup Brush - Fan Brush - Gold Edition F104: Với thiết kế đầu cọ xoè vừa phải, Lustre Pro Fan Brush là sự lựa chọn hoàn hảo để tán phấn bắt sáng lên xương gò má cũng như chóp mũi giúp bạn có một làn da căng bóng . Hơn thế nữa, bạn cũng có thể sử dụng Lustre Pro Fan Brush để phủi đi những bụi phấn cho lớp nền mỏng nhẹ hoàn hảo. - Cọ Tán Kem Nền Lustre Pro Makeup Brush - Foundation Brush - Gold Edition F103: Là cây cọ 'best-seller' trong bộ cọ Gold Edition của Lustre Pro, có tán kem nền được yêu thích nhờ vào đầu lông chổi siêu mịn lướt nhẹ trên da. Đầu cọ được bó chặt và ngắn cho bạn độ che phủ cao nhất. - Cọ Môi Lustre Pro Makeup Brush - Gold Edition E104: Cọ Môi Lustre Pro với đầu cọ dẹp và thanh mảnh là trợ thủ đắc lực khi bạn muốn các đường nét trên môi thêm phần sắc sảo. - Cọ Phấn Phủ Lustre Pro Makeup Brush - Powder Brush - Gold Edition F101: Để có được một lớp nền lâu trôi, không bóng dầu, phủ phấn là một bước bạn không nên bỏ qua. Kích thước Cọ Phấn Phủ Lustre lớn với đầu lông dày vô cùng mềm mịn, dễ dàng sử dụng cùng cả phấn bột lẫn phấn nén, giúp bạn có một lớp nền bền màu, mịn màng cả ngày. - Cọ Chân Mày Lustre Pro Makeup Brush - Brow Brush - Gold Edition F105: Dù bạn sử dụng bột hay gel để tán chân mày, cọ chân mày Lustre với lông cọ bện chặt, đầu cọ xéo sẽ luôn là trợ thủ đắc lực để bạn có đôi lông mày sắc sảo hơn. Không chỉ vậy, bạn hoàn toàn còn có thể dùng cọ chân mày Lustre để kẻ eyeliner nếu muốn. - Cọ Má Hồng Lustre Pro Makeup Brush - Blush Brush - Gold Edition F102: Cọ Má Hồng Lustre với đầu cọ xéo không chỉ giúp bạn làm ửng hồng đôi gò má mà bạn hoàn toàn có thể sử dụng cọ để phủ phấn hay tạo khối cho gương mặt thêm phần góc cạnh. - Cọ Tán Phấn Mắt Lustre Pro Makeup Brush - Angled Blending Brush - Gold Edition 101: Cọ tán phấn mắt Angled Blending Brush là cây cọ mắt đa năng nhất bộ cọ của Lustre. Đầu cọ xéo cùng cách xếp đầu lông cọ khá dày giúp bạn vừa dùng cọ để phủ lên toàn bộ bầu mắt, tan màu vào hốc mắt và còn có thể tạo điểm nhấn cho đuôi mắt. - Cọ Che Khuyết Điểm Lustre Pro Makeup Brush - Concealer Brush - Gold Edition F105: Với những vùng da nhạy cảm và khó chạm tới bằng cọ foundation như dưới bọng mắt, quanh khoé mũi thì sử dụng Cọ Che Khuyết Điểm Lustre là vô cùng cần thiết để bạn có được lớp nền hoàn hảo. Hơn thế nữa, với đầu cọ thiết kế dẹp và đầu lông chổi mềm mịn, bạn hoàn toàn có thể sử dụng sản phẩm để thay thế cho cọ kem nền. - Cọ Phấn Mắt Lustre Pro Makeup Brush - Shading Brush - Gold Edition E103: Cọ Tán Phấn Mắt với đầu cọ hơi dẹp và bè giúp bạn lấy phấn và tán lên toàn bộ bầu mắt một dễ dàng. Lông cọ đc búi khá chặt nên chỉ với một đường lướt cọ, bạn đã phủ được toàn bộ bầu mắt. Không chỉ vậy, bạn còn có thể sử dụng cọ để tan vào phần đuôi mắt dưới để tạo độ cân bằng cho makeup look của mình. - Cọ Tán Phấn Mắt Lustre Pro Makeup Brush - Tapered Blending Brush - Gold Edition E102: Nếu là fan của những màu mắt khói quyến rũ, bạn khó ó thể bỏ qua cọ Tán Phấn Mắt Lustre - Tapered Blending Brush. Đầu cọ được thiết kế tròn nhỏ, thuôn dài phù hợp với người Châu Á, cọ blending thích hợp để tan màu mắt vào hốc mắt vô dùng dễ dàng, giúp bạn có được đôi mắt sâu hút hồn.",
  slug: 'lustre-pro-makeup-brush-set-10-pcs-gold-edition',
  status: 'approved'
};
const storeBoxes = [
  {
    id: 5418,
    price: 220000,
    stock: 7,
    store: {
      id: 30,
      closing_time: 1613743200,
      district_id: 768,
      embed_map_url:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.165157880262!2d106.68586151524235!3d10.79865959230646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d028070859%3A0x4dbcdc8964dd2c08!2zMTYwIFBoYW4gWMOtY2ggTG9uZywgUGjGsOG7nW5nIDcsIFBow7ogTmh14bqtbiwgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1593452754439!5m2!1sen!2s',
      full_address: '160 Phan Xích Long, Phường 07, Quận Phú Nhuận, Thành Phố Hồ Chí Minh',
      latitude: '10.79866',
      longitude: '106.685862',
      map_url:
        'https://www.google.com/maps/place/160+Phan+X%C3%ADch+Long,+Ph%C6%B0%E1%BB%9Dng+7,+Ph%C3%BA+Nhu%E1%BA%ADn,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000/@10.7974504,106.6912297,21z',
      name: 'Cửa hàng Phan Xích Long, TP.HCM',
      opening_time: 1613700000,
      phone: '18002040',
      pickupable: false,
      province_id: 79,
      ward_id: 9189
    }
  },
  {
    id: 5426,
    price: 220000,
    stock: 5,
    store: {
      id: 9,
      closing_time: 1613743200,
      district_id: 770,
      embed_map_url:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.35707200078!2d106.69255031490538!3d10.783939992316414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f36a7e3f97d%3A0x904c50f7e49a661a!2sLixibox!5e0!3m2!1sen!2s!4v1551341354074',
      full_address: '16 Phạm Ngọc Thạch, Phường 06, Quận 3, Thành Phố Hồ Chí Minh',
      latitude: '10.78394',
      longitude: '106.694739',
      map_url:
        'https://www.google.com/maps/place/Lixibox/@10.78394,106.6925503,17z/data=!3m1!4b1!4m5!3m4!1s0x31752f36a7e3f97d:0x904c50f7e49a661a!8m2!3d10.78394!4d106.694739',
      name: 'Cửa hàng Phạm Ngọc Thạch, TP.HCM',
      opening_time: 1613700000,
      phone: '18002040',
      pickupable: true,
      province_id: 79,
      ward_id: 9218
    }
  },
  {
    id: 5713,
    price: 150000,
    stock: 9,
    store: {
      id: 20,
      closing_time: 1613743200,
      district_id: 760,
      embed_map_url: null,
      full_address: '35 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh',
      latitude: '10.777101',
      longitude: '106.701623',
      map_url:
        'https://www.google.com/maps/place/Parkson+Plaza/@10.78394,106.6925503,17z/data=!4m5!3m4!1s0x31752f47d040ae89:0xb1b48437d8321305!8m2!3d10.777444!4d106.7023511',
      name: 'Cửa hàng Parkson',
      opening_time: 1613700000,
      phone: '18002040',
      pickupable: false,
      province_id: 79,
      ward_id: 9080
    }
  }
];
const component = (params = {}) => {
  const props = {
    price: 500,
    stock: 3,
    lixicoinBonus: 366,
    boxId: productBox.id,
    constants: null,
    currencyFormatType: 'currency',
    love: 'UNUSED',
    rating: {
      count: 0,
      avg_rate: 0
    },
    openModal: jest.fn(),
    storeBoxes,
    preOrderStatus: '',
    preOrderReleaseDate: 0,
    handleScrollToFeedback: jest.fn()
  };

  return withRouter((routerProps) => <ProductSummary {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductSummary', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
