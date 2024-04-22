jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reduxRender } from '../../../utils/test-utils';
import WaitList from '..';

const userWaitListBoxes = [
  {
    id: 10971,
    added_to_waitlist: true,
    badges: {
      message: null,
      top_left: null,
      top_right: null,
      bottom_right: null,
      bottom_left: null
    },
    brand_name: 'Valiantier',
    coins_price: 0,
    discount_percent: 5,
    for_redeem: false,
    is_individual: true,
    is_saleable: true,
    like_count: 1,
    lixicoin_bonus: 76,
    name: 'Thú Bông Cầm Tay Cho Bé - White',
    original_price: 80000,
    pre_order_release_date: null,
    pre_order_status: null,
    price: 76000,
    price_sale_off: 76000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/880/facebook/1597301713.jpg?t=1614159349',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/880/large/1597301713.jpg?t=1614159349',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/880/medium/1597301713.jpg?t=1614159349',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/880/original/1597301713.jpg?t=1614159349',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/880/thumb/1597301713.jpg?t=1614159349'
    },
    rating: {
      avg_rate: 3,
      count: 1
    },
    short_description:
      'Lục lạc bông cầm tay sẽ là một món quà khiến bé yêu thích thú ngay từ lần đầu tiên nhìn thấy Đặc Điểm Sản Phẩm + Chất liệu: vải bông, không chứa BPA, PVC, Phthalate, không gây dị ứng cho làn da nhạy cảm của bé + Lục lạc cầm tay bằng bông được thiết kế vừa vặn với tay cầm của bé. + Dành cho bé từ 1 tháng tuổi trở lên',
    slug: 'thu-bong-cam-tay-cho-be-white',
    stock: 0,
    variant_options: [
      {
        box_id: 10971,
        box_slug: 'thu-bong-cam-tay-cho-be-white',
        name: '',
        presentation: 'WHITE',
        color_code: '#FFFFFF',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/880/thumb/1597301713.jpg?t=1612082711'
      },
      {
        box_id: 10972,
        box_slug: 'thu-bong-cam-tay-cho-be-pink',
        name: '',
        presentation: 'PINK',
        color_code: '#E5C1B3',
        image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/879/thumb/1597301672.jpg?t=1612082711'
      }
    ],
    variants: {
      colors: [
        {
          box_id: 10971,
          box_slug: 'thu-bong-cam-tay-cho-be-white',
          name: '',
          presentation: 'WHITE',
          color_code: '#FFFFFF',
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/880/thumb/1597301713.jpg?t=1612082711'
        },
        {
          box_id: 10972,
          box_slug: 'thu-bong-cam-tay-cho-be-pink',
          name: '',
          presentation: 'PINK',
          color_code: '#E5C1B3',
          image_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/051/879/thumb/1597301672.jpg?t=1612082711'
        }
      ]
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
    title: 'Wait List Title',
    list: userWaitListBoxes,
    style: {},
    showHeader: true,
    current: 1,
    per: 10,
    total: 30,
    urlList,
    openModalAction: jest.fn(),
    addItemToCartAction: jest.fn(),
    isFetchUserWaitList: false,
    isLoadingUserWaitList: false
  };

  return <WaitList {...Object.assign({}, props, params)} />;
};

describe('WaitList', () => {
  const user = userEvent.setup();

  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test('render place holder', () => {
    const { container } = reduxRender(component({ isLoadingUserWaitList: true, isFetchUserWaitList: false }), {
      initialState: {}
    });
    const placeHolderElements = container.getElementsByClassName('ani-bg');
    expect(placeHolderElements[0]).toBeInTheDocument();
    expect(placeHolderElements.length).toEqual(4 * 16);
  });

  test('render list content', () => {
    const { rerender, container } = reduxRender(component(), { initialState: {} });
    rerender(component({ isFetchUserWaitList: true }));
    expect(container.getElementsByClassName('ani-bg').length).toEqual(0);
  });

  test('click pagination scroll to top', async () => {
    const scrollTo = jest.fn();
    global.scrollTo = scrollTo;
    const { rerender } = reduxRender(component({ per: 1, total: 3 }), {
      initialState: {}
    });
    rerender(component({ isFetchUserWaitList: true, total: 3, per: 1 }));
    const page1 = screen.queryByTitle('Trang 1');

    expect(page1).toBeInTheDocument();
    await user.click(page1);
    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});
