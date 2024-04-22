jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import IntersectionObserver from '../../../../../../test/mocks/intersection-observer';
import DiscountCodeDetailView from '..';

Object.defineProperty(window, 'IntersectionObserver', { value: IntersectionObserver });

const specialAddons = [
  {
    id: 84,
    add_on_price: 100000,
    box_id: 10275,
    name: 'Velvet Pocket Bag Halio S',
    original_price: 0,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/facebook/1579141288.png?t=1625026858',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/large/1579141288.png?t=1625026858',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/medium/1579141288.png?t=1625026858',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/original/1579141288.png?t=1625026858',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/square/1579141288.png?t=1625026858',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/thumb/1579141288.png?t=1625026858',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/vertical/1579141288.png?t=1625026858'
    },
    primary_picture_medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/303/medium/1579141288.png?t=1625026858',
    short_description: 'Velvet Pocket Bag Halio',
    slug: 'velvet-pocket-bag-halio-s',
    stock: 10
  },
  {
    id: 85,
    add_on_price: 50000,
    box_id: 10341,
    name: ' All Halio Favorites',
    original_price: 2580000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/facebook/1579160507.png?t=1630414402',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/large/1579160507.png?t=1630414402',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/medium/1579160507.png?t=1630414402',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/original/1579160507.png?t=1630414402',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/square/1579160507.png?t=1630414402',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/thumb/1579160507.png?t=1630414402',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/vertical/1579160507.png?t=1630414402'
    },
    primary_picture_medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/045/315/medium/1579160507.png?t=1630414402',
    short_description:
      'Máy rửa mặt Halio Facial Cleansing & Massaging Device - Hot Pink\r\nMáy rửa mặt Halio Ion Cleansing & Moisturizing Beauty Device\r\nLixibox Daily Facial Mask Sheet - Acai Berry\r\nLixibox Daily Facial Mask Sheet - Milk\r\nLixibox Daily Facial Mask Sheet - Bird Nest\r\nSữa rửa mặt Senka Perfect Whip 50gr',
    slug: 'all-halio-favorites',
    stock: 5
  },
  {
    id: 86,
    add_on_price: 30000,
    box_id: 9391,
    name: 'Mặt nạ Naruko Taiwan Magnolia Brightening and Firming Mask',
    original_price: 37000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/facebook/1543823341.jpg?t=1628517766',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/large/1543823341.jpg?t=1628517766',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/medium/1543823341.jpg?t=1628517766',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/original/1543823341.jpg?t=1628517766',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/square/1543823341.jpg?t=1628517766',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/thumb/1543823341.jpg?t=1628517766',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/vertical/1543823341.jpg?t=1628517766'
    },
    primary_picture_medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/099/medium/1543823341.jpg?t=1628517766',
    short_description:
      'Naruko được sáng lập ra bởi chuyên gia mỹ phẩm nổi tiếng, và cũng là cha đẻ của ngành mỹ phẩm Đài Loan: ông Ngưu Dục Lân. Thực chất Naruko chính là viết tắt của các từ N - Niuer ( tên nhà sáng lập ), A - Affordable ( giá cả phải chăng), R - Refine (tinh tế), U - Unique (độc đáo), K - Kindness (thái độ làm việc ân cần), O - Original (sản phẩm luôn đạt chất lượng đồng bộ không đổi). Chính nhờ những tiêu chí làm việc nghiêm chỉnh cùng phương thức hoạt động rõ ràng trong suốt hơn một thập kỷ qua, mà tính đến thời điểm hiện tại Naruko luôn có mặt trong top những thương hiệu dẫn đầu và có chỗ đứng ổn định vững chắc trong ngành công nghiệp hóa mỹ phẩm khắc nghiệt của Đài Loan. Mặt Nạ Giấy Naruko Taiwan Magnolia Brightening & Firming EX Mask là sản phẩm mặt nạ giấy giúp bảo vệ, phục hồi da, nâng cơ, chống lão hóa, tìm lại nét thanh xuân, cho làn da luôn trắng sáng rạng rỡ. – Chứa Arbutin là hoạt chất chiết xuất từ loại quả bearberry, với cơ chế hoạt động giảm nhẹ sự sản sinh hắc tố melanin quá mạnh mẽ, từ đó giúp làm sáng trắng và cải thiện sắc tố da. – Chiết xuất cam thảo (Licorice Root Extract) có đặc tính chống oxy hóa, kháng viêm, hiệu quả trong việc ngăn chặn tia cực tím và làm sáng da hiệu quả. – Mask còn bổ sung hàng loạt tinh chất chiết suất hữu cơ có tác dụng chống oxy hóa và làm sáng da mạnh mẽ. – Ngoài ra, còn có Shea butter & Argan oil giúp dưỡng ẩm cho da, green tea giúp da kháng viêm tốt hơn, Ginkgo Bibola & Chamomilla giúp tăng khả năng tự vệ của tế bào da. – Cải thiện làn da khô, thô ráp, xỉn màu, lỗ chân lông to, da xuất hiện nếp nhăn. – Chứa vitamin C giúp làm sáng và đều màu da một cách hiệu quả. – Dạng gel thích hợp với mọi loại da',
    slug: 'naruto-taiwan-magnolia-brightening-and-firming-mask-ex-10pcs-box',
    stock: 8
  }
];

