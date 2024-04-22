jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import BlogVideoDetail from '..';

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

const component = (params = {}) => {
  const props = {
    mainVideo: magazine
  };

  return <BlogVideoDetail {...Object.assign({}, props, params)} />;
};

describe('BlogVideoDetail', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
