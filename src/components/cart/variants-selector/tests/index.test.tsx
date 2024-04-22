jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

import { reduxRender } from 'utils/test-utils';
import VariantsSelector from '..';
import { storageKey } from 'constants/application/client-storage';

const box2 = {
  added_to_waitlist: false,
  avg_rate: 0,
  badges: { top_left: null, top_right: null, bottom_right: null, bottom_left: null },
  box_products: [
    {
      box_id: 10577,
      expert_description: 'Set',
      id: 14473,
      product: {
        brand: 'Lixi Baby',
        brand_image_url: 'hg',
        description: 'Lixi.',
        id: 796,
        capacity: '42.0 gr',
        country: 'Vietnam',
        display_name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
        individual_box_slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
        ingredients: 'Polyester',
        made_in_country: 'China',
        name: 'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Set Pink Polka Dot',
        original_price: 50000,
        price: 20000,
        primary_picture: {
          facebook_url: 'https://g?t=1677582981',
          large_url: 'http7582981',
          medium_url: 'htt2981',
          original_url: 'htt81',
          square_url: 'https:/981',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/051/530/thumb/1595827215.jpg?t=1677582981',
          vertical_url: 'https:/2981'
        },
        primary_picture_webp: {
          facebook_url: 'https2981',
          large_url: 'htt81',
          medium_url: 'http2981',
          original_url: 'http981',
          square_url: 'htt81',
          thumb_url: 'htt82981',
          vertical_url: 'htt981'
        },
        saleable: true,
        slug: 'bo-03-cai-dung-cu-kep-ti-gia-chong-roi-lixi-baby-set-pink-polka-dot',
        usage: '1 đầu kẹp áo đeo theo người và 1 đầu giữ ti giả chống rơi cho em bé',
        usage_duration: null,
        wholesale_price: null
      },
      product_id: 10039,
      quantity: 1
    }
  ],
  length: 1,
  brand_name: 'Lixi Baby',
  categories: [{}, {}],
  coins_price: 0,
  delivery_time: {},
  for_redeem: false,
  id: 10577,
  is_bundle: false,
  is_individual: true,
  is_saleable: true,
  like_count: 1,
  lixibox_id: 'LXFB328307D8',
  lixicoin_bonus: 20,
  long_description: 'Set 3.\n',
  name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
  note: null,
  number_of_products: 1,
  original_price: 50000,
  pictures: [{}],
  pictures_webp: [{}],
  pre_order_release_date: null,
  pre_order_status: null,
  preview_picture: {},
  preview_picture_webp: {},
  price: 20000,
  price_sale_off: 20000,
  primary_picture: {
    facebook_url: '',
    large_url: '',
    medium_url: '',
    original_url: '',
    square_url: ''
  },
  primary_picture_webp: {
    facebook_url: '',
    large_url: '',
    medium_url: '',
    original_url: '',
    square_url: ''
  },
  rating: { avg_rate: 0, count: 0 },
  reason_to_sell: null,
  saving_bundle_value: 0,
  short_description: 'Sebé.',
  size_guides: [],
  slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
  status: 'approved',
  stock: 10,
  store_stock: 0,
  tracking: { category_key: 'shop-gifts-gifts-for-baby' },
  videos: []
};

