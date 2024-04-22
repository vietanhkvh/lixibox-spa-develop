jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import List from '..';
const list = [
  {
    id: 2773493,
    box: {
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
    },
    cart_id: 9999204,
    coins: 0,
    created_at: 1611820861,
    discount_message: null,
    discount_price: 0,
    editable: true,
    is_pre_order: false,
    linked_gift_type: null,
    note: '',
    original_price: 600000,
    pre_order_release_date: null,
    price: 449000,
    purchase_type: 0,
    quantity: 1,
    referrer_id: null,
    removable: true,
    updated_at: 1611820861
  }
];

const userInfo = {
  id: 526882,
  address: '54',
  addresses: [
    {
      id: 942960,
      address: '431',
      created_at: 1665397899,
      district_id: 5,
      district_name: 'Cầu Giấy',
      first_name: 'Anh',
      full_address: 'acbdsfdsf, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành Phố Hà Nội',
      full_name: 'Trần Hoàng Tố Anh',
      is_primary_address: false,
      is_usable: true,
      last_name: 'Trần Hoàng Tố',
      phone: '0823808221',
      province_id: 1,
      province_name: 'Hà Nội',
      ward: {
        id: 59,
        district_id: 5,
        full_name: 'Phường Dịch Vọng Hậu',
        name: 'Dịch Vọng Hậu',
        unit: 'Phường'
      },
      ward_id: 59,
      ward_name: 'Dịch Vọng Hậu'
    },
    {
      id: 942972,
      address: '865',
      created_at: 1665399841,
      district_id: 679,
      district_name: 'Di Linh',
      first_name: 'Fs',
      full_address: 'hfghfghfg, Xã Gung Ré, Huyện Di Linh, Tỉnh Lâm Đồng',
      full_name: 'Thị Uyên Minh Fs',
      is_primary_address: true,
      is_usable: true,
      last_name: 'Thị Uyên Minh',
      phone: '0825067506',
      province_id: 68,
      province_name: 'Lâm Đồng',
      ward: {
        id: 8501,
        district_id: 679,
        full_name: 'Xã Gung Ré',
        name: 'Gung Ré',
        unit: 'Xã'
      },
      ward_id: 8501,
      ward_name: 'Gung Ré'
    },
    {
      id: 942973,
      address: '749',
      created_at: 1665399854,
      district_id: 755,
      district_name: 'đảo Côn Đảo',
      first_name: 'dgd',
      full_address: 'gdfhfhfg, Đảo Côn Đảo, Huyện đảo Côn Đảo, Tỉnh Bà Rịa - Vũng Tàu',
      full_name: 'Đặng Minh Thư Dgd',
      is_primary_address: false,
      is_usable: true,
      last_name: 'Đặng Minh Thư',
      phone: '0827242038',
      province_id: 77,
      province_name: 'Bà Rịa - Vũng Tàu',
      ward: {
        id: 11148,
        district_id: 755,
        full_name: 'Đảo Côn Đảo',
        name: 'Côn Đảo',
        unit: 'Đảo'
      },
      ward_id: 11148,
      ward_name: 'Côn Đảo'
    }
  ],
  avatar: {
    large_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/526/882/large/1685416495.jpeg',
    medium_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/526/882/medium/1685416495.jpeg',
    original_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/526/882/original/1685416495.jpeg',
    thumb_url:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/526/882/thumb/1685416495.jpeg'
  },
  balance: 0,
  birthday: Date.now() / 1000,
  coins: 0,
  created_at: 1651025422,
  discount_code_ids: [],
  district_id: 755,
  earned_coins: 0,
  email: 'louis.vu@lixibox.com',
  email_update_required: false,
  email_verified: true,
  expert_slug: null,
  first_name: 'anh',
  full_address: 'gdfhfhfg, Đảo Côn Đảo, Huyện đảo Côn Đảo, Tỉnh Bà Rịa - Vũng Tàu',
  gender: 1,
  is_admin: true,
  is_expert: false,
  last_name: 'Vu Khoi',
  membership_level: 0,
  membership_level_started_at: 0,
  mobile_referral_code: 'LOUISAA4C',
  name: 'Vu Khoi Anh',
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
      count: 0
    },
    {
      statuses: ['cancelled'],
      title: 'Đã huỷ',
      count: 14
    }
  ],
  orders_count: 14,
  phone: '0823755356',
  phone_verified: false,
  province_id: 77,
  referral_code: 'LOUISF4DC59',
  social_accounts: [
    {
      email: 'louis.vu@lixibox.com',
      provider: 'google'
    },
    {
      email: 'louis.vu@lixibox.com',
      provider: 'apple'
    }
  ],
  store_orders_count: 0,
  uuid: 'd9e004fa-5c4e-4b7f-8060-e664569527bf',
  ward_id: 11148
};

const compactView = false;
const confirmationType = 'popup' as const;

const component = (params = {}) => {
  const props = {
    list: [],
    compactView,
    confirmationType
  };

  return <List {...Object.assign({}, props, params)} />;
};

describe('List', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`renders overlay popup`, () => {
    reduxRender(component({ list }), { initialState: {} });
    const overlay = document.getElementsByClassName('confirmationOverlay')[0];
    expect(overlay).toBeInTheDocument();
  });

  test(`renders message empty cart`, () => {
    reduxRender(component(), { initialState: {} });
    const messageInfo = document.getElementsByClassName('info')[0];

    expect(messageInfo).toBeInTheDocument();
    expect(messageInfo).toHaveTextContent('Hãy quay lại và chọn cho mình sản phẩm yêu thích bạn nhé');
  });

  test(`renders message empty cart with birthday`, () => {
    reduxRender(component({ userInfo }), { initialState: {} });
    const messageInfo = document.getElementsByClassName('info')[0];

    expect(messageInfo).toBeInTheDocument();
    expect(messageInfo).toHaveTextContent(
      '*1 đơn nữa thôi là bạn có thể thăng hạng lên thành viên Bạc và nhận nhiều đặc quyền: quà sinh nhật, hỗ trợ phí ship,...'
    );
  });
});
