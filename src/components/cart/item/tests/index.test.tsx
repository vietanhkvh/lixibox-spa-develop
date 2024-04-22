jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

jest.mock('../../../../utils/auth', () => ({
  auth: {
    loggedIn: () => true
  }
}));

const reloadMock = jest.fn();
Object.defineProperty(window, 'location', { value: { reload: reloadMock }, writable: true, configurable: true });

import { reduxRender } from '../../../../utils/test-utils';
import Item from '..';
import { storageKey } from 'constants/application/client-storage';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

const isReadOnly = false;
const isCheckedDiscount = true;
const isForceHideBuyLater = false;
const isShowDiscountCodeMessage = true;
const compactView = false;
const confirmationType = '' as const;
const update = jest.fn();
const data = {
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
};
const props = {
  isReadOnly,
  isCheckedDiscount,
  isForceHideBuyLater,
  isShowDiscountCodeMessage,
  compactView,
  confirmationType,
  update,
  data
};

const component = (params = {}) => {
  const props = {
    isReadOnly,
    isCheckedDiscount,
    isForceHideBuyLater,
    isShowDiscountCodeMessage,
    compactView,
    confirmationType,
    update,
    data
  };

  return <Item {...Object.assign({}, props, params)} />;
};

describe('Item', () => {
  describe('expand mode', () => {
    test(`should be rendered`, () => {
      expect(() => {
        reduxRender(component(), { initialState: {} });
      }).not.toThrow();
    });

    test(`should be rendered with redeem purchase type `, () => {
      expect(() => {
        reduxRender(<Item {...{ ...props, data: { ...props.data, purchase_type: 1 } }} />, { initialState: {} });
      }).not.toThrow();
    });

    test(`should be display delete confirmation pop-up when click delete button`, async () => {
      const user = userEvent.setup();
      const { container } = reduxRender(component(), { initialState: {} });
      const removeButton = screen.getByTestId('remove-from-cart');
      await user.click(removeButton);
      expect(screen.getByText('Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?')).toBeInTheDocument();
      expect(container.querySelector('.button')).toBeInTheDocument();
      const deleteButton = container.querySelector('.button');
      await user.click(deleteButton);
      expect(update).toHaveBeenCalled();
    });

    test(`should turn the modal off when click Huỷ button`, async () => {
      const user = userEvent.setup();
      const { container } = reduxRender(component(), { initialState: {} });
      const removeButton = screen.getByTestId('remove-from-cart');
      await user.click(removeButton);
      expect(screen.getByText('Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?')).toBeInTheDocument();
      expect(container.querySelector('.cancelButton')).toBeInTheDocument();
      await user.click(container.querySelector('.cancelButton'));
      expect(container.querySelector('.removeConfirmationVisible')).not.toBeInTheDocument();
    });

    test(`should call the add to wishlist function without open the modal when localstorage stored the key HAS_DISPLAYED_WISHLIST_NOTIFICATION`, async () => {
      const user = userEvent.setup();
      localStorage.setItem(storageKey.HAS_DISPLAYED_WISHLIST_NOTIFICATION, 'true');
      const { container } = reduxRender(component(), { initialState: {} });
      const buyLaterButton = screen.getByText('Mua sau');
      expect(buyLaterButton).toBeInTheDocument();
      await user.click(buyLaterButton);
      expect(container.querySelector('.removeConfirmationVisible')).not.toBeInTheDocument();
      expect(update).toHaveBeenCalled();
    });
  });

  describe('compact mode', () => {
    test(`should be rendered`, () => {
      expect(() => {
        reduxRender(<Item {...{ ...props, compactView: true, confirmationType: 'popup' }} />, { initialState: {} });
      }).not.toThrow();
    });

    test(`should be rendered with redeem purchase type`, () => {
      expect(() => {
        reduxRender(
          <Item
            {...{ ...props, compactView: true, confirmationType: 'popup', data: { ...props.data, purchase_type: 1 } }}
          />,
          {
            initialState: {}
          }
        );
      }).not.toThrow();
    });

    test(`should be display delete confirmation pop-up when click delete button`, async () => {
      const user = userEvent.setup();
      reduxRender(<Item {...{ ...props, compactView: true, confirmationType: 'popup' }} />, { initialState: {} });
      const removeButton = screen.getByTestId('remove-from-cart');
      await user.click(removeButton);
      expect(screen.getByText('Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?')).toBeInTheDocument();
      expect(screen.getByText('Xóa')).toBeInTheDocument();
      await user.click(screen.getByText('Xóa'));
      expect(update).toHaveBeenCalled();
      expect(document.querySelector('.rightHeadingAction')).toBeInTheDocument();
    });

    test(`should call update function when click delete confirmation button`, async () => {
      const user = userEvent.setup();
      reduxRender(<Item {...{ ...props, compactView: true, confirmationType: 'popup' }} />, { initialState: {} });
      const removeButton = screen.getByTestId('remove-from-cart');
      await user.click(removeButton);
      expect(screen.getByText('Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?')).toBeInTheDocument();
      expect(screen.getByText('Xóa')).toBeInTheDocument();
      await user.click(screen.getByText('Xóa'));
      expect(update).toHaveBeenCalled();
    });
    test(`should turn the modal off when click Huỷ button`, async () => {
      const user = userEvent.setup();
      reduxRender(<Item {...{ ...props, compactView: true, confirmationType: 'popup' }} />, { initialState: {} });
      const deleteButton = screen.getByTestId('remove-from-cart');
      await user.click(deleteButton);
      expect(screen.getByText('Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?')).toBeInTheDocument();
      await user.click(document.querySelector('.headingActionIcon'));
      expect(document.querySelector('.generalModalMobileOverlayAfterOpen')).not.toBeInTheDocument();
    });

    test(`should call the add to wishlist function without open the  modal when localstorage stored the key HAS_DISPLAYED_WISHLIST_NOTIFICATION`, async () => {
      const user = userEvent.setup();
      localStorage.setItem(storageKey.HAS_DISPLAYED_WISHLIST_NOTIFICATION, 'true');
      const { container } = reduxRender(<Item {...{ ...props, compactView: true, confirmationType: 'popup' }} />, {
        initialState: {}
      });
      const buyLaterButton = screen.getByText('Mua sau');
      expect(buyLaterButton).toBeInTheDocument();
      await user.click(buyLaterButton);
      expect(container.querySelector('.generalModalMobileOverlayAfterOpen')).not.toBeInTheDocument();
      expect(update).toHaveBeenCalled();
    });
  });
});