const productDetail = {
  109534716: {
    success: true,
    box: {
      id: 10832,
      added_to_waitlist: false,
      avg_rate: 5,
      badges: {
        top_left: 'https://upload.lixibox.com/system/badges/icons/000/000/795/detail/1689872609.png',
        top_right: null,
        bottom_right: null,
        bottom_left: null
      },
      box_products: [
        {
          id: 14796,
          box_id: 10832,
          expert_description:
            'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé \n\nDụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha.\n\nDây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé.\n\nHệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng.\n\nTránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.\n',
          product: {
            id: 10284,
            brand: {
              id: 796,
              brand_image_url:
                'https://upload.lixibox.com/system/brands/brand_images/000/000/796/original/Screen_Shot_2020-07-01_at_3.13.50_PM.png',
              description:
                'Lixi Baby là thương hiệu chuyên cung cấp các sản phẩm thiết yếu cho mẹ và bé nhằm phục vụ cho quá trình phát triển toàn diện của bé. ',
              name: 'Lixi Baby',
              slug: 'lixi-baby'
            },
            capacity: '42.0 gr',
            country: 'Vietnam',
            description:
              'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé \n\nDụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha.\n\nDây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé.\n\nHệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng.\n\nTránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.\n',
            display_name: 'Set 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Yellow Duck',
            individual_box_slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-yellow-duck',
            ingredients: '\r\nPolyester',
            made_in_country: 'China',
            name: 'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Set Yellow Duck',
            original_price: 50000,
            price: 43000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/facebook/1595827183.jpg?t=1677582976',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/large/1595827183.jpg?t=1677582976',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/medium/1595827183.jpg?t=1677582976',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/original/1595827183.jpg?t=1677582976',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/square/1595827183.jpg?t=1677582976',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/thumb/1595827183.jpg?t=1677582976',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/vertical/1595827183.jpg?t=1677582976'
            },
            primary_picture_webp: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/facebook_webp/1595827183.webp?t=1677582976',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/large_webp/1595827183.webp?t=1677582976',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/medium_webp/1595827183.webp?t=1677582976',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/original/1595827183.jpg?t=1677582976',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/square_webp/1595827183.webp?t=1677582976',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/thumb_webp/1595827183.webp?t=1677582976',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/529/vertical_webp/1595827183.webp?t=1677582976'
            },
            saleable: true,
            slug: 'set-03-cai-dung-cu-kep-ti-gia-chong-roi-lixi-baby-set-yellow-duck',
            usage: '1 đầu kẹp áo đeo theo người và 1 đầu giữ ti giả chống rơi cho em bé',
            usage_duration: null,
            wholesale_price: null
          },
          product_id: 10284,
          quantity: 1
        }
      ],
      brand_name: 'Lixi Baby',
      categories: [
        {
          id: 1277,
          name: 'Shop Gifts',
          vn_name: 'Quà Tặng',
          slug: 'shop-gifts',
          special: false,
          parent_id: null,
          position: 570,
          node_type: 'category',
          seo_description: null,
          created_at: '2022-12-13T00:30:50.000+07:00',
          updated_at: '2023-01-30T18:22:31.000+07:00',
          display_homepage: true,
          browsenodeable_id: 556,
          browsenodeable_type: 'Category',
          browse_tree: 'Shop Gifts',
          menu_column: 0,
          menu_row: 0,
          browse_tree_ids: '.1277.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        },
        {
          id: 1280,
          name: 'Gifts For Baby',
          vn_name: 'Quà Cho Bé',
          slug: 'gifts-for-baby',
          special: true,
          parent_id: 1277,
          position: 18,
          node_type: 'category',
          seo_description: null,
          created_at: '2022-12-13T10:49:36.000+07:00',
          updated_at: '2023-01-30T18:22:31.000+07:00',
          display_homepage: true,
          browsenodeable_id: 559,
          browsenodeable_type: 'Category',
          browse_tree: 'Shop Gifts > Gifts For Baby',
          menu_column: 0,
          menu_row: 0,
          browse_tree_ids: '.1277.1280.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        }
      ],
      coins_price: 0,
      delivery_time: {},
      for_redeem: false,
      is_bundle: false,
      is_individual: true,
      is_saleable: true,
      like_count: 3,
      lixibox_id: 'LX306A3B4727',
      lixicoin_bonus: 43,
      long_description:
        'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé \n\nDụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha.\n\nDây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé.\n\nHệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng.\n\nTránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.\n',
      name: 'Set 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Yellow Duck',
      note: null,
      number_of_products: 1,
      original_price: 50000,
      pictures: [
        {
          id: 51529,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/facebook/1595827183.jpg?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/large/1595827183.jpg?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/medium/1595827183.jpg?v=3',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/optimized/1595827183.jpg?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/original/1595827183.jpg?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/thumb/1595827183.jpg?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/large/1595827183.jpg?v=3',
          width: 960
        }
      ],
      pictures_webp: [
        {
          id: 51529,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/051/529/facebook_webp/1595827183.webp?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/large_webp/1595827183.webp?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/medium_webp/1595827183.webp?v=3',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/051/529/optimized_webp/1595827183.webp?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/original/1595827183.jpg?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/thumb_webp/1595827183.webp?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/large/1595827183.jpg?v=3',
          width: 960
        }
      ],
      pre_order_release_date: null,
      pre_order_status: null,
      preview_picture: {},
      preview_picture_webp: {},
      price: 43000,
      price_sale_off: 43000,
      primary_picture: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/facebook/1595827183.jpg?t=1689872407',
        large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/large/1595827183.jpg?t=1689872407',
        medium_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/medium/1595827183.jpg?t=1689872407',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/original/1595827183.jpg?t=1689872407',
        square_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/square/1595827183.jpg?t=1689872407',
        thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/529/thumb/1595827183.jpg?t=1689872407',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/vertical/1595827183.jpg?t=1689872407'
      },
      primary_picture_webp: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/facebook_webp/1595827183.webp?t=1689872407',
        large_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/large_webp/1595827183.webp?t=1689872407',
        medium_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/medium_webp/1595827183.webp?t=1689872407',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/original/1595827183.jpg?t=1689872407',
        square_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/square_webp/1595827183.webp?t=1689872407',
        thumb_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/thumb_webp/1595827183.webp?t=1689872407',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/529/vertical_webp/1595827183.webp?t=1689872407'
      },
      rating: {
        avg_rate: 5,
        count: 2
      },
      reason_to_sell: null,
      saving_bundle_value: 0,
      short_description:
        'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Dụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha. Dây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé. Hệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng. Tránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.',
      size_guides: [],
      slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-yellow-duck',
      status: 'approved',
      stock: 10,
      store_stock: 0,
      tracking: {
        category_key: 'shop-gifts-gifts-for-baby'
      },
      videos: []
    },
    liked: false,
    reviewed: false,
    can_review: false,
    box_variants: [
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 345
          }
        ],
        slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 347
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-yellow-duck'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 348
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-dinosaur'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 349
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-blue-monster'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 351
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-brown-bear'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 352
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-robot'
      }
    ],
    option_types: [
      {
        name: 'pattern',
        presentation: 'Họa tiết',
        values: [
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Pink Polka Dot',
            option_value_id: 345,
            option_value_name: 'Set Pink Polka Dot',
            presentation: 'Set Pink Polka Dot'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Yellow Duck',
            option_value_id: 347,
            option_value_name: 'Set Yellow Duck',
            presentation: 'Set Yellow Duck'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Dinosaur',
            option_value_id: 348,
            option_value_name: 'Set Dinosaur',
            presentation: 'Set Dinosaur'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Blue Monster',
            option_value_id: 349,
            option_value_name: 'Set Blue Monster',
            presentation: 'Set Blue Monster'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Brown Bear',
            option_value_id: 351,
            option_value_name: 'Set Brown Bear',
            presentation: 'Set Brown Bear'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Robot',
            option_value_id: 352,
            option_value_name: '',
            presentation: 'Set Robot'
          }
        ]
      }
    ]
  },
  857702097: {
    success: true,
    box: {
      id: 10577,
      added_to_waitlist: false,
      avg_rate: 0,
      badges: {
        top_left: 'https://upload.lixibox.com/system/badges/icons/000/000/795/detail/1689872609.png',
        top_right: null,
        bottom_right: null,
        bottom_left: null
      },
      box_products: [
        {
          id: 14473,
          box_id: 10577,
          expert_description:
            'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé \n\nDụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha.\n\nDây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé.\n\nHệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng.\n\nTránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.\n',
          product: {
            id: 10039,
            brand: {
              id: 796,
              brand_image_url:
                'https://upload.lixibox.com/system/brands/brand_images/000/000/796/original/Screen_Shot_2020-07-01_at_3.13.50_PM.png',
              description:
                'Lixi Baby là thương hiệu chuyên cung cấp các sản phẩm thiết yếu cho mẹ và bé nhằm phục vụ cho quá trình phát triển toàn diện của bé. ',
              name: 'Lixi Baby',
              slug: 'lixi-baby'
            },
            capacity: '42.0 gr',
            country: 'Vietnam',
            description:
              'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé \n\nDụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha.\n\nDây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé.\n\nHệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng.\n\nTránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.\n',
            display_name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
            individual_box_slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
            ingredients: 'Polyester',
            made_in_country: 'China',
            name: 'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Set Pink Polka Dot',
            original_price: 50000,
            price: 43000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook/1595827215.jpg?t=1677582981',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/large/1595827215.jpg?t=1677582981',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/medium/1595827215.jpg?t=1677582981',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?t=1677582981',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/square/1595827215.jpg?t=1677582981',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb/1595827215.jpg?t=1677582981',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/vertical/1595827215.jpg?t=1677582981'
            },
            primary_picture_webp: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook_webp/1595827215.webp?t=1677582981',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/large_webp/1595827215.webp?t=1677582981',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/medium_webp/1595827215.webp?t=1677582981',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?t=1677582981',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/square_webp/1595827215.webp?t=1677582981',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb_webp/1595827215.webp?t=1677582981',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/051/530/vertical_webp/1595827215.webp?t=1677582981'
            },
            saleable: true,
            slug: 'bo-03-cai-dung-cu-kep-ti-gia-chong-roi-lixi-baby-set-pink-polka-dot',
            usage: '1 đầu kẹp áo đeo theo người và 1 đầu giữ ti giả chống rơi cho em bé',
            usage_duration: null,
            wholesale_price: null
          },
          product_id: 10039,
          quantity: 1
        }
      ],
      brand_name: 'Lixi Baby',
      categories: [
        {
          id: 1277,
          name: 'Shop Gifts',
          vn_name: 'Quà Tặng',
          slug: 'shop-gifts',
          special: false,
          parent_id: null,
          position: 570,
          node_type: 'category',
          seo_description: null,
          created_at: '2022-12-13T00:30:50.000+07:00',
          updated_at: '2023-01-30T18:22:31.000+07:00',
          display_homepage: true,
          browsenodeable_id: 556,
          browsenodeable_type: 'Category',
          browse_tree: 'Shop Gifts',
          menu_column: 0,
          menu_row: 0,
          browse_tree_ids: '.1277.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        },
        {
          id: 1280,
          name: 'Gifts For Baby',
          vn_name: 'Quà Cho Bé',
          slug: 'gifts-for-baby',
          special: true,
          parent_id: 1277,
          position: 18,
          node_type: 'category',
          seo_description: null,
          created_at: '2022-12-13T10:49:36.000+07:00',
          updated_at: '2023-01-30T18:22:31.000+07:00',
          display_homepage: true,
          browsenodeable_id: 559,
          browsenodeable_type: 'Category',
          browse_tree: 'Shop Gifts > Gifts For Baby',
          menu_column: 0,
          menu_row: 0,
          browse_tree_ids: '.1277.1280.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        }
      ],
      coins_price: 0,
      delivery_time: {},
      for_redeem: false,
      is_bundle: false,
      is_individual: true,
      is_saleable: true,
      like_count: 2,
      lixibox_id: 'LXFB328307D8',
      lixicoin_bonus: 43,
      long_description:
        'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé \n\nDụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha.\n\nDây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé.\n\nHệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng.\n\nTránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.\n',
      name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
      note: null,
      number_of_products: 1,
      original_price: 50000,
      pictures: [
        {
          id: 51530,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook/1595827215.jpg?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/large/1595827215.jpg?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/medium/1595827215.jpg?v=3',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/optimized/1595827215.jpg?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb/1595827215.jpg?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/large/1595827215.jpg?v=3',
          width: 960
        }
      ],
      pictures_webp: [
        {
          id: 51530,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook_webp/1595827215.webp?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/large_webp/1595827215.webp?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/medium_webp/1595827215.webp?v=3',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/051/530/optimized_webp/1595827215.webp?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb_webp/1595827215.webp?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/large/1595827215.jpg?v=3',
          width: 960
        }
      ],
      pre_order_release_date: null,
      pre_order_status: null,
      preview_picture: {},
      preview_picture_webp: {},
      price: 43000,
      price_sale_off: 43000,
      primary_picture: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook/1595827215.jpg?t=1690255990',
        large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/large/1595827215.jpg?t=1690255990',
        medium_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/medium/1595827215.jpg?t=1690255990',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?t=1690255990',
        square_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/square/1595827215.jpg?t=1690255990',
        thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb/1595827215.jpg?t=1690255990',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/vertical/1595827215.jpg?t=1690255990'
      },
      primary_picture_webp: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook_webp/1595827215.webp?t=1690255990',
        large_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/large_webp/1595827215.webp?t=1690255990',
        medium_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/medium_webp/1595827215.webp?t=1690255990',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?t=1690255990',
        square_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/square_webp/1595827215.webp?t=1690255990',
        thumb_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb_webp/1595827215.webp?t=1690255990',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/051/530/vertical_webp/1595827215.webp?t=1690255990'
      },
      rating: {
        avg_rate: 0,
        count: 0
      },
      reason_to_sell: null,
      saving_bundle_value: 0,
      short_description:
        'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Dụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha. Dây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé. Hệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng. Tránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.',
      size_guides: [],
      slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
      status: 'approved',
      stock: 9,
      store_stock: 0,
      tracking: {
        category_key: 'shop-gifts-gifts-for-baby'
      },
      videos: []
    },
    liked: false,
    reviewed: false,
    can_review: false,
    box_variants: [
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 345
          }
        ],
        slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 347
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-yellow-duck'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 348
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-dinosaur'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 349
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-blue-monster'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 351
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-brown-bear'
      },
      {
        option_values: [
          {
            type: 'pattern',
            value_id: 352
          }
        ],
        slug: 'set-3-cai-dung-cu-kep-ti-gia-chong-roi-cho-em-be-set-robot'
      }
    ],
    option_types: [
      {
        name: 'pattern',
        presentation: 'Họa tiết',
        values: [
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Pink Polka Dot',
            option_value_id: 345,
            option_value_name: 'Set Pink Polka Dot',
            presentation: 'Set Pink Polka Dot'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Yellow Duck',
            option_value_id: 347,
            option_value_name: 'Set Yellow Duck',
            presentation: 'Set Yellow Duck'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Dinosaur',
            option_value_id: 348,
            option_value_name: 'Set Dinosaur',
            presentation: 'Set Dinosaur'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Blue Monster',
            option_value_id: 349,
            option_value_name: 'Set Blue Monster',
            presentation: 'Set Blue Monster'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Brown Bear',
            option_value_id: 351,
            option_value_name: 'Set Brown Bear',
            presentation: 'Set Brown Bear'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: 'Set Robot',
            option_value_id: 352,
            option_value_name: '',
            presentation: 'Set Robot'
          }
        ]
      }
    ]
  },
  1070703846: {
    success: true,
    box: {
      id: 16384,
      added_to_waitlist: false,
      avg_rate: 4.75,
      badges: {
        top_left: null,
        top_right: null,
        bottom_right: null,
        bottom_left: null
      },
      box_products: [
        {
          id: 30422,
          box_id: 16384,
          expert_description:
            '<p><strong>Kem Dưỡng Ẩm Embryolisse Lait-Crème Concentré</strong> l&agrave; sản phẩm kem dưỡng đa năng đến từ thương hiệu Embryolisse của Ph&aacute;p, với c&aacute;c th&agrave;nh phần tự nhi&ecirc;n l&agrave;nh t&iacute;nh, kh&ocirc;ng g&acirc;y dị ứng, hỗ trợ cấp nước, giữ ẩm cho l&agrave;n da lu&ocirc;n căng b&oacute;ng, mềm mịn v&agrave; rạng rỡ. Kết cấu sản phẩm dạng kem sữa, ph&ugrave; hợp l&agrave;m lớp l&oacute;t trước trang điểm, kem dưỡng ẩm hoặc mặt nạ dưỡng da, mang lại sự thoải m&aacute;i cho cả những l&agrave;n da kh&ocirc; &amp; nhạy cảm nhất.</p>\r\n\r\n<h1>C&ocirc;ng dụng:</h1>\r\n\r\n<ul>\r\n\t<li>Gi&uacute;p cung cấp dưỡng chất v&agrave; dưỡng ẩm chuy&ecirc;n s&acirc;u, l&agrave;m dịu da, gi&uacute;p da mềm mướt, mịn m&agrave;ng.</li>\r\n\t<li>Hỗ trợ cải thiện l&agrave;n da kh&ocirc; r&aacute;p, nứt nẻ, xước da,... khi thời tiết hanh kh&ocirc; hoặc sau khi tắm nước n&oacute;ng khi thời tiết sang đ&ocirc;ng.</li>\r\n\t<li>Đa c&ocirc;ng dụng:&nbsp;c&oacute; thể sử dụng như kem dưỡng ẩm, mặt nạ dưỡng ẩm,&nbsp;sử dụng cho em b&eacute;,&nbsp;l&agrave;m kem l&oacute;t trang điểm gi&uacute;p lớp trang điểm b&aacute;m tr&ecirc;n da bền đẹp,&nbsp;mịn m&agrave;ng, hoặc d&ugrave;ng như kem tẩy trang nhẹ nh&agrave;ng do da v&agrave;o cuối ng&agrave;y.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16074/content_1675759987.jpg" /></h1>\r\n\r\n<h1>Loại da ph&ugrave; hợp:</h1>\r\n\r\n<ul>\r\n\t<li>Mọi loại da (kể cả da nhạy cảm v&agrave; da rất kh&ocirc;)</li>\r\n</ul>\r\n\r\n<h1>Giải quyết t&igrave;nh trạng da:&nbsp;</h1>\r\n\r\n<ul>\r\n\t<li>Da thiếu ẩm - thiếu nước, kh&ocirc; r&aacute;p, nứt nẻ, bong tr&oacute;c, xước da,...</li>\r\n\t<li>Da dễ bị mốc khi trang điểm, k&eacute;m &quot;ăn phấn&quot;.</li>\r\n\t<li>Da nhạy cảm - dễ k&iacute;ch ứng.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16073/content_1675759966.jpg" /></h1>\r\n\r\n<h1>Ưu&nbsp;điểm:</h1>\r\n\r\n<ul>\r\n\t<li>C&ocirc;ng thức chứa&nbsp;c&aacute;c th&agrave;nh phần tự nhi&ecirc;n&nbsp;(bơ hạt mỡ, l&ocirc; hội v&agrave; proteins từ đậu n&agrave;nh...)&nbsp;rất l&agrave;nh t&iacute;nh với mọi loại da, kh&ocirc;ng g&acirc;y dị ứng, kể cả tr&ecirc;n những l&agrave;n da nhạy cảm hay bong tr&oacute;c.</li>\r\n\t<li>Kết cấu chất kem kh&ocirc;ng qu&aacute; đặc, kh&ocirc;ng qu&aacute; lỏng, trắng sữa, dịu nhẹ, thấm nhanh v&agrave;o da hỗ trợ giữ ẩm cho da.</li>\r\n\t<li>C&oacute; thể sử dụng để dưỡng ẩm v&agrave; l&agrave;m dịu những v&ugrave;ng da kh&aacute;c tr&ecirc;n cơ thể khi bị bỏng, kh&ocirc; bong tr&oacute;c, nứt nẻ, bị c&ocirc;n tr&ugrave;ng cắn&hellip;</li>\r\n\t<li>Sản phẩm đ&atilde; trải qua ki&ecirc;̉m nghiệm da li&ecirc;̃u v&ecirc;̀ độ lành tính, rất l&agrave;nh t&iacute;nh với mọi loại da, kh&ocirc;ng g&acirc;y dị ứng, kể cả tr&ecirc;n những l&agrave;n da nhạy cảm hay bong tr&oacute;c.</li>\r\n</ul>\r\n\r\n<h1>C&aacute;ch sử dụng:</h1>\r\n\r\n<ul>\r\n\t<li>Sử dụng kem tr&ecirc;n nền da sạch, thời gian 2 lần/ng&agrave;y, s&aacute;ng v&agrave; tối.</li>\r\n\t<li>Thoa một lượng mỏng l&ecirc;n v&ugrave;ng da mặt v&agrave; cổ,&nbsp;massage nhẹ đến khi thẩm thấu v&agrave;o lớp biểu b&igrave;.</li>\r\n\t<li>Nếu d&ugrave;ng để tẩy trang, cho một lượng nhỏ kem l&ecirc;n mặt b&ocirc;ng tẩy trang v&agrave; nhẹ nh&agrave;ng lau.</li>\r\n\t<li>Đối với l&agrave;n da kh&ocirc; căng v&agrave; mất nước, chỉ cần lưu lại một lớp kem dưỡng trong v&ograve;ng 15 ph&uacute;t, l&agrave;n sa sẽ ngay lập tức trở n&ecirc;n căng mịn hơn.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16076/content_1675761102.jpg" /></h1>\r\n\r\n<h1>Th&agrave;nh phần:</h1>\r\n\r\n<p><strong>Th&agrave;nh phần ch&iacute;nh:&nbsp;</strong></p>\r\n\r\n<p>Emollient oil k&ecirc;́t hợp với các thành ph&acirc;̀n có ngu&ocirc;̀n g&ocirc;́c từ thiên nhiên: bơ hạt mỡ, sáp ong, nha đam và protein đậu nành.&nbsp;</p>\r\n\r\n<p><strong>Th&agrave;nh phần chi tiết:</strong></p>\r\n\r\n<p>Aqua (water),&nbsp;Paraffinum Liquidum, Stearic Acid,&nbsp;Glyceryl Stearate,&nbsp;Triethanolamine, Cera Alba,&nbsp;Cetyl Palmitate,&nbsp;Butyrospermum Parkii (Shea) Butter, Parfum,&nbsp;Steareth-10,&nbsp;Propylene Glycol,&nbsp;Aloe Barbadensis,&nbsp;Hydrolyzed Soy Protein,&nbsp;Tropolone, 1,2-Hexanediol, Caprylyl Glycol, Polyacrylamide,&nbsp;C13-14 Isoparaffin,&nbsp;Laureth-7.</p>\r\n\r\n<h1>Bảo quản:</h1>\r\n\r\n<ul>\r\n\t<li>Bảo quản nơi kh&ocirc; r&aacute;o, tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp hoặc nơi c&oacute; nhiệt độ cao</li>\r\n\t<li>Đậy nắp sau khi sử dụng</li>\r\n</ul>\r\n\r\n<h1>Th&ocirc;ng số sản phẩm:</h1>\r\n\r\n<ul>\r\n\t<li>\r\n\t<p>Dung t&iacute;ch: 30ml</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Thương hiệu: Embryolisse</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Xuất xứ thương hiệu: Ph&aacute;p</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Nơi sản xuất: Ph&aacute;p</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Hạn sử dụng: 3 năm kể từ ng&agrave;y sản xuất</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Ng&agrave;y sản xuất: Xem tr&ecirc;n bao b&igrave; sản phẩm</p>\r\n\t</li>\r\n</ul>\r\n',
          product: {
            id: 13183,
            brand: {
              id: 178,
              brand_image_url:
                'https://upload.lixibox.com/system/brands/brand_images/000/000/178/original/Erborian_logo_logotype.png',
              description:
                'Embryolisse là thương hiệu đến từ Pháp với các thành phần tự nhiên lành tính, không gây dị ứng, hỗ trợ cấp nước, giữ ẩm cho làn da luôn căng bóng, mềm mịn và rạng rỡ. Kết cấu sản phẩm dạng kem sữa, phù hợp làm lớp lót trước trang điểm, kem dưỡng ẩm hoặc mặt nạ dưỡng da, mang lại sự thoải mái cho cả những làn da khô & nhạy cảm nhất.\r\n\r\n',
              name: 'Embryolisse',
              slug: 'embryolisse'
            },
            capacity: '30.0 ml',
            country: 'France',
            description:
              '<p><strong>Kem Dưỡng Ẩm Embryolisse Lait-Crème Concentré</strong> l&agrave; sản phẩm kem dưỡng đa năng đến từ thương hiệu Embryolisse của Ph&aacute;p, với c&aacute;c th&agrave;nh phần tự nhi&ecirc;n l&agrave;nh t&iacute;nh, kh&ocirc;ng g&acirc;y dị ứng, hỗ trợ cấp nước, giữ ẩm cho l&agrave;n da lu&ocirc;n căng b&oacute;ng, mềm mịn v&agrave; rạng rỡ. Kết cấu sản phẩm dạng kem sữa, ph&ugrave; hợp l&agrave;m lớp l&oacute;t trước trang điểm, kem dưỡng ẩm hoặc mặt nạ dưỡng da, mang lại sự thoải m&aacute;i cho cả những l&agrave;n da kh&ocirc; &amp; nhạy cảm nhất.</p>\r\n\r\n<h1>C&ocirc;ng dụng:</h1>\r\n\r\n<ul>\r\n\t<li>Gi&uacute;p cung cấp dưỡng chất v&agrave; dưỡng ẩm chuy&ecirc;n s&acirc;u, l&agrave;m dịu da, gi&uacute;p da mềm mướt, mịn m&agrave;ng.</li>\r\n\t<li>Hỗ trợ cải thiện l&agrave;n da kh&ocirc; r&aacute;p, nứt nẻ, xước da,... khi thời tiết hanh kh&ocirc; hoặc sau khi tắm nước n&oacute;ng khi thời tiết sang đ&ocirc;ng.</li>\r\n\t<li>Đa c&ocirc;ng dụng:&nbsp;c&oacute; thể sử dụng như kem dưỡng ẩm, mặt nạ dưỡng ẩm,&nbsp;sử dụng cho em b&eacute;,&nbsp;l&agrave;m kem l&oacute;t trang điểm gi&uacute;p lớp trang điểm b&aacute;m tr&ecirc;n da bền đẹp,&nbsp;mịn m&agrave;ng, hoặc d&ugrave;ng như kem tẩy trang nhẹ nh&agrave;ng do da v&agrave;o cuối ng&agrave;y.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16074/content_1675759987.jpg" /></h1>\r\n\r\n<h1>Loại da ph&ugrave; hợp:</h1>\r\n\r\n<ul>\r\n\t<li>Mọi loại da (kể cả da nhạy cảm v&agrave; da rất kh&ocirc;)</li>\r\n</ul>\r\n\r\n<h1>Giải quyết t&igrave;nh trạng da:&nbsp;</h1>\r\n\r\n<ul>\r\n\t<li>Da thiếu ẩm - thiếu nước, kh&ocirc; r&aacute;p, nứt nẻ, bong tr&oacute;c, xước da,...</li>\r\n\t<li>Da dễ bị mốc khi trang điểm, k&eacute;m &quot;ăn phấn&quot;.</li>\r\n\t<li>Da nhạy cảm - dễ k&iacute;ch ứng.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16073/content_1675759966.jpg" /></h1>\r\n\r\n<h1>Ưu&nbsp;điểm:</h1>\r\n\r\n<ul>\r\n\t<li>C&ocirc;ng thức chứa&nbsp;c&aacute;c th&agrave;nh phần tự nhi&ecirc;n&nbsp;(bơ hạt mỡ, l&ocirc; hội v&agrave; proteins từ đậu n&agrave;nh...)&nbsp;rất l&agrave;nh t&iacute;nh với mọi loại da, kh&ocirc;ng g&acirc;y dị ứng, kể cả tr&ecirc;n những l&agrave;n da nhạy cảm hay bong tr&oacute;c.</li>\r\n\t<li>Kết cấu chất kem kh&ocirc;ng qu&aacute; đặc, kh&ocirc;ng qu&aacute; lỏng, trắng sữa, dịu nhẹ, thấm nhanh v&agrave;o da hỗ trợ giữ ẩm cho da.</li>\r\n\t<li>C&oacute; thể sử dụng để dưỡng ẩm v&agrave; l&agrave;m dịu những v&ugrave;ng da kh&aacute;c tr&ecirc;n cơ thể khi bị bỏng, kh&ocirc; bong tr&oacute;c, nứt nẻ, bị c&ocirc;n tr&ugrave;ng cắn&hellip;</li>\r\n\t<li>Sản phẩm đ&atilde; trải qua ki&ecirc;̉m nghiệm da li&ecirc;̃u v&ecirc;̀ độ lành tính, rất l&agrave;nh t&iacute;nh với mọi loại da, kh&ocirc;ng g&acirc;y dị ứng, kể cả tr&ecirc;n những l&agrave;n da nhạy cảm hay bong tr&oacute;c.</li>\r\n</ul>\r\n\r\n<h1>C&aacute;ch sử dụng:</h1>\r\n\r\n<ul>\r\n\t<li>Sử dụng kem tr&ecirc;n nền da sạch, thời gian 2 lần/ng&agrave;y, s&aacute;ng v&agrave; tối.</li>\r\n\t<li>Thoa một lượng mỏng l&ecirc;n v&ugrave;ng da mặt v&agrave; cổ,&nbsp;massage nhẹ đến khi thẩm thấu v&agrave;o lớp biểu b&igrave;.</li>\r\n\t<li>Nếu d&ugrave;ng để tẩy trang, cho một lượng nhỏ kem l&ecirc;n mặt b&ocirc;ng tẩy trang v&agrave; nhẹ nh&agrave;ng lau.</li>\r\n\t<li>Đối với l&agrave;n da kh&ocirc; căng v&agrave; mất nước, chỉ cần lưu lại một lớp kem dưỡng trong v&ograve;ng 15 ph&uacute;t, l&agrave;n sa sẽ ngay lập tức trở n&ecirc;n căng mịn hơn.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16076/content_1675761102.jpg" /></h1>\r\n\r\n<h1>Th&agrave;nh phần:</h1>\r\n\r\n<p><strong>Th&agrave;nh phần ch&iacute;nh:&nbsp;</strong></p>\r\n\r\n<p>Emollient oil k&ecirc;́t hợp với các thành ph&acirc;̀n có ngu&ocirc;̀n g&ocirc;́c từ thiên nhiên: bơ hạt mỡ, sáp ong, nha đam và protein đậu nành.&nbsp;</p>\r\n\r\n<p><strong>Th&agrave;nh phần chi tiết:</strong></p>\r\n\r\n<p>Aqua (water),&nbsp;Paraffinum Liquidum, Stearic Acid,&nbsp;Glyceryl Stearate,&nbsp;Triethanolamine, Cera Alba,&nbsp;Cetyl Palmitate,&nbsp;Butyrospermum Parkii (Shea) Butter, Parfum,&nbsp;Steareth-10,&nbsp;Propylene Glycol,&nbsp;Aloe Barbadensis,&nbsp;Hydrolyzed Soy Protein,&nbsp;Tropolone, 1,2-Hexanediol, Caprylyl Glycol, Polyacrylamide,&nbsp;C13-14 Isoparaffin,&nbsp;Laureth-7.</p>\r\n\r\n<h1>Bảo quản:</h1>\r\n\r\n<ul>\r\n\t<li>Bảo quản nơi kh&ocirc; r&aacute;o, tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp hoặc nơi c&oacute; nhiệt độ cao</li>\r\n\t<li>Đậy nắp sau khi sử dụng</li>\r\n</ul>\r\n\r\n<h1>Th&ocirc;ng số sản phẩm:</h1>\r\n\r\n<ul>\r\n\t<li>\r\n\t<p>Dung t&iacute;ch: 30ml</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Thương hiệu: Embryolisse</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Xuất xứ thương hiệu: Ph&aacute;p</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Nơi sản xuất: Ph&aacute;p</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Hạn sử dụng: 3 năm kể từ ng&agrave;y sản xuất</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Ng&agrave;y sản xuất: Xem tr&ecirc;n bao b&igrave; sản phẩm</p>\r\n\t</li>\r\n</ul>\r\n',
            display_name: 'Kem Siêu Dưỡng Ẩm Hỗ Trợ Phục Hồi Da Embryolisse Lait Creme Concentre 30ml',
            individual_box_slug: 'kem-sieu-duong-am-ho-tro-phuc-hoi-da-embryolisse-lait-creme-concentre',
            ingredients:
              'Thành phần sản phẩm\r\nThành phần chính: Emollient oil kết hợp với các thành phần có nguồn gốc từ thiên nhiên: bơ hạt mỡ, sáp ong, nha đam và protein đậu nành. \r\n\r\nThành phần đầy đủ: Aqua (water), Paraffinum Liquidum, Stearic Acid, Glyceryl Stearate, Triethanolamine, Cera Alba, Cetyl Palmitate, Butyrospermum Parkii (Shea) Butter, Parfum, Steareth-10, Propylene Glycol, Aloe Barbadensis, Hydrolyzed Soy Protein, Tropolone, 1,2-Hexanediol, Caprylyl Glycol, Polyacrylamide, C13-14 Isoparaffin, Laureth-7',
            made_in_country: 'France',
            name: 'Kem Siêu Dưỡng Ẩm Hỗ Trợ Phục Hồi Da Embryolisse Lait Creme Concentre 30ml',
            original_price: 365000,
            price: 365000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/facebook/1671596191.jpg?t=1687939774',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/large/1671596191.jpg?t=1687939774',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/medium/1671596191.jpg?t=1687939774',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/original/1671596191.jpg?t=1687939774',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/square/1671596191.jpg?t=1687939774',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/thumb/1671596191.jpg?t=1687939774',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/vertical/1671596191.jpg?t=1687939774'
            },
            primary_picture_webp: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/facebook_webp/1671596191.webp?t=1687939774',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/large_webp/1671596191.webp?t=1687939774',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/medium_webp/1671596191.webp?t=1687939774',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/original/1671596191.jpg?t=1687939774',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/square_webp/1671596191.webp?t=1687939774',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/thumb_webp/1671596191.webp?t=1687939774',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/079/937/vertical_webp/1671596191.webp?t=1687939774'
            },
            saleable: true,
            slug: 'kem-sieu-duong-am-ho-tro-phuc-hoi-da-embryolisse-lait-creme-concentre-30ml',
            usage:
              'Sử dụng Embryolisse Lait Creme Concentre hàng ngày như một loại kem ngày và đêm bằng cách thoa một lượng mỏng lên vùng da mặt và cổ đã được làm sạch.\r\n\r\nNếu dùng để tẩy trang, cho một lượng nhỏ kem lên mặt bông tẩy trang và nhẹ nhàng lau để loại bỏ lớp trang điểm và tạp chất vào cuối ngày.\r\n\r\nNếu cảm thấy da mất nước và khô căng khó chịu, thoa một lớp dày kem lên da, để trong 15 phút sau đó nhẹ nhàng lau sạch để cấp ẩm sâu, giúp da mịn màng và căng mượt.',
            usage_duration: null,
            wholesale_price: null
          },
          product_id: 13183,
          quantity: 1
        }
      ],
      brand_name: 'Embryolisse',
      categories: [
        {
          id: 1282,
          name: 'Beauty',
          vn_name: 'Làm Đẹp',
          slug: 'beauty',
          special: false,
          parent_id: null,
          position: 572,
          node_type: 'category',
          seo_description: null,
          created_at: '2023-01-30T18:13:21.000+07:00',
          updated_at: '2023-01-30T18:22:31.000+07:00',
          display_homepage: true,
          browsenodeable_id: 561,
          browsenodeable_type: 'Category',
          browse_tree: 'Beauty',
          menu_column: 1,
          menu_row: 1,
          browse_tree_ids: '.1282.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        },
        {
          id: 1284,
          name: 'Skin Care',
          vn_name: 'Chăm Sóc Da',
          slug: 'skin-care',
          special: true,
          parent_id: 1282,
          position: 14,
          node_type: 'category',
          seo_description: null,
          created_at: '2023-01-30T18:13:21.000+07:00',
          updated_at: '2023-01-30T18:22:31.000+07:00',
          display_homepage: true,
          browsenodeable_id: 563,
          browsenodeable_type: 'Category',
          browse_tree: 'Beauty > Skincare',
          menu_column: 2,
          menu_row: 2,
          browse_tree_ids: '.1282.1284.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        },
        {
          id: 1301,
          name: 'Moisturizer',
          vn_name: 'Dưỡng Ẩm',
          slug: 'moisturizer',
          special: false,
          parent_id: 1284,
          position: 10,
          node_type: 'category',
          seo_description: null,
          created_at: '2023-01-30T18:13:22.000+07:00',
          updated_at: '2023-01-30T18:13:22.000+07:00',
          display_homepage: true,
          browsenodeable_id: 580,
          browsenodeable_type: 'Category',
          browse_tree: 'Beauty > Skincare > Moisturizer',
          menu_column: 0,
          menu_row: 0,
          browse_tree_ids: '.1282.1284.1301.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        }
      ],
      coins_price: 3000,
      delivery_time: {},
      for_redeem: true,
      is_bundle: false,
      is_individual: true,
      is_saleable: true,
      like_count: 24,
      lixibox_id: 'LXA28E80DBD4',
      lixicoin_bonus: 365,
      long_description:
        '<p><strong>Kem Dưỡng Ẩm Embryolisse Lait-Crème Concentré</strong> l&agrave; sản phẩm kem dưỡng đa năng đến từ thương hiệu Embryolisse của Ph&aacute;p, với c&aacute;c th&agrave;nh phần tự nhi&ecirc;n l&agrave;nh t&iacute;nh, kh&ocirc;ng g&acirc;y dị ứng, hỗ trợ cấp nước, giữ ẩm cho l&agrave;n da lu&ocirc;n căng b&oacute;ng, mềm mịn v&agrave; rạng rỡ. Kết cấu sản phẩm dạng kem sữa, ph&ugrave; hợp l&agrave;m lớp l&oacute;t trước trang điểm, kem dưỡng ẩm hoặc mặt nạ dưỡng da, mang lại sự thoải m&aacute;i cho cả những l&agrave;n da kh&ocirc; &amp; nhạy cảm nhất.</p>\r\n\r\n<h1>C&ocirc;ng dụng:</h1>\r\n\r\n<ul>\r\n\t<li>Gi&uacute;p cung cấp dưỡng chất v&agrave; dưỡng ẩm chuy&ecirc;n s&acirc;u, l&agrave;m dịu da, gi&uacute;p da mềm mướt, mịn m&agrave;ng.</li>\r\n\t<li>Hỗ trợ cải thiện l&agrave;n da kh&ocirc; r&aacute;p, nứt nẻ, xước da,... khi thời tiết hanh kh&ocirc; hoặc sau khi tắm nước n&oacute;ng khi thời tiết sang đ&ocirc;ng.</li>\r\n\t<li>Đa c&ocirc;ng dụng:&nbsp;c&oacute; thể sử dụng như kem dưỡng ẩm, mặt nạ dưỡng ẩm,&nbsp;sử dụng cho em b&eacute;,&nbsp;l&agrave;m kem l&oacute;t trang điểm gi&uacute;p lớp trang điểm b&aacute;m tr&ecirc;n da bền đẹp,&nbsp;mịn m&agrave;ng, hoặc d&ugrave;ng như kem tẩy trang nhẹ nh&agrave;ng do da v&agrave;o cuối ng&agrave;y.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16074/content_1675759987.jpg" /></h1>\r\n\r\n<h1>Loại da ph&ugrave; hợp:</h1>\r\n\r\n<ul>\r\n\t<li>Mọi loại da (kể cả da nhạy cảm v&agrave; da rất kh&ocirc;)</li>\r\n</ul>\r\n\r\n<h1>Giải quyết t&igrave;nh trạng da:&nbsp;</h1>\r\n\r\n<ul>\r\n\t<li>Da thiếu ẩm - thiếu nước, kh&ocirc; r&aacute;p, nứt nẻ, bong tr&oacute;c, xước da,...</li>\r\n\t<li>Da dễ bị mốc khi trang điểm, k&eacute;m &quot;ăn phấn&quot;.</li>\r\n\t<li>Da nhạy cảm - dễ k&iacute;ch ứng.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16073/content_1675759966.jpg" /></h1>\r\n\r\n<h1>Ưu&nbsp;điểm:</h1>\r\n\r\n<ul>\r\n\t<li>C&ocirc;ng thức chứa&nbsp;c&aacute;c th&agrave;nh phần tự nhi&ecirc;n&nbsp;(bơ hạt mỡ, l&ocirc; hội v&agrave; proteins từ đậu n&agrave;nh...)&nbsp;rất l&agrave;nh t&iacute;nh với mọi loại da, kh&ocirc;ng g&acirc;y dị ứng, kể cả tr&ecirc;n những l&agrave;n da nhạy cảm hay bong tr&oacute;c.</li>\r\n\t<li>Kết cấu chất kem kh&ocirc;ng qu&aacute; đặc, kh&ocirc;ng qu&aacute; lỏng, trắng sữa, dịu nhẹ, thấm nhanh v&agrave;o da hỗ trợ giữ ẩm cho da.</li>\r\n\t<li>C&oacute; thể sử dụng để dưỡng ẩm v&agrave; l&agrave;m dịu những v&ugrave;ng da kh&aacute;c tr&ecirc;n cơ thể khi bị bỏng, kh&ocirc; bong tr&oacute;c, nứt nẻ, bị c&ocirc;n tr&ugrave;ng cắn&hellip;</li>\r\n\t<li>Sản phẩm đ&atilde; trải qua ki&ecirc;̉m nghiệm da li&ecirc;̃u v&ecirc;̀ độ lành tính, rất l&agrave;nh t&iacute;nh với mọi loại da, kh&ocirc;ng g&acirc;y dị ứng, kể cả tr&ecirc;n những l&agrave;n da nhạy cảm hay bong tr&oacute;c.</li>\r\n</ul>\r\n\r\n<h1>C&aacute;ch sử dụng:</h1>\r\n\r\n<ul>\r\n\t<li>Sử dụng kem tr&ecirc;n nền da sạch, thời gian 2 lần/ng&agrave;y, s&aacute;ng v&agrave; tối.</li>\r\n\t<li>Thoa một lượng mỏng l&ecirc;n v&ugrave;ng da mặt v&agrave; cổ,&nbsp;massage nhẹ đến khi thẩm thấu v&agrave;o lớp biểu b&igrave;.</li>\r\n\t<li>Nếu d&ugrave;ng để tẩy trang, cho một lượng nhỏ kem l&ecirc;n mặt b&ocirc;ng tẩy trang v&agrave; nhẹ nh&agrave;ng lau.</li>\r\n\t<li>Đối với l&agrave;n da kh&ocirc; căng v&agrave; mất nước, chỉ cần lưu lại một lớp kem dưỡng trong v&ograve;ng 15 ph&uacute;t, l&agrave;n sa sẽ ngay lập tức trở n&ecirc;n căng mịn hơn.</li>\r\n</ul>\r\n\r\n<h1><img alt="" src="https://s3-ap-southeast-1.amazonaws.com/lixibox-production-uploads/blogs/pictures/16076/content_1675761102.jpg" /></h1>\r\n\r\n<h1>Th&agrave;nh phần:</h1>\r\n\r\n<p><strong>Th&agrave;nh phần ch&iacute;nh:&nbsp;</strong></p>\r\n\r\n<p>Emollient oil k&ecirc;́t hợp với các thành ph&acirc;̀n có ngu&ocirc;̀n g&ocirc;́c từ thiên nhiên: bơ hạt mỡ, sáp ong, nha đam và protein đậu nành.&nbsp;</p>\r\n\r\n<p><strong>Th&agrave;nh phần chi tiết:</strong></p>\r\n\r\n<p>Aqua (water),&nbsp;Paraffinum Liquidum, Stearic Acid,&nbsp;Glyceryl Stearate,&nbsp;Triethanolamine, Cera Alba,&nbsp;Cetyl Palmitate,&nbsp;Butyrospermum Parkii (Shea) Butter, Parfum,&nbsp;Steareth-10,&nbsp;Propylene Glycol,&nbsp;Aloe Barbadensis,&nbsp;Hydrolyzed Soy Protein,&nbsp;Tropolone, 1,2-Hexanediol, Caprylyl Glycol, Polyacrylamide,&nbsp;C13-14 Isoparaffin,&nbsp;Laureth-7.</p>\r\n\r\n<h1>Bảo quản:</h1>\r\n\r\n<ul>\r\n\t<li>Bảo quản nơi kh&ocirc; r&aacute;o, tho&aacute;ng m&aacute;t, tr&aacute;nh &aacute;nh nắng trực tiếp hoặc nơi c&oacute; nhiệt độ cao</li>\r\n\t<li>Đậy nắp sau khi sử dụng</li>\r\n</ul>\r\n\r\n<h1>Th&ocirc;ng số sản phẩm:</h1>\r\n\r\n<ul>\r\n\t<li>\r\n\t<p>Dung t&iacute;ch: 30ml</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Thương hiệu: Embryolisse</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Xuất xứ thương hiệu: Ph&aacute;p</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Nơi sản xuất: Ph&aacute;p</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Hạn sử dụng: 3 năm kể từ ng&agrave;y sản xuất</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Ng&agrave;y sản xuất: Xem tr&ecirc;n bao b&igrave; sản phẩm</p>\r\n\t</li>\r\n</ul>\r\n',
      name: 'Kem Siêu Dưỡng Ẩm Hỗ Trợ Phục Hồi Da Embryolisse Lait Creme Concentre 30ml',
      note: null,
      number_of_products: 1,
      original_price: 365000,
      pictures: [
        {
          id: 79937,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/facebook/1671596191.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/large/1671596191.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/medium/1671596191.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/optimized/1671596191.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/original/1671596191.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/thumb/1671596191.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/large/1671596191.jpg?v=2',
          width: 960
        }
      ],
      pictures_webp: [
        {
          id: 79937,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/079/937/facebook_webp/1671596191.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/large_webp/1671596191.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/medium_webp/1671596191.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/079/937/optimized_webp/1671596191.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/original/1671596191.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/thumb_webp/1671596191.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/large/1671596191.jpg?v=2',
          width: 960
        }
      ],
      pre_order_release_date: null,
      pre_order_status: null,
      preview_picture: {},
      preview_picture_webp: {},
      price: 365000,
      price_sale_off: 0,
      primary_picture: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/facebook/1671596191.jpg?t=1691672454',
        large_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/large/1671596191.jpg?t=1691672454',
        medium_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/medium/1671596191.jpg?t=1691672454',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/original/1671596191.jpg?t=1691672454',
        square_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/square/1671596191.jpg?t=1691672454',
        thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/079/937/thumb/1671596191.jpg?t=1691672454',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/vertical/1671596191.jpg?t=1691672454'
      },
      primary_picture_webp: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/facebook_webp/1671596191.webp?t=1691672454',
        large_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/large_webp/1671596191.webp?t=1691672454',
        medium_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/medium_webp/1671596191.webp?t=1691672454',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/original/1671596191.jpg?t=1691672454',
        square_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/square_webp/1671596191.webp?t=1691672454',
        thumb_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/thumb_webp/1671596191.webp?t=1691672454',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/079/937/vertical_webp/1671596191.webp?t=1691672454'
      },
      rating: {
        avg_rate: 4.8,
        count: 8
      },
      reason_to_sell: null,
      saving_bundle_value: 0,
      short_description:
        'Kem Dưỡng Ẩm Embryolisse Lait-Crème Concentré là sản phẩm kem dưỡng đa năng đến từ thương hiệu Embryolisse của Pháp, với các thành phần tự nhiên lành tính, không gây dị ứng, hỗ trợ cấp nước, giữ ẩm cho làn da luôn căng bóng, mềm mịn và rạng rỡ. Kết cấu sản phẩm dạng kem sữa, phù hợp làm lớp lót trước trang điểm, kem dưỡng ẩm hoặc mặt nạ dưỡng da, mang lại sự thoải mái cho cả những làn da khô & nhạy cảm nhất. Công dụng: Giúp cung cấp dưỡng chất và dưỡng ẩm chuyên sâu, làm dịu da, giúp da mềm mướt, mịn màng. Hỗ trợ cải thiện làn da khô ráp, nứt nẻ, xước da,... khi thời tiết hanh khô hoặc sau khi tắm nước nóng khi thời tiết sang đông. Đa công dụng: có thể sử dụng như kem dưỡng ẩm, mặt nạ dưỡng ẩm, sử dụng cho em bé, làm kem lót trang điểm giúp lớp trang điểm bám trên da bền đẹp, mịn màng, hoặc dùng như kem tẩy trang nhẹ nhàng do da vào cuối ngày. Loại da phù hợp: Mọi loại da (kể cả da nhạy cảm và da rất khô) Giải quyết tình trạng da: Da thiếu ẩm - thiếu nước, khô ráp, nứt nẻ, bong tróc, xước da,... Da dễ bị mốc khi trang điểm, kém "ăn phấn". Da nhạy cảm - dễ kích ứng. Ưu điểm: Công thức chứa các thành phần tự nhiên (bơ hạt mỡ, lô hội và proteins từ đậu nành...) rất lành tính với mọi loại da, không gây dị ứng, kể cả trên những làn da nhạy cảm hay bong tróc. Kết cấu chất kem không quá đặc, không quá lỏng, trắng sữa, dịu nhẹ, thấm nhanh vào da hỗ trợ giữ ẩm cho da. Có thể sử dụng để dưỡng ẩm và làm dịu những vùng da khác trên cơ thể khi bị bỏng, khô bong tróc, nứt nẻ, bị côn trùng cắn… Sản phẩm đã trải qua kiểm nghiệm da liễu về độ lành tính, rất lành tính với mọi loại da, không gây dị ứng, kể cả trên những làn da nhạy cảm hay bong tróc. Cách sử dụng: Sử dụng kem trên nền da sạch, thời gian 2 lần/ngày, sáng và tối. Thoa một lượng mỏng lên vùng da mặt và cổ, massage nhẹ đến khi thẩm thấu vào lớp biểu bì. Nếu dùng để tẩy trang, cho một lượng nhỏ kem lên mặt bông tẩy trang và nhẹ nhàng lau. Đối với làn da khô căng và mất nước, chỉ cần lưu lại một lớp kem dưỡng trong vòng 15 phút, làn sa sẽ ngay lập tức trở nên căng mịn hơn. Thành phần: Thành phần chính: Emollient oil kết hợp với các thành phần có nguồn gốc từ thiên nhiên: bơ hạt mỡ, sáp ong, nha đam và protein đậu nành. Thành phần chi tiết: Aqua (water), Paraffinum Liquidum, Stearic Acid, Glyceryl Stearate, Triethanolamine, Cera Alba, Cetyl Palmitate, Butyrospermum Parkii (Shea) Butter, Parfum, Steareth-10, Propylene Glycol, Aloe Barbadensis, Hydrolyzed Soy Protein, Tropolone, 1,2-Hexanediol, Caprylyl Glycol, Polyacrylamide, C13-14 Isoparaffin, Laureth-7. Bảo quản: Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp hoặc nơi có nhiệt độ cao Đậy nắp sau khi sử dụng Thông số sản phẩm: Dung tích: 30ml Thương hiệu: Embryolisse Xuất xứ thương hiệu: Pháp Nơi sản xuất: Pháp Hạn sử dụng: 3 năm kể từ ngày sản xuất Ngày sản xuất: Xem trên bao bì sản phẩm',
      size_guides: [],
      slug: 'kem-sieu-duong-am-ho-tro-phuc-hoi-da-embryolisse-lait-creme-concentre',
      status: 'approved',
      stock: 10,
      store_stock: 0,
      tracking: {
        category_key: 'beauty-skin-care-moisturizer'
      },
      videos: []
    },
    liked: false,
    reviewed: false,
    can_review: false,
    box_variants: [
      {
        option_values: [
          {
            type: 'size',
            value_id: 92
          }
        ],
        slug: 'kem-sieu-duong-am-ho-tro-phuc-hoi-da-embryolisse-lait-creme-concentre'
      },
      {
        option_values: [
          {
            type: 'size',
            value_id: 190
          }
        ],
        slug: 'kem-sieu-duong-am-ho-tro-phuc-hoi-da-embryolisse-lait-creme-concentre-75ml'
      }
    ],
    option_types: [
      {
        name: 'size',
        presentation: 'Size',
        values: [
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: '30 ml',
            option_value_id: 92,
            option_value_name: '30ml',
            presentation: '30ml'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: null,
            name: '75ml',
            option_value_id: 190,
            option_value_name: '75ml',
            presentation: '75ml'
          }
        ]
      }
    ]
  },
  1082614581: {
    success: true,
    box: {
      id: 11270,
      added_to_waitlist: false,
      avg_rate: 5,
      badges: {
        top_left: 'https://upload.lixibox.com/system/badges/icons/000/000/795/detail/1689872609.png',
        top_right: null,
        bottom_right: null,
        bottom_left: null
      },
      box_products: [
        {
          id: 15492,
          box_id: 11270,
          expert_description:
            '<p><strong>Bộ sưu tập Sealove của To The Stars</strong> với họa tiết dễ thương, truyền cảm hứng từ t&igrave;nh y&ecirc;u của mẹ v&agrave; thấu hiểu những kh&aacute;t khao mong muốn đem đến che chở, an to&agrave;n cho b&eacute; y&ecirc;u.</p>\r\n\r\n<p>Chất liệu lu&ocirc;n được xem l&agrave; ưu ti&ecirc;n h&agrave;ng đầu của To The Stars, được l&agrave;m từ <strong>100% sợi b&ocirc;ng cotton tự nhi&ecirc;n</strong> mềm mại, tho&aacute;ng m&aacute;t, thấm h&uacute;t mồ h&ocirc;i, co gi&atilde;n gi&uacute;p b&eacute; cử động thoải m&aacute;i kh&aacute;m ph&aacute; thế giới b&ecirc;n ngo&agrave;i, n&acirc;ng niu l&agrave;n da mỏng manh, nhạy cảm của trẻ sơ sinh.</p>\r\n\r\n<p>Sản phẩm <strong>đạt ti&ecirc;u chuẩn OEKO-TEX 100</strong> - chứng chỉ quốc tế cho sản phẩm an to&agrave;n trong may mặc, ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, kh&ocirc;ng ho&aacute; chất nhuộm trong c&ocirc;ng nghiệp.</p>\r\n\r\n<p>Từng đường may, mũi chỉ đều được kiểm so&aacute;t chặt chẽ về chất lượng, đ&aacute;p ứng được y&ecirc;u cầu của cả những mẹ kh&oacute; t&iacute;nh v&agrave; khắt khe nhất trong việc lựa chọn đồ d&ugrave;ng cho b&eacute; y&ecirc;u của m&igrave;nh.</p>\r\n\r\n<p>Thiết kế một mảnh liền nhẹ nh&agrave;ng giữ ấm cho bụng v&agrave; lưng b&eacute;. Cổ &aacute;o envelope v&agrave; n&uacute;t bấm kh&ocirc;ng c&oacute; chứa nickel tại đủng quần được cải tiến, gi&uacute;p ba mẹ dễ d&agrave;ng mặc đồ v&agrave; thay bỉm cho b&eacute;.</p>\r\n',
          product: {
            id: 10609,
            brand: {
              id: 797,
              brand_image_url: 'https://upload.lixibox.com/system/brands/brand_images/000/000/797/original/logoTTS.png',
              description:
                'To The Stars là thương hiệu sản phẩm chăm sóc cho trẻ từ sơ sinh đến 1 tuổi được ra đời từ sự thấu hiểu những khát khao mong muốn đem đến sự che chở, an toàn cho bé yêu của mẹ. \r\n\r\nChất liệu luôn được xem là ưu tiên hàng đầu của To The Stars, sản phẩm được làm từ 100% sợi bông cotton tự nhiên mềm mại, thoáng mát, thấm hút mồ hôi, co giãn giúp bé cử động thoải mái khám phá thế giới bên ngoài, nâng niu làn da mỏng manh, nhạy cảm của trẻ sơ sinh.\r\n\r\nSản phẩm đạt tiêu chuẩn OEKO-TEX 100 - chứng chỉ quốc tế cho sản phẩm an toàn trong may mặc, hoàn toàn không sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, không hoá chất nhuộm trong công nghiệp. Từng đường may, mũi chỉ đều được kiểm soát chặt chẽ về chất lượng, đáp ứng được yêu cầu của cả những mẹ khó tính và khắt khe nhất trong việc lựa chọn đồ dùng cho bé yêu của mình.',
              name: 'To The Stars',
              slug: 'to-the-stars'
            },
            capacity: '100.0 gr',
            country: 'United States',
            description:
              '<p><strong>Bộ sưu tập Sealove của To The Stars</strong> với họa tiết dễ thương, truyền cảm hứng từ t&igrave;nh y&ecirc;u của mẹ v&agrave; thấu hiểu những kh&aacute;t khao mong muốn đem đến che chở, an to&agrave;n cho b&eacute; y&ecirc;u.</p>\r\n\r\n<p>Chất liệu lu&ocirc;n được xem l&agrave; ưu ti&ecirc;n h&agrave;ng đầu của To The Stars, được l&agrave;m từ <strong>100% sợi b&ocirc;ng cotton tự nhi&ecirc;n</strong> mềm mại, tho&aacute;ng m&aacute;t, thấm h&uacute;t mồ h&ocirc;i, co gi&atilde;n gi&uacute;p b&eacute; cử động thoải m&aacute;i kh&aacute;m ph&aacute; thế giới b&ecirc;n ngo&agrave;i, n&acirc;ng niu l&agrave;n da mỏng manh, nhạy cảm của trẻ sơ sinh.</p>\r\n\r\n<p>Sản phẩm <strong>đạt ti&ecirc;u chuẩn OEKO-TEX 100</strong> - chứng chỉ quốc tế cho sản phẩm an to&agrave;n trong may mặc, ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, kh&ocirc;ng ho&aacute; chất nhuộm trong c&ocirc;ng nghiệp.</p>\r\n\r\n<p>Từng đường may, mũi chỉ đều được kiểm so&aacute;t chặt chẽ về chất lượng, đ&aacute;p ứng được y&ecirc;u cầu của cả những mẹ kh&oacute; t&iacute;nh v&agrave; khắt khe nhất trong việc lựa chọn đồ d&ugrave;ng cho b&eacute; y&ecirc;u của m&igrave;nh.</p>\r\n\r\n<p>Thiết kế một mảnh liền nhẹ nh&agrave;ng giữ ấm cho bụng v&agrave; lưng b&eacute;. Cổ &aacute;o envelope v&agrave; n&uacute;t bấm kh&ocirc;ng c&oacute; chứa nickel tại đủng quần được cải tiến, gi&uacute;p ba mẹ dễ d&agrave;ng mặc đồ v&agrave; thay bỉm cho b&eacute;.</p>\r\n',
            display_name: 'Bộ Liền To The Stars Trắng Cho Bé Trai Sơ Sinh',
            individual_box_slug: 'baby-boy-onesie',
            ingredients: '100% Cotton',
            made_in_country: 'China',
            name: 'Bộ Liền Bé Trai Trắng To The Stars Newborn',
            original_price: 150000,
            price: 45000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/facebook/1600245733.jpg?t=1690791543',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/large/1600245733.jpg?t=1690791543',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/medium/1600245733.jpg?t=1690791543',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/original/1600245733.jpg?t=1690791543',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/square/1600245733.jpg?t=1690791543',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/thumb/1600245733.jpg?t=1690791543',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/vertical/1600245733.jpg?t=1690791543'
            },
            primary_picture_webp: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/facebook_webp/1600245733.webp?t=1690791543',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/large_webp/1600245733.webp?t=1690791543',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/medium_webp/1600245733.webp?t=1690791543',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/original/1600245733.jpg?t=1690791543',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/square_webp/1600245733.webp?t=1690791543',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/thumb_webp/1600245733.webp?t=1690791543',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/818/vertical_webp/1600245733.webp?t=1690791543'
            },
            saleable: true,
            slug: 'bo-lien-to-the-stars-trang-cho-be-trai-so-sinh',
            usage: '',
            usage_duration: null,
            wholesale_price: null
          },
          product_id: 10609,
          quantity: 1
        },
        {
          id: 15493,
          box_id: 11270,
          expert_description:
            '<p><strong>Bộ sưu tập Sealove của To The Stars</strong> với họa tiết dễ thương, truyền cảm hứng từ t&igrave;nh y&ecirc;u của mẹ v&agrave; thấu hiểu những kh&aacute;t khao mong muốn đem đến che chở, an to&agrave;n cho b&eacute; y&ecirc;u.</p>\r\n\r\n<p>Chất liệu lu&ocirc;n được xem l&agrave; ưu ti&ecirc;n h&agrave;ng đầu của To The Stars, được l&agrave;m từ <strong>100% sợi b&ocirc;ng cotton tự nhi&ecirc;n</strong> mềm mại, tho&aacute;ng m&aacute;t, thấm h&uacute;t mồ h&ocirc;i, co gi&atilde;n gi&uacute;p b&eacute; cử động thoải m&aacute;i kh&aacute;m ph&aacute; thế giới b&ecirc;n ngo&agrave;i, n&acirc;ng niu l&agrave;n da mỏng manh, nhạy cảm của trẻ sơ sinh.</p>\r\n\r\n<p>Sản phẩm <strong>đạt ti&ecirc;u chuẩn OEKO-TEX 100</strong> - chứng chỉ quốc tế cho sản phẩm an to&agrave;n trong may mặc, ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, kh&ocirc;ng ho&aacute; chất nhuộm trong c&ocirc;ng nghiệp.</p>\r\n\r\n<p>Từng đường may, mũi chỉ đều được kiểm so&aacute;t chặt chẽ về chất lượng, đ&aacute;p ứng được y&ecirc;u cầu của cả những mẹ kh&oacute; t&iacute;nh v&agrave; khắt khe nhất trong việc lựa chọn đồ d&ugrave;ng cho b&eacute; y&ecirc;u của m&igrave;nh.</p>\r\n\r\n<p>Thiết kế một mảnh liền nhẹ nh&agrave;ng giữ ấm cho bụng v&agrave; lưng b&eacute;. Cổ &aacute;o envelope v&agrave; n&uacute;t bấm kh&ocirc;ng c&oacute; chứa nickel tại đủng quần được cải tiến, gi&uacute;p ba mẹ dễ d&agrave;ng mặc đồ v&agrave; thay bỉm cho b&eacute;.</p>\r\n',
          product: {
            id: 10610,
            brand: {
              id: 797,
              brand_image_url: 'https://upload.lixibox.com/system/brands/brand_images/000/000/797/original/logoTTS.png',
              description:
                'To The Stars là thương hiệu sản phẩm chăm sóc cho trẻ từ sơ sinh đến 1 tuổi được ra đời từ sự thấu hiểu những khát khao mong muốn đem đến sự che chở, an toàn cho bé yêu của mẹ. \r\n\r\nChất liệu luôn được xem là ưu tiên hàng đầu của To The Stars, sản phẩm được làm từ 100% sợi bông cotton tự nhiên mềm mại, thoáng mát, thấm hút mồ hôi, co giãn giúp bé cử động thoải mái khám phá thế giới bên ngoài, nâng niu làn da mỏng manh, nhạy cảm của trẻ sơ sinh.\r\n\r\nSản phẩm đạt tiêu chuẩn OEKO-TEX 100 - chứng chỉ quốc tế cho sản phẩm an toàn trong may mặc, hoàn toàn không sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, không hoá chất nhuộm trong công nghiệp. Từng đường may, mũi chỉ đều được kiểm soát chặt chẽ về chất lượng, đáp ứng được yêu cầu của cả những mẹ khó tính và khắt khe nhất trong việc lựa chọn đồ dùng cho bé yêu của mình.',
              name: 'To The Stars',
              slug: 'to-the-stars'
            },
            capacity: '100.0 gr',
            country: 'United States',
            description:
              '<p><strong>Bộ sưu tập Sealove của To The Stars</strong> với họa tiết dễ thương, truyền cảm hứng từ t&igrave;nh y&ecirc;u của mẹ v&agrave; thấu hiểu những kh&aacute;t khao mong muốn đem đến che chở, an to&agrave;n cho b&eacute; y&ecirc;u.</p>\r\n\r\n<p>Chất liệu lu&ocirc;n được xem l&agrave; ưu ti&ecirc;n h&agrave;ng đầu của To The Stars, được l&agrave;m từ <strong>100% sợi b&ocirc;ng cotton tự nhi&ecirc;n</strong> mềm mại, tho&aacute;ng m&aacute;t, thấm h&uacute;t mồ h&ocirc;i, co gi&atilde;n gi&uacute;p b&eacute; cử động thoải m&aacute;i kh&aacute;m ph&aacute; thế giới b&ecirc;n ngo&agrave;i, n&acirc;ng niu l&agrave;n da mỏng manh, nhạy cảm của trẻ sơ sinh.</p>\r\n\r\n<p>Sản phẩm <strong>đạt ti&ecirc;u chuẩn OEKO-TEX 100</strong> - chứng chỉ quốc tế cho sản phẩm an to&agrave;n trong may mặc, ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, kh&ocirc;ng ho&aacute; chất nhuộm trong c&ocirc;ng nghiệp.</p>\r\n\r\n<p>Từng đường may, mũi chỉ đều được kiểm so&aacute;t chặt chẽ về chất lượng, đ&aacute;p ứng được y&ecirc;u cầu của cả những mẹ kh&oacute; t&iacute;nh v&agrave; khắt khe nhất trong việc lựa chọn đồ d&ugrave;ng cho b&eacute; y&ecirc;u của m&igrave;nh.</p>\r\n\r\n<p>Thiết kế một mảnh liền nhẹ nh&agrave;ng giữ ấm cho bụng v&agrave; lưng b&eacute;. Cổ &aacute;o envelope v&agrave; n&uacute;t bấm kh&ocirc;ng c&oacute; chứa nickel tại đủng quần được cải tiến, gi&uacute;p ba mẹ dễ d&agrave;ng mặc đồ v&agrave; thay bỉm cho b&eacute;.</p>\r\n',
            display_name: 'Bộ Liền To The Stars Họa Tiết Ngôi Sao Cho Bé Trai Sơ Sinh',
            individual_box_slug: 'baby-boy-onesie-0-3m',
            ingredients: '100% Cotton',
            made_in_country: 'China',
            name: 'Bộ Liền Bé Trai Ngôi Sao To The Stars Newborn',
            original_price: 150000,
            price: 45000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/facebook/1600245604.jpg?t=1691135581',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/large/1600245604.jpg?t=1691135581',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/medium/1600245604.jpg?t=1691135581',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/original/1600245604.jpg?t=1691135581',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/square/1600245604.jpg?t=1691135581',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/thumb/1600245604.jpg?t=1691135581',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/vertical/1600245604.jpg?t=1691135581'
            },
            primary_picture_webp: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/facebook_webp/1600245604.webp?t=1691135581',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/large_webp/1600245604.webp?t=1691135581',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/medium_webp/1600245604.webp?t=1691135581',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/original/1600245604.jpg?t=1691135581',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/square_webp/1600245604.webp?t=1691135581',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/thumb_webp/1600245604.webp?t=1691135581',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/815/vertical_webp/1600245604.webp?t=1691135581'
            },
            saleable: true,
            slug: 'bo-lien-to-the-stars-hoa-tiet-ngoi-sao-cho-be-trai-so-sinh',
            usage: '',
            usage_duration: null,
            wholesale_price: null
          },
          product_id: 10610,
          quantity: 1
        },
        {
          id: 15494,
          box_id: 11270,
          expert_description:
            '<p><strong>Bộ sưu tập Sealove của To The Stars</strong> với họa tiết dễ thương, truyền cảm hứng từ t&igrave;nh y&ecirc;u của mẹ v&agrave; thấu hiểu những kh&aacute;t khao mong muốn đem đến che chở, an to&agrave;n cho b&eacute; y&ecirc;u.</p>\r\n\r\n<p>Chất liệu lu&ocirc;n được xem l&agrave; ưu ti&ecirc;n h&agrave;ng đầu của To The Stars, được l&agrave;m từ <strong>100% sợi b&ocirc;ng cotton tự nhi&ecirc;n</strong> mềm mại, tho&aacute;ng m&aacute;t, thấm h&uacute;t mồ h&ocirc;i, co gi&atilde;n gi&uacute;p b&eacute; cử động thoải m&aacute;i kh&aacute;m ph&aacute; thế giới b&ecirc;n ngo&agrave;i, n&acirc;ng niu l&agrave;n da mỏng manh, nhạy cảm của trẻ sơ sinh.</p>\r\n\r\n<p>Sản phẩm <strong>đạt ti&ecirc;u chuẩn OEKO-TEX 100</strong> - chứng chỉ quốc tế cho sản phẩm an to&agrave;n trong may mặc, ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, kh&ocirc;ng ho&aacute; chất nhuộm trong c&ocirc;ng nghiệp.</p>\r\n\r\n<p>Từng đường may, mũi chỉ đều được kiểm so&aacute;t chặt chẽ về chất lượng, đ&aacute;p ứng được y&ecirc;u cầu của cả những mẹ kh&oacute; t&iacute;nh v&agrave; khắt khe nhất trong việc lựa chọn đồ d&ugrave;ng cho b&eacute; y&ecirc;u của m&igrave;nh.</p>\r\n\r\n<p>Thiết kế một mảnh liền nhẹ nh&agrave;ng giữ ấm cho bụng v&agrave; lưng b&eacute;. Cổ &aacute;o envelope v&agrave; n&uacute;t bấm kh&ocirc;ng c&oacute; chứa nickel tại đủng quần được cải tiến, gi&uacute;p ba mẹ dễ d&agrave;ng mặc đồ v&agrave; thay bỉm cho b&eacute;.</p>\r\n',
          product: {
            id: 10611,
            brand: {
              id: 797,
              brand_image_url: 'https://upload.lixibox.com/system/brands/brand_images/000/000/797/original/logoTTS.png',
              description:
                'To The Stars là thương hiệu sản phẩm chăm sóc cho trẻ từ sơ sinh đến 1 tuổi được ra đời từ sự thấu hiểu những khát khao mong muốn đem đến sự che chở, an toàn cho bé yêu của mẹ. \r\n\r\nChất liệu luôn được xem là ưu tiên hàng đầu của To The Stars, sản phẩm được làm từ 100% sợi bông cotton tự nhiên mềm mại, thoáng mát, thấm hút mồ hôi, co giãn giúp bé cử động thoải mái khám phá thế giới bên ngoài, nâng niu làn da mỏng manh, nhạy cảm của trẻ sơ sinh.\r\n\r\nSản phẩm đạt tiêu chuẩn OEKO-TEX 100 - chứng chỉ quốc tế cho sản phẩm an toàn trong may mặc, hoàn toàn không sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, không hoá chất nhuộm trong công nghiệp. Từng đường may, mũi chỉ đều được kiểm soát chặt chẽ về chất lượng, đáp ứng được yêu cầu của cả những mẹ khó tính và khắt khe nhất trong việc lựa chọn đồ dùng cho bé yêu của mình.',
              name: 'To The Stars',
              slug: 'to-the-stars'
            },
            capacity: '100.0 gr',
            country: 'United States',
            description:
              '<p><strong>Bộ sưu tập Sealove của To The Stars</strong> với họa tiết dễ thương, truyền cảm hứng từ t&igrave;nh y&ecirc;u của mẹ v&agrave; thấu hiểu những kh&aacute;t khao mong muốn đem đến che chở, an to&agrave;n cho b&eacute; y&ecirc;u.</p>\r\n\r\n<p>Chất liệu lu&ocirc;n được xem l&agrave; ưu ti&ecirc;n h&agrave;ng đầu của To The Stars, được l&agrave;m từ <strong>100% sợi b&ocirc;ng cotton tự nhi&ecirc;n</strong> mềm mại, tho&aacute;ng m&aacute;t, thấm h&uacute;t mồ h&ocirc;i, co gi&atilde;n gi&uacute;p b&eacute; cử động thoải m&aacute;i kh&aacute;m ph&aacute; thế giới b&ecirc;n ngo&agrave;i, n&acirc;ng niu l&agrave;n da mỏng manh, nhạy cảm của trẻ sơ sinh.</p>\r\n\r\n<p>Sản phẩm <strong>đạt ti&ecirc;u chuẩn OEKO-TEX 100</strong> - chứng chỉ quốc tế cho sản phẩm an to&agrave;n trong may mặc, ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, kh&ocirc;ng ho&aacute; chất nhuộm trong c&ocirc;ng nghiệp.</p>\r\n\r\n<p>Từng đường may, mũi chỉ đều được kiểm so&aacute;t chặt chẽ về chất lượng, đ&aacute;p ứng được y&ecirc;u cầu của cả những mẹ kh&oacute; t&iacute;nh v&agrave; khắt khe nhất trong việc lựa chọn đồ d&ugrave;ng cho b&eacute; y&ecirc;u của m&igrave;nh.</p>\r\n\r\n<p>Thiết kế một mảnh liền nhẹ nh&agrave;ng giữ ấm cho bụng v&agrave; lưng b&eacute;. Cổ &aacute;o envelope v&agrave; n&uacute;t bấm kh&ocirc;ng c&oacute; chứa nickel tại đủng quần được cải tiến, gi&uacute;p ba mẹ dễ d&agrave;ng mặc đồ v&agrave; thay bỉm cho b&eacute;.</p>\r\n',
            display_name: 'Bộ Liền To The Stars Họa Tiết Kỳ Lân Biển Cho Bé Trai Sơ Sinh',
            individual_box_slug: 'baby-boy-onesie-3-6m',
            ingredients: '100% Cotton',
            made_in_country: 'China',
            name: 'Bộ Liền Bé Trai Kỳ Lân Biển To The Stars Newborn',
            original_price: 150000,
            price: 45000,
            primary_picture: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/facebook/1600245494.jpg?t=1687427642',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/large/1600245494.jpg?t=1687427642',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/medium/1600245494.jpg?t=1687427642',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/original/1600245494.jpg?t=1687427642',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/square/1600245494.jpg?t=1687427642',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/thumb/1600245494.jpg?t=1687427642',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/vertical/1600245494.jpg?t=1687427642'
            },
            primary_picture_webp: {
              facebook_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/facebook_webp/1600245494.webp?t=1687427642',
              large_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/large_webp/1600245494.webp?t=1687427642',
              medium_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/medium_webp/1600245494.webp?t=1687427642',
              original_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/original/1600245494.jpg?t=1687427642',
              square_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/square_webp/1600245494.webp?t=1687427642',
              thumb_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/thumb_webp/1600245494.webp?t=1687427642',
              vertical_url:
                'https://upload.lixibox.com/system/pictures/files/000/052/812/vertical_webp/1600245494.webp?t=1687427642'
            },
            saleable: true,
            slug: 'bo-lien-to-the-stars-hoa-tiet-ky-lan-bien-cho-be-trai-so-sinh',
            usage: '',
            usage_duration: null,
            wholesale_price: null
          },
          product_id: 10611,
          quantity: 1
        }
      ],
      brand_name: 'To The Stars',
      categories: [
        {
          id: 1280,
          name: 'Gifts For Baby',
          vn_name: 'Quà Cho Bé',
          slug: 'gifts-for-baby',
          special: true,
          parent_id: 1277,
          position: 18,
          node_type: 'category',
          seo_description: null,
          created_at: '2022-12-13T10:49:36.000+07:00',
          updated_at: '2023-01-30T18:22:31.000+07:00',
          display_homepage: true,
          browsenodeable_id: 559,
          browsenodeable_type: 'Category',
          browse_tree: 'Shop Gifts > Gifts For Baby',
          menu_column: 0,
          menu_row: 0,
          browse_tree_ids: '.1277.1280.',
          seo_keywords: null,
          display_expert: false,
          cover_image_file_name: null,
          cover_image_content_type: null,
          cover_image_file_size: null,
          cover_image_updated_at: null,
          cover_file_name: null,
          cover_content_type: null,
          cover_file_size: null,
          cover_updated_at: null,
          icon_file_name: null,
          icon_content_type: null,
          icon_file_size: null,
          icon_updated_at: null
        }
      ],
      coins_price: null,
      delivery_time: {},
      for_redeem: false,
      is_bundle: false,
      is_individual: false,
      is_saleable: true,
      like_count: 13,
      lixibox_id: 'LX33B64FD37E',
      lixicoin_bonus: 135,
      long_description:
        '<p>Bộ sưu tập Sealove của To The Stars với họa tiết dễ thương, truyền cảm hứng từ t&igrave;nh y&ecirc;u của mẹ v&agrave; thấu hiểu những kh&aacute;t khao mong muốn đem đến che chở, an to&agrave;n cho b&eacute; y&ecirc;u. Chất liệu lu&ocirc;n được xem l&agrave; ưu ti&ecirc;n h&agrave;ng đầu của To The Stars, được l&agrave;m từ 100% sợi b&ocirc;ng cotton tự nhi&ecirc;n mềm mại, tho&aacute;ng m&aacute;t, thấm h&uacute;t mồ h&ocirc;i, co gi&atilde;n gi&uacute;p b&eacute; cử động thoải m&aacute;i kh&aacute;m ph&aacute; thế giới b&ecirc;n ngo&agrave;i, n&acirc;ng niu l&agrave;n da mỏng manh, nhạy cảm của trẻ sơ sinh. Sản phẩm đạt ti&ecirc;u chuẩn OEKO-TEX 100 - chứng chỉ quốc tế cho sản phẩm an to&agrave;n trong may mặc, ho&agrave;n to&agrave;n kh&ocirc;ng sử dụng chất huỳnh quang, formaldehyde, kim loại nặng, kh&ocirc;ng ho&aacute; chất nhuộm trong c&ocirc;ng nghiệp. Từng đường may, mũi chỉ đều được kiểm so&aacute;t chặt chẽ về chất lượng, đ&aacute;p ứng được y&ecirc;u cầu của cả những mẹ kh&oacute; t&iacute;nh v&agrave; khắt khe nhất trong việc lựa chọn đồ d&ugrave;ng cho b&eacute; y&ecirc;u của m&igrave;nh. Thiết kế một mảnh liền nhẹ nh&agrave;ng giữ ấm cho bụng v&agrave; lưng b&eacute;. Cổ &aacute;o envelope v&agrave; n&uacute;t bấm kh&ocirc;ng c&oacute; chứa nickel tại đủng quần được cải tiến, gi&uacute;p ba mẹ dễ d&agrave;ng mặc đồ v&agrave; thay bỉm cho b&eacute;.</p>\r\n',
      name: 'Set Ba Bộ Onesie To The Stars Bé Trai Newborn',
      note: null,
      number_of_products: 3,
      original_price: 450000,
      pictures: [
        {
          id: 69047,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/facebook/1644982379.jpg?v=4',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/large/1644982379.jpg?v=4',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/medium/1644982379.jpg?v=4',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/optimized/1644982379.jpg?v=4',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/original/1644982379.jpg?v=4',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/thumb/1644982379.jpg?v=4',
          url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/large/1644982379.jpg?v=4',
          width: 960
        },
        {
          id: 63751,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/facebook/1634546036.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/large/1634546036.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/medium/1634546036.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/optimized/1634546036.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/original/1634546036.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/thumb/1634546036.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/large/1634546036.jpg?v=2',
          width: 960
        },
        {
          id: 53103,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/facebook/1601524284.jpg?v=4',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/large/1601524284.jpg?v=4',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/medium/1601524284.jpg?v=4',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/optimized/1601524284.jpg?v=4',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/original/1601524284.jpg?v=4',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/thumb/1601524284.jpg?v=4',
          url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/large/1601524284.jpg?v=4',
          width: 960
        },
        {
          id: 52558,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/facebook/1599638452.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/large/1599638452.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/medium/1599638452.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/optimized/1599638452.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/original/1599638452.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/thumb/1599638452.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/large/1599638452.jpg?v=2',
          width: 960
        },
        {
          id: 52559,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/facebook/1599638471.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/large/1599638471.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/medium/1599638471.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/optimized/1599638471.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/original/1599638471.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/thumb/1599638471.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/large/1599638471.jpg?v=2',
          width: 960
        },
        {
          id: 52560,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/facebook/1599638485.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/large/1599638485.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/medium/1599638485.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/optimized/1599638485.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/original/1599638485.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/thumb/1599638485.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/large/1599638485.jpg?v=2',
          width: 960
        },
        {
          id: 52561,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/facebook/1599638500.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/large/1599638500.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/medium/1599638500.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/optimized/1599638500.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/original/1599638500.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/thumb/1599638500.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/large/1599638500.jpg?v=2',
          width: 960
        },
        {
          id: 52877,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/facebook/1600312226.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/large/1600312226.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/medium/1600312226.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/optimized/1600312226.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/original/1600312226.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/thumb/1600312226.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/large/1600312226.jpg?v=2',
          width: 960
        },
        {
          id: 52878,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/facebook/1600312239.jpg?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/large/1600312239.jpg?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/medium/1600312239.jpg?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/optimized/1600312239.jpg?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/original/1600312239.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/thumb/1600312239.jpg?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/large/1600312239.jpg?v=2',
          width: 960
        },
        {
          id: 52911,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/facebook/1600337721.png?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/large/1600337721.png?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/medium/1600337721.png?v=2',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/optimized/1600337721.png?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/original/1600337721.png?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/thumb/1600337721.png?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/large/1600337721.png?v=2',
          width: 960
        },
        {
          id: 53528,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/facebook/1603442448.jpg?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/large/1603442448.jpg?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/medium/1603442448.jpg?v=3',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/optimized/1603442448.jpg?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/original/1603442448.jpg?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/thumb/1603442448.jpg?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/large/1603442448.jpg?v=3',
          width: 960
        },
        {
          id: 53529,
          facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/facebook/1603442473.png?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/large/1603442473.png?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/medium/1603442473.png?v=3',
          optimized_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/optimized/1603442473.png?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/original/1603442473.png?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/thumb/1603442473.png?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/large/1603442473.png?v=3',
          width: 960
        }
      ],
      pictures_webp: [
        {
          id: 69047,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/069/047/facebook_webp/1644982379.webp?v=4',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/large_webp/1644982379.webp?v=4',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/medium_webp/1644982379.webp?v=4',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/069/047/optimized_webp/1644982379.webp?v=4',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/original/1644982379.jpg?v=4',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/thumb_webp/1644982379.webp?v=4',
          url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/large/1644982379.jpg?v=4',
          width: 960
        },
        {
          id: 63751,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/063/751/facebook_webp/1634546036.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/large_webp/1634546036.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/medium_webp/1634546036.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/063/751/optimized_webp/1634546036.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/original/1634546036.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/thumb_webp/1634546036.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/063/751/large/1634546036.jpg?v=2',
          width: 960
        },
        {
          id: 53103,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/053/103/facebook_webp/1601524284.webp?v=4',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/large_webp/1601524284.webp?v=4',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/medium_webp/1601524284.webp?v=4',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/053/103/optimized_webp/1601524284.webp?v=4',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/original/1601524284.jpg?v=4',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/thumb_webp/1601524284.webp?v=4',
          url: 'https://upload.lixibox.com/system/pictures/files/000/053/103/large/1601524284.jpg?v=4',
          width: 960
        },
        {
          id: 52558,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/558/facebook_webp/1599638452.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/large_webp/1599638452.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/medium_webp/1599638452.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/558/optimized_webp/1599638452.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/original/1599638452.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/thumb_webp/1599638452.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/large/1599638452.jpg?v=2',
          width: 960
        },
        {
          id: 52559,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/559/facebook_webp/1599638471.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/large_webp/1599638471.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/medium_webp/1599638471.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/559/optimized_webp/1599638471.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/original/1599638471.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/thumb_webp/1599638471.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/559/large/1599638471.jpg?v=2',
          width: 960
        },
        {
          id: 52560,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/560/facebook_webp/1599638485.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/large_webp/1599638485.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/medium_webp/1599638485.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/560/optimized_webp/1599638485.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/original/1599638485.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/thumb_webp/1599638485.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/560/large/1599638485.jpg?v=2',
          width: 960
        },
        {
          id: 52561,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/561/facebook_webp/1599638500.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/large_webp/1599638500.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/medium_webp/1599638500.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/561/optimized_webp/1599638500.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/original/1599638500.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/thumb_webp/1599638500.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/561/large/1599638500.jpg?v=2',
          width: 960
        },
        {
          id: 52877,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/877/facebook_webp/1600312226.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/large_webp/1600312226.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/medium_webp/1600312226.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/877/optimized_webp/1600312226.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/original/1600312226.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/thumb_webp/1600312226.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/877/large/1600312226.jpg?v=2',
          width: 960
        },
        {
          id: 52878,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/878/facebook_webp/1600312239.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/large_webp/1600312239.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/medium_webp/1600312239.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/878/optimized_webp/1600312239.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/original/1600312239.jpg?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/thumb_webp/1600312239.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/878/large/1600312239.jpg?v=2',
          width: 960
        },
        {
          id: 52911,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/911/facebook_webp/1600337721.webp?v=2',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/large_webp/1600337721.webp?v=2',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/medium_webp/1600337721.webp?v=2',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/052/911/optimized_webp/1600337721.webp?v=2',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/original/1600337721.png?v=2',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/thumb_webp/1600337721.webp?v=2',
          url: 'https://upload.lixibox.com/system/pictures/files/000/052/911/large/1600337721.png?v=2',
          width: 960
        },
        {
          id: 53528,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/053/528/facebook_webp/1603442448.webp?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/large_webp/1603442448.webp?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/medium_webp/1603442448.webp?v=3',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/053/528/optimized_webp/1603442448.webp?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/original/1603442448.jpg?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/thumb_webp/1603442448.webp?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/053/528/large/1603442448.jpg?v=3',
          width: 960
        },
        {
          id: 53529,
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/053/529/facebook_webp/1603442473.webp?v=3',
          first_version: false,
          height: 650,
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/large_webp/1603442473.webp?v=3',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/medium_webp/1603442473.webp?v=3',
          optimized_url:
            'https://upload.lixibox.com/system/pictures/files/000/053/529/optimized_webp/1603442473.webp?v=3',
          original_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/original/1603442473.png?v=3',
          processing: false,
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/thumb_webp/1603442473.webp?v=3',
          url: 'https://upload.lixibox.com/system/pictures/files/000/053/529/large/1603442473.png?v=3',
          width: 960
        }
      ],
      pre_order_release_date: null,
      pre_order_status: null,
      preview_picture: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/facebook/1599638452.jpg?t=1691748380',
        large_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/large/1599638452.jpg?t=1691748380',
        medium_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/medium/1599638452.jpg?t=1691748380',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/original/1599638452.jpg?t=1691748380',
        square_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/square/1599638452.jpg?t=1691748380',
        thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/052/558/thumb/1599638452.jpg?t=1691748380',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/vertical/1599638452.jpg?t=1691748380'
      },
      preview_picture_webp: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/facebook_webp/1599638452.webp?t=1691748380',
        large_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/large_webp/1599638452.webp?t=1691748380',
        medium_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/medium_webp/1599638452.webp?t=1691748380',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/original/1599638452.jpg?t=1691748380',
        square_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/square_webp/1599638452.webp?t=1691748380',
        thumb_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/thumb_webp/1599638452.webp?t=1691748380',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/052/558/vertical_webp/1599638452.webp?t=1691748380'
      },
      price: 135000,
      price_sale_off: 135000,
      primary_picture: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/facebook/1644982379.jpg?t=1691748380',
        large_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/large/1644982379.jpg?t=1691748380',
        medium_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/medium/1644982379.jpg?t=1691748380',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/original/1644982379.jpg?t=1691748380',
        square_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/square/1644982379.jpg?t=1691748380',
        thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/thumb/1644982379.jpg?t=1691748380',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/vertical/1644982379.jpg?t=1691748380'
      },
      primary_picture_webp: {
        facebook_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/facebook_webp/1644982379.webp?t=1691748380',
        large_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/large_webp/1644982379.webp?t=1691748380',
        medium_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/medium_webp/1644982379.webp?t=1691748380',
        original_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/original/1644982379.jpg?t=1691748380',
        square_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/square_webp/1644982379.webp?t=1691748380',
        thumb_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/thumb_webp/1644982379.webp?t=1691748380',
        vertical_url:
          'https://upload.lixibox.com/system/pictures/files/000/069/047/vertical_webp/1644982379.webp?t=1691748380'
      },
      rating: {
        avg_rate: 5,
        count: 3
      },
      reason_to_sell: null,
      saving_bundle_value: 0,
      short_description: 'Set Ba Bộ Onesie To The Stars Bé Trai Newborn',
      size_guides: [],
      slug: 'set-3-bodysuit-to-the-stars-be-trai-newborn',
      status: 'approved',
      stock: 10,
      store_stock: 4,
      tracking: {
        category_key: 'gifts-for-baby'
      },
      videos: []
    },
    liked: false,
    reviewed: false,
    can_review: false,
    box_variants: [
      {
        option_values: [
          {
            type: 'group',
            value_id: 38
          }
        ],
        slug: 'set-3-bodysuit-to-the-stars-be-trai-newborn'
      },
      {
        option_values: [
          {
            type: 'group',
            value_id: 39
          }
        ],
        slug: 'set-3-bodysuit-to-the-stars-be-trai-0-3m'
      },
      {
        option_values: [
          {
            type: 'group',
            value_id: 40
          }
        ],
        slug: 'set-3-bodysuit-to-the-stars-be-trai-3-6m'
      },
      {
        option_values: [
          {
            type: 'group',
            value_id: 41
          }
        ],
        slug: 'set-3-bodysuit-to-the-stars-be-trai-6-9m'
      },
      {
        option_values: [
          {
            type: 'group',
            value_id: 42
          }
        ],
        slug: 'set-3-bodysuit-to-the-stars-be-trai-9-12m'
      }
    ],
    option_types: [
      {
        name: 'group',
        presentation: 'Lựa chọn',
        values: [
          {
            color_code: null,
            color_image_url: null,
            image_url: 'https://upload.lixibox.com/system/pictures/files/000/069/047/thumb/1644982379.jpg?t=1691748380',
            name: 'Newborn',
            option_value_id: 38,
            option_value_name: 'Newborn',
            presentation: 'Newborn'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: 'https://upload.lixibox.com/system/pictures/files/000/069/045/thumb/1644982319.jpg?t=1691749417',
            name: '0-3M',
            option_value_id: 39,
            option_value_name: '0-3M',
            presentation: '0-3M'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: 'https://upload.lixibox.com/system/pictures/files/000/069/046/thumb/1644982351.jpg?t=1691565859',
            name: '3-6M',
            option_value_id: 40,
            option_value_name: '3-6M',
            presentation: '3-6M'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: 'https://upload.lixibox.com/system/pictures/files/000/069/044/thumb/1644982273.jpg?t=1691749418',
            name: '6-9M',
            option_value_id: 41,
            option_value_name: '6-9M',
            presentation: '6-9M'
          },
          {
            color_code: null,
            color_image_url: null,
            image_url: 'https://upload.lixibox.com/system/pictures/files/000/069/043/thumb/1644982217.jpg?t=1691749418',
            name: '9-12M',
            option_value_id: 42,
            option_value_name: '9-12M',
            presentation: '9-12M'
          }
        ]
      }
    ]
  }
};

