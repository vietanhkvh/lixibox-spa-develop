import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import FreeDeliverySlider from '../container';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const boxesToFreeship = [
  {
    id: 2773601,
    box: {
      id: 6054,
      brand_name: 'Senka',
      is_individual: true,
      is_saleable: true,
      name: 'Sữa Rửa Mặt Senka Perfect Whip 120gr',
      original_price: 130000,
      price: 75000,
      primary_picture: {
        facebook_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/facebook/1511774982.jpg?t=1628602215',
        large_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/large/1511774982.jpg?t=1628602215',
        medium_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/medium/1511774982.jpg?t=1628602215',
        original_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/original/1511774982.jpg?t=1628602215',
        square_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/square/1511774982.jpg?t=1628602215',
        thumb_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/thumb/1511774982.jpg?t=1628602215',
        vertical_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/024/265/vertical/1511774982.jpg?t=1628602215'
      },
      short_description:
        'Senka là một nhãn hiệu chăm sóc da thuộc Shiseido - tập đoàn mỹ phẩm đến từ Nhật Bản có bề dày lịch sử phong phú và đặc sắc trong hơn 140 năm. Ra mắt năm 2002 tại Nhật Bản, thừa hưởng những kinh nghiệm và ứng dụng tiên tiến của tập đoàn mỹ phẩm hàng đầu thế giới trong suốt 140 năm qua, Senka nhanh chóng trở thành nhãn hiệu được yêu thích hàng đầu Nhật Bản. Từ khi ra mắt, Senka luôn mang đến những sản phẩm chất lượng tốt nhất với giá thành hợp lý mà bất cứ người phụ nữ nào cũng có thể chi trả. Senka không ngừng cải tiến để cho ra đời những sản phẩm chăm sóc tốt nhất cho cả làn da và tâm hồn người phụ nữ. Senka Perfect Whip là sản phẩm sữa rửa mặt của hãng mỹ phẩm nổi tiếng Shiseido được ưa chuộng tại Nhật Bản bởi công dụng tuyệt vời mà sản phẩm mang lại. Nếu bạn đang muốn tìm một loại sữa rửa mặt tạo bọt giúp tẩy trang và làm sạch mặt mà không gây khô da thì sữa rửa mặt Senka Perfect Whip Foam chính là sản phẩm mà bạn nên chọn. Công dụng: - Công nghệ Giữ ẩm độc quyền “Aqua in Pool” được sáng chế bởi tập đoàn Shiseido, công nghệ làm sạch chọn lọc giúp lấy đi bụi bẩn và bã nhờn nhưng vẫn giữ lại độ ẩm tự nhiên của da. Bên cạnh đó, tăng cường hiệu quả của các thành phần dưỡng ẩm khác, da sạch nhưng không hề khô căng, mà ẩm mịn tự nhiên - Chiết xuất từ phức hợp tinh chất tơ tằm thiên nhiên và gấp đôi Hyaluronic acid giúp da ẩm mịn và mềm mượt. Sericin có khả năng tương thích cao với làn da, sericin có thể hình thành một màng bảo vệ, phát huy tối đa tác dụng dưỡng ẩm, giúp giữ kết cấu da mềm mịn. Hydrolyzed silk, lớp sừng có tác dụng bảo vệ da khỏi các tác động bên ngoài. Hydrolyzed silk có khả năng thúc đẩy sự phục hồi của lớp sừng như hàng rào bảo vệ da. - Sản phẩm với bọt dày và mịn có khả năng tiếp cận và lấy đi bụi bẩn và bã nhờn nằm sâu trong lỗ chân lông. - Lớp bọt dày, vẫn tiếp tục duy trì trong suốt thời gian rửa mặt. - Làn da được làm sạch một cách nhẹ nhàng và thư giãn trong lớp bọt xốp dày và trắng mịn.',
      slug: 'senka-perfect-whip-120gr',
      status: 'approved'
    },
    cart_id: 10001102,
    coins: 0,
    created_at: 1631956961,
    discount_message: null,
    discount_price: 0,
    editable: true,
    is_pre_order: false,
    linked_gift_type: null,
    note: 'Chỉ còn 2 trong kho - đặt hàng sớm',
    original_price: 130000,
    pre_order_release_date: null,
    price: 75000,
    purchase_type: 0,
    quantity: 2,
    referrer_id: null,
    removable: true,
    updated_at: 1631956980
  }
];

const component = (params = {}) => {
  const props = {
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      boxesToFreeship
    })
  };

  return withRouter((routerProps) => <FreeDeliverySlider {...Object.assign({}, props, routerProps, params)} />);
};

describe('FreeDeliverySlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
