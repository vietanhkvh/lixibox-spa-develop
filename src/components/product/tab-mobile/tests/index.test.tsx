import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { TAB_INFO_STATUS } from '../../../../constants/application/product';
import ProductTabMobile from '..';

const product = {
  success: true,
  box: {
    id: 3244,
    added_to_waitlist: false,
    avg_rate: 4.42966,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    box_products: [
      {
        id: 4648,
        box_id: 3244,
        expert_description:
          '- Chì kẻ mắt của Lustre với đầu bút sáp mềm, dễ dàng trượt lên da cho đường kẻ mắt rõ nét và tự nhiên. \r\n- Với các tông màu tưởng chừng khó sử dụng nhất nhưng lại là bí quyết tạo nên make up look độc đáo cho buổi party. \r\n- Ngoài tinh dầu Jojoba nuôi dưỡng mi, chất chì của Lustre rất mềm và dễ kẻ. Đặc biệt, Lustre có cả đầu chuốt đi kèm rất tiện dụng',
        product: {
          id: 3492,
          brand: {
            id: 416,
            brand_image_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/416/original/lustre.png',
            description:
              'Thương hiệu LUSTRE MAKEUP được thành lập với sứ mệnh tạo nên sự thay đổi trong thị trường mỹ phẩm cao cấp. Chúng tôi tự hào khi được đem đến cho bạn những sản phẩm đáng mong đợi nhất, chất lượng nhất với giá cả hợp lý. Kim chỉ nam của LUSTRE MAKEUP đó là trang điểm phải tôn vinh được nét đẹp của mỗi cá nhân, chúng tôi muốn bạn tự tin với chính vẻ ngoài của mình, dù có hay không có lớp trang điểm.',
            name: 'LUSTRE MAKEUP',
            slug: 'lustre'
          },
          capacity: '0.34 gr',
          country: 'United States',
          description:
            '- Chì kẻ mắt của Lustre với đầu bút sáp mềm, dễ dàng trượt lên da cho đường kẻ mắt rõ nét và tự nhiên. \r\n- Với các tông màu tưởng chừng khó sử dụng nhất nhưng lại là bí quyết tạo nên make up look độc đáo cho buổi party. \r\n- Ngoài tinh dầu Jojoba nuôi dưỡng mi, chất chì của Lustre rất mềm và dễ kẻ. Đặc biệt, Lustre có cả đầu chuốt đi kèm rất tiện dụng',
          display_name: 'Chì kẻ mắt dạng sáp lâu trôi Lustre Ultimate Eyeliner Professional Line - Dark Matte Plum',
          individual_box_slug: 'lustre-ultimate-eyeliner-professional-line-dark-matte-plum',
          ingredients:
            'Trimethylsiloxysilicate, Cyclomethicone, Cyclopentasiloxane, Carmine, Ceresin, Polyethylene, Titanium Dioxide, Iron Oxides(CI 77499), Manganese Violet, Cyclohexasiloxane, DI-PPG-3 Myristyl Ether Adipate, Euphorbia Cerifera (Candelilla) Wax, Phenyl Trimethicone, Ferric Ferrocyanide, Acetylated Sucrose Distearate, Disteardimonium Hectorite, Phenoxyethanol, Lysolecithin, Simmondsia Chinensis (Jojoba) Seed Oil, Persea Gratissima (Avocado) Oil, Propylene Carbonate',
          made_in_country: 'South Korea',
          name: 'Chì kẻ mắt Lustre Ultimate Eyeliner Professional Line - Dark Matte Plum',
          original_price: 260000,
          price: 149000,
          primary_picture: {
            facebook_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/facebook/1502421179.jpg?t=1602283712',
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/large/1502421179.jpg?t=1602283712',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/medium/1502421179.jpg?t=1602283712',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/original/1502421179.jpg?t=1602283712',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/thumb/1502421179.jpg?t=1602283712'
          },
          saleable: true,
          slug: 'chi-ke-mat-lustre-ultimate-eyeliner-professional-line-dark-matte-plum',
          usage:
            'Bước 1: Bạn kẻ một đường từ giữa mắt đến đuôi mắt.\r\n\r\nBước 2: Kẻ thêm một đường từ khóe mắt nối với đường ban đầu. Bước này giúp mắt bạn to tròn hơn.\r\n\r\nBước 3: Kẻ vành trong của mắt. Bước này sẽ tạo hiệu ứng giúp lông mi dày hơn. Bạn đưa chì xuống phần vành trong của mắt và kẻ một đường chạy từ đầu mi mắt tới đuôi mi mắt. Tuy nhiên với những bạn có cặp mắt hơi nhỏ thì không nên áp dụng bước này vì nó có thể làm cho mắt bạn nhỏ hơn nữa.\r\n\r\nBước 4: Kẻ đường cánh. Bước này giúp bạn tạo điểm nhấn ở đuôi mắt. Từ đuôi mắt chúng ta kẻ một đường xéo đi lên. Bạn cũng có thể đi theo đường viền dưới. Mắt bạn sẽ có nét nữ tính, điệu đà và gợi cảm.\r\n\r\nBước 5: Kiểu chiếc lá. Từ đuôi cánh kẻ 1 đường nối liền với giữa mắt. Kiểu chiếc lá này rất thông dụng và thích hợp với nhiều loại mắt khác nhau.\r\n\r\nBước 6: Đường kẻ đôi. Ban kẻ đường đối xứng với chiếc lá tạo một chút tinh nghịch và sáng tạo cho đôi mắt, đôi mắt trong cũng rất dễ thương. Bước này dành cho bạn nào muốn thể hiện cá tính và tạo sự khác biệt.',
          usage_duration: null,
          wholesale_price: null
        },
        product_id: 3492,
        quantity: 1
      }
    ],
    brand_name: 'LUSTRE MAKEUP',
    coins_price: 0,
    delivery_time: {},
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 43,
    lixicoin_bonus: 149,
    long_description:
      '- Chì kẻ mắt của Lustre với đầu bút sáp mềm, dễ dàng trượt lên da cho đường kẻ mắt rõ nét và tự nhiên. \r\n- Với các tông màu tưởng chừng khó sử dụng nhất nhưng lại là bí quyết tạo nên make up look độc đáo cho buổi party. \r\n- Ngoài tinh dầu Jojoba nuôi dưỡng mi, chất chì của Lustre rất mềm và dễ kẻ. Đặc biệt, Lustre có cả đầu chuốt đi kèm rất tiện dụng',
    name: 'Chì kẻ mắt dạng sáp lâu trôi Lustre Ultimate Eyeliner Professional Line - Dark Matte Plum',
    note: null,
    number_of_products: 1,
    original_price: 260000,
    pictures: [
      {
        id: 23634,
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/facebook/1502421179.jpg?v=3',
        first_version: false,
        height: 650,
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/large/1502421179.jpg?v=3',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/medium/1502421179.jpg?v=3',
        optimized_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/optimized/1502421179.jpg?v=3',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/original/1502421179.jpg?v=3',
        processing: false,
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/thumb/1502421179.jpg?v=3',
        url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/large/1502421179.jpg?v=3',
        width: 960
      },
      {
        id: 23632,
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/632/facebook/1502420976.jpg?v=3',
        first_version: false,
        height: 650,
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/632/large/1502420976.jpg?v=3',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/632/medium/1502420976.jpg?v=3',
        optimized_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/632/optimized/1502420976.jpg?v=3',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/632/original/1502420976.jpg?v=3',
        processing: false,
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/632/thumb/1502420976.jpg?v=3',
        url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/632/large/1502420976.jpg?v=3',
        width: 960
      },
      {
        id: 23633,
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/633/facebook/1502421046.jpg?v=3',
        first_version: false,
        height: 650,
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/633/large/1502421046.jpg?v=3',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/633/medium/1502421046.jpg?v=3',
        optimized_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/633/optimized/1502421046.jpg?v=3',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/633/original/1502421046.jpg?v=3',
        processing: false,
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/633/thumb/1502421046.jpg?v=3',
        url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/633/large/1502421046.jpg?v=3',
        width: 960
      },
      {
        id: 37166,
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/166/facebook/1543897109.jpg?v=1',
        first_version: false,
        height: 650,
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/166/large/1543897109.jpg?v=1',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/166/medium/1543897109.jpg?v=1',
        optimized_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/166/optimized/1543897109.jpg?v=1',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/166/original/1543897109.jpg?v=1',
        processing: false,
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/166/thumb/1543897109.jpg?v=1',
        url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/037/166/large/1543897109.jpg?v=1',
        width: 960
      }
    ],
    pre_order_release_date: null,
    pre_order_status: null,
    price: 149000,
    price_sale_off: 149000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/facebook/1502421179.jpg?t=1612082684',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/large/1502421179.jpg?t=1612082684',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/medium/1502421179.jpg?t=1612082684',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/original/1502421179.jpg?t=1612082684',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/thumb/1502421179.jpg?t=1612082684'
    },
    rating: {
      avg_rate: 4.4,
      count: 526
    },
    reason_to_sell: null,
    saving_bundle_value: 540000,
    short_description:
      '- Chì kẻ mắt của Lustre với đầu bút sáp mềm, dễ dàng trượt lên da cho đường kẻ mắt rõ nét và tự nhiên. - Với các tông màu tưởng chừng khó sử dụng nhất nhưng lại là bí quyết tạo nên make up look độc đáo cho buổi party. - Ngoài tinh dầu Jojoba nuôi dưỡng mi, chất chì của Lustre rất mềm và dễ kẻ. Đặc biệt, Lustre có cả đầu chuốt đi kèm rất tiện dụng',
    size_guides: [],
    slug: 'lustre-ultimate-eyeliner-professional-line-dark-matte-plum',
    status: 'approved',
    stock: 10,
    variant_options: [
      {
        box_id: 3244,
        box_slug: 'lustre-ultimate-eyeliner-professional-line-dark-matte-plum',
        name: 'Dark Matte Plum',
        presentation: 'Dark Matte Plum',
        color_code: '#40243B',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/thumb/1502421179.jpg?t=1612082684'
      },
      {
        box_id: 3242,
        box_slug: 'lustre-ultimate-eyeliner-professional-line-brown-champagne',
        name: 'Brown Champagne',
        presentation: 'Francesca',
        color_code: '#6E2826',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/629/thumb/1502363796.jpg?t=1612082684'
      },
      {
        box_id: 3243,
        box_slug: 'lustre-ultimate-eyeliner-professional-line-deep-green-metallic',
        name: '',
        presentation: 'Deep Green Metallic',
        color_code: '#23371E',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/639/thumb/1502428620.jpg?t=1612082684'
      }
    ],
    variants: {
      colors: [
        {
          box_id: 3244,
          box_slug: 'lustre-ultimate-eyeliner-professional-line-dark-matte-plum',
          name: 'Dark Matte Plum',
          presentation: 'Dark Matte Plum',
          color_code: '#40243B',
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/634/thumb/1502421179.jpg?t=1612082684'
        },
        {
          box_id: 3242,
          box_slug: 'lustre-ultimate-eyeliner-professional-line-brown-champagne',
          name: 'Brown Champagne',
          presentation: 'Francesca',
          color_code: '#6E2826',
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/629/thumb/1502363796.jpg?t=1612082684'
        },
        {
          box_id: 3243,
          box_slug: 'lustre-ultimate-eyeliner-professional-line-deep-green-metallic',
          name: '',
          presentation: 'Deep Green Metallic',
          color_code: '#23371E',
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/023/639/thumb/1502428620.jpg?t=1612082684'
        }
      ]
    },
    videos: [
      {
        id: 62,
        created_at: 1547176685,
        thumb:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/videos/thumbs/000/000/062/original/1547176685.jpg',
        url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/videos/files/000/000/062/original/Eyeliner_3_m%C3%A0u-_final.mp4'
      }
    ]
  },
  liked: false,
  reviewed: false,
  can_review: false,
  box_variants: [
    {
      option_values: [
        {
          type: 'color',
          value_id: 101
        }
      ],
      slug: 'lustre-ultimate-eyeliner-professional-line-dark-matte-plum'
    },
    {
      option_values: [
        {
          type: 'color',
          value_id: 10
        }
      ],
      slug: 'lustre-ultimate-eyeliner-professional-line-brown-champagne'
    },
    {
      option_values: [
        {
          type: 'color',
          value_id: 102
        }
      ],
      slug: 'lustre-ultimate-eyeliner-professional-line-deep-green-metallic'
    }
  ],
  option_types: [
    {
      name: 'color',
      presentation: 'Màu sắc',
      values: [
        {
          color_code: '#40243B',
          color_image_url: null,
          image_url: null,
          name: 'Dark Matte Plum',
          option_value_id: 101,
          option_value_name: 'Dark Matte Plum',
          presentation: 'Dark Matte Plum'
        },
        {
          color_code: '#6E2826',
          color_image_url: null,
          image_url: null,
          name: 'Francesca',
          option_value_id: 10,
          option_value_name: 'Brown Champagne',
          presentation: 'Brown Champagne'
        },
        {
          color_code: '#23371E',
          color_image_url: null,
          image_url: null,
          name: 'Deep Green Metallic',
          option_value_id: 102,
          option_value_name: '',
          presentation: 'Deep Green Metallic'
        }
      ]
    }
  ]
};
const component = (params = {}) => {
  const props = {
    data: product.box.box_products,
    title: 'Test Title',
    type: TAB_INFO_STATUS.usage,
    isIndividual: product.box.is_individual,
    idProduct: product.box.slug
  };

  return withRouter((routerProps) => <ProductTabMobile {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductTabMobile', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
