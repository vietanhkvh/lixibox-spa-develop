import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import BlogDetail from '..';

const magazine = {
  id: 671,
  author: {
    id: 298600,
    avatar: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/large/logo_new.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/medium/logo_new.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/original/logo_new.png',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/thumb/logo_new.png'
    },
    avatar_medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/medium/logo_new.png',
    avatar_thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/thumb/logo_new.png',
    email: 'lixibox.team@lixibox.com',
    first_name: 'Team',
    last_name: 'Lixibox',
    name: 'Lixibox Team'
  },
  category: {
    id: 3,
    name: 'Inspiration',
    slug: 'inspiration'
  },
  content:
    '<p><img alt="beauty-box" longdesc="https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no-2" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7102/content_1604995804.jpg" style="width: 800px; height: 787px;" />L&agrave; một c&ocirc; n&agrave;ng đam m&ecirc; &ldquo;x&ecirc; dịch&rdquo;, hot girl Nhật Oanh cực y&ecirc;u những m&oacute;n&nbsp;minisize trong hộp v&igrave; chẳng những gi&uacute;p c&ocirc; n&agrave;ng c&oacute; th&ecirc;m cơ hội trải nghiệm sản phẩm mới m&agrave; ch&uacute;ng c&ograve;n nhỏ&nbsp;gọn v&agrave; đ&aacute;p ứng được đủ&nbsp;chu tr&igrave;nh skincare của c&ocirc; n&agrave;ng trong những lần du lịch, nhất l&agrave; trong dịp cuối năm như n&agrave;y, đi Đ&agrave; Lạt m&agrave; mang theo những m&oacute;n nhỏ nhỏ trong t&uacute;i th&igrave; tiện phải biết. Đặc biệt, item khiến c&ocirc; n&agrave;ng m&ecirc; mẩn nhất lại l&agrave; son dưỡng c&oacute; m&agrave;u mới ra mắt của Lustre bởi chất son mềm m&aacute;t lại thơm m&ugrave;i bạc h&agrave;, &quot;phải n&oacute;i l&agrave; m&ecirc; chữ &ecirc; k&eacute;o d&agrave;i.&quot;<img alt="beauty-box" longdesc="https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7103/content_1604996061.jpg" style="width: 800px; height: 600px;" />Người mẫu tự do L&acirc;m Quỳnh lại cực y&ecirc;u th&iacute;ch thiết kế&nbsp;giới hạn&nbsp;của Fresh Skin with Lixibox No.2 v&igrave; m&agrave;u hồng &ldquo;si&ecirc;u cưng&rdquo; v&agrave; ho&agrave;nh tr&aacute;ng. B&ecirc;n cạnh đ&oacute;, bộ ba sản phẩm dưỡng da minisize nh&agrave; The Auragins d&agrave;nh cho&nbsp;da dầu mụn&nbsp;mới c&oacute; mặt tại Lixibox&nbsp;cũng ch&iacute;nh l&agrave; ch&acirc;n &aacute;i của c&ocirc; n&agrave;ng nhờ bảng th&agrave;nh phần si&ecirc;u l&agrave;nh t&iacute;nh v&agrave; th&acirc;n thiện với l&agrave;n da&nbsp;của c&ocirc; n&agrave;ng!<img alt="beauty-box" longdesc="https://www.lixibox.com/shop/born-to-glow, https://www.lixibox.com/shop/you-glow-girl" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7090/content_1604995797.jpg" style="width: 800px; height: 1422px;" />Với hot girl Nguyệt H&agrave;, việc được&nbsp;kh&aacute;m ph&aacute; từng ngăn hộp trong chiếc Beauty Box&nbsp;ẩn chứa c&aacute;c sản phẩm b&eacute; xinh từ skincare đến makeup v&agrave; trải nghiệm&nbsp;c&aacute;c sản phẩm mới khiến c&ocirc; n&agrave;ng v&ocirc; c&ugrave;ng phấn kh&iacute;ch!&nbsp;<img alt="beauty-box" longdesc="https://www.lixibox.com/shop/love-your-skin" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7104/content_1604997803.png" style="width: 800px; height: 800px;" />Beauty reviewer Thanh T&acirc;m (Tomxinh) chia sẻ, gel kẻ m&agrave;y Lustre ch&iacute;nh l&agrave; item khiến&nbsp;c&ocirc; n&agrave;ng m&ecirc; mẩn nhất khi nhận được Beauty Box lần n&agrave;y&nbsp;bởi chất gel chống tr&ocirc;i tốt, cho đường kẻ si&ecirc;u &quot;b&eacute;n&quot;&nbsp;v&agrave; kh&ocirc;ng hề thấm nước đ&aacute;p ứng mọi cuộc vui của c&ocirc; n&agrave;ng.<img alt="beauty-box" longdesc="https://www.lixibox.com/shop/spread-the-glow" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7098/content_1604995801.jpg" style="width: 800px; height: 800px;" />Tương tự vậy, hot girl Th&ugrave;y Trang với ch&acirc;m ng&ocirc;n &ldquo;mua mỹ phẩm v&igrave; đam m&ecirc;&rdquo;, d&ugrave; sở hữu rất nhiều mỹ phẩm đến đ&acirc;u th&igrave; ngay dịp sale xịn x&ograve; th&aacute;ng 12 n&agrave;y, Trang cũng kh&ocirc;ng thể bỏ qua một chiếc Beauty Box Fresh Skin ngập tr&agrave;n đồ dưỡng da v&agrave; trang điểm.<img alt="beauty-box" longdesc="https://www.lixibox.com/shop/let-your-skin-sparkle" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7099/content_1604995802.jpg" style="width: 800px; height: 1067px;" />C&ograve;n c&ocirc; n&agrave;ng Chi&ecirc;u Nghi th&igrave; sao nhỉ? Với quan điểm sống &ldquo;kh&ocirc;ng cần trai&rdquo; th&igrave; một chiếc Beauty Box được sale sập s&agrave;n trong dịp cuối năm&nbsp;tại Lixibox n&agrave;y&nbsp;rất đ&aacute;ng để c&aacute;c n&agrave;ng đầu tư, thăng hạng&nbsp;nhan sắc đi &quot;tr&ecirc;u ngươi&quot; tr&aacute;i tim đ&agrave;n &ocirc;ng đ&oacute;!<img alt="beauty-box" longdesc="https://www.lixibox.com/shop/box-trang-diem-hang-ngay-girls-can-do-anything" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7105/original_1605089694.png" style="width: 800px; height: 800px;" />Chỉ với 510.000 VNĐ, bạn đ&atilde; c&oacute; thể sở hữu Beauty Box Fresh Skin with Lixibox No.2 bao gồm 9 m&oacute;n mỹ phẩm&nbsp;xịn s&ograve; gi&aacute; gốc HƠN 1 TRIỆU ĐỒNG&nbsp;với thiết kế phi&ecirc;n bản giới hạn xinh xỉu. C&ograve;n chần chừ g&igrave; m&agrave; kh&ocirc;ng <a href="https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no-2">mua ngay</a> v&agrave; tham gia cơn b&atilde;o &quot;đập hộp&quot; Beauty Box c&ugrave;ng&nbsp;rất nhiều t&iacute;n đồ l&agrave;m đẹp ngay th&ocirc;i!&nbsp;</p>\r\n',
  cover_image: {
    blur_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/671/blur/1605169214.png',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/671/large/1605169214.png',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/671/medium/1605169214.png',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/671/original/1605169214.png',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/671/thumb/1605169214.png'
  },
  created_at: 1604992335,
  description:
    'Nếu bạn là tín đồ mỹ phẩm thì đừng bỏ qua Fresh Skin with Lixibox No.2 - chiếc hộp mỹ phẩm phiên bản đặc biệt với 9 items siêu chất tạo nên trào lưu “đập hộp" của các nàng trong dịp cuối năm 2020 này. Cùng xem những màn "đập hộp" chiếc Beauty Box cực hoành tráng và hấp dẫn này nhé!',
  post_type: 'default',
  published_at: 1605177998,
  related_boxes: [
    {
      id: 11176,
      added_to_waitlist: false,
      badges: {
        message: null,
        top_left: null,
        top_right: null,
        bottom_right: null,
        bottom_left: null
      },
      brand_name: 'Combo box',
      coins_price: null,
      discount_percent: 38,
      for_redeem: false,
      is_individual: false,
      is_saleable: true,
      like_count: 2,
      lixicoin_bonus: 990,
      name: 'Box Làm Sạch Sáng Da Your Golden Shield',
      original_price: 1620000,
      pre_order_release_date: null,
      pre_order_status: null,
      price: 990000,
      price_sale_off: 0,
      primary_picture: {
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/391/facebook/1595219680.jpg?t=1609392697',
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/391/large/1595219680.jpg?t=1609392697',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/391/medium/1595219680.jpg?t=1609392697',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/391/original/1595219680.jpg?t=1609392697',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/391/thumb/1595219680.jpg?t=1609392697'
      },
      rating: {
        avg_rate: 0,
        count: 0
      },
      short_description:
        'Box Làm Sạch Sáng Da Your Golden Shield gồm có: 01 Sáp Tẩy Trang Okame Super Fruit Cleansing Balm - 80ml 01 Máy rửa mặt Halio Facial Cleansing & Massaging Device - Mustard 01 Chì kẻ mày Lustre Micro Brow Professional Line - Cool Dark Brown 01 Lixibox Daily Facial Mask Sheet - Pearl 01 Mặt Nạ SOME BY MI YUJA NIACIN BLEMISH CARE SERUM MASK 25G 01 BNBG VITA COCKTAIL FOIL MASK - AGE LIFTING',
      slug: 'your-golden-shield',
      stock: 0,
      variant_options: [],
      variants: {
        colors: []
      }
    }
  ],
  slug: 'trao-luu-dap-hop-beauty-box-sieu-hoanh-trang-dip-cuoi-nam-chi-em-tha-ho-cham-da-xinh-don-mua-le-hoi',
  tags: ['Lixibox', 'beauty box', 'single day'],
  title: 'Trào lưu “đập hộp” Beauty Box siêu hoành tráng dịp cuối năm, chị em tha hồ chăm da xinh đón mùa lễ hội',
  updated_at: 1607185775,
  video_url: '',
  views: 1
};
const magazineRelatedBlogList = [
  {
    id: 686,
    author: {
      id: 298600,
      avatar: {
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/large/logo_new.png',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/medium/logo_new.png',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/original/logo_new.png',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/thumb/logo_new.png'
      },
      avatar_medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/medium/logo_new.png',
      avatar_thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/298/600/thumb/logo_new.png',
      email: 'lixibox.team@lixibox.com',
      first_name: 'Team',
      last_name: 'Lixibox',
      name: 'Lixibox Team'
    },
    category: {
      id: 2,
      name: 'Skincare',
      slug: 'skincare'
    },
    content:
      '<p><strong>1. S&aacute;p tẩy trang tự nhi&ecirc;n Okame Super Fruit Cleansing Balm<br />\r\n<img alt="" longdesc="https://www.lixibox.com/shop/sap-tay-trang-tu-nhien-okame-super-fruit-cleansing-balm-80ml,https://www.lixibox.com/shop/sap-tay-trang-tu-nhien-okame-super-fruit-cleansing-balm-mini-size-7ml" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7219/original_1609918053.png" style="width: 800px; height: 800px;" /></strong>Ai cũng biết t&aacute;c dụng ch&iacute;nh của tẩy trang l&agrave; l&agrave;m sạch lớp trang điểm v&agrave; bụi bẩn, nhưng tại sao bạn kh&ocirc;ng chọn sản phẩm c&oacute; t&aacute;c dụng l&agrave;m s&aacute;ng da để đẩy nhanh qu&aacute; tr&igrave;nh dưỡng trắng nhỉ? Với th&agrave;nh phần nổi bật l&agrave; &ldquo;si&ecirc;u quả&quot; hắc mai biển sở hữu lượng vitamin C gấp 12 lần cam qu&yacute;t, s&aacute;p tẩy trang Okame kh&ocirc;ng chỉ l&agrave;m tốt nhiệm vụ l&agrave;m sạch cho l&agrave;n da m&agrave; c&ograve;n c&oacute; khả năng hỗ trợ l&agrave;m mờ vết th&acirc;m, nu&ocirc;i dưỡng da s&aacute;ng dần từ s&acirc;u b&ecirc;n trong.&nbsp;<br />\r\nNgo&agrave;i ra, Okame Super Fruit Cleansing Balm c&ograve;n gi&uacute;p phục hồi v&agrave; l&agrave;m dịu da với chiết xuất rau m&aacute;, c&uacute;c La M&atilde; v&agrave; hoa tr&agrave;, th&iacute;ch hợp cả cho những l&agrave;n da mụn nhạy cảm.<br />\r\n<br />\r\n<strong>2.&nbsp;Sữa rửa mặt Senka &amp; M&aacute;y rửa mặt cho da nhạy cảm Halio Sensitive<br />\r\n<img alt="" longdesc="https://www.lixibox.com/shop/senka-perfect-whip-120gr,https://www.lixibox.com/shop/senka-perfect-whip-50gr,https://www.lixibox.com/shop/halio-facial-cleansing-massaging-device-for-sensitive-skin,https://www.lixibox.com/shop/halio-sensitive-facial-cleansing-massaging-device-mint" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7215/original_1609917771.png" style="width: 800px; height: 800px;" /></strong>Da sạch l&agrave; y&ecirc;u cầu cơ bản nhất để giảm c&aacute;c vấn đề về mụn v&agrave; gi&uacute;p c&aacute;c bước dưỡng trắng sau đ&oacute; được hấp thụ tốt hơn. Sữa rửa mặt Senka Perfect Whip c&oacute; mức gi&aacute; v&ocirc; c&ugrave;ng tốt, kh&ocirc;ng chỉ gi&uacute;p l&agrave;m sạch nhẹ nh&agrave;ng m&agrave; c&ograve;n chứa phức hợp tinh chất tơ tằm thi&ecirc;n nhi&ecirc;n gi&uacute;p dưỡng trắng, cung cấp độ ẩm cho da th&ecirc;m mịn m&agrave;ng.&nbsp;<br />\r\nL&agrave; cặp đ&ocirc;i l&agrave;m sạch da &ldquo;quốc d&acirc;n&quot;, kết hợp c&ugrave;ng sữa rửa mặt Senka l&agrave; m&aacute;y rửa mặt d&agrave;nh cho da nhạy cảm Halio Sensitive gi&uacute;p tăng 99,5% hiệu quả l&agrave;m sạch da so với rửa mặt bằng tay nhờ c&ocirc;ng nghệ s&oacute;ng rung Sonic Wave v&agrave; đầu gai silicone si&ecirc;u mảnh chỉ 0,6mm.&nbsp;<br />\r\n<br />\r\n<strong>3. Nước hoa hồng s&aacute;ng da The Auragins Gentle Brightening Toner<br />\r\n<img alt="" longdesc="https://www.lixibox.com/shop/nuoc-hoa-hong-the-auragins-gentle-brightening-toner,https://www.lixibox.com/shop/nuoc-hoa-hong-the-auragins-gentle-brightening-toner-20-ml" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7216/original_1609917837.png" style="width: 800px; height: 800px;" /></strong>The Auragins Toner chứa th&agrave;nh phần ch&iacute;nh l&agrave; tẩy da chết h&oacute;a học AHA - PHA gi&uacute;p l&agrave;m sạch bề mặt da, loại bỏ mụn đầu đen, mụn ẩn v&agrave; mang lại l&agrave;n da tươi s&aacute;ng. B&ecirc;n cạnh đ&oacute;, toner được bổ sung Niacinamide với t&aacute;c dụng bổ sung độ ẩm, phục hồi &ldquo;h&agrave;ng r&agrave;o&quot; bảo vệ da v&agrave; nu&ocirc;i dưỡng da s&aacute;ng khoẻ.<br />\r\n<br />\r\n<strong>4. Dưỡng s&aacute;ng da với Serum&nbsp;Radha&nbsp;Radha Beauty Skincare Vitamin C</strong><br />\r\n<strong><img alt="" longdesc="https://www.lixibox.com/shop/radha-beauty-skincare-vitamin-c-serum" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7217/original_1609917883.png" style="width: 800px; height: 800px;" /></strong>Muốn dưỡng trắng chắc chắn kh&ocirc;ng thể thiếu Vitamin C. Lu&ocirc;n nằm trong top c&aacute;c sản phẩm b&aacute;n chạy nhất tr&ecirc;n Amazon với h&agrave;ng loạt review 5 sao, serum Radha Beauty Skincare Vitamin C chứa đến 20% vitamin C với c&ocirc;ng dụng dưỡng trắng v&agrave; l&agrave;m đều m&agrave;u da hiệu quả kết hợp c&ugrave;ng Hyaluronic Acid (HA) nổi tiếng cấp ẩm cho l&agrave;n da lu&ocirc;n mọng nước.<br />\r\nĐặc biệt, em n&agrave;y c&oacute; kết cấu serum dạng lỏng với m&agrave;u v&agrave;ng đặc trưng của cam chanh, dễ thẩm thấu khi m&aacute;t-xa tr&ecirc;n da m&agrave; kh&ocirc;ng g&acirc;y cảm gi&aacute;c nhờn d&iacute;nh kh&oacute; chịu.<br />\r\n<br />\r\n<strong>5. Kem dưỡng trắng da AHC Capture Solution Prime Brightening Cream<br />\r\n<img alt="" longdesc="https://www.lixibox.com/shop/ahc-capture-white-solution-max-cream-50ml,https://www.lixibox.com/shop/may-day-tinh-chat-duong-trang-halio-ion,https://www.lixibox.com/shop/may-day-tinh-chat-duong-trang-halio-ion-cleansing-moisturizing-beauty-device-black" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7218/original_1609917984.png" style="width: 800px; height: 800px;" /></strong>&ldquo;C&aacute;i t&ecirc;n n&oacute;i l&ecirc;n tất cả&quot; AHC Capture Solution Prime Brightening Cream với gi&aacute; b&igrave;nh d&acirc;n l&agrave; một gợi &yacute; xịn mịn đ&aacute;ng thử với khả năng dưỡng ẩm tốt, l&agrave;m căng mềm da, hỗ trợ ngăn ngừa l&atilde;o ho&aacute; v&agrave; đặc biệt l&agrave; gi&uacute;p da s&aacute;ng mịn, đều m&agrave;u nhờ chiết xuất hoa sen v&agrave; tinh chất hoa anh đ&agrave;o.&nbsp;<br />\r\n<strong>Tip:</strong> Một mẹo nho nhỏ để đẩy nhanh hiệu quả v&agrave; tốc độ dưỡng trắng da cho kịp đ&oacute;n tết sắp đến ch&iacute;nh l&agrave; c&aacute;c n&agrave;ng đầu tư m&aacute;y đẩy tinh chất Halio Ion với c&ocirc;ng nghệ điện di Ion Galvanic gi&uacute;p c&aacute;c sản phẩm thẩm thấu tối đa, tăng 2,75 lần hiệu quả dưỡng trắng so với khi thoa bằng tay đấy.<br />\r\n<br />\r\nKh&ocirc;ng cần đi spa hay đầu tư cho c&aacute;c sản phẩm highend đắt đỏ, bạn c&oacute; thể sở hữu l&agrave;n da trắng mịn chỉ với 5 sản phẩm gi&aacute; b&igrave;nh d&acirc;n tr&ecirc;n kết hợp c&ugrave;ng thiết bị chăm s&oacute;c da ti&ecirc;n tiến. <a href="https://www.lixibox.com/theme/xmas-sale-2020?utm_campaign=afamily-themesale&amp;utm_id=3098&amp;utm_medium=article&amp;utm_source=admicro-adx">MUA NGAY</a>!</p>\r\n',
    cover_image: {
      blur_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/686/blur/1609917330.png',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/686/large/1609917330.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/686/medium/1609917330.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/686/original/1609917330.png',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/686/thumb/1609917330.png'
    },
    created_at: 1609916451,
    description:
      'Thay vì phải tốn thời gian và khoản tiền đắt đỏ đi spa để sở hữu làn da trắng thì hãy tham khảo ngay các sản phẩm dưỡng da giá bình dân dưới đây để có làn da trắng hồng chỉ trong 2 tuần để đón tết thật xinh đẹp nhé! ',
    post_type: 'default',
    published_at: 1609927929,
    slug: '5-san-pham-gia-binh-dan-cham-da-trang-bat-tong-trong-2-tuan',
    tags: ['OKAME Skincare', 'Lixibox', 'Radha Beauty', 'halio sensitive', 'the auragins', 'senka', 'AHC'],
    title: '5 sản phẩm giá bình dân chăm da trắng bật tông trong 2 tuần',
    updated_at: 1609928913,
    video_url: '',
    views: 2
  }
];
const userInfo = {
  id: 112448,
  address: 'Qư Dhdb',
  addresses: [
    {
      id: 554007,
      address: 'Qư Dhdb',
      created_at: 1596447357,
      district_id: 769,
      district_name: '2',
      first_name: 'first',
      full_address: 'Qư Dhdb, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
      full_name: 'Address First',
      is_primary_address: true,
      is_usable: true,
      last_name: 'address',
      phone: '0909090909',
      province_id: 79,
      province_name: 'Hồ Chí Minh',
      ward: {
        id: 9203,
        district_id: 769,
        full_name: 'Phường Bình An',
        name: 'Bình An',
        unit: 'Phường'
      },
      ward_id: 9203,
      ward_name: 'Bình An'
    }
  ],
  avatar: {
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/large/avatar-20190522180419.jpeg',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/medium/avatar-20190522180419.jpeg',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/original/avatar-20190522180419.jpeg',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/users/avatars/000/112/448/thumb/avatar-20190522180419.jpeg'
  },
  balance: 0,
  birthday: 677462400,
  coins: 57506,
  created_at: 1488173669,
  discount_code_ids: [7776, 44713, 11213],
  district_id: 769,
  earned_coins: 0,
  email: 'user@lixibox.com',
  expert_slug: 'user-lixibox',
  first_name: 'User',
  full_address: 'Qư Dhdb, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh',
  gender: 1,
  is_admin: true,
  is_expert: true,
  last_name: 'Lixibox',
  membership_level: 1,
  membership_level_started_at: 0,
  mobile_referral_code: 'LIXIU648B',
  name: 'Lixibox User',
  order_statuses: [
    {
      statuses: ['unpaid'],
      title: 'Chưa thanh toán',
      count: 0
    },
    {
      statuses: ['confirmed'],
      title: 'Đã xác nhận',
      count: 0
    },
    {
      statuses: ['paid', 'shipped'],
      title: 'Đang đợi giao hàng',
      count: 0
    },
    {
      statuses: ['fulfilled'],
      title: 'Đã nhận hàng',
      count: 16
    },
    {
      statuses: ['cancelled'],
      title: 'Đã huỷ',
      count: 228
    }
  ],
  orders_count: 251,
  phone: '0987654322',
  province_id: 79,
  referral_code: 'LIXIUD51A',
  store_orders_count: 0,
  ward_id: 9203
};

const component = (params = {}) => {
  const props = {
    idPost: magazine.slug,
    magazine,
    userInfo,
    magazineRelatedBlogList,
    openModalAction: jest.fn(),
    likeProductAction: jest.fn(),
    unLikeProductAction: jest.fn(),
    likedIdList: []
  };

  return withRouter((routerProps) => <BlogDetail {...Object.assign({}, props, routerProps, params)} />);
};

describe('BlogDetail', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