const cartDetail = {
  accompanies: [],
  address: null,
  address_id: null,
  auto_add_gifts: true,
  available_payment_methods: [],
  available_shipping_packages: [],
  balance_used: 0,
  can_cod: true,
  can_select_add_on: false,
  can_select_gift: false,
  card_processor: null,
  cart_items: [],
  cod_min_price: 200000,
  contact_phone: null,
  created_at: 1684747122,
  description:
    'Nhận ngay 50.000Đ + 150 Lixicoin khi quay video "đập hộp" và đăng tải ở chế độ công khai trên TikTok. Xem chi tiết tại trang Feed Lixibox',
  discount_code: 'HEAB2302',
  discount_price: 0,
  district_id: null,
  first_name: null,
  full_address: null,
  gift_message: null,
  gift_price: 0,
  id: 18083889,
  invoice_requested: false,
  ip: null,
  is_freeship: false,
  is_gift: null,
  last_name: null,
  lixicoin_bonus: 1715,
  mobile_referral_code: null,
  note: null,
  number: null,
  payment_method: 5,
  phone: null,
  promotions_price: 0,
  province_id: null,
  referral: null,
  referral_code: null,
  services_price: 0,
  shipping_package: 'standard',
  shipping_package_name: 'Giao hàng tiêu chuẩn',
  shipping_price: 0,
  subtotal_coins: 0,
  subtotal_price: 1715000,
  total_coins: 0,
  total_price: 1715000,
  updated_at: 1684983750,
  user_id: 579663,
  ward: null,
  ward_id: null,
  warehouse_id: null
};

