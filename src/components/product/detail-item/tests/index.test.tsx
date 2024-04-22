jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductDetailItem from '../component';
import { INITIAL_STATE_AUTH } from '../../../../flows/auth/reducer';
import { INITIAL_STATE_CART } from '../../../../flows/cart/reducer';
import { PURCHASE_TYPE } from '../../../../constants/application/purchase';

const userOrders = [
  {
    id: 298806,
    accompanies: [],
    actions: {
      cancellable: true,
      change_to_cod: false,
      invoice_viewable: false,
      invoice_editable: false,
      invoice_requestable: true
    },
    address: 'fonero o ergor e ogior',
    balance_used: 0,
    can_change_to_cod: false,
    cancelled_at: null,
    card_processor: null,
    created_at: 1612593922,
    discount_code: '',
    discount_price: 0,
    district_id: 770,
    first_name: 'Another',
    fulfilled_at: null,
    full_address: 'fonero o ergor e ogior, Phường 06, Quận 3, Thành Phố Hồ Chí Minh',
    gift_message: '',
    gift_price: 0,
    invoice: null,
    ip: null,
    is_freeship: false,
    is_gift: false,
    last_name: 'User Name',
    mobile_referral_code: null,
    note: '',
    number: 'F2D46A13',
    order_boxes: [
      {
        id: 719524,
        box: {
          id: 7048,
          brand_name: 'LUSTRE MAKEUP',
          is_individual: true,
          is_saleable: true,
          name: 'Bộ cọ trang điểm chuyên nghiệp Lustre Pro Makeup Brush Set 10 pcs - Gold Edition',
          original_price: 2000000,
          price: 999000,
          primary_picture: {
            facebook_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/facebook/1588589103.png?t=1612593923',
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/large/1588589103.png?t=1612593923',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/medium/1588589103.png?t=1612593923',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/original/1588589103.png?t=1612593923',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/049/235/thumb/1588589103.png?t=1612593923'
          },
          short_description:
            "Những sản phẩm cọ Lustre đã mang lại định nghĩa hoàn toàn mới về thương hiệu trang điểm chuyên nghiệp đến từ Mỹ, với thiết kế tinh tế, cùng màu vàng ánh kim sang trọng, từng chiếc cọ của Lustre đều chất lượng tuyệt vời. Lông cọ mềm và mượt, cầm chắc tay, phủ phấn đều màu. Dù bạn mới tập tành trang điểm, với cọ Lustre, trở thành “phù thủy” makeup là chuyện nhỏ! Bộ cọ gồm 10 cây giúp bạn hoàn thiện từ lớp nền căng bóng, phấn mắt cuốn hút đến đôi môi quyến rũ: - Cọ Tán Phấn Bắt Sáng Lustre Pro Makeup Brush - Fan Brush - Gold Edition F104: Với thiết kế đầu cọ xoè vừa phải, Lustre Pro Fan Brush là sự lựa chọn hoàn hảo để tán phấn bắt sáng lên xương gò má cũng như chóp mũi giúp bạn có một làn da căng bóng . Hơn thế nữa, bạn cũng có thể sử dụng Lustre Pro Fan Brush để phủi đi những bụi phấn cho lớp nền mỏng nhẹ hoàn hảo. - Cọ Tán Kem Nền Lustre Pro Makeup Brush - Foundation Brush - Gold Edition F103: Là cây cọ 'best-seller' trong bộ cọ Gold Edition của Lustre Pro, có tán kem nền được yêu thích nhờ vào đầu lông chổi siêu mịn lướt nhẹ trên da. Đầu cọ được bó chặt và ngắn cho bạn độ che phủ cao nhất. - Cọ Môi Lustre Pro Makeup Brush - Gold Edition E104: Cọ Môi Lustre Pro với đầu cọ dẹp và thanh mảnh là trợ thủ đắc lực khi bạn muốn các đường nét trên môi thêm phần sắc sảo. - Cọ Phấn Phủ Lustre Pro Makeup Brush - Powder Brush - Gold Edition F101: Để có được một lớp nền lâu trôi, không bóng dầu, phủ phấn là một bước bạn không nên bỏ qua. Kích thước Cọ Phấn Phủ Lustre lớn với đầu lông dày vô cùng mềm mịn, dễ dàng sử dụng cùng cả phấn bột lẫn phấn nén, giúp bạn có một lớp nền bền màu, mịn màng cả ngày. - Cọ Chân Mày Lustre Pro Makeup Brush - Brow Brush - Gold Edition F105: Dù bạn sử dụng bột hay gel để tán chân mày, cọ chân mày Lustre với lông cọ bện chặt, đầu cọ xéo sẽ luôn là trợ thủ đắc lực để bạn có đôi lông mày sắc sảo hơn. Không chỉ vậy, bạn hoàn toàn còn có thể dùng cọ chân mày Lustre để kẻ eyeliner nếu muốn. - Cọ Má Hồng Lustre Pro Makeup Brush - Blush Brush - Gold Edition F102: Cọ Má Hồng Lustre với đầu cọ xéo không chỉ giúp bạn làm ửng hồng đôi gò má mà bạn hoàn toàn có thể sử dụng cọ để phủ phấn hay tạo khối cho gương mặt thêm phần góc cạnh. - Cọ Tán Phấn Mắt Lustre Pro Makeup Brush - Angled Blending Brush - Gold Edition 101: Cọ tán phấn mắt Angled Blending Brush là cây cọ mắt đa năng nhất bộ cọ của Lustre. Đầu cọ xéo cùng cách xếp đầu lông cọ khá dày giúp bạn vừa dùng cọ để phủ lên toàn bộ bầu mắt, tan màu vào hốc mắt và còn có thể tạo điểm nhấn cho đuôi mắt. - Cọ Che Khuyết Điểm Lustre Pro Makeup Brush - Concealer Brush - Gold Edition F105: Với những vùng da nhạy cảm và khó chạm tới bằng cọ foundation như dưới bọng mắt, quanh khoé mũi thì sử dụng Cọ Che Khuyết Điểm Lustre là vô cùng cần thiết để bạn có được lớp nền hoàn hảo. Hơn thế nữa, với đầu cọ thiết kế dẹp và đầu lông chổi mềm mịn, bạn hoàn toàn có thể sử dụng sản phẩm để thay thế cho cọ kem nền. - Cọ Phấn Mắt Lustre Pro Makeup Brush - Shading Brush - Gold Edition E103: Cọ Tán Phấn Mắt với đầu cọ hơi dẹp và bè giúp bạn lấy phấn và tán lên toàn bộ bầu mắt một dễ dàng. Lông cọ đc búi khá chặt nên chỉ với một đường lướt cọ, bạn đã phủ được toàn bộ bầu mắt. Không chỉ vậy, bạn còn có thể sử dụng cọ để tan vào phần đuôi mắt dưới để tạo độ cân bằng cho makeup look của mình. - Cọ Tán Phấn Mắt Lustre Pro Makeup Brush - Tapered Blending Brush - Gold Edition E102: Nếu là fan của những màu mắt khói quyến rũ, bạn khó ó thể bỏ qua cọ Tán Phấn Mắt Lustre - Tapered Blending Brush. Đầu cọ được thiết kế tròn nhỏ, thuôn dài phù hợp với người Châu Á, cọ blending thích hợp để tan màu mắt vào hốc mắt vô dùng dễ dàng, giúp bạn có được đôi mắt sâu hút hồn.",
          slug: 'lustre-pro-makeup-brush-set-10-pcs-gold-edition',
          status: 'approved'
        },
        coins: 0,
        created_at: 1612593922,
        discount_price: 0,
        is_cancelled: false,
        is_pre_order: false,
        note: null,
        order_id: 298806,
        pre_order_release_date: null,
        price: 999000,
        purchase_type: 0,
        quantity: 1,
        referrer_id: null,
        status: 'created',
        updated_at: 1612593922
      }
    ],
    paid_at: null,
    payment_method: 5,
    phone: '0958858855',
    platform: 'web',
    promotions_price: 0,
    province_id: 79,
    services_price: 0,
    shipments: [
      {
        id: 306663,
        external_service_url: 'https://www.ninjavan.co/vi-vn/tracking?id=',
        shipping_service: 'Ninjavan',
        status: 'created',
        tracking_code: null
      }
    ],
    shipped_at: null,
    shipping_package_name: 'Giao hàng tiêu chuẩn',
    shipping_price: 0,
    status: 'unpaid',
    subtotal_coins: 0,
    subtotal_price: 999000,
    total_coins: 0,
    total_price: 999000,
    updated_at: 1612593922,
    user_id: 337441,
    ward: {
      id: 9218,
      district_id: 770,
      full_name: 'Phường 06',
      name: '06',
      unit: 'Phường'
    },
    ward_id: 9218
  }
];
const component = (params = {}) => {
  const props = {
    authStore: INITIAL_STATE_AUTH,
    data: userOrders[0].order_boxes[0].box,
    type: 'full',
    isShowQuickView: false,
    isShowQuickBuy: false,
    isSpecialAddOn: false,
    isShowLike: true,
    openModal: jest.fn(),
    openAlert: jest.fn(),
    lineTextNumber: 3,
    displayCartSumaryOption: true,
    isShowCurrentPrice: true,
    isShowRating: true,
    isShowImage: true,
    cartStore: INITIAL_STATE_CART,
    likedIdList: [],
    openAlertAction: jest.fn(),
    openModalAction: jest.fn(),
    closeModalAction: jest.fn(),
    selectGiftAction: jest.fn(),
    selectSpecialAddOnAction: jest.fn(),
    likeProductAction: jest.fn(),
    unLikeProductAction: jest.fn(),
    addItemToCartAction: jest.fn(),
    purchaseType: PURCHASE_TYPE.NORMAL,
    handleSelectProductId: jest.fn(),
    productIdSelected: '',
    isShowCartSummary: true
  };

  return <ProductDetailItem {...Object.assign({}, props, params)} />;
};

describe('ProductDetailItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
