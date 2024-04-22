jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reduxRender } from '../../../utils/test-utils';
import WishList from '..';

const likedBoxes = [
  {
    id: 9962,
    added_to_waitlist: false,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Combo box',
    coins_price: null,
    discount_percent: 55,
    for_redeem: false,
    is_individual: false,
    is_saleable: false,
    like_count: 3,
    lixicoin_bonus: 490,
    name: 'Box Trang Điểm Sunflower',
    original_price: 1090000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 490000,
    price_sale_off: 0,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/041/617/facebook/1564720589.png?t=1609489962',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/041/617/large/1564720589.png?t=1609489962',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/041/617/medium/1564720589.png?t=1609489962',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/041/617/original/1564720589.png?t=1609489962',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/041/617/thumb/1564720589.png?t=1609489962'
    },
    rating: {
      avg_rate: 0,
      count: 0
    },
    short_description:
      'Box Trang Điểm Sunflower gồm có: Lustre Pro Makeup Brush - Concealer Brush - Gold Edition F105 Lustre Pro Makeup Brush - Tapered Blending Brush - Gold Edition E102 Lustre Pro Makeup Brush - Blush Brush - Gold Edition F102 Lustre PRO Pressed Blush - Rosy Sensation',
    slug: 'sunflower',
    stock: 10,
    variant_options: [],
    variants: {
      colors: []
    }
  },
  {
    id: 10329,
    added_to_waitlist: false,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Combo box',
    coins_price: null,
    discount_percent: 23,
    for_redeem: false,
    is_individual: false,
    is_saleable: true,
    like_count: 28,
    lixicoin_bonus: 150,
    name: 'Set 5 Mặt Nạ Trị Mụn Dịu Da Some By Mi Tea Tree Calming Sheet Mask 25g',
    original_price: 195000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 150000,
    price_sale_off: 0,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/044/991/facebook/1577696892.png?t=1610071521',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/044/991/large/1577696892.png?t=1610071521',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/044/991/medium/1577696892.png?t=1610071521',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/044/991/original/1577696892.png?t=1610071521',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/044/991/thumb/1577696892.png?t=1610071521'
    },
    rating: {
      avg_rate: 4.9,
      count: 10
    },
    short_description:
      'Set 5 Mặt Nạ Trị Mụn Dịu Da Some By Mi Tea Tree Calming Sheet Mask 25g Mặt nạ được xem là bước bổ sung trong quá trình chăm sóc da. Việc sử dụng đều đặn mặt nạ giấy sẽ giúp phục hồi da nhanh chóng, đặc biệt với những làn da hay bị kích ứng, gặp pahir vấn đề về mụn, chỉ cần lựa chọn đúng mặt nạ, da bạn sẽ nhanh chóng lấy lại làn da khỏe mạnh ngay sau khi sử dụng. Some By Mi Tea Tree Calming Sheet Mask là sự lựa chọn lý tưởng để làm dịu da và trị mụn nhé.',
    slug: 'set-5-mat-na-some-by-mi-tri-mun-tea-tree-calming-sheet-mask-25g',
    stock: 4,
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
const component = (params = {}) => {
  const props = {
    title: 'Wish List Title',
    list: likedBoxes,
    style: {},
    showHeader: true,
    current: 1,
    per: 10,
    total: 30,
    urlList,
    isAddCartFail: false,
    isAddCartSuccess: true,
    openAlertAction: jest.fn(),
    isFetchLikedListSuccess: true,
    isNotShowLoading: true
  };

  return <WishList {...Object.assign({}, props, params)} />;
};

describe('WishList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`renders list content`, () => {
    const { rerender, container } = reduxRender(component({ isFetchLikedListSuccess: false }), { initialState: {} });
    rerender(component({ isFetchLikedListSuccess: true }));
    expect(container.getElementsByClassName('ani-bg').length).toBe(0);
  });

  test('click pagination scroll to top', async () => {
    const scrollTo = jest.fn();
    global.scrollTo = scrollTo;
    reduxRender(component({ per: 1, total: urlList.length }), { initialState: {} });
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
