jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReviewStickyList from '..';

const communityTopReview = [
  {
    id: 5675,
    brand_name: 'Halio',
    feeds: [
      {
        id: 20753,
        box: {
          id: 5675,
          name: '[Nhập HOGIFT - FREE Quà 135K] Máy rửa mặt Halio Facial Cleansing & Massaging Device - Grey Smoke',
          thumb_picture_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/815/thumb/1506061087.png?t=1631328811'
        },
        boxes: [
          {
            id: 5675,
            brand_name: 'Halio',
            is_individual: true,
            is_saleable: true,
            name: '[Nhập HOGIFT - FREE Quà 135K] Máy rửa mặt Halio Facial Cleansing & Massaging Device - Grey Smoke',
            original_price: 810000,
            price: 539000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/023/815/facebook/1506061087.png?t=1631328811',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/023/815/large/1506061087.png?t=1631328811',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/023/815/medium/1506061087.png?t=1631328811',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/023/815/original/1506061087.png?t=1631328811',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/023/815/square/1506061087.png?t=1631328811',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/023/815/thumb/1506061087.png?t=1631328811',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/023/815/vertical/1506061087.png?t=1631328811'
            },
            short_description:
              'Halio là thương hiệu máy rửa mặt sử dụng công nghệ Sonic Wave Cleansing giúp làm sạch sâu gấp 10 lần và loại bỏ tới 99% dầu thừa cũng như lớp trang điểm còn sót lại mà vẫn dịu nhẹ không gây lão hoá cho làn da. Đồng thời, Halio cũng giúp massage thư giãn khuôn mặt sau một ngày làm việc căng thẳng. Máy đã có kèm sẵn dây sạc và hộp đựng. Máy rửa mặt Halio với 5 ưu điểm vượt trội: - Sử dụng công nghệ Sonic Wave, làm sạch sâu mà vẫn dịu nhẹ với làn da, kể cả da khô và lão hoá. - Thay đổi tới 14 chế độ rung, phù hợp với cả những làn da nhạy cảm nhất. - Bề mặt cọ rộng hơn, nhanh chóng rửa sạch toàn bộ khuôn mặt. - Dễ dàng đi vào những góc khó nhất trên khuôn mặt, làm sạch toàn diện. - Nắp đậy silicon cho cổng sạc, chống thấm nước tuyệt đối. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm. - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng. Lưu ý: - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - Từ ngày 22/4/2019, khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic sẽ tiến hành đăng kí thông tin theo các bước trên để nhận bảo hành. - Đối với khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic trước ngày 22/4/2019 vẫn được nhận bảo hành bằng cách nhắn tin mã đơn hàng cho bộ phận chăm sóc khách hàng Lixibox.',
            slug: 'halio-facial-cleansing-massaging-grey-smoke',
            status: 'approved'
          }
        ],
        created_at: 1631235452,
        feedable: {
          feedback: {
            id: 91001,
            box: {
              box: {
                id: 5675,
                brand_name: 'Halio',
                is_individual: true,
                is_saleable: true,
                name: '[Nhập HOGIFT - FREE Quà 135K] Máy rửa mặt Halio Facial Cleansing & Massaging Device - Grey Smoke',
                original_price: 810000,
                price: 539000,
                primary_picture: {
                  picture_with_dimensions: {
                    height: 650,
                    id: 5675,
                    url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/large/1506061087.png?t=1631328811',
                    width: 960
                  }
                },
                short_description:
                  'Halio là thương hiệu máy rửa mặt sử dụng công nghệ Sonic Wave Cleansing giúp làm sạch sâu gấp 10 lần và loại bỏ tới 99% dầu thừa cũng như lớp trang điểm còn sót lại mà vẫn dịu nhẹ không gây lão hoá cho làn da. Đồng thời, Halio cũng giúp massage thư giãn khuôn mặt sau một ngày làm việc căng thẳng. Máy đã có kèm sẵn dây sạc và hộp đựng. Máy rửa mặt Halio với 5 ưu điểm vượt trội: - Sử dụng công nghệ Sonic Wave, làm sạch sâu mà vẫn dịu nhẹ với làn da, kể cả da khô và lão hoá. - Thay đổi tới 14 chế độ rung, phù hợp với cả những làn da nhạy cảm nhất. - Bề mặt cọ rộng hơn, nhanh chóng rửa sạch toàn bộ khuôn mặt. - Dễ dàng đi vào những góc khó nhất trên khuôn mặt, làm sạch toàn diện. - Nắp đậy silicon cho cổng sạc, chống thấm nước tuyệt đối. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm. - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng. Lưu ý: - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - Từ ngày 22/4/2019, khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic sẽ tiến hành đăng kí thông tin theo các bước trên để nhận bảo hành. - Đối với khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic trước ngày 22/4/2019 vẫn được nhận bảo hành bằng cách nhắn tin mã đơn hàng cho bộ phận chăm sóc khách hàng Lixibox.',
                slug: 'halio-facial-cleansing-massaging-grey-smoke',
                status: 'approved'
              }
            },
            created_at: 1631235452,
            rating: 5,
            review:
              'Dùng 1 thời gian rồi mình mới lên đánh giá Máy rửa mặt ok, mỗi lần dùng xong thấy da bóng mịn, rất thích Mới mua về thì sau 2 ngày mình sạc, mình dùng 3 tháng đến nay vẫn chưa hết pin từ lần sạc đầu',
            title: ''
          }
        },
        feedable_id: 91001,
        feedable_type: 'Feedback',
        feedable_url: '',
        liked: false,
        likes: [],
        message:
          'Dùng 1 thời gian rồi mình mới lên đánh giá Máy rửa mặt ok, mỗi lần dùng xong thấy da bóng mịn, rất thích Mới mua về thì sau 2 ngày mình sạc, mình dùng 3 tháng đến nay vẫn chưa hết pin từ lần sạc đầu',
        object_type: 'ActivityFeed',
        pictures: [
          {
            id: 62350,
            height: 1440,
            url: 'https://upload.lixibox.com/system/pictures/files/000/062/350/original/1631235454.jpg?v=1',
            width: 1080
          }
        ],
        pinned: false,
        rating: 5,
        share_link: 'https://lixibox.app/f/20753',
        total_comments: 1,
        total_likes: 0,
        user: {
          id: 410916,
          avatar: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
          comment_count: 0,
          feed_count: 2,
          feedback_count: 2,
          like_count: 0,
          membership_level: 1,
          name: 'Phạm Thị Nguyệt',
          referral_code: 'NGUYEB5648B',
          unboxing_count: 0
        }
      }
    ],
    is_individual: true,
    is_saleable: true,
    name: '[Nhập HOGIFT - FREE Quà 135K] Máy rửa mặt Halio Facial Cleansing & Massaging Device - Grey Smoke',
    original_price: 810000,
    price: 539000,
    primary_picture: {
      facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/facebook/1506061087.png?t=1631328811',
      large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/large/1506061087.png?t=1631328811',
      medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/medium/1506061087.png?t=1631328811',
      original_url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/original/1506061087.png?t=1631328811',
      square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/square/1506061087.png?t=1631328811',
      thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/thumb/1506061087.png?t=1631328811',
      vertical_url: 'https://upload.lixibox.com/system/pictures/files/000/023/815/vertical/1506061087.png?t=1631328811'
    },
    primary_picture_large_url:
      'https://upload.lixibox.com/system/pictures/files/000/023/815/large/1506061087.png?t=1631328811',
    primary_picture_medium_url:
      'https://upload.lixibox.com/system/pictures/files/000/023/815/medium/1506061087.png?t=1631328811',
    primary_picture_original_url:
      'https://upload.lixibox.com/system/pictures/files/000/023/815/original/1506061087.png?t=1631328811',
    short_description:
      'Halio là thương hiệu máy rửa mặt sử dụng công nghệ Sonic Wave Cleansing giúp làm sạch sâu gấp 10 lần và loại bỏ tới 99% dầu thừa cũng như lớp trang điểm còn sót lại mà vẫn dịu nhẹ không gây lão hoá cho làn da. Đồng thời, Halio cũng giúp massage thư giãn khuôn mặt sau một ngày làm việc căng thẳng. Máy đã có kèm sẵn dây sạc và hộp đựng. Máy rửa mặt Halio với 5 ưu điểm vượt trội: - Sử dụng công nghệ Sonic Wave, làm sạch sâu mà vẫn dịu nhẹ với làn da, kể cả da khô và lão hoá. - Thay đổi tới 14 chế độ rung, phù hợp với cả những làn da nhạy cảm nhất. - Bề mặt cọ rộng hơn, nhanh chóng rửa sạch toàn bộ khuôn mặt. - Dễ dàng đi vào những góc khó nhất trên khuôn mặt, làm sạch toàn diện. - Nắp đậy silicon cho cổng sạc, chống thấm nước tuyệt đối. Hướng dẫn đăng ký thông tin bảo hành: - Bước 1: Lưu lại mã sản phẩm được in trên hộp sản phẩm. - Bước 2: Nhập mã sản phẩm và điền đầy đủ thông tin đăng ký bảo hành qua https://halio-sonic.com/pages/guarantee - Bước 3: Sau khi đăng ký thành công, hệ thống sẽ gửi cho bạn email xác nhận mã bảo hành. Khi đến bảo hành, bạn chỉ cần đọc mã sản phẩm được in trên thân máy cùng mã đơn hàng HOẶC email xác nhận thông tin bảo hành từ hãng. Lưu ý: - Sau khi nhận máy, khách hàng vui lòng đăng kí bảo hành ngay để nhận được đầy đủ quyền lợi. - Từ ngày 22/4/2019, khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic sẽ tiến hành đăng kí thông tin theo các bước trên để nhận bảo hành. - Đối với khách hàng mua máy rửa mặt thuộc thương hiệu Halio Sonic trước ngày 22/4/2019 vẫn được nhận bảo hành bằng cách nhắn tin mã đơn hàng cho bộ phận chăm sóc khách hàng Lixibox.',
    slug: 'halio-facial-cleansing-massaging-grey-smoke',
    status: 'approved'
  },
  {
    id: 8464,
    brand_name: 'Lixibox',
    feeds: [
      {
        id: 20756,
        box: {
          id: 8464,
          name: 'Lixibox Daily Facial Mask Sheet - Aloe',
          thumb_picture_url:
            'https://upload.lixibox.com/system/pictures/files/000/036/967/thumb/1543377681.png?t=1631329734'
        },
        boxes: [
          {
            id: 8464,
            brand_name: 'Lixibox',
            is_individual: true,
            is_saleable: true,
            name: 'Lixibox Daily Facial Mask Sheet - Aloe',
            original_price: 30000,
            price: 19000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/036/967/facebook/1543377681.png?t=1631329734',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/036/967/large/1543377681.png?t=1631329734',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/036/967/medium/1543377681.png?t=1631329734',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/036/967/original/1543377681.png?t=1631329734',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/036/967/square/1543377681.png?t=1631329734',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/036/967/thumb/1543377681.png?t=1631329734',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/036/967/vertical/1543377681.png?t=1631329734'
            },
            short_description:
              '“Lô hội Curacao” được sinh ra tại môi trường đầy khắc nghiệt đòi hỏi sức sống kiên cường để tồn tại,đã tạo nên giống cây có chất lượng và giá trị thực tiễn cao. Từ khi sinh ra đã luôn phải chống chọi với điều kiện thiên nhiên khô hạn, thời tiết biến đổi không ngừng đã khiến loài thực vật này tự sản sinh ra sức đề kháng có khả năng chống chọi lại với thách thức cũng như tác nhân môi trường xung quanh tạo ra. Sau khi cắt bỏ lớp vỏ là nhân trong của nha đam. Phía trong phần này có chứa mucopolysaccharides, cung cấp cho da khô một chế độ bổ sung nước và cấp ẩm kịp thời, khóa chặt lượng nước được cấp, giảm thiểu cao nhất khả năng kích thích từ các tác nhân bên ngoài, giúp duy trì và ổn định nước cho da. Toàn bộ lô hội sử dụng trong sản phẩm được tưới nước, thu hoạch và bóc tách trong vòng 6 tiếng để giữ độ tươi mới tối đa, đảm bảo lô hội với chất lượng tuyệt hảo nhất. Sản phẩm hoàn toàn không chứa thành phần chất bảo quản Paraben, cồn rượu, dầu khoáng vật, các sắc tố, các thành phần chất làm trắng quang học …Chính vì vậy, sản phẩm không gây kích ứng da',
            slug: 'lixibox-daily-facial-mask-sheet-aloe',
            status: 'approved'
          }
        ],
        created_at: 1631286199,
        feedable: {
          feedback: {
            id: 91021,
            box: {
              box: {
                id: 8464,
                brand_name: 'Lixibox',
                is_individual: true,
                is_saleable: true,
                name: 'Lixibox Daily Facial Mask Sheet - Aloe',
                original_price: 30000,
                price: 19000,
                primary_picture: {
                  picture_with_dimensions: {
                    height: 650,
                    id: 8464,
                    url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/large/1543377681.png?t=1631329734',
                    width: 960
                  }
                },
                short_description:
                  '“Lô hội Curacao” được sinh ra tại môi trường đầy khắc nghiệt đòi hỏi sức sống kiên cường để tồn tại,đã tạo nên giống cây có chất lượng và giá trị thực tiễn cao. Từ khi sinh ra đã luôn phải chống chọi với điều kiện thiên nhiên khô hạn, thời tiết biến đổi không ngừng đã khiến loài thực vật này tự sản sinh ra sức đề kháng có khả năng chống chọi lại với thách thức cũng như tác nhân môi trường xung quanh tạo ra. Sau khi cắt bỏ lớp vỏ là nhân trong của nha đam. Phía trong phần này có chứa mucopolysaccharides, cung cấp cho da khô một chế độ bổ sung nước và cấp ẩm kịp thời, khóa chặt lượng nước được cấp, giảm thiểu cao nhất khả năng kích thích từ các tác nhân bên ngoài, giúp duy trì và ổn định nước cho da. Toàn bộ lô hội sử dụng trong sản phẩm được tưới nước, thu hoạch và bóc tách trong vòng 6 tiếng để giữ độ tươi mới tối đa, đảm bảo lô hội với chất lượng tuyệt hảo nhất. Sản phẩm hoàn toàn không chứa thành phần chất bảo quản Paraben, cồn rượu, dầu khoáng vật, các sắc tố, các thành phần chất làm trắng quang học …Chính vì vậy, sản phẩm không gây kích ứng da',
                slug: 'lixibox-daily-facial-mask-sheet-aloe',
                status: 'approved'
              }
            },
            created_at: 1631286198,
            rating: 5,
            review: 'Mặt nạ đắp xong da sáng hẳn. Đbiet mình hay dị ứng mặt nạ giấy vậy mà loại này k sao cả.',
            title: ''
          }
        },
        feedable_id: 91021,
        feedable_type: 'Feedback',
        feedable_url: '',
        liked: false,
        likes: [],
        message: 'Mặt nạ đắp xong da sáng hẳn. Đbiet mình hay dị ứng mặt nạ giấy vậy mà loại này k sao cả.',
        object_type: 'ActivityFeed',
        pictures: [],
        pinned: false,
        rating: 5,
        share_link: 'https://lixibox.app/f/20756',
        total_comments: 1,
        total_likes: 0,
        user: {
          id: 445988,
          avatar: 'https://upload.lixibox.com/system/users/avatars/000/445/988/medium/1615168166.jpg',
          comment_count: 0,
          feed_count: 1,
          feedback_count: 2,
          like_count: 0,
          membership_level: 1,
          name: 'Mỹ Duy',
          referral_code: 'DUYD2391D49',
          unboxing_count: 0
        }
      }
    ],
    is_individual: true,
    is_saleable: true,
    name: 'Lixibox Daily Facial Mask Sheet - Aloe',
    original_price: 30000,
    price: 19000,
    primary_picture: {
      facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/facebook/1543377681.png?t=1631329734',
      large_url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/large/1543377681.png?t=1631329734',
      medium_url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/medium/1543377681.png?t=1631329734',
      original_url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/original/1543377681.png?t=1631329734',
      square_url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/square/1543377681.png?t=1631329734',
      thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/thumb/1543377681.png?t=1631329734',
      vertical_url: 'https://upload.lixibox.com/system/pictures/files/000/036/967/vertical/1543377681.png?t=1631329734'
    },
    primary_picture_large_url:
      'https://upload.lixibox.com/system/pictures/files/000/036/967/large/1543377681.png?t=1631329734',
    primary_picture_medium_url:
      'https://upload.lixibox.com/system/pictures/files/000/036/967/medium/1543377681.png?t=1631329734',
    primary_picture_original_url:
      'https://upload.lixibox.com/system/pictures/files/000/036/967/original/1543377681.png?t=1631329734',
    short_description:
      '“Lô hội Curacao” được sinh ra tại môi trường đầy khắc nghiệt đòi hỏi sức sống kiên cường để tồn tại,đã tạo nên giống cây có chất lượng và giá trị thực tiễn cao. Từ khi sinh ra đã luôn phải chống chọi với điều kiện thiên nhiên khô hạn, thời tiết biến đổi không ngừng đã khiến loài thực vật này tự sản sinh ra sức đề kháng có khả năng chống chọi lại với thách thức cũng như tác nhân môi trường xung quanh tạo ra. Sau khi cắt bỏ lớp vỏ là nhân trong của nha đam. Phía trong phần này có chứa mucopolysaccharides, cung cấp cho da khô một chế độ bổ sung nước và cấp ẩm kịp thời, khóa chặt lượng nước được cấp, giảm thiểu cao nhất khả năng kích thích từ các tác nhân bên ngoài, giúp duy trì và ổn định nước cho da. Toàn bộ lô hội sử dụng trong sản phẩm được tưới nước, thu hoạch và bóc tách trong vòng 6 tiếng để giữ độ tươi mới tối đa, đảm bảo lô hội với chất lượng tuyệt hảo nhất. Sản phẩm hoàn toàn không chứa thành phần chất bảo quản Paraben, cồn rượu, dầu khoáng vật, các sắc tố, các thành phần chất làm trắng quang học …Chính vì vậy, sản phẩm không gây kích ứng da',
    slug: 'lixibox-daily-facial-mask-sheet-aloe',
    status: 'approved'
  }
];

const component = (params = {}) => {
  const props = {
    list: communityTopReview,
    stickyPosition: 0
  };

  return <ReviewStickyList {...Object.assign({}, props, params)} />;
};

describe('ReviewStickyList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
