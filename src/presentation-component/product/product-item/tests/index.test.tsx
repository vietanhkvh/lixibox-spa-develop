jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductItem from '..';

const productBox = {
  id: 10233,
  added_to_waitlist: false,
  badges: {
    top_left: 'https://upload.lixibox.com/system/badges/icons/000/000/324/list/1630292217.png',
    top_right: null,
    bottom_right: null,
    bottom_left: null
  },
  brand_name: 'Halio',
  coins_price: 85000,
  discount_percent: 0,
  for_redeem: true,
  is_individual: true,
  is_saleable: true,
  like_count: 1146,
  name: '[FREE quà 2000K - nhập HCGIFT] Máy Đẩy Tinh Chất Dưỡng Trắng Nóng Lạnh Halio Ion Hot & Cool Beauty Device-Màu Trắng',
  original_price: 2400000,
  pre_order_release_date: 1629392400,
  pre_order_status: null,
  preview_picture: {
    facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/058/420/facebook/1620394499.jpg?t=1631328263',
    large_url: 'https://upload.lixibox.com/system/pictures/files/000/058/420/large/1620394499.jpg?t=1631328263',
    medium_url: 'https://upload.lixibox.com/system/pictures/files/000/058/420/medium/1620394499.jpg?t=1631328263',
    original_url: 'https://upload.lixibox.com/system/pictures/files/000/058/420/original/1620394499.jpg?t=1631328263',
    square_url: 'https://upload.lixibox.com/system/pictures/files/000/058/420/square/1620394499.jpg?t=1631328263',
    thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/058/420/thumb/1620394499.jpg?t=1631328263',
    vertical_url: 'https://upload.lixibox.com/system/pictures/files/000/058/420/vertical/1620394499.jpg?t=1631328263'
  },
  price: 2400000,
  price_sale_off: 2400000,
  primary_picture: {
    facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/facebook/1586322442.png?t=1631328263',
    large_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/large/1586322442.png?t=1631328263',
    medium_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/medium/1586322442.png?t=1631328263',
    original_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/original/1586322442.png?t=1631328263',
    square_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/square/1586322442.png?t=1631328263',
    thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/thumb/1586322442.png?t=1631328263',
    vertical_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/vertical/1586322442.png?t=1631328263'
  },
  rating: {
    avg_rate: 4.7,
    count: 537
  },
  short_description:
    'Máy đẩy tinh chất dưỡng trắng nóng lạnh Halio Ion Hot & Cool đẩy nhanh tốc độ trị thâm và dưỡng trắng da của bạn. Với tích hợp các chức năng làm sạch sâu và đẩy dưỡng bằng công nghệ Ion hiện đại, đồng thời được nâng cấp thêm chế độ massage lạnh thu nhỏ chân lông, đây là công cụ hỗ trợ làm đẹp không thể thiếu giúp làn da trắng khỏe và căng mịn, chống lại các tác hại của ô nhiễm môi trường. Sản phẩm với các đặc điểm vượt trội: 1. Công nghệ Ion Galvanic kết hợp nhiệt nóng 45 độ C: kích thích các dưỡng chất thấm sâu vào hạ bì da, tăng gấp 3.5 lần hiệu quả trị thâm và dưỡng trắng so với thoa tay thông thường 2. Sóng rung F-Vibration: cải thiện tuần hoàn máu, nâng cơ và làm săn chắc da 3. Chế độ làm lạnh: mát xa da thư giãn, khóa dưỡng và se khít lỗ chân lông 4. 4 chế độ làm đẹp, 5 cấp độ mạnh nhẹ, an toàn cho cả làn da nhạy cảm. 4 chế độ chăm sóc chuyên sâu, hoàn chỉnh chu trình trị thâm và dưỡng trắng da của bạn: * Chế độ làm sạch (Deep Clean) Máy Halio Ion Hot & Cool sử dụng công nghệ làm sạch hiện đại bằng Ion (+) kết hợp nhiệt nóng và sóng rung làm sạch da toàn diện từ trong ra ngoài Ion (+) sinh ra từ đầu máy Halio sẽ hút và kéo chất bẩn, cặn trang điểm, tạp chất nằm sâu trong lỗ chân lông lên một cách dễ dàng mà các bước tẩy trang và rửa mặt thông thường chưa lấy hết được giúp da thông thoáng, sạch sẽ, nhờ vậy mà lỗ chân lông cũng nhỏ hơn và dưỡng chất cũng thấm sâu vào trong da hơn, loại trừ nguy cơ bị mụn ẩn dai dẳng do khâu làm sạch chưa tốt. Bạn sẽ cảm nhận da sáng sạch chỉ sau 1 lần đầu sử dụng. Nên sử dụng với các bông tẩy trang có độ dày < 0.5mm. * Chế độ đẩy tinh chất trị thâm và dưỡng trắng (Fully Absorb) Nếu bạn đang có nhu cầu trị thâm và dưỡng trắng, và bạn đầu tư nhiều sản phẩm cao cấp nhưng không đạt hiệu quả mong muốn, thì máy đẩy tinh chất Halio Ion Hot & Cool là một liệu pháp đáng cân nhắc. Chiếc máy cầm tay này tạo ra nguồn ion (-) kết hợp chặt với ion (+) trong tế bào da giúp đưa các tinh chất essence, ampoule, serum trắng sáng da,... đi sâu vào trong da. Đồng thời, nhiệt nóng và sóng rung phối hợp thúc đẩy quá trình này. Ion (-) của máy khi đi vào trong da cũng giúp tăng sản sinh collagen tái tạo da, loại bỏ sắc tố thâm nám và tàn nhang, giúp da trắng khỏe từ bên trong. Sản phẩm đạt hiệu quả cao nhất khi sử dụng kết hợp với các sản phẩm Tinh chất Mad Hippie Vitamin C Serum, Tinh chất Radha Beauty Skincare Vitamin C Serum... * Chế độ mặt nạ (Moisture) Nhiệt nóng 45 độ C giãn nở lỗ chân lông và sóng rung F-Vibration đẩy dưỡng chất từ mặt nạ vào sâu trong da. * Chế độ làm lạnh (Cool) Khác hoàn toàn với 3 bước ở trên (đều mang nhiệt nóng), ở bước này đĩa kim loại thân sau máy sẽ được làm lạnh xuống 10C so với nhiệt độ phòng giúp khóa chặt dưỡng chất đã thấm vào da, đồng thời se khít lỗ chân lông hiệu quả. Massage da với đầu lạnh giúp thon gọn gương mặt và mang lại cảm giác vô cùng dễ chịu và thư giãn như đi spa. *Lưu ý: Hiệu quả sản phẩm tuỳ thuộc vào cơ địa mỗi người Điểm khác biệt so với Halio Ion: - Thêm chế độ làm lạnh khóa dưỡng và se khít lỗ chân lông, đồng thời massage da mang lại cảm giác thư thái tuyệt vời - Nhiệt nóng 45 độ C và công nghệ sóng rung F-Vibration xuyên suốt 3 chế độ, thúc đẩy hơn nữa quá trình hấp thụ dưỡng chất, tăng hiệu quả trị thâm và dưỡng trắng của bạn đến 3.5 lần - Trang bị 2 đĩa kim loại, làm từ Aluminium (nhôm) cao cấp, dẫn nhiệt và giữ nhiệt tốt hơn - Màn hình LCD hiển thị đầy đủ thông tin về chế độ đang sử dụng, mức độ rung và lượng pin, tiện lợi cho người dùng. Sản phẩm gồm có - 1 máy Halio Ion Hot & Cool Beauty Device - 1 Dây sạc - 1 Hướng dẫn sử dụng - 1 Túi nhung - 1 Hộp máy Bảo hành : - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - 1 đổi 1 trong vòng 1 năm - 1 đổi 1 trong vòng 1 năm chỉ áp dụng cho sản phẩm bị lỗi kỹ thuật do nhà sản xuất và không thể sửa được - Lixibox sẽ không bảo hành trong những trường hợp hư hỏng do tác động của ngoại lực - Thời hạn bảo hành trong vòng 1 năm tính từ ngày khách hàng nhận đơn hàng - Lixibox chỉ nhận bảo hành khi sản phẩm đưa về có đầy đủ phụ kiện hộp nhựa và cáp sạc - Chế độ bảo hành của sản phẩm đi kèm với mã đơn hàng. Không có phiếu bảo hành bằng giấy - Cách thức gửi sản phẩm về Lixibox để bảo hành: + Đối với sản phẩm mua online tại lixibox.com, khách hàng gọi điện hotline 1800 2040 để biết địa chỉ công ty, sau đó gửi về địa chỉ được cung cấp kèm mã đơn hàng hoặc số điện thoại. Phí giao hàng do người gửi chi trả, tức là khách hàng chi trả lượt đi và Lixibox chi trả lượt gửi về. Cửa hàng Lixibox không nhận bảo hành sản phẩm khách đã mua ở online lixibox.com + Đối với sản phẩm mua tại cửa hàng: khách hàng vui lòng đến cửa hàng đã mua sản phẩm kèm mã đơn hàng hoặc số điện thoại để gửi trả sản phẩm muốn bảo hành Lưu ý: Quý khách gửi hàng về bảo hành vui lòng gởi kèm cả hộp và cáp sạc, túi nhung, nếu không có đầy đủ phụ kiện Lixibox sẽ không nhận bảo hành. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng.',
  slug: 'halio-hot-cool-beauty-device',
  stock: 10,
  store_stock: 0,
  variant_options: [
    {
      box_id: 10233,
      box_slug: 'halio-hot-cool-beauty-device',
      name: 'Màu Trắng',
      presentation: 'WHITE',
      color_code: '#FFFFFF',
      image_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/thumb/1586322442.png?t=1631324552',
      preview_url: 'https://upload.lixibox.com/system/pictures/files/000/048/318/square/1586322442.png?t=1631324552'
    },
    {
      box_id: 11744,
      box_slug: 'may-day-tinh-chat-duong-trang-nong-lanh-halio-ion-hot-cool-beauty-device-mau-hong',
      name: 'Coral',
      presentation: 'Taupe',
      color_code: '#FDAFAB',
      image_url: 'https://upload.lixibox.com/system/pictures/files/000/058/121/thumb/1619167045.png?t=1631105003',
      preview_url: 'https://upload.lixibox.com/system/pictures/files/000/058/121/square/1619167045.png?t=1631105003'
    }
  ]
};

const component = (params = {}) => {
  const props = {
    product: productBox,
    tag: 'promo',
    isFullPadding: true,
    isShowRating: true,
    isShowPricing: true,
    isShowVariants: true,
    isPrivateMode: false,
    isShowDiscountPercentage: true,
    forcePriceUnit: 'dong' as const,
    customPricing: { price: 100, originalPrice: 110 }
  };

  return <ProductItem {...Object.assign({}, props, params)} />;
};

describe('ProductItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
