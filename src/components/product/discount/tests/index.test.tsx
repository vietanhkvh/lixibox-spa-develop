jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductDiscount from '..';

const suggestionDiscountCodes = [
  {
    id: 51187,
    amount: 8,
    code: 'LIXI8',
    description: 'Giảm 8% toàn bộ Lixibox',
    errors: [],
    gift_boxes: [],
    order_price_max: null,
    order_price_min: null,
    remaining_amount: 0,
    unit: 'percent'
  },
  {
    id: 45414,
    amount: 0,
    code: 'MINIBALM',
    description: 'Tặng Sáp tẩy trang Okame Superfruit Cleansing Balm cho đơn hàng từ 700K ',
    errors: ['Mã chỉ áp dụng cho các đơn hàng trên 700,000 đ'],
    gift_boxes: [
      {
        id: 10589,
        brand_name: 'OKAME Skincare',
        is_individual: true,
        is_saleable: true,
        name: 'Sáp Tẩy Trang Tự Nhiên Okame Super Fruit Cleansing Balm Mini Size - 7ml',
        original_price: 70000,
        price: 59000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/299/facebook/1602414743.jpg?t=1612584629',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/299/large/1602414743.jpg?t=1612584629',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/299/medium/1602414743.jpg?t=1612584629',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/299/original/1602414743.jpg?t=1612584629',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/299/thumb/1602414743.jpg?t=1612584629'
        },
        short_description:
          'Sáp tẩy trang tự nhiên Okame Super Fruit Cleansing Balm có kết cấu mềm mịn như bơ kết hợp với mùi hương cam chanh tươi mới, nhanh chóng tan chảy trên da, nhẹ nhàng cuốn trôi tất cả bụi bẩn, dầu thừa và lớp trang điểm hằng ngày, để lại cho bạn một làn da mịn màng, sạch thoáng. Chiết xuất từ Hắc Mai Biển kết hợp với tinh chất rau má, cúc La Mã, dầu Camellia có tác dụng chống ô-xi hóa, kháng khuẩn và làm dịu da chuyên dụng cho da dầu và da mụn. Đặc biệt, sản phẩm không làm bí da, nhờn rít như các loại sáp tẩy trang, dầu tẩy trang thông thường Công thức dịu nhẹ không chứa cồn khô, Parabens, Sulfate, dầu khoáng, màu và hương liệu nhân tạo. Sản phẩm không gây kích ứng hay khô da, an toàn cho cả bà bầu và da nhạy cảm. Thành phần nổi bật - Dầu hắc mai biển : Chứa hàm lượng Vitamin C cao gấp 12 lần Cam, quýt và 3 lần Vitamin A với Cà Rốt chống lão hóa mạnh mẽ, giảm thâm, ngăn ngừa mụn trứng cá, sưng đỏ. - Hoa trà Nhật Bản : Khả năng dưỡng ẩm, khôi phục độ đàn hồi, chống viêm da. - Tinh chất rau má : Làm dịu da, kháng viêm, mờ thâm, nám - Tinh chất cúc La Mã : Cấp ẩm, giảm kích ứng - Tinh dầu hạt nho : Kiểm soát dầu thừa cho da mụn',
        slug: 'sap-tay-trang-tu-nhien-okame-super-fruit-cleansing-balm-mini-size-7ml',
        status: 'approved'
      }
    ],
    order_price_max: null,
    order_price_min: 700000,
    remaining_amount: 227000,
    unit: 'vnd'
  }
];
const component = (params = {}) => {
  const props = {
    handleOnClick: jest.fn(),
    discountCodeList: suggestionDiscountCodes,
    price: 500,
    isAddedToCart: false
  };

  return <ProductDiscount {...Object.assign({}, props, params)} />;
};

describe('ProductDiscount', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
