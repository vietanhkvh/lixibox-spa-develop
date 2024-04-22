jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MagazineCategoryDetail from '..';

const magazines = [
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
const magazineDashboard = {
  success: true,
  categories: [
    {
      id: 1,
      name: 'Makeup',
      slug: 'makeup'
    },
    {
      id: 2,
      name: 'Skincare',
      slug: 'skincare'
    },
    {
      id: 3,
      name: 'Inspiration',
      slug: 'inspiration'
    },
    {
      id: 4,
      name: 'Ingredient',
      slug: 'ingredient'
    },
    {
      id: 5,
      name: 'Brand',
      slug: 'brand'
    },
    {
      id: 6,
      name: 'User’s Review',
      slug: 'expert-s-review'
    },
    {
      id: 7,
      name: 'Lingerie',
      slug: 'lingerie'
    },
    {
      id: 8,
      name: 'Mom & Baby',
      slug: 'mom-baby'
    }
  ],
  magazines: [
    {
      category_name: 'Makeup',
      category_slug: 'makeup',
      magazines: [
        {
          id: 665,
          author: {
            id: 307751,
            avatar: {
              large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A',
              medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A',
              thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A'
            },
            avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A',
            avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=A',
            email: 'thanhthaonguyenphan97@gmail.com',
            first_name: 'An',
            last_name: 'Minh',
            name: 'Minh An'
          },
          category: {
            id: 1,
            name: 'Makeup',
            slug: 'makeup'
          },
          content:
            '<p><strong>1. Phong c&aacute;ch trang điểm&nbsp;retro quyến rũ</strong><br />\r\nChọn phong c&aacute;ch retro kết hợp với lối makeup kẻ eyeliner sắc n&eacute;t c&ugrave;ng đ&ocirc;i m&ocirc;i hồng neon đ&uacute;ng chuẩn &ldquo;m&ugrave;a h&egrave; năm 90s hồi ấy&quot;, Selena Gomez khiến fans &quot;đứng ngồi kh&ocirc;ng y&ecirc;n&quot; bởi visual quyến rũ, n&oacute;ng bỏng của m&igrave;nh trong MV.&nbsp;<img alt="phong-cach-makeup" longdesc="https://www.lixibox.com/shop/aritaum-idol-brush-eyeliner, https://www.lixibox.com/shop/isehan-heroine-kiss-me-eyeliner, https://www.lixibox.com/shop/lustre-pro-volume-waterproof-mascara-black-onyx, https://www.lixibox.com/shop/charlotte-tilbury-matte-revolution-lost-cherry, https://www.lixibox.com/shop/charlotte-tilbury-matte-revolution-love-liberty " src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7022/original_1600054125.png" style="width: 800px; height: 800px;" /><strong>2. Phấn mắt cầu vồng&nbsp;</strong><br />\r\nTrở lại với h&igrave;nh ảnh trẻ trung, năng động trong MV lần n&agrave;y, c&ocirc;ng ch&uacute;a YG Jennie kh&ocirc;ng ngại đ&aacute;nh phấn mắt m&agrave;u cầu vồng, phối nhiều m&agrave;u sắc sặc sỡ như hồng, xanh, t&iacute;m ấn tượng. Vẻ đ&aacute;ng y&ecirc;u của c&ocirc; n&agrave;ng được <em>kiểu trang điểm</em> mới lạ n&agrave;y nh&acirc;n l&ecirc;n gấp bội.<img alt="phong-cach-trang-diem" longdesc="https://www.lixibox.com/shop/bang-phan-mat-etude-house-play-color-eyes-palette-cherry-blossom, https://www.lixibox.com/shop/bh-cosmetics-mini-zodiac-aquarius-9-color-shadow-palette, https://www.lixibox.com/shop/secret-key-sweet-glam-tint-glow-baby-pink" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7024/original_1600054126.png" style="width: 800px; height: 800px;" /><strong>3.&nbsp;Phấn mắt nhũ&nbsp;</strong><br />\r\nKh&aacute;c với style makeup mắt cầu vồng rực rỡ của Jennie, &quot;B&ocirc;ng hồng Th&aacute;i&quot; Lisa lại chọn phấn mắt nhũ lấp l&aacute;nh một m&agrave;u tạo cảm gi&aacute;c sang chảnh v&agrave; thời thượng.<img alt="phong-cach-trang-diem" longdesc="https://www.lixibox.com/shop/bang-phan-mat-etude-house-play-color-eyes-bake-house, https://www.lixibox.com/shop/bang-phan-mat-etude-house-play-color-eyes-palette-peach-farm, https://www.lixibox.com/shop/lustre-pro-eyelash-curler" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7025/original_1600054128.jpg" style="width: 800px; height: 800px;" /><strong>4.&nbsp;Makeup tone hồng ngọt ng&agrave;o</strong><br />\r\nJisoo vẫn bật l&ecirc;n n&eacute;t ri&ecirc;ng của m&igrave;nh với lối trang điểm hồng ngọt ng&agrave;o v&ocirc; c&ugrave;ng ăn khớp với t&ocirc;ng m&agrave;u của MV. Lựa chọn phấn mắt v&agrave; m&agrave;u son hồng to&agrave;n tập kết hợp kiểu t&oacute;c s&oacute;ng bồng bềnh, Jisoo mang lại cảm gi&aacute;c l&atilde;ng mạn, ngọt ng&agrave;o theo concept của những que kem m&aacute;t lạnh.<img alt="phong-cach-trang-diem" longdesc="https://www.lixibox.com/shop/bang-phan-mat-etude-house-play-color-eyes-palette-cherry-blossom, https://www.lixibox.com/shop/lustre-pro-blush-powder, https://www.lixibox.com/shop/lustre-micro-brow-professional-line-cool-dark-brown, https://www.lixibox.com/shop/3ce-velvet-lip-tint-private, https://www.lixibox.com/shop/ysl-vinyl-cream-lip-stain" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7027/original_1600054129.png" style="width: 800px; height: 800px;" /><strong>5. D&aacute;n sticker ngộ nghĩnh</strong><br />\r\nChọn style makeup kh&aacute; basic nhưng Rose kh&eacute;o l&eacute;o t&ocirc; điểmh&igrave;nh xăm d&aacute;n h&igrave;nh bướm sau đu&ocirc;i mắt để tạo điểm nhấn thật c&aacute; t&iacute;nh. Thậm ch&iacute;, m&oacute;ng tay v&agrave; v&ograve;ng cổ của c&ocirc; cũng l&agrave; những c&aacute;nh bướm đầy m&agrave;u sắc tươi s&aacute;ng, hứa hẹn xu hướng thời trang n&agrave;y c&ograve;n b&ugrave;ng nổ dữ dội hơn trước.<img alt="phong-cach-trang-diem" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/7023/original_1600054125.png" style="width: 800px; height: 800px;" /></p>\r\n',
          cover_image: {
            blur_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/665/blur/1600054679.png',
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/665/large/1600054679.png',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/665/medium/1600054679.png',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/665/original/1600054679.png',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/665/thumb/1600054679.png'
          },
          created_at: 1600053503,
          description:
            'Trở lại với MV Ice Cream, BLACKPINK và Selena nhanh chóng leo lên top 1 trending của các bảng xếp hạng âm nhạc. Không chỉ hấp dẫn bởi nhịp điệu sôi động, bắt tai, Ice Cream còn trending bởi phong cách thời trang ấn tượng có một không hai. Cùng tia qua và học lỏm cách makeup “dậy sóng" hội gái xinh này nhé.',
          post_type: 'default',
          published_at: 1600064862,
          slug: 'cuc-xinh-lai-con-de-lam-update-ngay-loat-makeup-hay-ho-trong-mv-icecream-duoc-selena-blackpink-lang-xe',
          tags: ['phong cách trang điểm ', 'kiểu trang điểm', 'blackpink makeup', 'selena makeup', 'ice cream makeup'],
          title:
            'Cực xinh lại còn dễ làm, update ngay loạt makeup hay ho trong MV Icecream được Selena & BLACKPINK lăng xê!',
          updated_at: 1600064894,
          video_url: '',
          views: 436
        },
        {
          id: 631,
          author: {
            id: 324333,
            avatar: {
              large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
              medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
              thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P'
            },
            avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
            avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
            email: 'trangcbeta02@gmail.com',
            first_name: 'Pham',
            last_name: 'Serene',
            name: 'Serene Pham'
          },
          category: {
            id: 1,
            name: 'Makeup',
            slug: 'makeup'
          },
          content:
            '<p><strong>1/ Căng mọng như tr&aacute;i đ&agrave;o</strong><br />\r\nMakeup tr&aacute;i đ&agrave;o chưa bao giờ hết hot khi li&ecirc;n tục được c&aacute;c idol nữ Kpop nhiệt t&igrave;nh lăng-x&ecirc;. Tone chủ đạo của kiểu trang điểm đơn giản n&agrave;y chỉ l&agrave; m&agrave;u hồng, từ m&ocirc;i tới mắt v&agrave; m&aacute; đều phơn phớt m&agrave;u của tr&aacute;i đ&agrave;o căng mọng tươi r&oacute;i. Vẻ đẹp vừa ng&acirc;y thơ vừa dễ thương nhưng cũng tr&agrave;n đầy sức sống n&agrave;y sẽ đ&aacute;nh tan c&aacute;i n&oacute;ng m&ugrave;a h&egrave; v&agrave; mang tới l&agrave;n gi&oacute; dễ chịu ngọt ng&agrave;o cho người đối diện.<img alt="summer makeup look" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6778/original_summer-makeup-look-2.jpg" style="width: 800px; height: 799px;" /><strong>2/ Rực rỡ với mắt chilli mango v&agrave; m&aacute; v&agrave;ng</strong><br />\r\nKiểu makeup với những tone m&agrave;u cực kỳ &quot;m&ugrave;a h&egrave;&quot; như v&agrave;ng, cam vừa độc vừa lạ lại cực kỳ hợp với kh&ocirc;ng kh&iacute; tiệc t&ugrave;ng b&ecirc;n bờ biển. Với m&agrave;u v&agrave;ng trong g&oacute;c mắt v&agrave; m&agrave;u đỏ ở nửa đu&ocirc;i mắt phối hợp với nhau tạo hiệu ứng như ho&agrave;ng h&ocirc;n m&ugrave;a h&egrave; vừa rực rỡ vừa quyến rũ. Kết hợp với blush v&agrave;ng l&agrave; bạn đ&atilde; c&oacute; ngay một makeup look ho&agrave;n hảo cho m&ugrave;a h&egrave; cực chill.<img alt="summer makeup look" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6777/original_summer-makeup-look-3.jpg" style="width: 800px; height: 796px;" /><strong>3/ Mơ mộng với đ&ocirc;i mắt t&iacute;m lilac</strong><br />\r\nKhi m&agrave; t&iacute;m lilac đang l&agrave; hot trend th&igrave; kh&ocirc;ng thể n&agrave;o bỏ qua m&agrave;u mắt cực đỉnh n&agrave;y. Một đ&ocirc;i mắt t&iacute;m vừa cuốn h&uacute;t vừa c&oacute; chiều s&acirc;u sẽ l&agrave; điểm nhấn kh&oacute; phai trong mắt người đối diện. Đừng ngại khi t&iacute;m l&agrave; tone lạnh, ch&iacute;nh sự đối lập giữa m&agrave;u mắt của bạn v&agrave; thời tiết sẽ g&acirc;y n&ecirc;n sự ấn tượng kh&oacute; phai đấy.<img alt="summer makeup look" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6779/original_image_from_ios.jpg" style="width: 800px; height: 1000px;" /><strong>4/ H&acirc;y h&acirc;y c&ocirc; em g&aacute;i m&aacute; hồng</strong><br />\r\nM&aacute; hồng c&oacute; phần hơi &quot;lố&quot; đang l&agrave; hot trend được c&aacute;c c&ocirc; n&agrave;ng IT girl ch&acirc;u &Aacute; t&iacute;ch cực quảng b&aacute; với điểm cộng l&agrave; mang lại sự trẻ trung v&agrave; đ&aacute;ng y&ecirc;u. Sự đ&aacute;ng y&ecirc;u của đ&ocirc;i m&aacute; hồng sẽ khiến cho &aacute;nh nắng h&egrave; bớt &ldquo;gắt&rdquo; hơn rất nhiều, đồng thời c&ograve;n gi&uacute;p bạn ăn gian một v&agrave;i tuổi thật dễ d&agrave;ng.&nbsp;<img alt="makeup look" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6798/original_ebe814930c054223330b557aede625f4.jpg" style="width: 800px; height: 996px;" /><strong>5/ Tr&agrave;n đầy sức sống với đ&ocirc;i m&ocirc;i b&oacute;ng nhẹ</strong><br />\r\nKh&ocirc;ng phải son l&igrave; m&agrave; son với độ b&oacute;ng nhẹ mới l&agrave; sự lựa chọn số 1 để hợp với vibe m&ugrave;a h&egrave; xứ sở nhiệt đới. Một đ&ocirc;i m&ocirc;i hồng đ&agrave;o hoặc đỏ tươi nhưng phơn phớt ch&uacute;t b&oacute;ng sẽ tạo cảm gi&aacute;c mềm mịn, vừa nũng nịu đ&aacute;ng y&ecirc;u lại vừa c&oacute; ch&uacute;t sexy. Kh&ocirc;ng chỉ tạo hiệu ứng đ&ocirc;i m&ocirc;i căng mọng đầy đặn m&agrave; son b&oacute;ng nhẹ cũng sẽ gi&uacute;p bạn duy tr&igrave; độ ẩm cho m&ocirc;i, tr&aacute;nh nứt nẻ bong tr&oacute;c ngay cả dưới điều h&ograve;a.&nbsp;<img alt="summer makeup look" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6773/original_summer-makeup-look-6.jpg" style="width: 800px; height: 820px;" />M&ugrave;a h&egrave; n&oacute;ng bỏng nhưng kh&ocirc;ng v&igrave; thế m&agrave; ch&uacute;ng ta c&oacute; thể bỏ qua kh&acirc;u makeup để trở n&ecirc;n xinh đẹp mỗi ng&agrave;y được. C&aacute;c kiểu trang điểm đơn giản m&ugrave;a h&egrave; vừa dễ ứng dụng lại vừa cực hợp với kh&ocirc;ng kh&iacute; m&ugrave;a h&egrave; sẽ kh&ocirc;ng hề khiến cho bạn cakey ch&uacute;t n&agrave;o m&agrave; ngược lại, n&oacute; c&ograve;n mang tới cho bạn vẻ đẹp ngọt ng&agrave;o v&agrave; tươi mới đấy!</p>\r\n',
          cover_image: {
            blur_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/631/blur/covermaga-min.png',
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/631/large/covermaga-min.png',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/631/medium/covermaga-min.png',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/631/original/covermaga-min.png',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/631/thumb/covermaga-min.png'
          },
          created_at: 1592761661,
          description:
            'Mùa hè là thời điểm để những makeup look mang hơi hướm căng mọng và tươi rói như trái cây được các cô nàng ưa chuộng. Kiểu makeup tươi mới kết hợp với những gam màu đặc trưng của hè như vàng, cam trở thành sự lựa chọn hàng đầu. Các nàng hãy check ngay những hướng dẫn trang điểm dưới đây để đã biết những makeup look nào cực kỳ trendy để diện phố mùa hè này chưa nhé.',
          post_type: 'default',
          published_at: 1594289066,
          slug: 'nhung-makeup-look-mua-he-dep-nhu-chinh-anh-chuyen-nghiep-ma-ban-nen-dat-tui-ngay',
          tags: [],
          title: 'Những makeup look mùa hè đẹp như chỉnh ảnh chuyên nghiệp mà bạn nên dắt túi ngay',
          updated_at: 1598263956,
          video_url: '',
          views: 236
        },
        {
          id: 595,
          author: {
            id: 324333,
            avatar: {
              large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
              medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
              thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P'
            },
            avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
            avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
            email: 'trangcbeta02@gmail.com',
            first_name: 'Pham',
            last_name: 'Serene',
            name: 'Serene Pham'
          },
          category: {
            id: 1,
            name: 'Makeup',
            slug: 'makeup'
          },
          content:
            '<p><strong>1/ Make-up năng động đi họp mặt c&ugrave;ng&nbsp;bạn b&egrave;</strong><br />\r\nĐể&nbsp;thoải m&aacute;i quẩy tung trời với hội cạ cứng, bạn n&ecirc;n chăm ch&uacute;t cho&nbsp;lớp nền thật mỏng, nhẹ, kh&ocirc;ng những mang đến&nbsp;lớp <strong>trang điểm&nbsp;tự nhi&ecirc;n</strong> hơn m&agrave; c&ograve;n gi&uacute;p bạn tự tin, thoải m&aacute;i trong mọi hoạt động. Nếu bạn thuộc hội&nbsp;da kh&ocirc;, đừng qu&ecirc;n&nbsp;<a href="https://www.lixibox.com/magazine/top-5-mat-na-sieu-em-ma-cac-nang-da-kho-can-bo-sung-vao-quy-trinh-duong-da-trong-mua-se-lanh">dưỡng ẩm</a> kỹ c&agrave;ng để tr&aacute;nh t&igrave;nh trạng lớp nền bị mốc, bong tr&oacute;c nh&eacute;!<img alt="huong-dan-trang-diem" longdesc="https://www.lixibox.com/shop/laneige-layering-cover-cushion-concealing-base-21, https://www.lixibox.com/shop/klavuu-urban-pearlsation-high-coverage-tension-cushion,  https://www.lixibox.com/shop/phan-nuoc-laneige-layering-cover-cushion-concealing-base-dream-bubble-holiday-collection-no21" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6144/original_huong_dan_trang_diem_3.jpg" style="width: 800px; height: 798px;" />Trang điểm&nbsp;mắt với c&aacute;c t&ocirc;ng&nbsp;m&agrave;u s&aacute;ng l&agrave; sự lựa chọn ho&agrave;n hảo cho buổi đi chơi với bạn b&egrave;. Cam, hồng, n&acirc;u nhạt k&egrave;m th&ecirc;m một ch&uacute;t nhũ mắt xinh y&ecirc;u ch&iacute;nh l&agrave; b&iacute; thuật cho&nbsp;đ&ocirc;i mắt&nbsp;lung linh v&agrave; tươi trẻ hơn.&nbsp;<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/lustre-pro-pressed-shadow, https://www.lixibox.com/shop/lustre-pro-pressed-shadow-taylor-garnet, https://www.lixibox.com/shop/lustre-pro-pressed-shadow-charlotte-russet, https://www.lixibox.com/shop/lustre-pro-volume-waterproof-mascara-black-onyx" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6146/original_huong_dan_trang_diem_4.jpg" style="width: 800px; height: 800px;" />Th&ecirc;m một ch&uacute;t m&aacute; hồng sẽ gi&uacute;p cho tổng thể khu&ocirc;n mặt&nbsp;bạn lu&ocirc;n tr&agrave;n đầy sức sống. Một&nbsp;mẹo&nbsp;<em>hướng dẫn trang điểm</em>&nbsp;nhỏ cho những n&agrave;ng kh&ocirc;ng c&oacute; m&aacute; hồng, bạn c&oacute; thể&nbsp;d&ugrave;ng son kem trộn c&ugrave;ng&nbsp;kem l&oacute;t để tạo th&agrave;nh&nbsp;hỗn hợp m&aacute; hồng vừa xinh xắn vừa nhanh, tiện lợi.&nbsp;<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/lustre-pro-blush-powder, https://www.lixibox.com/shop/lustre-pro-blush-powder-deep-coral, https://www.lixibox.com/shop/lustre-pro-pressed-blush-shading-red" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6143/original_huong_dan_trang_diem_2.jpg" style="width: 800px; height: 798px;" /><strong>2/ Make-up quyến rũ,&nbsp;nổi bật trong c&aacute;c buổi tiệc</strong><br />\r\nChắc chắn kh&ocirc;ng ai muốn m&igrave;nh bị k&eacute;m nổi bật trong c&aacute;c buổi tiệc t&ugrave;ng đ&uacute;ng kh&ocirc;ng n&agrave;o? Đ&ocirc;i mắt thật sắc sảo v&agrave; quyến rũ ch&iacute;nh l&agrave;&nbsp;b&iacute; quyết gi&uacute;p bạn thật nổi bật&nbsp;trong c&aacute;c buổi tiệc. Lời khuy&ecirc;n d&agrave;nh cho bạn l&agrave; h&atilde;y lựa chọn đ&aacute;nh mắt kh&oacute;i kết hợp với kẻ mắt m&egrave;o. Đ&acirc;y l&agrave; kiểu make-up l&agrave;m tăng độ s&acirc;u cho mắt v&agrave; tạo hiệu ứng &aacute;nh nh&igrave;n cuốn h&uacute;t hơn.<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/isehan-heroine-kiss-me-eyeliner, https://www.lixibox.com/shop/isehan-kiss-me-heroine-long-curl-super-water-proof-mascara, https://www.lixibox.com/shop/lustre-pro-flawless-matte-foundation-spf-22-pa-medium-ivory" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6138/original_huong_dan_trang_diem_10.jpg" style="width: 800px; height: 801px;" />Ngo&agrave;i ra, bạn cũng đừng qu&ecirc;n chuẩn bị cho m&igrave;nh một thỏi son đỏ thật quyến rũ v&agrave; sang chảnh. Son đỏ lu&ocirc;n xứng đ&aacute;ng l&agrave; lựa chọn số 1 cho&nbsp;vẻ ngo&agrave;i&nbsp;cuốn h&uacute;t.<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/mac-lipstick-ruby-woo, https://www.lixibox.com/shop/lustre-ultra-slim-matte-lipstick-larawag, https://www.lixibox.com/shop/charlotte-tilbury-hot-lips-2" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6139/original_huong_dan_trang_diem_9.jpg" style="width: 800px; height: 800px;" />B&ecirc;n cạnh đ&oacute;, phấn bắt s&aacute;ng sẽ l&agrave; c&ocirc;ng cụ gi&uacute;p bạn trở n&ecirc;n rực rỡ, lấp l&aacute;nh hơn dưới &aacute;nh đ&egrave;n. H&atilde;y d&ugrave;ng highlight&nbsp;thật kh&eacute;o ở c&aacute;c v&ugrave;ng dễ bắt s&aacute;ng&nbsp;như mũi, tr&aacute;n hay xương quai xanh nếu bạn mặc v&aacute;y hở vai nh&eacute;!&nbsp;<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/bh-cosmetics-blushing-in-bali-6-color-blush-and-highlighter-palette, https://www.lixibox.com/shop/anastasia-beverly-hills-glow-kit-ultimate-glow" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6168/original_huong_dan_trang_diem_19.jpg" style="width: 800px; height: 1066px;" /><strong>3/ Make-up dịu d&agrave;ng, tinh tế trong&nbsp;buổi đo&agrave;n vi&ecirc;n họ h&agrave;ng</strong><br />\r\nKiểu <em>trang điểm nhẹ nh&agrave;ng</em>, sương mai ch&iacute;nh l&agrave; chọn lựa tuyệt vời gi&uacute;p bạn ghi&nbsp;điểm trong buổi ch&uacute;c Tết, gặp mặt gia đ&igrave;nh hay họ h&agrave;ng.<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/lustre-brow-defining-professional-line-dark-taupe, https://www.lixibox.com/shop/missha-velvet-finish-cushion-spf50pa-21 " src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6136/original_huong_dan_trang_diem_13.jpg" style="width: 800px; height: 800px;" />Tiệc đo&agrave;n vi&ecirc;n thường sẽ c&oacute; sự tham gia của nhiều người lớn tuổi, do đ&oacute; những t&ocirc;ng m&agrave;u mắt nhẹ nh&agrave;ng như n&acirc;u nhạt, hồng nude, cam đ&agrave;o,...sẽ gi&uacute;p &aacute;nh nh&igrave;n của bạn trở n&ecirc;n dịu d&agrave;ng, đằm thắm hơn.&nbsp;<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/aritaum-idol-brush-eyeliner-2-b, https://www.lixibox.com/shop/missha-the-style-4d-mascara" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6137/original_huong_dan_trang_diem_14.jpg" style="width: 800px; height: 800px;" />Đừng qu&ecirc;n thổi hồn cho đ&ocirc;i mắt tự nhi&ecirc;n, long lanh hơn bằng c&aacute;ch kẻ mắt s&aacute;t ch&acirc;n mi v&agrave; chuốt mascara nhẹ nh&agrave;ng nh&eacute;!<img alt="huong_dan_trang_diem" longdesc="https://www.lixibox.com/shop/3ce-velvet-lip-tint-daffodil, https://www.lixibox.com/shop/nars-powermatte-lip-pigment-vain, https://www.lixibox.com/shop/innisfree-vivid-oil-tint-4-cinnamon-cherry" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/6148/original_huong_dan_trang_diem_14_%281%29.jpg" style="width: 800px; height: 798px;" />Ngo&agrave;i ra, son m&ocirc;i cũng rất quan trọng,&nbsp;chọn những tone son đỏ hồng hoặc cam ngọt ng&agrave;o sẽ gi&uacute;p&nbsp;gương mặt bừng s&aacute;ng hơn nhưng vẫn đảm bảo được vẻ tự nhi&ecirc;n, dịu d&agrave;ng.</p>\r\n',
          cover_image: {
            blur_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/595/blur/new-year-eve-makeup-looks-min.png',
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/595/large/new-year-eve-makeup-looks-min.png',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/595/medium/new-year-eve-makeup-looks-min.png',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/595/original/new-year-eve-makeup-looks-min.png',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/595/thumb/new-year-eve-makeup-looks-min.png'
          },
          created_at: 1579157830,
          description:
            'Tết là chuỗi ngày bạn sẽ tham gia vào đủ mọi bữa tiệc, từ gia đình cho tới họ hàng và bạn bè. Hãy đảm bảo rằng, dù trang điểm đơn giản hay phức tạp thì bạn vẫn phải thật sang chảnh và “chặt chém” trong các hoạt động đầu năm. Cùng Lixibox tìm hiểu các kiểu trang điểm để giúp bạn xinh đẹp và tỏa sáng nhất trong các buổi tiệc Tết nhé!',
          post_type: 'default',
          published_at: 1579857706,
          slug: 'goi-y-cac-kieu-trang-diem-tu-nhien-nang-tam-nhan-sac-ngay-tet',
          tags: ['trang điểm tự nhiên', 'Hướng dẫn trang điểm'],
          title: 'Gợi ý các kiểu trang điểm tự nhiên nâng tầm nhan sắc ngày Tết',
          updated_at: 1598320915,
          video_url: '',
          views: 2685
        },
        {
          id: 560,
          author: {
            id: 324333,
            avatar: {
              large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
              medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
              thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P'
            },
            avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
            avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=P',
            email: 'trangcbeta02@gmail.com',
            first_name: 'Pham',
            last_name: 'Serene',
            name: 'Serene Pham'
          },
          category: {
            id: 1,
            name: 'Makeup',
            slug: 'makeup'
          },
          content:
            '<p><strong>Monochromatic makeup (trang điểm đơn sắc) l&agrave; g&igrave;?</strong><br />\r\nMonochromatic makeup - ch&iacute;nh l&agrave; xu hướng trang điểm tr&ecirc;n tổng thể gương mặt chỉ với&nbsp;một m&agrave;u duy nhất.&nbsp;Xu hướng n&agrave;y đặc biệt phổ biến tr&ecirc;n thảm đỏ được ưa chuộng bởi những IT Girl h&agrave;ng đầu như Gigi Hadid, Kendall Jenner hay cả những minh tinh điện ảnh như Gal Gadot, Margot Robbie&hellip;<img alt="huong-dan-trang-diem" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5664/content_huong-dan-trang-diem-16.jpg" style="width: 800px; height: 1031px;" />Ưu điểm lớn nhất của xu hướng trang điểm n&agrave;y l&agrave; tiết kiệm thời gian v&agrave; tiết kiệm cả mỹ phẩm cần d&ugrave;ng. Bạn sẽ trở n&ecirc;n thật quyến rũ với phong c&aacute;ch&nbsp;makeup đơn sắc bằng những bước <strong>hướng dẫn trang điểm</strong> dưới đ&acirc;y.</p>\r\n\r\n<p><strong>Chọn m&agrave;u sắc ph&ugrave; hợp với l&agrave;n da của bạn&nbsp;</strong><br />\r\nTrang điểm đơn sắc&nbsp;bắt đầu bằng việc chọn một m&agrave;u cơ bản ph&ugrave; hợp m&agrave;u da của bạn, sau đ&oacute; c&aacute;c chuy&ecirc;n gia sẽ&nbsp;<em>trang điểm đơn giản&nbsp;</em>v&agrave; nhanh ch&oacute;ng bằng việc nhấn nh&aacute; m&agrave;u sắc v&agrave;o mắt, m&aacute; v&agrave; m&ocirc;i. M&agrave;u sắc ph&ugrave; hợp nhất với bạn sẽ phụ thuộc v&agrave;o việc l&agrave;n da của bạn c&oacute; undertone n&agrave;o.&nbsp;<br />\r\n<img alt="huong-dan-trang-diem" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5534/original_huong-dan-trang-diem-7.jpg" style="width: 800px; height: 933px;" />Nếu undertone của bạn l&agrave; cool, m&agrave;u sắc ph&ugrave; hợp với bạn sẽ l&agrave; đỏ burgundy, t&iacute;m hoặc m&agrave;u magenta. Undertone l&agrave; warm th&igrave; gam m&agrave;u cam hoặc v&agrave;ng thuộc tone n&oacute;ng sẽ l&agrave; lựa chọn cho bạn. C&ograve;n c&aacute;c sắc thuộc tone đất như m&agrave;u đồng, hồng đất hay cam đất&nbsp;th&igrave; sẽ d&agrave;nh cho bạn n&agrave;o c&oacute; undertone neutral.</p>\r\n\r\n<p><strong>Một lớp nền chỉn chu nhưng vẫn mỏng nhẹ căng mướt</strong><br />\r\n<img alt="huong-dan-trang-diem" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5536/original_huong-dan-trang-diem-4.jpg" style="width: 800px; height: 800px;" />Để c&aacute;c dải m&agrave;u l&ecirc;n được đ&uacute;ng sắc độ bạn muốn, bạn cần chắc chắn rằng <a href="https://www.lixibox.com/magazine/doc-chieu-danh-kem-nen-cho-da-dau-noi-khong-voi-lop-nen-chay-tuot">lớp nền của bạn thật mượt v&agrave; căng b&oacute;ng</a>. H&atilde;y đảm bảo l&agrave;n da được dưỡng đủ ẩm v&agrave; n&ecirc;n d&ugrave;ng kem l&oacute;t trước khi sử dụng kem nền hoặc cushion. Nếu c&oacute; khuyết điểm tr&ecirc;n da đừng ngại sử dụng th&ecirc;m che khuyết điểm dạng lỏng để lớp nền được ho&agrave;n hảo.<br />\r\n<img alt="huong-dan-trang-diem" longdesc="https://www.lixibox.com/shop/missha-velvet-finish-cushion-spf50pa-21, https://www.lixibox.com/shop/laneige-layering-cover-cushion-concealing-base-21, https://www.lixibox.com/shop/innisfree-my-to-go-cushion-13-30ml, https://www.lixibox.com/shop/lustre-pro-flawless-matte-foundation-spf-22-pa-beige-ivory" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5543/original_huong-dan-trang-diem-12.jpg" style="width: 1000px; height: 388px;" /><strong>Biến h&oacute;a lộng lẫy với Monochromatic Makeup</strong><br />\r\nĐiểm then chốt trong b&agrave;i&nbsp;hướng dẫn trang điểm của xu hướng n&agrave;y ch&iacute;nh l&agrave; m&agrave;u sắc, v&igrave; vậy,&nbsp;m&agrave;u m&aacute; bạn chọn phải đ&uacute;ng concept m&agrave;u sắc, ph&ugrave; hợp với tone da ban đầu bạn chọn. H&atilde;y d&ugrave;ng phấn m&aacute; dạng kem thay v&igrave; dạng phấn để lớp nền được tự nhi&ecirc;n. T&aacute;n kh&eacute;o l&eacute;o từ giữa ra xung quanh để tạo độ tỏa từ đậm sang nhạt.&nbsp;<br />\r\n<img alt="huong-dan-trang-diem" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5626/content_huong-dan-trang-diem-15.jpg" style="width: 800px; height: 1105px;" />Sau đ&oacute;, chọn ch&iacute;nh x&aacute;c gam m&agrave;u bạn đ&atilde; sử dụng cho m&aacute;, t&aacute;n đều l&ecirc;n bầu mắt theo đường nếp gấp của m&iacute;, nhớ l&agrave; d&agrave;n m&agrave;u ra thật đều v&agrave; tạo cảm gi&aacute;c ăn tiệp v&agrave;o da.</p>\r\n\r\n<p><img alt="huong-dan-trang-diem" longdesc="https://www.lixibox.com/shop/lustre-pro-pressed-shadow-victoria-sienna, https://www.lixibox.com/shop/lustre-pro-pressed-shadow-halle-suede, https://www.lixibox.com/shop/lustre-pro-pressed-shadow-miranda-milli, https://www.lixibox.com/shop/bh-cosmetics-zodiac-love-signs-25-color-eyeshadow-and-highlighter-palette, https://www.lixibox.com/shop/bh-cosmetics-blushing-in-bali-6-color-blush-and-highlighter-palette" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5542/original_huong-dan-trang-diem-11.jpg" style="width: 1000px; height: 439px;" />Nếu bạn muốn c&oacute; một đ&ocirc;i mắt c&aacute; t&iacute;nh v&agrave; b&ugrave;ng nổ hơn một ch&uacute;t th&igrave; h&atilde;y t&aacute;n m&agrave;u xếch l&ecirc;n cao, tr&ocirc;ng bạn sẽ thật quyền lực!<br />\r\n<img alt="huong-dan-trang-diem" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5627/original_huong-dan-trang-diem-14.jpg" style="width: 800px; height: 999px;" />Một tip&nbsp;nhỏ d&agrave;nh cho bạn khi chơi với m&agrave;u sắc trong kiểu trang điểm đơn giản nhưng cực kỳ thời thượng n&agrave;y, ch&iacute;nh l&agrave; lấy m&agrave;u mắt l&agrave;m sắc độ trung t&acirc;m, m&agrave;u m&aacute; n&ecirc;n s&aacute;ng hơn một tone so với mắt.<br />\r\n<img alt="huong-dan-trang-diem" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5541/original_huong-dan-trang-diem-8.jpg" style="width: 800px; height: 994px;" />Cuối c&ugrave;ng một m&agrave;u son c&ugrave;ng tone nhưng cần đậm hơn m&agrave;u mắt sẽ khiến tổng thể monochromatic makeup trở n&ecirc;n thu h&uacute;t hơn cả.</p>\r\n\r\n<p><img alt="huong-dan-trang-diem" longdesc="https://www.lixibox.com/shop/lime-crime-dreamgirl-trio-lipstick, https://www.lixibox.com/shop/laneige-tattoo-lip-tint-no8-sand-rose, https://www.lixibox.com/shop/nars-velvet-lip-glide-le-palace" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/5544/original_huong-dan-trang-diem-13.jpg" style="width: 1000px; height: 388px;" /></p>\r\n',
          cover_image: {
            blur_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/560/blur/huong-dan-trang-diem-1.jpg',
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/560/large/huong-dan-trang-diem-1.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/560/medium/huong-dan-trang-diem-1.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/560/original/huong-dan-trang-diem-1.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/blogs/covers/000/000/560/thumb/huong-dan-trang-diem-1.jpg'
          },
          created_at: 1569986742,
          description:
            'Nếu bạn nghĩ rằng makeup đơn sắc thật quá đơn giản và nhàm chán, có lẽ bạn đã bỏ lỡ một trong những xu hướng trang điểm hot nhất của năm mất rồi. Trang điểm đơn giản với một gam màu sẽ trở nên cực kỳ lộng lẫy nếu bạn biết cách cân bằng các sắc độ. Bỏ túi ngay các bước hướng dẫn trang điểm đơn sắc dưới đây để hô biến mình thành cô nàng  thời thượng nhé!',
          post_type: 'default',
          published_at: 1572541200,
          slug: 'don-sac-nhung-khong-don-dieu-huong-dan-trang-diem-cuc-trendy-chi-voi-mot-gam-mau',
          tags: ['trang điểm đơn giản', 'Hướng dẫn trang điểm'],
          title: 'Đơn sắc nhưng không đơn điệu - Hướng dẫn trang điểm cực trendy chỉ với một gam màu',
          updated_at: 1598269849,
          video_url: '',
          views: 825
        }
      ]
    }
  ]
};
const component = (params = {}) => {
  const props = {
    list: magazines,
    slug: 'skincare',
    isTagUrl: false,
    categories: magazineDashboard.categories,
    isShowCategory: true,
    isShowMobileBreadCrumb: true,
    magazineDashboard
  };

  return <MagazineCategoryDetail {...Object.assign({}, props, params)} />;
};

describe('MagazineCategoryDetail', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
