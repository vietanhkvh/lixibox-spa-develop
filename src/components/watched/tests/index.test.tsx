jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reduxRender } from '../../../utils/test-utils';
import Watched from '..';

const recentlyViewedBoxes = [
  {
    id: 6054,
    added_to_waitlist: false,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Senka',
    coins_price: 0,
    discount_percent: 23,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 87,
    lixicoin_bonus: 99,
    name: 'Sữa Rửa Mặt Senka Perfect Whip 120gr',
    original_price: 130000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 99000,
    price_sale_off: 99000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/facebook/1511774982.jpg?t=1612082701',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/large/1511774982.jpg?t=1612082701',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/medium/1511774982.jpg?t=1612082701',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/original/1511774982.jpg?t=1612082701',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/thumb/1511774982.jpg?t=1612082701'
    },
    rating: {
      avg_rate: 4.5,
      count: 91
    },
    short_description:
      'Senka là một nhãn hiệu chăm sóc da thuộc Shiseido - tập đoàn mỹ phẩm đến từ Nhật Bản có bề dày lịch sử phong phú và đặc sắc trong hơn 140 năm. Ra mắt năm 2002 tại Nhật Bản, thừa hưởng những kinh nghiệm và ứng dụng tiên tiến của tập đoàn mỹ phẩm hàng đầu thế giới trong suốt 140 năm qua, Senka nhanh chóng trở thành nhãn hiệu được yêu thích hàng đầu Nhật Bản. Từ khi ra mắt, Senka luôn mang đến những sản phẩm chất lượng tốt nhất với giá thành hợp lý mà bất cứ người phụ nữ nào cũng có thể chi trả. Senka không ngừng cải tiến để cho ra đời những sản phẩm chăm sóc tốt nhất cho cả làn da và tâm hồn người phụ nữ. Senka Perfect Whip là sản phẩm sữa rửa mặt của hãng mỹ phẩm nổi tiếng Shiseido được ưa chuộng tại Nhật Bản bởi công dụng tuyệt vời mà sản phẩm mang lại. Nếu bạn đang muốn tìm một loại sữa rửa mặt tạo bọt giúp tẩy trang và làm sạch mặt mà không gây khô da thì sữa rửa mặt Senka Perfect Whip Foam chính là sản phẩm mà bạn nên chọn. Công dụng: - Công nghệ Giữ ẩm độc quyền “Aqua in Pool” được sáng chế bởi tập đoàn Shiseido, công nghệ làm sạch chọn lọc giúp lấy đi bụi bẩn và bã nhờn nhưng vẫn giữ lại độ ẩm tự nhiên của da. Bên cạnh đó, tăng cường hiệu quả của các thành phần dưỡng ẩm khác, da sạch nhưng không hề khô căng, mà ẩm mịn tự nhiên - Chiết xuất từ phức hợp tinh chất tơ tằm thiên nhiên và gấp đôi Hyaluronic acid giúp da ẩm mịn và mềm mượt. Sericin có khả năng tương thích cao với làn da, sericin có thể hình thành một màng bảo vệ, phát huy tối đa tác dụng dưỡng ẩm, giúp giữ kết cấu da mềm mịn. Hydrolyzed silk, lớp sừng có tác dụng bảo vệ da khỏi các tác động bên ngoài. Hydrolyzed silk có khả năng thúc đẩy sự phục hồi của lớp sừng như hàng rào bảo vệ da. - Sản phẩm với bọt dày và mịn có khả năng tiếp cận và lấy đi bụi bẩn và bã nhờn nằm sâu trong lỗ chân lông. - Lớp bọt dày, vẫn tiếp tục duy trì trong suốt thời gian rửa mặt. - Làn da được làm sạch một cách nhẹ nhàng và thư giãn trong lớp bọt xốp dày và trắng mịn.',
    slug: 'senka-perfect-whip-120gr',
    stock: 10,
    variant_options: [],
    variants: {
      colors: []
    }
  },
  {
    id: 10852,
    added_to_waitlist: false,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'UNIMOM',
    coins_price: null,
    discount_percent: 5,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 1,
    lixicoin_bonus: 2736,
    name: 'UNIMOM - Máy hút sữa điện đôi Minuet có màn hình LCD (Có Pin xạc kèm adapter)',
    original_price: 2880000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 2736000,
    price_sale_off: 2736000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/012/facebook/1590816156.jpg?t=1612082710',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/012/large/1590816156.jpg?t=1612082710',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/012/medium/1590816156.jpg?t=1612082710',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/012/original/1590816156.jpg?t=1612082710',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/050/012/thumb/1590816156.jpg?t=1612082710'
    },
    rating: {
      avg_rate: 0,
      count: 0
    },
    short_description:
      'UNIMOM - Máy hút sữa điện đôi Minuet có màn hình LCD (Có Pin xạc kèm adapter) - Thiết kế nhỏ gọn, sáng tạo này cung cấp hiệu suất mạnh mẽ, thể hiện gấp đôi. Nó có 7 cấp độ chế độ massage và 9 cấp độ chế độ thể hiện để giúp việc bơm thoải mái và hiệu quả hơn. Với pin sạc bên trong và hệ thống bảo vệ dòng chảy ngược được cải tiến, đóng hoàn toàn mới, hợp vệ sinh, Minuet đang có xu hướng với màn hình LCD thông tin và cổng sạc USB sử dụng tiện lợi ở văn phòng, mọi lúc và mọi nơi. Đặc điểm nổi bật - Máy hút sữa điện đôi Unimom Minuet LCD có pin sạc UM872019 có chế độ hút đơn và hút đôi tùy chọn thông qua 1 ống nối khí chữ T - Có thể sạc pin bằng đầu cắm điện USB, không cần bộ đổi nguồn, các sản phẩm của Unimom chỉ cần dùng loại dây cáp USB thông thường, vô cùng tiện lợi cho các mẹ. - Nhiều cấp độ điều chỉnh: Nút mát xa riêng biệt cho phép dễ dàng chuyển đổi giữa các cấp độ mát xa/hút. - Chức năng mát xa ngực vô cùng độc đáo: Thiết kế thông minh với các “quả bóng” lớn ở miệng vòi hút sẽ tự động mát xa ngực cho mẹ trong quá trình hút sữa. - Chức năng xoay 360 độ: Khớp xoay 360 độ giúp cho ống khí không bị gập và lực hút chân không của máy không bị giảm. - Máy chạy êm và có thể mang theo khi di chuyển: Bộ phận hút với trọng lượng nhẹ và chạy rất êm giúp bạn có thể kín đáo vắt sữa khi phải di chuyển. - Màn hình LCD hiển thị: Các cấp độ mát xa/hút của máy được hiển thị trên màn hình LCD với thiết kế đẹp mắt. - Máy hút sữa điện đôi Minuet LCD có 7 cấp độ mát xa và 9 cấp độ hút: cho phép mẹ có thể tùy ý điều chỉnh lực hút/chu trình hút của máy theo ý muốn. - Máy hút sữa điện đôi Minuet LCD, có pin sạc và adapter kèm theo máy. Thông số kỹ thuật của sản phẩm - Trọng lượng (cả hộp): 840g - Lực hút: 0 - 240 mmHg - Nguồn điện đầu vào: 100-240V, 50-60Hz - Nguồn điện đầu ra: 5VDC 2A - Bộ phụ kiện bao gồm: 02 Phiễu chụp vú + 02 màng mát xa silicon + 2 Bình đựng sữa (gồm bình sữa, núm ty, nắp ngăn sữa, cổ bình, nắp đậy) + 2 Chân đế bình sữa + 1 động cơ chính + 02 màng silicon + 02 nắp chụp trên + 02 van màu trắng nhỏ + 02 ống dây khí dài + 01 ống khí ngắn + 01 đầu nối chữ T + 01 dây cáp USB + 01 Adapter.',
    slug: 'unimom-may-hut-sua-dien-doi-minuet-co-man-hinh-lcd-co-pin-xac-kem-adapter',
    stock: 1,
    variant_options: [],
    variants: {
      colors: []
    }
  }
];
const urlList = [
  { number: 1, title: 1, link: `/user/notification?page=1` },
  { number: 2, title: 2, link: `/user/notification?page=2` },
  { number: 3, title: 3, link: `/user/notification?page=3` }
];
const likedIdList = [9962, 10329];
const component = (params = {}) => {
  const props = {
    title: 'Wait List Title',
    list: recentlyViewedBoxes,
    style: {},
    showHeader: true,
    current: 1,
    per: 10,
    total: 30,
    urlList,
    likedIdList,
    openModalAction: jest.fn(),
    selectGiftAction: jest.fn(),
    likeProductAction: jest.fn(),
    unLikeProductAction: jest.fn(),
    addItemToCartAction: jest.fn(),
    isFetchUserWatchedList: true
  };

  return <Watched {...Object.assign({}, props, params)} />;
};

describe('Watched', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test('render list content', () => {
    const { rerender, container } = reduxRender(component({ isFetchUserWatchedList: false }), { initialState: {} });
    rerender(component({ isFetchUserWatchedList: true }));
    expect(container.getElementsByClassName('ani-bg').length).toBe(0);
  });

  test('click pagination scroll to top', async () => {
    const scrollTo = jest.fn();
    global.scrollTo = scrollTo;
    const { rerender } = reduxRender(component({ isFetchUserWatchedList: false, per: 1, total: 3 }), {
      initialState: {}
    });
    rerender(component({ isFetchUserWaitList: true, total: 3, per: 1 }));
    const page1 = screen.queryByTitle('Trang 1');

    expect(page1).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(page1);
    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});