const applicableBoxes = [
  {
    id: 3130,
    added_to_waitlist: false,
    badges: {
      top_left: 'https://upload.lixibox.com/system/badges/icons/000/000/306/list/1627458527.png',
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Halio',
    coins_price: 0,
    discount_percent: 30,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 2098,
    lixibox_id: 'LX11167ED331',
    name: '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Hot Pink',
    original_price: 810000,
    pre_order_release_date: 1587229200,
    pre_order_status: null,
    preview_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/415/facebook/1620394080.jpg?t=1634293322',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/415/large/1620394080.jpg?t=1634293322',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/415/medium/1620394080.jpg?t=1634293322',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/415/original/1620394080.jpg?t=1634293322',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/415/square/1620394080.jpg?t=1634293322',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/415/thumb/1620394080.jpg?t=1634293322',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/415/vertical/1620394080.jpg?t=1634293322'
    },
    price: 559000,
    price_sale_off: 559000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/facebook/1502340472.png?t=1634293322',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/large/1502340472.png?t=1634293322',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/medium/1502340472.png?t=1634293322',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/original/1502340472.png?t=1634293322',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/square/1502340472.png?t=1634293322',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/thumb/1502340472.png?t=1634293322',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/vertical/1502340472.png?t=1634293322'
    },
    rating: {
      avg_rate: 4.7,
      count: 4243
    },
    short_description:
      'Halio là thương hiệu máy rửa mặt sử dụng công nghệ Sonic Wave Cleansing giúp làm sạch sâu gấp 10 lần và loại bỏ tới 99% dầu thừa cũng như lớp trang điểm còn sót lại mà vẫn dịu nhẹ không gây lão hoá cho làn da. Đồng thời, Halio cũng giúp massage thư giãn khuôn mặt sau một ngày làm việc căng thẳng. Máy đã có kèm sẵn dây sạc và hộp đựng. Máy rửa mặt Halio với 5 ưu điểm vượt trội: - Sử dụng công nghệ Sonic Wave, làm sạch sâu mà vẫn dịu nhẹ với làn da, kể cả da khô và lão hoá. - Thay đổi tới 14 chế độ rung, phù hợp với cả những làn da nhạy cảm nhất. - Bề mặt cọ rộng hơn, nhanh chóng rửa sạch toàn bộ khuôn mặt. - Dễ dàng đi vào những góc khó nhất trên khuôn mặt, làm sạch toàn diện. - Nắp đậy silicon cho cổng sạc, chống thấm nước tuyệt đối. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm. - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng. Lưu ý: - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - Từ ngày 22/4/2019, khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic sẽ tiến hành đăng kí thông tin theo các bước trên để nhận bảo hành. - Đối với khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic trước ngày 22/4/2019 vẫn được nhận bảo hành bằng cách nhắn tin mã đơn hàng cho bộ phận chăm sóc khách hàng Lixibox.',
    slug: 'may-rua-mat-halio-facial-cleansing-massaging',
    stock: 10,
    store_stock: 10,
    variant_options: [
      {
        box_id: 3130,
        box_slug: 'may-rua-mat-halio-facial-cleansing-massaging',
        name: 'Hot Pink',
        presentation: 'Hot Pink',
        color_code: '#F43082',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/thumb/1502340472.png?t=1628759284',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/square/1502340472.png?t=1628759284'
      },
      {
        box_id: 3193,
        box_slug: 'halio-facial-cleansing-massaging-device-sky-blue',
        name: 'Sky Blue',
        presentation: 'Sky Blue',
        color_code: '#049CF0',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/thumb/1502351258.png?t=1628751797',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/square/1502351258.png?t=1628751797'
      },
      {
        box_id: 3301,
        box_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        name: 'Baby Pink',
        presentation: 'BABY PINK',
        color_code: '#FE8DA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/thumb/1502351590.png?t=1628769044',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/square/1502351590.png?t=1628769044'
      },
      {
        box_id: 5674,
        box_slug: 'halio-facial-cleansing-massaging-device-mustard',
        name: '',
        presentation: 'Mustard',
        color_code: '#FFB81C',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/814/thumb/1506058287.png?t=1628751507',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/814/square/1506058287.png?t=1628751507'
      },
      {
        box_id: 5675,
        box_slug: 'halio-facial-cleansing-massaging-grey-smoke',
        name: '',
        presentation: 'Grey Smoke',
        color_code: '#898D8D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/815/thumb/1506061087.png?t=1628758238',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/815/square/1506061087.png?t=1628758238'
      }
    ]
  },
  {
    id: 3193,
    added_to_waitlist: false,
    badges: {
      top_left: 'https://upload.lixibox.com/system/badges/icons/000/000/306/list/1627458527.png',
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Halio',
    coins_price: 0,
    discount_percent: 30,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 1090,
    lixibox_id: 'LX442A46B389',
    name: '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Sky Blue',
    original_price: 810000,
    pre_order_release_date: 1588179600,
    pre_order_status: null,
    preview_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/416/facebook/1620394135.jpg?t=1634293317',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/416/large/1620394135.jpg?t=1634293317',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/416/medium/1620394135.jpg?t=1634293317',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/416/original/1620394135.jpg?t=1634293317',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/416/square/1620394135.jpg?t=1634293317',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/416/thumb/1620394135.jpg?t=1634293317',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/416/vertical/1620394135.jpg?t=1634293317'
    },
    price: 559000,
    price_sale_off: 559000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/facebook/1502351258.png?t=1634293317',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/large/1502351258.png?t=1634293317',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/medium/1502351258.png?t=1634293317',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/original/1502351258.png?t=1634293317',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/square/1502351258.png?t=1634293317',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/thumb/1502351258.png?t=1634293317',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/vertical/1502351258.png?t=1634293317'
    },
    rating: {
      avg_rate: 4.8,
      count: 2373
    },
    short_description:
      'Halio là thương hiệu máy rửa mặt sử dụng công nghệ Sonic Wave Cleansing giúp làm sạch sâu gấp 10 lần và loại bỏ tới 99% dầu thừa cũng như lớp trang điểm còn sót lại mà vẫn dịu nhẹ không gây lão hoá cho làn da. Đồng thời, Halio cũng giúp massage thư giãn khuôn mặt sau một ngày làm việc căng thẳng. Máy đã có kèm sẵn dây sạc và hộp đựng. Máy rửa mặt Halio với 5 ưu điểm vượt trội: - Sử dụng công nghệ Sonic Wave, làm sạch sâu mà vẫn dịu nhẹ với làn da, kể cả da khô và lão hoá. - Thay đổi tới 14 chế độ rung, phù hợp với cả những làn da nhạy cảm nhất. - Bề mặt cọ rộng hơn, nhanh chóng rửa sạch toàn bộ khuôn mặt. - Dễ dàng đi vào những góc khó nhất trên khuôn mặt, làm sạch toàn diện. - Nắp đậy silicon cho cổng sạc, chống thấm nước tuyệt đối. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm. - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng. Lưu ý: - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - Từ ngày 22/4/2019, khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic sẽ tiến hành đăng kí thông tin theo các bước trên để nhận bảo hành. - Đối với khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic trước ngày 22/4/2019 vẫn được nhận bảo hành bằng cách nhắn tin mã đơn hàng cho bộ phận chăm sóc khách hàng Lixibox.',
    slug: 'halio-facial-cleansing-massaging-device-sky-blue',
    stock: 10,
    store_stock: 10,
    variant_options: [
      {
        box_id: 3130,
        box_slug: 'may-rua-mat-halio-facial-cleansing-massaging',
        name: 'Hot Pink',
        presentation: 'Hot Pink',
        color_code: '#F43082',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/thumb/1502340472.png?t=1628759284',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/square/1502340472.png?t=1628759284'
      },
      {
        box_id: 3193,
        box_slug: 'halio-facial-cleansing-massaging-device-sky-blue',
        name: 'Sky Blue',
        presentation: 'Sky Blue',
        color_code: '#049CF0',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/thumb/1502351258.png?t=1628751797',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/square/1502351258.png?t=1628751797'
      },
      {
        box_id: 3301,
        box_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        name: 'Baby Pink',
        presentation: 'BABY PINK',
        color_code: '#FE8DA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/thumb/1502351590.png?t=1628769044',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/square/1502351590.png?t=1628769044'
      },
      {
        box_id: 5674,
        box_slug: 'halio-facial-cleansing-massaging-device-mustard',
        name: '',
        presentation: 'Mustard',
        color_code: '#FFB81C',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/814/thumb/1506058287.png?t=1628751507',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/814/square/1506058287.png?t=1628751507'
      },
      {
        box_id: 5675,
        box_slug: 'halio-facial-cleansing-massaging-grey-smoke',
        name: '',
        presentation: 'Grey Smoke',
        color_code: '#898D8D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/815/thumb/1506061087.png?t=1628758238',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/815/square/1506061087.png?t=1628758238'
      }
    ]
  },
  {
    id: 3301,
    added_to_waitlist: false,
    badges: {
      top_left: 'https://upload.lixibox.com/system/badges/icons/000/000/306/list/1627458527.png',
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Halio',
    coins_price: 0,
    discount_percent: 30,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 1626,
    lixibox_id: 'LX1AFA05397C',
    name: '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
    original_price: 810000,
    pre_order_release_date: 1616605200,
    pre_order_status: null,
    preview_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/417/facebook/1620394192.jpg?t=1634293306',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/417/large/1620394192.jpg?t=1634293306',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/417/medium/1620394192.jpg?t=1634293306',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/417/original/1620394192.jpg?t=1634293306',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/417/square/1620394192.jpg?t=1634293306',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/417/thumb/1620394192.jpg?t=1634293306',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/058/417/vertical/1620394192.jpg?t=1634293306'
    },
    price: 559000,
    price_sale_off: 559000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/facebook/1502351590.png?t=1634293306',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/large/1502351590.png?t=1634293306',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/medium/1502351590.png?t=1634293306',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/original/1502351590.png?t=1634293306',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/square/1502351590.png?t=1634293306',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/thumb/1502351590.png?t=1634293306',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/vertical/1502351590.png?t=1634293306'
    },
    rating: {
      avg_rate: 4.8,
      count: 3132
    },
    short_description:
      'Halio là thương hiệu máy rửa mặt sử dụng công nghệ Sonic Wave Cleansing giúp làm sạch sâu gấp 10 lần và loại bỏ tới 99% dầu thừa cũng như lớp trang điểm còn sót lại mà vẫn dịu nhẹ không gây lão hoá cho làn da. Đồng thời, Halio cũng giúp massage thư giãn khuôn mặt sau một ngày làm việc căng thẳng. Máy đã có kèm sẵn dây sạc và hộp đựng. Máy rửa mặt Halio với 5 ưu điểm vượt trội: - Sử dụng công nghệ Sonic Wave, làm sạch sâu mà vẫn dịu nhẹ với làn da, kể cả da khô và lão hoá. - Thay đổi tới 14 chế độ rung, phù hợp với cả những làn da nhạy cảm nhất. - Bề mặt cọ rộng hơn, nhanh chóng rửa sạch toàn bộ khuôn mặt. - Dễ dàng đi vào những góc khó nhất trên khuôn mặt, làm sạch toàn diện. - Nắp đậy silicon cho cổng sạc, chống thấm nước tuyệt đối. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm. - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng. Lưu ý: - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - Từ ngày 22/4/2019, khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic sẽ tiến hành đăng kí thông tin theo các bước trên để nhận bảo hành. - Đối với khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic trước ngày 22/4/2019 vẫn được nhận bảo hành bằng cách nhắn tin mã đơn hàng cho bộ phận chăm sóc khách hàng Lixibox.',
    slug: 'halio-facial-cleansing-massaging-device-baby-pink',
    stock: 10,
    store_stock: 10,
    variant_options: [
      {
        box_id: 3130,
        box_slug: 'may-rua-mat-halio-facial-cleansing-massaging',
        name: 'Hot Pink',
        presentation: 'Hot Pink',
        color_code: '#F43082',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/thumb/1502340472.png?t=1628759284',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/612/square/1502340472.png?t=1628759284'
      },
      {
        box_id: 3193,
        box_slug: 'halio-facial-cleansing-massaging-device-sky-blue',
        name: 'Sky Blue',
        presentation: 'Sky Blue',
        color_code: '#049CF0',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/thumb/1502351258.png?t=1628751797',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/615/square/1502351258.png?t=1628751797'
      },
      {
        box_id: 3301,
        box_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        name: 'Baby Pink',
        presentation: 'BABY PINK',
        color_code: '#FE8DA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/thumb/1502351590.png?t=1628769044',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/620/square/1502351590.png?t=1628769044'
      },
      {
        box_id: 5674,
        box_slug: 'halio-facial-cleansing-massaging-device-mustard',
        name: '',
        presentation: 'Mustard',
        color_code: '#FFB81C',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/814/thumb/1506058287.png?t=1628751507',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/814/square/1506058287.png?t=1628751507'
      },
      {
        box_id: 5675,
        box_slug: 'halio-facial-cleansing-massaging-grey-smoke',
        name: '',
        presentation: 'Grey Smoke',
        color_code: '#898D8D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/815/thumb/1506061087.png?t=1628758238',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/815/square/1506061087.png?t=1628758238'
      }
    ]
  }
];

