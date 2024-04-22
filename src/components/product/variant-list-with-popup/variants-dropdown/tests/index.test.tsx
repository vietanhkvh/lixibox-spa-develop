jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import VariantsDropdown from '../component';

const optionTypes = [
  {
    name: 'group',
    presentation: 'Lựa chọn',
    values: [
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/804/thumb/1614573826.png?t=1623989410',
        name: 'Enif - Mira',
        option_value_id: 62,
        option_value_name: 'Enif - Mira',
        presentation: 'Enif - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/801/thumb/1614573571.png?t=1623992782',
        name: 'Enif - Electra',
        option_value_id: 63,
        option_value_name: 'Enif - Electra',
        presentation: 'Enif - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/803/thumb/1614573777.png?t=1623979172',
        name: 'Enif - Rana',
        option_value_id: 64,
        option_value_name: 'Enif - Rana',
        presentation: 'Enif - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/802/thumb/1614573588.png?t=1623989407',
        name: 'Enif - Capella',
        option_value_id: 65,
        option_value_name: 'Enif - Capella',
        presentation: 'Enif - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/825/thumb/1614574546.png?t=1623989407',
        name: 'Enif - Izar',
        option_value_id: 66,
        option_value_name: 'Enif - Izar',
        presentation: 'Enif - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/786/thumb/1614572718.png?t=1623993913',
        name: 'Vinde - Izar',
        option_value_id: 90,
        option_value_name: 'Vinde - Izar',
        presentation: 'Vinde - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/823/thumb/1614574499.png?t=1623993913',
        name: 'Vinde - Rana',
        option_value_id: 91,
        option_value_name: 'Vinde - Rana',
        presentation: 'Vinde - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/785/thumb/1614572690.png?t=1623993912',
        name: 'Vinde - Capella',
        option_value_id: 92,
        option_value_name: 'Vinde - Capella',
        presentation: 'Vinde - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/784/thumb/1614572669.png?t=1623993911',
        name: 'Vinde - Electra',
        option_value_id: 93,
        option_value_name: 'Vinde - Electra',
        presentation: 'Vinde - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/793/thumb/1614573175.png?t=1623993913',
        name: 'Vinde - Mira',
        option_value_id: 94,
        option_value_name: 'Vinde - Mira',
        presentation: 'Vinde - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/822/thumb/1614574476.png?t=1623993197',
        name: 'Larawag - Capella',
        option_value_id: 95,
        option_value_name: 'Larawag - Capella',
        presentation: 'Larawag - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/771/thumb/1614566738.png?t=1623993197',
        name: 'Larawag - Izar',
        option_value_id: 96,
        option_value_name: 'Larawag - Izar',
        presentation: 'Larawag - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/770/thumb/1614566705.png?t=1623993198',
        name: 'Larawag - Mira',
        option_value_id: 97,
        option_value_name: 'Larawag - Mira',
        presentation: 'Larawag - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/769/thumb/1614566679.png?t=1623993199',
        name: 'Larawag - Rana',
        option_value_id: 98,
        option_value_name: 'Larawag - Rana',
        presentation: 'Larawag - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/768/thumb/1614566654.png?t=1623993199',
        name: 'Larawag - Electra',
        option_value_id: 99,
        option_value_name: 'Larawag - Electra',
        presentation: 'Larawag - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/821/thumb/1614574446.png?t=1623991317',
        name: 'Omga - Electra',
        option_value_id: 100,
        option_value_name: 'Omga - Electra',
        presentation: 'Omga - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/767/thumb/1614566581.png?t=1623991318',
        name: 'Omga - Izar',
        option_value_id: 101,
        option_value_name: 'Omga - Izar',
        presentation: 'Omga - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/766/thumb/1614566542.png?t=1623991319',
        name: 'Omga - Mira',
        option_value_id: 102,
        option_value_name: 'Omga - Mira',
        presentation: 'Omga - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/765/thumb/1614566530.png?t=1623991319',
        name: 'Omga - Rana',
        option_value_id: 103,
        option_value_name: 'Omga - Rana',
        presentation: 'Omga - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/764/thumb/1614566511.png?t=1623991319',
        name: 'Omga - Capella',
        option_value_id: 104,
        option_value_name: 'Omga - Capella',
        presentation: 'Omga - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/799/thumb/1614573484.png?t=1623994547',
        name: 'Regulus - Rana',
        option_value_id: 105,
        option_value_name: 'Regulus - Rana',
        presentation: 'Regulus - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/824/thumb/1614574521.png?t=1623994547',
        name: 'Regulus - Mira',
        option_value_id: 106,
        option_value_name: 'Regulus - Mira',
        presentation: 'Regulus - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/800/thumb/1614573499.png?t=1623994547',
        name: 'Regulus - Izar',
        option_value_id: 107,
        option_value_name: 'Regulus - Izar',
        presentation: 'Regulus - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/798/thumb/1614573463.png?t=1623994547',
        name: 'Regulus - Capella',
        option_value_id: 108,
        option_value_name: 'Regulus - Capella',
        presentation: 'Regulus - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/797/thumb/1614573443.png?t=1623994547',
        name: 'Regulus - Electra',
        option_value_id: 109,
        option_value_name: 'Regulus - Electra',
        presentation: 'Regulus - Electra'
      }
    ]
  }
];
const boxVariants = [
  {
    option_values: [
      {
        type: 'group',
        value_id: 66
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-enif-izar'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 106
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-mira'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 91
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-vinde-rana'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 95
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-larawag-capella'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 100
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-omga-electra'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 62
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-enif-mira'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 64
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-enif-rana'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 65
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-enif-capella'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 63
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-enif-electra'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 107
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-izar'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 105
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-rana'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 108
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-capella'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 109
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-regulus-electra'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 90
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-vinde-izar'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 94
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-vinde-mira'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 92
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-vinde-capella'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 93
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-vinde-electra'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 96
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-larawag-izar'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 97
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-larawag-mira'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 98
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-larawag-rana'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 99
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-larawag-electra'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 101
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-omga-izar'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 102
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-omga-mira'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 103
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-omga-rana'
  },
  {
    option_values: [
      {
        type: 'group',
        value_id: 104
      }
    ],
    slug: 'combo-son-thoi-min-li-lustre-ultra-slim-matte-lipstick-va-loi-thay-the-omga-capella'
  }
];
const productBox = {
  id: 10173,
  brand_name: 'Chacott',
  is_individual: true,
  is_saleable: true,
  name: 'Nước Tẩy Trang Chuyên Dụng Chacott for Professionals Cleansing Water 500ml',
  original_price: 600000,
  price: 449000,
  primary_picture: {
    facebook_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/facebook/1604984437.jpg?t=1612338294',
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/large/1604984437.jpg?t=1612338294',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/medium/1604984437.jpg?t=1612338294',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/original/1604984437.jpg?t=1612338294',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/053/731/thumb/1604984437.jpg?t=1612338294'
  },
  short_description:
    'Nước tẩy trang CHACOTT for Professionals là nước tẩy trang dành cho da nhạy cảm và da mụn, cực kỳ dịu nhẹ và không gây kích ứng. - Sản phẩm cực kỳ dịu nhẹ nhưng dễ dàng loại bỏ những lớp make up nặng đô và gan lì nhất nhớ chứa phân tử nước siêu vi RO – được nghiên cứu và phát triển bởi cơ quan hàng không vũ trụ Mỹ NASA. Công nghệ RO hiện nay là công nghệ lọc nước tiên tiến nhất, những phân tử nước lọc qua công nghệ này nhỏ hơn 500.000 lần so với sợi tóc con người, có thể len sâu và làm sạch kể cả những vùng dưới sâu bề mặt da. - Không chỉ thế, với thành phần chủ yếu là chiết xuất thực vật và chứa nhiều chất dưỡng ẩm tự nhiên cho da. - Chiết xuất cây hương thảo có tác dụng kháng khuẩn và chống kích ứng da, làm dịu các vết thương do mụn gây ra. Bên cạnh đó, hương thảo còn có khả năng chống oxi hóa tuyệt vời, giúp bạn chống lại những dấu hiệu của lão hóa đó nha. - Chiết xuất từ hoa cúc La Mã có chứa rất nhiều vitamin B giúp làm dịu da và giữ ẩm hiệu quả. - Chiết xuất từ nha đam chiết xuất từ nha đam có tác dụng dưỡng ẩm. Hỗ trợ cho da bạn luôn mịn màng và tránh được tình trạng khô da khi tẩy trang. CÔNG DỤNG: - Chacott có thể dùng như 1 loại toner/essence và hoàn toàn không cần phải rửa lại với nước hay sữa rửa mặt. - Loại sạch bụi bẩn như một loại sửa rửa mặt chuyên dụng. - Đánh bay lớp trang điểm chai lì nhất. - An toàn trên da nhạy cảm và da mụn. - Làm sạch và se khít từng lỗ chân lông. - Dùng ngay các bước skincare ngay sau đó. - Dịu nhẹ làn da và dưỡng ẩm tối ưu. - Thích hợp cho cả mắt và mi mắt. * Được nhập khẩu và phân phối chính hãng bởi Lixibox',
  slug: 'chacott-for-professionals-cleansing-water-500ml',
  status: 'approved'
};

const component = (params = {}) => {
  const props = {
    onSelect: jest.fn(),
    optionTypes,
    selectedVariants: boxVariants[0].option_values,
    product: productBox,
    onSelected: jest.fn()
  };

  return <VariantsDropdown {...Object.assign({}, props, params)} />;
};

describe('VariantsDropdown', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
