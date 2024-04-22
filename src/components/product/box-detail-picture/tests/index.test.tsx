jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductBoxDetailPicture from '..';

const productBox = {
  id: 10575,
  added_to_waitlist: false,
  avg_rate: 4.81132,
  badges: {
    message: null,
    top_left:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/badges/icons/000/000/151/detail/1608090564.png',
    top_right: null,
    bottom_right: null,
    bottom_left: null
  },
  box_products: [
    {
      id: 14471,
      box_id: 10575,
      expert_description:
        'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moiturizing Beauty Device đem đến trải nghiệm chăm sóc da tại nhà theo chuẩn spa cao cấp, tích hợp khả năng đẩy các dưỡng chất làm trắng vào sâu trong da, cùng làm sạch, hút bay mọi bụi bẩn, tế bào chết nằm sâu trong lỗ chân lông bằng công nghệ Ion hiện đại, hỗ trợ chống lại các tác hại ô nhiễm môi trường, giúp làn da luôn tươi trẻ, căng bóng và mịn màng.\r\n\r\nSản phẩm với các đặc điểm vượt trội:\r\n- Công nghệ Ion Galvanic: Điện di Ion đẩy tinh chất dưỡng trắng tận sâu hạ bì da, tăng gấp 2.75 lần hiệu quả thẩm thấu của sản phẩm so với thoa tay thông thường\r\n- Công nghệ sóng rung F-Vibration: massage da thư giãn, nâng cơ và làm săn chắc da\r\n- 3 chế độ làm đẹp, 2 cấp độ điều chỉnh Low - High cho mỗi chế độ sử dụng, an toàn cho cả làn da nhạy cảm\r\n- Thiết kế máy nhỏ gọn, dễ dàng di chuyển tới toàn bộ khuôn mặt và mang theo đi du lịch\r\n- Pin khỏe, sử dụng 2 tuần cho mỗi lần sạc đầy\r\n\r\n3 chế độ chăm sóc cho làn da trắng sáng sau lần sử dụng đầu tiên\r\n* Chế độ làm sạch (Clean)\r\nMáy Halio Ion & Cleansing Beauty Device sử dụng công nghệ làm sạch hiện đại bằng Ion (+) giúp làm da sạch sâu từ bên trong.\r\nVề nguyên tắc, các Ion cùng dấu sẽ đẩy nhau, Ion khác dấu sẽ hút nhau. Các chất bẩn nằm sâu trong da mang điện tích (-), do đó, điện tích (+) sinh ra từ đầu máy Halio sẽ hút và kéo chất bẩn, cặn trang điểm, tạp chất nằm sâu trong lỗ chân lông lên một cách dễ dàng mà các bước tẩy trang và rửa mặt thông thường chưa lấy hết được giúp da thông thoáng, sạch sẽ, nhờ vậy mà lỗ chân lông cũng nhỏ hơn và dưỡng chất cũng thấm sâu vào trong da hơn, loại trừ nguy cơ bị mụn ẩn dai dẳng do khâu làm sạch chưa tốt. Bạn sẽ cảm nhận da sáng sạch chỉ sau 1 lần đầu sử dụng\r\nNên sử dụng với các bông tẩy trang có độ dày < 0.5mm\r\n\r\n* Chế độ đẩy tinh chất dưỡng trắng (Nourish)\r\nNếu bạn đang có nhu cầu trị thâm và dưỡng trắng, và bạn đầu tư nhiều sản phẩm cao cấp nhưng không đạt hiệu quả mong muốn, thì máy đẩy tinh chất Halio Ion là một liệu pháp đáng cân nhắc. Máy cầm tay này tạo ra nguồn ion (-) kết hợp chặt với ion (+) trong tế bào da giúp đưa các tinh chất essence, ampoule, serum trắng sáng da,... đi sâu vào trong da, tăng gấp 2.75 lần hiệu quả của sản phẩm so với sử dụng bằng tay. Nếu da bạn bị tối màu, thâm mụn thì tinh chất chính là yếu tố quan trọng nhất giúp bạn loại bỏ những tác nhân trên. Do vậy, việc đẩy tinh chất vào sâu trong da hơn sẽ thúc đẩy nhanh hiệu quả của sản phẩm\r\nĐồng thời ion (-) của máy khi đi vào trong da cũng giúp tăng sản sinh collagen tái tạo da, loại bỏ sắc tố thâm nám và tàn nhang, giúp da trắng khỏe từ bên trong.\r\n\r\nSản phẩm đạt hiệu quả cao nhất khi sử dụng kết hợp với các sản phẩm Tinh chất Mad Hippie Vitamin C Serum, Tinh chất Radha Beauty Skincare Vitamin C Serum...\r\n\r\n* Chế độ mặt nạ (Warm)\r\nVới khả năng làm nóng (42 độ C) giúp giãn lỗ chân lông và công nghệ sóng rung Frequent Vibration giúp đẩy dưỡng chất từ mặt nạ vào sâu trong da\r\n\r\n* Lưu ý: Hiệu quả sản phảm tuỳ thuộc vào cơ địa mỗi người \r\n\r\nSản phẩm gồm có\r\n- 1 máy Halio Ion & Cleansing Beauty Device\r\n- 1 Dây sạc\r\n- 1 Hướng dẫn sử dụng\r\n- 1 Túi nhung\r\n- 1 Vòng nhựa dẻo\r\n- 1 Hộp máy\r\n\r\nBảo hành : 1 đổi 1 trong vòng 1 năm\r\n- 1 đổi 1 trong vòng 1 năm chỉ áp dụng cho sản phẩm bị lỗi kỹ thuật do nhà sản xuất và không thể sửa được\r\n- Lixibox sẽ không bảo hành trong những trường hợp hư hỏng do tác động của ngoại lực.\r\n- Thời hạn bảo hành trong vòng 1 năm tính từ ngày khách hàng nhận đơn hàng\r\n- Lixibox chỉ nhận bảo hành khi sản phẩm đưa về có đầy đủ phụ kiện hộp nhựa và cáp sạc.\r\n- Chế độ bảo hành của sản phẩm đi kèm với mã đơn hàng. Không có phiếu bảo hành bằng giấy.\r\n- Cách thức gửi sản phẩm về Lixibox để bảo hành:\r\n+ Đối với sản phẩm mua online tại lixibox.com, khách hàng gọi điện hotline 1800 2040 để biết địa chỉ công ty, sau đó gửi về địa chỉ được cung cấp kèm mã đơn hàng hoặc số điện thoại. Phí giao hàng do người gửi chi trả, tức là khách hàng chi trả lượt đi và Lixibox chi trả lượt gửi về. Cửa hàng Lixibox không nhận bảo hành sản phẩm khách đã mua ở online lixibox.com.\r\n+ Đối với sản phẩm mua tại cửa hàng: khách hàng vui lòng đến cửa hàng đã mua sản phẩm kèm mã đơn hàng hoặc số điện thoại để gửi trả sản phẩm muốn bảo hành.\r\n\r\nLưu ý: Quý khách gửi hàng về bảo hành vui lòng gởi kèm cả hộp nhựa và cáp sạc, nếu không có đầy đủ phụ kiện Lixibox sẽ không nhận bảo hành.\r\n\r\nHướng dẫn đăng ký thông tin bảo hành:\r\n- Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm.\r\n- Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee\r\n- Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng.',
      product: {
        id: 10037,
        brand: {
          id: 455,
          brand_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/455/original/halio.png',
          description:
            'Halio là thương hiệu máy rửa mặt và masage da đến từ nước Mỹ. Dòng sản phẩm của hãng sử dụng công nghệ sóng Sonic có tác dụng làm sạch sâu gấp 10 lần và loại bỏ đến 99% dầu thừa, bụi bẩn và lớp trang điểm trên mặt.',
          name: 'Halio',
          slug: 'halio'
        },
        capacity: '120.0 gr',
        country: 'United States',
        description:
          'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moiturizing Beauty Device đem đến trải nghiệm chăm sóc da tại nhà theo chuẩn spa cao cấp, tích hợp khả năng đẩy các dưỡng chất làm trắng vào sâu trong da, cùng làm sạch, hút bay mọi bụi bẩn, tế bào chết nằm sâu trong lỗ chân lông bằng công nghệ Ion hiện đại, hỗ trợ chống lại các tác hại ô nhiễm môi trường, giúp làn da luôn tươi trẻ, căng bóng và mịn màng.\r\n\r\nSản phẩm với các đặc điểm vượt trội:\r\n- Công nghệ Ion Galvanic: Điện di Ion đẩy tinh chất dưỡng trắng tận sâu hạ bì da, tăng gấp 2.75 lần hiệu quả thẩm thấu của sản phẩm so với thoa tay thông thường\r\n- Công nghệ sóng rung F-Vibration: massage da thư giãn, nâng cơ và làm săn chắc da\r\n- 3 chế độ làm đẹp, 2 cấp độ điều chỉnh Low - High cho mỗi chế độ sử dụng, an toàn cho cả làn da nhạy cảm\r\n- Thiết kế máy nhỏ gọn, dễ dàng di chuyển tới toàn bộ khuôn mặt và mang theo đi du lịch\r\n- Pin khỏe, sử dụng 2 tuần cho mỗi lần sạc đầy\r\n\r\n3 chế độ chăm sóc cho làn da trắng sáng sau lần sử dụng đầu tiên\r\n* Chế độ làm sạch (Clean)\r\nMáy Halio Ion & Cleansing Beauty Device sử dụng công nghệ làm sạch hiện đại bằng Ion (+) giúp làm da sạch sâu từ bên trong.\r\nVề nguyên tắc, các Ion cùng dấu sẽ đẩy nhau, Ion khác dấu sẽ hút nhau. Các chất bẩn nằm sâu trong da mang điện tích (-), do đó, điện tích (+) sinh ra từ đầu máy Halio sẽ hút và kéo chất bẩn, cặn trang điểm, tạp chất nằm sâu trong lỗ chân lông lên một cách dễ dàng mà các bước tẩy trang và rửa mặt thông thường chưa lấy hết được giúp da thông thoáng, sạch sẽ, nhờ vậy mà lỗ chân lông cũng nhỏ hơn và dưỡng chất cũng thấm sâu vào trong da hơn, loại trừ nguy cơ bị mụn ẩn dai dẳng do khâu làm sạch chưa tốt. Bạn sẽ cảm nhận da sáng sạch chỉ sau 1 lần đầu sử dụng\r\nNên sử dụng với các bông tẩy trang có độ dày < 0.5mm\r\n\r\n* Chế độ đẩy tinh chất dưỡng trắng (Nourish)\r\nNếu bạn đang có nhu cầu trị thâm và dưỡng trắng, và bạn đầu tư nhiều sản phẩm cao cấp nhưng không đạt hiệu quả mong muốn, thì máy đẩy tinh chất Halio Ion là một liệu pháp đáng cân nhắc. Máy cầm tay này tạo ra nguồn ion (-) kết hợp chặt với ion (+) trong tế bào da giúp đưa các tinh chất essence, ampoule, serum trắng sáng da,... đi sâu vào trong da, tăng gấp 2.75 lần hiệu quả của sản phẩm so với sử dụng bằng tay. Nếu da bạn bị tối màu, thâm mụn thì tinh chất chính là yếu tố quan trọng nhất giúp bạn loại bỏ những tác nhân trên. Do vậy, việc đẩy tinh chất vào sâu trong da hơn sẽ thúc đẩy nhanh hiệu quả của sản phẩm\r\nĐồng thời ion (-) của máy khi đi vào trong da cũng giúp tăng sản sinh collagen tái tạo da, loại bỏ sắc tố thâm nám và tàn nhang, giúp da trắng khỏe từ bên trong.\r\n\r\nSản phẩm đạt hiệu quả cao nhất khi sử dụng kết hợp với các sản phẩm Tinh chất Mad Hippie Vitamin C Serum, Tinh chất Radha Beauty Skincare Vitamin C Serum...\r\n\r\n* Chế độ mặt nạ (Warm)\r\nVới khả năng làm nóng (42 độ C) giúp giãn lỗ chân lông và công nghệ sóng rung Frequent Vibration giúp đẩy dưỡng chất từ mặt nạ vào sâu trong da\r\n\r\n* Lưu ý: Hiệu quả sản phảm tuỳ thuộc vào cơ địa mỗi người \r\n\r\nSản phẩm gồm có\r\n- 1 máy Halio Ion & Cleansing Beauty Device\r\n- 1 Dây sạc\r\n- 1 Hướng dẫn sử dụng\r\n- 1 Túi nhung\r\n- 1 Vòng nhựa dẻo\r\n- 1 Hộp máy\r\n\r\nBảo hành : 1 đổi 1 trong vòng 1 năm\r\n- 1 đổi 1 trong vòng 1 năm chỉ áp dụng cho sản phẩm bị lỗi kỹ thuật do nhà sản xuất và không thể sửa được\r\n- Lixibox sẽ không bảo hành trong những trường hợp hư hỏng do tác động của ngoại lực.\r\n- Thời hạn bảo hành trong vòng 1 năm tính từ ngày khách hàng nhận đơn hàng\r\n- Lixibox chỉ nhận bảo hành khi sản phẩm đưa về có đầy đủ phụ kiện hộp nhựa và cáp sạc.\r\n- Chế độ bảo hành của sản phẩm đi kèm với mã đơn hàng. Không có phiếu bảo hành bằng giấy.\r\n- Cách thức gửi sản phẩm về Lixibox để bảo hành:\r\n+ Đối với sản phẩm mua online tại lixibox.com, khách hàng gọi điện hotline 1800 2040 để biết địa chỉ công ty, sau đó gửi về địa chỉ được cung cấp kèm mã đơn hàng hoặc số điện thoại. Phí giao hàng do người gửi chi trả, tức là khách hàng chi trả lượt đi và Lixibox chi trả lượt gửi về. Cửa hàng Lixibox không nhận bảo hành sản phẩm khách đã mua ở online lixibox.com.\r\n+ Đối với sản phẩm mua tại cửa hàng: khách hàng vui lòng đến cửa hàng đã mua sản phẩm kèm mã đơn hàng hoặc số điện thoại để gửi trả sản phẩm muốn bảo hành.\r\n\r\nLưu ý: Quý khách gửi hàng về bảo hành vui lòng gởi kèm cả hộp nhựa và cáp sạc, nếu không có đầy đủ phụ kiện Lixibox sẽ không nhận bảo hành.\r\n\r\nHướng dẫn đăng ký thông tin bảo hành:\r\n- Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm.\r\n- Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee\r\n- Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng.',
        display_name: 'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moisturizing Beauty Device Black',
        individual_box_slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
        ingredients:
          'Sản phẩm gồm có\r\n- 1 máy Halio Ion & Cleansing Beauty Device\r\n- 1 Dây sạc\r\n- 1 Hướng dẫn sử dụng\r\n- 1 Túi nhung\r\n- 1 Vòng nhựa dẻo\r\n- 1 Hộp máy',
        made_in_country: 'China',
        name: 'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moisturizing Beauty Device Black',
        original_price: 1600000,
        price: 1150000,
        primary_picture: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/facebook/1591850909.png?t=1604031192',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?t=1604031192',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/medium/1591850909.png?t=1604031192',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/original/1591850909.png?t=1604031192',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1604031192'
        },
        saleable: true,
        slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
        usage:
          '*Cầm thiết bị sao cho tay chạm vào hai thanh kim loại ở hai bên thân máy để máy hoạt động trong suốt quá trình sử dụng\r\nBước 1: Làm sạch sâu - 4 phút\r\n-Trước khi sử dụng thiết bị Halio Ion & Cleansing Beauty Device, bạn nên tẩy trang loại bỏ lớp trang điểm và làm sạch da mặt\r\n-Gỡ bỏ vòng nhựa chặn trên mặt kim loại thiết bị, lắp bông tẩy trang và cố định lại bằng vòng chặn\r\n-Thoa toner làm sạch dạng lỏng lên mặt bông, khởi động máy chọn chế độ Clean và mức độ thấp nhất (có thể điều chỉnh mức độ cao hơn tuỳ nhu cầu da) để da mặt thích nghi sau đó di chuyển máy chậm rãi bằng cách trượt trên mặt theo chiều từ trong ra ngoài, từ dưới lên trên\r\nBước 2: Chế độ đẩy tinh chất dưỡng trắng - 4 phút\r\n-Lau sạch mặt kim loại massage bằng khăn giấy không sử dụng nước để làm sạch máy\r\n*Không cần bông tẩy trang trong bước này\r\n-Thoa đều sản phẩm dưỡng da thường dùng lên mặt\r\n-Chọn chế độ Nourish và mức độ thấp nhất (có thể điều chỉnh mức độ cao hơn tuỳ nhu cầu da), sau đó di chuyển máy chậm rãi bằng cách trượt trên mặt theo chiều từ trong ra ngoài, từ dưới lên trên\r\nBước 3: Chế độ mặt nạ - 4 phút\r\n-Đắp mặt nạ giấy dưỡng ẩm lên mặt\r\n-Chọn chế độ Warm và mức độ thấp nhất (có thể điều chỉnh mức độ cao hơn tuỳ nhu cầu da), sau đó di chuyển máy chậm rãi bằng cách trượt trên mặt theo chiều từ trong ra ngoài, từ dưới lên trên.\r\n\r\nKhi kết thúc mỗi liệu trình (4 phút), thiết bị sẽ phát ra âm thanh tít tít thông báo và nhắc nhở bạn chuyển sang liệu trình tiếp theo.\r\n\r\nKhi bạn sử dụng 1 liệu trình quá 5 phút máy sẽ tự động tắt máy.\r\n\r\nTần suất sử dụng:\r\n- Thiết bị có thể sử dụng hằng ngày\r\n- Khuyến cáo nên sử dụng thiết bị một lần/ngày, vì công nghệ điện di Ion khi sử dụng quá mức có khả năng sẽ gây kích ứng trên da \r\n- Không cần thiết thực hiện cả 3 liệu trình mỗi ngày; tuỳ vào nhu cầu sử dụng và tình trạng da của mỗi người\r\n\r\nTrường hợp nên tránh sử dụng thiết bị này:\r\nNgười bị viêm da dị ứng\r\nNgười có làn da nhạy cảm, dễ kích ứng\r\nNgười có tiền sử bệnh tim mạch\r\nNgười đang trong chu kì kinh nguyệt\r\nNgười đang mang thai\r\nNgười đang niềng răng và có trồng răng implant\r\n\r\nKhông được sử dụng thiết bị vào những khu vực sau:\r\nKhu vực đang được chỉnh hình và phẫu thuật thẩm mỹ\r\nKhông nên sử dụng máy cho vùng da gần mắt\r\nVết thương hở\r\nVùng da bị mụn',
        usage_duration: null,
        wholesale_price: null
      },
      product_id: 10037,
      quantity: 1
    }
  ],
  brand_name: 'Halio',
  coins_price: 50000,
  delivery_time: {},
  for_redeem: true,
  is_individual: true,
  is_saleable: true,
  like_count: 109,
  lixicoin_bonus: 1150,
  long_description:
    'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moiturizing Beauty Device đem đến trải nghiệm chăm sóc da tại nhà theo chuẩn spa cao cấp, tích hợp khả năng đẩy các dưỡng chất làm trắng vào sâu trong da, cùng làm sạch, hút bay mọi bụi bẩn, tế bào chết nằm sâu trong lỗ chân lông bằng công nghệ Ion hiện đại, hỗ trợ chống lại các tác hại ô nhiễm môi trường, giúp làn da luôn tươi trẻ, căng bóng và mịn màng.\r\n\r\nSản phẩm với các đặc điểm vượt trội:\r\n- Công nghệ Ion Galvanic: Điện di Ion đẩy tinh chất dưỡng trắng tận sâu hạ bì da, tăng gấp 2.75 lần hiệu quả thẩm thấu của sản phẩm so với thoa tay thông thường\r\n- Công nghệ sóng rung F-Vibration: massage da thư giãn, nâng cơ và làm săn chắc da\r\n- 3 chế độ làm đẹp, 2 cấp độ điều chỉnh Low - High cho mỗi chế độ sử dụng, an toàn cho cả làn da nhạy cảm\r\n- Thiết kế máy nhỏ gọn, dễ dàng di chuyển tới toàn bộ khuôn mặt và mang theo đi du lịch\r\n- Pin khỏe, sử dụng 2 tuần cho mỗi lần sạc đầy\r\n\r\n3 chế độ chăm sóc cho làn da trắng sáng sau lần sử dụng đầu tiên\r\n* Chế độ làm sạch (Clean)\r\nMáy Halio Ion & Cleansing Beauty Device sử dụng công nghệ làm sạch hiện đại bằng Ion (+) giúp làm da sạch sâu từ bên trong.\r\nVề nguyên tắc, các Ion cùng dấu sẽ đẩy nhau, Ion khác dấu sẽ hút nhau. Các chất bẩn nằm sâu trong da mang điện tích (-), do đó, điện tích (+) sinh ra từ đầu máy Halio sẽ hút và kéo chất bẩn, cặn trang điểm, tạp chất nằm sâu trong lỗ chân lông lên một cách dễ dàng mà các bước tẩy trang và rửa mặt thông thường chưa lấy hết được giúp da thông thoáng, sạch sẽ, nhờ vậy mà lỗ chân lông cũng nhỏ hơn và dưỡng chất cũng thấm sâu vào trong da hơn, loại trừ nguy cơ bị mụn ẩn dai dẳng do khâu làm sạch chưa tốt. Bạn sẽ cảm nhận da sáng sạch chỉ sau 1 lần đầu sử dụng\r\nNên sử dụng với các bông tẩy trang có độ dày < 0.5mm\r\n\r\n* Chế độ đẩy tinh chất dưỡng trắng (Nourish)\r\nNếu bạn đang có nhu cầu trị thâm và dưỡng trắng, và bạn đầu tư nhiều sản phẩm cao cấp nhưng không đạt hiệu quả mong muốn, thì máy đẩy tinh chất Halio Ion là một liệu pháp đáng cân nhắc. Máy cầm tay này tạo ra nguồn ion (-) kết hợp chặt với ion (+) trong tế bào da giúp đưa các tinh chất essence, ampoule, serum trắng sáng da,... đi sâu vào trong da, tăng gấp 2.75 lần hiệu quả của sản phẩm so với sử dụng bằng tay. Nếu da bạn bị tối màu, thâm mụn thì tinh chất chính là yếu tố quan trọng nhất giúp bạn loại bỏ những tác nhân trên. Do vậy, việc đẩy tinh chất vào sâu trong da hơn sẽ thúc đẩy nhanh hiệu quả của sản phẩm\r\nĐồng thời ion (-) của máy khi đi vào trong da cũng giúp tăng sản sinh collagen tái tạo da, loại bỏ sắc tố thâm nám và tàn nhang, giúp da trắng khỏe từ bên trong.\r\n\r\nSản phẩm đạt hiệu quả cao nhất khi sử dụng kết hợp với các sản phẩm Tinh chất Mad Hippie Vitamin C Serum, Tinh chất Radha Beauty Skincare Vitamin C Serum...\r\n\r\n* Chế độ mặt nạ (Warm)\r\nVới khả năng làm nóng (42 độ C) giúp giãn lỗ chân lông và công nghệ sóng rung Frequent Vibration giúp đẩy dưỡng chất từ mặt nạ vào sâu trong da\r\n\r\n* Lưu ý: Hiệu quả sản phảm tuỳ thuộc vào cơ địa mỗi người \r\n\r\nSản phẩm gồm có\r\n- 1 máy Halio Ion & Cleansing Beauty Device\r\n- 1 Dây sạc\r\n- 1 Hướng dẫn sử dụng\r\n- 1 Túi nhung\r\n- 1 Vòng nhựa dẻo\r\n- 1 Hộp máy\r\n\r\nBảo hành : 1 đổi 1 trong vòng 1 năm\r\n- 1 đổi 1 trong vòng 1 năm chỉ áp dụng cho sản phẩm bị lỗi kỹ thuật do nhà sản xuất và không thể sửa được\r\n- Lixibox sẽ không bảo hành trong những trường hợp hư hỏng do tác động của ngoại lực.\r\n- Thời hạn bảo hành trong vòng 1 năm tính từ ngày khách hàng nhận đơn hàng\r\n- Lixibox chỉ nhận bảo hành khi sản phẩm đưa về có đầy đủ phụ kiện hộp nhựa và cáp sạc.\r\n- Chế độ bảo hành của sản phẩm đi kèm với mã đơn hàng. Không có phiếu bảo hành bằng giấy.\r\n- Cách thức gửi sản phẩm về Lixibox để bảo hành:\r\n+ Đối với sản phẩm mua online tại lixibox.com, khách hàng gọi điện hotline 1800 2040 để biết địa chỉ công ty, sau đó gửi về địa chỉ được cung cấp kèm mã đơn hàng hoặc số điện thoại. Phí giao hàng do người gửi chi trả, tức là khách hàng chi trả lượt đi và Lixibox chi trả lượt gửi về. Cửa hàng Lixibox không nhận bảo hành sản phẩm khách đã mua ở online lixibox.com.\r\n+ Đối với sản phẩm mua tại cửa hàng: khách hàng vui lòng đến cửa hàng đã mua sản phẩm kèm mã đơn hàng hoặc số điện thoại để gửi trả sản phẩm muốn bảo hành.\r\n\r\nLưu ý: Quý khách gửi hàng về bảo hành vui lòng gởi kèm cả hộp nhựa và cáp sạc, nếu không có đầy đủ phụ kiện Lixibox sẽ không nhận bảo hành.\r\n\r\nHướng dẫn đăng ký thông tin bảo hành:\r\n- Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm.\r\n- Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee\r\n- Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng.',
  name: 'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moisturizing Beauty Device Black',
  note: null,
  number_of_products: 1,
  original_price: 1600000,
  pictures: [
    {
      id: 50461,
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/facebook/1591850909.png?v=4',
      first_version: false,
      height: 650,
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?v=4',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/medium/1591850909.png?v=4',
      optimized_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/optimized/1591850909.png?v=4',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/original/1591850909.png?v=4',
      processing: false,
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?v=4',
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?v=4',
      width: 960
    },
    {
      id: 50464,
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/facebook/1591851808.png?v=3',
      first_version: false,
      height: 650,
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/large/1591851808.png?v=3',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/medium/1591851808.png?v=3',
      optimized_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/optimized/1591851808.png?v=3',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/original/1591851808.png?v=3',
      processing: false,
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/thumb/1591851808.png?v=3',
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/464/large/1591851808.png?v=3',
      width: 960
    },
    {
      id: 50466,
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/facebook/1591852257.png?v=3',
      first_version: false,
      height: 650,
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/large/1591852257.png?v=3',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/medium/1591852257.png?v=3',
      optimized_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/optimized/1591852257.png?v=3',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/original/1591852257.png?v=3',
      processing: false,
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/thumb/1591852257.png?v=3',
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/466/large/1591852257.png?v=3',
      width: 960
    }
  ],
  pre_order_release_date: null,
  pre_order_status: null,
  price: 1150000,
  price_sale_off: 1150000,
  primary_picture: {
    facebook_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/facebook/1591850909.png?t=1612431646',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/large/1591850909.png?t=1612431646',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/medium/1591850909.png?t=1612431646',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/original/1591850909.png?t=1612431646',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1612431646'
  },
  rating: {
    avg_rate: 4.8,
    count: 53
  },
  reason_to_sell: null,
  saving_bundle_value: 100000,
  short_description:
    'Máy đẩy tinh chất dưỡng trắng Halio Ion Cleansing & Moiturizing Beauty Device đem đến trải nghiệm chăm sóc da tại nhà theo chuẩn spa cao cấp, tích hợp khả năng đẩy các dưỡng chất làm trắng vào sâu trong da, cùng làm sạch, hút bay mọi bụi bẩn, tế bào chết nằm sâu trong lỗ chân lông bằng công nghệ Ion hiện đại, hỗ trợ chống lại các tác hại ô nhiễm môi trường, giúp làn da luôn tươi trẻ, căng bóng và mịn màng. Sản phẩm với các đặc điểm vượt trội: - Công nghệ Ion Galvanic: Điện di Ion đẩy tinh chất dưỡng trắng tận sâu hạ bì da, tăng gấp 2.75 lần hiệu quả thẩm thấu của sản phẩm so với thoa tay thông thường - Công nghệ sóng rung F-Vibration: massage da thư giãn, nâng cơ và làm săn chắc da - 3 chế độ làm đẹp, 2 cấp độ điều chỉnh Low - High cho mỗi chế độ sử dụng, an toàn cho cả làn da nhạy cảm - Thiết kế máy nhỏ gọn, dễ dàng di chuyển tới toàn bộ khuôn mặt và mang theo đi du lịch - Pin khỏe, sử dụng 2 tuần cho mỗi lần sạc đầy 3 chế độ chăm sóc cho làn da trắng sáng sau lần sử dụng đầu tiên * Chế độ làm sạch (Clean) Máy Halio Ion & Cleansing Beauty Device sử dụng công nghệ làm sạch hiện đại bằng Ion (+) giúp làm da sạch sâu từ bên trong. Về nguyên tắc, các Ion cùng dấu sẽ đẩy nhau, Ion khác dấu sẽ hút nhau. Các chất bẩn nằm sâu trong da mang điện tích (-), do đó, điện tích (+) sinh ra từ đầu máy Halio sẽ hút và kéo chất bẩn, cặn trang điểm, tạp chất nằm sâu trong lỗ chân lông lên một cách dễ dàng mà các bước tẩy trang và rửa mặt thông thường chưa lấy hết được giúp da thông thoáng, sạch sẽ, nhờ vậy mà lỗ chân lông cũng nhỏ hơn và dưỡng chất cũng thấm sâu vào trong da hơn, loại trừ nguy cơ bị mụn ẩn dai dẳng do khâu làm sạch chưa tốt. Bạn sẽ cảm nhận da sáng sạch chỉ sau 1 lần đầu sử dụng Nên sử dụng với các bông tẩy trang có độ dày < 0.5mm * Chế độ đẩy tinh chất dưỡng trắng (Nourish) Nếu bạn đang có nhu cầu trị thâm và dưỡng trắng, và bạn đầu tư nhiều sản phẩm cao cấp nhưng không đạt hiệu quả mong muốn, thì máy đẩy tinh chất Halio Ion là một liệu pháp đáng cân nhắc. Máy cầm tay này tạo ra nguồn ion (-) kết hợp chặt với ion (+) trong tế bào da giúp đưa các tinh chất essence, ampoule, serum trắng sáng da,... đi sâu vào trong da, tăng gấp 2.75 lần hiệu quả của sản phẩm so với sử dụng bằng tay. Nếu da bạn bị tối màu, thâm mụn thì tinh chất chính là yếu tố quan trọng nhất giúp bạn loại bỏ những tác nhân trên. Do vậy, việc đẩy tinh chất vào sâu trong da hơn sẽ thúc đẩy nhanh hiệu quả của sản phẩm Đồng thời ion (-) của máy khi đi vào trong da cũng giúp tăng sản sinh collagen tái tạo da, loại bỏ sắc tố thâm nám và tàn nhang, giúp da trắng khỏe từ bên trong. Sản phẩm đạt hiệu quả cao nhất khi sử dụng kết hợp với các sản phẩm Tinh chất Mad Hippie Vitamin C Serum, Tinh chất Radha Beauty Skincare Vitamin C Serum... * Chế độ mặt nạ (Warm) Với khả năng làm nóng (42 độ C) giúp giãn lỗ chân lông và công nghệ sóng rung Frequent Vibration giúp đẩy dưỡng chất từ mặt nạ vào sâu trong da * Lưu ý: Hiệu quả sản phảm tuỳ thuộc vào cơ địa mỗi người Sản phẩm gồm có - 1 máy Halio Ion & Cleansing Beauty Device - 1 Dây sạc - 1 Hướng dẫn sử dụng - 1 Túi nhung - 1 Vòng nhựa dẻo - 1 Hộp máy Bảo hành : 1 đổi 1 trong vòng 1 năm - 1 đổi 1 trong vòng 1 năm chỉ áp dụng cho sản phẩm bị lỗi kỹ thuật do nhà sản xuất và không thể sửa được - Lixibox sẽ không bảo hành trong những trường hợp hư hỏng do tác động của ngoại lực. - Thời hạn bảo hành trong vòng 1 năm tính từ ngày khách hàng nhận đơn hàng - Lixibox chỉ nhận bảo hành khi sản phẩm đưa về có đầy đủ phụ kiện hộp nhựa và cáp sạc. - Chế độ bảo hành của sản phẩm đi kèm với mã đơn hàng. Không có phiếu bảo hành bằng giấy. - Cách thức gửi sản phẩm về Lixibox để bảo hành: + Đối với sản phẩm mua online tại lixibox.com, khách hàng gọi điện hotline 1800 2040 để biết địa chỉ công ty, sau đó gửi về địa chỉ được cung cấp kèm mã đơn hàng hoặc số điện thoại. Phí giao hàng do người gửi chi trả, tức là khách hàng chi trả lượt đi và Lixibox chi trả lượt gửi về. Cửa hàng Lixibox không nhận bảo hành sản phẩm khách đã mua ở online lixibox.com. + Đối với sản phẩm mua tại cửa hàng: khách hàng vui lòng đến cửa hàng đã mua sản phẩm kèm mã đơn hàng hoặc số điện thoại để gửi trả sản phẩm muốn bảo hành. Lưu ý: Quý khách gửi hàng về bảo hành vui lòng gởi kèm cả hộp nhựa và cáp sạc, nếu không có đầy đủ phụ kiện Lixibox sẽ không nhận bảo hành. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm. - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng.',
  size_guides: [],
  slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
  status: 'approved',
  stock: 10,
  variant_options: [
    {
      box_id: 10262,
      box_slug: 'may-day-tinh-chat-duong-trang-halio-ion',
      name: '',
      presentation: 'WHITE',
      color_code: '#FFFFFF',
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/447/thumb/1589427494.png?t=1612431641'
    },
    {
      box_id: 10575,
      box_slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
      name: '',
      presentation: 'BLACK',
      color_code: '#000000',
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1612431646'
    }
  ],
  variants: {
    colors: [
      {
        box_id: 10262,
        box_slug: 'may-day-tinh-chat-duong-trang-halio-ion',
        name: '',
        presentation: 'WHITE',
        color_code: '#FFFFFF',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/447/thumb/1589427494.png?t=1612431641'
      },
      {
        box_id: 10575,
        box_slug: 'may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black',
        name: '',
        presentation: 'BLACK',
        color_code: '#000000',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/461/thumb/1591850909.png?t=1612431646'
      }
    ]
  },
  videos: []
};
const boxFeedbackPicture = [
  {
    id: 55217,
    height: 2048,
    url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/217/original/1609779959.jpg?v=1',
    width: 1536
  },
  {
    id: 55105,
    height: 1536,
    url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/105/original/1609210695.jpg?v=1',
    width: 2048
  },
  {
    id: 55085,
    height: 2048,
    url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/055/085/original/1609133802.jpg?v=1',
    width: 1536
  }
];
const component = (params = {}) => {
  const props = {
    closeModal: jest.fn(),
    selected: 0,
    list: productBox.pictures,
    boxFeedbackPicture,
    video: productBox.videos,
    onSelect: jest.fn()
  };

  return <ProductBoxDetailPicture {...Object.assign({}, props, params)} />;
};

describe('ProductBoxDetailPicture', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
