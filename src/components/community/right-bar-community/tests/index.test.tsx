jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import RightBarCommunity from '..';

const hashtagSelected = 'test-hash-tag';

const hashtagList = [{ name: 'test-tag-1' }, { name: 'test-tag-2' }, { name: 'test-tag-3' }];
const magazineList = {
  '800165747': [
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
    },
    {
      id: 681,
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
        '<p><strong>Box qu&agrave; tặng Fresh Skin with Lixibox<br />\r\n<br />\r\n1. Thiết kế giới hạn, hộp to ho&agrave;nh tr&aacute;ng</strong><br />\r\nChắc chắn n&agrave;ng v&ocirc; c&ugrave;ng cho&aacute;ng ngợp khi vừa nhận được hộp qu&agrave; n&agrave;y từ bạn. Chiếc hộp mỹ phẩm si&ecirc;u lớn n&agrave;y l&agrave; phi&ecirc;n bản giới hạn được Lixibox thiết kế cho m&ugrave;a lễ hội với t&ocirc;ng m&agrave;u hồng pastel nhẹ nh&agrave;ng c&ugrave;ng logo v&agrave;ng gold sang trọng. Đảm bảo n&agrave;ng chụp h&igrave;nh khoe với hội bạn th&igrave; ai cũng phải ganh tị v&igrave; được anh người y&ecirc;u tặng qu&agrave; qu&aacute; chuẩn.<br />\r\n<img alt="" longdesc="https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no-2, https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no3" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7186/original_1609208128.jpg" style="width: 800px; height: 1067px;" /><span dir="ltr"><em>Box qu&agrave; tặng Fresh Skin with Lixibox No.2</em></span><br />\r\n<img alt="" longdesc="https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no-2, https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no3" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7187/original_1609208203.jpg" style="width: 800px; height: 600px;" /><em>Thiết kế Advent Calendar với nhiều ngăn nhỏ đựng sản phẩm cho n&agrave;ng hồi hộp kh&aacute;m ph&aacute; từng m&oacute;n qu&agrave; nhỏ xinh b&ecirc;n trong.</em><br />\r\n<br />\r\n<strong>2. 10 sản phẩm minisize b&eacute; xinh, mới mẻ v&agrave; tiện lợi cho n&agrave;ng</strong><br />\r\nKh&ocirc;ng chỉ ho&agrave;nh tr&aacute;ng ở thiết kế, chiếc hộp c&ograve;n chứa đến 10 m&oacute;n mỹ phẩm chất lượng thuộc c&aacute;c thương hiệu chăm s&oacute;c da của Mỹ v&agrave; H&agrave;n Quốc. 10 sản phẩm n&agrave;y gồm tẩy trang Okame, gel rửa mặt The Auragins,... l&agrave; những m&oacute;n mỹ phẩm n&agrave;ng n&agrave;o cũng cần, trọn hộp mỹ phẩm sẽ gi&uacute;p n&agrave;ng sở hữu l&agrave;n da căng b&oacute;ng v&agrave; mịn m&agrave;ng.&nbsp;<br />\r\nC&aacute;c sản phẩm hầu hết đều ở dạng minisize nhỏ nhỏ dễ thương, gi&uacute;p n&agrave;ng trải nghiệm được nhiều mỹ phẩm mới, cũng rất tiện lợi để c&aacute;c n&agrave;ng bỏ t&uacute;i x&aacute;ch, đặc biệt ph&ugrave; hợp để n&agrave;ng mang theo trong c&aacute;c chuyến du lịch.<br />\r\n<img alt="" longdesc="https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no-2, https://www.lixibox.com/shop/box-qua-tang-fresh-skin-with-lixibox-no3" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7189/original_1609208282.jpg" style="width: 800px; height: 600px;" /><em>Hộp mỹ phẩm gồm nhiều sản phẩm minisize b&eacute; xinh v&agrave; tiện lợi</em><br />\r\n<br />\r\n<strong>3. Gi&aacute; cả phải chăng, tiết kiệm</strong><br />\r\nTất nhi&ecirc;n tặng qu&agrave; kh&ocirc;ng thể qu&ecirc;n c&acirc;n nhắc phần &ldquo;kinh ph&iacute;&quot; đ&uacute;ng kh&ocirc;ng? Vậy th&igrave; bạn lại c&agrave;ng phải chọn hộp mỹ phẩm n&agrave;y v&igrave; gi&aacute; gốc của m&oacute;n qu&agrave; n&agrave;y đến 1.205.000 VNĐ nhưng hiện bạn chỉ phải chi 510.000 VNĐ cho em n&oacute;. Chắc chắn đ&acirc;y l&agrave; m&oacute;n qu&agrave; lấy l&ograve;ng người y&ecirc;u tốt nhất với thiết kế ho&agrave;nh tr&aacute;ng, nhiều sản phẩm lại c&ograve;n c&oacute; gi&aacute; qu&aacute; dễ chịu.<br />\r\n<img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7208/original_1609217396.jpg" style="width: 800px; height: 800px;" /><em>Gi&aacute; cả phải chăng cho mười m&oacute;n chất lượng cho l&agrave;n da mịn m&agrave;ng, căng b&oacute;ng.</em><br />\r\n<br />\r\n<strong>4. Mua hộp mỹ phẩm qu&agrave; tặng n&agrave;y ở đ&acirc;u?</strong><br />\r\nChiếc hộp qu&agrave; tặng l&agrave; phi&ecirc;n bản box qu&agrave; tặng độc đ&aacute;o được thiết kế bởi Lixibox - thi&ecirc;n đường mua sắm qu&agrave; tặng hội tụ h&agrave;ng trăm thương hiệu mỹ phẩm, chăm s&oacute;c da uy t&iacute;n với gi&aacute; cả hợp l&yacute;. Đặc biệt, kh&ocirc;ng chỉ hộp mỹ phẩm n&agrave;y, bạn c&oacute; thể lựa chọn nhiều mỹ phẩm kh&aacute;c tặng bạn g&aacute;i tại đ&acirc;y. Mỗi sản phẩm đặt mua tại Lixibox đều được đ&oacute;ng g&oacute;i tỉ mỉ trong chiếc hộp thiết kế tinh tế v&agrave; được hỗ trợ viết thiệp đ&iacute;nh k&egrave;m. C&ograve;n chần chừ g&igrave; m&agrave; kh&ocirc;ng <a href="https://lixibox.app/kenh14-freshskin_3047">MUA NGAY</a>&nbsp;để tặng người y&ecirc;u m&oacute;n qu&agrave; thật hợp &yacute; n&agrave;o.</p>\r\n',
      cover_image: {
        blur_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/681/blur/1609406219.png',
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/681/large/1609406219.png',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/681/medium/1609406219.png',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/681/original/1609406219.png',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/681/thumb/1609406219.png'
      },
      created_at: 1608786860,
      description:
        'Năm mới sắp đến, mua quà gì tặng nàng đây? Con gái ai cũng mê mỹ phẩm làm đẹp nhưng nếu bạn đang không biết làm sao để chọn được mỹ phẩm hợp ý nàng thì tặng ngay hộp mỹ phẩm siêu lớn này đi, hộp vừa đẹp mà giá CHỈ 510K cho 10 sản phẩm. Cùng khám phá chiếc hộp quà tặng cực kỳ hoành tráng và hấp dẫn này nào!',
      post_type: 'default',
      published_at: 1609002000,
      slug: 'hop-my-pham-sieu-to-cho-chang-tang-nguoi-yeu-be-nho',
      tags: ['skincare', 'Lixibox', 'beauty box'],
      title: 'Hộp mỹ phẩm siêu to cho chàng tặng người yêu bé nhỏ',
      updated_at: 1609406223,
      video_url: '',
      views: 1
    }
  ]
};
const newProductList = [];
const isShowUnReview = true;

const likedIdList = [];
const openModalAction = jest.fn();
const likeProductAction = jest.fn();
const unLikeProductAction = jest.fn();
const addItemToCartAction = jest.fn();
const userBoxesToFeedback = [];

const component = (params = {}) => {
  const props = {
    hashtagSelected,
    hashtagList,
    magazineList,
    newProductList,
    isShowUnReview,
    likedIdList,
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    userBoxesToFeedback
  };

  return <RightBarCommunity {...Object.assign({}, props, params)} />;
};

describe('RightBarCommunity', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
