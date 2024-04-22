jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reduxRender } from '../../../utils/test-utils';
import Notification from '..';

const notifications = [
  {
    id: 78,
    created_at: 1612855454,
    linked_object_id: 305,
    linked_object_type: 'Theme',
    message_html:
      '📍 Rinh loạt <b>Tẩy trang xịn sò GIẢM HƠN 50%</b> từ 4 - 6/1: Nước tẩy trang Chacott 600K CÒN 389K, nước tẩy trang OKAME Peat 360K CÒN 169K, Nước tẩy trang Naruko 339K CÒN 230K,.. \r\n📍 Deal đỉnh đầu năm <b>CHỈ 99K</b>: Sữa rửa mặt Senka, phấn má hồng Maybelline Fit Me, cọ môi Lustre,..\r\n📍 <b>ĐỒNG GIÁ 399K</b> loạt Beauty Box toàn những gương mặt vạn người mê đến từ nhà Some By Mi, Okame, Lustre, The Auragins,..\r\n\r\n👉Đừng bỏ lỡ, shopping ngay!',
    message_text:
      '📍GIẢM HƠN 50% loạt tẩy trang xịn sò - Deal 99K: sữa rửa mặt, phấn má hồng,.. cực xịn\r\n📍Hộp quà mỹ phẩm ĐỒNG GIÁ 399K,... 👉Shopping ngay!',
    message_title: '💥ĐẠI TIỆC MỸ PHẨM ĐẦU NĂM',
    notification_type: 'promotion/theme',
    notifier: null,
    private: false,
    read: false,
    receiver: {
      id: 337441,
      avatar: {
        large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S',
        medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S',
        thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S'
      },
      avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S',
      avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=S',
      email: 'shakil@lixibox.com',
      first_name: 'Shakil',
      last_name: 'Shakil',
      name: 'Shakil Shakil'
    },
    updated_at: 1612855454,
    url: '',
    viewed: false
  }
];
const urlList = [
  { number: 1, title: 1, link: `/user/notification?page=1` },
  { number: 2, title: 2, link: `/user/notification?page=2` },
  { number: 3, title: 3, link: `/user/notification?page=3` }
];
const component = (params = {}) => {
  const props = {
    list: notifications,
    title: 'Test style',
    showHeader: true,
    current: 1,
    per: 10,
    total: 100,
    urlList,
    isFetchNotificationSuccess: true,
    isNotShowLoading: true
  };

  return <Notification {...Object.assign({}, props, params)} />;
};

describe('Notification', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`renders list content`, () => {
    const { rerender, container } = reduxRender(component(), { initialState: {} });
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