const giftBoxes = [
  {
    id: 8461,
    added_to_waitlist: false,
    badges: {
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Lixibox',
    coins_price: null,
    discount_percent: 36,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 43,
    lixibox_id: 'LX5FD2C1A122',
    name: 'Lixibox Daily Facial Mask Sheet - Pearl',
    original_price: 30000,
    pre_order_release_date: null,
    pre_order_status: null,
    preview_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/960/facebook/1543376595.png?t=1635315594',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/960/large/1543376595.png?t=1635315594',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/960/medium/1543376595.png?t=1635315594',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/960/original/1543376595.png?t=1635315594',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/960/square/1543376595.png?t=1635315594',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/960/thumb/1543376595.png?t=1635315594',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/960/vertical/1543376595.png?t=1635315594'
    },
    price: 19000,
    price_sale_off: 19000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/facebook/1543376516.png?t=1635315594',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/large/1543376516.png?t=1635315594',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/medium/1543376516.png?t=1635315594',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/original/1543376516.png?t=1635315594',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/square/1543376516.png?t=1635315594',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/thumb/1543376516.png?t=1635315594',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/vertical/1543376516.png?t=1635315594'
    },
    rating: {
      avg_rate: 4.5,
      count: 196
    },
    short_description:
      'Trong sách thuốc cổ “Bản thảo võng mục” đã ghi lại rằng ngọc trai đạt hiệu quả cực cao trong việc giúp da trở nên mịn màng trắng sáng. Chính từ đó, ngọc trai đã trở thành bí quyết làm đẹp không thế thiếu của các bậc vua chúa cũng như các tầng lớp quan lại quý tộc xưa. Ngày nay, với phương tiện khoa học kỹ thuật phát triển, thông qua phương thức phân tích thủy phân, chúng ta biết được rằng ngọc trai chứa đựng rất nhiều các nguyên tố vi lượng và axit amin, giúp bảo vệ và xoa dịu da tránh khỏi các trường hợp tổn thương khó chịu, duy trì khả năng phòng ngự, giữ lại độ tuổi thanh xuân cho da, cung cấp độ chắc khỏe, làm chậm lại quá trình lão hóa, nuôi dưỡng và duy trì vẻ trắng hồng da. Sản phẩm hoàn toàn không chứa thành phần chất bảo quản Paraben, cồn rượu, dầu khoáng vật, các sắc tố, các thành phần chất làm trắng quang học …',
    slug: 'lixibox-daily-facial-mask-sheet-pearl',
    stock: 10,
    store_stock: 10,
    variant_options: [
      {
        box_id: 8458,
        box_slug: 'lixibox-daily-facial-mask-sheet-acai-berry',
        name: 'Acai Berry',
        presentation: 'Ultimate Pink',
        color_code: '#E25CA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/961/thumb/1543376681.png?t=1628769509',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/961/square/1543376681.png?t=1628769509'
      },
      {
        box_id: 8462,
        box_slug: 'lixibox-daily-facial-mask-sheet-seaweed',
        name: 'Seaweed',
        presentation: 'Blueberry Acai',
        color_code: '#7BC6E6',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/963/thumb/1543377494.png?t=1628763236',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/963/square/1543377494.png?t=1628763236'
      },
      {
        box_id: 8463,
        box_slug: 'lixibox-daily-facial-mask-sheet-milk',
        name: 'Milk',
        presentation: 'Grey Smoke',
        color_code: '#898D8D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/thumb/1543377587.png?t=1628769514',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/square/1543377587.png?t=1628769514'
      },
      {
        box_id: 8464,
        box_slug: 'lixibox-daily-facial-mask-sheet-aloe',
        name: 'Aloe',
        presentation: 'CERAVE',
        color_code: '#58C49D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/thumb/1543377681.png?t=1628764879',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/square/1543377681.png?t=1628764879'
      },
      {
        box_id: 8459,
        box_slug: 'lixibox-daily-facial-mask-sheet-green-tea',
        name: 'Green Tea',
        presentation: 'Green Corrector',
        color_code: '#A1C17D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/950/thumb/1543373886.png?t=1628769521',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/950/square/1543373886.png?t=1628769521'
      },
      {
        box_id: 8460,
        box_slug: 'lixibox-daily-facial-mask-sheet-bird-nest',
        name: 'Bird Nest',
        presentation: 'Sky Blue',
        color_code: '#049CF0',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/955/thumb/1543375334.png?t=1628759289',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/955/square/1543375334.png?t=1628759289'
      },
      {
        box_id: 8461,
        box_slug: 'lixibox-daily-facial-mask-sheet-pearl',
        name: 'Pearl ',
        presentation: 'No Color',
        color_code: '#E9DFA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/thumb/1543376516.png?t=1628769051',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/square/1543376516.png?t=1628769051'
      }
    ]
  },
  {
    id: 8463,
    added_to_waitlist: false,
    badges: {
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Lixibox',
    coins_price: 450,
    discount_percent: 36,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 97,
    lixibox_id: 'LX5E1AFA4793',
    name: 'Lixibox Daily Facial Mask Sheet - Milk',
    original_price: 30000,
    pre_order_release_date: null,
    pre_order_status: null,
    preview_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/966/facebook/1543377615.png?t=1635522730',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/966/large/1543377615.png?t=1635522730',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/966/medium/1543377615.png?t=1635522730',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/966/original/1543377615.png?t=1635522730',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/966/square/1543377615.png?t=1635522730',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/966/thumb/1543377615.png?t=1635522730',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/966/vertical/1543377615.png?t=1635522730'
    },
    price: 19000,
    price_sale_off: 19000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/facebook/1543377587.png?t=1635522730',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/large/1543377587.png?t=1635522730',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/medium/1543377587.png?t=1635522730',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/original/1543377587.png?t=1635522730',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/square/1543377587.png?t=1635522730',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/thumb/1543377587.png?t=1635522730',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/vertical/1543377587.png?t=1635522730'
    },
    rating: {
      avg_rate: 4.6,
      count: 686
    },
    short_description:
      'Chiết xuất từ sữa giúp da mềm, sáng trắng và cung cấp độ ẩm cho da ,nó rất tốt cho da mụn đồng thời giúp giảm thâm, nám, tạo làn da sáng hồng. - Giúp da luôn tươi sáng, giữ được độ ẩm cẩn thiết tránh hiện tượng nứt nẻ,xóa vết nhăn và thâm quanh vùng mí mắt sau những ngày làm việc mệt mỏi. - An toàn cho mọi loại da.',
    slug: 'lixibox-daily-facial-mask-sheet-milk',
    stock: 10,
    store_stock: 10,
    variant_options: [
      {
        box_id: 8458,
        box_slug: 'lixibox-daily-facial-mask-sheet-acai-berry',
        name: 'Acai Berry',
        presentation: 'Ultimate Pink',
        color_code: '#E25CA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/961/thumb/1543376681.png?t=1628769509',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/961/square/1543376681.png?t=1628769509'
      },
      {
        box_id: 8462,
        box_slug: 'lixibox-daily-facial-mask-sheet-seaweed',
        name: 'Seaweed',
        presentation: 'Blueberry Acai',
        color_code: '#7BC6E6',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/963/thumb/1543377494.png?t=1628763236',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/963/square/1543377494.png?t=1628763236'
      },
      {
        box_id: 8463,
        box_slug: 'lixibox-daily-facial-mask-sheet-milk',
        name: 'Milk',
        presentation: 'Grey Smoke',
        color_code: '#898D8D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/thumb/1543377587.png?t=1628769514',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/square/1543377587.png?t=1628769514'
      },
      {
        box_id: 8464,
        box_slug: 'lixibox-daily-facial-mask-sheet-aloe',
        name: 'Aloe',
        presentation: 'CERAVE',
        color_code: '#58C49D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/thumb/1543377681.png?t=1628764879',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/square/1543377681.png?t=1628764879'
      },
      {
        box_id: 8459,
        box_slug: 'lixibox-daily-facial-mask-sheet-green-tea',
        name: 'Green Tea',
        presentation: 'Green Corrector',
        color_code: '#A1C17D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/950/thumb/1543373886.png?t=1628769521',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/950/square/1543373886.png?t=1628769521'
      },
      {
        box_id: 8460,
        box_slug: 'lixibox-daily-facial-mask-sheet-bird-nest',
        name: 'Bird Nest',
        presentation: 'Sky Blue',
        color_code: '#049CF0',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/955/thumb/1543375334.png?t=1628759289',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/955/square/1543375334.png?t=1628759289'
      },
      {
        box_id: 8461,
        box_slug: 'lixibox-daily-facial-mask-sheet-pearl',
        name: 'Pearl ',
        presentation: 'No Color',
        color_code: '#E9DFA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/thumb/1543376516.png?t=1628769051',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/square/1543376516.png?t=1628769051'
      }
    ]
  },
  {
    id: 8464,
    added_to_waitlist: false,
    badges: {
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Lixibox',
    coins_price: null,
    discount_percent: 36,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 40,
    lixibox_id: 'LX2E1F831AEC',
    name: 'Lixibox Daily Facial Mask Sheet - Aloe',
    original_price: 30000,
    pre_order_release_date: null,
    pre_order_status: null,
    preview_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/968/facebook/1543377723.png?t=1635315642',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/968/large/1543377723.png?t=1635315642',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/968/medium/1543377723.png?t=1635315642',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/968/original/1543377723.png?t=1635315642',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/968/square/1543377723.png?t=1635315642',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/968/thumb/1543377723.png?t=1635315642',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/968/vertical/1543377723.png?t=1635315642'
    },
    price: 19000,
    price_sale_off: 19000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/facebook/1543377681.png?t=1635315642',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/large/1543377681.png?t=1635315642',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/medium/1543377681.png?t=1635315642',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/original/1543377681.png?t=1635315642',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/square/1543377681.png?t=1635315642',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/thumb/1543377681.png?t=1635315642',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/vertical/1543377681.png?t=1635315642'
    },
    rating: {
      avg_rate: 4.6,
      count: 219
    },
    short_description:
      '“Lô hội Curacao” được sinh ra tại môi trường đầy khắc nghiệt đòi hỏi sức sống kiên cường để tồn tại,đã tạo nên giống cây có chất lượng và giá trị thực tiễn cao. Từ khi sinh ra đã luôn phải chống chọi với điều kiện thiên nhiên khô hạn, thời tiết biến đổi không ngừng đã khiến loài thực vật này tự sản sinh ra sức đề kháng có khả năng chống chọi lại với thách thức cũng như tác nhân môi trường xung quanh tạo ra. Sau khi cắt bỏ lớp vỏ là nhân trong của nha đam. Phía trong phần này có chứa mucopolysaccharides, cung cấp cho da khô một chế độ bổ sung nước và cấp ẩm kịp thời, khóa chặt lượng nước được cấp, giảm thiểu cao nhất khả năng kích thích từ các tác nhân bên ngoài, giúp duy trì và ổn định nước cho da. Toàn bộ lô hội sử dụng trong sản phẩm được tưới nước, thu hoạch và bóc tách trong vòng 6 tiếng để giữ độ tươi mới tối đa, đảm bảo lô hội với chất lượng tuyệt hảo nhất. Sản phẩm hoàn toàn không chứa thành phần chất bảo quản Paraben, cồn rượu, dầu khoáng vật, các sắc tố, các thành phần chất làm trắng quang học …Chính vì vậy, sản phẩm không gây kích ứng da',
    slug: 'lixibox-daily-facial-mask-sheet-aloe',
    stock: 10,
    store_stock: 10,
    variant_options: [
      {
        box_id: 8458,
        box_slug: 'lixibox-daily-facial-mask-sheet-acai-berry',
        name: 'Acai Berry',
        presentation: 'Ultimate Pink',
        color_code: '#E25CA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/961/thumb/1543376681.png?t=1628769509',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/961/square/1543376681.png?t=1628769509'
      },
      {
        box_id: 8462,
        box_slug: 'lixibox-daily-facial-mask-sheet-seaweed',
        name: 'Seaweed',
        presentation: 'Blueberry Acai',
        color_code: '#7BC6E6',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/963/thumb/1543377494.png?t=1628763236',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/963/square/1543377494.png?t=1628763236'
      },
      {
        box_id: 8463,
        box_slug: 'lixibox-daily-facial-mask-sheet-milk',
        name: 'Milk',
        presentation: 'Grey Smoke',
        color_code: '#898D8D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/thumb/1543377587.png?t=1628769514',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/965/square/1543377587.png?t=1628769514'
      },
      {
        box_id: 8464,
        box_slug: 'lixibox-daily-facial-mask-sheet-aloe',
        name: 'Aloe',
        presentation: 'CERAVE',
        color_code: '#58C49D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/thumb/1543377681.png?t=1628764879',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/967/square/1543377681.png?t=1628764879'
      },
      {
        box_id: 8459,
        box_slug: 'lixibox-daily-facial-mask-sheet-green-tea',
        name: 'Green Tea',
        presentation: 'Green Corrector',
        color_code: '#A1C17D',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/950/thumb/1543373886.png?t=1628769521',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/950/square/1543373886.png?t=1628769521'
      },
      {
        box_id: 8460,
        box_slug: 'lixibox-daily-facial-mask-sheet-bird-nest',
        name: 'Bird Nest',
        presentation: 'Sky Blue',
        color_code: '#049CF0',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/955/thumb/1543375334.png?t=1628759289',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/955/square/1543375334.png?t=1628759289'
      },
      {
        box_id: 8461,
        box_slug: 'lixibox-daily-facial-mask-sheet-pearl',
        name: 'Pearl ',
        presentation: 'No Color',
        color_code: '#E9DFA1',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/thumb/1543376516.png?t=1628769051',
        preview_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/036/959/square/1543376516.png?t=1628769051'
      }
    ]
  }
];

const component = (params = {}) => {
  const props = {
    code: 'LXBCODE',
    specialAddons: { index: specialAddons, showAll: true, showAllLink: '#', count: specialAddons.length },
    applicableBoxes: { index: applicableBoxes, showAll: true, showAllLink: '#', count: applicableBoxes.length },
    giftBoxes: { index: giftBoxes, showAll: false, showAllLink: '#', count: giftBoxes.length },
    isLoaded: true,
    isFailed: false,
    isCompact: false,
    hasPageToLoad: true,
    hasNoContent: false,
    onNoContentClick: jest.fn(),
    onLoadMore: jest.fn()
  };

  return <DiscountCodeDetailView {...Object.assign({}, props, params)} />;
};

describe('DiscountCodeDetailView', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
