import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import SamplesSlider from '../container';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const cartSampleList = [
  {
    id: 10126,
    avg_rate: 5,
    brand_name: 'Charlotte Tilbury',
    coins_price: 83000,
    for_redeem: true,
    is_individual: true,
    is_saleable: false,
    like_count: 10,
    name: 'Kem Dưỡng Da Xóa Nếp Nhăn Tăng Cường Độ Ẩm Charlotte’s Magic Cream 50ml',
    original_price: 2500000,
    price: 2500000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/facebook/1570421454.jpg?t=1617778088',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/large/1570421454.jpg?t=1617778088',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/medium/1570421454.jpg?t=1617778088',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/original/1570421454.jpg?t=1617778088',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/square/1570421454.jpg?t=1617778088',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/thumb/1570421454.jpg?t=1617778088',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/445/vertical/1570421454.jpg?t=1617778088'
    },
    rating: {
      avg_rate: 5,
      count: 1
    },
    short_description:
      "Kem dưỡng Charlotte Tilbury Charlotte's Magic Cream Ngoài dòng son và các sản phẩm trang điểm nổi trội, Charlotte Tilbury cũng cực kỳ thành công với các dòng dưỡng da của mình. Kem dưỡng da Charlotte’s Magic Cream là sản phẩm kem dưỡng đang cực hot với khả năng sản xuất collage và năng lượng tế bảo, sản phẩm giúp làm chống lại sự xuất hiện các nếp nhăn, tăng cường độ ẩm cho làn da, giúp da luôn rạng rỡ. Kem dưỡng da Charlotte’s Magic Cream với công thức Instant Turnaround Moisturiser Hydratant Instantané được ví như phép lạ cho làn da, Magic Cream chứa đựng bí quyết chống lão hoá, bổ sung dưỡng chất cải thiện làn da hư tổn, không đều màu thiếu sức sống trở nên rạng rỡ và ngậm nước tuyệt hảo nuôi dưỡng da từ sâu bên trong. Sản phẩm có kết cấu kem mỏng mịn, thành phần bao gồm BioNymph Peptide Complex với khả năng kích thích tế bào sản sinh collagen và năng lượng tế bào, giúp ngăn chặn nếp nhăn. Công thức sản phẩm còn chứa Hyaluronic Axit như một tấm màng giúp giữ ẩm cho làn da, cho da luôn căng mượt. Có chứa dầu dâu tằm kết hợp cùng Vitamin E sẽ mang đến cho bạn một làn da cực kì rạng rỡ, phục hồi làn da khi bạn thiếu ngủ hay căng thẳng. Sản phẩm rất thích hợp khi thời tiết hanh khô hay trong môi trường điều hòa, máy lạnh cả ngày. Kem dưỡng da dưỡng ẩm với các vitamin và oil cần thiết giúp da phục hồi, căng đầy và nuôi dưỡng da chống lão hoá. chất kem cực kì mềm mượt, dưỡng ẩm tối đa và thẩm thấu cực nhanh làm cho làn da mềm mượt, glowy suốt. Có thể dùng trước khi makeup 1 tiếng để da thật căng mọng nha.",
    slug: 'charlotte-tilbury-charlottes-magic-cream-50-ml',
    status: 'rejected',
    stock: 0
  },
  {
    id: 10172,
    avg_rate: 0,
    brand_name: 'Sephora',
    coins_price: 67000,
    for_redeem: true,
    is_individual: true,
    is_saleable: false,
    like_count: 31,
    name: 'Bộ trang điểm Sephora Favorites The Next Big Thing 2019',
    original_price: 2000000,
    price: 2000000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/facebook/1572936315.jpg?t=1619060135',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/large/1572936315.jpg?t=1619060135',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/medium/1572936315.jpg?t=1619060135',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/original/1572936315.jpg?t=1619060135',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/square/1572936315.jpg?t=1619060135',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/thumb/1572936315.jpg?t=1619060135',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/042/957/vertical/1572936315.jpg?t=1619060135'
    },
    rating: {
      avg_rate: 0,
      count: 0
    },
    short_description:
      '- 0.05 oz/ 1.5 g Artist Couture Diamond Lights Finisher in Spotlight Glitz (silver and pink reflects) - 0.17 oz/ 5 g Kaja Cheeky Stamp Blendable Blush in 04 Feisty (cool raspberry) - 0.14 oz/ 4.05 g Melt Cosmetics Lipstick in Old Rose (dusty rose) - 0.141 oz/ 4 g Natasha Denona Mini Diamond & Glow Cheek Duo - 0.085 oz/ 2.5 g Violet Voss Eye Glitter Topper in Dream (opaque rose gold with silver shimmer) - 0.17 oz/ 5 mL FARSÁLI Liquid Glass Radiance Serum - 0.21 oz/ 6 g Milk Makeup Cooling Water Mini',
    slug: 'sephora-favorites-the-next-big-thing-2019',
    status: 'rejected',
    stock: 0
  }
];

const component = (params = {}) => {
  const props = {
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      cartSampleList,
      cartDetail: { subtotal_price: 200000 }
    })
  };

  return withRouter((routerProps) => <SamplesSlider {...Object.assign({}, props, routerProps, params)} />);
};

describe('SamplesSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