const cartList = [
  {
    id: 7322763,
    box: {
      brand_name: 'IMAGE Skincare',
      lixibox_id: 'LX248D9225F9',
      name: 'Kem Chống Nắng Cho Da Dầu IMAGE Skincare Prevention Daily Matte Moisturizer Spf 30 91 Gram [HSD 1/2024]',
      original_price: 1490000,
      price: 1300000,
      primary_picture: {
        facebook_url: '',
        large_url: '',
        medium_url: '',
        original_url: '',
        square_url: '',
        thumb_url: '',
        vertical_url: ''
      },
      primary_picture_webp: {
        facebook_url: '',
        large_url: '',
        medium_url: '',
        original_url: '',
        square_url: ''
      },
      short_description: 'Kem Chống Nắng Cho Da Dầu IMAGE Skincare',
      slug: 'kem-chong-nang-cho-da-dau-image-skincare-prevention-daily-matte-moisturizer-spf-30-91-gram',
      status: 'approved',
      stock: 4,
      tracking: { category_key: 'beauty-skin-care-sunscreen' }
    },
    cart_id: 18083889,
    coins: 0,
    created_at: 1684839174,
    discount_message: null,
    discount_price: 0,
    editable: true,
    is_pre_order: false,
    linked_gift_type: null,
    note: 'Chỉ còn 4 trong kho - đặt hàng sớm',
    original_price: 1490000,
    pre_order_release_date: null,
    price: 1300000,
    purchase_type: 0,
    quantity: 1,
    referrer_id: null,
    removable: true,
    updated_at: 1684839174
  }
];

