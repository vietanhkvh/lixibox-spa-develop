import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';

import QuickViewModal from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const productBoxes = [
  {
    id: 10588,
    added_to_waitlist: false,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'OKAME Skincare',
    coins_price: null,
    discount_percent: 7,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 48,
    lixicoin_bonus: 390,
    name: 'Sáp Tẩy Trang Tự Nhiên Okame Super Fruit Cleansing Balm - 80ml',
    original_price: 420000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 390000,
    price_sale_off: 390000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/298/facebook/1602414563.jpg?t=1609989792',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/298/large/1602414563.jpg?t=1609989792',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/298/medium/1602414563.jpg?t=1609989792',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/298/original/1602414563.jpg?t=1609989792',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/298/thumb/1602414563.jpg?t=1609989792'
    },
    rating: {
      avg_rate: 4.7,
      count: 50
    },
    short_description:
      'Sáp tẩy trang tự nhiên Okame Super Fruit Cleansing Balm có kết cấu mềm mịn như bơ kết hợp với mùi hương cam chanh tươi mới, nhanh chóng tan chảy trên da, nhẹ nhàng cuốn trôi tất cả bụi bẩn, dầu thừa và lớp trang điểm hằng ngày, để lại cho bạn một làn da mịn màng, sạch thoáng. Chiết xuất từ Hắc Mai Biển kết hợp với tinh chất rau má, cúc La Mã, dầu Camellia có tác dụng chống ô-xi hóa, kháng khuẩn và làm dịu da chuyên dụng cho da dầu và da mụn. Đặc biệt, sản phẩm không làm bí da, nhờn rít như các loại sáp tẩy trang, dầu tẩy trang thông thường Công thức dịu nhẹ không chứa cồn khô, Parabens, Sulfate, dầu khoáng, màu và hương liệu nhân tạo. Sản phẩm không gây kích ứng hay khô da, an toàn cho cả bà bầu và da nhạy cảm. Thành phần nổi bật - Dầu hắc mai biển : Chứa hàm lượng Vitamin C cao gấp 12 lần Cam, quýt và 3 lần Vitamin A với Cà Rốt chống lão hóa mạnh mẽ, giảm thâm, ngăn ngừa mụn trứng cá, sưng đỏ - Hoa trà Nhật Bản : Khả năng dưỡng ẩm, khôi phục độ đàn hồi, chống viêm da - Tinh chất rau má : Làm dịu da, kháng viêm, mờ thâm, nám - Tinh chất cúc La Mã : Cấp ẩm, giảm kích ứng - Tinh dầu hạt nho : Kiểm soát dầu thừa cho da mụn',
    slug: 'sap-tay-trang-tu-nhien-okame-super-fruit-cleansing-balm-80ml',
    stock: 10,
    variant_options: [],
    variants: {
      colors: []
    }
  }
];

const component = (params = {}) => {
  const props = {
    data: productBoxes[0]
  };

  return withRouter((routerProps) => <QuickViewModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('QuickViewModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