const currentVariant = {
  id: 8480301,
  box: {
    id: 10577,
    brand_name: 'Lixi Baby',
    is_bundle: false,
    is_individual: true,
    is_saleable: true,
    lixibox_id: 'LXFB328307D8',
    name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
    original_price: 50000,
    price: 43000,
    primary_picture: {
      facebook_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook/1595827215.jpg?t=1690255990',
      large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/large/1595827215.jpg?t=1690255990',
      medium_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/medium/1595827215.jpg?t=1690255990',
      original_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?t=1690255990',
      square_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/square/1595827215.jpg?t=1690255990',
      thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb/1595827215.jpg?t=1690255990',
      vertical_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/vertical/1595827215.jpg?t=1690255990'
    },
    primary_picture_webp: {
      facebook_url:
        'https://upload.lixibox.com/system/pictures/files/000/051/530/facebook_webp/1595827215.webp?t=1690255990',
      large_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/large_webp/1595827215.webp?t=1690255990',
      medium_url:
        'https://upload.lixibox.com/system/pictures/files/000/051/530/medium_webp/1595827215.webp?t=1690255990',
      original_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/original/1595827215.jpg?t=1690255990',
      square_url:
        'https://upload.lixibox.com/system/pictures/files/000/051/530/square_webp/1595827215.webp?t=1690255990',
      thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/051/530/thumb_webp/1595827215.webp?t=1690255990',
      vertical_url:
        'https://upload.lixibox.com/system/pictures/files/000/051/530/vertical_webp/1595827215.webp?t=1690255990'
    },
    short_description:
      'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Dụng cụ dây đeo ti giả là một sản phẩm thiết yếu và an toàn tuyệt đối cho bé, giúp cho bé vui đùa thoải mái, giúp phụ huynh của bé không phải canh chừng sát sao vì sợ rơi làm bẩn ti giả của bé nha. Dây đeo có màu sắc đa dạng, hình ảnh ngộ nghĩnh, giúp kích thích thị giác cũng như tăng cảm giác thích thú cho bé. Cộng với đầu kẹp tiện dụng có thể gắn dây đeo nhanh vào quần áo của bé. Hệ thống móc đeo cũng tạo điều kiện giữ ti ngậm được chắc chắn hơn. Dùng được cho tất cả núm ti có vòng và không có vòng. Tránh cho ti ngậm khỏi bị bẩn hoặc bị mất, đề phòng các tác nhân bên ngoài gây hại cho bé.',
    slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
    status: 'approved',
    stock: 9,
    tracking: {
      category_key: 'shop-gifts-gifts-for-baby'
    }
  },
  cart_id: 18070258,
  coins: 0,
  created_at: 1691747848,
  discount_message: null,
  discount_price: 0,
  editable: true,
  is_pre_order: false,
  linked_gift_type: null,
  note: 'Chỉ còn 9 trong kho - đặt hàng sớm',
  original_price: 50000,
  pre_order_release_date: null,
  price: 43000,
  purchase_type: 0,
  quantity: 1,
  referrer_id: null,
  removable: true,
  updated_at: 1691747848
};

const component = (params = {}) => {
  const props = {
    cartStore: {
      isAddCartLoading: false,
      isRemoveCartLoading: false,
      updatedVariantQuantity: 4,
      cartDetail,
      cartList
    },
    box: box2,
    currentVariant,
    getProductDetailAction: jest.fn(),
    addItemToCartAction: jest.fn(),
    removeItemFromCartAction: jest.fn()
  };

  return <VariantsSelector {...Object.assign({}, props, params)} />;
};

describe('VariantSelector', () => {
  test('renders', () => {
    expect(() => {
      reduxRender(component(), {
        initialState: {
          shop: {
            productDetail
          }
        }
      });
    }).not.toThrow();
  });
  test('set localStorage key', () => {
    reduxRender(component(), {
      initialState: {
        shop: {
          productDetail
        }
      }
    });

    if (localStorage.getItem(storageKey.HAS_VIEW_PRODUCT_VARIANT) !== 'true') {
      expect(localStorage.getItem(storageKey.HAS_VIEW_PRODUCT_VARIANT)).toEqual(null);
    } else {
      expect(localStorage.getItem(storageKey.HAS_VIEW_PRODUCT_VARIANT)).toEqual('true');
    }
  });
  test('return null', () => {
    reduxRender(component(), {
      initialState: {
        shop: {
          productDetail: {}
        }
      }
    });
    const container = document.getElementsByClassName('variants-selector')[0];
    expect(container).not.toBeDefined();
  });
});
